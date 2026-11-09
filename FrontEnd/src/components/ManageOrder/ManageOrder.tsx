import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { MdOutlineMoreHoriz, MdPrint } from "react-icons/md";
import { FaPlus, FaLayerGroup } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

import ListTable from "../../components/Tables/ListTable.tsx";
import ModalForm from "../../components/ModalForm/ModalForm.tsx";

import type { RootState } from "../../store/store.ts";
import type { IOrder } from "../../interfaces/Order.ts";

import { ContainerManageOrders, EmptyMessage, OrdersTableRow } from "./ManageOrderStyles.ts";

import { getDateOnly } from "../Utils/Formats.tsx";

import usePrintAgent from "../../hooks/usePrintOrder.ts";
import { buildOrderTicket } from "../Tickets/OrderTicket.ts";

import ModalPrintFalse from "../ModalPrintFalse/ModalPrintFalse.tsx";

import ModalOrderEdit from "../Modals/ModalOrder/ModalOrderEdit.tsx";
import ModalOrderOptions from "../Modals/ModalOrder/ModalOrderOptions.tsx";
import { ActionButton } from "../Utils/ButtonStyles.ts";

interface ManageOrderProps {
  orderIdToEdit?: string;
  onCreateOrder?: () => void;
  onAddAdditionalOrder?: (order: IOrder) => void;
  readOnly?: boolean;
}

type PaymentFilter =
  | "all"
  | "paid"
  | "pending"
  | "partially_paid"
  | "cancelled";

const headers = [
  "N.º",
  "Cliente",
  "Productos",
  "Total",
  "Método de pago",
  "Estado de pago",
  "Comanda",
  "Hora",
  "Acciones",
];

const normalizeSearch = (value: unknown): string => {
  if (value === null || value === undefined) return "";

  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .trim();
};

const normalizeDigits = (value: unknown): string => {
  return String(value ?? "").replace(/\D/g, "");
};

const ManageOrder = ({
  orderIdToEdit,
  onCreateOrder,
  onAddAdditionalOrder,
  readOnly = false,
}: ManageOrderProps) => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  const cashRegisters = useSelector(
    (state: RootState) => state.cashRegister.cashRegister,
  );

  const selectedDay = useSelector((state: RootState) => state.daySelected.day);

  const selectedShift = useSelector(
    (state: RootState) => state.daySelected.shift,
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"options" | "edit">("options");
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState<PaymentFilter>("all");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Siempre resolver la caja desde la selección actual del Navbar.
  // readOnly controla los permisos, pero nunca fija la consulta a una caja anterior.
  const selectedCashRegister = useMemo(
    () =>
      cashRegisters.find((cashRegister) => {
        const cashDate = cashRegister.date
          ? getDateOnly(cashRegister.date)
          : getDateOnly(cashRegister.opened_at);

        return cashDate === selectedDay && cashRegister.shift === selectedShift;
      }),
    [cashRegisters, selectedDay, selectedShift],
  );

  const { printTicket, showPrinterModal, setShowPrinterModal } =
    usePrintAgent();

  // --------------------------------------------------
  // IMPRESIÓN
  // --------------------------------------------------

  const handlePrint = async (order: IOrder) => {
    await printTicket(buildOrderTicket(order));
  };

  // --------------------------------------------------
  // EDICIÓN DE COMANDAS
  // --------------------------------------------------

  const canModifyOrder = (order: IOrder) =>
    !readOnly &&
    selectedCashRegister?.status_cash_register === "open" &&
    String(order.cash_register_id) === String(selectedCashRegister.id);

  const handleOpenOrder = (order: IOrder) => {
    setSelectedOrder(order);
    setModalMode("options");
    setModalOpen(true);
  };

  const handleEdit = (order: IOrder) => {
    if (!canModifyOrder(order)) return;

    setSelectedOrder(order);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedOrder(null);
    setModalMode("options");
    setIsSubmitting(false);
  };

  const handleEditAction = () => {
    if (!selectedOrder || !canModifyOrder(selectedOrder)) return;

    setModalMode("edit");
  };

  useEffect(() => {
    if (!orderIdToEdit) return;

    const order = orders.find(
      (item) => String(item.id) === String(orderIdToEdit),
    );

    if (order) {
      setSelectedOrder(order);
      setModalMode(canModifyOrder(order) ? "edit" : "options");
      setModalOpen(true);
    }
  }, [orderIdToEdit, orders, readOnly, selectedCashRegister]);

  const allOrders = useMemo(
    () =>
      selectedCashRegister
        ? orders.filter(
            (order) => order.cash_register_id === selectedCashRegister.id,
          )
        : [],
    [orders, selectedCashRegister],
  );

  // --------------------------------------------------
  // MÉTODOS DE PAGO
  // --------------------------------------------------

  const paymentLabel = (order: IOrder) => {
    const labels: Record<string, string> = {
      cash: "Efectivo",
      transfer: "Transferencia",
      qr: "QR",
      debit: "Débito",
      debit_card: "Débito",
      mercado_pago: "Mercado Pago",
      pending: "Pendiente",
    };

    const payments = order.payments?.length
      ? order.payments
      : [
          {
            method_payment: order.method_payment,
            amount: order.total_price,
          },
        ];

    if (payments.length > 2) {
      return "Más de 2 pagos";
    }
    return [
      ...new Set(
        payments.map(
          (payment) => labels[payment.method_payment] ?? payment.method_payment,
        ),
      ),
    ].join(" + ");
  };

  // --------------------------------------------------
  // ESTADOS DE PAGO
  // --------------------------------------------------

  const paymentStatusLabel = (order: IOrder) => {
    switch (order.status_payment) {
      case "paid":
        return "Pagada";

      case "pending":
        return "Pendiente";

      case "partially_paid":
        return "Parcial";

      case "cancelled":
        return "Cancelada";

      default:
        return "Sin estado";
    }
  };

  const paymentStatusClass = (order: IOrder) => {
    switch (order.status_payment) {
      case "paid":
        return "paid";

      case "pending":
        return "pending";

      case "partially_paid":
        return "partially_paid";

      case "cancelled":
        return "cancelled";

      default:
        return "unknown";
    }
  };

  // --------------------------------------------------
  // FORMATO DE DINERO
  // --------------------------------------------------

  const money = (value: number) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 0,
    }).format(Number(value) || 0);

  // --------------------------------------------------
  // BÚSQUEDA DINÁMICA
  // --------------------------------------------------

  const orderMatchesSearch = (order: IOrder, searchTerm: string) => {
    const term = normalizeSearch(searchTerm);

    if (!term) return true;

    const digitsTerm = normalizeDigits(term);

    // Número completo: comanda principal y sufijo del adicional.
    const orderNumber = String(order.order_number ?? "");
    const paddedOrderNumber = orderNumber.padStart(4, "0");
    const additionalNumber = order.additional_number
      ? String(order.additional_number).padStart(2, "0")
      : "";
    const fullOrderNumber = additionalNumber
      ? `${paddedOrderNumber}.${additionalNumber}`
      : paddedOrderNumber;

    const numberMatches =
      normalizeSearch(orderNumber).includes(term) ||
      normalizeSearch(paddedOrderNumber).includes(term) ||
      normalizeSearch(fullOrderNumber).includes(term) ||
      (digitsTerm.length > 0 &&
        normalizeDigits(fullOrderNumber).includes(digitsTerm));

    // Cliente
    const customerMatches = normalizeSearch(order.customer_name).includes(term);

    // Estado de pago
    const statusLabels: Record<string, string> = {
      paid: "pagada pagado pagadas pagados",
      pending: "pendiente pendientes",
      partially_paid: "parcial parcialmente parcialmente pagada pago parcial",
      cancelled: "cancelada cancelado canceladas cancelados",
    };

    const statusMatches = normalizeSearch(
      `${order.status_payment ?? ""} ${
        statusLabels[order.status_payment] ?? ""
      } ${paymentStatusLabel(order)}`,
    ).includes(term);

    // Método de pago
    const paymentMethodMatches = normalizeSearch(
      `${paymentLabel(order)} ${order.method_payment ?? ""}`,
    ).includes(term);

    // Total de la comanda
    const total = Number(order.total_price) || 0;

    const formattedTotal = money(total);

    const totalMatches =
      normalizeSearch(String(total)).includes(term) ||
      normalizeSearch(formattedTotal).includes(term) ||
      (digitsTerm.length > 0 && normalizeDigits(total).includes(digitsTerm));

    // Pagos individuales
    const paymentsMatches = (order.payments ?? []).some((payment) => {
      const amount = Number(payment.amount) || 0;

      return (
        normalizeSearch(String(amount)).includes(term) ||
        normalizeSearch(money(amount)).includes(term) ||
        (digitsTerm.length > 0 && normalizeDigits(amount).includes(digitsTerm))
      );
    });

    // Productos
    const productsMatches = order.items?.some((item) =>
      normalizeSearch(
        `${item.name ?? ""} ${item.quantity ?? ""} ${item.subtotal ?? ""}`,
      ).includes(term),
    );

    // Estado activo/inactivo
    const orderStatusMatches = normalizeSearch(
      order.status ? "activa activa" : "inactiva inactivo",
    ).includes(term);

    return (
      numberMatches ||
      customerMatches ||
      statusMatches ||
      paymentMethodMatches ||
      totalMatches ||
      paymentsMatches ||
      productsMatches ||
      orderStatusMatches
    );
  };

  // --------------------------------------------------
  // COMANDAS VISIBLES
  // --------------------------------------------------

  const visibleOrders = useMemo(() => {
    return allOrders
      .filter((order) => {
        const matchesSearch = orderMatchesSearch(order, search);

        const matchesStatus =
          statusFilter === "all" || order.status_payment === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
  }, [allOrders, search, statusFilter]);

  return (
    <ContainerManageOrders>
      <div className="orders-filters">
        <label className="search-box">
          <FiSearch />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Buscar por número, cliente, importe, estado o producto..."
          />
        </label>

        <label className="select-filter">
          <span>Estado de pago</span>

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value as PaymentFilter)
            }
          >
            <option value="all">Todos</option>
            <option value="paid">Pagadas</option>
            <option value="pending">Pendientes</option>
            <option value="partially_paid">Parcialmente pagadas</option>
            <option value="cancelled">Canceladas</option>
          </select>
        </label>

        {!readOnly && onCreateOrder && (
          <button
            className="create-order-button"
            type="button"
            onClick={onCreateOrder}
          >
            <FaPlus />
            <span>Nueva comanda</span>
          </button>
        )}
      </div>

      <ListTable headers={headers} variant="orders">
        {visibleOrders.length === 0 ? (
          <EmptyMessage>
            No hay comandas para los filtros seleccionados.
          </EmptyMessage>
        ) : (
          visibleOrders.map((order) => {
            const products = order.items.map(
              (item) => `${item.name} x${item.quantity}`,
            );

            const time = order.created_at
              ? new Date(order.created_at).toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—";

            const parentOrder = order.parent_order_id
              ? orders.find(
                  (candidate) => candidate.id === order.parent_order_id,
                )
              : null;

            const displayOrderNumber =
              parentOrder?.order_number ?? order.order_number;

            const orderCanBeModified = canModifyOrder(order);

            return (
              <OrdersTableRow
                key={order.id}
                $columns={headers.length}
                onClick={() => handleOpenOrder(order)}
                role="button"
                tabIndex={0}
                aria-label={`Abrir comanda ${displayOrderNumber}`}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleOpenOrder(order);
                  }
                }}
              >
                <span className="order-number">
                  #{String(displayOrderNumber).padStart(4, "0")}
                  {order.additional_number
                    ? `-${String(order.additional_number).padStart(2, "0")}`
                    : ""}
                </span>

                <span className="customer">
                  {order.customer_name || "Sin nombre"}
                </span>

                <div className="product-lines">
                  {products.slice(0, 2).map((product, index) => (
                    <span key={index}>{product}</span>
                  ))}

                  {products.length > 2 && (
                    <small>+{products.length - 2} productos</small>
                  )}
                </div>

                <strong className="total">{money(order.total_price)}</strong>

                <span className="payment-pill">{paymentLabel(order)}</span>

                <span className={`payment-status ${paymentStatusClass(order)}`}>
                  {paymentStatusLabel(order)}
                </span>

                <span
                  className={`order-status ${
                    order.status ? "active" : "inactive"
                  }`}
                >
                  {order.status ? "Activa" : "Inactiva"}
                </span>

                <span>{time}</span>

                <div className="actions">
                  {orderCanBeModified &&
                    !order.parent_order_id &&
                    onAddAdditionalOrder && (
                      <ActionButton
                        type="button"
                        title={`Agregar adicional a la comanda #${order.order_number}`}
                        aria-label={`Agregar adicional a la comanda #${order.order_number}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          onAddAdditionalOrder(order);
                        }}
                      >
                        <FaLayerGroup />
                      </ActionButton>
                    )}

                  <ActionButton
                    className="ligth"
                    type="button"
                    title="Reimprimir comanda"
                    onClick={(event) => {
                      event.stopPropagation();
                      void handlePrint(order);
                    }}
                  >
                    <MdPrint />
                  </ActionButton>

                  {orderCanBeModified && (
                    <ActionButton
                      type="button"
                      title="Modificar comanda"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleEdit(order);
                      }}
                    >
                      <MdOutlineMoreHoriz />
                    </ActionButton>
                  )}
                </div>
              </OrdersTableRow>
            );
          })
        )}
      </ListTable>

      <ModalPrintFalse show={showPrinterModal} setShow={setShowPrinterModal} />

      <ModalForm
        isOpen={modalOpen}
        title={
          modalMode === "edit"
            ? "Modificar comanda"
            : selectedOrder
              ? `Comanda #${String(selectedOrder.order_number).padStart(4, "0")}${
                  selectedOrder.additional_number
                    ? `.${String(selectedOrder.additional_number).padStart(2, "0")}`
                    : ""
                }`
              : "Comanda"
        }
        onClose={handleClose}
        footerActions={
          modalMode === "edit" && selectedOrder && !readOnly ? (
            <ActionButton
              key="save-order-button"
              type="submit"
              form="manage-order-form"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "✓ Guardar modificaciones"}
            </ActionButton>
          ) : modalMode === "options" &&
            selectedOrder &&
            canModifyOrder(selectedOrder) ? (
            <ActionButton
              key="edit-order-button"
              className="ligth"
              type="button"
              onClick={handleEditAction}
            >
              ✎ Modificar comanda
            </ActionButton>
          ) : undefined
        }
      >
        {modalMode === "options" ? (
          <ModalOrderOptions order={selectedOrder} />
        ) : (
          <ModalOrderEdit
            order={selectedOrder}
            onClose={handleClose}
            readOnly={readOnly}
            onSubmittingChange={setIsSubmitting}
          />
        )}
      </ModalForm>
    </ContainerManageOrders>
  );
};

export default ManageOrder;
