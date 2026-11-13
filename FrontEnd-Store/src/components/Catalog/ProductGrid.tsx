import { FaSearch } from "react-icons/fa";
import type { StoreProduct } from "../../types/store.ts";
import { EmptyState } from "../../styles/AppStyles.ts";
import { ProductCard } from "./ProductCard.tsx";
import { Grid } from "./ProductGridStyles.ts";

interface Props {
  products: StoreProduct[];
  getProductQuantity: (productId: string) => number;
  onSelectProduct: (product: StoreProduct) => void;
  onIncrementProduct: (productId: string) => void;
  onDecrementProduct: (productId: string) => void;
}

export const ProductGrid = ({
  products,
  getProductQuantity = () => 0,
  onSelectProduct,
  onIncrementProduct,
  onDecrementProduct,
}: Props) => (
  <Grid>
    {products.length ? (
      products.map((product) => {
        const quantity = getProductQuantity(product.id);
        return (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantity}
            onSelect={() => onSelectProduct(product)}
            onIncrement={() => onIncrementProduct(product.id)}
            onDecrement={() => onDecrementProduct(product.id)}
          />
        );
      })
    ) : (
      <EmptyState>
        <FaSearch size={25} />
        <strong>No encontramos productos</strong>
        <span>Probá con otra búsqueda o categoría.</span>
      </EmptyState>
    )}
  </Grid>
);
