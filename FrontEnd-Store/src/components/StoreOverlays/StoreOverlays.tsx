import { money } from "../../utils/money.ts";
import { ProductModal } from "../ProductModal/ProductModal.tsx";
import { CartDrawer } from "../CartDrawer/CartDrawer.tsx";
import { CheckoutModal } from "../CheckoutModal/CheckoutModal.tsx";
import { PromotionChoiceModal } from "../PromotionChoiceModal/PromotionChoiceModal.tsx";
import { PromotionBuilderModal } from "../PromotionBuilderModal/PromotionBuilderModal.tsx";
import { StoreToast } from "../StoreToast/StoreToast.tsx";
import { ClosedStoreModal } from "../ClosedStoreModal/ClosedStoreModal.tsx";
import { RefreshStoreModal } from "../RefreshStoreModal/RefreshStoreModal.tsx";
import { SaveCustomerPrompt } from "../SaveCustomerPrompt/SaveCustomerPrompt.tsx";
import { useStore } from "../../hooks/useStore.ts";
import { useCart } from "../../hooks/useCart.ts";
import { useProductSelection } from "../../hooks/useProductSelection.ts";
import { useCheckout } from "../../hooks/useCheckout.ts";
import type { StorePromotion } from "../../types/store.ts";
import type { EligibleStorePromotion } from "../../utils/cart.ts";

type StoreData = ReturnType<typeof useStore>["store"];
type ProductList = ReturnType<typeof useStore>["products"];
type CartState = Pick<ReturnType<typeof useCart>, "cart" | "cartCount" | "changeQuantity">;
type Selection = ReturnType<typeof useProductSelection>;
type CheckoutState = ReturnType<typeof useCheckout>;

interface StoreOverlaysProps {
  store: StoreData;
  salesAvailable: boolean;
  closedModalOpen: boolean;
  onCloseClosedModal: () => void;
  refreshRequired: boolean;
  onRefresh: () => void;
  loginPromptOpen: boolean;
  onCloseLoginPrompt: () => void;
  onLogin: () => void;
  onContinueAsGuest: () => void;
  savePromptOpen: boolean;
  onSaveCustomer: () => void;
  onSkipSaveCustomer: () => void;
  onCloseSavePrompt: () => void;
  toast: { message: string; kind: "success" | "error" } | null;
  onCloseToast: () => void;
  eligiblePromotions: EligibleStorePromotion[];
  promotionChoiceOpen: boolean;
  onChoosePromotion: (id: string) => void;
  onSkipPromotion: () => void;
  promotionToConfigure: StorePromotion | null;
  onClosePromotionBuilder: () => void;
  onConfirmPromotion: (selectionByGroup: Record<number, Record<string, number>>) => void;
  products: ProductList;
  unavailableIngredients: ReturnType<typeof useStore>["unavailableIngredients"];
  checkoutTotal: number;
  cartState: CartState;
  selection: Selection;
  checkoutState: CheckoutState;
  cartOpen: boolean;
  onCloseCart: () => void;
  onCheckout: () => void;
  cartSubtotalBeforeDiscount: number;
  promotionSavings: number;
  checkoutOpen: boolean;
  onCloseCheckout: () => void;
  onCheckoutAction: (action: "pay" | "whatsapp") => void;
  paying: boolean;
  onBackToCart: () => void;
  onAddSelectedProduct: () => void;
}

export const StoreOverlays = ({
  store,
  salesAvailable,
  closedModalOpen,
  onCloseClosedModal,
  refreshRequired,
  onRefresh,
  loginPromptOpen,
  onCloseLoginPrompt,
  onLogin,
  onContinueAsGuest,
  savePromptOpen,
  onSaveCustomer,
  onSkipSaveCustomer,
  onCloseSavePrompt,
  toast,
  onCloseToast,
  eligiblePromotions,
  promotionChoiceOpen,
  onChoosePromotion,
  onSkipPromotion,
  promotionToConfigure,
  onClosePromotionBuilder,
  onConfirmPromotion,
  products,
  unavailableIngredients,
  checkoutTotal,
  cartState,
  selection,
  checkoutState,
  cartOpen,
  onCloseCart,
  onCheckout,
  cartSubtotalBeforeDiscount,
  promotionSavings,
  checkoutOpen,
  onCloseCheckout,
  onCheckoutAction,
  paying,
  onBackToCart,
  onAddSelectedProduct,
}: StoreOverlaysProps) => (
  <>
    {closedModalOpen && (
      <ClosedStoreModal
        isOpen={Boolean(store?.cash_register_open)}
        canOrder={salesAvailable}
        storeName={store?.name || "el comercio"}
        onClose={onCloseClosedModal}
      />
    )}

    {refreshRequired && <RefreshStoreModal onRefresh={onRefresh} />}

    {loginPromptOpen && (
      <SaveCustomerPrompt
        title="¿Querés iniciar sesión?"
        description="Si ingresás tus datos, los vamos a completar automáticamente al finalizar tu compra. También podés continuar como invitado."
        saveLabel="Iniciar sesión"
        skipLabel="Continuar como invitado"
        onSave={onLogin}
        onSkip={onContinueAsGuest}
        onClose={onCloseLoginPrompt}
      />
    )}

    {savePromptOpen && (
      <SaveCustomerPrompt
        onSave={onSaveCustomer}
        onSkip={onSkipSaveCustomer}
        onClose={onCloseSavePrompt}
      />
    )}

    {toast && (
      <StoreToast message={toast.message} kind={toast.kind} onClose={onCloseToast} />
    )}

    {promotionChoiceOpen && eligiblePromotions.length > 1 && (
      <PromotionChoiceModal
        promotions={eligiblePromotions}
        onChoose={onChoosePromotion}
        onSkip={onSkipPromotion}
      />
    )}

    {promotionToConfigure && (
      <PromotionBuilderModal
        promotion={promotionToConfigure}
        products={products}
        salesAvailable={salesAvailable}
        onClose={onClosePromotionBuilder}
        onConfirm={onConfirmPromotion}
      />
    )}

    <ProductModal
      product={selection.selectedProduct}
      unavailableIngredients={unavailableIngredients}
      garnish={selection.selectedGarnish}
      removedIngredients={selection.removedIngredients}
      note={selection.itemNote}
      onGarnishChange={selection.setSelectedGarnish}
      onNoteChange={selection.setItemNote}
      onToggleIngredient={selection.toggleRemovedIngredient}
      onClose={selection.resetSelection}
      onAdd={onAddSelectedProduct}
    />

    {cartState.cart.length > 0 && (
      <CartDrawer
        open={cartOpen}
        cart={cartState.cart}
        cartCount={cartState.cartCount}
        cartTotal={cartSubtotalBeforeDiscount}
        onClose={onCloseCart}
        onChangeQuantity={cartState.changeQuantity}
        onCheckout={onCheckout}
        promotionSavings={promotionSavings}
      />
    )}

    <CheckoutModal
      open={checkoutOpen}
      checkout={checkoutState.checkout}
      total={checkoutTotal}
      error={checkoutState.checkoutError}
      onUpdate={checkoutState.updateCheckout}
      onClose={onCloseCheckout}
      onConfirm={() => onCheckoutAction("whatsapp")}
      onPay={() => onCheckoutAction("pay")}
      paying={paying}
      salesEnabled={salesAvailable}
      deliveryEnabled={Boolean(store?.configuration?.delivery_enabled)}
      pickupEnabled={store?.configuration?.pickup_enabled !== false}
      onBackToCart={onBackToCart}
      formatMoney={money}
    />
  </>
);
