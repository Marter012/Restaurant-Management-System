import type { Product } from "./Product.ts";

export interface StockMovement {
  product_id: string;
  type: string;
  description: string;
  quantity?: number;
  order_id: string;
  status: boolean;
}

export interface StockFormProps {
  product: Product;
  onSuccess: () => void;
}

export interface StockFormValues {
  type: string;
  description: string;
  quantity: number;
}