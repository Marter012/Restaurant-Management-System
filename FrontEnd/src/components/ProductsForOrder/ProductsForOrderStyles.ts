import styled from "styled-components";

/* =========================================================
   SECCIÓN DE PRODUCTOS
========================================================= */

export const ProductsSection = styled.section`
  width: 100%;

  min-width: 0;
  min-height: 0;
  height: 100% !important;

  display: flex;
  flex-direction: column;

  gap: 12px;

  padding: 16px;

  box-sizing: border-box;

  background-color: rgba(var(--app-shadow-rgb), 0.7);

  border-radius: 10px;

  overflow: hidden;

  /*
   * MUY IMPORTANTE
   * Permite que el panel se adapte al espacio
   * disponible sin agrandar el layout.
   */
  flex: 1 1 auto;

  > * {
    min-width: 0;
  }

  @media (max-width: 850px) {
    padding: 14px;

    gap: 10px;
  }

  @media (max-width: 700px) {
    padding: 12px;

    gap: 9px;

    border-radius: 9px;
  }

  @media (max-width: 400px) {
    padding: 10px;

    gap: 8px;
  }
`;

/* =========================================================
   HEADER
========================================================= */

export const ProductsHeader = styled.div`
  width: 100%;

  min-width: 0;

  flex-shrink: 0;

  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 12px;

  h3 {
    margin: 0;

    color: var(--app-white);

    font-size: 1.05rem;

    line-height: 1.2;

    white-space: nowrap;
  }

  @media (max-width: 700px) {
    gap: 8px;

    h3 {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 500px) {
    grid-template-columns: minmax(0, 1fr);

    h3 {
      width: 100%;
    }
  }
`;

/* =========================================================
   BUSCADOR
========================================================= */

export const SearchInput = styled.input`
  width: 100%;

  max-width: 100%;
  min-width: 0;

  height: 38px;

  padding: 0 12px;

  box-sizing: border-box;

  border: none;

  border-radius: 7px;

  outline: none;

  flex-shrink: 1;

  background-color: var(--app-white);

  color: var(--app-primary-active);

  font-size: 0.85rem;

  &::placeholder {
    color: var(--app-muted-dark);
  }

  &:focus {
    box-shadow: 0 0 0 2px rgba(var(--app-accent-rgb), 0.55);
  }

  @media (max-width: 700px) {
    height: 36px;

    font-size: 0.8rem;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

/* =========================================================
   CATEGORÍAS
========================================================= */

export const Categories = styled.div`
  width: 100%;

  flex-shrink: 0;

  display: flex;

  gap: 10px;

  overflow-x: auto;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

/* =========================================================
   SELECT DE CATEGORÍA
========================================================= */

export const CategorySelect = styled.select`
  width: 210px;

  max-width: 100%;

  height: 38px;

  padding: 0 38px 0 12px;

  box-sizing: border-box;

  flex-shrink: 0;

  border: 1px solid rgba(var(--app-accent-rgb), 0.45);

  border-radius: 8px;

  background-color: var(--app-surface-soft);

  color: var(--app-primary-active);

  font-size: 0.85rem;

  font-weight: 600;

  outline: none;

  cursor: pointer;

  appearance: none;

  background-image:
    linear-gradient(45deg, transparent 50%, var(--app-accent) 50%),
    linear-gradient(135deg, var(--app-accent) 50%, transparent 50%);

  background-position:
    calc(100% - 15px) 16px,
    calc(100% - 10px) 16px;

  background-size:
    5px 5px,
    5px 5px;

  background-repeat: no-repeat;

  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    border-color: var(--app-accent);

    background-color: var(--app-white);
  }

  &:focus {
    border-color: var(--app-accent);

    box-shadow: 0 0 0 3px rgba(var(--app-accent-rgb), 0.18);
  }

  option {
    background-color: var(--app-surface-soft);

    color: var(--app-primary-active);

    font-size: 0.85rem;
  }

  @media (max-width: 700px) {
    width: 180px;

    height: 36px;

    font-size: 0.8rem;
  }

  @media (max-width: 500px) {
    width: 100%;
  }
`;

/* =========================================================
   LISTA DE PRODUCTOS
========================================================= */

export const ProductGrid = styled.div`
  width: 100%;
  /*
   * La lista toma TODO el espacio que queda
   * dentro de ProductsSection.
   */

  min-width: 0;

  min-height: 0;

  display: flex;

  flex-direction: column;

  gap: 8px;

  /*
   * EL SCROLL ESTÁ ACÁ.
   */
  overflow-y: auto;

  overflow-x: hidden;

  padding-right: 3px;

  box-sizing: border-box;

  scrollbar-width: none;

  /*
   * Chrome / Edge / Android
   */
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(var(--app-white-rgb), 0.35);

    border-radius: 10px;
  }

  /*
   * Mejora el scroll en celular/tablet.
   */
  -webkit-overflow-scrolling: touch;

  overscroll-behavior: contain;
`;

/* =========================================================
   TARJETA DE PRODUCTO
========================================================= */

export const ProductCard = styled.div`
  width: 100%;

  min-width: 0;

  min-height: 62px;

  flex-shrink: 0;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 9px 11px;

  box-sizing: border-box;

  background-color: var(--app-surface-soft);

  border-radius: 8px;

  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;

  &:hover {
    transform: translateY(-1px);

    box-shadow: 0 3px 8px rgba(var(--app-shadow-rgb), 0.1);
  }

  /* =======================================================
     INFORMACIÓN
  ======================================================= */

  .product-info {
    flex: 1;

    min-width: 0;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 12px;
  }

  .product-name {
    min-width: 0;

    flex: 1;

    h4 {
      margin: 0 0 2px;

      color: var(--app-primary-active);

      font-size: 0.88rem;

      font-weight: 600;

      line-height: 1.25;

      overflow: hidden;

      text-overflow: ellipsis;

      white-space: nowrap;
    }

    small {
      display: block;

      color: var(--app-muted-dark);

      font-size: 0.72rem;

      line-height: 1.2;

      overflow: hidden;

      text-overflow: ellipsis;

      white-space: nowrap;
    }
  }

  .product-price {
    flex-shrink: 0;

    color: var(--app-primary);

    font-size: 0.85rem;

    font-weight: 700;

    white-space: nowrap;
  }

  .garnish-order-line {
    width: 100%;
    min-width: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-top: 7px;
    border-top: 1px solid rgba(var(--app-shadow-rgb), 0.12);
    color: var(--app-primary-active);
    font-size: 0.75rem;
  }

  .garnish-order-line > span {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  /* =======================================================
     BOTÓN AGREGAR
  ======================================================= */

  > button {
    flex-shrink: 0;

    min-width: 105px;

    padding: 8px 12px;

    border: none;

    border-radius: 6px;

    background-color: var(--app-accent);

    color: var(--app-ink);

    cursor: pointer;

    font-size: 0.78rem;

    font-weight: 700;

    white-space: nowrap;

    transition:
      background-color 0.2s ease,
      transform 0.15s ease;

    &:hover {
      background-color: var(--app-accent);
    }

    &:active {
      transform: scale(0.96);
    }

    &:disabled {
      background-color: var(--app-border);

      color: var(--app-muted-dark);

      cursor: not-allowed;

      opacity: 0.7;
    }
  }

  /* =======================================================
     TABLET / CELULAR
  ======================================================= */

  @media (max-width: 700px) {
    min-height: 58px;

    padding: 8px 9px;

    gap: 7px;

    .product-info {
      gap: 8px;
    }

    .product-name {
      h4 {
        font-size: 0.82rem;
      }

      small {
        font-size: 0.67rem;
      }
    }

    .product-price {
      font-size: 0.78rem;
    }

    > button {
      min-width: 92px;

      padding: 7px 8px;

      font-size: 0.7rem;
    }
  }

  @media (max-width: 500px) {
    min-height: 56px;

    .product-info {
      flex-direction: column;

      align-items: flex-start;

      justify-content: center;

      gap: 2px;
    }

    .product-price {
      font-size: 0.75rem;
    }

    > button {
      min-width: 85px;

      padding: 7px 6px;

      font-size: 0.67rem;
    }
  }

  @media (max-width: 400px) {
    min-height: 53px;

    padding: 7px 8px;

    .product-name h4 {
      font-size: 0.78rem;
    }

    .product-name small {
      font-size: 0.63rem;
    }

    .product-price {
      font-size: 0.72rem;
    }

    > button {
      min-width: 78px;

      font-size: 0.62rem;
    }
  }
`;

/* =========================================================
   MODAL
========================================================= */

export const ModalOverlay = styled.div`
  position: fixed;

  inset: 0;

  z-index: 9999;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: clamp(10px, 2.5vw, 24px);

  box-sizing: border-box;
  overflow-y: auto;
  overscroll-behavior: contain;

  background: rgba(var(--app-shadow-rgb), 0.55);

  overflow-y: auto;
`;

/* =========================================================
   MODAL PROMOCIÓN
========================================================= */

export const PromotionModal = styled.div`
  width: min(450px, 100%);
  max-height: calc(100dvh - 30px);
  min-height: 0;
  margin: auto;

  overflow-y: auto;

  padding: 24px;

  box-sizing: border-box;

  background: var(--app-surface-soft);

  border-radius: 14px;

  box-shadow: 0 10px 35px rgba(var(--app-shadow-rgb), 0.3);

  text-align: center;

  h3 {
    margin: 0 0 10px;

    color: var(--app-primary-active);

    font-size: 1.15rem;

    line-height: 1.3;
  }

  p {
    margin: 0 0 18px;

    color: var(--app-primary);

    font-size: 0.85rem;

    line-height: 1.5;
  }

  button.cancel-button {
    margin-top: 8px;
    background: var(--app-border);
    color: var(--app-primary-active);
  }

  button {
    width: 100%;

    min-height: 40px;

    padding: 10px 16px;

    border: none;

    border-radius: 7px;

    background-color: var(--app-accent);

    color: var(--app-ink);

    cursor: pointer;

    font-weight: 600;

    transition:
      background-color 0.2s ease,
      transform 0.15s ease;

    &:hover {
      background-color: var(--app-accent);
    }

    &:active {
      transform: scale(0.97);
    }
  }

  @media (max-width: 500px) {
    padding: 20px;

    h3 {
      font-size: 1.05rem;
    }

    p {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 400px) {
    padding: 17px;

    h3 {
      font-size: 1rem;
    }

    p {
      font-size: 0.78rem;
    }
  }
`;

/* =========================================================
   MODAL PARA ELEGIR GUARNICIÓN
========================================================= */

export const GarnishModal = styled.div`
  position: relative;
  width: min(420px, 100%);
  max-height: calc(100dvh - 32px);
  overflow-y: auto;
  box-sizing: border-box;
  padding: 26px;
  margin: auto;
  border: 1px solid rgba(var(--app-accent-rgb), 0.22);
  border-radius: 18px;
  background: var(--app-surface-soft);
  box-shadow: 0 24px 70px rgba(var(--app-shadow-rgb), 0.34);
  text-align: left;
  animation: garnishModalEnter 0.2s ease-out;

  @keyframes garnishModalEnter {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  .garnish-modal-top {
    display: flex;
    align-items: flex-start;
    gap: 13px;
    margin-bottom: 18px;
  }

  .garnish-modal-icon {
    flex: 0 0 46px;
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    border-radius: 13px;
    background: rgba(var(--app-accent-rgb), 0.18);
    color: var(--app-primary);
    font-size: 1.45rem;
  }

  .garnish-modal-heading {
    min-width: 0;
    flex: 1;
  }

  h3 {
    margin: 1px 0 5px;
    color: var(--app-primary-active);
    font-size: 1.15rem;
    line-height: 1.25;
  }

  .garnish-modal-subtitle {
    margin: 0;
    color: var(--app-muted-dark);
    font-size: 0.82rem;
    line-height: 1.45;
  }

  .garnish-product-name {
    display: block;
    margin-top: 5px;
    color: var(--app-primary);
    font-weight: 800;
  }

  .garnish-field-label {
    display: block;
    margin: 0 0 8px;
    color: var(--app-primary-active);
    font-size: 0.8rem;
    font-weight: 800;
  }

  .garnish-select-wrap {
    position: relative;
    margin-bottom: 20px;
  }

  .garnish-select {
    width: 100%;
    min-height: 48px;
    padding: 0 42px 0 13px;
    box-sizing: border-box;
    appearance: none;
    border: 1px solid rgba(var(--app-accent-rgb), 0.48);
    border-radius: 10px;
    outline: none;
    background: var(--app-white);
    color: var(--app-primary-active);
    font: inherit;
    font-size: 0.9rem;
    cursor: pointer;
    transition:
      border-color 0.18s ease,
      box-shadow 0.18s ease;

    &:hover {
      border-color: var(--app-accent);
    }
    &:focus {
      border-color: var(--app-accent);
      box-shadow: 0 0 0 3px rgba(var(--app-accent-rgb), 0.18);
    }
  }

  .garnish-select-wrap::after {
    content: "";
    position: absolute;
    top: 19px;
    right: 16px;
    width: 7px;
    height: 7px;
    border-right: 2px solid var(--app-primary);
    border-bottom: 2px solid var(--app-primary);
    transform: rotate(45deg);
    pointer-events: none;
  }

  .garnish-modal-actions {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 9px;
  }

  .garnish-modal-actions button {
    min-width: 0;
    min-height: 43px;
    padding: 10px 12px;
    border: 1px solid transparent;
    border-radius: 9px;
    font: inherit;
    font-size: 0.82rem;
    font-weight: 800;
    cursor: pointer;
    transition:
      transform 0.15s ease,
      background 0.18s ease,
      border-color 0.18s ease;

    &:active {
      transform: scale(0.98);
    }
  }

  .garnish-confirm-button {
    background: var(--app-accent);
    color: var(--app-ink);
    &:hover {
      filter: brightness(0.97);
    }
  }

  .garnish-cancel-button {
    border-color: rgba(var(--app-shadow-rgb), 0.14) !important;
    background: var(--app-white);
    color: var(--app-primary-active);
    &:hover {
      border-color: rgba(var(--app-accent-rgb), 0.5) !important;
    }
  }

  @media (max-width: 500px) {
    padding: 21px;
    border-radius: 15px;

    h3 {
      font-size: 1.05rem;
    }
    .garnish-modal-icon {
      flex-basis: 41px;
      width: 41px;
      height: 41px;
      font-size: 1.25rem;
    }
    .garnish-modal-actions {
      grid-template-columns: 1fr;
    }
    .garnish-modal-actions button {
      min-height: 42px;
    }
  }
`;
