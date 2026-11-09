import { Form } from "formik";
import styled, { css } from "styled-components";

/* =========================================================
   MODAL PRINCIPAL
========================================================= */

export const OrderCreateOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background: var(--modal-overlay);
  backdrop-filter: blur(5px);
  @media (max-width: 650px) {
    padding: 8px;
  }
`;

export const OrderCreateModal = styled.section`
  display: flex;
  flex-direction: column;
  width: min(1160px, 100%);
  height: min(790px, 94dvh);
  min-width: 0;
  min-height: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 18px;
  background: var(--color-background);
  box-shadow: var(--shadow-lg);

  @media (max-width: 700px) {
    height: 96dvh;
    border-radius: 13px;
  }
`;

export const OrderCreateHeader = styled.header`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 62px;
  padding: 12px 24px;
  box-sizing: border-box;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface);

  h2 {
    margin: 0;
    color: var(--color-primary);
    font-size: 1.45rem;
    font-weight: 800;
  }

  @media (max-width: 600px) {
    padding: 10px 14px;

    h2 {
      font-size: 1.2rem;
    }
  }
`;

export const OrderCreateClose = styled.button`
  display: grid;
  flex: 0 0 38px;
  place-items: center;
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--color-primary);
  font-size: 1.8rem;
  cursor: pointer;
  transition: background 0.2s ease;
  &:hover {
    background: var(--color-surface-hover);
  }

  &:focus-visible {
    outline: 3px solid var(--color-accent);
    outline-offset: 2px;
  }
`;

export const OrderCreateBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  overflow: hidden;
  @media (max-width: 900px) {
    padding: 8px;
  }
`;

export const OrderCreateFooter = styled.footer`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 13px 20px;
  border-top: 1px solid var(--color-border);
  background: var(--color-surface);

  @media (max-width: 600px) {
    padding: 10px;

    > button {
      width: 100%;
    }
  }
`;

export const CreateOrderButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 10px 20px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-sm);
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 0.9rem;
  font-weight: 850;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid var(--color-accent);
    outline-offset: 3px;
  }
`;

/* =========================================================
   ESTRUCTURA PRINCIPAL Y SCROLL
========================================================= */

/* =========================================================
   ESTRUCTURA DEL FORMULARIO MIGRADA DESDE NEWORDER
========================================================= */

export const OrderForm = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 1600px;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
`;

export const ContainerNewOrder = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
`;

export const OrderPanelSurface = styled.div`
  ${css`
    min-width: 0;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    background: var(--color-surface);
    box-shadow: var(--shadow-sm);
  `}
`;

export const MainOrder = styled.main`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  overflow: hidden;
  > div {
    display: block;
    width: 100%;
    height: 100%;
    min-width: 0;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
  }

  @media (max-width: 900px) {
    display: block;
    height: 100%;
    min-height: 0;
    overflow: hidden;

    > div {
      display: none;
      width: 100%;
      height: 100%;
      min-height: 0;
      overflow-y: auto;
      overflow-x: hidden;
      overscroll-behavior: contain;
    }

    > div.mobile-active {
      display: block;
    }

    > div.mobile-hidden {
      display: none;
    }
  }
`;
/* =========================================================
   SELECTOR MOBILE
========================================================= */

export const MobileOrderSelector = styled.nav`
  display: none;

  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 5px;
    width: 100%;
    margin-bottom: 12px;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-surface-hover);
  }

  @media (max-width: 500px) {
    gap: 4px;
    margin-bottom: 10px;
    padding: 4px;
  }
`;

export const MobileOrderButton = styled.button<{ $active: boolean }>`
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 8px 10px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--color-primary)" : "transparent")};
  border-radius: 7px;
  background: ${({ $active }) =>
    $active ? "var(--color-primary)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--color-white)" : "var(--color-text-secondary)"};
  font-size: 0.9rem;
  font-weight: ${({ $active }) => ($active ? 800 : 600)};
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? "var(--color-primary-hover)" : "var(--color-primary-soft)"};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 500px) {
    min-height: 38px;
    font-size: 0.82rem;
  }
`;

/* =========================================================
   CONFIRMACIÓN DE VENTA SIN STOCK
========================================================= */

export const StockWarningContent = styled.div`
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  align-items: start;
  gap: 14px;
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
  padding: 8px 4px 2px;
  box-sizing: border-box;

  @media (max-width: 520px) {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 12px;
    padding: 4px 0 0;
  }
`;

export const StockWarningIcon = styled.span`
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border: 1px solid var(--color-partial);
  border-radius: 14px;
  background: var(--color-partial-soft);
  color: var(--color-partial);
  font-size: 1.5rem;
  font-weight: 900;

  @media (max-width: 520px) {
    width: 40px;
    height: 40px;
  }
`;

export const StockWarningMessage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  min-width: 0;
  padding-top: 2px;

  strong {
    color: var(--color-primary);
    font-size: 1rem;
    font-weight: 850;
    line-height: 1.45;
  }

  span {
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    line-height: 1.6;
  }

  @media (max-width: 520px) {
    strong {
      font-size: 0.94rem;
    }

    span {
      font-size: 0.85rem;
    }
  }
`;

export const StockWarningActions = styled.div`
  display: flex;
  grid-column: 1 / -1;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);

  @media (max-width: 520px) {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 9px;
    margin-top: 6px;
    padding-top: 13px;
  }
`;

export const StockWarningButton = styled.button<{
  $variant: "primary" | "secondary";
}>`
  min-height: 44px;
  padding: 0 19px;
  border: 1px solid
    ${({ $variant }) =>
      $variant === "primary" ? "var(--color-primary)" : "var(--color-border)"};
  border-radius: 11px;
  background: ${({ $variant }) =>
    $variant === "primary" ? "var(--color-primary)" : "var(--color-surface)"};
  color: ${({ $variant }) =>
    $variant === "primary" ? "var(--color-white)" : "var(--color-primary)"};
  font: inherit;
  font-size: 0.9rem;
  font-weight: 800;
  cursor: pointer;
  transition:
    background 160ms ease,
    transform 160ms ease;

  &:hover {
    background: ${({ $variant }) =>
      $variant === "primary"
        ? "var(--color-primary-hover)"
        : "var(--color-surface-hover)"};
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 3px solid var(--color-accent);
    outline-offset: 3px;
  }

  @media (max-width: 520px) {
    width: 100%;
    min-height: 46px;
  }
`;

/* =========================================================
   SELECCIÓN DE PROMOCIONES EN CONFLICTO
========================================================= */

export const PromotionChoiceContent = styled.div`
  display: grid;
  gap: 12px;
  color: var(--color-text);

  > p {
    margin: 0;
    color: var(--color-text-secondary);
    line-height: 1.55;
  }
`;

export const PromotionChoiceCard = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 15px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface-hover);

  > div {
    display: grid;
    gap: 4px;
    min-width: 0;
  }

  strong {
    color: var(--color-primary);
    overflow-wrap: anywhere;
  }

  span {
    color: var(--color-success);
    font-weight: 850;
  }

  @media (max-width: 480px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const PromotionChoiceActions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 5px;
`;

export const PromotionChoiceButton = styled.button<{ $secondary?: boolean }>`
  min-height: 40px;
  padding: 9px 14px;
  border: 1px solid
    ${({ $secondary }) =>
      $secondary ? "var(--color-border)" : "var(--color-primary)"};
  border-radius: var(--radius-sm);
  background: ${({ $secondary }) =>
    $secondary ? "var(--color-surface)" : "var(--color-primary)"};
  color: ${({ $secondary }) =>
    $secondary ? "var(--color-text-secondary)" : "var(--color-white)"};
  font-size: 0.83rem;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $secondary }) =>
      $secondary ? "var(--color-surface-hover)" : "var(--color-primary-hover)"};
  }
`;
