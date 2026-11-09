import PromotionForm from "../../Forms/PromotionForm/PromotionForm";

interface Props {
  onSuccess: () => Promise<void>;
  onSubmittingChange: (value: boolean) => void;
}

export default function ModalPromotionCreate({
  onSuccess,
  onSubmittingChange,
}: Props) {
  return (
    <PromotionForm
      mode="create"
      onSuccess={onSuccess}
      onSubmittingChange={onSubmittingChange}
    />
  );
}