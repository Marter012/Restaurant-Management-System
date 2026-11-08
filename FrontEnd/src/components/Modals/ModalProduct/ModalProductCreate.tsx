import ProductForm from "../../Forms/ProductForm/ProductForm.tsx";

interface ModalProductCreateProps {
  categories: string[];
  onSuccess: () => void;
}

const ModalProductCreate = ({
  categories,
  onSuccess,
}: ModalProductCreateProps) => {
  return (
    <ProductForm
      categories={categories}
      mode="create"
      onSuccess={onSuccess}
    />
  );
};

export default ModalProductCreate;