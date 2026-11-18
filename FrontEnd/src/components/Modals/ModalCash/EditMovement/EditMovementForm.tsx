import type { FormEvent } from "react";
import type { CashMovementType, CashPaymentMethod } from "../../../../interfaces/CashMovements.ts";
import { EditMovementForm as Form, EditMovementField, EditMovementInput } from "../../../CashDay/CashDayStyles.ts";

interface Props {
  description: string; amount: string; type: CashMovementType; methodPayment: CashPaymentMethod; saving: boolean;
  onDescriptionChange: (value: string) => void; onAmountChange: (value: string) => void;
  onTypeChange: (value: CashMovementType) => void; onMethodPaymentChange: (value: CashPaymentMethod) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
const EditMovementForm = ({ description, amount, type, methodPayment, saving, onDescriptionChange, onAmountChange, onTypeChange, onMethodPaymentChange, onSubmit }: Props) => (
  <Form id="edit-movement-form" onSubmit={onSubmit}>
    <EditMovementField><label htmlFor="edit-movement-type">Tipo de movimiento</label><select id="edit-movement-type" value={type} onChange={(event) => onTypeChange(event.target.value as CashMovementType)}><option value="inflow">Ingreso</option><option value="outflow">Egreso</option></select></EditMovementField>
    <EditMovementField><label htmlFor="edit-movement-amount">Monto</label><EditMovementInput id="edit-movement-amount" name="amount" type="number" min="0.01" step="0.01" value={amount} onChange={(event) => onAmountChange(event.target.value)} placeholder="0,00" required /></EditMovementField>
    <EditMovementField><label htmlFor="edit-movement-description">Descripción</label><EditMovementInput id="edit-movement-description" name="description" type="text" value={description} onChange={(event) => onDescriptionChange(event.target.value)} placeholder="Ej.: compra de insumos" maxLength={180} required /></EditMovementField>
    <EditMovementField><label htmlFor="edit-movement-method">Método de pago</label><select id="edit-movement-method" value={methodPayment} onChange={(event) => onMethodPaymentChange(event.target.value as CashPaymentMethod)}><option value="cash">Efectivo</option><option value="debit_card">Débito</option><option value="transfer">Transferencia</option><option value="qr">QR</option><option value="mercado_pago">Mercado Pago</option></select></EditMovementField>
    <button type="submit" disabled={saving} hidden aria-hidden="true">Guardar</button>
  </Form>
);
export default EditMovementForm;
