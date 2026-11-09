import {
  CashDashboard,
  CashStatusBanner,
  CashDashboardActions,
  CashDashboardCloseButton,
  CashMetricGrid,
  CashMetricCard,
  CashDashboardGrid,
  CashDashboardPanel,
  CashPaymentBreakdown,
  CashPreviousClose,
  CashPaymentBar,
} from "../../components/CashDay/CashDayStyles.ts";
import { formatDate, getDateOnly } from "../Utils/Formats.tsx";
import {
  CashMovementTable,
  CashMovementRow,
  CashMovementEmpty,
} from "./CashDashboardContentStyles.ts";

interface Props {
  selectedCashRegister: any;
  canModifyCash: boolean;
  selectedShift: string;
  selectedDay: string;
  currentCashBalance: number;
  salesTotal: number;
  manualIncome: number;
  manualExpense: number;
  cashRegisterMovements: any[];
  orders: any[];
  totalCash: number;
  totalTransfer: number;
  totalMercadoPago: number;
  totalQR: number;
  totalDebit: number;
  previousClosedCash: any;
  onOpenIncome: () => void;
  onOpenExpense: () => void;
  onCloseCash: () => void;
  onSelectSale: (sale: any) => void;
  onEditMovement: (movement: any) => void;
}

const CashDashboardContent = ({
  selectedCashRegister,
  canModifyCash,
  selectedDay,
  currentCashBalance,
  salesTotal,
  manualIncome,
  manualExpense,
  cashRegisterMovements,
  orders,
  totalCash,
  totalTransfer,
  totalMercadoPago,
  totalQR,
  totalDebit,
  previousClosedCash,
  onOpenIncome,
  onOpenExpense,
  onCloseCash,
  onSelectSale,
  onEditMovement,
}: Props) => {
  const getOrderNumber = (order: any) => {
    const parentOrder = order.parent_order_id
      ? orders.find((candidate) => candidate.id === order.parent_order_id)
      : null;
    const baseNumber = parentOrder?.order_number ?? order.order_number;
    const paddedBaseNumber = String(baseNumber ?? "").padStart(4, "0");

    return order.additional_number
      ? `${paddedBaseNumber}.${String(order.additional_number).padStart(2, "0")}`
      : paddedBaseNumber;
  };

  const getOrderPaymentStatus = (order: any) => {
    if (order.status_payment === "paid") return "Pagada";
    if (order.status_payment === "pending") return "Pendiente";
    if (order.status_payment === "cancelled") return "Cancelada";
    if (Array.isArray(order.payments) && order.payments.length > 0) {
      return "Parcial";
    }
    return "Pendiente";
  };

  const getOrderPaymentMethod = (order: any) => {
    const methodLabels: Record<string, string> = {
      cash: "Efectivo",
      transfer: "Transferencia",
      qr: "QR",
      mercado_pago: "Mercado Pago",
      debit_card: "Débito",
    };

    const methods = Array.isArray(order.payments)
      ? order.payments
          .map((payment: any) => payment.method_payment)
          .filter((method: any) => method && method !== "pending")
      : [];

    const uniqueMethods = [...new Set(methods)];

    if (uniqueMethods.length > 2) {
      return "Más de 2 pagos";
    }

    if (uniqueMethods.length > 0) {
      return uniqueMethods
        .map((method) => methodLabels[String(method)] ?? String(method))
        .join(" / ");
    }

    if (order.method_payment === "pending") {
      return "Pendiente";
    }

    if (order.method_payment) {
      return methodLabels[order.method_payment] ?? order.method_payment;
    }

    return "—";
  };

  const getOrderAmount = (order: any) =>
    Number(
      order.total_amount ??
        order.total ??
        order.total_price ??
        order.amount ??
        0,
    );

  const getOrderDate = (order: any) =>
    new Date(
      order.created_at ??
        order.createdAt ??
        order.date ??
        order.updated_at ??
        0,
    ).getTime();

  const getOrderPaidAmount = (order: any) => {
    if (
      order.status_payment === "pending" ||
      order.status_payment === "cancelled"
    ) {
      return 0;
    }

    const payments = Array.isArray(order.payments) ? order.payments : [];

    if (payments.length > 0) {
      return payments.reduce(
        (total: number, payment: any) => total + Number(payment.amount ?? 0),
        0,
      );
    }

    return order.status_payment === "paid" ? getOrderAmount(order) : 0;
  };

  // Una sola lista visual: órdenes + movimientos manuales.
  const cashActivities = [
    ...orders.map((order) => ({
      id: String(order.id),
      source: "order" as const,
      date: getOrderDate(order),
      description: `Venta #${getOrderNumber(order)}`,
      type:
        order.status_payment === "paid"
          ? ("inflow" as const)
          : ("pending" as const),
      amount: getOrderPaidAmount(order),
      method: getOrderPaymentMethod(order),
      status: getOrderPaymentStatus(order),
      order,
      movement: undefined,
    })),
    ...cashRegisterMovements
      .filter((movement) => !movement.order_id)
      .map((movement) => ({
        id: String(movement.id),
        source: "manual" as const,
        date: new Date(movement.date ?? 0).getTime(),
        description: movement.description || "Movimiento manual",
        type: movement.type as "inflow" | "outflow",
        amount: Number(movement.amount ?? 0),
        method: getOrderPaymentMethod({
          method_payment: movement.method_payment,
        }),
        status:
          movement.type === "inflow"
            ? "Ingreso registrado"
            : "Egreso registrado",
        order: undefined,
        movement,
      })),
  ].sort((a, b) => b.date - a.date);

  return (
    <CashDashboard>
      <CashStatusBanner>
        <div className="status-main">
          <span
            className={canModifyCash ? "status-dot open" : "status-dot closed"}
          />
          <div>
            <strong>{canModifyCash ? "Caja abierta" : "Caja cerrada"}</strong>
            <span>
              {selectedCashRegister.shift === "morning"
                ? "Turno mañana"
                : "Turno noche"}{" "}
              · {formatDate(selectedDay)}
            </span>
          </div>
        </div>
        <div className="status-meta">
          <span>Apertura</span>
          <strong>
            {new Date(selectedCashRegister.opened_at).toLocaleTimeString(
              "es-AR",
              { hour: "2-digit", minute: "2-digit" },
            )}{" "}
            hs
          </strong>
          <i />
          <span>N.º de caja</span>
          <strong>
            #{String(selectedCashRegister.id).slice(-6).padStart(6, "0")}
          </strong>
        </div>
        <CashDashboardActions>
          {canModifyCash && (
            <>
              <button
                type="button"
                className="secondary"
                onClick={onOpenIncome}
              >
                ＋ Registrar ingreso
              </button>
              <button
                type="button"
                className="secondary"
                onClick={onOpenExpense}
              >
                − Registrar egreso
              </button>
              <CashDashboardCloseButton type="button" onClick={onCloseCash}>
                Cerrar caja
              </CashDashboardCloseButton>
            </>
          )}
        </CashDashboardActions>
      </CashStatusBanner>
      <CashMetricGrid>
        <CashMetricCard $tone="balance">
          <span className="metric-icon">▤</span>
          <div>
            <small>Saldo actual</small>
            <strong>${currentCashBalance.toLocaleString("es-AR")}</strong>
            <span>Efectivo disponible en caja</span>
          </div>
        </CashMetricCard>
        <CashMetricCard $tone="income">
          <span className="metric-icon">↗</span>
          <div>
            <small>Ingresos del turno</small>
            <strong>
              ${(salesTotal + manualIncome).toLocaleString("es-AR")}
            </strong>
            <span>Ventas y entradas</span>
          </div>
        </CashMetricCard>
        <CashMetricCard $tone="expense">
          <span className="metric-icon">↓</span>
          <div>
            <small>Egresos del turno</small>
            <strong>${manualExpense.toLocaleString("es-AR")}</strong>
            <span>Retiros y gastos</span>
          </div>
        </CashMetricCard>
        <CashMetricCard $tone="sales">
          <span className="metric-icon">▣</span>
          <div>
            <small>Ventas registradas</small>
            <strong>${salesTotal.toLocaleString("es-AR")}</strong>
            <span>Todos los medios de pago</span>
          </div>
        </CashMetricCard>
      </CashMetricGrid>
      <CashDashboardGrid>
        <CashDashboardPanel className="transactions">
          <div className="panel-heading">
            <div>
              <h3>Movimientos de caja</h3>
              <p>Ventas y movimientos manuales del turno</p>
            </div>
            <span className="count">{cashActivities.length} movimientos</span>
          </div>
          <CashMovementTable
            headers={[
              "Movimiento",
              "Tipo",
              "Método de pago",
              "Importe",
              "Estado",
            ]}
          >
            {cashActivities.map((activity) => {
              console.log(activity);
              const isOrder = activity.source === "order";
              const typeLabel = isOrder
                ? activity.status === "Pagada"
                  ? "Pagada"
                  : activity.status === "Pendiente"
                    ? "Pendiente"
                    : activity.status === "Cancelada"
                      ? "Cancelada"
                      : activity.status === "Parcial"
                        ? "Parcial"
                        : "Valor Desconocido"
                : activity.type === "inflow"
                  ? "Ingreso"
                  : "Egreso";
              // El color de las órdenes depende del estado original del backend,
              // no del texto traducido que se muestra en pantalla.
              const tone = isOrder
                ? activity.order?.status_payment === "paid"
                  ? "income"
                  : activity.order?.status_payment === "cancelled"
                    ? "expense"
                    : activity.order?.status_payment === "pending"
                      ? "pending"
                      : "partially_paid"
                : activity.type === "inflow"
                  ? "income"
                  : "expense";

              const handleClick = () => {
                if (isOrder) onSelectSale(activity.order);
                else onEditMovement(activity.movement);
              };

              return (
                <CashMovementRow
                  key={`${activity.source}-${activity.id}`}
                  $columns={5}
                  role="button"
                  tabIndex={0}
                  onClick={handleClick}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleClick();
                    }
                  }}
                >
                  <span className="movement-description">
                    {activity.description}
                  </span>
                  <span className="movement-type">
                    <span className={`movement-badge ${tone}`}>
                      {typeLabel}
                    </span>
                  </span>
                  <span className="movement-method">{activity.method}</span>
                  <strong
                    className={`movement-amount ${activity.type === "inflow" ? "positive" : activity.type === "outflow" ? "negative" : ""}`}
                  >
                    {activity.type === "outflow"
                      ? "−"
                      : activity.type === "inflow"
                        ? "+"
                        : ""}
                    ${activity.amount.toLocaleString("es-AR")}
                  </strong>
                  <span className="movement-status">
                    <span className={`movement-badge ${tone}`}>
                      {activity.status}
                    </span>
                  </span>
                </CashMovementRow>
              );
            })}
            {cashActivities.length === 0 && (
              <CashMovementEmpty>
                Todavía no hay ventas ni movimientos registrados en esta caja.
              </CashMovementEmpty>
            )}
          </CashMovementTable>
        </CashDashboardPanel>
        <CashDashboardPanel className="payments">
          <div className="panel-heading">
            <div>
              <h3>Resumen por método de pago</h3>
              <p>Ventas del turno</p>
            </div>
          </div>
          <CashPaymentBreakdown>
            {(
              [
                ["Efectivo", totalCash],
                ["Transferencia", totalTransfer],
                ["Mercado Pago / QR", totalMercadoPago + totalQR],
                ["Tarjeta débito", totalDebit],
                ["Pendiente", totalDebit],
              ] as [string, number][]
            ).map(([label, amount]) => {
              const percent =
                salesTotal > 0 ? Math.min(100, (amount / salesTotal) * 100) : 0;
              return (
                <div className="payment-row" key={label}>
                  <div className="payment-label">
                    <strong>{label}</strong>
                    <span>
                      ${amount.toLocaleString("es-AR")}{" "}
                      <small>({percent.toFixed(0)}%)</small>
                    </span>
                  </div>
                  <CashPaymentBar $percent={percent}>
                    <span />
                  </CashPaymentBar>
                </div>
              );
            })}
          </CashPaymentBreakdown>
        </CashDashboardPanel>
      </CashDashboardGrid>
      <CashPreviousClose>
        <div className="previous-heading">
          <div>
            <span className="check-icon">✓</span>
            <div>
              <h3>Último cierre de caja</h3>
              <p>Resumen del cierre anterior</p>
            </div>
          </div>
          <span className="closed-pill">✓ Cierre registrado</span>
        </div>
        {previousClosedCash ? (
          <div className="previous-grid">
            <div>
              <small>Fecha</small>
              <strong>
                {formatDate(
                  previousClosedCash.date ||
                    getDateOnly(previousClosedCash.opened_at),
                )}
              </strong>
            </div>
            <div>
              <small>Saldo declarado</small>
              <strong>
                $
                {(previousClosedCash.closing_amount ?? 0).toLocaleString(
                  "es-AR",
                )}
              </strong>
            </div>
            <div>
              <small>Apertura</small>
              <strong>
                ${previousClosedCash.opening_amount.toLocaleString("es-AR")}
              </strong>
            </div>
            <div>
              <small>Turno</small>
              <strong>
                {previousClosedCash.shift === "morning" ? "Mañana" : "Noche"}
              </strong>
            </div>
          </div>
        ) : (
          <p className="no-previous">
            Todavía no hay cierres anteriores registrados.
          </p>
        )}
      </CashPreviousClose>
    </CashDashboard>
  );
};

export default CashDashboardContent;
