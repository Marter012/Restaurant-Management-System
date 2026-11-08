import styled from "styled-components";

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

    background: var(--app-surface);
    border: 1px solid var(--app-border);
    border-radius: var(--app-radius-sm);

    color: var(--app-muted);

    transition:
      border-color var(--app-transition),
      box-shadow var(--app-transition);

    &:focus-within {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 3px rgba(var(--app-accent-rgb), 0.1);
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
      color: var(--app-ink);

      font-family: inherit;
      font-size: 13px;

      &::placeholder {
        color: var(--app-muted);
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

      color: var(--app-muted-dark);
      font-size: 11px;
      font-weight: 750;

      background-color: var(--app-border);
    }

    select {
      width: 100%;
      height: 43px;

      padding: 0 12px;

      border: 1px solid var(--app-border);
      border-radius: var(--app-radius-sm);

      background: var(--app-surface);
      color: var(--app-ink);

      font-family: inherit;
      font-size: 13px;
      font-weight: 650;

      outline: none;
      cursor: pointer;

      &:focus {
        border-color: var(--app-accent);
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

    border: 1px solid var(--app-primary);
    border-radius: var(--app-radius-sm);

    background: var(--app-primary);
    color: var(--app-white);

    font-family: inherit;
    font-size: 13px;
    font-weight: 800;

    white-space: nowrap;
    cursor: pointer;

    transition:
      background var(--app-transition),
      transform var(--app-transition),
      box-shadow var(--app-transition);

    &:hover {
      filter: brightness(1.08);
      box-shadow: var(--app-shadow-sm);
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

  color: var(--app-muted);

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
