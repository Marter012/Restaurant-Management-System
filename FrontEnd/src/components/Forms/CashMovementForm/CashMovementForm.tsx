import { useState, type FormEvent } from "react";

import { useDispatch } from "react-redux";

import type {
  CashMovementFormProps,
  CashPaymentMethod,
} from "../../../interfaces/CashMovements.ts";

import type { AppDispatch } from "../../../store/store.ts";

import ModalForm from "../../ModalForm/ModalForm.tsx";

import {
  Form,
  FormGroup,
  Label,
  Input,
  Select,
  TextArea,
  Actions,
  CancelButton,
  SubmitButton,
} from "./CashMovementFormStyles.ts";

import { getCashMovementsAPI } from "../../../services/cashMovementService.ts";
import { setCashMovements } from "../../../store/slices/cashMovementSlice.ts";

const CashMovementForm = ({
  isOpen,
  type,
  cashRegisterId,
  onClose,
  onSubmit,
}: CashMovementFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [methodPayment, setMethodPayment] = useState<CashPaymentMethod>("cash");

  const [amount, setAmount] = useState("");

  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const isIncome = type === "inflow";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const numericAmount = Number(amount);

    if (!numericAmount || numericAmount <= 0) {
      return;
    }

    setLoading(true);

    try {
      await onSubmit({
        cash_register_id: cashRegisterId,

        type,

        category: "manual",

        amount: numericAmount,

        method_payment: methodPayment,

        description,

        date: new Date().toISOString(),

        status: true,
      });

      const cashMovements = await getCashMovementsAPI();

      dispatch(setCashMovements(cashMovements));

      setMethodPayment("cash");
      setAmount("");
      setDescription("");

      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalForm
      isOpen={isOpen}
      title={isIncome ? "Agregar ingreso" : "Agregar egreso"}
      onClose={onClose}
    >
      <Form onSubmit={handleSubmit}>
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
              rows={3}
            />
          </FormGroup>
        </div>

        <Actions>
          <CancelButton type="button" onClick={onClose} disabled={loading}>
            Cancelar
          </CancelButton>

          <SubmitButton type="submit" disabled={loading}>
            {loading
              ? "Guardando..."
              : isIncome
                ? "Agregar ingreso"
                : "Agregar egreso"}
          </SubmitButton>
        </Actions>
      </Form>
    </ModalForm>
  );
};

export default CashMovementForm;
