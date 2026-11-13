export type PaymentStatus = "pending" | "partially_paid" | "paid" | "cancelled";

export interface IOrderItem {
  id: string;
  item_type: "product" | "promotion" | "extra";
  product_id: string | null;
  promotion_id: string | null;
  name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
  promotion_selections?: PromotionSelection[];
  status: boolean;
  garnish?: string | null;
  removed_ingredients?: string[];
  ingredients?: string[];
}

export interface PromotionSelection {
  promotion_item_id: string;
  product_id: string;
  quantity: number;
  product_name?: string;
  name?: string;
  ingredients?: string[];
  removed_ingredients?: string[];
}

export interface ICreateOrderItem {
  item_type: "product" | "promotion";
  product_id: string | null;
  promotion_id: string | null;
  quantity: number;
  promotion_selections: PromotionSelection[];
  garnish?: string;
  removed_ingredients?: string[];
}

export interface PaymentSplit {
  method_payment: string;
  amount: number;
}

export interface IOrder {
  id: string;
  source?: "admin" | "online";
  online_order_id?: string | null;
  order_number: number;
  customer_name: string;
  observations?: string;
  parent_order_id?: string | null;
  additional_number?: number | null;
  items: IOrderItem[];
  method_payment: string;
  status_payment: PaymentStatus;
  delivery_time: string;
  cash_register_id: string;
  status: boolean;
  total_price: number;
  created_at: string;
  discount_type?: "percent" | "amount" | null;
  discount_value?: number;
  extra_items?: { name: string; price: number; quantity: number }[];
  payments?: PaymentSplit[];
}

export interface ICreateOrder {
  order_number?: number;
  customer_name: string;
  observations?: string;
  parent_order_id?: string | null;
  items: ICreateOrderItem[];
  method_payment: string;
  status_payment: PaymentStatus;
  delivery_time: string;
  cash_register_id: string;
  status: boolean;
  discount_type?: "percent" | "amount" | null;
  discount_value?: number;
  extra_items?: { name: string; price: number; quantity: number }[];
  payments?: PaymentSplit[];
  confirmed_out_of_stock?: boolean;
}

export interface IUpdateOrder {
  order_number?: number;
  customer_name?: string;
  observations?: string;
  items?: ICreateOrderItem[];
  method_payment?: string;
  status_payment?: PaymentStatus;
  delivery_time?: string;
  cash_register_id?: string;
  status?: boolean;
  payments?: PaymentSplit[];
}

export interface OrderItemForm {
  product_id: string;
  quantity: number;
  garnish?: string;
  removed_ingredients?: string[];
  added_ingredients?: string[];
}

export interface OrderFormValues {
  order_number?: number;
  customer_name: string;
  observations?: string;
  items: OrderItemForm[];
  method_payment: string;
  status_payment: PaymentStatus;
  delivery_time: string;
  status: boolean;
  discount_type?: "percent" | "amount" | "";
  discount_value?: number;
  extra_items?: { name: string; price: number; quantity: number }[];
  extra_name?: string;
  extra_price?: number;
  extra_quantity?: number;
  payments?: PaymentSplit[];
}

export interface OrderFormProps {
  mode?: "create" | "edit";
  order?: IOrder;
  onSuccess?: () => void;
  onDeactivate?: () => void;
  readOnly?: boolean; // Nueva propiedad
}