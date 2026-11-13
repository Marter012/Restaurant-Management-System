import type { CheckoutData } from "../types/store.ts";

export const CART_STORAGE_KEY = "boutique-sabores-public-cart-v1";
export const CUSTOMER_SESSION_KEY = "boutique_store_customer_session";

export const PAYMENT_METHODS = [
  { value: "cash", label: "Efectivo" },
  { value: "transfer", label: "Transferencia" },
  { value: "qr", label: "QR" },
  { value: "debit_card", label: "Tarjeta de débito" },
];

export const INITIAL_CHECKOUT: CheckoutData = {
  firstName: "",
  lastName: "",
  customerName: "",
  phone: "",
  email: "",
  paymentMethod: "cash",
  fulfillment: "pickup",
  address: "",
  location: "",
  pickupTime: "",
  note: "",
};
