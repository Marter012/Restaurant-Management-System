import axios from "axios";
import type { StoreInfo, StoreProduct } from "../types/store.ts";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

export async function getStoreInfo(): Promise<StoreInfo> {
  const { data } = await publicApi.get<StoreInfo>("/public/store");
  return data;
}

export async function getStoreProducts(): Promise<StoreProduct[]> {
  const { data } = await publicApi.get<StoreProduct[]>("/public/products");
  return Array.isArray(data) ? data : [];
}

export async function getUnavailableIngredients(): Promise<string[]> {
  const { data } = await publicApi.get<string[]>("/public/unavailable-ingredients");
  return Array.isArray(data) ? data : [];
}
