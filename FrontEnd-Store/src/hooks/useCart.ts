import { useMemo, useState } from "react";
import type { CartItem, StoreProduct } from "../types/store.ts";
import { createItemKey, readCart } from "../utils/cart.ts";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>(readCart);

  const addItem = (product: StoreProduct, garnish: string, removedIngredients: string[], note: string) => {
    const key = createItemKey(product, garnish, removedIngredients, note);
    setCart((previous) => {
      const existing = previous.find((item) => item.key === key);
      if (existing) return previous.map((item) => item.key === key ? { ...item, quantity: item.quantity + 1 } : item);
      return [...previous, { key, product, quantity: 1, garnish, removedIngredients: [...removedIngredients], note: note.trim() }];
    });
  };

  const changeQuantity = (key: string, delta: number) => {
    setCart((previous) => previous
      .map((item) => item.key === key ? { ...item, quantity: item.quantity + delta } : item)
      .filter((item) => item.quantity > 0));
  };

  // La tarjeta muestra el total de unidades del producto, aunque existan
  // variantes con distintas guarniciones o indicaciones en el carrito.
  const getProductQuantity = (productId: string) =>
    cart.reduce(
      (total, item) => total + (item.product.id === productId ? item.quantity : 0),
      0,
    );

  // El botón + de la tarjeta incrementa la variante ya elegida y conserva
  // sus guarniciones, ingredientes quitados e indicaciones.
  const incrementProduct = (productId: string) => {
    setCart((previous) => {
      const existing = previous.find((item) => item.product.id === productId);
      if (!existing) return previous;
      return previous.map((item) =>
        item.key === existing.key ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
  };

  // Quita una sola unidad del producto. Si tiene personalizaciones distintas,
  // descuenta primero de la primera variante agregada.
  const decrementProduct = (productId: string) => {
    setCart((previous) => {
      const itemToUpdate = previous.find(
        (item) => item.product.id === productId && item.quantity > 0,
      );
      if (!itemToUpdate) return previous;

      return previous
        .map((item) =>
          item.key === itemToUpdate.key
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + item.quantity * item.product.final_price, 0), [cart]);

  return { cart, setCart, addItem, changeQuantity, getProductQuantity, incrementProduct, decrementProduct, cartCount, cartTotal };
};
