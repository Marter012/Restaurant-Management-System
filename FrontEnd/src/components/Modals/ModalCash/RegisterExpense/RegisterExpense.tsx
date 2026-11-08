import CashMovementForm from "../../../Forms/CashMovementForm/CashMovementForm.tsx";

interface Props {
  cashRegisterId: string;
  onSubmittingChange: (value: boolean) => void;
  onSubmit: (data: any) => void | Promise<void>;
  onClose: () => void;
}
const RegisterExpense = (props: Props) => (
  <CashMovementForm {...props} type="outflow" formId="cash-movement-form" />
);
export default RegisterExpense;
