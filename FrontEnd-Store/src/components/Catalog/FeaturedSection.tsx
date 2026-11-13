import { FaStar } from "react-icons/fa";
import type { StoreProduct } from "../../types/store.ts";
import { ProductGrid } from "./ProductGrid.tsx";
import { FeaturedWrap } from "./FeaturedSectionStyles.ts";
interface Props {
  products: StoreProduct[];
  getProductQuantity: (id: string) => number;
  onSelectProduct: (product: StoreProduct) => void;
  onIncrementProduct: (id: string) => void;
  onDecrementProduct: (id: string) => void;
}
export const FeaturedSection = ({products,...actions}: Props) => {
  if (!products.length) return null;
  return <FeaturedWrap id="destacados"><header><span><FaStar /> SELECCIÓN DE LA CASA</span><h2>Productos destacados</h2><p>Una selección especial para descubrir nuestros favoritos.</p></header><ProductGrid products={products} {...actions} /></FeaturedWrap>;
};
