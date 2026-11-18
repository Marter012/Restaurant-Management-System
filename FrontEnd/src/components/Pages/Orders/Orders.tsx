import { useEffect, useState } from "react";
import { CashRegister } from "@phosphor-icons/react";
import { Warning, CalendarBlank, Clock } from "@phosphor-icons/react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import ManageOrder from "../../ManageOrder/ManageOrder.tsx";

import {
  CashMessage,
  CashMessageLink,
  ContainerOrder,
  CashBlockedActions,
  OrderNotice,
  OrderNoticeIcon,
  OrderNoticeContent,
  OrderNoticeDetails,
  OrderNoticeDetail,
} from "./OrdersStyles.ts";

import type { RootState, AppDispatch } from "../../../store/store.ts";

import {
  selectDay,
  selectShift,
} from "../../../store/slices/daySelectedSlice.ts";

import { getDateOnly, formatDate } from "../../Utils/Formats.tsx";

import PageHeader from "../../PageHeaders/PageHeaders.tsx";
import { ContainerPage } from "../PageStyles.ts";
import type { IOrder } from "../../../interfaces/Order.ts";

import { StatusButton } from "../../Utils/ButtonStyles.ts";

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [showBlockedNotice, setShowBlockedNotice] = useState(false);
  const [showReadOnlyOrders, setShowReadOnlyOrders] = useState(false);

  const location = useLocation();
  const orderToEdit = location.state?.orderId as string | undefined;

  const { day, shift } = useSelector((state: RootState) => state.daySelected);

  const cashRegisters = useSelector(
    (state: RootState) => state.cashRegister.cashRegister,
  );

  // Caja correspondiente al día y turno actualmente seleccionados.
  const cashRegister = cashRegisters.find(
    (item) =>
      getDateOnly(item.date || item.opened_at) === day && item.shift === shift,
  );

  // Busca una caja abierta distinta de la seleccionada.
  const anotherOpenCashRegister = cashRegisters.find((item) => {
    const cashDate = item.date
      ? getDateOnly(item.date)
      : getDateOnly(item.opened_at);

    return (
      item.status_cash_register === "open" &&
      (cashDate !== day || item.shift !== shift)
    );
  });

  // Estado de la caja seleccionada.
  const isSelectedCashOpen = cashRegister?.status_cash_register === "open";

  // Si existe una caja seleccionada pero no está abierta.
  const isSelectedCashClosed = Boolean(cashRegister) && !isSelectedCashOpen;

  // Solo lectura cuando el usuario solicita consultar las comandas.
  const isReadOnlyMode = showReadOnlyOrders;

  const canManageOrders = isSelectedCashOpen;

  const canViewOrders = isSelectedCashOpen || showReadOnlyOrders;

  const isCashBlocked = Boolean(anotherOpenCashRegister) && !isSelectedCashOpen;

  // Si hay otra caja abierta, muestra el aviso con las dos alternativas.
  useEffect(() => {
    if (!isCashBlocked) {
      setShowBlockedNotice(false);
      return;
    }

    if (isCashBlocked && !showReadOnlyOrders) {
      setShowBlockedNotice(true);
    }
  }, [isCashBlocked, showReadOnlyOrders]);

  const selectedDay = useSelector((state: RootState) => state.daySelected.day);

  const selectedShift = useSelector(
    (state: RootState) => state.daySelected.shift,
  );

  const handleGoToOpenCash = () => {
    if (!anotherOpenCashRegister) return;

    const cashDate = anotherOpenCashRegister.date
      ? getDateOnly(anotherOpenCashRegister.date)
      : getDateOnly(anotherOpenCashRegister.opened_at);

    dispatch(selectDay(cashDate));
    dispatch(selectShift(anotherOpenCashRegister.shift));

    setShowBlockedNotice(false);
    setShowReadOnlyOrders(false);
  };

  // Permite consultar las comandas del día y turno seleccionados
  // sin habilitar acciones de creación o modificación.
  const handleOpenSelectedDayOrders = () => {
    setShowReadOnlyOrders(true);
    setShowBlockedNotice(false);
  };

  const openNewOrder = () => navigate("/orders/new");

  const openAdditionalOrder = (order: IOrder) =>
    navigate("/orders/new", { state: { parentOrder: order } });

  // Fecha de la otra caja abierta.
  const anotherCashDate = anotherOpenCashRegister
    ? anotherOpenCashRegister.date
      ? getDateOnly(anotherOpenCashRegister.date)
      : getDateOnly(anotherOpenCashRegister.opened_at)
    : "";

  return (
    <ContainerPage>
      <PageHeader
        title="Comandas"
        description="Gestioná las comandas, su estado y seguimiento."
      />

      {/* AVISO: EXISTE OTRA CAJA ABIERTA */}
      {showBlockedNotice && anotherOpenCashRegister && (
        <OrderNotice role="status" aria-live="polite">
          <OrderNoticeIcon>
            <Warning />
          </OrderNoticeIcon>

          <OrderNoticeContent>
            <h2>Hay otra caja abierta</h2>

            <p>
              Podés ingresar a la caja abierta o consultar las comandas del día
              y turno que tenés seleccionados en modo de solo lectura.
            </p>

            <OrderNoticeDetails>
              <OrderNoticeDetail>
                <CalendarBlank />
                <span>
                  <strong>Día de la caja abierta:</strong>{" "}
                  {formatDate(anotherCashDate)}
                </span>
              </OrderNoticeDetail>

              <OrderNoticeDetail>
                <Clock />
                <span>
                  <strong>Turno:</strong>{" "}
                  {anotherOpenCashRegister.shift === "morning"
                    ? "Mañana"
                    : "Noche"}
                </span>
              </OrderNoticeDetail>
            </OrderNoticeDetails>

            <CashBlockedActions>
              <StatusButton
                className="danger"
                type="button"
                onClick={handleGoToOpenCash}
              >
                <CashRegister /> Comandas ¬{" "}
                {formatDate(anotherOpenCashRegister?.opened_at || "")} | Turno{" "}
                {anotherOpenCashRegister?.shift === "morning"
                  ? "Mañana"
                  : "Noche"}
              </StatusButton>

              <StatusButton type="button" onClick={handleOpenSelectedDayOrders}>
                <CashRegister />
                Comandas ¬ {selectedDay} | Turno{" "}
                {selectedShift === "morning" ? "Mañana" : "Noche"}
              </StatusButton>
            </CashBlockedActions>
          </OrderNoticeContent>
        </OrderNotice>
      )}

      {/* AVISO: LA CAJA SELECCIONADA ESTÁ CERRADA */}
      {isSelectedCashClosed &&
        !anotherOpenCashRegister &&
        !showReadOnlyOrders && (
          <OrderNotice role="status" aria-live="polite">
            <OrderNoticeIcon>
              <Warning />
            </OrderNoticeIcon>

            <OrderNoticeContent>
              <h2>La caja seleccionada está cerrada</h2>

              <p>
                Esta caja pertenece al día y turno seleccionados. Podés
                consultar sus comandas en modo de solo lectura.
              </p>

              <OrderNoticeDetails>
                <OrderNoticeDetail>
                  <CalendarBlank />
                  <span>
                    <strong>Fecha:</strong> {formatDate(day)}
                  </span>
                </OrderNoticeDetail>

                <OrderNoticeDetail>
                  <Clock />
                  <span>
                    <strong>Turno:</strong>{" "}
                    {shift === "morning" ? "Mañana" : "Noche"}
                  </span>
                </OrderNoticeDetail>
              </OrderNoticeDetails>

              <CashBlockedActions>
                <StatusButton
                  type="button"
                  onClick={handleOpenSelectedDayOrders}
                >
                  <CashRegister />
                  Comandas | {formatDate(day)} | Turno{" "}
                  {shift === "morning" ? "Mañana" : "Noche"}
                </StatusButton>
              </CashBlockedActions>
            </OrderNoticeContent>
          </OrderNotice>
        )}

      {/* NO EXISTE UNA CAJA PARA EL DÍA Y TURNO SELECCIONADOS */}
      {!cashRegister && !anotherOpenCashRegister && !showReadOnlyOrders && (
        <CashMessageLink to="/cashRegister">
          <CashMessage>
            <CashRegister />

            <h2>No hay una caja disponible</h2>

            <p>No existe una caja para el día y turno seleccionados.</p>

            <span>Abrí una caja antes de gestionar las comandas.</span>
          </CashMessage>
        </CashMessageLink>
      )}

      {/* COMANDAS: GESTIÓN NORMAL O CONSULTA DEL DÍA SELECCIONADO */}
      {canViewOrders && (
        <ContainerOrder>
          <ManageOrder
            key={`${day}-${shift}-${isReadOnlyMode ? "readonly" : "manage"}`}
            orderIdToEdit={isReadOnlyMode ? undefined : orderToEdit}
            readOnly={isReadOnlyMode}
            onCreateOrder={canManageOrders ? openNewOrder : undefined}
            onAddAdditionalOrder={
              canManageOrders ? openAdditionalOrder : undefined
            }
          />
        </ContainerOrder>
      )}

    </ContainerPage>
  );
};

export default Orders;