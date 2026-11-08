import PromotionForm from "../../Forms/PromotionForm/PromotionForm";

interface Props {
  onSuccess: () => Promise<void>;
}

export default function ModalPromotionCreate({ onSuccess }: Props) {
  return <PromotionForm mode="create" onSuccess={onSuccess} />;
}
