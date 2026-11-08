import styled from "styled-components";
import { caramelButtonStyles } from "../Utils/ButtonStyles.ts";

// =========================================================
// CONTENEDOR GENERAL
// =========================================================

export const CardTable = styled.div`
  width: 100%;
  min-width: 0;
  height: 100%;

  display: flex;
  flex-direction: column;

  overflow: hidden;

  background: var(--app-surface);
  border: 1px solid var(--app-border);
  border-radius: 14px;

  box-shadow: 0 4px 14px rgba(var(--app-shadow-rgb), 0.06);

  text-align: left;
  box-sizing: border-box;

  transition:
    border-color var(--app-transition),
    box-shadow var(--app-transition);

  &:focus-within {
    border-color: var(--app-border-strong);
  }

  .table-scroll {
    width: 100%;
    min-width: 0;
    height: 100%;

    display: flex;
    flex-direction: column;

    overflow: auto;
  }

  @media (max-width: 700px) {
    border-radius: 10px;
  }
`;

// =========================================================
// CABECERA GENERAL
// =========================================================

export const TableHeader = styled.div<{ $columns: number }>`
  display: grid;

  grid-template-columns: repeat(
    ${({ $columns }) => $columns},
    minmax(0, 1fr)
  );

  gap: 16px;
  align-items: center;

  min-width: 100%;
  width: max-content;

  padding: 15px 18px;

  background: var(--app-white);
  border-bottom: 1px solid var(--app-border);

  box-sizing: border-box;

  position: sticky;
  top: 0;
  z-index: 3;

  h4 {
    min-width: 0;
    margin: 0;

    color: var(--app-navbar-text);

    font-family: inherit;
    font-size: 12px;
    font-weight: 800;

    line-height: 1.4;
    letter-spacing: 0.06em;
    text-transform: uppercase;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${caramelButtonStyles}

  @media (max-width: 850px) {
    gap: 10px;
    padding: 13px 12px;

    h4 {
      font-size: 11px;
    }
  }

  @media (max-width: 600px) {
    gap: 8px;
    padding: 12px 10px;
  }
`;

// =========================================================
// CABECERA DE COMANDAS
// Mantiene la misma identidad visual, con columnas flexibles.
// =========================================================

export const OrdersTableHeader = styled(TableHeader)`
  background: var(--app-surface-soft);
  h4 {
    
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.055em;
  }
`;

// =========================================================
// CONTENEDOR DE FILAS
// =========================================================

export const ContainerRows = styled.div`
  width: 100%;
  min-width: 100%;

  min-height: 0;
  flex: 1 1 auto;

  display: flex;
  flex-direction: column;

  gap: 0;

  padding: 5px 8px;

  overflow: visible;

  background: var(--app-white);

  box-sizing: border-box;

  scrollbar-width: thin;
  scrollbar-color: var(--app-border-strong) transparent;

  @media (max-width: 600px) {
    padding: 4px;
  }
`;

// =========================================================
// FILA GENERAL
// =========================================================

export const TableRow = styled.div<{ $columns: number }>`
  position: relative;

  display: grid;

  grid-template-columns: repeat(
    ${({ $columns }) => $columns},
    minmax(0, 1fr)
  );

  gap: 16px;
  align-items: center;

  width: 100%;
  min-width: 100%;

  margin: 4px 0;
  padding: 15px 14px;

  border: 1px solid transparent;
  border-radius: var(--app-radius-sm);

  background: var(--app-surface);

  color: var(--app-muted-dark);

  font-family: inherit;
  font-size: 13px;
  line-height: 1.45;

  box-sizing: border-box;

  box-shadow: var(--app-shadow-xs);

  transition:
    background-color var(--app-transition),
    border-color var(--app-transition),
    box-shadow var(--app-transition),
    transform var(--app-transition);

  &:hover {
    z-index: 1;

    background: var(--app-surface-soft);
    border-color: var(--app-border);

    box-shadow:
      0 2px 4px rgba(var(--app-shadow-rgb), 0.025),
      0 5px 12px rgba(var(--app-shadow-rgb), 0.035);
  }

  &:focus-within {
    border-color: var(--app-border-strong);
    box-shadow: 0 0 0 3px rgba(var(--app-muted-rgb), 0.08);
  }

  span,
  p,
  strong {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    margin: 0;
  }

  span {
    color: var(--app-muted-dark);
  }

  strong {
    color: var(--app-ink);
    font-size: 13px;
    font-weight: 750;
  }

  .actions {
    min-width: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 7px;
  }

  .actions button {
    flex-shrink: 0;
  }

  .price,
  .total {
    color: var(--app-ink);
    font-size: 13px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .status-text {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    max-width: 100%;

    padding: 5px 10px;

    border: 1px solid var(--app-border);
    border-radius: 999px;

    background: var(--app-success-soft);
    color: var(--app-success);

    font-size: 11px;
    font-weight: 800;
    line-height: 1.3;

    white-space: nowrap;
  }

  .stock {
    font-variant-numeric: tabular-nums;
  }

  .product-name {
    color: var(--app-ink);
    font-weight: 700;
  }

  .category {
    color: var(--app-muted);
  }

  .actions svg {
    flex-shrink: 0;
  }

  @media (max-width: 850px) {
    gap: 10px;
    padding: 13px 10px;
    font-size: 12px;

    .actions {
      gap: 5px;
    }
  }

  @media (max-width: 600px) {
    gap: 8px;
    padding: 11px 9px;
    font-size: 12px;

    .actions {
      justify-content: flex-end;
      gap: 4px;
    }

    .button-text {
      display: none;
    }

    .actions button {
      width: 30px;
      min-width: 30px;
      height: 30px;
      padding: 6px;
    }

    .actions svg {
      width: 14px;
      height: 14px;
    }
  }

  @media (max-width: 400px) {
    gap: 6px;
    padding: 10px 6px;

    .actions button {
      width: 28px;
      min-width: 28px;
      height: 28px;
      padding: 5px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
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
  border-bottom: 1px solid var(--app-border);
  border-radius: 0;

  background: var(--app-surface);
  color: var(--app-ink);

  box-shadow: none;

  cursor: pointer;

  &:hover {
    background: var(--app-surface-soft);
    border-color: var(--app-border);
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

    background: var(--app-surface-soft);
    color: var(--app-primary);

    font-size: 12px;
    font-weight: 850;

    white-space: nowrap;
  }

  .customer {
    color: var(--app-ink);
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

      color: var(--app-muted-dark);
      font-size: 12px;
    }

    small {
      color: var(--app-muted);
      font-size: 11px;
      font-weight: 700;
    }
  }

  .total {
    color: var(--app-primary);
    font-weight: 850;
  }

  .payment-pill {
    display: inline-flex;
    align-items: center;

    max-width: 100%;
    width: fit-content;

    padding: 6px 10px;

    border: 1px solid var(--app-border);
    border-radius: 999px;

    background: var(--app-surface-soft);
    color: var(--app-muted-dark);

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
    background: var(--app-success-soft);
    border-color: var(--app-success);
    color: var(--app-success);
  }

  .payment-status.pending {
    background: var(--app-warning-soft);
    border-color: var(--app-accent);
    color: var(--app-accent);
  }

  .payment-status.partially_paid {
    background: rgba(59, 130, 246, 0.10);
    border-color: #3b82f6;
    color: #2563eb;
  }

  .payment-status.cancelled {
    background: rgba(220, 38, 38, 0.10);
    border-color: #dc2626;
    color: #dc2626;
  }

  .payment-status.unknown {
    background: var(--app-surface-soft);
    border-color: var(--app-border);
    color: var(--app-muted);
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
    background: var(--app-success-soft);
    color: var(--app-success);
  }

  .order-status.inactive {
    background: rgba(220, 38, 38, 0.10);
    color: #dc2626;
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

// =========================================================
// BOTONES GENERALES DE TABLA
// =========================================================

export const TableButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  width: fit-content;
  min-width: 0;
  min-height: 32px;

  padding: 7px 11px;

  border: 1px solid var(--app-border-strong);
  border-radius: var(--app-radius-sm);

  background: var(--app-surface);
  color: var(--app-muted-dark);

  font-family: inherit;
  font-size: 12px;
  font-weight: 750;
  line-height: 1.2;

  white-space: nowrap;
  cursor: pointer;

  box-shadow: var(--app-shadow-xs);

  transition:
    background-color var(--app-transition),
    border-color var(--app-transition),
    color var(--app-transition),
    box-shadow var(--app-transition),
    transform var(--app-transition);

  &:hover:not(:disabled) {
    background: var(--app-surface-soft);
    border-color: var(--app-accent);
    color: var(--app-primary);
  }

  &:focus-visible {
    outline: 3px solid var(--app-surface-soft);
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: none;
  }

  &:disabled {
    background: var(--app-surface-soft);
    border-color: var(--app-border);
    color: var(--app-muted);

    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    min-width: 30px;
    width: 30px;
    height: 30px;

    padding: 6px;
    gap: 0;

    .button-text {
      display: none;
    }
  }
`;