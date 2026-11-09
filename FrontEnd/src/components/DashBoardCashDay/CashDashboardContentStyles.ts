import styled from "styled-components";

import ListTable from "../../components/Tables/ListTable.tsx";
import { TableRow } from "../../components/Tables/ListTableStyles.ts";

/**
 * Tabla de movimientos de caja.
 * Reproduce la estética de CashDashboardTable de CashDayStyles:
 * encabezado compacto, filas planas, separadores inferiores y hover suave.
 */
export const CashMovementTable = styled(ListTable)`
  /* El contenedor conserva el espacio del panel, pero no agrega una segunda tarjeta. */
  background: var(--app-white);
  border: none;
  border-radius: 0;
  box-shadow: none;
  overflow: hidden;
  height: auto;
  max-height: 430px;
  min-height: 0;

  .table-scroll {
    width: 100%;
    min-width: 0;
    height: 100%;
    min-height: 0;
    overflow-x: hidden;
    overflow-y: auto;
    box-sizing: border-box;
  }

  /* Encabezado equivalente al th de la tabla anterior. */
  && .table-header {
    width: 100%;
    min-width: 100%;
    grid-template-columns:
      minmax(0, 2fr)
      minmax(90px, 0.85fr)
      minmax(0, 1.2fr)
      minmax(110px, 1fr);
    gap: 8px;
    padding: 10px 8px;
    background: var(--app-surface-soft) !important;
    background-image: none !important;
    border: none;
    border-bottom: 1px solid var(--app-accent-soft);
    box-shadow: none;

    h4 {
      color: var(--app-muted-dark);
      font-size: 10px;
      font-weight: 800;
      line-height: 1.3;
      letter-spacing: 0;
      text-transform: none;
    }

    h4:nth-child(4) {
      text-align: right;
    }
  }

  && .table-header h4:nth-child(5) {
    display: none;
  }

  /* ContainerRows de ListTable: elimina el espaciado propio de las filas-card. */
  .table-scroll > div:last-child {
    width: 100%;
    min-width: 0;
    flex: 0 0 auto;
    padding: 0;
    gap: 0;
    background: var(--app-white);
    box-sizing: border-box;
  }

  @media (max-width: 760px) {
    && .table-header {
      grid-template-columns:
        minmax(0, 1.8fr)
        minmax(100px, 1fr)
        minmax(90px, 0.9fr);
      padding: 10px 8px;
    }

    && .table-header h4:nth-child(2),
    && .table-header h4:nth-child(3) {
      display: none;
    }

    && .table-header h4:nth-child(4) {
      text-align: right;
    }

    && .table-header h4:nth-child(5) {
      display: block;
      text-align: right;
    }
  }
`;

export const CashMovementRow = styled(TableRow)`
  grid-template-columns:
    minmax(0, 2fr)
    minmax(90px, 0.85fr)
    minmax(0, 1.2fr)
    minmax(110px, 1fr);

  gap: 8px;
  margin: 0;
  padding: 12px 8px;
  border: none;
  border-bottom: 1px solid var(--app-accent-soft);
  border-radius: 0;
  background: var(--app-white);
  color: var(--app-primary);
  font-size: 12px;
  line-height: 1.4;
  box-shadow: none;

  transition: background-color 0.2s ease;
  cursor: pointer;
  &:hover {
    z-index: auto;
    background: var(--app-surface-soft);
    border-color: var(--app-accent-soft);
    box-shadow: none;
    transform: none;
  }

  &:focus-within {
    border-color: var(--app-accent-soft);
    box-shadow: none;
  }

  .movement-description {
    min-width: 0;
    color: var(--app-primary);
    font-size: 12px;
    font-weight: 500;
  }

  .movement-type,
  .movement-status {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .movement-status {
    display: none;
    justify-content: flex-end;
  }

  .movement-method {
    min-width: 0;
    color: var(--app-primary);
    font-size: 12px;
  }

  .movement-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    width: 100%;
    padding: 5px 8px;
    border: none;
    border-radius: 10px;
    font-size: 10px;
    font-weight: 800;
    line-height: 1.2;
    white-space: nowrap;
  }

  .movement-badge.income {
    background: var(--app-success);
    color: white;
  }

  .movement-badge.expense {
    background: var(--app-danger);
    color: black;
  }

  .movement-badge.pending {
    background: var(--app-warning);
    color: black;
  }

  .movement-badge.partially_paid {
    background: var(--app-warning-soft);
    color: black;
  }

  .movement-amount {
    display: block;
    min-width: 0;
    overflow: visible;
    color: var(--app-primary);
    text-align: right;
    font-size: 12px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .movement-amount.positive {
    color: var(--app-primary);
  }

  .movement-amount.negative {
    color: var(--app-danger);
  }

  @media (max-width: 760px) {
    grid-template-columns:
      minmax(0, 1.8fr)
      minmax(100px, 1fr)
      minmax(90px, 0.9fr);
    padding: 12px 8px;

    .movement-type,
    .movement-method {
      display: none;
    }

    .movement-status {
      display: flex;
    }
  }

  @media (max-width: 420px) {
    gap: 6px;
    padding: 11px 6px;

    .movement-description,
    .movement-amount {
      font-size: 11px;
    }

    .movement-badge {
      padding: 4px 6px;
      font-size: 9px;
    }
  }
`;

export const CashMovementEmpty = styled.div`
  padding: 25px;
  text-align: center;
  color: var(--app-muted-dark);
  font-size: 12px;
`;
