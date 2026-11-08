import OpenCashForm from "../../../Forms/StatusCashForm/OpenCashForm.tsx";

interface Props {
  onSubmittingChange: (value: boolean) => void;
  onSubmit: (amount: number, shift?: any) => void | Promise<void>;
  onClose: () => void;
}
const OpenCashSection = (props: Props) => (
  <OpenCashForm {...props} formId="open-cash-form" />
);
export default OpenCashSection;
