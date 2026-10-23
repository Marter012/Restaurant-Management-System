import type { AppDispatch } from "../store/store.ts";
import { getClientId } from "../services/api.ts";
import { getAccessToken } from "../services/authStorage.ts";

import { getProductsAPI } from "../services/productService.ts";
import { getOrdersAPI } from "../services/orderService.ts";
import { getCashRegistersAPI } from "../services/cashRegisterService.ts";
import { getCashMovementsAPI } from "../services/cashMovementService.ts";
import { getPromotionsAPI } from "../services/promotionService.ts";

import { setProducts } from "../store/slices/productSlice.ts";
import { setOrders } from "../store/slices/orderSlice.ts";
import { setCashRegisters } from "../store/slices/cashRegisterSlice.ts";
import { setCashMovements } from "../store/slices/cashMovementSlice.ts";
import { setPromotions } from "../store/slices/promotionSlice.ts";
import { setPrintAgentStatus } from "../store/slices/printAgentSlice.ts";

import { buildOrderTicket } from "../components/Tickets/OrderTicket.ts";
import type { IOrder } from "../interfaces/Order.ts";
import type { PrinterStatus } from "../interfaces/PrintAgent.ts";

interface WebSocketChangeEvent {
  type: "DATA_CHANGED";
  resource: string;
  action: "created" | "updated";
  data: unknown;
  source_client_id: string | null;
  timestamp: string;
}

interface AgentResponseMessage {
  type: "PRINT_AGENT_RESPONSE" | "PRINT_RESULT";
  request_id: string;
  success: boolean;
  response?: unknown;
  error?: string;
}

const PRINT_SERVER_STORAGE_KEY = "boutique-sabores-print-server";
const PRINTED_ORDER_STORAGE_KEY = "boutique-sabores-printed-orders";
const PRINTED_ORDER_TTL_MS = 5 * 60 * 1000;
const DEFAULT_REQUEST_TIMEOUT = 15000;
const SOCKET_AUTH_TIMEOUT = 10000;

let socket: WebSocket | null = null;
let reconnectTimer: number | null = null;
let heartbeatTimer: number | null = null;
let refreshTimer: number | null = null;
let authTimer: number | null = null;
let reconnectDelay = 1000;
let stopped = false;
let authenticated = false;
let currentDispatch: AppDispatch | null = null;

type PendingRequest = {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
  timeout: number;
};

const pendingRequests = new Map<string, PendingRequest>();

const getWebSocketURL = (): string => {
  const configuredUrl = import.meta.env.VITE_API_WS_URL as string | undefined;
  if (configuredUrl?.trim()) {
    const normalized = configuredUrl.trim();
    const secure = /^wss:\/\//i.test(normalized);
    const localDevelopment = import.meta.env.DEV && /^ws:\/\//i.test(normalized);
    if (!secure && !localDevelopment) {
      throw new Error("VITE_API_WS_URL debe utilizar wss:// en producción.");
    }
    return normalized;
  }

  const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
  if (!apiUrl?.trim()) throw new Error("VITE_API_URL no está configurada.");

  const normalizedApiUrl = apiUrl.trim().replace(/\/+$/, "");
  const websocketBaseUrl = normalizedApiUrl
    .replace(/^https:\/\//i, "wss://")
    .replace(/^http:\/\//i, "ws://");

  const secure = /^wss:\/\//i.test(websocketBaseUrl);
  const localDevelopment = import.meta.env.DEV && /^ws:\/\//i.test(websocketBaseUrl);
  if (!secure && !localDevelopment) {
    throw new Error("La conexión WebSocket de producción debe utilizar wss://.");
  }

  return `${websocketBaseUrl}/ws`;
};

/**
 * Mantiene la selección existente de la pestaña que imprime comandas creadas
 * por otros clientes. El Print Agent real se registra por separado desde Python.
 */
export const isPrintServer = (): boolean => {
  const configured = localStorage.getItem(PRINT_SERVER_STORAGE_KEY);
  if (configured === "true") return true;
  if (configured === "false") return false;

  const isSmallScreen = window.innerWidth <= 700;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isMobileUserAgent = /Android|iPhone|iPod|Mobile/i.test(navigator.userAgent);
  return !isSmallScreen && !isCoarsePointer && !isMobileUserAgent;
};

const refreshAllData = async (dispatch: AppDispatch) => {
  try {
    const [products, orders, cashRegisters, cashMovements, promotions] =
      await Promise.all([
        getProductsAPI(),
        getOrdersAPI(),
        getCashRegistersAPI(),
        getCashMovementsAPI(),
        getPromotionsAPI(),
      ]);

    dispatch(setProducts(products));
    dispatch(setOrders(orders));
    dispatch(setCashRegisters(cashRegisters));
    dispatch(setCashMovements(cashMovements));
    dispatch(setPromotions(promotions));
  } catch (error) {
    console.error(
      "No se pudieron sincronizar los datos tras un evento WebSocket:",
      error,
    );
  }
};

const scheduleRefresh = (dispatch: AppDispatch) => {
  if (refreshTimer !== null) window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => {
    refreshTimer = null;
    void refreshAllData(dispatch);
  }, 150);
};

const disconnectedStatus = (): PrinterStatus => ({
  agent_connected: false,
  connected: false,
  online: false,
  status: "DISCONNECTED",
  status_message: "El Print Agent no está conectado al backend.",
  printer: "",
  printer_type: "",
  driver: null,
  server: null,
  queue_count: 0,
  jobs: [],
  agent_queue_count: 0,
});

const rejectPendingRequests = (reason: string) => {
  for (const [requestId, pending] of pendingRequests.entries()) {
    window.clearTimeout(pending.timeout);
    pending.reject(new Error(reason));
    pendingRequests.delete(requestId);
  }
};

const createRequestId = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const waitForSocketOpen = async (timeoutMs: number): Promise<WebSocket> => {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    if (socket?.readyState === WebSocket.OPEN && authenticated) return socket;
    if (stopped) throw new Error("La conexión WebSocket está detenida.");
    if (!getAccessToken()) {
      throw new Error("No hay una sesión autenticada para conectar con el backend.");
    }
    await new Promise((resolve) => window.setTimeout(resolve, 100));
  }

  throw new Error("No se pudo autenticar la conexión WebSocket con el backend.");
};

/** Ejecuta una operación por WebSocket; nunca llama al Print Agent por HTTP. */
export const requestPrintAgentCommand = async <T = unknown>(
  action: string,
  payload: Record<string, unknown> = {},
  timeoutMs = DEFAULT_REQUEST_TIMEOUT,
): Promise<T> => {
  const activeSocket = await waitForSocketOpen(Math.min(timeoutMs, SOCKET_AUTH_TIMEOUT));
  const requestId = createRequestId();

  return new Promise<T>((resolve, reject) => {
    const timeout = window.setTimeout(() => {
      pendingRequests.delete(requestId);
      reject(
        new Error(`El Print Agent no respondió a la operación "${action}" a tiempo.`),
      );
    }, timeoutMs);

    pendingRequests.set(requestId, {
      resolve: (value) => resolve(value as T),
      reject,
      timeout,
    });

    try {
      activeSocket.send(
        JSON.stringify({
          type: "PRINT_AGENT_REQUEST",
          request_id: requestId,
          action,
          payload,
        }),
      );
    } catch (error) {
      window.clearTimeout(timeout);
      pendingRequests.delete(requestId);
      reject(
        error instanceof Error
          ? error
          : new Error("No se pudo enviar la operación al backend."),
      );
    }
  });
};

export const requestPrintFromPrintServer = async (
  ticket: string,
  timeoutMs = DEFAULT_REQUEST_TIMEOUT,
): Promise<boolean> => {
  try {
    const result = await requestPrintAgentCommand<{ success?: boolean }>(
      "print",
      { ticket },
      timeoutMs,
    );
    return result?.success === true;
  } catch (error) {
    console.error("No se pudo enviar la impresión mediante el backend:", error);
    return false;
  }
};

const hasRecentlyClaimedOrderPrint = (order: IOrder): boolean => {
  const orderId = order.id;
  if (!orderId) return false;

  const now = Date.now();
  let claims: Record<string, number> = {};

  try {
    const stored = localStorage.getItem(PRINTED_ORDER_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Record<string, number>;
      claims = Object.fromEntries(
        Object.entries(parsed).filter(([, timestamp]) =>
          typeof timestamp === "number" && now - timestamp < PRINTED_ORDER_TTL_MS,
        ),
      );
    }
  } catch (error) {
    console.warn("No se pudo leer el registro de comandas impresas:", error);
  }

  const key = String(orderId);
  if (claims[key]) {
    return true;
  }

  // localStorage comparte esta marca entre pestañas del mismo navegador.
  // Se registra antes de enviar el trabajo para evitar impresiones repetidas.
  claims[key] = now;
  try {
    localStorage.setItem(PRINTED_ORDER_STORAGE_KEY, JSON.stringify(claims));
  } catch (error) {
    console.warn("No se pudo guardar la marca de impresión de la comanda:", error);
  }
  return false;
};

const printRemoteOrder = async (event: WebSocketChangeEvent) => {
  if (event.resource !== "order" || event.action !== "created") return;
  if (event.source_client_id === getClientId()) return;
  if (!isPrintServer()) return;

  const order = event.data as IOrder;
  if (!order || typeof order !== "object") return;
  if (hasRecentlyClaimedOrderPrint(order)) {
    console.info(`Se omitió la impresión duplicada de la comanda #${order.order_number}.`);
    return;
  }

  try {
    const ticket = buildOrderTicket(order);
    const success = await requestPrintFromPrintServer(ticket);
    if (!success) {
      console.error(
        `La comanda #${order.order_number} no pudo enviarse al Print Agent.`,
      );
    }
  } catch (error) {
    console.error(
      `No se pudo generar/enviar la comanda #${order.order_number}:`,
      error,
    );
  }
};

const handleAgentResponse = (event: AgentResponseMessage) => {
  if (!event.request_id) return;
  const pending = pendingRequests.get(event.request_id);
  if (!pending) return;

  window.clearTimeout(pending.timeout);
  pendingRequests.delete(event.request_id);

  if (!event.success) {
    pending.reject(new Error(event.error || "El Print Agent rechazó la operación."));
    return;
  }

  pending.resolve(event.response);
};

const clearTimers = () => {
  if (reconnectTimer !== null) {
    window.clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }
  if (heartbeatTimer !== null) {
    window.clearInterval(heartbeatTimer);
    heartbeatTimer = null;
  }
  if (refreshTimer !== null) {
    window.clearTimeout(refreshTimer);
    refreshTimer = null;
  }
  if (authTimer !== null) {
    window.clearTimeout(authTimer);
    authTimer = null;
  }
};

const scheduleReconnect = () => {
  if (stopped || reconnectTimer !== null || !getAccessToken()) return;

  reconnectTimer = window.setTimeout(() => {
    reconnectTimer = null;
    connectWebSocket();
  }, reconnectDelay);
  reconnectDelay = Math.min(reconnectDelay * 2, 10000);
};

const connectWebSocket = () => {
  if (stopped || !getAccessToken()) return;
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  try {
    const baseUrl = getWebSocketURL();
    const clientId = encodeURIComponent(getClientId());
    const nextSocket = new WebSocket(`${baseUrl}?client_id=${clientId}`);
    socket = nextSocket;
    authenticated = false;

    nextSocket.onopen = () => {
      const accessToken = getAccessToken();
      if (!accessToken) {
        nextSocket.close(1008, "No active session");
        return;
      }

      try {
        nextSocket.send(
          JSON.stringify({ type: "AUTHENTICATE", token: accessToken }),
        );
      } catch (error) {
        console.error("No se pudo autenticar el WebSocket:", error);
        nextSocket.close();
        return;
      }

      if (authTimer !== null) window.clearTimeout(authTimer);
      authTimer = window.setTimeout(() => {
        authTimer = null;
        if (!authenticated && nextSocket.readyState === WebSocket.OPEN) {
          nextSocket.close(1008, "WebSocket authentication timeout");
        }
      }, SOCKET_AUTH_TIMEOUT);
    };

    nextSocket.onmessage = (message) => {
      try {
        const event = JSON.parse(message.data) as Record<string, unknown>;

        if (event.type === "AUTHENTICATED") {
          authenticated = true;
          reconnectDelay = 1000;
          if (authTimer !== null) {
            window.clearTimeout(authTimer);
            authTimer = null;
          }
          if (heartbeatTimer !== null) window.clearInterval(heartbeatTimer);
          heartbeatTimer = window.setInterval(() => {
            if (socket === nextSocket && authenticated && nextSocket.readyState === WebSocket.OPEN) {
              nextSocket.send(JSON.stringify({ type: "ping" }));
            }
          }, 20000);
          return;
        }

        if (event.type === "AUTH_ERROR") {
          authenticated = false;
          console.error("El backend rechazó la autenticación WebSocket.");
          nextSocket.close(1008, "WebSocket authentication failed");
          return;
        }

        if (!authenticated) return;

        if (event.type === "PRINT_STATUS") {
          const status = event.data as PrinterStatus;
          currentDispatch?.(
            setPrintAgentStatus({
              connected: Boolean(status?.agent_connected ?? status?.connected),
              status: status ?? disconnectedStatus(),
              timestamp: String(event.timestamp ?? new Date().toISOString()),
            }),
          );
          return;
        }

        if (event.type === "PRINT_AGENT_RESPONSE" || event.type === "PRINT_RESULT") {
          handleAgentResponse(event as unknown as AgentResponseMessage);
          return;
        }

        if (event.type === "DATA_CHANGED") {
          if (currentDispatch) scheduleRefresh(currentDispatch);
          void printRemoteOrder(event as unknown as WebSocketChangeEvent);
        }
      } catch (error) {
        console.error("Mensaje WebSocket inválido:", error);
      }
    };

    nextSocket.onerror = () => {
      console.error("Error en la conexión WebSocket con el backend.");
    };

    nextSocket.onclose = () => {
      authenticated = false;
      if (heartbeatTimer !== null) {
        window.clearInterval(heartbeatTimer);
        heartbeatTimer = null;
      }
      if (authTimer !== null) {
        window.clearTimeout(authTimer);
        authTimer = null;
      }

      currentDispatch?.(
        setPrintAgentStatus({
          connected: false,
          status: disconnectedStatus(),
          timestamp: new Date().toISOString(),
        }),
      );
      rejectPendingRequests("Se perdió la conexión WebSocket con el backend.");
      if (socket === nextSocket) socket = null;
      scheduleReconnect();
    };
  } catch (error) {
    console.error("No se pudo iniciar WebSocket:", error);
    scheduleReconnect();
  }
};

export const startWebSocket = (dispatch: AppDispatch) => {
  currentDispatch = dispatch;
  stopped = false;
  connectWebSocket();
};

export const stopWebSocket = () => {
  stopped = true;
  authenticated = false;
  currentDispatch = null;
  clearTimers();
  rejectPendingRequests("La conexión WebSocket fue detenida.");

  if (socket) {
    const current = socket;
    socket = null;
    current.close();
  }
};

export const isWebSocketConnected = (): boolean =>
  authenticated && socket?.readyState === WebSocket.OPEN;

export const refreshLocalPrintAgentStatus = async (): Promise<void> => {
  await requestPrintAgentCommand("printer_status", {}, 20000);
};
