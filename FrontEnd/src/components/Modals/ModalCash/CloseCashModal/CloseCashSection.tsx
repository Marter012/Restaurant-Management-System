import CloseCashForm from "../../../Forms/StatusCashForm/CloseCashForm.tsx";

interface Props {
  openingAmount: number;
  onSubmittingChange: (value: boolean) => void;
  onSubmit: (amount: number) => void | Promise<void>;
  onClose: () => void;
}
const CloseCashSection = (props: Props) => (
  <CloseCashForm {...props} formId="close-cash-form" />
);
export default CloseCashSection;
