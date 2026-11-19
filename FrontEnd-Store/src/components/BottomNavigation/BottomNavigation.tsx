import { House, ForkKnife, TagSimple, Basket, User } from "../../utils/icons.ts";
import { Bar, Item } from "./BottomNavigation.styles.ts";

export type StoreView = "home" | "products" | "promotions" | "account";

export function BottomNavigation({
  onNavigate, onCart, cartCount, activeView,
}: {
  onNavigate: (view: StoreView) => void;
  onCart: () => void;
  cartCount: number;
  activeView: StoreView;
}) {
  return (
    <Bar $hasCart={cartCount > 0} aria-label="Navegación de tienda">
      <Item type="button" className={activeView === "home" ? "active" : ""} onClick={() => onNavigate("home")}><House /><span>Inicio</span></Item>
      <Item type="button" className={activeView === "products" ? "active" : ""} onClick={() => onNavigate("products")}><ForkKnife /><span>Menú</span></Item>
      <Item type="button" className={activeView === "promotions" ? "active" : ""} onClick={() => onNavigate("promotions")}><TagSimple /><span>Ofertas</span></Item>
      {cartCount > 0 && <Item type="button" onClick={onCart}><Basket /><span>Carrito ({cartCount})</span></Item>}
      <Item type="button" className={activeView === "account" ? "active" : ""} onClick={() => onNavigate("account")}><User /><span>Cuenta</span></Item>
    </Bar>
  );
}
