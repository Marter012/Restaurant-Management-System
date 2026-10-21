import styled from "styled-components";
import { caramelButtonStyles } from "../Utils/ButtonStyles.ts";

// =========================================================
// CONTENEDOR PRINCIPAL
// =========================================================

export const ContainerManageProducts = styled.div`
  width: 100%;
  
  min-height: 0;
  height: 80%;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  box-sizing: border-box;

  flex-shrink: 0;

  /*
    =========================================================
    ESTADOS GENERALES
    =========================================================
  */

  .active {
    background-color: #50934d;
    color: var(--app-white);
  }

  .inactive {
    background-color: #db7f7f;
    color: var(--app-white);
  }

  .buttonstock {
    background-color: #794026;
    color: var(--app-white);
  }

  /*
    =========================================================
    TABLA DE PRODUCTOS
    =========================================================
  */

  .products-table {
    width: 100%;
    /*
      Altura fija de la tabla.

      Las filas van a hacer scroll internamente,
      evitando que la tabla crezca indefinidamente.
    */
    height: auto;
    max-height: none;
    min-height: 0;
    height: auto;
    flex: 1 1 auto;
    overflow: visible;

    .button-text {
      text-decoration: none;
      color: var(--app-white);
    }

    /*
    =======================================================
    TABLET / DISPOSITIVOS PEQUEÑOS
    Nombre | Stock | Acciones
    =======================================================
    */
    @media (max-width: 900px) {
      .table-header {
        grid-template-columns:
          minmax(0, 1fr)
          80px
          120px;

        gap: 10px;
      }

      /*
        Ocultar Precio y Categoría
      */

      .table-header-2,
      .table-header-3 {
        display: none;
      }

      /*
        FILAS
      */

      .products-table-row {
        text-align: start;
        grid-template-columns:
          minmax(0, 1fr)
          80px
          120px;

        gap: 10px;
        .name {
          text-align: center;
        }
      }

      /*
        Ocultar Precio y Categoría
      */

      .products-table-row .price,
      .products-table-row .category {
        display: none;
      }

      /*
        ALINEACIÓN
      */

      .products-table-row .stock {
        text-align: center;
      }

      .products-table-row .actions {
        justify-content: center;
      }

      /*
        =====================================================
        ACCIONES: SOLO ICONOS
        =====================================================
      */

      .products-table-row .actions .button-text,
      .products-table-row .actions .status-text {
        display: none;
      }

      .products-table-row .actions button {
        width: 32px;
        min-width: 32px;
        height: 32px;

        padding: 6px;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        gap: 0;
      }

      .products-table-row .actions button svg {
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
        grid-template-columns:
          minmax(0, 1fr)
          55px
          80px;

        gap: 6px;

        padding: 9px 8px;
      }

      .products-table-row {
        grid-template-columns:
          minmax(0, 1fr)
          55px
          80px;

        gap: 6px;

        padding: 10px 8px;
      }

      .table-header h4 {
        font-size: 9px;
      }

      .products-table-row {
        font-size: 11px;
      }

      .products-table-row .actions {
        gap: 4px;
      }

      .products-table-row .actions button {
        width: 30px;
        min-width: 30px;
        height: 30px;

        padding: 6px;
      }

      .products-table-row .actions button svg {
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
        grid-template-columns:
          minmax(0, 1fr)
          48px
          72px;

        gap: 4px;

        padding: 8px 6px;
      }

      .products-table-row {
        grid-template-columns:
          minmax(0, 1fr)
          48px
          72px;

        gap: 4px;

        padding: 9px 6px;
      }

      .table-header h4 {
        font-size: 8px;
      }

      .products-table-row {
        font-size: 10px;
      }

      .products-table-row .actions {
        gap: 3px;
      }

      .products-table-row .actions button {
        width: 28px;
        min-width: 28px;
        height: 28px;

        padding: 5px;
      }

      .products-table-row .actions button svg {
        width: 13px;
        height: 13px;
      }
    }
  }

  /*
    =========================================================
    LISTA COMPLETA EN CELULARES
    Desactiva el scroll interno de las filas solamente aquí.
    =========================================================
  */

  @media (max-width: 600px) {
    .products-table {
      height: auto;
      max-height: none;
      min-height: 0;
      flex: 0 0 auto;
      overflow: visible;
    }

    .products-table > div:last-child {
      height: auto;
      max-height: none;
      min-height: 0;
      flex: 0 0 auto;
      overflow-x: visible;
      overflow-y: visible;
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
// BOTÓN NUEVO PRODUCTO
// =========================================================

export const AddProductButton = styled.button`
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 12px 18px;

  border: none;
  border-radius: 8px;

  background-color: var(--app-primary);
  color: var(--app-white);
  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition:
    filter 0.2s ease,
    transform 0.2s ease;

  &:hover {
    filter: brightness(0.96);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 15px;
    height: 15px;
  }

  ${caramelButtonStyles}
  @media (max-width: 600px) {
    width: 100%;

    padding: 11px 15px;

    font-size: 13px;
  }

  @media (max-width: 400px) {
    padding: 10px 12px;

    font-size: 12px;
  }
`;

// =========================================================
// FILTROS
// =========================================================

export const Filter = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
  padding: 0;

  box-sizing: border-box;

  select {
    min-width: 0;
    height: 42px;
    box-sizing: border-box;
    border: 1px solid var(--app-accent-soft);
    border-radius: 10px;
    padding: 0 12px;
    background: var(--app-white);
    color: var(--app-primary-active);
    font-family: inherit;
    font-size: 0.86rem;
    font-weight: 600;
  }

  button {
    min-height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 0 15px;
    border: 1px solid var(--app-accent-soft);
    border-radius: 10px;
    background: var(--app-white);
    color: var(--app-primary);
    font-family: inherit;
    font-size: 0.84rem;
    font-weight: 700;
    white-space: nowrap;
    cursor: pointer;
    transition:
      filter 160ms ease,
      transform 160ms ease;

    &:hover {
      filter: brightness(0.96);
    }
    &:active {
      transform: scale(0.98);
    }

    &.active {
      border-color: var(--app-primary);
      background: var(--app-primary);
      color: var(--app-white);
    }
    &.bulk-stock {
      margin-left: auto;
      border-color: var(--app-primary);
      background: var(--app-white);
      color: var(--app-primary);
    }
  }

  select {
    flex: 0 1 210px;
    cursor: pointer;
    outline: none;
    &:focus {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 3px rgba(var(--app-accent-rgb), 0.149);
    }
  }

  .product-search {
    min-width: 180px;
    height: 42px;
    min-height: 42px;
    flex: 1 1 260px;
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 12px;
    border: 1px solid var(--app-accent-soft);
    border-radius: 10px;
    background: var(--app-white);
    color: var(--app-accent);
    box-sizing: border-box;
    transition:
      border-color 160ms ease,
      box-shadow 160ms ease;
    &:focus-within {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 3px rgba(var(--app-accent-rgb), 0.149);
    }
    > svg {
      flex: 0 0 auto;
      font-size: 0.9rem;
    }
    input {
      width: 100%;
      height: 100%;
      min-width: 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: var(--app-primary);
      font-family: inherit;
      font-size: 0.86rem;
      font-weight: 500;
      border: none !important;
    }
    input::placeholder {
      color: var(--app-muted-dark);
    }
    input::-webkit-search-cancel-button {
      display: none;
    }
    button.clear-search {
      min-width: 28px;
      width: 28px;
      height: 28px;
      min-height: 28px;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--app-muted-dark);
    }
    button.clear-search:hover {
      background: var(--app-surface-soft);
    }
  }

  @media (max-width: 600px) {
    gap: 7px;
    > button:not(.bulk-stock) {
      flex: 1 1 calc(50% - 4px);
    }
    select {
      flex: 1 1 calc(42% - 4px);
    }
    .product-search {
      flex: 1 1 calc(58% - 4px);
      min-width: 150px;
    }
    button.bulk-stock {
      flex: 1 1 100%;
      margin-left: 0;
    }
  }
`;

// =========================================================
// OPCIONES DEL PRODUCTO
// =========================================================

export const ProductOptions = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 18px;

  box-sizing: border-box;

  @media (max-width: 600px) {
    gap: 15px;
  }

  @media (max-width: 400px) {
    gap: 12px;
  }
`;

// =========================================================
// INFORMACIÓN DEL PRODUCTO
// =========================================================

export const ProductInfo = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  box-sizing: border-box;

  h3 {
    margin: 0 0 5px;

    color: var(--app-primary);

    font-size: 20px;

    font-weight: 700;
  }

  p {
    margin: 0;

    color: var(--app-primary);

    font-size: 14px;

    line-height: 1.5;
  }

  > div {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 15px;

    padding: 10px 12px;

    background-color: var(--app-surface-soft);

    border-radius: 7px;

    span {
      color: var(--app-primary);

      font-size: 13px;
    }

    strong {
      color: var(--app-primary);

      font-size: 14px;

      text-align: right;
    }
  }

  > strong {
    color: var(--app-primary);

    font-size: 15px;
  }

  @media (max-width: 500px) {
    gap: 8px;

    h3 {
      font-size: 18px;
    }

    p {
      font-size: 13px;
    }

    > div {
      padding: 9px 10px;

      span,
      strong {
        font-size: 12px;
      }
    }
  }
`;

// =========================================================
// ACCIONES DEL PRODUCTO
// =========================================================

export const ProductActions = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 10px;

  box-sizing: border-box;

  > div {
    display: flex;

    gap: 8px;

    width: 100%;
  }

  button {
    flex: 1;
  }

  @media (max-width: 500px) {
    > div {
      flex-direction: column;
    }
  }
`;

// =========================================================
// BOTÓN DE ACCIÓN
// =========================================================

export const ActionButton = styled.button`
  min-height: 40px;

  padding: 10px 15px;

  border: none;

  border-radius: 7px;

  background-color: #794026;
  color: var(--app-white);

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  transition:
    filter 0.2s ease,
    transform 0.2s ease;

  &:hover {
    filter: brightness(0.96);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// =========================================================
// BOTÓN CANCELAR
// =========================================================

export const CancelButton = styled.button`
  min-height: 40px;

  padding: 10px 15px;

  border: 1px solid var(--app-border);

  border-radius: 7px;

  background-color: var(--app-surface-soft);

  color: var(--app-primary);

  font-size: 13px;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background-color: var(--app-surface-soft);

    border-color: var(--app-border);
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;

// =========================================================
// BOTÓN DE ESTADO
// =========================================================


export const StatusButton = styled.button`
  min-height: 40px;
  padding: 10px 15px;

  border: none;
  border-radius: 7px;

  font-size: 13px;
  font-weight: 600;

  color: #ffffff;
  background-color: #50934d;

  cursor: pointer;
  opacity: 1;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &.active {
    background-color: #50934d !important;
    color: #ffffff !important;
  }

  &.inactive {
    background-color: #db7f7f !important;
    color: #ffffff !important;
  }

  &:hover {
    filter: brightness(0.96);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    transform: none;
  }
`;
// =========================================================
// MODAL DE MODIFICACIÓN MASIVA DE STOCK
// =========================================================

export const BulkStockContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 14px;

  color: var(--app-primary);

  overflow: hidden;

  .stockHeader {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    text-align: center;
  }
`;
export const BulkStockToolbar = styled.div`
  display: grid;
  gap: 7px;
  width: 50%;
  label {
    color: var(--app-primary);
    font-size: 0.84rem;
    font-weight: 700;
  }

  @media (max-width: 600px) {
    width: 100%;
}
`;

export const BulkStockSelect = styled.select`
  width: 100%;
  min-width: 0;
  min-height: 44px;
  padding: 0 12px;
  border: 1px solid var(--app-accent-soft);
  border-radius: 10px;
  background: var(--app-white);
  color: var(--app-primary);
  font: inherit;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;

  &:focus-visible {
    border-color: var(--app-accent);
    box-shadow: 0 0 0 3px rgba(var(--app-accent-rgb), 0.16);
  }

  &:disabled {
    opacity: 0.65;
    cursor: wait;
  }
`;

export const BulkStockSummary = styled.p`
  margin: 0;
  padding: 10px 12px;
  border-radius: 9px;
  background: var(--app-surface-soft);
  color: var(--app-primary);
  font-size: 0.84rem;
  font-weight: 600;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const BulkStockList = styled.div`
  display: grid;
  gap: 8px;
  max-height: min(48vh, 420px);
  overflow-y: auto;
  padding: 2px 4px 2px 0;
  overscroll-behavior: contain;
`;

export const BulkStockRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 104px;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  border: 1px solid var(--app-border);
  border-radius: 10px;
  background: var(--app-white);

  .bulk-product-info {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .bulk-product-info strong {
    overflow-wrap: anywhere;
    color: var(--app-primary);
    font-size: 0.88rem;
    font-weight: 700;
  }

  .bulk-product-info span,
  .bulk-quantity span {
    color: var(--app-muted-dark);
    font-size: 0.74rem;
  }

  .bulk-quantity {
    display: grid;
    gap: 4px;
  }

  @media (max-width: 420px) {
    grid-template-columns: minmax(0, 1fr) 88px;
    gap: 8px;
    padding: 9px;
  }
`;

export const BulkStockInput = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 40px;
  box-sizing: border-box;
  padding: 6px 8px;
  border: 1px solid var(--app-accent-soft);
  border-radius: 8px;
  background: var(--app-white);
  color: var(--app-primary);
  font: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  text-align: center;

  &:focus-visible {
    outline: 3px solid rgba(var(--app-accent-rgb), 0.25);
    border-color: var(--app-accent);
  }

  &:disabled {
    opacity: 0.65;
  }
`;

export const BulkStockActions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 4px;

  > button {
    min-width: 120px;
  }

`;
