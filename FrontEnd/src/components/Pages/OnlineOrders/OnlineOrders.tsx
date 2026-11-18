import CardLoading from "../../../components/CardLoading/CardLoading.tsx";
import { useCallback, useEffect, useState } from "react";
import { ArrowsClockwise, ShoppingBag } from "@phosphor-icons/react";
import { api } from "../../../services/api.ts";
import { ContainerPage } from "../PageStyles.ts";
import PageHeader from "../../../components/PageHeaders/PageHeaders.tsx";
import {
  OnlineOrdersWrap,
  OnlineOrderCard,
  OnlineOrderGrid,
  StatusSelect,
} from "./OnlineOrdersStyles.ts";
type OnlineOrder = {
  id: string;
  order_number: number;
  customer_name: string;
  phone: string;
  fulfillment: string;
  address?: string;
  pickup_time?: string;
  items: {
    name: string;
    quantity: number;
    unit_price: number;
    garnish?: string;
    note?: string;
  }[];
  total: number;
  payment_status: string;
  status: string;
  created_at: string;
  note?: string;
  administrative_order_number?: number;
  administrative_order_id?: string;
  conversion_error?: string;
  refund_status?: string | null;
  refund_error?: string;
  refund_sync_error?: string;
};
const labels: Record<string, string> = {
  pending_payment: "Pendiente de pago",
  paid: "Pagado",
  preparing: "En preparación",
  ready: "Listo",
  delivered: "Entregado",
  cancelled: "Cancelado",
  payment_error: "Error de pago",
  payment_not_configured: "Pago sin configurar",
  paid_pending_cash: "Pagado · pendiente de caja",
};
const money = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(value || 0);
export default function OnlineOrders() {
  const [orders, setOrders] = useState<OnlineOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [refundingId, setRefundingId] = useState<string | null>(null);
  const [convertingId, setConvertingId] = useState<string | null>(null);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/online-orders");
      setOrders(Array.isArray(data) ? data : []);
      setError("");
    } catch {
      setError("No se pudieron cargar los pedidos online.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const refreshOnlineOrders = () => void load();
    window.addEventListener("online-order-notification", refreshOnlineOrders);
    return () => window.removeEventListener("online-order-notification", refreshOnlineOrders);
  }, [load]);
  // Los pedidos online y sus solicitudes de reembolso no dependen del día
  // de caja seleccionado: deben seguir visibles aunque sean de otra fecha.
  const filteredOrders = orders;
  const processRefund = async (id: string) => {
    if (refundingId) return;
    setRefundingId(id);
    try {
      const { data } = await api.post(`/online-orders/${id}/refund`);
      setOrders((old) => old.map((order) => order.id === id ? data : order));
      setError("");
    } catch (error) {
      const message = typeof error === "object" && error && "response" in error
        ? String((error as { response?: { data?: { detail?: string } } }).response?.data?.detail || "No se pudo procesar el reembolso.")
        : "No se pudo procesar el reembolso.";
      setError(message);
      await load();
    } finally {
      setRefundingId(null);
    }
  };

  const retryConversion = async (id: string) => {
    if (convertingId) return;
    setConvertingId(id);
    try {
      const { data } = await api.post(`/online-orders/${id}/retry-conversion`);
      setOrders((old) => old.map((order) => order.id === id ? data : order));
      setError("");
    } catch (error) {
      const message = typeof error === "object" && error && "response" in error
        ? String((error as { response?: { data?: { detail?: string } } }).response?.data?.detail || "No se pudo generar la comanda.")
        : "No se pudo generar la comanda.";
      setError(message);
      await load();
    } finally {
      setConvertingId(null);
    }
  };

  const changeStatus = async (id: string, status: string) => {
    if (status === "cancelled") {
      const target = orders.find((order) => order.id === id);
      if (target?.payment_status === "approved" && target.refund_status !== "refunded") {
        setError("Los pedidos pagados deben cancelarse procesando primero el reembolso.");
        return;
      }
    }
    try {
      const { data } = await api.patch(`/online-orders/${id}`, { status });
      setOrders((old) => old.map((o) => (o.id === id ? data : o)));
    } catch {
      setError("No se pudo actualizar el estado del pedido.");
    }
  };
  return (
    <ContainerPage>
      <PageHeader
        title="Pedidos online"
        description="Compras recibidas desde el Store y su estado de pago y preparación."
      />
      <OnlineOrdersWrap>
        <header>
          <div>
            <strong>
              {filteredOrders.length} pedidos online
            </strong>
            <span>
              Los pedidos pagados se confirman mediante la notificación validada
              de Mercado Pago.
            </span>
          </div>
          <button type="button" onClick={() => void load()} disabled={loading}>
            <ArrowsClockwise /> Actualizar
          </button>
        </header>
        {error && <p role="alert">{error}</p>}
        {loading ? (
          <CardLoading icon={<ShoppingBag />} text="Cargando pedidos online..." />
        ) : filteredOrders.length === 0 ? (
          <div className="empty">
            <ShoppingBag />
            <h3>Todavía no hay pedidos online</h3>
            <p>Las compras pagadas desde el Store aparecerán acá.</p>
          </div>
        ) : (
          <OnlineOrderGrid>
            {filteredOrders.map((order) => (
              <OnlineOrderCard key={order.id}>
                <div className="top">
                  <div>
                    <small>PEDIDO ONLINE</small>
                    <h3>
                      #{order.order_number} · {order.customer_name}
                    </h3>
                  </div>
                  <b
                    className={
                      order.payment_status === "approved" ||
                      order.payment_status === "paid" ||
                      order.payment_status === "refunded"
                        ? "paid"
                        : "pending"
                    }
                  >
                    {order.payment_status === "approved"
                      ? "Pago aprobado"
                      : order.payment_status === "refunded"
                        ? "Reembolsado"
                        : order.payment_status}
                  </b>
                </div>
                <p>
                  {order.phone} ·{" "}
                  {order.fulfillment === "delivery"
                    ? `Entrega: ${order.address || "Sin dirección"}`
                    : "Retiro en local"}
                </p>
                {order.administrative_order_number && (
                  <p className="linked-order">
                    Comanda administrativa #
                    {String(order.administrative_order_number).padStart(4, "0")}
                  </p>
                )}
                {order.conversion_error && (
                  <p className="conversion-error">{order.conversion_error}</p>
                )}
                {order.refund_status && (
                  <p className={`refund-status ${order.refund_status}`}>
                    {order.refund_status === "requested" ? "El cliente solicitó un reembolso" :
                     order.refund_status === "processing" ? "Reembolso en proceso" :
                     order.refund_status === "refunded_needs_sync" ? "Dinero devuelto · falta sincronizar la comanda" :
                     order.refund_status === "refunded" ? "Reembolso completado · comanda cancelada" : order.refund_status}
                  </p>
                )}
                {order.refund_sync_error && <p className="conversion-error">{order.refund_sync_error}</p>}
                {order.payment_status === "approved" && !order.administrative_order_id && (
                  <button
                    type="button"
                    className="conversion-action"
                    disabled={convertingId !== null}
                    onClick={() => void retryConversion(order.id)}
                  >
                    {convertingId === order.id ? "Generando comanda…" : "Reintentar creación de comanda"}
                  </button>
                )}
                <ul>
                  {order.items.map((item, i) => (
                    <li key={`${item.name}-${i}`}>
                      <span>
                        {item.quantity} × {item.name}
                        {item.garnish ? ` · ${item.garnish}` : ""}
                      </span>
                      <strong>{money(item.unit_price * item.quantity)}</strong>
                    </li>
                  ))}
                </ul>
                {order.note && <p className="note">Nota: {order.note}</p>}
                <div className="bottom">
                  <strong>{money(order.total)}</strong>
                  <StatusSelect
                    aria-label="Estado del pedido"
                    value={order.status}
                    onChange={(e) =>
                      void changeStatus(order.id, e.target.value)
                    }
                  >
                    {[
                      "pending_payment",
                      "paid",
                      "paid_pending_cash",
                      "preparing",
                      "ready",
                      "delivered",
                      ...(order.payment_status === "approved" && order.refund_status !== "refunded" ? [] : ["cancelled"]),
                    ].map((status) => (
                      <option key={status} value={status}>
                        {labels[status]}
                      </option>
                    ))}
                  </StatusSelect>
                </div>
                {(order.refund_status === "requested" || order.refund_status === "processing" || order.refund_status === "refunded_needs_sync") && (
                  <button
                    type="button"
                    className="refund-action"
                    disabled={refundingId !== null}
                    onClick={() => void processRefund(order.id)}
                  >
                    {refundingId === order.id
                      ? "Procesando reembolso…"
                      : order.refund_status === "refunded_needs_sync"
                        ? "Reintentar sincronización de comanda"
                        : order.refund_status === "processing"
                          ? "Reintentar / verificar reembolso"
                          : "Devolver dinero y cancelar comanda"}
                  </button>
                )}
              </OnlineOrderCard>
            ))}
          </OnlineOrderGrid>
        )}
      </OnlineOrdersWrap>
    </ContainerPage>
  );
}
