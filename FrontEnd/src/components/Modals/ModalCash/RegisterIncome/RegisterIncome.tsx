import CashMovementForm from "../../../Forms/CashMovementForm/CashMovementForm.tsx";

interface Props {
  cashRegisterId: string;
  onSubmittingChange: (value: boolean) => void;
  onSubmit: (data: any) => void | Promise<void>;
  onClose: () => void;
}
const RegisterIncome = (props: Props) => (
  <CashMovementForm {...props} type="inflow" formId="cash-movement-form" />
);
export default RegisterIncome;
