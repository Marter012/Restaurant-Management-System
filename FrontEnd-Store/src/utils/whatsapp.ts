import type { CartItem, CheckoutData, StoreInfo } from "../types/store.ts";
import { PAYMENT_METHODS } from "../constants/store.ts";
import { money } from "./money.ts";

export const buildWhatsAppUrl = (
  store: StoreInfo | null,
  cart: CartItem[],
  checkout: CheckoutData,
  cartTotal: number,
): { url?: string; error?: string } => {
  const phone = (store?.phone_number || "").replace(/\D/g, "");
  if (phone.length < 8 || phone.length > 15) {
    return { error: "La empresa todavía no configuró un número de WhatsApp válido. Contactá al establecimiento." };
  }
  if (!checkout.customerName.trim() || !checkout.phone.trim() || !checkout.paymentMethod) {
    return { error: "Completá tu nombre, teléfono y método de pago." };
  }
  if (checkout.fulfillment === "delivery" && !checkout.address.trim()) return { error: "Ingresá la dirección de entrega." };
  if (checkout.fulfillment === "pickup" && !checkout.pickupTime) return { error: "Elegí un horario de retiro." };
  if (checkout.fulfillment === "pickup") {
    const [hours, minutes] = checkout.pickupTime.split(":").map(Number);
    const pickup = new Date(); pickup.setHours(hours, minutes, 0, 0);
    if (pickup.getTime() < Date.now()) return { error: "Elegí un horario de retiro posterior a la hora actual." };
  }
  const paymentLabel = PAYMENT_METHODS.find((method) => method.value === checkout.paymentMethod)?.label || checkout.paymentMethod;
  const lines = cart.map((item) => {
    const details = [
      item.garnish ? `Guarnición: ${item.garnish}` : "",
      item.removedIngredients.length ? `Sin: ${item.removedIngredients.join(", ")}` : "",
      item.note ? `Nota: ${item.note}` : "",
    ].filter(Boolean);
    return `• ${item.quantity} x ${item.product.name} — ${money(item.product.final_price * item.quantity)}${details.length ? `\n  ${details.join(" | ")}` : ""}`;
  });
  const message = [
    `🍽️ *PEDIDO PARA ${store?.name?.toLocaleUpperCase("es") || "BOUTIQUE DE SABORES"}*`,
    "", `👤 *Cliente:* ${checkout.customerName.trim()}`, `📞 *Teléfono:* ${checkout.phone.trim()}`, "", "🛒 *Detalle del pedido:*", ...lines,
    "", `💰 *TOTAL: ${money(cartTotal)}*`, `💳 *Método de pago:* ${paymentLabel}`,
    checkout.fulfillment === "delivery" ? `🚚 *Entrega:* ${checkout.address.trim()}` : `🕒 *Horario de retiro:* ${checkout.pickupTime}`,
    checkout.note.trim() ? `📝 *Observaciones:* ${checkout.note.trim()}` : "",
    "", "Pedido enviado desde la tienda online. Pendiente de confirmación por el establecimiento.",
  ].filter(Boolean).join("\n");
  return { url: `https://wa.me/${phone}?text=${encodeURIComponent(message)}` };
};
