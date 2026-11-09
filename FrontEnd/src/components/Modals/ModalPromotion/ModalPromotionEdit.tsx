import type { Promotion } from "../../../interfaces/Promotion";
import PromotionForm from "../../Forms/PromotionForm/PromotionForm";

interface Props {
  promotion: Promotion;
  onSuccess: () => Promise<void>;
  onSubmittingChange: (value: boolean) => void;
}

export default function ModalPromotionEdit({
  promotion,
  onSuccess,
  onSubmittingChange,
}: Props) {
  return (
    <PromotionForm
      mode="edit"
      promotion={promotion}
      onSuccess={onSuccess}
      onSubmittingChange={onSubmittingChange}
    />
  );
}