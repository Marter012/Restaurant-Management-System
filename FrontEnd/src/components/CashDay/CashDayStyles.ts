import styled from "styled-components";
import { caramelButtonStyles } from "../Utils/ButtonStyles.ts";

/* ============================================================
   CONTENEDOR GENERAL DEL CASH DAY
============================================================ */

export const CashDayContent = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
  overflow: hidden;

  @media (max-width: 1050px) {
    width: 100%;
    gap: 18px;
  }

  @media (max-width: 700px) {
    width: 100%;
    gap: 14px;
  }

  @media (max-width: 420px) {
    gap: 12px;
  }
  .summary-overlay {
    display: none;

    @media (max-width: 700px) {
      display: block;
      position: fixed;
      inset: 0;
      background: rgba(var(--app-shadow-rgb), 0.4);
      backdrop-filter: blur(1px);
      -webkit-backdrop-filter: blur(1px);
    }
  }
`;

/* ============================================================
   SUMMARY BAR
============================================================ */
export const SummaryBackdrop = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: block;

    position: fixed;
    inset: 0;


    background: rgba(var(--app-shadow-rgb), 0.28);

    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);

    cursor: pointer;
  }
`;
export const SummaryBar = styled.div`
  width: 100%;
  height: 92px;

  display: flex;
  align-items: stretch;

  position: relative;

  background: var(--app-white);

  border: 1px solid var(--app-accent-soft);

  overflow: hidden;

  margin-bottom: 0;

  box-shadow: 0 4px 14px rgba(var(--app-shadow-rgb), 0.07);

  box-sizing: border-box;
  .summary-content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
    min-width: 0;
    z-index: 10;
  }

  .summary-toggle {
    display: none;
  }

  @media (max-width: 1050px) {
    height: 92px;

    .summary-content {
      width: 100%;
    }
  }

  @media (max-width: 700px) {
    width: 100%;
    height: auto;

    display: block;

    overflow: visible;

    .summary-toggle {
      width: 100%;
      min-height: 58px;

      display: flex;
      align-items: center;

      gap: 10px;

      padding: 9px 12px;

      border: none;

      background: var(--app-white);
      color: var(--app-primary-active);

      cursor: pointer;

      box-sizing: border-box;

      text-align: left;
    }

    .summary-toggle:hover {
      background: var(--app-white);
    }

    .summary-toggle-icon {
      width: 36px;
      height: 36px;

      flex-shrink: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 9px;

      background: rgba(var(--app-shadow-rgb), 0.08);

      font-size: 18px;
      line-height: 1;
    }

    .summary-toggle-info {
      min-width: 0;
      flex: 1;
      display: flex;
      flex-direction: column;

      gap: 3px;
    }

    .summary-toggle-info strong {
      display: block;

      color: var(--app-primary);

      font-size: 13px;
      font-weight: 800;
      line-height: 1.2;
    }

    .summary-toggle-info small {
      display: block;

      min-width: 0;

      color: var(--app-muted-dark);

      font-size: 10px;
      font-weight: 500;
      line-height: 1.3;

      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .summary-toggle-arrow {
      width: 28px;
      height: 28px;

      flex-shrink: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 8px;

      background: rgba(var(--app-shadow-rgb), 0.07);

      color: var(--app-primary);

      font-size: 11px;
    }

    .summary-content {
      display: none;
    }

    &.summary-open {
      height: 58px;

      min-height: 58px;

      overflow: visible;


      .summary-content {
        width: 100%;

        height: auto;

        max-height: min(70vh, 560px);

        display: grid;

        grid-template-columns:
          minmax(0, 1fr)
          minmax(0, 1fr);

        gap: 8px;

        padding: 8px;

        box-sizing: border-box;

        position: absolute;

        top: calc(100% + 8px);

        left: 0;

        overflow-y: auto;
        overflow-x: hidden;

        background: var(--app-white);

        border: 1px solid var(--app-accent-soft);

        border-radius: 14px;

        box-shadow:
          0 16px 40px rgba(var(--app-shadow-rgb), 0.22),
          0 4px 12px rgba(var(--app-shadow-rgb), 0.08);


        scrollbar-width: thin;

        scrollbar-color: rgba(var(--app-shadow-rgb), 0.22) transparent;

        -webkit-overflow-scrolling: touch;

        overscroll-behavior: contain;
      }
    }
  }

  @media (max-width: 420px) {
    .summary-toggle {
      min-height: 54px;
      padding: 8px 10px;
    }

    .summary-toggle-icon {
      width: 33px;
      height: 33px;
      font-size: 16px;
    }

    .summary-toggle-info strong {
      font-size: 12px;
    }

    .summary-toggle-info small {
      font-size: 9px;
    }

    .summary-toggle-arrow {
      width: 26px;
      height: 26px;
    }

    &.summary-open {
      .summary-content {
        gap: 6px;
        padding: 6px;
      }
    }
  }
`;

/* ============================================================
   SUMMARY ELEMENTS
============================================================ */

export const SummaryIcon = styled.span`
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  border-radius: 10px;

  background: rgba(var(--app-shadow-rgb), 0.08);

  font-size: 19px;
  line-height: 1;

  color: var(--app-primary);
`;

export const SummaryInfo = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: center;

  gap: 5px;

  overflow: hidden;
`;

export const SummaryLabel = styled.span`
  display: block;

  max-width: 100%;

  font-weight: 800;
  font-size: 10px;
  line-height: 1;

  letter-spacing: 0.55px;

  text-transform: uppercase;

  color: var(--app-muted-dark);

  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SummaryValue = styled.strong`
  display: block;

  max-width: 100%;

  font-size: 15px;
  line-height: 1;

  color: var(--app-primary-active);

  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SummaryItem = styled.div`
  flex: 1 1 0;

  min-width: 0;

  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  padding: 10px 14px;

  box-sizing: border-box;

  white-space: nowrap;

  border-right: 1px solid rgba(var(--app-shadow-rgb), 0.08);

  transition:
    background 0.2s ease,
    filter 0.2s ease;

  &:last-child {
    border-right: none;
  }

  &:hover {
    filter: brightness(0.97);
  }

  strong {
    color: var(--app-primary-active);
  }

  background: #6eac6b;

  &.outflow {
    background-color: #f45252;
  }

  @media (max-width: 700px) {
    width: 100%;

    height: auto;

    min-height: 56px;

    padding: 8px;

    border: none;

    border-radius: 8px;

    box-sizing: border-box;

    gap: 7px;

    ${SummaryInfo} {
      width: 100%;
      min-width: 0;
    }

    ${SummaryLabel} {
      font-size: 8px;
      letter-spacing: 0.35px;
    }

    ${SummaryValue} {
      font-size: 12px;
    }
  }

  @media (max-width: 420px) {
    min-height: 52px;

    padding: 7px;

    ${SummaryLabel} {
      font-size: 7px;
    }

    ${SummaryValue} {
      font-size: 11px;
    }
  }
`;

/* ============================================================
   SUMMARY GROUP
============================================================ */

export const SummaryGrup = styled.div`
  flex: 2.5 1 0;

  min-width: 0;

  height: 100%;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  border-right: 1px solid rgba(var(--app-shadow-rgb), 0.09);
  @media (max-width: 700px) {
    width: 100%;

    height: auto;

    min-height: 0;

    grid-column: 1 / -1;

    display: flex;

    overflow: visible;

    border: none;

    border-radius: 9px;

    background: var(--app-white);
  }
`;

export const SummaryGroupTitle = styled.div`
  width: 100%;

  height: 31px;

  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 10px;

  box-sizing: border-box;

  font-weight: 800;
  font-size: 15px;

  letter-spacing: 0.65px;

  text-transform: uppercase;

  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;

  color: var(--app-white);

  background: rgba(var(--app-white-rgb), 0.55);

  border-bottom: 1px solid rgba(var(--app-shadow-rgb), 0.07);

  &.loss {
    background-color: var(--app-danger);
  }

  &.gain {
    background-color: var(--app-primary);
  }

  @media (max-width: 700px) {
    height: 30px;
    min-height: 30px;

    padding: 0 8px;

    font-size: 10px;

    letter-spacing: 0.35px;

    border-radius: 8px 8px 0 0;
  }

  @media (max-width: 420px) {
    height: 28px;
    min-height: 28px;

    font-size: 9px;
  }
`;

export const SummaryGroupItems = styled.div`
  width: 100%;

  height: calc(100% - 31px);

  display: flex;

  align-items: stretch;

  min-width: 0;

  overflow: hidden;

  ${SummaryItem} {
    flex: 1 1 0;

    min-width: 0;

    height: 100%;

    padding: 8px;

    border-right: 1px solid rgba(var(--app-shadow-rgb), 0.07);

    &:last-child {
      border-right: none;
    }
  }

  @media (max-width: 700px) {
    width: 100%;

    height: auto;

    min-height: 0;

    display: grid;

    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 1fr);

    gap: 6px;

    padding: 6px;

    box-sizing: border-box;

    overflow: visible;

    background: var(--app-white);

    border-radius: 0 0 8px 8px;

    ${SummaryItem} {
      width: 100%;

      height: auto;

      min-height: 54px;

      padding: 7px;

      border: none;

      border-radius: 7px;
    }
  }

  @media (max-width: 420px) {
    gap: 5px;

    padding: 5px;

    ${SummaryItem} {
      min-height: 50px;

      padding: 6px;
    }
  }
`;

export const SummaryDivider = styled.div`
  width: 1px;

  height: 58px;

  flex-shrink: 0;

  align-self: center;

  background: var(--app-border);

  @media (max-width: 700px) {
    display: none;
  }
`;

/* ============================================================
   SELECTOR MOBILE / TABLET
============================================================ */

export const CashMobileTabs = styled.div`
  display: none;

  @media (max-width: 1050px) {
    width: 100%;

    display: grid;

    grid-template-columns:
      minmax(0, 1fr)
      minmax(0, 1fr);

    gap: 8px;

    padding: 5px;

    box-sizing: border-box;

    background: var(--app-surface-soft);

    border: 1px solid var(--app-accent-soft);

    border-radius: 12px;
  }

  @media (max-width: 700px) {
    gap: 6px;

    padding: 4px;

    border-radius: 10px;
  }

  @media (max-width: 420px) {
    gap: 5px;
  }
`;

export const CashMobileTab = styled.button<{
  $active: boolean;
}>`
  width: 100%;

  min-height: 42px;

  border: none;

  border-radius: 9px;

  padding: 8px 12px;

  box-sizing: border-box;

  cursor: pointer;

  font-size: 13px;

  font-weight: 800;

  color: ${({ $active }) =>
    $active ? "var(--app-white)" : "var(--app-primary)"};

  background: ${({ $active }) =>
    $active ? "var(--app-primary)" : "transparent"};

  box-shadow: ${({ $active }) =>
    $active ? "0 3px 8px rgba(var(--app-shadow-rgb), 0.18)" : "none"};

  transition:
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? "var(--app-primary)" : "var(--app-surface-soft)"};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 700px) {
    min-height: 40px;

    padding: 7px 9px;

    font-size: 12px;

    border-radius: 8px;
  }

  @media (max-width: 420px) {
    min-height: 38px;

    padding: 6px 7px;

    font-size: 11px;
  }
`;

/* ============================================================
   CASH CONTENT
============================================================ */

export const CashContent = styled.div`
  width: 100%;
  display: grid;

  grid-template-columns:
    minmax(0, 2fr)
    minmax(320px, 1fr);

  /*
   * Primera fila = ocupa todo el espacio disponible
   * Segunda fila = ocupa solamente lo que necesita
   */
  grid-template-rows: minmax(0, 1fr) auto;

  gap: 24px;

  /*
   * ESTA es la altura que controla todo el contenido.
   * Podés cambiar 80% por 75%, 70%, etc.
   */
  min-height: 0;
  height: 80%;

  box-sizing: border-box;

  /*
   * El padre NO hace scroll.
   */
  overflow: hidden;

  .cash-sales,
  .cash-movements {
    min-width: 0;
    min-height: 0;


    /*
     * Ocupan exactamente el espacio que
     * les asigna el grid.
     */
    height: 100%;

    /*
     * Importante: permite que el contenido
     * pueda achicarse junto con el grid.
     */
    overflow: hidden;
  }

  .cash-mobile-hidden {
    display: block;
  }

  /*
   * Cash close ocupa su propia fila
   * y no modifica la altura de la primera.
   */
  .cash-close {
    grid-column: 1 / -1;

    min-height: 0;
  }

  /* =========================
     TABLET
     ========================= */

  @media (max-width: 1050px) {
    width: 100%;

    display: flex;
    flex-direction: column;

    align-items: stretch;

    gap: 18px;

    overflow: visible;

    position: relative;

    .cash-mobile-hidden {
      display: none;
    }

    .cash-mobile-active {
      display: block;
    }

    .cash-movements,
    .cash-sales {
      height: 80%;
    }

    .cash-close {
      order: 3;
      width: 100%;
    }
  }

  /* =========================
     MOBILE
     ========================= */

  @media (max-width: 700px) {
    width: 100%;

    display: flex;
    flex-direction: column;

    align-items: stretch;

    gap: 14px;

    overflow: visible;

    position: relative;

    .cash-close {
      width: 100%;
    }
  }

  @media (max-width: 420px) {
    gap: 12px;
  }
`;

/* ============================================================
   SALES CONTAINER
============================================================ */

export const SalesContainer = styled.div`
  width: 100%;
  min-width: 0;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;

  /* =========================
     DESKTOP
     ========================= */

  height: 100%;

  min-height: 0;
`;

/* ============================================================
   OPEN CASH
============================================================ */

export const OpenCashContainer = styled.div`
  width: min(560px, 100%);

  padding: 42px 48px;

  display: flex;

  flex-direction: column;

  align-items: center;

  text-align: center;

  background: var(--app-white);

  border: 1px solid var(--app-surface-soft);

  border-radius: 18px;

  box-shadow: 0 8px 24px rgba(var(--app-shadow-rgb), 0.07);

  box-sizing: border-box;

  transition: all 0.2s ease;

  &:hover {
    border-color: rgba(var(--app-accent-rgb), 0.7);

    box-shadow: 0 10px 28px rgba(var(--app-shadow-rgb), 0.1);

    transform: translateY(-2px);
  }

  h2 {
    margin: 0 0 10px;

    color: var(--app-primary);

    font-size: 22px;

    font-weight: 700;

    line-height: 1.3;
  }

  h3 {
    margin: 0 0 8px;

    color: var(--app-accent);

    font-size: 17px;

    font-weight: 600;
  }

  p {
    max-width: 420px;

    margin: 0 0 8px;

    color: var(--app-primary);

    font-size: 15px;

    font-weight: 500;

    line-height: 1.5;
  }

  p:last-of-type {
    margin-bottom: 22px;
  }

  strong {
    color: var(--app-primary);

    font-weight: 700;
  }

  svg {
    width: 58px;
    height: 58px;

    padding: 15px;

    margin-bottom: 22px;

    color: var(--app-primary);

    background: rgba(var(--app-accent-rgb), 0.16);

    border-radius: 50%;
  }

  @media (max-width: 600px) {
    width: 100%;

    padding: 30px 22px;

    border-radius: 15px;

    h2 {
      font-size: 20px;
    }

    h3 {
      font-size: 16px;
    }

    p {
      font-size: 14px;
    }

    svg {
      width: 50px;
      height: 50px;

      padding: 13px;

      margin-bottom: 18px;
    }
  }

  @media (max-width: 420px) {
    padding: 25px 16px;

    h2 {
      font-size: 18px;
    }

    h3 {
      font-size: 15px;
    }

    p {
      font-size: 13px;
    }
  }
`;

export const OpenCashButton = styled.button`
  display: inline-flex;

  align-items: center;
  justify-content: center;

  min-width: 150px;

  border: none;

  border-radius: 10px;

  padding: 11px 22px;

  cursor: pointer;

  background: var(--app-primary);

  color: var(--app-white);

  font-size: 14px;

  font-weight: 600;

  box-shadow: 0 4px 10px rgba(var(--app-shadow-rgb), 0.18);

  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: var(--app-primary-active);

    box-shadow: 0 6px 14px rgba(var(--app-shadow-rgb), 0.22);

    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);

    box-shadow: 0 3px 7px rgba(var(--app-shadow-rgb), 0.16);
  }

  &:focus-visible {
    outline: 3px solid rgba(var(--app-accent-rgb), 0.35);

    outline-offset: 2px;
  }

  @media (max-width: 420px) {
    width: 100%;

    min-width: 0;
  }
`;

/* ============================================================
   CLOSE CASH
============================================================ */

export const CloseCashButton = styled.button`
  border: 1px solid var(--app-surface-soft);

  border-radius: 9px;

  padding: 9px 15px;

  font-weight: 800;

  color: var(--app-white);

  cursor: pointer;

  font-size: 13px;

  background: var(--app-danger);

  white-space: nowrap;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: var(--app-danger);

    border-color: var(--app-border);

    color: var(--app-muted-dark);
  }

  @media (max-width: 1050px) {
    align-self: flex-start;
  }

  @media (max-width: 700px) {
    width: 100%;

    min-height: 42px;

    padding: 10px 15px;
  }
`;

/* ============================================================
   DETALLE DE VENTA
============================================================ */

export const SaleDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0;
  height: 100%;
  color: var(--app-primary);

  .containerInfo {
    width: 100%;
    height: 80%;
    overflow-y: auto;
    scrollbar-width: none;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  @media (max-width: 480px) {
    gap: 15px;
  }
`;

export const SaleCustomer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--app-surface-soft);
  border: 1px solid var(--app-accent-soft);
  border-radius: 12px;
`;

export const SaleCustomerAvatar = styled.div`
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--app-primary);
  color: var(--app-white);
  font-size: 20px;
  font-weight: 700;
`;

export const SaleCustomerInfo = styled.div`
  min-width: 0;

  strong {
    display: block;
    font-size: 16px;
    overflow-wrap: anywhere;
  }
`;

export const SaleEyebrow = styled.small`
  display: block;
  margin-bottom: 7px;
  color: var(--app-muted-dark);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.45px;
  text-transform: uppercase;
`;

export const SaleSectionTitle = styled.h3`
  margin: 0 0 12px;
  color: var(--app-primary);
  font-size: 15px;
  font-weight: 800;
`;

export const SaleItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SaleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  background: var(--app-white);
  border: 1px solid var(--app-surface-soft);
  border-radius: 10px;

  @media (max-width: 420px) {
    padding: 11px;
  }
`;

export const SaleItemInfo = styled.div`
  min-width: 0;

  strong {
    display: block;
    font-size: 14px;
    overflow-wrap: anywhere;
  }

  small {
    display: block;
    margin-top: 4px;
    color: var(--app-muted-dark);
    font-size: 12px;
  }
`;

export const SaleItemPrice = styled.strong`
  color: var(--app-primary);
  white-space: nowrap;
  font-size: 14px;
`;

export const SaleTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 18px;
  border-radius: 12px;
  background: var(--app-primary);
  color: var(--app-white);

  span {
    font-size: 15px;
    font-weight: 600;
  }

  strong {
    font-size: 24px;
    white-space: nowrap;
  }

  @media (max-width: 420px) {
    padding: 14px;

    span {
      font-size: 13px;
    }

    strong {
      font-size: 20px;
    }
  }
`;

export const SalePaymentInfo = styled.div`
  padding: 14px 16px;
  background: var(--app-surface-soft);
  border: 1px solid var(--app-accent-soft);
  border-radius: 12px;
`;

export const SalePaymentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  span {
    font-size: 14px;
  }
`;

export const SalePaymentStatus = styled.span<{ $status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  background: ${({ $status }) =>
    $status === "paid"
      ? "var(--app-surface-soft)"
      : $status === "pending"
        ? "var(--app-surface-soft)"
        : "var(--app-danger-soft)"};
  color: ${({ $status }) =>
    $status === "paid"
      ? "var(--app-primary)"
      : $status === "pending"
        ? "var(--app-primary-active)"
        : "var(--app-danger)"};
  font-size: 12px;
  font-weight: 700;
`;

export const EditOrderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 46px;
  padding: 12px 18px;
  border: 1px solid var(--app-primary);
  border-radius: 10px;
  background: var(--app-primary);
  color: var(--app-white);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(var(--app-shadow-rgb), 0.16);
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: var(--app-primary-active);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid rgba(var(--app-accent-rgb), 0.4);
    outline-offset: 2px;
  }

  ${caramelButtonStyles}
`;

/* ============================================================
   FORMULARIO PARA EDITAR MOVIMIENTOS MANUALES
============================================================ */

export const EditMovementForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  min-width: 0;
  color: var(--app-primary);
`;

export const EditMovementField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  label {
    color: var(--app-primary);
    font-size: 13px;
    font-weight: 700;
  }
`;

export const EditMovementInput = styled.input`
  width: 100%;
  min-height: 44px;
  box-sizing: border-box;
  padding: 11px 13px;
  border: 1px solid var(--app-accent-soft);
  border-radius: 10px;
  background: var(--app-white);
  color: var(--app-primary);
  font: inherit;
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: var(--app-accent);
    box-shadow: 0 0 0 3px rgba(var(--app-accent-rgb), 0.2);
  }

  &::placeholder {
    color: var(--app-muted-dark);
  }
`;

export const EditMovementActions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;

  @media (max-width: 480px) {
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
`;

export const EditMovementCancelButton = styled.button`
  min-height: 42px;
  padding: 10px 16px;
  border: 1px solid var(--app-accent-soft);
  border-radius: 10px;
  background: var(--app-white);
  color: var(--app-primary);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--app-surface-soft);
    border-color: var(--app-accent);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const EditMovementSaveButton = styled.button`
  min-height: 42px;
  padding: 10px 18px;
  border: 1px solid var(--app-primary);
  border-radius: 10px;
  background: var(--app-primary);
  color: var(--app-white);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(var(--app-shadow-rgb), 0.15);
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--app-primary-active);
    box-shadow: 0 6px 14px rgba(var(--app-shadow-rgb), 0.2);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }
`;
