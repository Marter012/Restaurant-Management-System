import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ArrowsClockwise, Receipt, SignOut, UserCircle, WarningCircle, X, Clock, CreditCard, Basket, Check } from "../../utils/icons.ts";
import { accessCustomer, getCustomerOrders, requestCustomerOrderRefund, updateCustomerMe, type CustomerOrder, type CustomerProfile } from "../../services/publicApi.ts";
import { money } from "../../utils/money.ts";
import { clearCustomerSession, readCustomerSession, saveCustomerSession } from "../../utils/customerSession.ts";
import {
  AccountPage, AccountHeading, AccountGrid, ProfileCard, ProfileAvatar,
  OrdersPanel, OrdersHeader, LoginPanel, LoginField, LoginButton, OrderCards, OrderMiniCard,
  OrderMiniTop, OrderBadges, Badge, OrderMiniMeta, EmptyOrders, Logout,
  DetailShade, DetailModal, DetailHeader, DetailContent, DetailGrid, DetailBlock, DetailItems,
  DetailItem, RefundButton, ProfileEditFields, SaveProfileButton,
} from "./CustomerAccountStyles.ts";

type Props = { storeName: string; onToast: (message: string, kind: "success" | "error") => void; onAuthenticated?: (profile: CustomerProfile) => void; };

function getApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) return detail.map((item: {msg?:string}) => item.msg || "Error de validación").join(". ");
    if (typeof error.response?.data?.message === "string") return error.response.data.message;
    if (error.response?.status) return `El servidor respondió ${error.response.status}. ${error.message}`;
  }
  return error instanceof Error ? error.message : "Ocurrió un error inesperado.";
}

const paymentLabels: Record<string, string> = { approved: "Aprobado", pending: "Pendiente", refunded: "Reembolsado", rejected: "Rechazado", cancelled: "Cancelado", in_process: "En proceso" };
const orderStatusLabels: Record<string, string> = { pending_payment: "Pendiente de pago", paid: "Pagado", paid_pending_cash: "Pagado · pendiente de caja", preparing: "En preparación", ready: "Listo", delivered: "Entregado", cancelled: "Cancelado", payment_error: "Error de pago" };
const paymentLabel = (value?: string) => paymentLabels[value || ""] || value || "Sin información";
const orderStatusLabel = (value?: string) => orderStatusLabels[value || ""] || value || "Sin estado";
const fulfillmentLabel = (value?: string) => value === "delivery" ? "Envío a domicilio" : "Retiro en el local";
const refundLabels: Record<string, string> = { requested: "Reembolso solicitado", processing: "Reembolso en proceso", refunded_needs_sync: "Reembolso aprobado", refunded: "Reembolsado" };
const refundLabel = (status?: string | null) => refundLabels[status || ""] || "";

export function CustomerAccount({ storeName, onToast, onAuthenticated }: Props) {
  const [session, setSession] = useState(readCustomerSession);
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [busy, setBusy] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<CustomerOrder | null>(null);
  const [refundOrder, setRefundOrder] = useState<number | null>(null);
  const [profileDraft, setProfileDraft] = useState({ first_name: "", last_name: "", location: "" });
  const [savingProfile, setSavingProfile] = useState(false);

  const loadOrders = useCallback(async (token: string) => {
    setLoadingOrders(true); setOrdersError("");
    try {
      const result = await getCustomerOrders(token);
      setOrders(result);
    } catch (error) {
      const message = getApiError(error);
      setOrdersError(message);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        clearCustomerSession(); setSession(null); setOrders([]);
        onToast("La sesión venció. Ingresá nuevamente tu teléfono.", "error");
      } else {
        onToast(`No pudimos cargar el historial: ${message}`, "error");
      }
    } finally { setLoadingOrders(false); }
  }, [onToast]);

  useEffect(() => { if (session?.token) void loadOrders(session.token); }, [session?.token, loadOrders]);
  useEffect(() => {
    if (!session) return;
    const remaining = Math.max(0, session.expiresAt - Date.now());
    const timer = window.setTimeout(() => { clearCustomerSession(); setSession(null); setOrders([]); onToast("Tu sesión venció. Ingresá nuevamente.", "error"); }, remaining);
    return () => window.clearTimeout(timer);
  }, [session?.expiresAt, onToast]);

  const submit = async () => {
    setBusy(true);
    try {
      const result = await accessCustomer({ phone: phone.trim() });
      const profile: CustomerProfile = { first_name: result.first_name || "", last_name: result.last_name || "", phone: result.phone, location: result.location || "" };
      const next = saveCustomerSession(result.token, profile, result.expires_in);
      setSession(next); onAuthenticated?.(profile); onToast("Sesión iniciada correctamente.", "success");
    } catch (error) { onToast(getApiError(error), "error"); }
    finally { setBusy(false); }
  };

  const logout = () => { clearCustomerSession(); setSession(null); setOrders([]); setOrdersError(""); setPhone(""); onToast("Cerraste sesión.", "success"); };

  const submitRefund = async () => {
    if (!selectedOrder || !session) return;
    setRefundOrder(selectedOrder.order_number);
    try {
      await requestCustomerOrderRefund(session.token, selectedOrder.order_number);
      onToast(`La solicitud de reembolso del pedido #${selectedOrder.order_number} fue enviada.`, "success");
      setSelectedOrder(null); await loadOrders(session.token);
    } catch (error) { onToast(getApiError(error), "error"); }
    finally { setRefundOrder(null); }
  };

  const profile = session?.customer;
  useEffect(() => {
    if (profile) setProfileDraft({ first_name: profile.first_name || "", last_name: profile.last_name || "", location: profile.location || "" });
  }, [profile?.first_name, profile?.last_name, profile?.location, profile?.phone]);
  const profileChanged = Boolean(profile) && (profileDraft.first_name !== (profile?.first_name || "") || profileDraft.last_name !== (profile?.last_name || "") || profileDraft.location !== (profile?.location || ""));
  const saveProfile = async () => {
    if (!session || !profileChanged) return;
    setSavingProfile(true);
    try {
      const updated = await updateCustomerMe(session.token, profileDraft);
      const normalized: CustomerProfile = { first_name: updated.first_name || profileDraft.first_name, last_name: updated.last_name || profileDraft.last_name, phone: updated.phone || session.customer.phone, location: updated.location || "" };
      const remainingSeconds = Math.max(1, Math.floor((session.expiresAt - Date.now()) / 1000));
      const refreshed = saveCustomerSession(session.token, normalized, remainingSeconds);
      setSession(refreshed);
      onAuthenticated?.(normalized);
      onToast("Tus datos se actualizaron correctamente.", "success");
    } catch (error) { onToast(getApiError(error), "error"); }
    finally { setSavingProfile(false); }
  };
  return (
    <AccountPage>
      <AccountHeading><span>MI CUENTA</span><h1>Tu espacio en {storeName}</h1><p>Consultá tus datos y revisá el estado de tus pedidos.</p></AccountHeading>
      {!session ? (
        <LoginPanel>
          <div className="login-icon"><UserCircle size={34} weight="duotone" /></div>
          <h2>Estás por iniciar sesión</h2>
          <p>Ingresá el número de teléfono que utilizaste al realizar tus compras. Si todavía no tenés una cuenta, la crearemos con ese número.</p>
          <LoginField> Número de teléfono
            <input value={phone} onChange={event => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" placeholder="Ej. +54 9 351 123 4567" maxLength={30} onKeyDown={event => { if (event.key === "Enter" && phone.replace(/\D/g, "").length >= 8) void submit(); }} />
          </LoginField>
          <LoginButton type="button" disabled={busy || phone.replace(/\D/g, "").length < 8} onClick={() => void submit()}>{busy ? "Ingresando…" : "Continuar"}</LoginButton>
          <small>El teléfono es el único dato obligatorio. El acceso todavía no utiliza verificación OTP.</small>
        </LoginPanel>
      ) : (
        <AccountGrid>
          <ProfileCard>
            <ProfileAvatar><UserCircle size={42} weight="duotone" /></ProfileAvatar>
            <span className="eyebrow">DATOS DEL CLIENTE</span>
            <h2>{[profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || "Cliente"}</h2>
            <ProfileEditFields>
              <label>Teléfono<input value={profile?.phone || ""} disabled readOnly /><span className="hint">El teléfono identifica la cuenta y no se puede modificar desde el Store.</span></label>
              <label>Nombre<input value={profileDraft.first_name} onChange={event => setProfileDraft(current => ({ ...current, first_name: event.target.value }))} maxLength={80} placeholder="Tu nombre" /></label>
              <label>Apellido<input value={profileDraft.last_name} onChange={event => setProfileDraft(current => ({ ...current, last_name: event.target.value }))} maxLength={80} placeholder="Tu apellido" /></label>
              <label>Dirección<input value={profileDraft.location} onChange={event => setProfileDraft(current => ({ ...current, location: event.target.value }))} maxLength={300} placeholder="Tu dirección (opcional)" /></label>
            </ProfileEditFields>
            {profileChanged && <SaveProfileButton type="button" onClick={() => void saveProfile()} disabled={savingProfile}><Check size={17}/>{savingProfile ? "Guardando datos…" : "Guardar datos"}</SaveProfileButton>}
            <p className="profile-note">Tus compras se asocian al número de teléfono de esta cuenta.</p>
            <Logout type="button" onClick={logout}><SignOut size={18} /> Cerrar sesión</Logout>
          </ProfileCard>
          <OrdersPanel>
            <OrdersHeader><div><span>ACTIVIDAD</span><h2>Mis pedidos</h2><p>Consultá el pago, la preparación y el detalle de cada compra.</p></div><button type="button" onClick={() => session && void loadOrders(session.token)} disabled={loadingOrders}><ArrowsClockwise className={loadingOrders ? "spin" : ""} size={18} /> Actualizar</button></OrdersHeader>
            {loadingOrders && orders.length === 0 ? <EmptyOrders><ArrowsClockwise className="spin" size={28}/><strong>Cargando tus pedidos…</strong></EmptyOrders> : ordersError && orders.length === 0 ? <EmptyOrders><WarningCircle size={30}/><strong>No pudimos cargar tu historial</strong><span>{ordersError}</span><button type="button" onClick={() => session && void loadOrders(session.token)}>Reintentar</button></EmptyOrders> : orders.length === 0 ? <EmptyOrders><Receipt size={30}/><strong>Todavía no tenés pedidos</strong><span>Cuando realices una compra con este teléfono, aparecerá acá.</span></EmptyOrders> : (
              <OrderCards>{orders.map(order => <OrderMiniCard key={order.order_number} type="button" onClick={() => setSelectedOrder(order)}>
                <OrderMiniTop><div><span className="order-number">PEDIDO #{order.order_number}</span><strong>{money(order.total)}</strong></div><span className="date">{new Date(order.created_at).toLocaleString("es-AR", { dateStyle: "medium", timeStyle: "short" })}</span></OrderMiniTop>
                <OrderBadges><Badge $kind={order.payment_status === "approved" ? "success" : order.payment_status === "refunded" ? "muted" : "warning"}><CreditCard size={14}/>{paymentLabel(order.payment_status)}</Badge><Badge $kind="neutral">{orderStatusLabel(order.status)}</Badge></OrderBadges>
                <OrderMiniMeta><span><CreditCard size={15}/>{order.payment_method || (order.payment_provider === "mercadopago" ? "Mercado Pago" : "Medio de pago pendiente")}</span><span><Clock size={15}/>{order.fulfillment === "delivery" ? "Envío" : "Retiro"}</span></OrderMiniMeta>
                <span className="open-detail">Ver detalle del pedido →</span>
              </OrderMiniCard>)}</OrderCards>
            )}
          </OrdersPanel>
        </AccountGrid>
      )}
      {selectedOrder && <DetailShade onMouseDown={event => { if (event.target === event.currentTarget) setSelectedOrder(null); }}><DetailModal role="dialog" aria-modal="true" aria-labelledby="order-detail-title">
        <DetailHeader><div><span>DETALLE DE COMPRA</span><h2 id="order-detail-title">Pedido #{selectedOrder.order_number}</h2></div><button type="button" onClick={() => setSelectedOrder(null)} aria-label="Cerrar"><X size={21}/></button></DetailHeader>
        <DetailContent>
          <DetailGrid>
            <DetailBlock><span>Fecha y horario</span><strong>{new Date(selectedOrder.created_at).toLocaleString("es-AR", { dateStyle: "full", timeStyle: "short" })}</strong></DetailBlock>
            <DetailBlock><span>Tipo de pago</span><strong>{selectedOrder.payment_method || (selectedOrder.payment_provider === "mercadopago" ? "Mercado Pago" : "No informado")}</strong></DetailBlock>
            <DetailBlock><span>Estado del pago</span><strong>{paymentLabel(selectedOrder.payment_status)}</strong></DetailBlock>
            <DetailBlock><span>Estado del pedido</span><strong>{orderStatusLabel(selectedOrder.status)}</strong></DetailBlock>
            <DetailBlock><span>Modalidad</span><strong>{fulfillmentLabel(selectedOrder.fulfillment)}</strong></DetailBlock>
            {selectedOrder.address && <DetailBlock><span>Dirección de entrega</span><strong>{selectedOrder.address}</strong></DetailBlock>}
            {selectedOrder.pickup_time && <DetailBlock><span>Horario solicitado</span><strong>{selectedOrder.pickup_time}</strong></DetailBlock>}
          </DetailGrid>
          <h3><Basket size={19}/> Productos</h3>
          <DetailItems>{selectedOrder.items.map((item, index) => <DetailItem key={`${selectedOrder.order_number}-${index}`}><div><strong>{item.quantity} × {item.name}</strong>{item.garnish && <span>Guarnición: {item.garnish}</span>}{item.removed_ingredients?.length ? <span>Sin: {item.removed_ingredients.join(", ")}</span> : null}{item.note && <span>Nota: {item.note}</span>}</div><b>{money(item.line_total ?? (item.unit_price ?? 0) * item.quantity)}</b></DetailItem>)}</DetailItems>
          {selectedOrder.note && <DetailBlock><span>Comentarios del pedido</span><strong>{selectedOrder.note}</strong></DetailBlock>}
          {selectedOrder.applied_promotions?.length ? <DetailBlock><span>Promociones aplicadas</span><strong>{selectedOrder.applied_promotions.map(item => item.name).join(", ")}</strong></DetailBlock> : null}
          <div className="total"><span>Total</span><strong>{money(selectedOrder.total)}</strong></div>
          {selectedOrder.refund_status && <p className="refund-state">{refundLabel(selectedOrder.refund_status)}</p>}
          {selectedOrder.payment_status === "approved" && ["paid", "preparing", "ready", "delivered"].includes(selectedOrder.status) && !selectedOrder.refund_status && <RefundButton type="button" disabled={refundOrder === selectedOrder.order_number} onClick={() => void submitRefund()}>{refundOrder === selectedOrder.order_number ? "Enviando solicitud…" : "Solicitar reembolso"}</RefundButton>}
        </DetailContent>
      </DetailModal></DetailShade>}
    </AccountPage>
  );
}
