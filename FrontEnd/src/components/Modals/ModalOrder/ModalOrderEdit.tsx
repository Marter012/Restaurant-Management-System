import type { IOrder } from "../../../interfaces/Order.ts";
import OrderEditForm from "../../Forms/OrderForm/OrderEditForm.tsx";

interface Props {
  order: IOrder | null;
  onClose: () => void;
  readOnly?: boolean;
  onSubmittingChange: (value: boolean) => void;
}

export default function ModalOrderEdit({
  order,
  onClose,
  readOnly = false,
  onSubmittingChange,
}: Props) {
  if (!order) return null;

  return (
    <OrderEditForm
      order={order}
      readOnly={readOnly}
      onSuccess={onClose}
      onSubmittingChange={onSubmittingChange}
    />
  );
}