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

export interface IOrder {
  id: string;
  order_number: number;
  customer_name: string;

  items: IOrderItem[];

  method_payment: string;
  status_payment: string;
  delivery_time: string;
  cash_register_id: string;
  status: boolean;
  total_price: number;
  created_at: string;
  discount_type?: "percent" | "amount" | null;
  discount_value?: number;
  extra_items?: { name: string; price: number; quantity: number }[];
  payments?: { method_payment: string; amount: number }[];
}

export interface ICreateOrder {
  order_number?: number;
  customer_name: string;

  items: ICreateOrderItem[];

  method_payment: string;
  status_payment: string;
  delivery_time: string;
  cash_register_id: string;
  status: boolean;
  discount_type?: "percent" | "amount" | null;
  discount_value?: number;
  extra_items?: { name: string; price: number; quantity: number }[];
  payments?: { method_payment: string; amount: number }[];
  confirmed_out_of_stock?: boolean;
}

export interface IUpdateOrder {
  order_number?: number;
  customer_name?: string;

  items?: ICreateOrderItem[];

  method_payment?: string;
  status_payment?: string;
  delivery_time?: string;
  cash_register_id?: string;
  status?: boolean;
  payments?: { method_payment: string; amount: number }[];
}

export interface OrderItemForm {
  product_id: string;
  quantity: number;
  garnish?: string;
  removed_ingredients?: string[];
}

export interface OrderFormValues {
  order_number?: number;
  customer_name: string;
  items: OrderItemForm[];
  method_payment: string;
  status_payment: string;
  delivery_time: string;
  status: boolean;
  discount_type?: "percent" | "amount" | "";
  discount_value?: number;
  extra_items?: { name: string; price: number; quantity: number }[];
  extra_name?: string;
  extra_price?: number;
  extra_quantity?: number;
  payments?: { method_payment: string; amount: number }[];
}

export interface OrderFormProps {
  mode?: "create" | "edit";
  order?: IOrder;
  onSuccess?: () => void;
  onDeactivate?: () => void;
}
