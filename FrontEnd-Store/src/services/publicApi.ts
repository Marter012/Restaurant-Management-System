import axios from "axios";
import type { StoreInfo, StoreProduct, StorePromotion, CartItem, CheckoutData } from "../types/store.ts";

const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // La creación de preferencias puede tardar más que las consultas de catálogo.
  timeout: 45000,
  headers: { "Content-Type": "application/json" },
});

export async function getStoreInfo(): Promise<StoreInfo> {
  const { data } = await publicApi.get<StoreInfo>("/public/store");
  return data;
}

export async function getStoreProducts(): Promise<StoreProduct[]> {
  const { data } = await publicApi.get<StoreProduct[]>("/public/products");
  return Array.isArray(data) ? data : [];
}

export async function getUnavailableIngredients(): Promise<string[]> {
  const { data } = await publicApi.get<string[]>("/public/unavailable-ingredients");
  return Array.isArray(data) ? data : [];
}

export async function getStorePromotions(): Promise<StorePromotion[]> {
  const { data } = await publicApi.get<StorePromotion[]>("/public/promotions");
  return Array.isArray(data) ? data : [];
}

export async function createMercadoPagoOrder(cart: CartItem[], checkout: CheckoutData) {
  const payload = {
    customer_name: checkout.customerName || "",
    phone: checkout.phone,
    email: checkout.email || null,
    fulfillment: checkout.fulfillment,
    address: checkout.address,
    customer_location: checkout.location,
    pickup_time: checkout.pickupTime,
    note: checkout.note,
    items: cart.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
      garnish: item.garnish,
      removed_ingredients: item.removedIngredients,
      note: item.note,
    })),
  };
  // La misma cesta conserva una clave de idempotencia entre reintentos del
  // checkout. Así, dobles clics o recargas no crean pedidos duplicados.
  const fingerprint = JSON.stringify(payload);
  let hash = 2166136261;
  for (let index = 0; index < fingerprint.length; index += 1) {
    hash ^= fingerprint.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  const checkoutKeyName = `boutique_checkout_key_${(hash >>> 0).toString(36)}`;
  let checkoutKey = localStorage.getItem(checkoutKeyName);
  if (!checkoutKey) {
    checkoutKey = typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(checkoutKeyName, checkoutKey);
  }

  const sessionRaw = localStorage.getItem("boutique_store_customer_session");
  let token: string | null = null;
  try { const session = sessionRaw ? JSON.parse(sessionRaw) : null; if (session?.expiresAt > Date.now()) token = session.token; } catch { token = null; }
  const { data } = await publicApi.post<{ checkout_url: string; order_id: string; order_number: number }>("/public/online-orders", payload, { headers: { "X-Checkout-Key": checkoutKey, ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
  return data;
}

export interface CustomerProfile { first_name: string; last_name: string; phone: string; location?: string; }
export interface CustomerSession extends CustomerProfile { token:string; expires_in:number; }
export async function accessCustomer(payload: { phone: string; first_name?: string; last_name?: string }): Promise<CustomerSession> {
  const { data } = await publicApi.post<CustomerSession>("/public/customers/access", payload);
  return data;
}
export async function getCustomerMe(token:string):Promise<CustomerProfile>{const {data}=await publicApi.get<CustomerProfile>("/public/customers/me",{headers:{Authorization:`Bearer ${token}`}});return data;}
export async function updateCustomerMe(token: string, profile: Pick<CustomerProfile, "first_name" | "last_name" | "location">): Promise<CustomerProfile> {
  const { data } = await publicApi.put<CustomerProfile>("/public/customers/me", profile, { headers: { Authorization: `Bearer ${token}` } });
  return data;
}
export interface CustomerOrderItem {
  name: string;
  quantity: number;
  unit_price?: number;
  line_total?: number;
  garnish?: string;
  removed_ingredients?: string[];
  note?: string;
}
export interface CustomerOrder {
  order_number: number;
  created_at: string;
  total: number;
  items: CustomerOrderItem[];
  payment_status: "approved" | "refunded" | string;
  payment_provider?: string;
  payment_method?: string;
  status: string;
  fulfillment?: "pickup" | "delivery" | string;
  address?: string;
  pickup_time?: string;
  note?: string;
  applied_promotions?: { promotion_id?: string; name: string; bundles?: number; saving?: number }[];
  refund_status?: "requested" | "processing" | "refunded_needs_sync" | "refunded" | string | null;
  refund_requested_at?: string | null;
}

export async function getCustomerOrders(token: string): Promise<CustomerOrder[]> {
  const { data } = await publicApi.get<CustomerOrder[] | { orders?: CustomerOrder[]; items?: CustomerOrder[] }>("/public/customers/me/orders", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.orders)) return data.orders;
  if (Array.isArray(data?.items)) return data.items;
  return [];
}

export async function requestCustomerOrderRefund(token: string, orderNumber: number): Promise<{ message: string; refund_status: string }> {
  const { data } = await publicApi.post<{ message: string; refund_status: string }>(
    `/public/customers/me/orders/${encodeURIComponent(orderNumber)}/refund`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
  return data;
}
