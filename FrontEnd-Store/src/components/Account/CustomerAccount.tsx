import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ArrowsClockwise, Receipt, SignOut, UserCircle, WarningCircle, X } from "../../utils/icons.ts";
import {
  accessCustomer,
  getCustomerOrders,
  requestCustomerOrderRefund,
  type CustomerOrder,
  type CustomerProfile,
} from "../../services/publicApi.ts";
import { money } from "../../utils/money.ts";
import {
  clearCustomerSession,
  readCustomerSession,
  saveCustomerSession,
} from "../../utils/customerSession.ts";
import {
  Shade, Panel, Header, Body, Field, HelperText, Primary, AccountIntro, OrderList,
  OrderCard, OrderTop, OrderMeta, ItemList, Status, RefundButton, Empty,
  Logout, ConfirmShade, ConfirmCard,
} from "./CustomerAccountStyles.ts";

type Props = {
  onClose: () => void;
  onToast: (message: string, kind: "success" | "error") => void;
  onAuthenticated?: (profile: CustomerProfile) => void;
};

function getApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === "string") return detail;
    if (typeof error.response?.data?.message === "string") return error.response.data.message;
  }
  return error instanceof Error ? error.message : "Ocurrió un error inesperado.";
}

function refundLabel(status?: string | null) {
  if (status === "requested") return "Solicitud enviada · esperando al comercio";
  if (status === "processing") return "Reembolso en proceso";
  if (status === "refunded_needs_sync") return "Reembolso aceptado · sincronizando pedido";
  if (status === "refunded") return "Dinero reembolsado";
  return "Pago aprobado";
}

export function CustomerAccount({ onClose, onToast, onAuthenticated }: Props) {
  const [session, setSession] = useState(readCustomerSession);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [busy, setBusy] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [refundOrder, setRefundOrder] = useState<number | null>(null);
  const [pendingRefund, setPendingRefund] = useState<CustomerOrder | null>(null);

  const loadOrders = useCallback(async (token: string) => {
    setLoadingOrders(true);
    try {
      setOrders(await getCustomerOrders(token));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        clearCustomerSession();
        setSession(null);
        setOrders([]);
        onToast("Tu sesión venció. Iniciá sesión nuevamente.", "error");
      } else {
        onToast("No pudimos actualizar tu historial. Intentá nuevamente.", "error");
      }
    } finally {
      setLoadingOrders(false);
    }
  }, [onToast]);

  useEffect(() => {
    if (session?.token) void loadOrders(session.token);
  }, [session?.token, loadOrders]);

  useEffect(() => {
    if (!session) return;
    const remaining = Math.max(0, session.expiresAt - Date.now());
    const timer = window.setTimeout(() => {
      clearCustomerSession();
      setSession(null);
      setOrders([]);
      onToast("Tu sesión venció. Iniciá sesión nuevamente.", "error");
    }, remaining);
    return () => window.clearTimeout(timer);
  }, [session?.expiresAt, onToast]);

  const submit = async () => {
    setBusy(true);
    try {
      const result = await accessCustomer({
        first_name: first.trim(),
        last_name: last.trim(),
        phone: phone.trim(),
      });
      const customer: CustomerProfile = {
        first_name: result.first_name,
        last_name: result.last_name,
        phone: result.phone,
      };
      const next = saveCustomerSession(result.token, customer, result.expires_in);
      setSession(next);
      onAuthenticated?.(customer);
      onToast("Sesión iniciada. Buscamos tus compras anteriores asociadas a este celular.", "success");
    } catch (error) {
      onToast(getApiError(error), "error");
    } finally {
      setBusy(false);
    }
  };

  const submitRefund = async () => {
    if (!pendingRefund || !session) return;
    const order = pendingRefund;
    setPendingRefund(null);
    setRefundOrder(order.order_number);
    try {
      await requestCustomerOrderRefund(session.token, order.order_number);
      onToast(`La solicitud de reembolso del pedido #${order.order_number} fue enviada al comercio.`, "success");
      await loadOrders(session.token);
    } catch (error) {
      onToast(getApiError(error), "error");
    } finally {
      setRefundOrder(null);
    }
  };

  const logout = () => {
    clearCustomerSession();
    setSession(null);
    setOrders([]);
    onToast("Cerraste sesión.", "success");
  };

  return (
    <Shade onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
      <Panel role="dialog" aria-modal="true" aria-labelledby="customer-account-title">
        <Header>
          <h2 id="customer-account-title"><UserCircle size={23} weight="duotone" /> Mi cuenta</h2>
          <button type="button" onClick={onClose} aria-label="Cerrar"><X size={20} /></button>
        </Header>
        <Body>
          {!session ? (
            <>
              <p>Ingresá tu nombre, apellido y celular. Si ya compraste como invitado con ese mismo número, vincularemos esas compras a tu cuenta automáticamente.</p>
              <Field>Nombre<input value={first} onChange={event => setFirst(event.target.value)} autoComplete="given-name" maxLength={80} /></Field>
              <Field>Apellido<input value={last} onChange={event => setLast(event.target.value)} autoComplete="family-name" maxLength={80} /></Field>
              <Field>Celular<input value={phone} onChange={event => setPhone(event.target.value)} autoComplete="tel" inputMode="tel" placeholder="Ej. 351 123 4567" maxLength={30} /></Field>
              <Primary type="button" disabled={busy || !first.trim() || !last.trim() || phone.replace(/\\D/g, "").length < 6} onClick={submit}>
                {busy ? "Verificando tus datos…" : "Ingresar / crear cuenta"}
              </Primary>
              <HelperText>La cuenta se identifica por tu número de celular. No compartas el acceso desde dispositivos ajenos.</HelperText>
            </>
          ) : (
            <>
              <AccountIntro>
                <p>Hola, <strong>{session.customer.first_name}</strong>. Tus compras pagadas y asociadas a este celular.</p>
                <button type="button" onClick={() => void loadOrders(session.token)} disabled={loadingOrders}>
                  <ArrowsClockwise size={16} /> Actualizar
                </button>
              </AccountIntro>
              {loadingOrders && orders.length === 0 ? (
                <Empty><ArrowsClockwise size={25} /><strong>Cargando tus compras</strong></Empty>
              ) : orders.length ? (
                <OrderList>
                  {orders.map(order => {
                    const refundStatus = order.refund_status || null;
                    const canRequestRefund = order.payment_status === "approved"
                      && ["paid", "preparing", "ready", "delivered"].includes(order.status)
                      && !refundStatus;
                    const tone = refundStatus === "refunded" ? "muted" : refundStatus ? "warning" : "success";
                    return (
                      <OrderCard key={order.order_number}>
                        <OrderTop>
                          <strong><Receipt size={17} /> Pedido #{order.order_number}</strong>
                          <b>{money(order.total)}</b>
                        </OrderTop>
                        <OrderMeta>{new Date(order.created_at).toLocaleString("es-AR", { dateStyle: "medium", timeStyle: "short" })}</OrderMeta>
                        <ItemList>{order.items.map((item, index) => <span key={`${order.order_number}-${index}`}>{item.quantity} × {item.name}</span>)}</ItemList>
                        <Status $tone={tone}>{refundLabel(refundStatus)}</Status>
                        {canRequestRefund && (
                          <RefundButton type="button" disabled={refundOrder === order.order_number} onClick={() => setPendingRefund(order)}>
                            <WarningCircle size={18} /> {refundOrder === order.order_number ? "Enviando solicitud…" : "Solicitar reembolso"}
                          </RefundButton>
                        )}
                      </OrderCard>
                    );
                  })}
                </OrderList>
              ) : (
                <Empty><Receipt size={28} /><strong>Todavía no hay compras asociadas</strong><span>Si realizaste compras como invitado, verificá que hayas ingresado el mismo celular usado al comprar.</span></Empty>
              )}
              <Logout type="button" onClick={logout}><SignOut size={18} /> Cerrar sesión</Logout>
            </>
          )}
        </Body>
      </Panel>
      {pendingRefund && (
        <ConfirmShade onMouseDown={event => { if (event.target === event.currentTarget) setPendingRefund(null); }}>
          <ConfirmCard role="alertdialog" aria-modal="true" aria-labelledby="refund-confirm-title">
            <div className="icon"><WarningCircle /></div>
            <h3 id="refund-confirm-title">Solicitar reembolso</h3>
            <p>Vas a enviar al comercio una solicitud para devolver el dinero del pedido #{pendingRefund.order_number}. El reembolso no se ejecuta automáticamente: el comercio debe revisarlo y procesarlo.</p>
            <div className="actions">
              <button className="cancel" type="button" onClick={() => setPendingRefund(null)}>Volver</button>
              <button className="confirm" type="button" onClick={() => void submitRefund()}>Enviar solicitud</button>
            </div>
          </ConfirmCard>
        </ConfirmShade>
      )}
    </Shade>
  );
}
