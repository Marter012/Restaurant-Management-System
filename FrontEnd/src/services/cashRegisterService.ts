import type {
  ICashRegister,
  ICreateCashRegister,
  IUpdateCashRegister,
} from "../interfaces/CashRegister.ts";

import { api } from "./api.ts";

// --------------------------------------------------
// OBTENER TODAS LAS CAJAS
// --------------------------------------------------

export const getCashRegistersAPI =
  async (): Promise<ICashRegister[]> => {
    const response = await api.get("/cashRegister/");

    return response.data;
  };

// --------------------------------------------------
// OBTENER UNA CAJA
// --------------------------------------------------

export const getCashRegisterAPI = async (
  id: string,
): Promise<ICashRegister> => {
  const response = await api.get(
    `/cashRegister/${id}`,
  );

  return response.data;
};

// --------------------------------------------------
// CREAR / ABRIR CAJA
// --------------------------------------------------

export const createCashRegisterAPI = async (
  cashRegister: ICreateCashRegister,
): Promise<ICashRegister> => {
  const response = await api.post(
    "/cashRegister/",
    cashRegister,
  );

  return response.data;
};

// --------------------------------------------------
// ACTUALIZAR CAJA
// --------------------------------------------------

export const updateCashRegisterAPI = async (
  id: string,
  cashRegister: IUpdateCashRegister,
): Promise<ICashRegister> => {
  const response = await api.put(
    `/cashRegister/${id}`,
    cashRegister,
  );

  return response.data;
};