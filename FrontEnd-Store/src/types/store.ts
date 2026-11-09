export interface StoreInfo {
  name: string;
  phone_number: string;
  public_sales_enabled: boolean;
  general_discount_enabled: boolean;
  general_discount_percentage: number;
}

export interface StoreProduct {
  id: string;
  name: string;
  description?: string;
  image?: string | null;
  category: string;
  price: number;
  discount_percentage?: number | null;
  effective_discount_percentage: number;
  discount_amount: number;
  final_price: number;
  discount_source?: "general" | "individual" | null;
  has_garnish: boolean;
  garnish_options: string[];
  ingredients: string[];
  available: boolean;
}

export interface CartItem {
  key: string;
  product: StoreProduct;
  quantity: number;
  garnish: string;
  removedIngredients: string[];
  note: string;
}

export interface CheckoutData {
  customerName: string;
  paymentMethod: string;
  pickupTime: string;
  note: string;
}
