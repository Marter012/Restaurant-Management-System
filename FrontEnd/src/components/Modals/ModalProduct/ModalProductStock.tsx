import type { Product } from "../../../interfaces/Product.ts";
import StockForm from "../../Forms/StockForm/StockForm.tsx";

interface ModalProductStockProps {
  product: Product;
  onSuccess: () => void;
}

const ModalProductStock = ({
  product,
  onSuccess,
}: ModalProductStockProps) => {
  return (
    <StockForm
      product={product}
      onSuccess={onSuccess}
    />
  );
};

export default ModalProductStock;