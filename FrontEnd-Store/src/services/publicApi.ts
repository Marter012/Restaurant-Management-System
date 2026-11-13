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
    customer_name: checkout.customerName,
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
  const sessionRaw = localStorage.getItem("boutique_store_customer_session");
  let token: string | null = null;
  try { const session = sessionRaw ? JSON.parse(sessionRaw) : null; if (session?.expiresAt > Date.now()) token = session.token; } catch { token = null; }
  const { data } = await publicApi.post<{ checkout_url: string; order_id: string; order_number: number }>("/public/online-orders", payload, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
  return data;
}

export interface CustomerProfile { first_name:string; last_name:string; phone:string; location?:string; }
export interface CustomerSession extends CustomerProfile { token:string; expires_in:number; }
export async function accessCustomer(payload:CustomerProfile):Promise<CustomerSession>{const {data}=await publicApi.post<CustomerSession>("/public/customers/access",payload);return data;}
export async function getCustomerMe(token:string):Promise<CustomerProfile>{const {data}=await publicApi.get<CustomerProfile>("/public/customers/me",{headers:{Authorization:`Bearer ${token}`}});return data;}
export async function registerCustomer(payload:CustomerProfile):Promise<CustomerSession>{return accessCustomer(payload);}
export async function getCustomerOrders(token:string):Promise<Array<{order_number:number;created_at:string;total:number;items:{name:string;quantity:number}[]}>>{const {data}=await publicApi.get("/public/customers/me/orders",{headers:{Authorization:`Bearer ${token}`}});return Array.isArray(data)?data:[];}
