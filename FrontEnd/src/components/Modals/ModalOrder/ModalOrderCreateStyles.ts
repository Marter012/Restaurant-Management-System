import styled from "styled-components";

/* =========================================================
   COMPONENTES UTILIZADOS POR ModalOrderCreate.tsx
========================================================= */

export const OrderCreateModal = styled.section`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: auto;
  min-height: 100dvh;
  min-width: 0;

  box-sizing: border-box;
  overflow: visible;

  border: 1px solid var(--app-border);
  border-radius: 18px;
  background: var(--app-canvas);
  box-shadow: 0 24px 80px rgba(30, 17, 10, 0.3);

  @media (max-width: 700px) {
    min-height: 96dvh;
    border-radius: 13px;
  }
`;

export const CreateOrderButton = styled.button`
  width: 100% !important;
  height: 50px;
  border: none;
  border-radius: 0px;
  background: var(--color-accent);
  color: var(--color-white) !important;
  font-size: 0.9rem;
  margin: 0 !important;
  font-weight: 850;
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &.disabled {
    background-color: red;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }
`;

export const MainOrder = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(300px, 3fr);
  align-items: start;
  gap: 16px;

  width: 100%;
  min-width: 0;
  height: auto;
  min-height: 0;

  overflow: visible;

  @media (max-width: 1023px) {
    display: block;
    height: auto;
    min-height: 0;
    overflow: visible;

    > .mobile-hidden {
      display: none;
    }

    > .mobile-active {
      display: block;
      width: 100%;
      min-width: 0;
      min-height: 0;
    }
  }
`;

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
  border: 1px solid var(--app-warning);
  border-radius: 14px;
  background: var(--app-warning-soft);
  color: var(--app-warning);
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
    color: var(--app-primary);
    font-size: 1rem;
    font-weight: 850;
    line-height: 1.45;
  }

  span {
    color: var(--app-muted-dark);
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

export const StockWarningButton = styled.button<{
  $variant: "primary" | "secondary";
}>`
  min-height: 44px;
  padding: 0 19px;
  border: 1px solid
    ${({ $variant }) =>
      $variant === "primary" ? "var(--app-primary)" : "var(--app-border)"};
  border-radius: 11px;
  background: ${({ $variant }) =>
    $variant === "primary" ? "var(--app-primary)" : "var(--app-paper)"};
  color: ${({ $variant }) =>
    $variant === "primary" ? "var(--app-white)" : "var(--app-primary)"};
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
        ? "var(--app-primary-hover)"
        : "var(--app-surface-soft)"};
  }

  &:active {
    transform: translateY(1px);
  }

  &:focus-visible {
    outline: 3px solid var(--app-accent);
    outline-offset: 3px;
  }

  @media (max-width: 520px) {
    width: 100%;
    min-height: 46px;
  }
`;

export const PromotionChoiceContent = styled.div`
  display: grid;
  gap: 12px;
  color: var(--app-ink);

  > p {
    margin: 0;
    color: var(--app-muted-dark);
    line-height: 1.55;
  }
`;

export const PromotionChoiceCard = styled.article`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 15px;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius);
  background: var(--app-surface-soft);

  > div {
    display: grid;
    gap: 4px;
    min-width: 0;
  }

  strong {
    color: var(--app-primary);
    overflow-wrap: anywhere;
  }

  span {
    color: var(--app-success);
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
      $secondary ? "var(--app-border)" : "var(--app-primary)"};
  border-radius: var(--app-radius-sm);
  background: ${({ $secondary }) =>
    $secondary ? "var(--app-paper)" : "var(--app-primary)"};
  color: ${({ $secondary }) =>
    $secondary ? "var(--app-muted-dark)" : "var(--app-white)"};
  font-size: 0.83rem;
  font-weight: 800;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ $secondary }) =>
      $secondary ? "var(--app-surface-soft)" : "var(--app-primary-hover)"};
  }
`;

export const OrderCreatePanel = styled.section<{
  $fixed?: boolean;
  $fixedLeft?: number;
  $fixedWidth?: number;
}>`
  display: flex;
  flex-direction: column;

  width: 100%;
  min-width: 0;
  min-height: 0;
  height: auto;

  box-sizing: border-box;

  border: 1px solid var(--app-border);

  background: var(--app-paper);
  box-shadow: var(--app-shadow-sm);

  > :not(header) {
    min-width: 0;
  }

  /* =========================================
     PRODUCTOS
     Altura automática y sin scroll interno
  ========================================= */

  &.order-products-panel {
    position: relative;

    display: flex;
    flex-direction: column;

    width: 100%;
    height: auto;
    min-height: 0;
    max-height: none;

    overflow: visible;
  }

  &.order-products-panel > :first-child {
    flex: 0 0 auto;

    width: 100%;
    height: auto;
    min-height: 0;
    max-height: none;

    overflow: visible;
  }

  /* =========================================
     DETALLE DE COMANDA
     FIXED REAL
  ========================================= */

  &.order-summary-panel {
    position: ${({ $fixed }) => ($fixed ? "fixed" : "relative")};

    top: ${({ $fixed }) => ($fixed ? "0" : "auto")};
    left: ${({ $fixed, $fixedLeft }) => ($fixed ? `${$fixedLeft ?? 0}px` : "auto")};

    width: ${({ $fixed, $fixedWidth }) => ($fixed ? `${$fixedWidth ?? 0}px` : "100%")} !important;
    min-width: 0;

    border-top-left-radius: ${({ $fixed }) =>
      !$fixed ? " 15px;" : "none"} !important;
    border-top-right-radius: ${({ $fixed }) =>
      !$fixed ? " 15px;" : "none"} !important;

    /* Solamente cambia la altura */
    height: 100dvh;

    display: flex;
    flex-direction: column;

    box-sizing: border-box;
    overflow: hidden;

    z-index: ${({ $fixed }) => ($fixed ? 1000 : 5)};
  }

  /* =========================================
     FORMULARIO
     SCROLL INTERNO
  ========================================= */

  &.order-summary-panel > :first-child {
    flex: 1 1 0;
    width: 100%;
    min-height: 0;

    overflow-x: hidden;
    overflow-y: auto;

    overscroll-behavior-y: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  /* =========================================
     BOTÓN INFERIOR
  ========================================= */

  &.order-summary-panel > button {
    flex: 0 0 auto;

    width: calc(100% - 28px);
    min-width: 0;

    margin: 12px 14px 14px;
  }

  /* =========================================
     MOBILE
  ========================================= */

  @media (max-width: 1023px) {
    border-radius: 12px;

    &.mobile-hidden {
      display: none;
    }

    &.mobile-active {
      display: flex;
    }

    &.order-products-panel {
      height: auto;
      overflow: visible;
    }

    &.order-summary-panel {
      position: ${({ $fixed }) => ($fixed ? "fixed" : "relative")};

      top: ${({ $fixed }) => ($fixed ? "0" : "auto")};

      left: ${({ $fixed, $fixedLeft }) =>
        $fixed ? `${$fixedLeft ?? 0}px` : "auto"};

      width: ${({ $fixed, $fixedWidth }) =>
        $fixed ? `${$fixedWidth}px` : "100%"};

      min-width: 0;
      box-sizing: border-box;

      height: 50dvh !important;
      max-height: 50dvh !important;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      z-index: ${({ $fixed }) => ($fixed ? 1000 : 5)};
    }

    &.order-summary-panel > :first-child {
      flex: 0 1 auto;
      min-height: 0;
      overflow: visible;
    }
  }
`;

export const OrderSummaryAnchor = styled.div`
  position: relative;

  display: block;
  width: 100%;
  height: 100dvh;

  min-width: 0;
  min-height: 0;

  align-self: start;
  overflow: visible;

  /* =========================================
     MOBILE
  ========================================= */

  @media (max-width: 1023px) {
    height: auto;
    min-height: 0;

    &.mobile-hidden {
      display: none;
    }

    &.mobile-active {
      display: block;
    }
  }
`;

export const MobileOrderSelector = styled.nav`
  display: none;

  @media (max-width: 1023px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 5px;
    width: 100%;
    margin-bottom: 12px;
    padding: 5px;
    box-sizing: border-box;
    border: 1px solid var(--app-border);
    border-radius: 10px;
    background: var(--app-surface-soft);
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
    ${({ $active }) => ($active ? "var(--app-primary)" : "transparent")};
  border-radius: 7px;
  background: ${({ $active }) =>
    $active ? "var(--app-primary)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--app-white)" : "var(--app-muted-dark)"};
  font-size: 0.9rem;
  font-weight: ${({ $active }) => ($active ? 800 : 600)};
  cursor: pointer;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? "var(--app-primary-hover)" : "var(--app-accent-soft)"};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 500px) {
    min-height: 38px;
    font-size: 0.82rem;
  }
`;
