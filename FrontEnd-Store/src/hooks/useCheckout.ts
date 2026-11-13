import { useState } from "react";
import type { CheckoutData } from "../types/store.ts";
import { INITIAL_CHECKOUT } from "../constants/store.ts";

export const useCheckout = () => {
  const [checkout, setCheckout] = useState<CheckoutData>(INITIAL_CHECKOUT);
  const [checkoutError, setCheckoutError] = useState("");
  const updateCheckout = <K extends keyof CheckoutData>(key: K, value: CheckoutData[K]) => {
    setCheckout((previous) => ({ ...previous, [key]: value }));
  };
  return { checkout, setCheckout, updateCheckout, checkoutError, setCheckoutError };
};
