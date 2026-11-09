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

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 14px;

  box-shadow: 0 4px 14px var(--color-text-light);

  text-align: left;
  box-sizing: border-box;

  transition:
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);

  &:focus-within {
    border-color: var(--color-border-strong);
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

  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));

  gap: 16px;
  align-items: center;

  min-width: 100%;
  width: max-content;

  padding: 15px 18px;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);

  box-sizing: border-box;

  position: sticky;
  top: 0;
  z-index: 3;

  h4 {
    min-width: 0;
    margin: 0;

    color: var(--color-text);
    font-size: 12px;
    font-weight: 800;

    line-height: 1.4;
    letter-spacing: 0.06em;
    text-transform: uppercase;

    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
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
  background: var(--color-surface-hover);
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

  background: var(--color-white);

  box-sizing: border-box;

  scrollbar-width: thin;
  scrollbar-color: var(--color-border-strong) transparent;

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

  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));

  gap: 16px;
  align-items: center;

  width: 100%;
  min-width: 100%;

  margin: 4px 0;
  padding: 15px 14px;

  border: 1px solid transparent;
  border-radius: var(--radius-sm);

  background: var(--color-surface);

  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.45;

  box-sizing: border-box;

  box-shadow: var(--shadow-sm);

  transition:
    background-color var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal),
    transform var(--transition-normal);

  > * {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    min-width: 0;
  }

  &:hover {
    z-index: 1;

    background: var(--color-surface-hover);
    border-color: var(--color-border);

    box-shadow:
      0 2px 4px var(--color-text-light),
      0 5px 12px var(--color-text-light);
  }

  &:focus-within {
    border-color: var(--color-border-strong);
    box-shadow: 0 0 0 3px var(--color-surface-muted);
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
    color: var(--color-text-secondary);
  }

  strong {
    color: var(--color-text);
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
    color: var(--color-text);
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

    border: 1px solid var(--color-border);
    border-radius: 999px;

    background: var(--color-success-soft);
    color: var(--color-success);

    font-size: 11px;
    font-weight: 800;
    line-height: 1.3;

    white-space: nowrap;
  }

  .stock {
    font-variant-numeric: tabular-nums;
  }

  .product-name {
    color: var(--color-text);
    font-weight: 700;
  }

  .category {
    color: var(--color-text-light);
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

  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-sm);

  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 750;
  line-height: 1.2;

  white-space: nowrap;
  cursor: pointer;

  box-shadow: var(--shadow-sm);

  transition:
    background-color var(--transition-normal),
    border-color var(--transition-normal),
    color var(--transition-normal),
    box-shadow var(--transition-normal),
    transform var(--transition-normal);

  &:hover:not(:disabled) {
    background: var(--color-surface-hover);
    border-color: var(--color-accent);
    color: var(--color-primary);
  }

  &:focus-visible {
    outline: 3px solid var(--color-surface-hover);
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: none;
  }

  &:disabled {
    background: var(--color-surface-hover);
    border-color: var(--color-border);
    color: var(--color-text-light);

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
