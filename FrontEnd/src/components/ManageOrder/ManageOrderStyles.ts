import styled from "styled-components";

// =========================================================
// CONTENEDOR PRINCIPAL
// =========================================================

export const ContainerManageOrders = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 18px;

  box-sizing: border-box;

  flex-shrink: 0;

  /*
    =========================================================
    TABLA DE ORDERS
    =========================================================
  */

  form {
    width: 100%;
    height: 100%;
  }

  .orders-table {
    width: 100%;

    height: 100%;
    max-height: 100%;
    min-height: 0;

    /*
      Evita que la tabla se reduzca verticalmente
      por el comportamiento del contenedor flex.
      Mantiene la misma altura visual que Products
      y Promotions.
    */
    flex-shrink: 0;

    box-sizing: border-box;

    .table-header {
      grid-template-columns: 0.65fr 1.25fr 1fr 1.2fr 1fr 1fr;
      gap: 10px;
    }

    .orders-table-row {
      grid-template-columns: 0.65fr 1.25fr 1fr 1.2fr 1fr 1fr;
      gap: 10px;
      margin: 4px 0;
      padding: 16px 14px;
      border: 1px solid transparent;
      border-radius: 11px;
      background: #fffaf2;
      color: #59331f;
      font-size: 12px;
      line-height: 1.45;
      box-shadow: 0 1px 2px rgba(var(--app-shadow-rgb), 0.025);
      transition:
        background-color 160ms ease,
        border-color 160ms ease,
        box-shadow 160ms ease;

      p {
        color: inherit;
      }

      &:hover {
        border-color: #ead9c3;
        box-shadow:
          0 2px 4px rgba(var(--app-shadow-rgb), 0.025),
          0 5px 12px rgba(var(--app-shadow-rgb), 0.035);
      }

      &.paid {
        background: #e3f4e5;
        border-color: #c2e4c7;
        color: #285c32;
      }

      &.pending {
        background: #fff3cc;
        border-color: #f0dfa0;
        color: #755a00;
      }

      &.cancelled {
        background: #f8dfe0;
        border-color: #edc0c3;
        color: #842b32;
      }

      .actions button {
        color: inherit;
      }
      .actions button svg {
        color: inherit;
      }
    }

    .orders-table-row .order-total {
      text-align: center;
      white-space: nowrap;
    }

    @media (max-width: 900px) {
      .table-header {
        grid-template-columns: 0.65fr 1.1fr 1fr 1.1fr 1fr 1fr;
        gap: 6px;
      }

      .orders-table-row {
        grid-template-columns: 0.65fr 1.1fr 1fr 1.1fr 1fr 1fr;
        gap: 6px;
      }

      .orders-table-row .order-total {
        display: block;
        text-align: center;
        white-space: nowrap;
      }

      .orders-table-row .order-number {
        min-width: 0;
      }

      .orders-table-row .payment-status {
        text-align: center;

        white-space: nowrap;
      }

      .orders-table-row .actions {
        display: flex;

        align-items: center;

        justify-content: center;

        gap: 0;
      }

      .orders-table-row .actions button {
        width: 32px;

        min-width: 32px;

        height: 32px;

        padding: 6px;

        display: inline-flex;

        align-items: center;

        justify-content: center;

        gap: 0;

        flex-shrink: 0;
      }

      .orders-table-row .actions button svg {
        width: 15px;

        height: 15px;

        flex-shrink: 0;
      }
    }

    /*
      =======================================================
      CELULAR
      =======================================================
    */

    @media (max-width: 600px) {
      .table-header {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 76px;
        gap: 5px;
        padding: 9px 8px;
      }

      .orders-table-row {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 76px;
        gap: 5px;
        padding: 10px 8px;
      }

      .orders-table-row .order-number {
        grid-column: 1;
        grid-row: 1;
      }
      .orders-table-row .order-total {
        grid-column: 2;
        grid-row: 1;
      }
      .orders-table-row .payment-status {
        display: none;
      }
      .orders-table-row .actions {
        grid-column: 3;
        grid-row: 1;
      }

      .table-header h4 {
        font-size: 9px;
      }

      .orders-table-row {
        font-size: 11px;
      }

      .orders-table-row .actions {
        gap: 4px;
      }

      .orders-table-row .actions button {
        width: 30px;

        min-width: 30px;

        height: 30px;

        padding: 6px;
      }

      .orders-table-row .actions button svg {
        width: 14px;

        height: 14px;
      }
    }

    /*
      =======================================================
      CELULAR PEQUEÑO
      =======================================================
    */

    @media (max-width: 400px) {
      .table-header {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 68px;
        gap: 3px;
        padding: 8px 6px;
      }

      .orders-table-row {
        grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) 68px;
        gap: 3px;
        padding: 9px 6px;
      }

      .orders-table-row .order-number {
        grid-column: 1;
        grid-row: 1;
      }
      .orders-table-row .order-total {
        grid-column: 2;
        grid-row: 1;
      }
      .orders-table-row .payment-status {
        display: none;
      }
      .orders-table-row .actions {
        grid-column: 3;
        grid-row: 1;
      }

      .table-header h4 {
        font-size: 8px;
      }

      .orders-table-row {
        font-size: 10px;
      }

      .orders-table-row .actions {
        gap: 3px;
      }

      .orders-table-row .actions button {
        width: 28px;

        min-width: 28px;

        height: 28px;

        padding: 5px;
      }

      .orders-table-row .actions button svg {
        width: 13px;

        height: 13px;
      }
    }
  }

  /*
    =========================================================
    ESPACIADO RESPONSIVE
    =========================================================
  */

  @media (max-width: 850px) {
    gap: 16px;
  }

  @media (max-width: 600px) {
    gap: 14px;
  }

  @media (max-width: 400px) {
    gap: 12px;
  }
`;

// =========================================================
// HEADER ORDERS
// =========================================================

export const HeaderOrders = styled.div`
  width: 80%;

  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 15px;

  @media (max-width: 1000px) {
    width: 90%;
  }

  @media (max-width: 700px) {
    width: 100%;

    flex-direction: column;

    align-items: stretch;

    gap: 10px;
  }
`;

// =========================================================
// TÍTULO
// =========================================================

export const TitleContainer = styled.div`
  display: flex;

  flex-direction: column;

  gap: 4px;

  h2 {
    margin: 0;

    color: var(--app-primary);

    font-size: 1.8rem;

    line-height: 1.2;
  }

  p {
    margin: 0;

    opacity: 0.7;

    font-size: 0.9rem;

    line-height: 1.4;
  }

  @media (max-width: 700px) {
    h2 {
      font-size: 1.5rem;
    }

    p {
      font-size: 0.82rem;
    }
  }

  @media (max-width: 400px) {
    h2 {
      font-size: 1.35rem;
    }

    p {
      font-size: 0.78rem;
    }
  }
`;

// =========================================================
// FILTROS
// =========================================================

export const Filter = styled.div`
  width: 80%;

  display: flex;

  gap: 5px;

  padding: 5px;

  box-sizing: border-box;

  background-color: rgba(var(--app-shadow-rgb), 0.15);

  border-radius: 10px;

  button {
    flex: 1;

    height: 42px;

    border: none;

    border-radius: 7px;

    background-color: transparent;

    font-size: 0.95rem;

    font-weight: 500;

    cursor: pointer;

    transition: background-color 0.2s ease;

    &:hover {
      background-color: rgba(var(--app-accent-rgb), 0.5);
    }

    &.active {
      background-color: #50934d !important;

      font-weight: 600;
    }
  }

  @media (max-width: 1000px) {
    width: 90%;
  }

  @media (max-width: 700px) {
    width: 100%;

    button {
      height: 38px;

      font-size: 0.82rem;
    }
  }

  @media (max-width: 400px) {
    gap: 3px;

    padding: 4px;

    button {
      height: 36px;

      font-size: 0.76rem;
    }
  }
`;

// =========================================================
// ACCIONES
// =========================================================

export const Actions = styled.div`
  min-width: 0;

  display: flex;

  justify-content: center;

  align-items: center;

  gap: 10px;

  @media (max-width: 900px) {
    justify-content: center;

    gap: 3px;
  }

  @media (max-width: 600px) {
    gap: 2px;
  }
`;

// =========================================================
// BOTONES DE ACCIÓN
// =========================================================

export const ActionButton = styled.button`
  width: 30px;

  height: 30px;

  display: flex;

  justify-content: center;

  align-items: center;

  flex-shrink: 0;

  padding: 0;

  border: none;

  border-radius: 6px;

  background-color: transparent;

  color: var(--app-primary);

  font-size: 1.2rem;

  cursor: pointer;

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: var(--app-primary);

    background-color: rgba(var(--app-accent-rgb), 0.15);

    transform: translateY(-1px);
  }

  svg {
    width: 18px;

    height: 18px;
  }

  @media (max-width: 900px) {
    width: 30px;

    min-width: 30px;

    height: 30px;

    svg {
      width: 16px;

      height: 16px;
    }
  }

  @media (max-width: 600px) {
    width: 28px;

    min-width: 28px;

    height: 28px;

    svg {
      width: 15px;

      height: 15px;
    }
  }

  @media (max-width: 400px) {
    width: 26px;

    min-width: 26px;

    height: 26px;

    svg {
      width: 14px;

      height: 14px;
    }
  }
`;

// =========================================================
// OPCIONES DEL MODAL
// =========================================================

export const OrderOptions = styled.div`
  width: 100%;

  display: flex;

  flex-direction: column;

  gap: 20px;

  box-sizing: border-box;

  @media (max-width: 600px) {
    gap: 15px;
  }
`;

// =========================================================
// PRODUCTOS
// =========================================================

export const OrderItems = styled.div`
  display: flex;

  flex-direction: column;

  gap: 7px;

  h3 {
    margin: 0 0 6px;

    color: var(--app-primary);

    font-size: 1.1rem;
  }

  @media (max-width: 600px) {
    h3 {
      font-size: 1rem;
    }
  }
`;

// =========================================================
// ITEM
// =========================================================

export const OrderItem = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  gap: 10px;

  padding: 9px 11px;

  box-sizing: border-box;

  border-radius: 8px;

  background-color: rgba(var(--app-accent-rgb), 0.12);

  span {
    color: var(--app-primary);

    font-size: 0.85rem;
  }

  strong {
    color: var(--app-primary);

    white-space: nowrap;
  }

  @media (max-width: 600px) {
    padding: 8px 9px;

    span {
      font-size: 0.78rem;
    }

    strong {
      font-size: 0.82rem;
    }
  }
`;

// =========================================================
// ACCIONES DEL MODAL
// =========================================================

export const OrderActions = styled.div`
  display: flex;

  flex-direction: column;

  gap: 9px;

  margin-top: 5px;
`;

// =========================================================
// CANCELAR
// =========================================================

export const CancelButton = styled.button`
  width: 100%;

  padding: 11px 14px;

  border: none;

  border-radius: 8px;

  background-color: var(--app-surface-soft);

  color: var(--app-primary-active);

  font-size: 0.9rem;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--app-border);
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 600px) {
    padding: 10px 12px;

    font-size: 0.85rem;
  }
`;

// =========================================================
// CAMBIAR ESTADO
// =========================================================

export const StatusButton = styled.button`
  width: 100%;

  padding: 11px 14px;

  border: none;

  border-radius: 8px;

  color: var(--app-white);

  font-size: 0.9rem;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    transform: translateY(-1px);
  }

  &.active {
    background-color: var(--app-danger);
  }

  &.inactive {
    background-color: var(--app-primary);
  }

  @media (max-width: 600px) {
    padding: 10px 12px;

    font-size: 0.85rem;
  }
`;

// =========================================================
// SIN COMANDAS
// =========================================================

export const EmptyMessage = styled.div`
  width: 100%;

  min-height: 100px;

  display: flex;

  justify-content: center;

  align-items: center;

  padding: 20px;

  box-sizing: border-box;

  color: var(--app-muted-dark);

  text-align: center;

  font-size: 0.85rem;

  @media (max-width: 600px) {
    min-height: 80px;

    padding: 15px;

    font-size: 0.78rem;
  }
`;
