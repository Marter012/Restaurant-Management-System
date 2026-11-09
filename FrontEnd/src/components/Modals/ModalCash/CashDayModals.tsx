import { FaEdit } from "react-icons/fa";
import type { FormEvent } from "react";

import OpenCashSection from "./OpenCashModal/OpenCashSection.tsx";
import CloseCashSection from "./CloseCashModal/CloseCashSection.tsx";
import RegisterIncome from "./RegisterIncome/RegisterIncome.tsx";
import RegisterExpense from "./RegisterExpense/RegisterExpense.tsx";
import EditMovementForm from "./EditMovement/EditMovementForm.tsx";
import SaleDetailsContent from "./SaleDetails/SaleDetailsContent.tsx";

import {
  EditOrderButton,
  EditMovementSaveButton,
} from "../../CashDay/CashDayStyles.ts";

import {
  SubmitButton as CashSubmit,
} from "../../Forms/StatusCashForm/CloseCashFormStyles.ts";

import {
  SubmitButton as MovementSubmit,
} from "../../Forms/CashMovementForm/CashMovementFormStyles.ts";

import ModalForm from "../../ModalForm/ModalForm.tsx";

import type { ICashMovement } from "../../../interfaces/CashMovements.ts";

export type CashDayModalMode =
  | "open"
  | "close"
  | "income"
  | "expense"
  | "editMovement"
  | "sale"
  | null;

interface Props {
  mode: CashDayModalMode;
  selectedShift: string;
  openingAmount: number;
  cashRegisterId: string;

  openingSubmitting: boolean;
  closingSubmitting: boolean;
  movementSubmitting: boolean;
  editSubmitting: boolean;

  editingMovement: ICashMovement | null;
  editDescription: string;
  editAmount: string;

  selectedSale: any;

  onClose: () => void;
  onOpenSubmit: (amount: number, shift?: any) => void | Promise<void>;
  onCloseSubmit: (amount: number) => void | Promise<void>;
  onMovementSubmit: (data: any) => void | Promise<void>;

  onSubmittingOpen: (value: boolean) => void;
  onSubmittingClose: (value: boolean) => void;
  onSubmittingMovement: (value: boolean) => void;

  onEditSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onEditDescription: (value: string) => void;
  onEditAmount: (value: string) => void;

  onEditOrder: () => void;
}

const CashDayModals = (props: Props) => {
  const {
    mode,
    selectedShift,
    openingAmount,
    cashRegisterId,
    openingSubmitting,
    closingSubmitting,
    movementSubmitting,
    editSubmitting,
    editingMovement,
    editDescription,
    editAmount,
    selectedSale,
    onClose,
    onOpenSubmit,
    onCloseSubmit,
    onMovementSubmit,
    onSubmittingOpen,
    onSubmittingClose,
    onSubmittingMovement,
    onEditSubmit,
    onEditDescription,
    onEditAmount,
    onEditOrder,
  } = props;

  if (!mode) return null;

  const title =
    mode === "open"
      ? `Abrir caja ${selectedShift === "morning" ? "Turno mañana" : "Turno noche"}`
      : mode === "close"
        ? `Cerrar caja ${selectedShift === "morning" ? "de mañana" : "de noche"}`
        : mode === "income"
          ? "Agregar ingreso"
          : mode === "expense"
            ? "Agregar egreso"
            : mode === "editMovement"
              ? "Modificar movimiento"
              : mode === "sale"
                ? `Venta #${selectedSale?.order_number ?? ""}`
                : "";

  const busy =
    mode === "open"
      ? openingSubmitting
      : mode === "close"
        ? closingSubmitting
        : mode === "income" || mode === "expense"
          ? movementSubmitting
          : mode === "editMovement"
            ? editSubmitting
            : false;

  const footerActions =
    mode === "open" ? (
      <CashSubmit
        type="submit"
        form="open-cash-form"
        disabled={busy}
      >
        {busy ? "Abriendo..." : "Abrir caja"}
      </CashSubmit>
    ) : mode === "close" ? (
      <CashSubmit
        type="submit"
        form="close-cash-form"
        disabled={busy}
      >
        {busy ? "Cerrando..." : "Cerrar caja"}
      </CashSubmit>
    ) : mode === "income" || mode === "expense" ? (
      <MovementSubmit
        type="submit"
        form="cash-movement-form"
        disabled={busy}
      >
        {busy
          ? "Guardando..."
          : mode === "income"
            ? "Agregar ingreso"
            : "Agregar egreso"}
      </MovementSubmit>
    ) : mode === "editMovement" ? (
      <EditMovementSaveButton
        type="submit"
        form="edit-movement-form"
        disabled={busy}
      >
        {busy ? "Guardando..." : "Guardar cambios"}
      </EditMovementSaveButton>
    ) : mode === "sale" ? (
      <EditOrderButton type="button" onClick={onEditOrder}>
        <FaEdit />
        Modificar comanda
      </EditOrderButton>
    ) : undefined;

  const modalSize =
    mode === "income" ||
    mode === "expense" ||
    mode === "open" ||
    mode === "close"
      ? "compact"
      : "default";

  return (
    <ModalForm
      isOpen={Boolean(mode)}
      title={title}
      onClose={onClose}
      size={modalSize}
      footerActions={footerActions}
    >
      {mode === "open" && (
        <OpenCashSection
          onSubmittingChange={onSubmittingOpen}
          onSubmit={onOpenSubmit}
          onClose={onClose}
        />
      )}

      {mode === "close" && (
        <CloseCashSection
          onSubmittingChange={onSubmittingClose}
          openingAmount={openingAmount}
          onSubmit={onCloseSubmit}
          onClose={onClose}
        />
      )}

      {mode === "income" && (
        <RegisterIncome
          cashRegisterId={cashRegisterId}
          onSubmittingChange={onSubmittingMovement}
          onSubmit={onMovementSubmit}
          onClose={onClose}
        />
      )}

      {mode === "expense" && (
        <RegisterExpense
          cashRegisterId={cashRegisterId}
          onSubmittingChange={onSubmittingMovement}
          onSubmit={onMovementSubmit}
          onClose={onClose}
        />
      )}

      {mode === "editMovement" && editingMovement && (
        <EditMovementForm
          description={editDescription}
          amount={editAmount}
          saving={editSubmitting}
          onDescriptionChange={onEditDescription}
          onAmountChange={onEditAmount}
          onSubmit={onEditSubmit}
        />
      )}

      {mode === "sale" && selectedSale && (
        <SaleDetailsContent sale={selectedSale} />
      )}
    </ModalForm>
  );
};

export default CashDayModals;