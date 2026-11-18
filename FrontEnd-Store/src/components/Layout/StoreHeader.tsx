import { useEffect, useState } from "react";
import { ForkKnife, List, ShoppingBag, UserCircle, X } from "../../utils/icons.ts";
import type { StoreInfo } from "../../types/store.ts";
import {
  Header,
  Brand,
  BrandMark,
  HeaderActions,
  CartButton,
  CartCount,
  AccountButton,
  DesktopNav,
  MobileMenu,
  MenuButton,
  MobileNav,
} from "./StoreHeaderStyles.ts";

interface Props {
  store: StoreInfo | null;
  cartCount: number;
  onOpenCart: () => void;
  onOpenAccount: () => void;
}

export const StoreHeader = ({ store, cartCount, onOpenCart, onOpenAccount }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const config = store?.configuration;

  useEffect(() => setLogoFailed(false), [config?.logo_url]);

  const links = [
    { href: "#inicio", label: "Inicio" },
    { href: "#catalogo", label: "Productos" },
    { href: "#promociones", label: "Promociones" },
  ];

  const Logo = () => (
    <BrandMark>
      {config?.logo_url && !logoFailed ? (
        <img src={config.logo_url} alt="" onError={() => setLogoFailed(true)} />
      ) : (
        <ForkKnife weight="duotone" />
      )}
    </BrandMark>
  );

  const actions = (
    <HeaderActions>
      <AccountButton type="button" onClick={onOpenAccount} aria-label="Abrir mi cuenta">
        <UserCircle weight="duotone" /><span>Mi cuenta</span>
      </AccountButton>
      <CartButton type="button" onClick={onOpenCart}>
        <ShoppingBag weight="duotone" /><span>Mi pedido</span><CartCount>{cartCount}</CartCount>
      </CartButton>
    </HeaderActions>
  );

  return (
    <>
      <DesktopNav aria-label="Navegación principal">
        <Brand href="#inicio"><Logo /><span>{store?.name || "Boutique de Sabores"}</span></Brand>
        <nav>{links.map(link => <a key={link.href} href={link.href}>{link.label}</a>)}</nav>
        {actions}
      </DesktopNav>
      <Header>
        <MenuButton
          type="button"
          onClick={() => setMenuOpen(value => !value)}
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <List />}
        </MenuButton>
        <Brand href="#inicio"><Logo /><span>{store?.name || "Boutique de Sabores"}</span></Brand>
        {actions}
        {menuOpen && (
          <MobileMenu>
            <MobileNav>
              {links.map(link => (
                <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
              ))}
              <button type="button" onClick={() => { setMenuOpen(false); onOpenAccount(); }}>Mi cuenta</button>
            </MobileNav>
          </MobileMenu>
        )}
      </Header>
    </>
  );
};
