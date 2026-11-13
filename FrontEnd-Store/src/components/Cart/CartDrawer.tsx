import {
  FaMinus,
  FaPlus,
  FaTimes,
  FaShoppingBag,
  FaUtensils,
} from "react-icons/fa";
import type { CartItem } from "../../types/store.ts";
import { money } from "../../utils/money.ts";
import { productImage } from "../../utils/images.ts";
import {
  DialogHeader,
  EmptyState,
  IconButton,
  Overlay,
  PrimaryButton,
  SecondaryButton,
  TotalRow,
  ForwardArrowIcon,
} from "../../styles/AppStyles.ts";
import {
  CartDrawerPanel,
  CartItems,
  CartFooter,
  CartImagePlaceholder,
  CartItemRow,
  QuantityControl,
  InlineNotice,
} from "./CartDrawerStyles.ts";
interface Props {
  open: boolean;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  onClose: () => void;
  onChangeQuantity: (key: string, delta: number) => void;
  onCheckout: () => void;
  promotionSavings?: number;
}
export const CartDrawer = ({
  open,
  cart,
  cartCount,
  cartTotal,
  onClose,
  onChangeQuantity,
  onCheckout,
  promotionSavings = 0,
}: Props) =>
  !open ? null : (
    <Overlay
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <CartDrawerPanel role="dialog" aria-modal="true" aria-label="Mi pedido">
        <DialogHeader>
          <h3>Mi pedido ({cartCount})</h3>
          <IconButton type="button" onClick={onClose} aria-label="Cerrar">
            <FaTimes />
          </IconButton>
        </DialogHeader>
        <CartItems>
          {cart.length ? (
            cart.map((item) => (
              <CartItemRow key={item.key}>
                {productImage(item.product) ? (
                  <img src={productImage(item.product)} alt="" />
                ) : (
                  <CartImagePlaceholder>
                    <FaUtensils />
                  </CartImagePlaceholder>
                )}
                <div>
                  <strong>{item.product.name}</strong>
                  <small>
                    {item.garnish ? `Guarnición: ${item.garnish} · ` : ""}
                    {item.removedIngredients.length
                      ? `Sin ${item.removedIngredients.join(", ")} · `
                      : ""}
                    {item.note}
                  </small>
                  <small>{money(item.product.final_price)} c/u</small>
                  <QuantityControl>
                    <button
                      type="button"
                      onClick={() => onChangeQuantity(item.key, -1)}
                      aria-label="Quitar uno"
                    >
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => onChangeQuantity(item.key, 1)}
                      aria-label="Agregar uno"
                    >
                      <FaPlus />
                    </button>
                  </QuantityControl>
                </div>
                <strong>
                  {money(item.product.final_price * item.quantity)}
                </strong>
              </CartItemRow>
            ))
          ) : (
            <EmptyState>
              <FaShoppingBag />
              <strong>Tu pedido está vacío</strong>
              <span>Elegí algo rico del menú para comenzar.</span>
              <SecondaryButton type="button" onClick={onClose}>
                Volver al menú
              </SecondaryButton>
            </EmptyState>
          )}
        </CartItems>
        {cart.length > 0 && (
          <CartFooter>
            {promotionSavings > 0 && <InlineNotice>Descuentos aplicados: ahorrás {money(promotionSavings)} en los productos y promociones seleccionados.</InlineNotice>}
            <TotalRow><span>Subtotal (sin descuentos)</span><strong>{money(cartTotal)}</strong></TotalRow>
            <TotalRow><span>Descuentos</span><strong>{promotionSavings > 0 ? `− ${money(promotionSavings)}` : money(0)}</strong></TotalRow>
            <TotalRow><span>Subtotal</span><strong>{money(Math.max(0, cartTotal - promotionSavings))}</strong></TotalRow>
            <PrimaryButton type="button" onClick={onCheckout}>
              Continuar con el pedido <ForwardArrowIcon />
            </PrimaryButton>
            <InlineNotice>
              El pedido se enviará a la empresa para su confirmación.
            </InlineNotice>
          </CartFooter>
        )}
      </CartDrawerPanel>
    </Overlay>
  );
