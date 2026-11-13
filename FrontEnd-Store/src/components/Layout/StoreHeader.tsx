import { useState } from "react";
import { FaBars, FaShoppingBag, FaTimes, FaUtensils } from "react-icons/fa";
import type { StoreInfo } from "../../types/store.ts";
import {
  Header,
  Brand,
  BrandMark,
  HeaderActions,
  CartButton,
  CartCount,
  DesktopNav,
  MobileMenu,
  MenuButton,
  MobileNav,
} from "./StoreHeaderStyles.ts";
interface Props {
  store: StoreInfo | null;
  cartCount: number;
  onOpenCart: () => void;
}
export const StoreHeader = ({ store, cartCount, onOpenCart }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const config = store?.configuration;
  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#catalogo", label: "Productos" },
    { href: "#promociones", label: "Promociones" },
  ];
  return (
    <>
      <DesktopNav aria-label="Navegación principal">
        <Brand href="#inicio">
          <BrandMark>
            {config?.logo_url ? (
              <img src={config.logo_url} alt="" />
            ) : (
              <FaUtensils />
            )}
          </BrandMark>
          <span>{store?.name || "Boutique de Sabores"}</span>
        </Brand>
        <nav>
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <CartButton type="button" onClick={onOpenCart}>
          <FaShoppingBag />
          <span>Mi pedido</span>
          <CartCount>{cartCount}</CartCount>
        </CartButton>
      </DesktopNav>
      <Header>
        <MenuButton
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>
        <Brand href="#inicio">
          <BrandMark>
            {config?.logo_url ? (
              <img src={config.logo_url} alt="" />
            ) : (
              <FaUtensils />
            )}
          </BrandMark>
          <span>{store?.name || "Boutique de Sabores"}</span>
        </Brand>
        <HeaderActions>
          <CartButton type="button" onClick={onOpenCart}>
            <FaShoppingBag />
            <span>Mi pedido</span>
            <CartCount>{cartCount}</CartCount>
          </CartButton>
        </HeaderActions>
        {menuOpen && (
          <MobileMenu>
            <MobileNav>
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </MobileNav>
          </MobileMenu>
        )}
      </Header>
    </>
  );
};
