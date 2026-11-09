import type { Product } from "../../../interfaces/Product.ts";
import ProductForm from "../../Forms/ProductForm/ProductForm.tsx";

interface ModalProductEditProps {
  product: Product;
  categories: string[];
  onSuccess: () => void;
  onSubmittingChange: (value: boolean) => void;
}

const ModalProductEdit = ({
  product,
  categories,
  onSuccess,
  onSubmittingChange,
}: ModalProductEditProps) => {
  return (
    <ProductForm
      categories={categories}
      mode="edit"
      product={product}
      onSuccess={onSuccess}
      onSubmittingChange={onSubmittingChange}
    />
  );
};

export default ModalProductEdit;