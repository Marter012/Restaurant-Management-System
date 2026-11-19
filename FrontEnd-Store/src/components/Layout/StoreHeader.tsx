
import { ShoppingBag } from "../../utils/icons.ts";
import type { StoreInfo } from "../../types/store.ts";
import {
  Header,
  CartButton,
  CartCount,
} from "./StoreHeaderStyles.ts";

interface Props {
  store: StoreInfo | null;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
}

export const StoreHeader = ({ cartCount, onOpenCart }: Props) => {

  return (
    <Header style={{justifyContent:"flex-end", minHeight:64, background:"transparent", border:0, boxShadow:"none"}}>
      <CartButton type="button" onClick={onOpenCart} aria-label={`Abrir carrito, ${cartCount} productos`}>
        <ShoppingBag weight="duotone" /><CartCount>{cartCount}</CartCount>
      </CartButton>
    </Header>
  );
};
