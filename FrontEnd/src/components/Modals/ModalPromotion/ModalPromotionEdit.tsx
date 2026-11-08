import type { Promotion } from "../../../interfaces/Promotion";
import PromotionForm from "../../Forms/PromotionForm/PromotionForm";

interface Props {
  promotion: Promotion;
  onSuccess: () => Promise<void>;
}

export default function ModalPromotionEdit({ promotion, onSuccess }: Props) {
  return <PromotionForm mode="edit" promotion={promotion} onSuccess={onSuccess} />;
}
