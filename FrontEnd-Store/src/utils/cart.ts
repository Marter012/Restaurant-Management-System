import type { CartItem, StoreProduct, StorePromotion } from "../types/store.ts";
export const readCart = (): CartItem[] => [];

export const createItemKey = (
  product: StoreProduct,
  garnish: string,
  removed: string[],
  note: string,
) => `${product.id}:${garnish}:${[...removed].sort().join(",")}:${note.trim()}`;

export interface EligibleStorePromotion { id: string; name: string; price: number; savings: number; }

function promotionSavings(cart: CartItem[], promo: StorePromotion): number {
  const quantities = new Map<string, number>();
  cart.forEach(item => quantities.set(item.product.id, (quantities.get(item.product.id) || 0) + item.quantity));
  const groups = promo.items || [];
  if (!groups.length) return 0;
  let bundles = Infinity;
  for (const group of groups) {
    const available = group.product_ids.reduce((sum, id) => sum + (quantities.get(id) || 0), 0);
    bundles = Math.min(bundles, Math.floor(available / group.quantity));
  }
  if (!Number.isFinite(bundles) || bundles < 1) return 0;
  let base = 0; const used = new Map<string, number>();
  for (let b = 0; b < bundles; b++) for (const group of groups) {
    let remaining = group.quantity;
    for (const id of group.product_ids) {
      const available = (quantities.get(id) || 0) - (used.get(id) || 0);
      const take = Math.min(remaining, available);
      if (take > 0) { const product = cart.find(item => item.product.id === id)?.product; if (product) base += take * product.final_price; used.set(id, (used.get(id) || 0) + take); remaining -= take; }
      if (!remaining) break;
    }
  }
  return Math.max(0, base - bundles * promo.price);
}

export function getEligiblePromotions(cart: CartItem[], promotions: StorePromotion[]): EligibleStorePromotion[] {
  return promotions.filter(promo => promo.status !== false && Array.isArray(promo.items) && promo.items.length > 0)
    .map(promo => ({ id: promo.id, name: promo.name, price: promo.price, savings: promotionSavings(cart, promo) }))
    .filter(promo => promo.savings > 0);
}

export function calculatePromotionTotal(cart: CartItem[], promotions: StorePromotion[], selectedPromotionIds?: string[]) {
  let total = cart.reduce((sum, item) => sum + item.quantity * item.product.final_price, 0);
  const quantities = new Map<string, number>();
  cart.forEach(item => quantities.set(item.product.id, (quantities.get(item.product.id) || 0) + item.quantity));
  const applied: { id: string; name: string; savings: number }[] = [];
  const candidates = promotions.filter(promo => promo.status !== false && Array.isArray(promo.items) && promo.items.length);
  const selected = selectedPromotionIds === undefined ? candidates : candidates.filter(promo => selectedPromotionIds.includes(promo.id));
  selected.forEach(promo => {
    const groups = promo.items || []; let bundles = Infinity;
    for (const group of groups) { const available = group.product_ids.reduce((sum, id) => sum + (quantities.get(id) || 0), 0); bundles = Math.min(bundles, Math.floor(available / group.quantity)); }
    if (!Number.isFinite(bundles) || bundles < 1) return;
    let base = 0; const used = new Map<string, number>();
    for (let b = 0; b < bundles; b++) for (const group of groups) {
      let remaining = group.quantity;
      for (const id of group.product_ids) { const available = (quantities.get(id) || 0) - (used.get(id) || 0); const take = Math.min(remaining, available); if (take > 0) { const product = cart.find(item => item.product.id === id)?.product; if (product) base += take * product.final_price; used.set(id, (used.get(id) || 0) + take); remaining -= take; } if (!remaining) break; }
    }
    const saving = Math.max(0, base - bundles * promo.price);
    if (saving > 0) { total -= saving; applied.push({ id: promo.id, name: promo.name, savings: saving }); used.forEach((count, id) => quantities.set(id, Math.max(0, (quantities.get(id) || 0) - count))); }
  });
  return { total: Math.max(0, total), applied };
}
