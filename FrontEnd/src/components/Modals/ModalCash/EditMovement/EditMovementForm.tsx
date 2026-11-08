import type { FormEvent } from "react";
import {
  EditMovementForm as Form,
  EditMovementField,
  EditMovementInput,
} from "../../../CashDay/CashDayStyles.ts";
interface Props {
  description: string;
  amount: string;
  saving: boolean;
  onDescriptionChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}
const EditMovementForm = ({
  description,
  amount,
  saving,
  onDescriptionChange,
  onAmountChange,
  onSubmit,
}: Props) => (
  <Form onSubmit={onSubmit}>
    <EditMovementField>
      <label htmlFor="edit-movement-description">Descripción</label>
      <EditMovementInput
        id="edit-movement-description"
        name="description"
        type="text"
        value={description}
        onChange={(event) => onDescriptionChange(event.target.value)}
        placeholder="Ej.: compra de insumos"
        maxLength={180}
        autoFocus
        required
      />
    </EditMovementField>
    <EditMovementField>
      <label htmlFor="edit-movement-amount">Importe</label>
      <EditMovementInput
        id="edit-movement-amount"
        name="amount"
        type="number"
        min="0.01"
        step="0.01"
        value={amount}
        onChange={(event) => onAmountChange(event.target.value)}
        placeholder="0,00"
        required
      />
    </EditMovementField>
    <button type="submit" disabled={saving} hidden aria-hidden="true">
      Guardar
    </button>
  </Form>
);
export default EditMovementForm;
