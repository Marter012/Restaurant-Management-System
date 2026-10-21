export interface PromotionItem {
  id: string;
  name: string;
  quantity: number;
  product_ids: string[];
}

export interface PromotionItemInput {
  name: string;
  quantity: number;
  product_ids: string[];
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  price: number;
  items: PromotionItem[];
  status: boolean;
}

export interface PromotionCreate {
  name: string;
  description: string;
  price: number;
  items: PromotionItemInput[];
  status: boolean;
}

export interface PromotionUpdate {
  name: string;
  description: string;
  price: number;
  items: PromotionItemInput[];
  status: boolean;
}

export interface PromotionFormValues {
  name: string;
  description: string;
  price: number;
  status: boolean;
  items: PromotionItemInput[];
}

export interface PromotionFormProps {
  mode: "create" | "edit";
  promotion?: Promotion;
  onSuccess: () => void;
}