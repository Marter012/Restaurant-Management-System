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