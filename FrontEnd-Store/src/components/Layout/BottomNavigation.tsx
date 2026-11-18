import { House, ForkKnife, TagSimple, Basket, User } from "../../utils/icons.ts";
import { Bar, Item } from "./BottomNavigationStyles.ts";

export function BottomNavigation({
  onCart,
  onAccount,
  cartCount,
}: {
  onCart: () => void;
  onAccount: () => void;
  cartCount: number;
}) {
  return (
    <Bar $hasCart={cartCount > 0} aria-label="Navegación de tienda">
      <Item as="a" href="#inicio"><House /><span>Inicio</span></Item>
      <Item as="a" href="#catalogo"><ForkKnife /><span>Menú</span></Item>
      <Item as="a" href="#promociones"><TagSimple /><span>Ofertas</span></Item>
      {cartCount > 0 && <Item type="button" onClick={onCart}><Basket /><span>Pedido ({cartCount})</span></Item>}
      <Item type="button" onClick={onAccount}><User /><span>Cuenta</span></Item>
    </Bar>
  );
}
