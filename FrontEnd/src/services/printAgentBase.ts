import axios, {
  type AxiosError,
  type AxiosRequestConfig,
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

const baseURL: string = import.meta.env.VITE_API_PRINT_URL;

const isLoopbackURL = (url: string): boolean => {
  try {
    const parsedURL = new URL(url, window.location.href);

    return (
      parsedURL.hostname === "localhost" ||
      parsedURL.hostname === "127.0.0.1" ||
      parsedURL.hostname === "[::1]"
    );
  } catch {
    return false;
  }
};

/**

* Adaptador basado en Fetch.
*
* targetAddressSpace se configura únicamente para destinos loopback.
* El permiso de acceso local sigue dependiendo del navegador.
  */
const printAgentFetchAdapter = async (config: InternalAxiosRequestConfig) => {
  const fullURL = axios.getUri(config);
  const headers = new Headers();

  if (config.headers) {
    const sourceHeaders = config.headers.toJSON();

    Object.entries(sourceHeaders).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        headers.set(key, String(value));
      }
    });
  }

  let body: BodyInit | undefined;

  if (
    config.data !== undefined &&
    config.data !== null &&
    config.method?.toUpperCase() !== "GET" &&
    config.method?.toUpperCase() !== "HEAD"
  ) {
    body =
      typeof config.data === "string"
        ? config.data
        : JSON.stringify(config.data);
  }

  const controller = new AbortController();

  const timeout = config.timeout ?? 5000;

  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, timeout);

  const signal = controller.signal;

  if (config.signal) {
    if (config.signal.aborted) {
      controller.abort();
    } else if (typeof config.signal.addEventListener === "function") {
      config.signal.addEventListener("abort", () => controller.abort(), {
        once: true,
      });
    }
  }

  try {
    const response = await fetch(fullURL, {
      method: config.method?.toUpperCase() ?? "GET",
      headers,
      body,
      credentials: config.withCredentials ? "include" : "same-origin",
      signal,
      ...(isLoopbackURL(fullURL)
        ? { targetAddressSpace: "loopback" as const }
        : {}),
    });

    const responseText = await response.text();

    let responseData: unknown = responseText;

    if (responseText) {
      try {
        responseData = JSON.parse(responseText);
      } catch {
        responseData = responseText;
      }
    }

    const axiosResponse = {
      data: responseData,
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      config,
      request: undefined,
    };

    const validateStatus =
      config.validateStatus ??
      ((status: number) => status >= 200 && status < 300);

    if (!validateStatus(response.status)) {
      throw Object.assign(
        new Error(`Request failed with status code ${response.status}`),
        {
          config,
          response: axiosResponse,
          isAxiosError: true,
          code: "ERR_BAD_RESPONSE",
        },
      );
    }

    return axiosResponse;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw Object.assign(new Error("timeout exceeded"), {
        config,
        code: "ECONNABORTED",
        isAxiosError: true,
      });
    }

    if (error instanceof Error && !("config" in error)) {
      throw Object.assign(new Error(error.message), {
        config,
        code: "ERR_NETWORK",
        isAxiosError: true,
        cause: error,
      });
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
};

export const printAgent = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  adapter: printAgentFetchAdapter,
});

const wait = (milliseconds: number): Promise<void> =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

const createPrintAgentError = (code: string, message: string): Error => {
  const error = new Error(`${code}: ${message}`);
  error.name = code;
  return error;
};

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
    error.message.startsWith(`${RETRIES_EXHAUSTED_CODE}:`) ||
    error.name === BLOCKED_ERROR_CODE ||
    error.name === RETRIES_EXHAUSTED_CODE
  );
};

printAgent.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (connectionBlocked && !manualRefreshInProgress) {
    return Promise.reject(
      createPrintAgentError(
        BLOCKED_ERROR_CODE,
        "conexión suspendida hasta la actualización manual.",
      ),
    );
  }

  return config;
});

printAgent.interceptors.response.use(
  (response) => {
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

    if (axios.isCancel(error) || error.code === "ERR_CANCELED") {
      return Promise.reject(error);
    }

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
      return Promise.reject(
        createPrintAgentError(
          BLOCKED_ERROR_CODE,
          "conexión suspendida hasta la actualización manual.",
        ),
      );
    }

    const retryCount = config.__printAgentRetryCount ?? 0;

    if (retryCount < MAX_CONNECTION_FAILURES - 1) {
      config.__printAgentRetryCount = retryCount + 1;

      await wait(RETRY_DELAY_MS);

      if (connectionBlocked && !manualRefreshInProgress) {
        return Promise.reject(
          createPrintAgentError(
            BLOCKED_ERROR_CODE,
            "conexión suspendida hasta la actualización manual.",
          ),
        );
      }

      return printAgent.request(config as AxiosRequestConfig);
    }

    consecutiveFailures = MAX_CONNECTION_FAILURES;
    connectionBlocked = true;

    return Promise.reject(
      createPrintAgentError(
        RETRIES_EXHAUSTED_CODE,
        "se agotaron los tres intentos de conexión.",
      ),
    );
  },
);
