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
      parsedURL.hostname === "::1" ||
      parsedURL.hostname === "[::1]"
    );
  } catch {
    return false;
  }
};

/**
 * Adaptador Fetch para el Print Agent.
 *
 * Las solicitudes a loopback incluyen targetAddressSpace.
 * Las solicitudes GET y HEAD no envían Content-Type innecesariamente.
 * El permiso de acceso a la red local sigue dependiendo del navegador.
 */
const printAgentFetchAdapter = async (
  config: InternalAxiosRequestConfig,
) => {
  const fullURL = axios.getUri(config);
  const method = config.method?.toUpperCase() ?? "GET";
  const headers = new Headers();

  if (config.headers) {
    const sourceHeaders = config.headers.toJSON();

    Object.entries(sourceHeaders).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        headers.set(key, String(value));
      }
    });
  }

  // Evita enviar Content-Type en solicitudes sin cuerpo.
  // Esto puede evitar preflight CORS innecesarios.
  if (method === "GET" || method === "HEAD") {
    headers.delete("Content-Type");
  }

  let body: BodyInit | undefined;

  if (
    config.data !== undefined &&
    config.data !== null &&
    method !== "GET" &&
    method !== "HEAD"
  ) {
    body =
      typeof config.data === "string"
        ? config.data
        : JSON.stringify(config.data);

    // Las operaciones con cuerpo JSON sí necesitan esta cabecera.
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
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
    } else if (
      typeof config.signal.addEventListener === "function"
    ) {
      config.signal.addEventListener(
        "abort",
        () => controller.abort(),
        { once: true },
      );
    }
  }

 try {
    // 1. Creamos un objeto de opciones tipado correctamente para evitar errores de TypeScript
    const fetchOptions: RequestInit & { targetAddressSpace?: "loopback" | "local" | "public" } = {
      method,
      headers,
      body,
      credentials: config.withCredentials ? "include" : "same-origin",
      signal,
    };

    // 2. Si la URL es local (127.0.0.1 o localhost), le inyectamos la propiedad que exige Chrome
    if (isLoopbackURL(fullURL)) {
      fetchOptions.targetAddressSpace = "loopback";
    }

    // 3. Ejecutamos el fetch con las opciones preparadas
    const response = await fetch(fullURL, fetchOptions);

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
        new Error(
          `Request failed with status code ${response.status}`,
        ),
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
  new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });

const createPrintAgentError = (
  code: string,
  message: string,
): Error => {
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

export const isPrintAgentBlockedError = (
  error: unknown,
): boolean => {
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

printAgent.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (connectionBlocked && !manualRefreshInProgress) {
      return Promise.reject(
        createPrintAgentError(
          BLOCKED_ERROR_CODE,
          "conexión suspendida hasta la actualización manual.",
        ),
      );
    }

    return config;
  },
);

printAgent.interceptors.response.use(
  (response) => {
    if (!connectionBlocked) {
      consecutiveFailures = 0;
    }

    return response;
  },

  async (error: AxiosError) => {
    const config = error.config as
      | RetryableRequestConfig
      | undefined;

    if (!config) {
      return Promise.reject(error);
    }

    if (
      axios.isCancel(error) ||
      error.code === "ERR_CANCELED"
    ) {
      return Promise.reject(error);
    }

    // Los errores 4xx habituales no se reintentan.
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