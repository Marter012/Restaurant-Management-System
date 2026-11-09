import type { OrderItemForm } from "./Order.ts";
import type { Promotion } from "./Promotion.ts";

export interface Product {
  id: string;
  name: string;
  image?: string | null;
  quantity: number;
  price: number;
  category: string;
  status: boolean;
  has_garnish?: boolean;
  garnish_options?: string[];
  ingredients?: string[];
}

export interface ProductFormValues {
  name: string;
  image?: string | null;
  price: number;
  category: string;
  has_garnish?: boolean;
  garnish_options?: string[];
  ingredients?: string[];
}

export interface CreateProductValues
  extends ProductFormValues {
  quantity: number;
}

export interface ProductFormProps {
  mode: "create" | "edit";
  product?: Product;
  onSuccess: () => void;
  categories?: string[];
  onSubmittingChange?: (value: boolean) => void;
}

export interface ProductsForOrderProps {
  products: Product[];
  items: OrderItemForm[];

  addProduct: (product: Product, garnish?: string) => void;
  increaseQuantity: (id: string, garnish?: string, removedIngredients?: string[]) => void;
  decreaseQuantity: (id: string, garnish?: string, removedIngredients?: string[]) => void;

  addPromotion: (promotion: Promotion) => void;
  allowOutOfStock?: boolean;
  unavailableIngredients?: string[];
}
