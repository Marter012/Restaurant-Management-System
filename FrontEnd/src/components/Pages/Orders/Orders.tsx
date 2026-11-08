import { useEffect, useState } from "react";
import { FaCashRegister } from "react-icons/fa";
import {
  MdOutlineWarning,
  MdOutlineCalendarToday,
  MdOutlineAccessTime,
} from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import ManageOrder from "../../ManageOrder/ManageOrder.tsx";

import {
  CashMessage,
  CashMessageLink,
  ContainerOrder,
  CashBlockedActions,
  CashBlockedConfirmButton,
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

import { OpenCashContainer } from "../../CashDay/CashDayStyles.ts";
import ModalOrderCreate from "../../Modals/ModalOrder/ModalOrderCreate.tsx";

const Orders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [parentOrderForAdditional, setParentOrderForAdditional] =
    useState<IOrder | null>(null);
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

  const isSelectedCashOpen = cashRegister?.status_cash_register === "open";

  const isReadOnlyMode = showReadOnlyOrders && !isSelectedCashOpen;

  const canManageOrders = isSelectedCashOpen;

  const canViewOrders = canManageOrders || isReadOnlyMode;

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

  // Abre las comandas asociadas al día y turno que ya estaban seleccionados,
  // sin habilitar acciones de creación, edición o modificación.
  const handleOpenSelectedDayOrders = () => {
    setShowReadOnlyOrders(true);
    setShowBlockedNotice(false);
  };

  const closeNewOrder = () => {
    setShowNewOrder(false);
    setParentOrderForAdditional(null);
  };

  const openNewOrder = () => {
    setParentOrderForAdditional(null);
    setShowNewOrder(true);
  };

  const openAdditionalOrder = (order: IOrder) => {
    setParentOrderForAdditional(order);
    setShowNewOrder(true);
  };

  useEffect(() => {
    if (orderToEdit) setShowNewOrder(false);
  }, [orderToEdit]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showNewOrder) {
        closeNewOrder();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showNewOrder]);

  useEffect(() => {
    document.body.style.overflow = showNewOrder ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showNewOrder]);

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
            <MdOutlineWarning />
          </OrderNoticeIcon>

          <OrderNoticeContent>
            <h2>Hay otra caja abierta</h2>

            <p>
              Podés ingresar a la caja abierta o consultar las comandas del día
              y turno que tenés seleccionados en modo de solo lectura.
            </p>

            <OrderNoticeDetails>
              <OrderNoticeDetail>
                <MdOutlineCalendarToday />
                <span>
                  <strong>Día de la caja abierta:</strong>{" "}
                  {formatDate(anotherCashDate)}
                </span>
              </OrderNoticeDetail>

              <OrderNoticeDetail>
                <MdOutlineAccessTime />
                <span>
                  <strong>Turno:</strong>{" "}
                  {anotherOpenCashRegister.shift === "morning"
                    ? "Mañana"
                    : "Noche"}
                </span>
              </OrderNoticeDetail>
            </OrderNoticeDetails>

            <CashBlockedActions>
              <CashBlockedConfirmButton
                type="button"
                onClick={handleGoToOpenCash}
              >
                <FaCashRegister />
                Ir a la caja abierta
              </CashBlockedConfirmButton>

              <CashBlockedConfirmButton
                type="button"
                onClick={handleOpenSelectedDayOrders}
              >
                Abrir pestaña de comandas igual
              </CashBlockedConfirmButton>
            </CashBlockedActions>
          </OrderNoticeContent>
        </OrderNotice>
      )}

      {/* CAJA CERRADA: SE MUESTRA SOLO SI NO HAY OTRA CAJA ABIERTA */}
      {cashRegister?.status === false &&
        !isCashBlocked &&
        !showReadOnlyOrders && (
          <OpenCashContainer>
            <CashMessage>
              <FaCashRegister />
              <h2>Caja cerrada</h2>

              <p>
                La caja del turno{" "}
                <strong>{shift === "morning" ? "mañana" : "noche"}</strong> está
                cerrada.
              </p>

              <span>
                Debés abrir la caja primero para poder gestionar las comandas.
              </span>
            </CashMessage>
          </OpenCashContainer>
        )}

      {/* NO EXISTE UNA CAJA PARA EL DÍA Y TURNO SELECCIONADOS */}
      {!cashRegister && !anotherOpenCashRegister && !showReadOnlyOrders && (
        <CashMessageLink to="/cashRegister">
          <CashMessage>
            <FaCashRegister />
            <h2>No hay una caja disponible</h2>
            <p>No existe una caja para el día y turno seleccionados.</p>
            <span>Abrí una caja antes de gestionar las comandas.</span>
          </CashMessage>
        </CashMessageLink>
      )}

      {/* COMANDAS: GESTIÓN NORMAL O CONSULTA DEL DÍA SELECCIONADO */}
      {/* COMANDAS */}

      {canViewOrders && (
        <ContainerOrder>
          <ManageOrder
            key={`${day}-${shift}`}
            orderIdToEdit={isReadOnlyMode ? undefined : orderToEdit}
            readOnly={isReadOnlyMode}
            onCreateOrder={canManageOrders ? openNewOrder : undefined}
            onAddAdditionalOrder={
              canManageOrders ? openAdditionalOrder : undefined
            }
          />
        </ContainerOrder>
      )}

      <ModalOrderCreate
        isOpen={showNewOrder}
        onClose={closeNewOrder}
        parentOrder={parentOrderForAdditional}
      />
    </ContainerPage>
  );
};

export default Orders;
