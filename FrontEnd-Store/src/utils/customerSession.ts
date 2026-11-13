import { CUSTOMER_SESSION_KEY } from "../constants/store.ts";
import type { CustomerProfile } from "../services/publicApi.ts";

export interface StoredCustomerSession {
  token: string;
  customer: CustomerProfile;
  expiresAt: number;
}

export function readCustomerSession(): StoredCustomerSession | null {
  try {
    const raw = localStorage.getItem(CUSTOMER_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as StoredCustomerSession;
    if (!session.token || !session.customer || session.expiresAt <= Date.now()) {
      localStorage.removeItem(CUSTOMER_SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    localStorage.removeItem(CUSTOMER_SESSION_KEY);
    return null;
  }
}

export function saveCustomerSession(token: string, customer: CustomerProfile, expiresIn = 600) {
  const session: StoredCustomerSession = {
    token,
    customer,
    expiresAt: Date.now() + Math.min(expiresIn, 600) * 1000,
  };
  localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(session));
  return session;
}

export function clearCustomerSession() {
  localStorage.removeItem(CUSTOMER_SESSION_KEY);
}
