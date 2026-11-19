import styled from "styled-components";

export const Footer = styled.footer`
  width: min(1160px, calc(100% - 40px));
  margin: 30px auto 16px;
  padding: 22px 26px 15px;
  border: 1px solid #e4e3d8;
  border-radius: 18px;
  background: linear-gradient(115deg, #fffefa 0%, #f4f3e9 100%);
  color: var(--app-muted);
  box-shadow: 0 10px 30px rgba(42, 48, 35, .055);

  @media (max-width: 620px) {
    width: calc(100% - 24px);
    margin: 22px auto 12px;
    padding: 18px 16px 13px;
    border-radius: 15px;
  }
`;

export const FooterMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;

  @media (max-width: 620px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
  }
`;

export const FooterBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;

  .brand-mark {
    display: grid;
    place-items: center;
    width: 43px;
    height: 43px;
    flex: 0 0 auto;
    border-radius: 13px;
    background: var(--app-primary);
    color: #fff;
    font-size: 1.35rem;
  }

  .brand-copy { display: grid; gap: 4px; min-width: 0; }
  strong { color: var(--app-primary); font-size: .98rem; font-weight: 950; letter-spacing: -.025em; }
  small { color: var(--app-muted); font-size: .76rem; line-height: 1.45; }
`;

export const FooterContact = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 43px;
  padding: 0 15px;
  border: 1px solid #c9dfce;
  border-radius: 11px;
  background: #edf7ef;
  color: #176b3b;
  font-size: .8rem;
  font-weight: 850;
  text-decoration: none;
  transition: transform .18s ease, background .18s ease, box-shadow .18s ease;

  svg { font-size: 1.1rem; }
  .arrow { margin-left: 2px; font-size: .9rem; }
  &:hover { transform: translateY(-1px); background: #e2f2e6; box-shadow: 0 6px 16px #176b3b14; }
  &:focus-visible { outline: 3px solid #80bd91; outline-offset: 3px; }

  @media (max-width: 620px) { width: 100%; }
`;

export const FooterBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 17px;
  padding-top: 13px;
  border-top: 1px solid #e8e7dd;
  color: #85877e;
  font-size: .68rem;
  line-height: 1.5;

  @media (max-width: 620px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 3px;
  }
`;
