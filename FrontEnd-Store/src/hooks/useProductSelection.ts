import { useState } from "react";
import type { StoreProduct } from "../types/store.ts";

export const useProductSelection = () => {
  const [selectedProduct, setSelectedProduct] = useState<StoreProduct | null>(null);
  const [selectedGarnish, setSelectedGarnish] = useState("");
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [itemNote, setItemNote] = useState("");

  const openProduct = (product: StoreProduct) => {
    setSelectedProduct(product);
    setSelectedGarnish("");
    setRemovedIngredients([]);
    setItemNote("");
  };

  const toggleRemovedIngredient = (ingredient: string) => {
    const normalized = ingredient.toLocaleLowerCase("es");
    setRemovedIngredients((previous) => previous.includes(normalized)
      ? previous.filter((item) => item !== normalized)
      : [...previous, normalized]);
  };

  const resetSelection = () => {
    setSelectedProduct(null);
    setSelectedGarnish("");
    setRemovedIngredients([]);
    setItemNote("");
  };

  return {
    selectedProduct, setSelectedProduct, selectedGarnish, setSelectedGarnish,
    removedIngredients, itemNote, setItemNote, openProduct,
    toggleRemovedIngredient, resetSelection,
  };
};
