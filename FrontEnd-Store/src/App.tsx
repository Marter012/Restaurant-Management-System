import { useCallback, useEffect, useRef, useState } from "react";
import type { StoreConfiguration, StorePromotion } from "./types/store.ts";
import { useStore } from "./hooks/useStore.ts";
import { useCart } from "./hooks/useCart.ts";
import { useProductSelection } from "./hooks/useProductSelection.ts";
import { useCheckout } from "./hooks/useCheckout.ts";
import { LoadingScreen } from "./components/LoadingScreen/LoadingScreen.tsx";
import { ClosedStoreScreen } from "./components/ClosedStoreScreen/ClosedStoreScreen.tsx";
import { buildWhatsAppUrl } from "./utils/whatsapp.ts";
import { createMercadoPagoOrder, getStoreInfo } from "./services/publicApi.ts";
import { calculatePromotionTotal, getEligiblePromotions } from "./utils/cart.ts";
import { clearCustomerSession, readCustomerSession } from "./utils/customerSession.ts";
import { Page } from "./components/Page/Page.tsx";
import { StoreOverlays } from "./components/StoreOverlays/StoreOverlays.tsx";
import { useStoreNavigation } from "./hooks/useStoreNavigation.ts";

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
  const { activeView, navigate } = useStoreNavigation();
  const [loginPromptOpen, setLoginPromptOpen] = useState(false);
  const [savePromptOpen, setSavePromptOpen] = useState(false);
  const [pendingCheckoutAction, setPendingCheckoutAction] = useState<
    "pay" | "whatsapp" | null
  >(null);
  const [customerSession, setCustomerSession] = useState(readCustomerSession);
  const [closedModalOpen, setClosedModalOpen] = useState(false);
  const [refreshRequired, setRefreshRequired] = useState(false);
  const operationalVersionRef = useRef<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    kind: "success" | "error";
  } | null>(null);
  const [selectedPromotionId, setSelectedPromotionId] = useState<string | null>(
    null,
  );
  const [promotionChoiceOpen, setPromotionChoiceOpen] = useState(false);
  const [promotionToConfigure, setPromotionToConfigure] = useState<
    StorePromotion | null
  >(null);
  const notify = useCallback(
    (message: string, kind: "success" | "error" = "success") => {
      setToast({ message, kind });
      window.setTimeout(() => setToast(null), 4200);
    },
    [],
  );
  const [previewConfiguration, setPreviewConfiguration] =
    useState<StoreConfiguration | null>(null);
  const activeStore =
    store && previewConfiguration
      ? {
          ...store,
          name: previewConfiguration.store_title || store.name,
          configuration: previewConfiguration,
        }
      : store;

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
    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [store?.operational_updated_at]);

  useEffect(() => {
    const receivePreview = (event: MessageEvent) => {
      if (event.source !== window.parent || window.parent === window) return;
      if (
        event.data?.type !== "STORE_PREVIEW_CONFIG" ||
        !event.data.configuration
      )
        return;
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
        notify(
          "Pago aprobado. Estamos actualizando tu historial de compras.",
          "success",
        );
      } else {
        notify(
          "El pago fue procesado. Iniciá sesión en Mi cuenta para consultar tus compras.",
          "success",
        );
      }
    } else if (paymentResult === "pending") {
      notify(
        "Tu pago está pendiente de confirmación de Mercado Pago.",
        "error",
      );
    } else if (paymentResult === "failure") {
      notify("El pago no se completó. Podés volver a intentarlo.", "error");
    }

    params.delete("payment");
    params.delete("order");
    const query = params.toString();
    window.history.replaceState(
      {},
      document.title,
      `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
    );
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
    notify(`${selection.selectedProduct.name} agregado al carrito.`, "success");
    setCartOpen(true);
  };

  const eligiblePromotions = getEligiblePromotions(
    cart,
    promotions.filter((item) => item.status !== false),
  );
  const salesAvailable = Boolean(
    activeStore?.public_sales_enabled && activeStore?.cash_register_open,
  );
  const cartSignature = cart
    .map((item) => `${item.product.id}:${item.quantity}`)
    .join("|");
  const eligibilitySignature = eligiblePromotions
    .map((item) => item.id)
    .join("|");
  useEffect(() => {
    setSelectedPromotionId(null);
    setPromotionChoiceOpen(eligiblePromotions.length > 1);
    if (eligiblePromotions.length === 1)
      setSelectedPromotionId(eligiblePromotions[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartSignature, eligibilitySignature]);
  const cartSubtotalBeforeDiscount = cart.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0,
  );
  const pricing = calculatePromotionTotal(
    cart,
    promotions.filter((item) => item.status !== false),
    eligiblePromotions.length > 1
      ? selectedPromotionId
        ? [selectedPromotionId]
        : []
      : undefined,
  );
  useEffect(() => {
    if (activeStore) setClosedModalOpen(true);
  }, [Boolean(activeStore)]);

  const setCheckoutFields = (profile: {
    first_name: string;
    last_name: string;
    phone: string;
  }) => {
    checkoutState.updateCheckout("firstName", profile.first_name);
    checkoutState.updateCheckout("lastName", profile.last_name);
    checkoutState.updateCheckout(
      "customerName",
      `${profile.first_name} ${profile.last_name}`.trim(),
    );
    checkoutState.updateCheckout("phone", profile.phone);
    checkoutState.updateCheckout(
      "location",
      "location" in profile ? String(profile.location || "") : "",
    );
  };

  const openCheckout = () => {
    checkoutState.setCheckoutError("");
    setCheckoutOpen(true);
    setCartOpen(false);
  };

  const startCheckout = () => {
    if (!salesAvailable) {
      notify(
        "Las compras se habilitarán cuando el local abra una caja.",
        "error",
      );
      return;
    }
    if (!cart.length) return;
    if (!readCustomerSession()) {
      setLoginPromptOpen(true);
      setCartOpen(false);
      return;
    }
    openCheckout();
  };

  const onCustomerAuthenticated = (profile: {
    first_name: string;
    last_name: string;
    phone: string;
  }) => {
    setCheckoutFields(profile);
    setCustomerSession(readCustomerSession());
    setLoginPromptOpen(false);
    // Iniciar sesión desde "Mi cuenta" no debe abrir un carrito vacío.
    // Solo continuamos al checkout automáticamente si el cliente ya eligió productos.
    if (cart.length > 0) {
      navigate("home");
      openCheckout();
    } else {
      notify(
        "Sesión iniciada. Todavía no tenés productos en el carrito.",
        "success",
      );
    }
  };

  const requestCheckoutAction = (action: "pay" | "whatsapp") => {
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
    notify(
      "Ingresá tu número de teléfono para acceder o crear tu cuenta.",
      "success",
    );
  };

  useEffect(() => {
    if (!customerSession) return;
    const remaining = customerSession.expiresAt - Date.now();
    if (remaining <= 0) {
      clearCustomerSession();
      setCustomerSession(null);
      return;
    }
    setCheckoutFields(customerSession.customer);
    const timer = window.setTimeout(() => {
      clearCustomerSession();
      setCustomerSession(null);
      checkoutState.updateCheckout("firstName", "");
      checkoutState.updateCheckout("lastName", "");
      checkoutState.updateCheckout("customerName", "");
      checkoutState.updateCheckout("phone", "");
      checkoutState.updateCheckout("location", "");
      checkoutState.updateCheckout("email", "");
      notify("Tu sesión se cerró después de 10 minutos.", "error");
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
      checkoutState.setCheckoutError(
        "Las compras están deshabilitadas hasta que el comercio abra una caja y habilite las ventas online.",
      );
      return;
    }
    if (checkoutState.checkout.phone.replace(/\D/g, "").length < 8) {
      checkoutState.setCheckoutError(
        "Ingresá un teléfono válido (al menos 8 dígitos) para continuar.",
      );
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
      notify("Te estamos llevando a Mercado Pago.", "success");
      window.location.assign(result.checkout_url);
    } catch (err: unknown) {
      const apiMessage = (
        err as { response?: { data?: { detail?: string } }; message?: string }
      )?.response?.data?.detail;
      const message =
        typeof apiMessage === "string"
          ? apiMessage
          : (err as { message?: string })?.message ||
            "No pudimos conectar con el servidor.";
      checkoutState.setCheckoutError(message);
      notify(message, "error");
      setPaying(false);
    }
  };

  const confirmWhatsApp = () => {
    if (!salesAvailable) {
      checkoutState.setCheckoutError(
        "La tienda está en modo de vista previa. Las ventas se habilitarán cuando el comercio abra una caja.",
      );
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
    if (result.url) {
      notify("Abriendo WhatsApp con tu pedido.", "success");
      window.location.assign(result.url);
    }
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
      <Page
        store={activeStore}
        products={products}
        promotions={promotions}
        activeView={activeView}
        salesAvailable={salesAvailable}
        cartCount={cartCount}
        selection={selection}
        getProductQuantity={getProductQuantity}
        incrementProduct={incrementProduct}
        decrementProduct={decrementProduct}
        onNavigate={navigate}
        onOpenCart={() => setCartOpen(true)}
        onSelectPromotion={setPromotionToConfigure}
        onToast={notify}
        onCustomerAuthenticated={onCustomerAuthenticated}
      >
      <StoreOverlays
        store={activeStore}
        salesAvailable={salesAvailable}
        closedModalOpen={closedModalOpen}
        onCloseClosedModal={() => setClosedModalOpen(false)}
        refreshRequired={refreshRequired}
        onRefresh={() => window.location.reload()}
        loginPromptOpen={loginPromptOpen}
        onCloseLoginPrompt={() => setLoginPromptOpen(false)}
        onLogin={() => {
          setLoginPromptOpen(false);
          navigate("account");
        }}
        onContinueAsGuest={() => {
          setLoginPromptOpen(false);
          openCheckout();
        }}
        savePromptOpen={savePromptOpen}
        onSaveCustomer={saveCustomerBeforeCheckout}
        onSkipSaveCustomer={() => {
          setSavePromptOpen(false);
          const action = pendingCheckoutAction;
          setPendingCheckoutAction(null);
          if (action === "pay") void payWithMercadoPago();
          if (action === "whatsapp") confirmWhatsApp();
        }}
        onCloseSavePrompt={() => {
          setSavePromptOpen(false);
          setPendingCheckoutAction(null);
        }}
        toast={toast}
        onCloseToast={() => setToast(null)}
        eligiblePromotions={eligiblePromotions}
        promotionChoiceOpen={promotionChoiceOpen}
        onChoosePromotion={(id) => {
          setSelectedPromotionId(id);
          setPromotionChoiceOpen(false);
          notify("Promoción seleccionada y aplicada al carrito.", "success");
        }}
        onSkipPromotion={() => {
          setSelectedPromotionId(null);
          setPromotionChoiceOpen(false);
          notify("Podés continuar sin aplicar una promoción.", "success");
        }}
        promotionToConfigure={promotionToConfigure}
        onClosePromotionBuilder={() => setPromotionToConfigure(null)}
        onConfirmPromotion={(selectionByGroup) => {
          for (
            let groupIndex = 0;
            groupIndex < (promotionToConfigure?.items || []).length;
            groupIndex += 1
          ) {
            for (const [productId, quantity] of Object.entries(
              selectionByGroup[groupIndex] || {},
            )) {
              const product = products.find((item) => item.id === productId);
              if (!product) continue;
              for (let index = 0; index < quantity; index += 1)
                addItem(product, "", [], "");
            }
          }
          if (promotionToConfigure) {
            notify(`${promotionToConfigure.name} agregada al carrito.`, "success");
          }
          setPromotionToConfigure(null);
          setCartOpen(true);
        }}
        products={products}
        unavailableIngredients={unavailableIngredients}
        checkoutTotal={pricing.total}
        cartState={{
          cart,
          cartCount,
          changeQuantity,
        }}
        selection={selection}
        checkoutState={checkoutState}
        cartOpen={cartOpen}
        onCloseCart={() => setCartOpen(false)}
        onCheckout={startCheckout}
        cartSubtotalBeforeDiscount={cartSubtotalBeforeDiscount}
        promotionSavings={Math.max(0, cartSubtotalBeforeDiscount - pricing.total)}
        checkoutOpen={checkoutOpen}
        onCloseCheckout={() => setCheckoutOpen(false)}
        onCheckoutAction={requestCheckoutAction}
        paying={paying}
        onBackToCart={() => {
          setCheckoutOpen(false);
          setCartOpen(true);
        }}
        onAddSelectedProduct={addSelectedProduct}
      />
    </Page>
  );
};

export default App;
