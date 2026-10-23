export interface PrintConfig {
  printer_name: string;
  printer_type: string;
  printer_ip: string | null;
  printer_port: number;
  simulation: boolean;
  business_name: string;
}

export interface UpdatePrintConfig {
  printer_name: string;
  simulation: boolean;
  business_name: string;
}

export interface PrintQueue {
  queue: number;
}

export interface PrintJob {
  id: number;
  ticket?: string;
  status?: string;
  attempts?: number;
  error?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface PrintHistory {
  id: number;
  ticket: string;
  status: string;
  attempts: number;
  error: string | null;
  created_at: string;
  updated_at: string;
}

export interface PrintPrinter {
  name: string;
  status?: string;
  online?: boolean;
  is_default?: boolean;
}

export interface PrintRequest {
  ticket: string;
}

export interface PrintResponse {
  success?: boolean;
  message?: string;
  status?: string;
  job_id?: string | number;
}

export interface WindowsPrintJob {
  id?: number;
  document: string;
  status: string;
  status_message?: string;
  position?: number;
}

export interface PrinterStatus {
  agent_connected?: boolean;
  connected: boolean;
  online: boolean;
  status: string;
  status_message: string;
  printer: string;
  printer_type: string;
  driver?: string | null;
  server?: string | null;
  queue_count: number;
  jobs: WindowsPrintJob[];
  windows_status_code?: number;
  attributes?: number;
  agent_queue_count: number;
}
