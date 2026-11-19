import { useCallback, useEffect, useRef, useState } from "react";
import type { StoreConfiguration } from "./types/store.ts";
import { Page } from "./styles/AppStyles.ts"
import { useStore } from "./hooks/useStore.ts";
import { useCart } from "./hooks/useCart.ts";
import { useProductSelection } from "./hooks/useProductSelection.ts";
import { useCheckout } from "./hooks/useCheckout.ts";
import { HeroSection } from "./components/Layout/HeroSection.tsx";
import { StoreHeader } from "./components/Layout/StoreHeader.tsx";
import { StoreFooter } from "./components/Layout/StoreFooter.tsx";
import { Catalog } from "./components/Catalog/Catalog.tsx";
import { ProductModal } from "./components/Product/ProductModal.tsx";
import { CartDrawer } from "./components/Cart/CartDrawer.tsx";
import { CheckoutModal } from "./components/Checkout/CheckoutModal.tsx";
import { LoadingScreen } from "./components/Feedback/LoadingScreen.tsx";
import { ClosedStoreScreen } from "./components/Feedback/ClosedStoreScreen.tsx";
import { money } from "./utils/money.ts";
import { buildWhatsAppUrl } from "./utils/whatsapp.ts";
import { createMercadoPagoOrder, getStoreInfo } from "./services/publicApi.ts";
import { Promotions } from "./components/Catalog/Promotions.tsx";
import { FeaturedSection } from "./components/Catalog/FeaturedSection.tsx";
import { calculatePromotionTotal, getEligiblePromotions } from "./utils/cart.ts";
import { PromotionChoiceModal } from "./components/Cart/PromotionChoiceModal.tsx";
import { BottomNavigation, type StoreView } from "./components/Layout/BottomNavigation.tsx";
import { StoreToast } from "./components/Feedback/StoreToast.tsx";
import { ClosedStoreModal } from "./components/Feedback/ClosedStoreModal.tsx";
import { CustomerAccount } from "./components/Account/CustomerAccount.tsx";
import { SaveCustomerPrompt } from "./components/Account/SaveCustomerPrompt.tsx";
import { clearCustomerSession, readCustomerSession } from "./utils/customerSession.ts";
import { RefreshStoreModal } from "./components/Feedback/RefreshStoreModal.tsx";

const App = () => {
  const {
    store,
    products,
    promotions,
    unavailableIngredients,
    loading,
    error,
  } = useStore();
  const {
    cart,
    addItem,
    changeQuantity,
    getProductQuantity,
    incrementProduct,
    decrementProduct,
    cartCount,
  } = useCart();
  const selection = useProductSelection();
  const checkoutState = useCheckout();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paying, setPaying] = useState(false);
  const [activeView, setActiveView] = useState<StoreView>(() => {
    const path = window.location.pathname.replace(/\/$/, "") || "/";
    if (path === "/productos") return "products";
    if (path === "/promociones") return "promotions";
    if (path === "/cuenta") return "account";
    return "home";
  });
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [savePromptOpen, setSavePromptOpen] = useState(false);
  const [pendingCheckoutAction, setPendingCheckoutAction] = useState<"pay"|"whatsapp"|null>(null);
  const [customerSession, setCustomerSession] = useState(readCustomerSession);
  const [closedModalOpen, setClosedModalOpen] = useState(false);
  const [refreshRequired, setRefreshRequired] = useState(false);
  const operationalVersionRef = useRef<string | null>(null);
  const [toast, setToast] = useState<{message:string;kind:"success"|"error"}|null>(null);
  const [selectedPromotionId, setSelectedPromotionId] = useState<string | null>(null);
  const [promotionChoiceOpen, setPromotionChoiceOpen] = useState(false);
  const notify = useCallback((message:string,kind:"success"|"error"="success") => { setToast({message,kind}); window.setTimeout(()=>setToast(null),4200); }, []);
  const [previewConfiguration, setPreviewConfiguration] = useState<StoreConfiguration | null>(null);
  const activeStore = store && previewConfiguration ? {
    ...store,
    name: previewConfiguration.store_title || store.name,
    configuration: previewConfiguration,
  } : store;

  const navigate = useCallback((view: StoreView) => {
    const paths: Record<StoreView, string> = { home: "/", products: "/productos", promotions: "/promociones", account: "/cuenta" };
    const path = paths[view];
    if (window.location.pathname !== path) window.history.pushState({ storeView: view }, "", path);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.replace(/\/$/, "") || "/";
      setActiveView(path === "/productos" ? "products" : path === "/promociones" ? "promotions" : path === "/cuenta" ? "account" : "home");
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!store) return;
    if (operationalVersionRef.current === null) {
      operationalVersionRef.current = store.operational_updated_at || "";
    }
    let active = true;
    const checkOperationalConfiguration = async () => {
      try {
        const latest = await getStoreInfo();
        if (!active) return;
        const latestVersion = latest.operational_updated_at || "";
        if (latestVersion !== operationalVersionRef.current) {
          operationalVersionRef.current = latestVersion;
          setRefreshRequired(true);
        }
      } catch {
        // Un fallo temporal de red no debe interrumpir la navegación del cliente.
      }
    };
    const interval = window.setInterval(checkOperationalConfiguration, 5000);
    return () => { active = false; window.clearInterval(interval); };
  }, [store?.operational_updated_at]);

  useEffect(() => {
    const receivePreview = (event: MessageEvent) => {
      if (event.source !== window.parent || window.parent === window) return;
      if (event.data?.type !== "STORE_PREVIEW_CONFIG" || !event.data.configuration) return;
      setPreviewConfiguration(event.data.configuration as StoreConfiguration);
    };
    window.addEventListener("message", receivePreview);
    return () => window.removeEventListener("message", receivePreview);
  }, []);

  // Mercado Pago vuelve a la URL pública del Store con payment=success.
  // Si existe una sesión válida, abrimos directamente el historial de compras.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentResult = params.get("payment");
    if (!paymentResult) return;

    if (paymentResult === "success") {
      const session = readCustomerSession();
      if (session) {
        setCustomerSession(session);
        navigate("account");
        notify("Pago aprobado. Estamos actualizando tu historial de compras.", "success");
      } else {
        notify("El pago fue procesado. Iniciá sesión en Mi cuenta para consultar tus compras.", "success");
      }
    } else if (paymentResult === "pending") {
      notify("Tu pago está pendiente de confirmación de Mercado Pago.", "error");
    } else if (paymentResult === "failure") {
      notify("El pago no se completó. Podés volver a intentarlo.", "error");
    }

    params.delete("payment");
    params.delete("order");
    const query = params.toString();
    window.history.replaceState({}, document.title, `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`);
  }, []);

  const addSelectedProduct = () => {
    if (!selection.selectedProduct) return;
    addItem(
      selection.selectedProduct,
      selection.selectedGarnish,
      selection.removedIngredients,
      selection.itemNote,
    );
    selection.resetSelection();
    notify(`${selection.selectedProduct.name} agregado al carrito.`,"success");
    setCartOpen(true);
  };

  const eligiblePromotions = getEligiblePromotions(cart, promotions.filter(item => item.status !== false));
  const salesAvailable = Boolean(activeStore?.public_sales_enabled && activeStore?.cash_register_open);
  const cartSignature = cart.map(item => `${item.product.id}:${item.quantity}`).join("|");
  const eligibilitySignature = eligiblePromotions.map(item => item.id).join("|");
  useEffect(() => {
    setSelectedPromotionId(null);
    setPromotionChoiceOpen(eligiblePromotions.length > 1);
    if (eligiblePromotions.length === 1) setSelectedPromotionId(eligiblePromotions[0].id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartSignature, eligibilitySignature]);
  const cartSubtotalBeforeDiscount = cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
  const pricing = calculatePromotionTotal(
    cart,
    promotions.filter(item => item.status !== false),
    eligiblePromotions.length > 1 ? (selectedPromotionId ? [selectedPromotionId] : []) : undefined,
  );
  useEffect(()=>{ if(activeStore && !salesAvailable && !sessionStorage.getItem("store_closed_notice_seen")){setClosedModalOpen(true);sessionStorage.setItem("store_closed_notice_seen","1");}},[activeStore,salesAvailable]);

  const setCheckoutFields = (profile: {first_name:string;last_name:string;phone:string}) => {
    checkoutState.updateCheckout("firstName", profile.first_name);
    checkoutState.updateCheckout("lastName", profile.last_name);
    checkoutState.updateCheckout("customerName", `${profile.first_name} ${profile.last_name}`.trim());
    checkoutState.updateCheckout("phone", profile.phone);
    checkoutState.updateCheckout("location", "location" in profile ? String(profile.location || "") : "");
  };

  const openCheckout = () => {
    checkoutState.setCheckoutError("");
    setCheckoutOpen(true);
    setCartOpen(false);
  };

  const startCheckout = () => {
    if (!salesAvailable) { notify("Las compras se habilitarán cuando el local abra una caja.","error"); return; }
    if (!cart.length) return;
    if (!readCustomerSession()) {
      setLoginPromptOpen(true);
      setCartOpen(false);
      return;
    }
    openCheckout();
  };

  const onCustomerAuthenticated = (profile: {first_name:string;last_name:string;phone:string}) => {
    setCheckoutFields(profile);
    setCustomerSession(readCustomerSession());
    setLoginPromptOpen(false);
    // Iniciar sesión desde "Mi cuenta" no debe abrir un carrito vacío.
    // Solo continuamos al checkout automáticamente si el cliente ya eligió productos.
    if (cart.length > 0) {
      navigate("home");
      openCheckout();
    } else {
      notify("Sesión iniciada. Todavía no tenés productos en el carrito.", "success");
    }
  };

  const requestCheckoutAction = (action: "pay"|"whatsapp") => {
    if (!readCustomerSession()) {
      setPendingCheckoutAction(action);
      setSavePromptOpen(true);
      return;
    }
    if (action === "pay") void payWithMercadoPago();
    else confirmWhatsApp();
  };

  const saveCustomerBeforeCheckout = async () => {
    setSavePromptOpen(false);
    navigate("account");
    notify("Ingresá tu número de teléfono para acceder o crear tu cuenta.", "success");
  };

  useEffect(() => {
    if (!customerSession) return;
    const remaining = customerSession.expiresAt - Date.now();
    if (remaining <= 0) { clearCustomerSession(); setCustomerSession(null); return; }
    setCheckoutFields(customerSession.customer);
    const timer = window.setTimeout(() => {
      clearCustomerSession(); setCustomerSession(null);
      checkoutState.updateCheckout("firstName","");
      checkoutState.updateCheckout("lastName","");
      checkoutState.updateCheckout("customerName","");
      checkoutState.updateCheckout("phone","");
      checkoutState.updateCheckout("location","");
      checkoutState.updateCheckout("email","");
      notify("Tu sesión se cerró después de 10 minutos.","error");
    }, remaining);
    return () => window.clearTimeout(timer);
  }, [customerSession?.expiresAt]);

  useEffect(() => {
    const theme = activeStore?.configuration?.theme;
    if (!theme) return;
    const root = document.documentElement;
    const variables: Record<string, string> = {
      "--app-primary": theme.primary,
      "--app-accent": theme.accent,
      "--app-canvas": theme.canvas,
      "--app-surface": theme.surface,
      "--app-surface-strong": theme.surface_strong,
      "--app-ink": theme.ink,
      "--app-muted": theme.muted,
      "--app-border": theme.border,
      "--app-primary-hover": theme.primary,
    };
    Object.entries(variables).forEach(([key, value]) =>
      root.style.setProperty(key, value),
    );
  }, [activeStore]);

  const payWithMercadoPago = async () => {
    if (!salesAvailable) {
      checkoutState.setCheckoutError("Las compras están deshabilitadas hasta que el comercio abra una caja y habilite las ventas online.");
      return;
    }
    if (checkoutState.checkout.phone.replace(/\D/g, "").length < 8) {
      checkoutState.setCheckoutError("Ingresá un teléfono válido (al menos 8 dígitos) para continuar.");
      return;
    }
    if (
      checkoutState.checkout.fulfillment === "delivery" &&
      !checkoutState.checkout.address.trim()
    ) {
      checkoutState.setCheckoutError("Ingresá la dirección de entrega.");
      return;
    }
    setPaying(true);
    checkoutState.setCheckoutError("");
    try {
      const result = await createMercadoPagoOrder(cart, checkoutState.checkout);
      if (!result.checkout_url)
        throw new Error("No se recibió el enlace de pago.");
      notify("Te estamos llevando a Mercado Pago.","success");
      window.location.assign(result.checkout_url);
    } catch (err: unknown) {
      const apiMessage = (err as { response?: { data?: { detail?: string } }; message?: string })?.response?.data?.detail;
      const message = typeof apiMessage === "string"
        ? apiMessage
        : (err as { message?: string })?.message || "No pudimos conectar con el servidor.";
      checkoutState.setCheckoutError(message);
      notify(message, "error");
      setPaying(false);
    }
  };

  const confirmWhatsApp = () => {
    if (!salesAvailable) {
      checkoutState.setCheckoutError("La tienda está en modo de vista previa. Las ventas se habilitarán cuando el comercio abra una caja.");
      return;
    }
    const result = buildWhatsAppUrl(
      activeStore,
      cart,
      checkoutState.checkout,
      pricing.total,
    );
    if (result.error) {
      checkoutState.setCheckoutError(result.error);
      return;
    }
    if (result.url) { notify("Abriendo WhatsApp con tu pedido.","success"); window.location.assign(result.url); }
  };

  if (loading) return <LoadingScreen />;
  if (error)
    return (
      <ClosedStoreScreen
        store={activeStore}
        error={error}
        onRetry={() => window.location.reload()}
      />
    );
  return (
    <Page>
      {closedModalOpen && <ClosedStoreModal onClose={()=>setClosedModalOpen(false)}/>}
      {refreshRequired && <RefreshStoreModal onRefresh={()=>window.location.reload()}/>}
      <StoreHeader store={activeStore} cartCount={cartCount} onOpenCart={() => setCartOpen(true)} onOpenAccount={() => navigate("account")} />
      {activeView === "home" && <>
        <HeroSection config={activeStore?.configuration} salesAvailable={salesAvailable} onBrowse={() => navigate("products")} />
        {activeStore?.configuration?.show_featured && <FeaturedSection
          products={products.filter((product) => product.featured)}
          getProductQuantity={getProductQuantity}
          onSelectProduct={selection.openProduct}
          onIncrementProduct={incrementProduct}
          onDecrementProduct={decrementProduct}
        />}
        {activeStore?.configuration?.show_promotions && <Promotions items={promotions.filter((item) => item.status !== false && item.featured).slice(0, 3)} />}
      </>}
      {activeView === "products" && <Catalog
        products={products}
        getProductQuantity={getProductQuantity}
        onSelectProduct={selection.openProduct}
        onIncrementProduct={incrementProduct}
        onDecrementProduct={decrementProduct}
      />}
      {activeView === "promotions" && <Promotions items={promotions.filter((item) => item.status !== false)} />}
      {activeView === "account" && <CustomerAccount onToast={notify} onAuthenticated={onCustomerAuthenticated} />}
      {activeView !== "account" && <StoreFooter store={activeStore} />}
      <BottomNavigation onNavigate={navigate} onCart={() => setCartOpen(true)} activeView={activeView} cartCount={cartCount} />
      {loginPromptOpen && <SaveCustomerPrompt title="¿Querés iniciar sesión?" description="Si ingresás tus datos, los vamos a completar automáticamente al finalizar tu compra. También podés continuar como invitado." saveLabel="Iniciar sesión" skipLabel="Continuar como invitado" onSave={()=>{setLoginPromptOpen(false);navigate("account")}} onSkip={()=>{setLoginPromptOpen(false);openCheckout()}} onClose={()=>setLoginPromptOpen(false)}/>}
      {savePromptOpen && <SaveCustomerPrompt onSave={saveCustomerBeforeCheckout} onSkip={()=>{setSavePromptOpen(false);const action=pendingCheckoutAction;setPendingCheckoutAction(null);if(action==="pay")void payWithMercadoPago();if(action==="whatsapp")confirmWhatsApp()}} onClose={()=>{setSavePromptOpen(false);setPendingCheckoutAction(null)}}/>}
      {toast && <StoreToast message={toast.message} kind={toast.kind} onClose={()=>setToast(null)}/> }
      {promotionChoiceOpen && eligiblePromotions.length > 1 && (
        <PromotionChoiceModal
          promotions={eligiblePromotions}
          onChoose={(id) => { setSelectedPromotionId(id); setPromotionChoiceOpen(false); notify("Promoción seleccionada y aplicada al carrito.", "success"); }}
          onSkip={() => { setSelectedPromotionId(null); setPromotionChoiceOpen(false); notify("Podés continuar sin aplicar una promoción.", "success"); }}
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
        onAdd={addSelectedProduct}
      />

      {cart.length > 0 && <CartDrawer
        open={cartOpen}
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartSubtotalBeforeDiscount}
        onClose={() => setCartOpen(false)}
        onChangeQuantity={changeQuantity}
        onCheckout={startCheckout}
        promotionSavings={Math.max(0,cartSubtotalBeforeDiscount-pricing.total)}
      />}

      <CheckoutModal
        open={checkoutOpen}
        checkout={checkoutState.checkout}
        total={pricing.total}
        error={checkoutState.checkoutError}
        onUpdate={checkoutState.updateCheckout}
        onClose={() => setCheckoutOpen(false)}
        onConfirm={()=>requestCheckoutAction("whatsapp")}
        onPay={()=>requestCheckoutAction("pay")}
        paying={paying}
        salesEnabled={salesAvailable}
        deliveryEnabled={Boolean(activeStore?.configuration?.delivery_enabled)}
        pickupEnabled={activeStore?.configuration?.pickup_enabled !== false}
        onBackToCart={() => {
          setCheckoutOpen(false);
          setCartOpen(true);
        }}
        formatMoney={money}
      />
    </Page>
  );
};

export default App;
