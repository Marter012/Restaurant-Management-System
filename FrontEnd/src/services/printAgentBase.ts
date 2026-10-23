import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

const MAX_CONNECTION_FAILURES = 3;
const RETRY_DELAY_MS = 500;

const BLOCKED_ERROR_CODE = "PRINT_AGENT_BLOCKED";
const RETRIES_EXHAUSTED_CODE = "PRINT_AGENT_RETRIES_EXHAUSTED";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  __printAgentRetryCount?: number;
}

let consecutiveFailures = 0;
let connectionBlocked = false;
let manualRefreshInProgress = false;

export const printAgent = axios.create({
  baseURL: import.meta.env.VITE_API_PRINT_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const wait = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export const getPrintAgentConnectionState = () => ({
  consecutiveFailures,
  connectionBlocked,
  maxFailures: MAX_CONNECTION_FAILURES,
});

export const resetPrintAgentConnection = (): void => {
  consecutiveFailures = 0;
  connectionBlocked = false;
  manualRefreshInProgress = true;
};

export const finishPrintAgentManualRefresh = (): void => {
  manualRefreshInProgress = false;
};

export const isPrintAgentBlockedError = (error: unknown): boolean => {
  if (!(error instanceof Error)) {
    return false;
  }

  return (
    error.message.startsWith(`${BLOCKED_ERROR_CODE}:`) ||
    error.message.startsWith(`${RETRIES_EXHAUSTED_CODE}:`)
  );
};

printAgent.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (connectionBlocked && !manualRefreshInProgress) {
    const error = new Error(
      `${BLOCKED_ERROR_CODE}: conexión suspendida hasta la actualización manual.`,
    );

    error.name = BLOCKED_ERROR_CODE;

    return Promise.reject(error);
  }

  return config;
});

printAgent.interceptors.response.use(
  (response) => {
    // Una respuesta correcta no debe desbloquear una conexión
    // que otra solicitud ya haya declarado agotada.
    if (!connectionBlocked) {
      consecutiveFailures = 0;
    }

    return response;
  },

  async (error: AxiosError) => {
    const config = error.config as RetryableRequestConfig | undefined;

    if (!config) {
      return Promise.reject(error);
    }

    if (
      axios.isCancel(error) ||
      error.code === "ERR_CANCELED"
    ) {
      return Promise.reject(error);
    }

    // No reintentar errores de validación del cliente.
    if (
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500 &&
      error.response.status !== 408 &&
      error.response.status !== 429
    ) {
      return Promise.reject(error);
    }

    if (connectionBlocked && !manualRefreshInProgress) {
      const blockedError = new Error(
        `${BLOCKED_ERROR_CODE}: conexión suspendida hasta la actualización manual.`,
      );

      blockedError.name = BLOCKED_ERROR_CODE;

      return Promise.reject(blockedError);
    }

    const retryCount = config.__printAgentRetryCount ?? 0;

    // Tres intentos totales: el original y hasta dos reintentos.
    if (retryCount < MAX_CONNECTION_FAILURES - 1) {
      config.__printAgentRetryCount = retryCount + 1;

      await wait(RETRY_DELAY_MS);

      if (connectionBlocked && !manualRefreshInProgress) {
        const blockedError = new Error(
          `${BLOCKED_ERROR_CODE}: conexión suspendida hasta la actualización manual.`,
        );

        blockedError.name = BLOCKED_ERROR_CODE;

        return Promise.reject(blockedError);
      }

      return printAgent.request(config);
    }

    consecutiveFailures = MAX_CONNECTION_FAILURES;
    connectionBlocked = true;

    const exhaustedError = new Error(
      `${RETRIES_EXHAUSTED_CODE}: se agotaron los tres intentos de conexión.`,
    );

    exhaustedError.name = RETRIES_EXHAUSTED_CODE;

    return Promise.reject(exhaustedError);
  },
);