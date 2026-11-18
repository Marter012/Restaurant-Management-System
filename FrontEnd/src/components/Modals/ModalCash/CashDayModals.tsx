import { PencilSimple } from "@phosphor-icons/react";
import type { FormEvent } from "react";

import OpenCashSection from "./OpenCashModal/OpenCashSection.tsx";
import CloseCashSection from "./CloseCashModal/CloseCashSection.tsx";
import CashMovementForm from "../../Forms/CashMovementForm/CashMovementForm.tsx";
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

import type { ICashMovement, CashMovementType, CashPaymentMethod } from "../../../interfaces/CashMovements.ts";

export type CashDayModalMode =
  | "open"
  | "close"
  | "movement"
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
  editType: CashMovementType;
  editMethodPayment: CashPaymentMethod;
  onEditType: (value: CashMovementType) => void;
  onEditMethodPayment: (value: CashPaymentMethod) => void;
  onDeleteMovement: () => void;

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
    editType,
    editMethodPayment,
    onEditType,
    onEditMethodPayment,
    onDeleteMovement,
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
        : mode === "movement"
          ? "Registrar movimiento extra"
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
        : mode === "movement"
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
    ) : mode === "movement" ? (
      <MovementSubmit
        type="submit"
        form="cash-movement-form"
        disabled={busy}
      >
        {busy ? "Guardando..." : "Registrar movimiento"}
      </MovementSubmit>
    ) : mode === "editMovement" ? (
      <div style={{ display: "flex", gap: 8 }}>
      {editingMovement?.category === "manual" && !editingMovement?.order_id && <button type="button" disabled={busy} onClick={onDeleteMovement}>Eliminar movimiento</button>}
      <EditMovementSaveButton
        type="submit"
        form="edit-movement-form"
        disabled={busy}
      >
        {busy ? "Guardando..." : "Guardar cambios"}
      </EditMovementSaveButton>
      </div>
    ) : mode === "sale" ? (
      <EditOrderButton type="button" onClick={onEditOrder}>
        <PencilSimple />
        Modificar comanda
      </EditOrderButton>
    ) : undefined;

  const modalSize =
    mode === "movement" ||
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

      {mode === "movement" && (
        <CashMovementForm
          type="inflow"
          allowTypeSelection
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
          type={editType}
          methodPayment={editMethodPayment}
          saving={editSubmitting}
          onDescriptionChange={onEditDescription}
          onAmountChange={onEditAmount}
          onTypeChange={onEditType}
          onMethodPaymentChange={onEditMethodPayment}
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