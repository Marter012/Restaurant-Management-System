import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";

import type {
  CashMovementFormProps,
  CashPaymentMethod,
} from "../../../interfaces/CashMovements.ts";

import type { AppDispatch } from "../../../store/store.ts";

import {
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
} from "./CashMovementFormStyles.ts";

import { getCashMovementsAPI } from "../../../services/cashMovementService.ts";
import { setCashMovements } from "../../../store/slices/cashMovementSlice.ts";
import { useAlert } from "../../context/AlertContext.tsx";

interface CashMovementFormRefactorProps extends Omit<
  CashMovementFormProps,
  "isOpen" | "onSubmit"
> {
  formId?: string;
  onSubmittingChange?: (submitting: boolean) => void;
  onSubmit: (
    data: Parameters<CashMovementFormProps["onSubmit"]>[0],
  ) => void | Promise<void>;
}

const CashMovementForm = ({
  type,
  cashRegisterId,
  onClose,
  onSubmit,
  formId = "cash-movement-form",
  onSubmittingChange,
}: CashMovementFormRefactorProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { showAlert } = useAlert();

  const [methodPayment, setMethodPayment] = useState<CashPaymentMethod>("cash");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      showAlert("Ingresá un importe mayor a cero.", "error");
      return;
    }

    onSubmittingChange?.(true);

    const movementData = {
      cash_register_id: cashRegisterId,
      type,
      category: "manual" as const,
      amount: numericAmount,
      method_payment: methodPayment,
      description,
      date: new Date().toISOString(),
      status: true,
    };

    // Primero se registra el movimiento. Si falla, no se intenta refrescar la lista.
    try {
      await onSubmit(movementData);
    } catch (error) {
      console.error("Error registrando movimiento:", error);

      showAlert(
        error instanceof Error && error.message
          ? error.message
          : type === "inflow"
            ? "No se pudo registrar el ingreso."
            : "No se pudo registrar el egreso.",
        "error",
      );

      onSubmittingChange?.(false);
      return;
    }

    // La creación ya fue confirmada. Un fallo de actualización no significa
    // que el movimiento no se haya registrado.
    let refreshFailed = false;

    try {
      const cashMovements = await getCashMovementsAPI();
      dispatch(setCashMovements(cashMovements));
    } catch (error) {
      refreshFailed = true;
      console.error("El movimiento se registró, pero no se pudo actualizar la lista:", error);
    }

    setMethodPayment("cash");
    setAmount("");
    setDescription("");

    if (refreshFailed) {
      showAlert(
        "El movimiento se registró, pero no se pudo actualizar la lista. Volvé a cargar los movimientos.",
        "error",
      );
    } else {
      showAlert(
        type === "inflow"
          ? "Ingreso registrado correctamente."
          : "Egreso registrado correctamente.",
        "success",
      );
    }

    onClose();
    onSubmittingChange?.(false);
  };

  return (
    <Form id={formId} onSubmit={handleSubmit}>
      <div className="containerInfo">
        <FormGroup>
          <Label>Método de pago</Label>

          <Select
            value={methodPayment}
            onChange={(event) =>
              setMethodPayment(event.target.value as CashPaymentMethod)
            }
          >
            <option value="cash">Efectivo</option>
            <option value="debit_card">Débito</option>
            <option value="transfer">Transferencia</option>
            <option value="qr">QR</option>
            <option value="mercado_pago">Mercado Pago</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Monto</Label>

          <Input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="Ingrese el monto"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Descripción</Label>

          <TextArea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Descripción del movimiento"
          />
        </FormGroup>
      </div>
    </Form>
  );
};

export default CashMovementForm;
