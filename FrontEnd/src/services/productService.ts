import type { BulkProductUpdatePayload, BulkProductUpdateResponse } from "../interfaces/BulkProducts.ts";
import type {
  Product,
  ProductFormValues,
  CreateProductValues,
} from "../interfaces/Product.ts";
import { api } from "./api.ts";


// ==============================
// OBTENER PRODUCTOS
// ==============================

export const getProductsAPI = async (): Promise<Product[]> => {
  const response = await api.get("/product/");

  return response.data;
};

// ==============================
// OBTENER PRODUCTO
// ==============================

export const getProductAPI = async (id : string): Promise<Product> => {
  const response = await api.get(`/product/${id}`);

  return response.data;
};

// ==============================
// CREAR PRODUCTO
// ==============================

export const createProductApi = async (
  data: CreateProductValues,
): Promise<Product> => {
  const response = await api.post(
    "/product/",
    data,
  );

  return response.data;
};


// ==============================
// EDITAR PRODUCTO
// ==============================

export const updateProductApi = async (
  id: string,
  data: ProductFormValues,
): Promise<Product> => {
  const response = await api.put(
    `/product/${id}`,
    data,
  );

  return response.data;
};

// ==============================
// EDITAR PRODUCTOS MASIVOS
// ==============================

// ==============================
// EDITAR PRODUCTOS MASIVOS
// ==============================


export const updateProductsBulkApi = async (
  data: BulkProductUpdatePayload,
): Promise<BulkProductUpdateResponse> => {
  const response = await api.put(
    "/product/bulk/update",
    data,
  );

  return response.data;
};
// ==============================
// ACTIVAR / INACTIVAR
// ==============================

export const updateProductStatusAPI = async (
  id: string,
  status: boolean,
): Promise<Product> => {
  const response = await api.put(
    `/product/${id}`,
    { status },
  );

  return response.data;
};
// ==============================
// INGREDIENTES NO DISPONIBLES
// ==============================

export const getUnavailableIngredientsAPI = async (): Promise<string[]> => {
  const response = await api.get("/product/unavailable-ingredients");
  return (response.data ?? [])
    .filter((item: { ingredient?: string; active?: boolean }) => item.active !== false)
    .map((item: { ingredient?: string }) => String(item.ingredient ?? "").trim())
    .filter(Boolean);
};

export const deleteProductAPI = async (id: string): Promise<void> => {
  await api.delete(`/product/${id}`);
};