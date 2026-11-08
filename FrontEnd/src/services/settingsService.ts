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
