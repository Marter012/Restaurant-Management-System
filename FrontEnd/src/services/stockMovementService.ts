import type { StockMovement } from "../interfaces/StockMovement";
import { api } from "./api.ts";

export const createStockMovementAPI = async (
  data: StockMovement
): Promise<StockMovement> => {
  const response = await api.post("/stockMovement", data);

  return response.data;
};