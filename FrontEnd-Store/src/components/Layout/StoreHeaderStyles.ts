import styled from "styled-components";

export const DesktopNav = styled.aside`
  position: sticky;
  top: 0;
  z-index: 35;
  width: 100%;
  min-height: 82px;
  padding: 13px clamp(18px, 5vw, 76px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  background: #f9f8f1ed;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--app-border);
  nav { display: flex; align-items: center; gap: 8px; }
  nav a { padding: 11px 15px; border-radius: 4px; color: var(--app-muted); font-size: .82rem; font-weight: 800; }
  nav a:hover { background: #e7e8dc; color: var(--app-primary); }
  @media (max-width: 760px) { display: none; }
`;

export const Header = styled.header`
  display: none;
  position: sticky;
  top: 0;
  z-index: 35;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 15px;
  background: #f9f8f1ed;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--app-border);
  @media (max-width: 760px) { display: flex; gap: 7px; }
  @media (max-width: 420px) { padding: 8px 9px; gap: 5px; }
`;

export const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  font-weight: 900;
  color: var(--app-primary);
  font-size: 1.02rem;
  letter-spacing: -.04em;
  span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
`;

export const BrandMark = styled.span`
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 8px;
  background: var(--app-primary);
  color: #e2e7ae;
  font-size: 1.2rem;
  img { width: 100%; height: 100%; object-fit: contain; }
  @media (max-width: 420px) { width: 38px; height: 38px; }
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  flex: 0 0 auto;
`;

export const CartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 46px;
  padding: 0 14px;
  border: 0;
  border-radius: 8px;
  background: var(--app-primary);
  color: #fff;
  font-weight: 850;
  box-shadow: 0 7px 18px rgba(23,63,53,.13);
  white-space: nowrap;
  transition: transform .18s, background .18s;
  &:hover:not(:disabled) { background: var(--app-primary-hover); transform: translateY(-1px); }
  @media (max-width: 760px) { min-height: 42px; padding: 0 9px; gap: 6px; font-size: .76rem; }
  @media (max-width: 420px) { width: 44px; padding: 0; span:not(:last-child) { display: none; } }
`;

export const AccountButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  background: var(--app-surface);
  color: var(--app-primary);
  font-weight: 800;
  white-space: nowrap;
  svg { font-size: 1.15rem; }
  @media (max-width: 760px) { width: 42px; min-height: 42px; padding: 0; span { display: none; } }
`;

export const CartCount = styled.span`
  display: grid;
  place-items: center;
  width: 23px;
  height: 23px;
  border-radius: 6px;
  background: #e2e7ae;
  color: var(--app-primary);
  font-size: .75rem;
  font-weight: 950;
`;

export const MenuButton = styled.button`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  background: var(--app-surface-strong);
  color: var(--app-primary);
  font-size: 1.1rem;
`;

export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 12px 15px 18px;
  background: var(--app-surface);
  border-bottom: 1px solid var(--app-border);
  box-shadow: 0 16px 25px rgba(0,0,0,.08);
`;

export const MobileNav = styled.nav`
  display: grid;
  gap: 5px;
  a, button {
    display: block;
    width: 100%;
    padding: 13px;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: var(--app-primary);
    text-align: left;
    font-weight: 850;
  }
  a:hover, button:hover { background: var(--app-canvas); }
`;
