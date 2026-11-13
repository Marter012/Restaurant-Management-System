import { useEffect, useState } from "react";
import { getStoreInfo, getStoreProducts, getUnavailableIngredients, getStorePromotions } from "../services/publicApi.ts";
import type { StoreInfo, StoreProduct, StorePromotion } from "../types/store.ts";

export const useStore = () => {
  const [store, setStore] = useState<StoreInfo | null>(null);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [promotions, setPromotions] = useState<StorePromotion[]>([]);
  const [unavailableIngredients, setUnavailableIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const storeData = await getStoreInfo();
        if (!active) return;
        setStore(storeData);
        const [productData, unavailable, promotionData] = await Promise.all([
          getStoreProducts(),
          getUnavailableIngredients().catch(() => [] as string[]),
          getStorePromotions().catch(() => [] as StorePromotion[]),
        ]);
        if (!active) return;
        setProducts(productData);
        setUnavailableIngredients(unavailable.map((value) => value.toLocaleLowerCase("es")));
        setPromotions(promotionData);
      } catch {
        if (active) setError("No pudimos conectar con la tienda. Revisá tu conexión e intentá nuevamente.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => { active = false; };
  }, []);

  return { store, products, promotions, unavailableIngredients, loading, error };
};
