import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import { MdOutlineMoreHoriz, MdPrint } from "react-icons/md";

import ModalForm from "../../components/ModalForm/ModalForm.tsx";

import type { RootState } from "../../store/store.ts";
import type { IOrder } from "../../interfaces/Order.ts";

import OrderForm from "../Forms/OrderForm/OrderForm.tsx";

import {
  ContainerManageOrders,
  ActionButton,
  EmptyMessage,
} from "./ManageOrderStyles.ts";

import { TableRow } from "../Tables/ListTableStyles.ts";
import { getDateOnly } from "../Utils/Formats.tsx";

import usePrintAgent from "../../hooks/usePrintOrder.ts";
import { buildOrderTicket } from "../Tickets/OrderTicket.ts";
import ListTable from "../../components/Tables/ListTable.tsx";
import ModalPrintFalse from "../ModalPrintFalse/ModalPrintFalse.tsx";

interface ManageOrderProps {
  orderIdToEdit?: string;
}

const ManageOrder = ({ orderIdToEdit }: ManageOrderProps) => {
  const orders = useSelector((state: RootState) => state.orders.orders);

  const cashRegisters = useSelector(
    (state: RootState) => state.cashRegister.cashRegister,
  );

  const selectedDay = useSelector((state: RootState) => state.daySelected.day);

  const selectedShift = useSelector(
    (state: RootState) => state.daySelected.shift,
  );

  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [mode, setMode] = useState<"create" | "edit" | "delete">("create");
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(max-width: 600px)").matches
      : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 600px)");
    const handleChange = (event: MediaQueryListEvent) =>
      setIsMobile(event.matches);

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const selectedCashRegister = useMemo(() => {
    return cashRegisters.find((cashRegister) => {
      const cashDate = cashRegister.date
        ? getDateOnly(cashRegister.date)
        : getDateOnly(cashRegister.opened_at);

      return cashDate === selectedDay && cashRegister.shift === selectedShift;
    });
  }, [cashRegisters, selectedDay, selectedShift]);

  const handleEdit = (order: IOrder) => {
    if (!order.status) return;
    setSelectedOrder(order);
    setMode("edit");
  };

  useEffect(() => {
    if (!orderIdToEdit) return;

    const order = orders.find(
      (item) => String(item.id) === String(orderIdToEdit),
    );

    if (order?.status) {
      setSelectedOrder(order);
      setMode("edit");
    }
  }, [orderIdToEdit, orders]);

  const { printTicket, showPrinterModal, setShowPrinterModal } =
    usePrintAgent();

  const handlePrint = async (order: IOrder) => {
    const ticket = buildOrderTicket(order);
    await printTicket(ticket);
  };

  const handleClose = () => {
    setSelectedOrder(null);
    setMode("create");
  };

  const handleSuccess = () => {
    setSelectedOrder(null);
    setMode("create");
  };

  const filteredOrders = useMemo(() => {
    if (!selectedCashRegister) return [];
    return orders.filter(
      (order) => order.cash_register_id === selectedCashRegister.id,
    );
  }, [orders, selectedCashRegister]);

  const paymentLabel = (order: IOrder) => {
    const paymentLabels: Record<string, string> = {
      cash: "Efectivo",
      transfer: "Transferencia",
      qr: "QR",
      debit: "Débito",
      debit_card: "Débito",
      mercado_pago: "Mercado Pago",
    };

    const payments = order.payments?.length
      ? order.payments
      : [{ method_payment: order.method_payment, amount: order.total_price }];

    return [
      ...new Set(
        payments.map(
          (payment) =>
            paymentLabels[payment.method_payment] ?? payment.method_payment,
        ),
      ),
    ].join(" + ");
  };

  const paymentStatusLabel = (order: IOrder) =>
    order.status_payment === "paid"
      ? "Pagado"
      : order.status_payment === "pending"
        ? "Pendiente"
        : "Cancelado";

  const formattedTotal = (order: IOrder) =>
    new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      maximumFractionDigits: 2,
    }).format(Number(order.total_price) || 0);

  return (
    <ContainerManageOrders>
      <ListTable
        className="orders-table"
        headers={
          isMobile
            ? ["Comanda", "Total", "Acciones"]
            : [
                "Comanda",
                "Nombre",
                "Estado de pago",
                "Tipo de pago",
                "Total",
                "Acciones",
              ]
        }
      >
        {filteredOrders.length === 0 ? (
          <EmptyMessage>No hay comandas registradas.</EmptyMessage>
        ) : (
          filteredOrders.map((order) => (
            <TableRow
              $columns={isMobile ? 3 : 6}
              className={`orders-table-row ${order.status_payment}`}
              key={order.id}
              onClick={() => handleEdit(order)}
              style={{ cursor: "pointer" }}
            >
              <p className="order-number">
                #{String(order.order_number).padStart(2, "0")}
              </p>

              {!isMobile && (
                <p className="quantity">
                  {order.customer_name || "Sin nombre"}
                </p>
              )}

              {!isMobile && (
                <p className="payment-status">{paymentStatusLabel(order)}</p>
              )}

              {!isMobile && (
                <p className="payment-method">{paymentLabel(order)}</p>
              )}

              <p className="order-total">{formattedTotal(order)}</p>

              <div className="actions">
                <ActionButton
                  type="button"
                  title="Reimprimir comanda"
                  aria-label="Reimprimir comanda"
                  onClick={(event) => {
                    event.stopPropagation();
                    handlePrint(order);
                  }}
                >
                  <MdPrint />
                </ActionButton>

                <ActionButton
                  type="button"
                  title="Modificar comanda"
                  aria-label="Modificar comanda"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEdit(order);
                  }}
                >
                  <MdOutlineMoreHoriz />
                </ActionButton>
              </div>
            </TableRow>
          ))
        )}
      </ListTable>

      <ModalPrintFalse show={showPrinterModal} setShow={setShowPrinterModal} />

      <ModalForm
        isOpen={mode !== "create" || selectedOrder !== null}
        title={mode === "edit" ? "Modificar comanda" : ""}
        onClose={handleClose}
      >
        {mode === "edit" && selectedOrder && (
          <OrderForm
            mode="edit"
            order={selectedOrder}
            onSuccess={handleSuccess}
            onDeactivate={() => setMode("delete")}
          />
        )}
      </ModalForm>
    </ContainerManageOrders>
  );
};

export default ManageOrder;
