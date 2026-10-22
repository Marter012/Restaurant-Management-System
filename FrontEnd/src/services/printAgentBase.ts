import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from "axios";

const MAX_CONNECTION_FAILURES = 3;
const RETRY_DELAY_MS = 500;

let consecutiveFailures = 0;
let connectionBlocked = false;
let manualRefreshInProgress = false;

const BLOCKED_ERROR_CODE = "PRINT_AGENT_BLOCKED";
const RETRIES_EXHAUSTED_CODE = "PRINT_AGENT_RETRIES_EXHAUSTED";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  __printAgentRetryCount?: number;
  __printAgentSkipRetry?: boolean;
}

export const printAgent = axios.create({
  baseURL: import.meta.env.VITE_API_PRINT_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const wait = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

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
  if (!axios.isAxiosError(error)) {
    return (
      error instanceof Error &&
      (error.message.startsWith(`${BLOCKED_ERROR_CODE}:`) ||
        error.message.startsWith(`${RETRIES_EXHAUSTED_CODE}:`))
    );
  }

  return (
    error.code === BLOCKED_ERROR_CODE ||
    error.code === RETRIES_EXHAUSTED_CODE
  );
};

printAgent.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (connectionBlocked && !manualRefreshInProgress) {
      const error = new Error(
        `${BLOCKED_ERROR_CODE}: se agotaron los intentos. Usá Actualizar estado para volver a conectar.`,
      );

      return Promise.reject(error);
    }

    return config;
  },
);

printAgent.interceptors.response.use(
  (response) => {
    consecutiveFailures = 0;
    connectionBlocked = false;

    return response;
  },
  async (error: AxiosError) => {
    const config = error.config as RetryableRequestConfig | undefined;

    if (!config) {
      return Promise.reject(error);
    }

    // No reintentar solicitudes canceladas ni errores de validación.
    if (
      axios.isCancel(error) ||
      error.code === "ERR_CANCELED" ||
      (error.response &&
        error.response.status >= 400 &&
        error.response.status < 500 &&
        error.response.status !== 408 &&
        error.response.status !== 429)
    ) {
      return Promise.reject(error);
    }

    // Las solicitudes marcadas explícitamente no se reintentan.
    if (config.__printAgentSkipRetry) {
      return Promise.reject(error);
    }

    const retryCount = config.__printAgentRetryCount ?? 0;

    if (retryCount < MAX_CONNECTION_FAILURES - 1) {
      config.__printAgentRetryCount = retryCount + 1;

      await wait(RETRY_DELAY_MS);

      // Si otra solicitud agotó los intentos, no seguir reintentando.
      if (connectionBlocked && !manualRefreshInProgress) {
        return Promise.reject(
          new Error(
            `${BLOCKED_ERROR_CODE}: se agotaron los intentos de conexión.`,
          ),
        );
      }

      return printAgent.request(config as AxiosRequestConfig);
    }

    consecutiveFailures += 1;
    connectionBlocked = true;

    if (!manualRefreshInProgress) {
      console.warn(
        "[Print Agent] No se pudo establecer la conexión tras tres intentos. Las consultas automáticas quedan suspendidas hasta actualizar el estado manualmente.",
      );
    }

    const exhaustedError = new Error(
      `${RETRIES_EXHAUSTED_CODE}: no se pudo conectar con el Print Agent después de tres intentos.`,
    );

    Object.assign(exhaustedError, {
      cause: error,
    });

    return Promise.reject(exhaustedError);
  },
);