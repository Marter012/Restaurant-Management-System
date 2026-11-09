import styled from "styled-components";
import { TableRow } from "../Tables/ListTableStyles.ts";

// =========================================================
// CONTENEDOR DE COMANDAS
// =========================================================

export const ContainerManageOrders = styled.div`
  width: 100%;
  min-width: 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 16px;

  box-sizing: border-box;

  .orders-filters {
    width: 100%;
    min-width: 0;

    display: flex;
    align-items: center;
    gap: 12px;

    box-sizing: border-box;
  }

  /* =====================================================
     BUSCADOR
  ===================================================== */

  .search-box {
    flex: 1 1 250px;
    min-width: 180px;
    height: 43px;

    display: flex;
    align-items: center;
    gap: 10px;

    padding: 0 14px;

    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);

    color: var(--color-text-secondary);

    transition:
      border-color var(--transition-normal),
      box-shadow var(--transition-normal);

    &:focus-within {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px var(--color-primary-soft);
    }

    svg {
      width: 17px;
      height: 17px;
      flex-shrink: 0;
    }

    input {
      width: 100%;
      min-width: 0;
      height: 100%;

      border: 0;
      outline: 0;

      background: transparent;
      color: var(--color-text);

      font-size: 13px;

      &::placeholder {
        color: var(--color-text-secondary);
      }
    }
  }

  /* =====================================================
     FILTRO DE ESTADO
  ===================================================== */

  .select-filter {
    flex: 0 1 235px;
    min-width: 160px;

    display: flex;
    flex-direction: column;
    gap: 4px;

    position: relative;

    span {
      position: absolute;
      top: -5px;
      left: 0;

      width: 100%;

      text-align: center;

      color: var(--color-text-secondary);
      font-size: 11px;
      font-weight: 750;

      background-color: var(--color-background);
    }

    select {
      width: 100%;
      height: 43px;

      padding: 0 12px;

      border: 1px solid var(--color-border);
      border-radius: var(--radius-sm);

      background: var(--color-surface);
      color: var(--color-text);

      font-size: 13px;
      font-weight: 650;

      outline: none;
      cursor: pointer;

      &:focus {
        border-color: var(--color-accent);
      }
    }
  }

  /* =====================================================
     NUEVA COMANDA
  ===================================================== */

  .create-order-button {
    flex: 0 0 auto;
    min-height: 43px;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;

    padding: 0 17px;

    border: 1px solid var(--color-primary);
    border-radius: var(--radius-sm);

    background: var(--color-primary);
    color: var(--color-white);

    font-size: 13px;
    font-weight: 800;

    white-space: nowrap;
    cursor: pointer;

    transition:
      background var(--transition-normal),
      transform var(--transition-normal),
      box-shadow var(--transition-normal);

    &:hover {
      background: var(--color-primary-hover);
      box-shadow: var(--shadow-sm);
    }

    &:active {
      transform: translateY(1px);
    }

    svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }
  }

  /* =====================================================
     TABLA DE COMANDAS
  ===================================================== */

  .table-scroll {
    width: 100%;
    min-width: 0;
    max-width: 100%;

    overflow-x: auto;
    overflow-y: hidden;

    scrollbar-width: thin;
  }

  /* ESCRITORIO */

  .table-scroll > div:first-child {
    grid-template-columns: repeat(7, minmax(120px, 1fr));

    width: 100%;
    min-width: 100%;

    h4:nth-child(3),
    h4:nth-child(7) {
      display: none;
    }
  }

  .table-scroll > div:last-child > div:has(.order-number) {
    grid-template-columns: repeat(7, minmax(120px, 1fr));

    width: 100%;
    min-width: 100%;

    & > :nth-child(3),
    & > :nth-child(7) {
      display: none;
    }

    & > * {
      min-width: 0;
    }

    .customer,
    .payment-pill,
    .payment-status,
    .order-status,
    .total {
      white-space: normal;
      overflow-wrap: anywhere;
    }
    .payment-pill,
    .payment-status {
      width: 80%;
      display: flex;
      justify-content: center;
    }
  }

  /* =====================================================
     PANTALLAS MEDIANAS
  ===================================================== */

  @media (max-width: 1300px) {
    gap: 14px;

    .table-scroll > div:first-child {
      grid-template-columns: repeat(6, minmax(115px, 1fr));

      h4:nth-child(5) {
        display: none;
      }
    }

    .table-scroll > div:last-child > div:has(.order-number) {
      grid-template-columns: repeat(6, minmax(115px, 1fr));

      & > :nth-child(5) {
        display: none;
      }
    }
  }

  @media (max-width: 1200px) {
    .orders-filters {
      gap: 9px;
    }

    .search-box {
      flex: 1 1 180px;
    }

    .select-filter {
      flex: 0 1 190px;
    }

    .create-order-button {
      padding: 0 13px;
      font-size: 12px;
    }

    .table-scroll > div:first-child {
      grid-template-columns: repeat(5, minmax(110px, 1fr));

      gap: 7px;
      padding: 11px 9px;

      h4:nth-child(3),
      h4:nth-child(5),
      h4:nth-child(7),
      h4:nth-child(8) {
        display: none;
      }
    }

    .table-scroll > div:last-child > div:has(.order-number) {
      grid-template-columns: repeat(5, minmax(110px, 1fr));

      gap: 7px;
      padding: 11px 9px;

      & > :nth-child(3),
      & > :nth-child(5),
      & > :nth-child(7),
      & > :nth-child(8) {
        display: none;
      }
    }
  }

  /* =====================================================
     TABLETS
  ===================================================== */

  @media (max-width: 850px) {
    gap: 13px;

    .orders-filters {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(130px, 0.7fr);
      gap: 10px;
    }

    .search-box {
      width: 100%;
      min-width: 0;
    }

    .select-filter {
      width: 100%;
      min-width: 0;
    }

    .create-order-button {
      grid-column: 1 / -1;
      width: 100%;
    }

    .table-scroll > div:first-child {
      grid-template-columns: repeat(3, minmax(115px, 1fr));

      h4:nth-child(2),
      h4:nth-child(3),
      h4:nth-child(5),
      h4:nth-child(6),
      h4:nth-child(7),
      h4:nth-child(8) {
        display: none;
      }
    }

    .table-scroll > div:last-child > div:has(.order-number) {
      grid-template-columns: repeat(3, minmax(115px, 1fr));

      & > :nth-child(2),
      & > :nth-child(3),
      & > :nth-child(5),
      & > :nth-child(6),
      & > :nth-child(7),
      & > :nth-child(8) {
        display: none;
      }
    }
  }

  /* =====================================================
     CELULARES
  ===================================================== */

  @media (max-width: 600px) {
    gap: 11px;

    .table-scroll > div:first-child {
      grid-template-columns: repeat(3, minmax(95px, 1fr));

      gap: 5px;
      padding: 10px 8px;
    }

    .table-scroll > div:last-child > div:has(.order-number) {
      grid-template-columns: repeat(3, minmax(95px, 1fr));

      gap: 5px;
      padding: 10px 8px;

      & > * {
        font-size: 12px;
      }
    }
  }

  /* =====================================================
     CELULARES PEQUEÑOS
  ===================================================== */

  @media (max-width: 380px) {
    gap: 9px;

    .orders-filters {
      gap: 8px;
    }

    .search-box,
    .select-filter select {
      height: 39px;
      font-size: 12px;
    }

    .create-order-button {
      min-height: 40px;
      font-size: 12px;
    }

    .table-scroll > div:first-child {
      grid-template-columns: repeat(3, minmax(85px, 1fr));

      gap: 4px;
      padding: 9px 6px;
    }

    .table-scroll > div:last-child > div:has(.order-number) {
      grid-template-columns: repeat(3, minmax(85px, 1fr));

      gap: 4px;
      padding: 9px 6px;
    }
  }
`;

export const EmptyMessage = styled.div`
  width: 100%;
  min-height: 150px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 25px;

  color: var(--color-text-secondary);

  font-size: 13px;
  font-weight: 600;

  text-align: center;
  box-sizing: border-box;

  @media (max-width: 600px) {
    min-height: 120px;
    padding: 18px;
    font-size: 12px;
  }
`;

// =========================================================
// FILA DE COMANDAS
// =========================================================

export const OrdersTableRow = styled(TableRow)`
  min-height: 62px;

  margin: 0;
  padding: 11px 16px;

  border: 0;
  border-bottom: 1px solid var(--color-border);
  border-radius: 0;

  background: var(--color-surface);
  color: var(--color-text);

  box-shadow: none;
  cursor: pointer;

  &:hover {
    background: var(--color-surface-hover);
    border-color: var(--color-border);
    box-shadow: none;
  }

  &:last-child {
    border-bottom: 0;
  }

  .order-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: fit-content;

    padding: 6px 11px;

    border-radius: 20px;

    background: var(--color-surface-hover);
    color: var(--color-primary);

    font-size: 12px;
    font-weight: 850;

    white-space: nowrap;
  }

  .customer {
    color: var(--color-text);
    font-weight: 700;
  }

  .product-lines {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 3px;

    min-width: 0;

    span {
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      color: var(--color-text-secondary);
      font-size: 12px;
    }

    small {
      color: var(--color-text-light);
      font-size: 11px;
      font-weight: 700;
    }
  }

  .total {
    color: var(--color-primary);
    font-weight: 850;
  }

  .payment-pill {
    display: inline-flex;
    align-items: center;

    max-width: 100%;
    width: fit-content;

    padding: 6px 10px;

    border: 1px solid var(--color-border);
    border-radius: 999px;

    background: var(--color-surface-hover);
    color: var(--color-text-secondary);

    font-size: 11px;
    font-weight: 750;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  // Estados de pago

  .payment-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    max-width: 100%;

    padding: 6px 10px;

    border: 1px solid transparent;
    border-radius: 999px;

    font-size: 11px;
    font-weight: 850;
    line-height: 1.25;

    white-space: nowrap;
  }

  .payment-status.paid {
    background: var(--color-success-soft);
    border-color: var(--color-success);
    color: var(--color-success);
  }

  .payment-status.pending {
    background: var(--color-pending-soft);
    border-color: var(--color-accent);
    color: var(--color-accent);
  }

  .payment-status.partially_paid {
    background: var(--color-pending-soft);
    border-color: var(--color-pending);
    color: var(--color-pending);
  }

  .payment-status.cancelled {
    background: var(--color-danger-soft);
    border-color: var(--color-danger);
    color: var(--color-danger);
  }

  .payment-status.unknown {
    background: var(--color-surface-hover);
    border-color: var(--color-border);
    color: var(--color-text-light);
  }

  // Estado de la comanda, independiente del pago.

  .order-status {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    max-width: 100%;

    padding: 6px 10px;

    border-radius: 999px;

    font-size: 11px;
    font-weight: 800;

    white-space: nowrap;
  }

  .order-status.active {
    background: var(--color-success-soft);
    color: var(--color-success);
  }

  .order-status.inactive {
    background: var(--color-danger-soft);
    color: var(--color-danger);
  }

  .actions {
    justify-content: center;
  }

  @media (max-width: 850px) {
    gap: 10px;
    padding: 12px;
  }

  @media (max-width: 600px) {
    gap: 8px;
    padding: 11px 9px;
  }
`;