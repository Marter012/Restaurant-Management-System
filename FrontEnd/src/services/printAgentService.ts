import type {
  PrintConfig,
  PrinterStatus,
  PrintHistory,
  PrintJob,
  PrintPrinter,
  PrintQueue,
  PrintResponse,
  UpdatePrintConfig,
} from "../interfaces/PrintAgent.ts";
import { requestPrintAgentCommand } from "../websocket/websocketService.ts";

const command = <T>(
  action: string,
  payload: Record<string, unknown> = {},
  timeoutMs = 15000,
): Promise<T> => requestPrintAgentCommand<T>(action, payload, timeoutMs);

/* HEALTH */
export const getHealth = async (): Promise<boolean> => {
  const response = await command<{ status?: string }>("health", {}, 8000);
  return response?.status === "ok";
};

/* PRINT */
export const printOrderAPI = async (ticket: string): Promise<PrintResponse> => {
  if (!ticket.trim()) throw new Error("El ticket de impresión está vacío.");
  return command<PrintResponse>("print", { ticket }, 20000);
};

/* CONFIG */
export const getPrintConfigAPI = (): Promise<PrintConfig> =>
  command<PrintConfig>("config_get");

export const updatePrintConfigAPI = (
  config: UpdatePrintConfig,
): Promise<PrintConfig> => command<PrintConfig>("config_update", { config });

/* QUEUE */
export const getPrintQueueAPI = (): Promise<PrintQueue> => command<PrintQueue>("queue");

/* JOBS */
export const getPrintJobsAPI = async (): Promise<PrintJob[]> => {
  const response = await command<PrintJob[]>("jobs");
  return Array.isArray(response) ? response : [];
};

export const cancelPrintJobAPI = async (jobId: number): Promise<void> => {
  await command<{ cancelled: boolean }>("cancel_job", { job_id: jobId });
};

/* HISTORY */
export const getPrintHistoryAPI = async (): Promise<PrintHistory[]> => {
  const response = await command<PrintHistory[]>("history");
  return Array.isArray(response) ? response : [];
};

/* PRINTERS */
export const getPrintersAPI = async (): Promise<PrintPrinter[]> => {
  const response = await command<{ printers?: unknown[] }>("printers");
  const data = Array.isArray(response) ? response : response?.printers;
  if (!Array.isArray(data)) return [];

  return data.map((printer) => {
    if (typeof printer === "string") return { name: printer };
    if (!printer || typeof printer !== "object") return { name: "Impresora" };

    const item = printer as Record<string, unknown>;
    return {
      name: String(item.name ?? item.printer_name ?? item.device_name ?? "Impresora"),
      status: typeof item.status === "string" ? item.status : undefined,
      online: typeof item.online === "boolean" ? item.online : undefined,
      is_default: typeof item.is_default === "boolean" ? item.is_default : undefined,
    };
  });
};

/* PRINTER STATUS / AGENT STATUS */
export const getPrinterStatusAPI = (): Promise<PrinterStatus> =>
  command<PrinterStatus>("printer_status", {}, 20000);

export const getAgentStatusAPI = (): Promise<unknown> => command("status", {}, 10000);

/* TEST PRINT */
export const testPrintPrinterAPI = (): Promise<unknown> =>
  command("test_print", {}, 20000);

/* OPEN WINDOWS PRINTER SETTINGS */
export const getOpenQueueWindows = async (): Promise<void> => {
  await command("open_queue", {}, 8000);
};
