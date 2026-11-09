import ProductForm from "../../Forms/ProductForm/ProductForm.tsx";

interface ModalProductCreateProps {
  categories: string[];
  onSuccess: () => void;
  onSubmittingChange: (value: boolean) => void;
}

const ModalProductCreate = ({
  categories,
  onSuccess,
  onSubmittingChange,
}: ModalProductCreateProps) => {
  return (
    <ProductForm
      categories={categories}
      mode="create"
      onSuccess={onSuccess}
      onSubmittingChange={onSubmittingChange}
    />
  );
};

export default ModalProductCreate;