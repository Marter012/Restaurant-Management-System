import type { Product } from "../../../interfaces/Product.ts";
import ProductForm from "../../Forms/ProductForm/ProductForm.tsx";

interface ModalProductEditProps {
  product: Product;
  categories: string[];
  onSuccess: () => void;
}

const ModalProductEdit = ({
  product,
  categories,
  onSuccess,
}: ModalProductEditProps) => {
  return (
    <ProductForm
      categories={categories}
      mode="edit"
      product={product}
      onSuccess={onSuccess}
    />
  );
};

export default ModalProductEdit;