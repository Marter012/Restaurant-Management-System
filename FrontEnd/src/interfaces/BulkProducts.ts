export interface BulkProductUpdateItem {
  product_id: string;
  quantity?: number;
  price?: number;
}

export interface BulkProductUpdatePayload {
  products: BulkProductUpdateItem[];
}

export interface BulkProductUpdateResponse {
  stock_movements: unknown[];
  price_updates: {
    product_id: string;
    price: number;
  }[];
}
