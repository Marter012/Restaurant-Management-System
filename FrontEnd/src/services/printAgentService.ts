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
import { printAgent } from "./printAgentBase.ts";

/* =========================================================
   HEALTH
========================================================= */

export const getHealth = async (): Promise<boolean> => {
  const response = await printAgent.get("/");
  return response.data.status === "ok";
};

/* =========================================================
   PRINT
========================================================= */

export const printOrderAPI = async (ticket: string): Promise<PrintResponse> => {
  const response = await printAgent.post<PrintResponse>("/print", { ticket });
  return response.data;
};

/* =========================================================
   CONFIG
========================================================= */

export const getPrintConfigAPI = async (): Promise<PrintConfig> => {
  const response = await printAgent.get<PrintConfig>("/config");
  return response.data;
};

export const updatePrintConfigAPI = async (
  config: UpdatePrintConfig,
): Promise<PrintConfig> => {
  const response = await printAgent.put<PrintConfig>("/config", config);
  return response.data;
};

/* =========================================================
   QUEUE
========================================================= */

export const getPrintQueueAPI = async (): Promise<PrintQueue> => {
  const response = await printAgent.get<PrintQueue>("/queue");
  return response.data;
};

/* =========================================================
   JOBS
========================================================= */

export const getPrintJobsAPI = async (): Promise<PrintJob[]> => {
  const response = await printAgent.get<PrintJob[]>("/jobs");
  return Array.isArray(response.data) ? response.data : [];
};

export const cancelPrintJobAPI = async (jobId: number): Promise<void> => {
  await printAgent.post(`/jobs/${jobId}/cancel`);
};

/* =========================================================
   HISTORY
========================================================= */

export const getPrintHistoryAPI = async (): Promise<PrintHistory[]> => {
  const response = await printAgent.get<PrintHistory[]>("/history");
  return Array.isArray(response.data) ? response.data : [];
};

/* =========================================================
   PRINTERS
========================================================= */

export const getPrintersAPI = async (): Promise<PrintPrinter[]> => {
  const response = await printAgent.get("/printers");
  const data = response.data;

  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((printer) => {
    if (typeof printer === "string") {
      return { name: printer };
    }

    return {
      name:
        printer.name ??
        printer.printer_name ??
        printer.device_name ??
        "Impresora",
      status: printer.status,
      online: printer.online,
      is_default: printer.is_default,
    };
  });
};

/* =========================================================
   ESTADO DE IMPRESORA Y ESTADO DEL AGENTE
========================================================= */

export const getPrinterStatusAPI = async (): Promise<PrinterStatus> => {
  const response = await printAgent.get<PrinterStatus>("/printer/status", {
    timeout: 20000,
  });
  return response.data;
};

export const getAgentStatusAPI = async (): Promise<unknown> => {
  const response = await printAgent.get("/status", { timeout: 10000 });
  return response.data;
};

/* =========================================================
   PRUEBA DE IMPRESIÓN
========================================================= */

export const testPrintPrinterAPI = async (): Promise<unknown> => {
  const response = await printAgent.post("/printers/test", undefined, {
    timeout: 15000,
  });
  return response.data;
};

/* =========================================================
   ABRIR COLA DE WINDOWS
========================================================= */

export const getOpenQueueWindows = async (): Promise<void> => {
  await printAgent.get("/printer/open-queue");
};
