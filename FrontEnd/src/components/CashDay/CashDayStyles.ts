import styled from "styled-components";
import { caramelButtonStyles } from "../Utils/ButtonStyles.ts";

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
      background: var(--modal-overlay);
      backdrop-filter: blur(1px);
      -webkit-backdrop-filter: blur(1px);
    }
  }
`;

export const SummaryBackdrop = styled.div`
  display: none;
  @media (max-width: 700px) {
    display: block;

    position: fixed;
    inset: 0;

    background: var(--modal-overlay);

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

  background: var(--color-white);

  border: 1px solid var(--color-primary-soft);

  overflow: hidden;

  margin-bottom: 0;

  box-shadow: var(--shadow-sm);

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

      background: var(--color-white);
      color: var(--color-primary-hover);

      cursor: pointer;

      box-sizing: border-box;

      text-align: left;
    }

    .summary-toggle:hover {
      background: var(--color-white);
    }

    .summary-toggle-icon {
      width: 36px;
      height: 36px;

      flex-shrink: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 9px;

      background: var(--color-surface-muted);

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

      color: var(--color-primary);

      font-size: 13px;
      font-weight: 800;
      line-height: 1.2;
    }

    .summary-toggle-info small {
      display: block;

      min-width: 0;

      color: var(--color-text-secondary);

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

      background: var(--color-surface-muted);

      color: var(--color-primary);

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

        background: var(--color-white);

        border: 1px solid var(--color-primary-soft);

        border-radius: 14px;

        box-shadow: var(--shadow-lg);

        scrollbar-width: thin;

        scrollbar-color: var(--color-border-strong) transparent;

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

  background: var(--color-surface-muted);

  font-size: 19px;
  line-height: 1;

  color: var(--color-primary);
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

  color: var(--color-text-secondary);

  white-space: nowrap;

  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SummaryValue = styled.strong`
  display: block;

  max-width: 100%;

  font-size: 15px;
  line-height: 1;

  color: var(--color-primary-hover);

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

  border-right: 1px solid var(--color-surface-muted);

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
    color: var(--color-primary-hover);
  }

  background: var(--color-success);

  &.outflow {
    background-color: var(--color-danger);
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

  border-right: 1px solid var(--color-border);
  @media (max-width: 700px) {
    width: 100%;

    height: auto;

    min-height: 0;

    grid-column: 1 / -1;

    display: flex;

    overflow: visible;

    border: none;

    border-radius: 9px;

    background: var(--color-white);
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

  color: var(--color-white);

  background: var(--color-surface);

  border-bottom: 1px solid var(--color-surface-muted);

  &.loss {
    background-color: var(--color-danger);
  }

  &.gain {
    background-color: var(--color-primary);
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

    border-right: 1px solid var(--color-surface-muted);

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

    background: var(--color-white);

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

  background: var(--color-border);

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

    background: var(--color-surface-hover);

    border: 1px solid var(--color-primary-soft);

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
    $active ? "var(--color-white)" : "var(--color-primary)"};

  background: ${({ $active }) =>
    $active ? "var(--color-primary)" : "transparent"};

  box-shadow: ${({ $active }) =>
    $active ? "0 3px 8px var(--shadow-md)" : "none"};

  transition:
    background 0.2s ease,
    color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: ${({ $active }) =>
      $active ? "var(--color-primary)" : "var(--color-surface-hover)"};
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

export const OpenCashContainer = styled.section`
  position: relative;
  width: 100%;
  min-height: 190px;
  padding: 28px 24px 28px 150px;

  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  grid-template-rows: auto 1fr;
  align-items: center;
  column-gap: 32px;
  row-gap: 12px;

  background: var(--color-white);
  border: 1px solid var(--color-accent);
  border-left: 6px solid var(--color-accent);
  border-radius: 18px;

  box-shadow: 0 10px 25px var(--shadow-sm);

  /* Icono de advertencia */
  &::before {
    content: "!";
    position: absolute;
    left: 40px;
    top: 50%;
    transform: translateY(-50%);

    width: 76px;
    height: 76px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--color-primary-soft);
    color: var(--color-primary);

    border-radius: 18px;
    font-size: 42px;
    font-weight: 800;
  }

  /* Separador vertical */
  &::after {
    content: "";
    position: absolute;
    left: 126px;
    top: 18%;
    bottom: 18%;
    width: 2px;
    background: var(--color-border-strong);
  }

  h2 {
    grid-column: 1;
    grid-row: 1;

    margin: 0;
    color: var(--color-primary);

    font-size: clamp(17px, 1.5vw, 23px);
    font-weight: 750;
    line-height: 1.4;
  }

  p {
    grid-column: 1;
    grid-row: 2;

    margin: 0;
    color: var(--color-text);

    font-size: clamp(14px, 1.15vw, 18px);
    line-height: 1.6;
  }

  @media (max-width: 900px) {
    padding: 24px 22px 24px 115px;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 12px;

    &::before {
      left: 22px;
      width: 66px;
      height: 66px;
      font-size: 36px;
    }

    &::after {
      left: 100px;
    }

    h2,
    p {
      grid-column: 1;
    }

    h2 {
      grid-row: 1;
    }

    p {
      grid-row: 2;
    }
  }

  @media (max-width: 600px) {
    padding: 22px 18px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;

    &::before,
    &::after {
      display: none;
    }

    h2 {
      font-size: 19px;
      line-height: 1.4;
    }

    p {
      font-size: 14px;
      line-height: 1.6;
    }
  }
`;

export const OpenCashButton = styled.button`
  grid-column: 2;
  grid-row: 1 / 3;

  min-width: 210px;
  min-height: 58px;
  padding: 15px 25px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  border: none;
  border-radius: 13px;

  background: linear-gradient(
    110deg,
    var(--color-accent),
    var(--color-primary)
  );

  color: var(--color-white);

  font-size: 16px;
  font-weight: 700;

  cursor: pointer;

  box-shadow: 0 6px 15px var(--shadow-md);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    filter 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.08);
    box-shadow: 0 9px 20px var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid var(--color-accent);
    outline-offset: 3px;
  }

  @media (max-width: 900px) {
    grid-column: 1;
    grid-row: 3;
    width: 100%;
    min-height: 52px;
  }

  @media (max-width: 600px) {
    min-width: 100%;
    margin-top: 5px;
  }
`;

/* ============================================================
   CLOSE CASH
============================================================ */

export const CloseCashButton = styled.button`
  border: 1px solid var(--color-surface-hover);

  border-radius: 9px;

  padding: 9px 15px;

  font-weight: 800;

  color: var(--color-white);

  cursor: pointer;

  font-size: 13px;

  background: var(--color-danger);

  white-space: nowrap;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: var(--color-danger);

    border-color: var(--color-border);

    color: var(--color-text-secondary);
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
  color: var(--color-primary);

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
  background: var(--color-surface-hover);
  border: 1px solid var(--color-primary-soft);
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
  background: var(--color-primary);
  color: var(--color-white);
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
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.45px;
  text-transform: uppercase;
`;

export const SaleSectionTitle = styled.h3`
  margin: 0 0 12px;
  color: var(--color-primary);
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
  background: var(--color-white);
  border: 1px solid var(--color-surface-hover);
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
    color: var(--color-text-secondary);
    font-size: 12px;
  }
`;

export const SaleItemPrice = styled.strong`
  color: var(--color-primary);
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
  background: var(--color-primary);
  color: var(--color-white);

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
  border: 1px solid var(--color-primary-soft);
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
      ? "var(--color-success-soft)"
      : $status === "pending"
        ? "var(--color-pending)"
        : $status === "partially_paid"
          ? "var(--color-pending)"
          : $status === "cancelled"
            ? "var(--color-danger-soft)"
            : "var(--color-pending)"};

  color: ${({ $status }) =>
    $status === "paid"
      ? "var(--color-success)"
      : $status === "cancelled"
        ? "var(--color-danger)"
        : "var(--color-text)"};

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
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus-visible {
    outline: 3px solid var(--color-primary-soft);
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
  color: var(--color-primary);
`;

export const EditMovementField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  label {
    color: var(--color-primary);
    font-size: 13px;
    font-weight: 700;
  }
`;

export const EditMovementInput = styled.input`
  width: 100%;
  min-height: 44px;
  box-sizing: border-box;
  padding: 11px 13px;
  border: 1px solid var(--color-primary-soft);
  border-radius: 10px;
  background: var(--color-white);
  color: var(--color-primary);
  font: inherit;
  font-size: 14px;
  outline: none;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }

  &::placeholder {
    color: var(--color-text-secondary);
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

export const EditMovementSaveButton = styled.button`
  min-height: 42px;
  padding: 10px 18px;
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease;

  &:hover:not(:disabled) {
    background: var(--color-primary-hover);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    transform: none;
  }
`;

/* ============================================================
   DASHBOARD DE CAJA
============================================================ */
export const CashDashboard = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: var(--color-primary);
`;

export const CashDashboardHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  flex-wrap: wrap;
  .eyebrow {
    display: block;
    color: var(--color-text-secondary);
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 1px;
  }
  h2 {
    margin: 3px 0 4px;
    color: var(--color-primary);
    font-size: 28px;
    font-weight: 800;
  }
  p {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: 13px;
  }
`;

export const CashDashboardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;
  flex-wrap: wrap;
  button {
    min-height: 42px;
    padding: 9px 14px;
    border: 1px solid var(--color-primary-soft);
    border-radius: 10px;
    background: var(--color-white);
    color: var(--color-primary);
    font-weight: 700;
    font-size: 12px;
    cursor: pointer;
  }
  button:hover {
    background: var(--color-surface-hover);
  }
  @media (max-width: 1300px) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
    width: 100%;
    flex-wrap: wrap;
  }
`;

export const CashDashboardCloseButton = styled.button`
  min-height: 42px;
  padding: 9px 17px;
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  &:hover {
    background: var(--color-primary-hover);
  }
`;

export const CashStatusBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  padding: 17px 20px;
  border: 1px solid var(--color-primary-soft);
  border-radius: 14px;
  background: var(--color-white);
  .status-main,
  .status-meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .status-main strong {
    display: block;
    font-size: 17px;
    color: var(--color-primary);
  }
  .status-main span:not(.status-dot) {
    display: block;
    margin-top: 4px;
    font-size: 12px;
    color: var(--color-text-secondary);
  }
  .status-dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .status-dot.open {
    background: var(--color-success);
    box-shadow: 0 0 0 4px var(--color-success-soft);
  }
  .status-dot.closed {
    background: var(--color-danger);
  }
  .status-meta {
    font-size: 12px;
    color: var(--color-text-secondary);
  }
  .status-meta strong {
    color: var(--color-primary);
    font-size: 13px;
  }
  .status-meta i {
    height: 28px;
    width: 1px;
    background: var(--color-primary-soft);
    margin: 0 5px;
  }
`;

export const CashMetricGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  @media (max-width: 1050px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const CashMetricCard = styled.article<{
  $tone: "balance" | "income" | "expense" | "sales";
}>`
  display: flex;
  align-items: center;
  gap: 13px;
  min-width: 0;
  padding: 17px 15px;
  border: 1px solid var(--color-primary-soft);
  border-radius: 13px;
  background: var(--color-white);
  .metric-icon {
    width: 46px;
    height: 46px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 23px;
    font-weight: 800;
    background: ${({ $tone }) =>
      $tone === "income"
        ? "var(--color-surface-hover)"
        : $tone === "expense"
          ? "var(--color-danger-soft)"
          : "var(--color-primary-soft)"};
    color: ${({ $tone }) =>
      $tone === "expense" ? "var(--color-danger)" : "var(--color-primary)"};
  }
  div {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  small {
    color: var(--color-text-secondary);
    font-size: 11px;
    font-weight: 700;
  }
  strong {
    color: var(--color-primary);
    font-size: clamp(17px, 1.7vw, 23px);
    line-height: 1.1;
    white-space: nowrap;
  }
  div > span {
    color: var(--color-text-secondary);
    font-size: 10px;
  }
`;

export const CashDashboardGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(280px, 1fr);
  gap: 14px;
  align-items: stretch;
  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;

export const CashDashboardPanel = styled.section`
  min-width: 0;
  padding: 17px;
  border: 1px solid var(--color-primary-soft);
  border-radius: 14px;
  background: var(--color-white);
  .panel-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 14px;
  }
  h3 {
    margin: 0;
    color: var(--color-primary);
    font-size: 17px;
    font-weight: 800;
  }
  p {
    margin: 4px 0 0;
    color: var(--color-text-secondary);
    font-size: 11px;
  }
  .count {
    padding: 6px 9px;
    border-radius: 20px;
    background: var(--color-surface-hover);
    color: var(--color-primary);
    font-size: 10px;
    font-weight: 700;
    white-space: nowrap;
  }
`;

export const CashDashboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  th {
    padding: 10px 8px;
    text-align: left;
    color: var(--color-text-secondary);
    background: var(--color-surface-hover);
    font-size: 10px;
    white-space: nowrap;
  }
  td {
    padding: 12px 8px;
    border-bottom: 1px solid var(--color-primary-soft);
    color: var(--color-primary);
  }
  tbody tr {
    cursor: pointer;
  }
  tbody tr:hover {
    background: var(--color-surface-hover);
  }
  td:last-child {
    text-align: right;
    font-weight: 800;
    white-space: nowrap;
  }
  .positive {
    color: var(--color-primary);
  }
  .negative {
    color: var(--color-danger);
  }
  .movement-badge {
    display: inline-block;
    padding: 5px 8px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 800;
    white-space: nowrap;
  }
  .movement-badge.income {
    background: var(--color-surface-hover);
    color: var(--color-primary);
  }
  .movement-badge.expense {
    background: var(--color-danger-soft);
    color: var(--color-danger);
  }
  .empty {
    padding: 25px;
    text-align: center;
    color: var(--color-text-secondary);
  }
  @media (max-width: 650px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

export const CashPaymentBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 19px;
  padding-top: 5px;
  .payment-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .payment-label {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
    color: var(--color-primary);
  }
  .payment-label strong {
    font-weight: 750;
  }
  .payment-label span {
    white-space: nowrap;
    font-weight: 800;
  }
  .payment-label small {
    color: var(--color-text-secondary);
    font-weight: 500;
  }
`;

export const CashPaymentBar = styled.div<{ $percent: number }>`
  width: 100%;
  height: 9px;
  border-radius: 20px;
  overflow: hidden;
  background: var(--color-surface-hover);
  span {
    display: block;
    width: ${({ $percent }) => `${$percent}%`};
    height: 100%;
    border-radius: inherit;
    background: var(--color-accent);
  }
`;

export const CashPreviousClose = styled.section`
  padding: 17px 20px;
  border: 1px solid var(--color-primary-soft);
  border-radius: 14px;
  background: var(--color-white);
  .previous-heading,
  .previous-heading > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  .previous-heading > div {
    justify-content: flex-start;
  }
  .check-icon {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border: 2px solid var(--color-primary);
    border-radius: 50%;
    font-size: 21px;
    font-weight: 800;
  }
  h3 {
    margin: 0;
    color: var(--color-primary);
    font-size: 17px;
  }
  p {
    margin: 4px 0 0;
    color: var(--color-text-secondary);
    font-size: 11px;
  }
  .closed-pill {
    padding: 8px 12px;
    border-radius: 20px;
    background: var(--color-surface-hover);
    color: var(--color-primary);
    font-size: 11px;
    font-weight: 800;
  }
  .previous-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 14px;
    margin-top: 18px;
    padding-top: 15px;
    border-top: 1px solid var(--color-primary-soft);
  }
  .previous-grid div {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .previous-grid small,
  .no-previous {
    color: var(--color-text-secondary);
    font-size: 11px;
  }
  .previous-grid strong {
    color: var(--color-primary);
    font-size: 15px;
  }
  .no-previous {
    margin: 16px 0 0;
  }
  @media (max-width: 650px) {
    .previous-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .previous-heading {
      align-items: flex-start;
    }
  }
`;

/* ============================================================
   OBSERVACIONES DE LA VENTA
============================================================ */

export const SaleObservations = styled.div`
  padding: 14px 16px;
  background: var(--color-surface-hover);
  border: 1px solid var(--color-primary-soft);
  border-radius: 12px;

  p {
    margin: 0;
    color: var(--color-primary);
    font-size: 0.88rem;
    line-height: 1.6;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
  }
`;
