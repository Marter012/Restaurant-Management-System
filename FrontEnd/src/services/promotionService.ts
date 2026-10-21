
import type {
  Promotion,
  PromotionCreate,
  PromotionUpdate,
} from "../interfaces/Promotion";
import { api } from "./api.ts";


export const getPromotionsAPI = async (): Promise<Promotion[]> => {
  const response = await api.get(`/promotion/`);

  return response.data;
};

export const getPromotionAPI = async (
  promotionId: string,
): Promise<Promotion> => {
  const response = await api.get(
    `/promotion/${promotionId}`,
  );

  return response.data;
};

export const createPromotionAPI = async (
  data: PromotionCreate,
): Promise<Promotion> => {
  const response = await api.post(
    `/promotion/`,
    data,
  );

  return response.data;
};

export const updatePromotionAPI = async (
  promotionId: string,
  data: PromotionUpdate,
): Promise<Promotion> => {
  const response = await api.put(
    `/promotion/${promotionId}`,
    data,
  );

  return response.data;
};

export const updatePromotionStatusAPI = async (
  promotionId: string,
  status: boolean,
): Promise<Promotion> => {
  const response = await api.put(
    `/promotion/${promotionId}`,
    {
      status,
    },
  );

  return response.data;
};