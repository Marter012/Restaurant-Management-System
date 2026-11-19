import type { StoreView } from "./BottomNavigation.tsx";
import { HeroSection } from "./HeroSection.tsx";
import { StoreHeader } from "./StoreHeader.tsx";
import { StoreFooter } from "./StoreFooter.tsx";
import { Catalog } from "../Catalog/Catalog.tsx";
import { Promotions } from "../Catalog/Promotions.tsx";
import { FeaturedSection } from "../Catalog/FeaturedSection.tsx";
import { CustomerAccount } from "../Account/CustomerAccount.tsx";
import { BottomNavigation } from "./BottomNavigation.tsx";
import { useStore } from "../../hooks/useStore.ts";
import { useCart } from "../../hooks/useCart.ts";
import { useProductSelection } from "../../hooks/useProductSelection.ts";

type StoreData = ReturnType<typeof useStore>["store"];
type ProductList = ReturnType<typeof useStore>["products"];
type Selection = ReturnType<typeof useProductSelection>;

interface StorePageContentProps {
  store: StoreData;
  products: ProductList;
  promotions: ReturnType<typeof useStore>["promotions"];
  activeView: StoreView;
  salesAvailable: boolean;
  cartCount: number;
  selection: Selection;
  getProductQuantity: ReturnType<typeof useCart>["getProductQuantity"];
  incrementProduct: ReturnType<typeof useCart>["incrementProduct"];
  decrementProduct: ReturnType<typeof useCart>["decrementProduct"];
  onNavigate: (view: StoreView) => void;
  onOpenCart: () => void;
  onSelectPromotion: (promotion: ReturnType<typeof useStore>["promotions"][number]) => void;
  onToast: (message: string, kind?: "success" | "error") => void;
  onCustomerAuthenticated: (profile: { first_name: string; last_name: string; phone: string }) => void;
}

export const StorePageContent = ({
  store,
  products,
  promotions,
  activeView,
  salesAvailable,
  cartCount,
  selection,
  getProductQuantity,
  incrementProduct,
  decrementProduct,
  onNavigate,
  onOpenCart,
  onSelectPromotion,
  onToast,
  onCustomerAuthenticated,
}: StorePageContentProps) => (
  <>
    <StoreHeader
      store={store}
      cartCount={cartCount}
      onOpenCart={onOpenCart}
      onOpenAccount={() => onNavigate("account")}
    />

    {activeView === "home" && (
      <>
        <HeroSection
          config={store?.configuration}
          salesAvailable={salesAvailable}
          onBrowse={() => onNavigate("products")}
        />
        {store?.configuration?.show_featured && (
          <FeaturedSection
            products={products.filter((product) => product.featured)}
            getProductQuantity={getProductQuantity}
            onSelectProduct={selection.openProduct}
            onIncrementProduct={incrementProduct}
            onDecrementProduct={decrementProduct}
          />
        )}
        {store?.configuration?.show_promotions && (
          <Promotions
            items={promotions
              .filter((item) => item.status !== false && item.featured)
              .slice(0, 3)}
            onSelect={onSelectPromotion}
          />
        )}
      </>
    )}

    {activeView === "products" && (
      <Catalog
        products={products}
        getProductQuantity={getProductQuantity}
        onSelectProduct={selection.openProduct}
        onIncrementProduct={incrementProduct}
        onDecrementProduct={decrementProduct}
      />
    )}

    {activeView === "promotions" && (
      <Promotions
        items={promotions.filter((item) => item.status !== false)}
        onSelect={onSelectPromotion}
      />
    )}

    {activeView === "account" && (
      <CustomerAccount
        storeName={store?.name || "la tienda"}
        onToast={onToast}
        onAuthenticated={onCustomerAuthenticated}
      />
    )}

    {activeView !== "home" && activeView !== "account" && (
      <StoreFooter store={store} />
    )}

    <BottomNavigation
      onNavigate={onNavigate}
      onCart={onOpenCart}
      activeView={activeView}
      cartCount={cartCount}
    />
  </>
);
