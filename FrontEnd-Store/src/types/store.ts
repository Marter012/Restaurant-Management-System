export interface StoreTheme {
  primary: string; accent: string; canvas: string; surface: string;
  surface_strong: string; ink: string; muted: string; border: string;
}
export interface StoreConfiguration {
  store_title?: string;
  tagline: string; hero_title: string; hero_description: string;
  hero_image: string | null; logo_url: string | null;
  featured_product_ids: string[]; enabled_product_ids: string[]; catalog_restricted: boolean; enabled_promotion_ids: string[]; product_discounts: Record<string, number>; general_store_discount: number; theme: StoreTheme;
  show_promotions: boolean; show_featured: boolean;
  delivery_enabled: boolean; pickup_enabled: boolean;
}
export interface StorePromotion {
  id: string; name: string; description: string; image?: string | null;
  price: number; status: boolean; items?: {name:string;quantity:number;product_ids:string[]}[];
}
export interface StoreInfo {
  name: string;
  phone_number: string;
  public_sales_enabled: boolean;
  cash_register_open: boolean;
  allow_out_of_stock?: boolean;
  operational_updated_at?: string;
  general_discount_enabled: boolean;
  general_discount_percentage: number;
  configuration: StoreConfiguration;
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
  discount_source?: "general" | "individual" | "store" | null;
  has_garnish: boolean;
  garnish_options: string[];
  ingredients: string[];
  available: boolean;
  featured?: boolean;
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
  firstName: string;
  lastName: string;
  customerName: string;
  phone: string;
  email: string;
  paymentMethod: string;
  fulfillment: "pickup" | "delivery";
  address: string;
  location: string;
  pickupTime: string;
  note: string;
}
