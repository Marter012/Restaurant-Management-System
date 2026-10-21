import type {
  IOrder,
  ICreateOrder,
  IUpdateOrder,
} from "../interfaces/Order.ts";

import { api } from "./api.ts";

export const getOrdersAPI = async (): Promise<IOrder[]> => {
  const response = await api.get("/order/");

  return response.data;
};

export const getOrderAPI = async (
  order_number: number,
): Promise<IOrder> => {
  const response = await api.get(`/order/${order_number}`);

  return response.data;
};

export const createOrderAPI = async (
  order: ICreateOrder,
): Promise<IOrder> => {
  const response = await api.post("/order/", order);

  return response.data;
};

export const updateOrderAPI = async (
  order_id: string,
  data: IUpdateOrder,
): Promise<IOrder> => {
  const response = await api.put(`/order/${order_id}`, data);

  return response.data;
};