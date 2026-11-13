import styled from "styled-components";
export const DesktopNav = styled.aside`
 position:sticky;top:0;z-index:35;width:100%;min-height:78px;padding:12px clamp(18px,5vw,72px);display:flex;align-items:center;justify-content:space-between;gap:22px;background:#fffefaee;backdrop-filter:blur(18px);border-bottom:1px solid var(--app-border);
 nav{display:flex;align-items:center;gap:8px}nav a{padding:10px 14px;border-radius:30px;color:var(--app-muted);font-size:.86rem;font-weight:800}nav a:hover{background:var(--app-surface-strong);color:var(--app-primary)}
 @media(max-width:760px){min-height:66px;padding:10px 16px;nav{display:none}}
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
  background: var(--app-surface);
  border-bottom: 1px solid var(--app-border);
  @media (max-width: 900px) {
    display: none;
  }
`;
export const Brand = styled.a`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  font-weight: 900;
  color: var(--app-primary);
  font-size: 1rem;
  letter-spacing: -0.03em;
  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
export const BrandMark = styled.span`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 13px;
  background: var(--app-primary);
  color: #fff;
  font-size: 1.1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const CartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: var(--app-primary);
  color: #fff;
  font-weight: 800;
  box-shadow: 0 7px 18px rgba(23, 63, 53, 0.16);
  white-space: nowrap;
  &:hover:not(:disabled) {
    background: var(--app-primary-hover);
    transform: translateY(-1px);
  }
`;
export const CartCount = styled.span`
  display: grid;
  place-items: center;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: var(--app-accent);
  color: #fff;
  font-size: 0.75rem;
`;
export const MenuButton = styled.button`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  border: 1px solid var(--app-border);
  border-radius: 12px;
  background: var(--app-surface-strong);
  color: var(--app-primary);
  font-size: 1rem;
`;
export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 12px 15px 18px;
  background: var(--app-surface);
  border-bottom: 1px solid var(--app-border);
  box-shadow: 0 16px 25px rgba(0, 0, 0, 0.08);
`;
export const MobileNav = styled.nav`
  display: grid;
  gap: 5px;
  a {
    padding: 12px;
    border-radius: 10px;
    color: var(--app-primary);
    font-weight: 800;
  }
  a:hover {
    background: var(--app-canvas);
  }
`;
