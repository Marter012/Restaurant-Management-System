import { api } from "./api.ts";

// ==============================
// TIPOS
// ==============================

export interface GeneralSettings {
  allow_out_of_stock: boolean;
}

export interface AuditEntry {
  id: string;
  actor_username?: string;
  action?: string;
  resource?: string;
  details?: string;
  created_at: string;
}

export interface UnavailableIngredient {
  ingredient: string;
  active: boolean;
}

export interface IngredientAvailabilityResponse {
  ingredient: string;
  unavailable: boolean;
}

// ==============================
// OBTENER CONFIGURACIÓN GENERAL
// ==============================

export const getSettingsAPI = async (): Promise<GeneralSettings> => {
  const response = await api.get("/settings/");
  return response.data;
};

// ==============================
// ACTUALIZAR CONFIGURACIÓN GENERAL
// ==============================

export const updateSettingsAPI = async (
  data: Partial<GeneralSettings>,
): Promise<GeneralSettings> => {
  const response = await api.put("/settings/", data);
  return response.data;
};

// ==============================
// OBTENER AUDITORÍA
// ==============================

export const getAuditAPI = async (): Promise<AuditEntry[]> => {
  const response = await api.get("/audit/");

  return Array.isArray(response.data) ? response.data : [];
};

// ==============================
// OBTENER INGREDIENTES NO DISPONIBLES
// ==============================

export const getUnavailableIngredientsAPI = async (): Promise<
  UnavailableIngredient[]
> => {
  const response = await api.get("/product/unavailable-ingredients");

  return Array.isArray(response.data) ? response.data : [];
};

// ==============================
// ACTUALIZAR DISPONIBILIDAD DE INGREDIENTE
// ==============================

export const updateIngredientAvailabilityAPI = async (
  ingredient: string,
  unavailable: boolean,
): Promise<IngredientAvailabilityResponse> => {
  const response = await api.put("/product/unavailable-ingredients", {
    ingredient,
    unavailable,
  });

  return response.data;
};


/* ==============================
   CONFIGURACIÓN DEL ESTABLECIMIENTO
============================== */

export interface EstablishmentSettings {
  name: string;
}

export interface CommercialSettings {
  public_sales_enabled: boolean;
  general_discount_enabled: boolean;
  general_discount_percentage: number;
}

export interface AuditRetentionSettings {
  retention_days: number;
}

export interface AuditRetentionPreview {
  retention_days: number;
  cutoff_date: string;
  records_to_delete: number;
  oldest_record_date: string | null;
}

export interface AuditRetentionUpdateResponse {
  confirmation_required: boolean;
  retention_days: number;
  records_to_delete?: number;
  deleted_records?: number;
  message: string;
}

export const getEstablishmentAPI = async (): Promise<EstablishmentSettings> => {
  const response = await api.get("/settings/establishment");
  return response.data;
};

export const updateEstablishmentAPI = async (
  data: EstablishmentSettings,
): Promise<EstablishmentSettings> => {
  const response = await api.put("/settings/establishment", data);
  return response.data;
};

export const getCommercialSettingsAPI = async (): Promise<CommercialSettings> => {
  const response = await api.get("/settings/commercial");
  return response.data;
};

export const updateCommercialSettingsAPI = async (
  data: CommercialSettings,
): Promise<CommercialSettings> => {
  const response = await api.put("/settings/commercial", data);
  return response.data;
};

export const getAuditRetentionAPI = async (): Promise<AuditRetentionSettings> => {
  const response = await api.get("/settings/audit-retention");
  return response.data;
};

export const previewAuditRetentionAPI = async (
  retention_days: number,
): Promise<AuditRetentionPreview> => {
  const response = await api.post("/settings/audit-retention/preview", {
    retention_days,
  });
  return response.data;
};

export const updateAuditRetentionAPI = async (
  retention_days: number,
  confirm_deletion = false,
): Promise<AuditRetentionUpdateResponse> => {
  const response = await api.put("/settings/audit-retention", {
    retention_days,
    confirm_deletion,
  });
  return response.data;
};
