import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "../../store/store.ts";

import type {
  ICreateCashRegister,
  IUpdateCashRegister,
} from "../../interfaces/CashRegister.ts";

import {
  createCashRegisterAPI,
  updateCashRegisterAPI,
} from "../../services/cashRegisterService.ts";

import {
  createCashMovementAPI,
  updateCashMovementAPI,
  getCashMovementsAPI,
} from "../../services/cashMovementService.ts";

import {
  addCashRegister,
  updateCashRegister,
} from "../../store/slices/cashRegisterSlice.ts";

import {
  addCashMovement,
  setCashMovements,
} from "../../store/slices/cashMovementSlice.ts";

import { getDateOnly, formatDate, getDateTime } from "../Utils/Formats.tsx";

import { OpenCashContainer, OpenCashButton } from "./CashDayStyles.ts";

import type {
  CashMovementType,
  ICashMovement,
} from "../../interfaces/CashMovements.ts";

import { getAxiosErrorMessage } from "../Utils/ErrorAxios.tsx";
import { useNavigate } from "react-router-dom";
import type { CashDayModalMode } from "../Modals/ModalCash/CashDayModals.tsx";
import CashDashboardContent from "../DashBoardCashDay/CashDashboardContent.tsx";
import CashDayModals from "../Modals/ModalCash/CashDayModals.tsx";
import { useAlert } from "../context/AlertContext.tsx";

type ActiveTab = "today" | "history";

type CashRegisterItem = RootState["cashRegister"]["cashRegister"][number];

interface CashDayProps {
  setActiveTab: React.Dispatch<React.SetStateAction<ActiveTab>>;
  onBlockedByOpenCash: (cashRegister: CashRegisterItem) => void;
}

const CashDay = ({ setActiveTab, onBlockedByOpenCash }: CashDayProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  /* =========================================================
     REDUX
  ========================================================= */

  const cashRegisters = useSelector(
    (state: RootState) => state.cashRegister.cashRegister,
  );

  const movements = useSelector(
    (state: RootState) => state.cashMovement.cashMovements,
  );

  const orders = useSelector((state: RootState) => state.orders.orders);

  const selectedDay = useSelector((state: RootState) => state.daySelected.day);

  const selectedShift = useSelector(
    (state: RootState) => state.daySelected.shift,
  );

  /* =========================================================
     ESTADOS
  ========================================================= */

  const [openCashModal, setOpenCashModal] = useState(false);

  const [closeCashModal, setCloseCashModal] = useState(false);

  const [movementModalOpen, setMovementModalOpen] = useState(false);
  const [openingCashSubmitting, setOpeningCashSubmitting] = useState(false);
  const [closingCashSubmitting, setClosingCashSubmitting] = useState(false);
  const [movementSubmitting, setMovementSubmitting] = useState(false);

  const [movementType, setMovementType] = useState<CashMovementType>("inflow");
  const [editingMovement, setEditingMovement] = useState<ICashMovement | null>(
    null,
  );
  const [editMovementDescription, setEditMovementDescription] = useState("");
  const [editMovementAmount, setEditMovementAmount] = useState("");
  const [savingMovementEdit, setSavingMovementEdit] = useState(false);

  const [selectedSale, setSelectedSale] = useState<
    (typeof orders)[number] | null
  >(null);

  const modalMode: CashDayModalMode = openCashModal
    ? "open"
    : closeCashModal
      ? "close"
      : movementModalOpen
        ? movementType === "inflow"
          ? "income"
          : "expense"
        : editingMovement
          ? "editMovement"
          : selectedSale
            ? "sale"
            : null;

  /*
   * En dispositivos chicos permite alternar entre
   * ventas y movimientos.
   *
   * En notebook/PC ambos paneles se muestran siempre.
   */

  /* =========================================================
     FECHA
  ========================================================= */

  const today = getDateOnly(new Date());

  const isToday = formatDate(selectedDay) === formatDate(today);

  /* =========================================================
     CAJAS DEL DÍA SELECCIONADO
  ========================================================= */

  const dayCashRegisters = useMemo(() => {
    return cashRegisters.filter((cashRegister) => {
      const cashDate = cashRegister.date
        ? getDateOnly(cashRegister.date)
        : getDateOnly(cashRegister.opened_at);

      return cashDate === selectedDay;
    });
  }, [cashRegisters, selectedDay]);

  /* =========================================================
     CAJA SELECCIONADA
  ========================================================= */

  const selectedCashRegister = useMemo(() => {
    return dayCashRegisters.find(
      (cashRegister) => cashRegister.shift === selectedShift,
    );
  }, [dayCashRegisters, selectedShift]);

  const cashStatus = selectedCashRegister?.status_cash_register;

  const canModifyCash = cashStatus === "open";

  /* =========================================================
     OTRA CAJA ABIERTA
  ========================================================= */

  const anotherOpenCashRegister = useMemo(() => {
    return cashRegisters.find((cashRegister) => {
      const cashDate = cashRegister.date
        ? getDateOnly(cashRegister.date)
        : getDateOnly(cashRegister.opened_at);

      const isOpen = cashRegister.status_cash_register === "open";

      const isDifferentCash =
        cashDate !== selectedDay || cashRegister.shift !== selectedShift;

      return isOpen && isDifferentCash;
    });
  }, [cashRegisters, selectedDay, selectedShift]);

  /* =========================================================
     MOVIMIENTOS MANUALES Y VENTAS DE ESTA CAJA
  ========================================================= */

  const cashRegisterMovements = useMemo(() => {
    if (!selectedCashRegister) return [];

    return movements.filter(
      (movement) =>
        String(movement.cash_register_id) === String(selectedCashRegister.id),
    );
  }, [movements, selectedCashRegister]);

  // Las ventas se obtienen desde orders, no desde cash_movements.
  // Así también se muestran las comandas pendientes o parcialmente pagadas.
  const cashRegisterOrders = useMemo(() => {
    if (!selectedCashRegister) return [];

    return orders.filter(
      (order) =>
        String(order.cash_register_id ?? "") ===
        String(selectedCashRegister.id),
    );
  }, [orders, selectedCashRegister]);

  // En la tabla de movimientos solo se muestran registros manuales.
  const manualMovements = useMemo(
    () => cashRegisterMovements.filter((movement) => !movement.order_id),
    [cashRegisterMovements],
  );

  // Se conservan los movimientos asociados a ventas únicamente para calcular
  // los importes efectivamente ingresados y el saldo real de caja.
  const salePaymentMovements = useMemo(
    () =>
      cashRegisterMovements.filter((movement) => Boolean(movement.order_id)),
    [cashRegisterMovements],
  );

  /* =========================================================
     TOTALES DE VENTAS PAGADAS / COBRADAS
  ========================================================= */

  const salesTotal = useMemo(() => {
    return salePaymentMovements
      .filter((movement) => movement.type === "inflow")
      .reduce((total, movement) => total + movement.amount, 0);
  }, [salePaymentMovements]);

  /* =========================================================
     MÉTODOS DE PAGO
  ========================================================= */

  const getSalesPaymentTotal = (method: string) => {
    return salePaymentMovements
      .filter(
        (movement) =>
          movement.method_payment === method && movement.type === "inflow",
      )
      .reduce((total, movement) => total + movement.amount, 0);
  };

  const totalCash = getSalesPaymentTotal("cash");
  const totalTransfer = getSalesPaymentTotal("transfer");
  const totalQR = getSalesPaymentTotal("qr");
  const totalDebit = getSalesPaymentTotal("debit_card");
  const totalMercadoPago = getSalesPaymentTotal("mercado_pago");

  const cashManualIncome = manualMovements
    .filter((m) => m.type === "inflow" && m.method_payment === "cash")
    .reduce((t, m) => t + m.amount, 0);
  const cashManualExpense = manualMovements
    .filter((m) => m.type === "outflow" && m.method_payment === "cash")
    .reduce((t, m) => t + m.amount, 0);

  const currentCashBalance =
    (selectedCashRegister?.opening_amount ?? 0) +
    totalCash +
    cashManualIncome -
    cashManualExpense;

  const previousClosedCash = useMemo(
    () =>
      cashRegisters
        .filter((cash) => cash.status_cash_register !== "open")
        .sort(
          (a, b) =>
            new Date(b.closed_at || b.opened_at).getTime() -
            new Date(a.closed_at || a.opened_at).getTime(),
        )[0],
    [cashRegisters],
  );

  /* =========================================================
     MOVIMIENTOS MANUALES
  ========================================================= */

  const manualIncome = useMemo(() => {
    return manualMovements
      .filter((movement) => movement.type === "inflow")
      .reduce((total, movement) => total + movement.amount, 0);
  }, [manualMovements]);

  const manualExpense = useMemo(() => {
    return manualMovements
      .filter((movement) => movement.type === "outflow")
      .reduce((total, movement) => total + movement.amount, 0);
  }, [manualMovements]);

  /* =========================================================
     MENSAJES
  ========================================================= */

  const handleOpenCashRequest = () => {
    if (anotherOpenCashRegister) {
      onBlockedByOpenCash(anotherOpenCashRegister);
      return;
    }

    setOpenCashModal(true);
  };

  /* =========================================================
     CREAR CAJA
  ========================================================= */

  const handleCreateCash = async (openingAmount: number) => {
    const anotherOpenCash = cashRegisters.find((cashRegister) => {
      const cashDate = cashRegister.date
        ? getDateOnly(cashRegister.date)
        : getDateOnly(cashRegister.opened_at);

      return (
        cashRegister.status_cash_register === "open" &&
        (cashDate !== selectedDay || cashRegister.shift !== selectedShift)
      );
    });

    if (anotherOpenCash) {
      setOpenCashModal(false);
      onBlockedByOpenCash(anotherOpenCash);
      return;
    }

    const existingCashRegister = dayCashRegisters.find(
      (cashRegister) => cashRegister.shift === selectedShift,
    );

    if (existingCashRegister) {
      setOpenCashModal(false);

      showAlert(
        `La caja de ${
          selectedShift === "morning" ? "mañana" : "noche"
        } ya existe para este día.`,
        "error",
      );

      return;
    }

    try {
      const newCashRegister: ICreateCashRegister = {
        date: selectedDay,
        shift: selectedShift,
        opened_at: getDateTime(new Date()),
        opening_amount: openingAmount,
        status_cash_register: "open",
        status: true,
      };

      const response = await createCashRegisterAPI(newCashRegister);

      dispatch(addCashRegister(response));

      showAlert("Caja abierta correctamente", "success");

      setOpenCashModal(false);
    } catch (error) {
      console.error("Error al abrir caja:", error);

      showAlert(
        getAxiosErrorMessage(error, "Ocurrió un error al abrir la caja."),
        "error",
      );
    }
  };

  /* =========================================================
     INGRESO / EGRESO MANUAL
  ========================================================= */

  const handleOpenMovement = (type: CashMovementType) => {
    if (!canModifyCash) {
      showAlert(
        `La caja no está disponible para registrar ${
          type === "inflow" ? "ingresos" : "egresos"
        }.`,
        "error",
      );

      return;
    }

    setMovementType(type);
    setMovementModalOpen(true);
  };

  const handleOpenIncome = () => {
    handleOpenMovement("inflow");
  };

  const handleOpenExpense = () => {
    handleOpenMovement("outflow");
  };

  const handleOpenEditMovement = (movement: ICashMovement) => {
    if (!canModifyCash) return;
    setEditingMovement(movement);
    setEditMovementDescription(movement.description ?? "");
    setEditMovementAmount(String(movement.amount));
  };

  const handleSubmitEditMovement = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    if (!editingMovement || !canModifyCash || savingMovementEdit) return;

    const description = editMovementDescription.trim();
    const amount = Number(editMovementAmount.replace(",", "."));

    if (!description) {
      showAlert("Ingresá una descripción para el movimiento.", "error");
      return;
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      showAlert("Ingresá un importe mayor a cero.", "error");
      return;
    }

    try {
      setSavingMovementEdit(true);
      await updateCashMovementAPI(editingMovement.id, { description, amount });
      dispatch(setCashMovements(await getCashMovementsAPI()));
      setEditingMovement(null);
      showAlert("Movimiento actualizado correctamente", "success");
    } catch (error) {
      showAlert(
        getAxiosErrorMessage(error, "No se pudo actualizar el movimiento."),
        "error",
      );
    } finally {
      setSavingMovementEdit(false);
    }
  };

  /* =========================================================
     CREAR MOVIMIENTO MANUAL
  ========================================================= */

  const handleCreateMovement = async (data: any) => {
    if (!canModifyCash) {
      throw new Error(
        "La caja no está abierta. No se puede registrar el movimiento.",
      );
    }

    try {
      const response = await createCashMovementAPI(data);
      dispatch(addCashMovement(response));
    } catch (error) {
      console.error("Error al registrar el movimiento:", error);

      throw new Error(
        getAxiosErrorMessage(
          error,
          "Ocurrió un error al registrar el movimiento.",
        ),
      );
    }
  };

  const handleCloseCash = () => {
    setCloseCashModal(true);
  };

  /* =========================================================
     CERRAR CAJA
  ========================================================= */

  const handleSubmitCloseCash = async (closingAmount: number) => {
    if (!selectedCashRegister) {
      showAlert("No se encontró una caja para cerrar.", "error");

      return;
    }

    try {
      const updateData: IUpdateCashRegister = {
        date: selectedCashRegister.date,
        shift: selectedCashRegister.shift,
        opened_at: selectedCashRegister.opened_at,
        opening_amount: selectedCashRegister.opening_amount,
        closed_at: getDateTime(new Date()),
        closing_amount: closingAmount,
        status_cash_register: "close",
        status: true,
      };

      const response = await updateCashRegisterAPI(
        selectedCashRegister.id,
        updateData,
      );

      dispatch(updateCashRegister(response));

      setCloseCashModal(false);
      showAlert("La caja fue cerrada correctamente", "success");

      setActiveTab("history");
    } catch (error) {
      console.error("🔴 ERROR AL CERRAR CAJA:", error);

      showAlert(
        getAxiosErrorMessage(error, "Ocurrió un error al cerrar la caja."),
        "error",
      );
    }
  };

  /* =========================================================
     ESTADOS DE PANTALLA
  ========================================================= */

  const showBlockedByOpenCash =
    !selectedCashRegister && Boolean(anotherOpenCashRegister);

  const showOpenCash =
    isToday && !selectedCashRegister && !anotherOpenCashRegister;

  const showNoCash =
    !isToday && !selectedCashRegister && !anotherOpenCashRegister;

  useEffect(() => {
    if (showBlockedByOpenCash && anotherOpenCashRegister) {
      onBlockedByOpenCash(anotherOpenCashRegister);
    }
  }, [showBlockedByOpenCash, anotherOpenCashRegister, onBlockedByOpenCash]);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      {/* =====================================================
          SIN CAJA - HOY
      ===================================================== */}

      {showOpenCash && (
        <OpenCashContainer>
          <h2>
            La caja del turno {selectedShift === "morning" ? "MAÑANA" : "NOCHE"}{" "}
            del día {formatDate(selectedDay)} todavía no está abierta
          </h2>

          <p>
            Para comenzar a registrar ingresos y egresos tenés que abrir la caja
            con el monto inicial de efectivo.
          </p>

          <OpenCashButton type="button" onClick={handleOpenCashRequest}>
            Abrir caja
          </OpenCashButton>
        </OpenCashContainer>
      )}

      {/* =====================================================
          SIN CAJA - HISTÓRICO
      ===================================================== */}

      {showNoCash && (
        <OpenCashContainer>
          <h2>Caja no disponible</h2>

          <p>
            La caja del dia {formatDate(selectedDay)} en el turno{" "}
            {selectedShift === "morning" ? "mañana" : "noche"} no fue abierta.
          </p>
        </OpenCashContainer>
      )}

      {/* =====================================================
          CAJA DISPONIBLE
      ===================================================== */}

      {selectedCashRegister && (
        <CashDashboardContent
          selectedCashRegister={selectedCashRegister}
          canModifyCash={canModifyCash}
          selectedShift={selectedShift}
          selectedDay={selectedDay}
          currentCashBalance={currentCashBalance}
          salesTotal={salesTotal}
          manualIncome={manualIncome}
          manualExpense={manualExpense}
          cashRegisterMovements={manualMovements}
          orders={cashRegisterOrders}
          totalCash={totalCash}
          totalTransfer={totalTransfer}
          totalMercadoPago={totalMercadoPago}
          totalQR={totalQR}
          totalDebit={totalDebit}
          previousClosedCash={previousClosedCash}
          onOpenIncome={handleOpenIncome}
          onOpenExpense={handleOpenExpense}
          onCloseCash={handleCloseCash}
          onSelectSale={setSelectedSale}
          onEditMovement={handleOpenEditMovement}
        />
      )}

      <CashDayModals
        mode={modalMode}
        selectedShift={selectedShift}
        openingAmount={selectedCashRegister?.opening_amount ?? 0}
        cashRegisterId={selectedCashRegister?.id ?? ""}
        openingSubmitting={openingCashSubmitting}
        closingSubmitting={closingCashSubmitting}
        movementSubmitting={movementSubmitting}
        editSubmitting={savingMovementEdit}
        editingMovement={editingMovement}
        editDescription={editMovementDescription}
        editAmount={editMovementAmount}
        selectedSale={selectedSale}
        onClose={() => {
          if (modalMode === "open" && openingCashSubmitting) return;
          if (modalMode === "close" && closingCashSubmitting) return;
          if (
            (modalMode === "income" || modalMode === "expense") &&
            movementSubmitting
          )
            return;
          if (modalMode === "editMovement" && savingMovementEdit) return;
          if (modalMode === "open") setOpenCashModal(false);
          else if (modalMode === "close") setCloseCashModal(false);
          else if (modalMode === "income" || modalMode === "expense")
            setMovementModalOpen(false);
          else if (modalMode === "editMovement") setEditingMovement(null);
          else if (modalMode === "sale") setSelectedSale(null);
        }}
        onOpenSubmit={handleCreateCash}
        onCloseSubmit={handleSubmitCloseCash}
        onMovementSubmit={handleCreateMovement}
        onSubmittingOpen={setOpeningCashSubmitting}
        onSubmittingClose={setClosingCashSubmitting}
        onSubmittingMovement={setMovementSubmitting}
        onEditSubmit={handleSubmitEditMovement}
        onEditDescription={setEditMovementDescription}
        onEditAmount={setEditMovementAmount}
        onEditOrder={() => {
          if (!selectedSale) return;
          const orderId = selectedSale.id;
          setSelectedSale(null);
          navigate("/orders", { state: { orderId: String(orderId) } });
        }}
      />
    </>
  );
};

export default CashDay;
