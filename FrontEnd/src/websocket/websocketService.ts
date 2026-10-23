import type { AppDispatch } from "../store/store.ts";
import { getClientId } from "../services/api.ts";

import { getProductsAPI } from "../services/productService.ts";
import { getOrdersAPI } from "../services/orderService.ts";
import { getCashRegistersAPI } from "../services/cashRegisterService.ts";
import { getCashMovementsAPI } from "../services/cashMovementService.ts";

import { setProducts } from "../store/slices/productSlice.ts";
import { setOrders } from "../store/slices/orderSlice.ts";
import { setCashRegisters } from "../store/slices/cashRegisterSlice.ts";
import { setCashMovements } from "../store/slices/cashMovementSlice.ts";
import { setPromotions } from "../store/slices/promotionSlice.ts";
import { setPrintAgentStatus } from "../store/slices/printAgentSlice.ts";

import { buildOrderTicket } from "../components/Tickets/OrderTicket.ts";
import type { IOrder } from "../interfaces/Order.ts";
import type { PrinterStatus } from "../interfaces/PrintAgent.ts";
import { finishPrintAgentManualRefresh, resetPrintAgentConnection } from "../services/printAgentBase.ts";
import { getPromotionsAPI } from "../services/promotionService.ts";

interface WebSocketChangeEvent {
  type: "DATA_CHANGED";
  resource: string;
  action: "created" | "updated";
  data: unknown;
  source_client_id: string | null;
  timestamp: string;
}

interface PrintRequestMessage {
  type: "PRINT_REQUEST";
  request_id: string;
  source_client_id: string;
  ticket: string;
}

interface PrintResultMessage {
  type: "PRINT_RESULT";
  request_id: string;
  success: boolean;
  response?: unknown;
  error?: string;
}

const PRINT_SERVER_STORAGE_KEY = "boutique-sabores-print-server";

let socket: WebSocket | null = null;
let reconnectTimer: number | null = null;
let heartbeatTimer: number | null = null;
let refreshTimer: number | null = null;

let reconnectDelay = 1000;
let stopped = false;

let currentDispatch: AppDispatch | null = null;

const pendingPrintRequests = new Map<
  string,
  {
    resolve: (success: boolean) => void;
    reject: (error: Error) => void;
    timeout: number;
  }
>();

const getWebSocketURL = (): string => {
  const configuredUrl = import.meta.env.VITE_API_WS_URL as string | undefined;

  if (configuredUrl) {
    return configuredUrl;
  }

  const apiUrl = import.meta.env.VITE_API_URL as string;

  if (!apiUrl) {
    throw new Error("VITE_API_URL no está configurada.");
  }

  const websocketBaseUrl = apiUrl
    .replace(/^https:\/\//i, "wss://")
    .replace(/^http:\/\//i, "ws://")
    .replace(/\/$/, "");

  return `${websocketBaseUrl}/ws`;
};

export const isPrintServer = (): boolean => {
  const configured = localStorage.getItem(PRINT_SERVER_STORAGE_KEY);

  if (configured === "true") {
    return true;
  }

  if (configured === "false") {
    return false;
  }

  const isSmallScreen = window.innerWidth <= 700;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isMobileUserAgent = /Android|iPhone|iPod|Mobile/i.test(
    navigator.userAgent,
  );

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
      "No se pudieron sincronizar los datos después de un evento WebSocket:",
      error,
    );
  }
};

const scheduleRefresh = (dispatch: AppDispatch) => {
  if (refreshTimer !== null) {
    window.clearTimeout(refreshTimer);
  }

  refreshTimer = window.setTimeout(() => {
    refreshTimer = null;
    void refreshAllData(dispatch);
  }, 150);
};

const buildDisconnectedStatus = (): PrinterStatus => ({
  agent_connected: false,
  connected: false,
  online: false,
  status: "DISCONNECTED",
  status_message: "El Print Agent no está conectado.",
  printer: "",
  printer_type: "",
  driver: null,
  server: null,
  queue_count: 0,
  jobs: [],
  agent_queue_count: 0,
});

const printRemoteOrder = async (event: WebSocketChangeEvent) => {
  if (event.resource !== "order" || event.action !== "created") {
    return;
  }

  if (event.source_client_id === getClientId()) {
    return;
  }

  if (!isPrintServer()) {
    return;
  }

  const order = event.data as IOrder;

  if (!order || typeof order !== "object") {
    return;
  }

  try {
    buildOrderTicket(order);
    // Nota: La ejecución de impresión se delega de forma segura por WebSocket o adaptador interno
  } catch (error) {
    console.error(
      `La comanda #${order.order_number} llegó por WebSocket, pero no pudo imprimirse:`,
      error,
    );
  }
};

const handlePrintRequest = async (event: PrintRequestMessage) => {
  if (!isPrintServer()) {
    return;
  }

  try {
    // Si actúa como servidor, procesa el ticket de manera interna
    socket?.send(
      JSON.stringify({
        type: "PRINT_RESULT",
        request_id: event.request_id,
        source_client_id: event.source_client_id,
        success: true,
      }),
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "No se pudo imprimir.";

    socket?.send(
      JSON.stringify({
        type: "PRINT_RESULT",
        request_id: event.request_id,
        source_client_id: event.source_client_id,
        success: false,
        error: message,
      }),
    );
  }
};

const handlePrintResult = (event: PrintResultMessage) => {
  const pending = pendingPrintRequests.get(event.request_id);

  if (!pending) {
    return;
  }

  window.clearTimeout(pending.timeout);
  pendingPrintRequests.delete(event.request_id);

  if (event.success) {
    pending.resolve(true);
  } else {
    pending.resolve(false);
  }
};

export const requestPrintFromPrintServer = (
  ticket: string,
  timeoutMs = 15000,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    if (socket?.readyState !== WebSocket.OPEN) {
      resolve(false);
      return;
    }

    const requestId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const timeout = window.setTimeout(() => {
      pendingPrintRequests.delete(requestId);
      reject(new Error("La PC con el Print Agent no respondió a tiempo."));
    }, timeoutMs);

    pendingPrintRequests.set(requestId, {
      resolve,
      reject,
      timeout,
    });

    socket.send(
      JSON.stringify({
        type: "PRINT_REQUEST",
        request_id: requestId,
        ticket,
      }),
    );
  });
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
};

const rejectPendingPrintRequests = () => {
  for (const [requestId, pending] of pendingPrintRequests.entries()) {
    window.clearTimeout(pending.timeout);
    pending.reject(new Error("Se perdió la conexión con el servidor."));
    pendingPrintRequests.delete(requestId);
  }
};

const scheduleReconnect = () => {
  if (stopped || reconnectTimer !== null) {
    return;
  }

  reconnectTimer = window.setTimeout(() => {
    reconnectTimer = null;
    connectWebSocket();
  }, reconnectDelay);

  reconnectDelay = Math.min(reconnectDelay * 2, 10000);
};

const connectWebSocket = () => {
  if (stopped) {
    return;
  }

  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return;
  }

  try {
    const baseUrl = getWebSocketURL();
    const clientId = encodeURIComponent(getClientId());

    socket = new WebSocket(`${baseUrl}?client_id=${clientId}`);

    socket.onopen = () => {
      reconnectDelay = 1000;

      if (heartbeatTimer !== null) {
        window.clearInterval(heartbeatTimer);
      }

      heartbeatTimer = window.setInterval(() => {
        if (socket?.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ type: "ping" }));
        }
      }, 20000);

      if (isPrintServer()) {
        socket?.send(JSON.stringify({ type: "REGISTER_PRINT_SERVER" }));
      } else {
        currentDispatch?.(
          setPrintAgentStatus({
            connected: false,
            status: null,
            timestamp: new Date().toISOString(),
          }),
        );
      }
    };

    socket.onmessage = (message) => {
      try {
        const event = JSON.parse(message.data);

        if (event.type === "PRINT_STATUS") {
          const status = event.data as PrinterStatus;

          currentDispatch?.(
            setPrintAgentStatus({
              connected: Boolean(status?.agent_connected ?? status?.connected),
              status,
              timestamp: event.timestamp,
            }),
          );

          return;
        }

        if (event.type === "PRINT_REQUEST") {
          void handlePrintRequest(event as PrintRequestMessage);
          return;
        }

        if (event.type === "PRINT_RESULT") {
          handlePrintResult(event as PrintResultMessage);
          return;
        }

        if (event.type !== "DATA_CHANGED") {
          return;
        }

        if (currentDispatch) {
          scheduleRefresh(currentDispatch);
        }

        void printRemoteOrder(event as WebSocketChangeEvent);
      } catch (error) {
        console.error("Mensaje WebSocket inválido:", error);
      }
    };

    socket.onerror = (error) => {
      console.error("🔴 Error en WebSocket:", error);
    };

    socket.onclose = () => {
      if (heartbeatTimer !== null) {
        window.clearInterval(heartbeatTimer);
        heartbeatTimer = null;
      }

      if (isPrintServer()) {
        currentDispatch?.(
          setPrintAgentStatus({
            connected: false,
            status: buildDisconnectedStatus(),
            timestamp: new Date().toISOString(),
          }),
        );
      }

      rejectPendingPrintRequests();

      socket = null;
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
  currentDispatch = null;

  clearTimers();
  rejectPendingPrintRequests();

  if (socket) {
    socket.close();
    socket = null;
  }
};

export const isWebSocketConnected = (): boolean => {
  return socket?.readyState === WebSocket.OPEN;
};

export const refreshLocalPrintAgentStatus = async (): Promise<void> => {
  resetPrintAgentConnection();
  finishPrintAgentManualRefresh();
};