import styled from "styled-components";

export const ProductsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: clamp(12px, 1.8vw, 24px);

  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: var(--color-surface);
  box-shadow: var(--shadow-md);

  overflow: visible;
`;

export const ProductsHeader = styled.header`
  display: grid;
  grid-template-columns: minmax(130px, 0.65fr) minmax(220px, 1fr);
  align-items: center;
  gap: 14px;

  h3 {
    margin: 0;
    color: var(--color-text);
    font-size: clamp(1.2rem, 1.8vw, 1.55rem);
    font-weight: 850;
    letter-spacing: -0.035em;
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
    gap: 9px;
  }
`;

/* =====================================================
   BARRA DE BÚSQUEDA Y FILTROS
===================================================== */

export const ProductsToolbar = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(200px, 0.8fr);
  align-items: center;
  gap: 14px;
  width: 100%;
  min-width: 0;

  @media (max-width: 650px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  min-width: 0;
  height: 50px;
  box-sizing: border-box;

  padding: 0 17px;

  border: 1px solid var(--color-border-strong) !important;
  border-radius: 13px !important;

  background: var(--color-surface) !important;
  color: var(--color-text);

  font-size: 0.95rem;
  font-weight: 500;

  transition:
    border-color 180ms ease,
    box-shadow 180ms ease,
    background 180ms ease;

  &::placeholder {
    color: var(--color-text-light);
  }

  &:hover {
    border-color: var(--color-accent) !important;
  }

  &:focus {
    outline: none;
    border-color: var(--color-accent) !important;
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }
`;

export const CategorySelect = styled.select`
  width: 100%;
  min-width: 0;
  height: 50px;
  box-sizing: border-box;

  padding: 0 15px;

  border: 1px solid var(--color-border-strong) !important;
  border-radius: 13px !important;

  background: var(--color-surface) !important;
  color: var(--color-text);

  font-size: 0.92rem;
  font-weight: 750;

  cursor: pointer;

  transition:
    border-color 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    border-color: var(--color-accent) !important;
  }

  &:focus {
    outline: none;
    border-color: var(--color-accent) !important;
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }
`;

/* =====================================================
   GRILLA RESPONSIVE
===================================================== */

export const ProductGrid = styled.div`
  display: grid;

  /*
    Cada tarjeta necesita un mínimo de 250px.
    La cantidad de columnas se calcula automáticamente
    según el espacio disponible.
  */

  grid-template-columns: repeat(
    auto-fill,
    minmax(min(100%, 250px), 1fr)
  );

  grid-auto-rows: minmax(310px, auto);

  align-items: stretch;
  align-content: start;

  gap: 18px;

  width: 100%;
  min-width: 0;
  min-height: 0;

  padding: 2px;

  box-sizing: border-box;

  overflow: visible;

  @media (max-width: 650px) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(min(100%, 220px), 1fr)
    );

    grid-auto-rows: minmax(285px, auto);
    gap: 13px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 12px;
  }
`;

/* =====================================================
   CONTROLES DE CANTIDAD
===================================================== */

export const ProductQuantityControls = styled.div`
  display: grid;

  grid-template-columns: 42px minmax(30px, 1fr) 42px;

  align-items: center;
  justify-items: center;

  gap: 8px;

  width: 100%;
  min-width: 0;
  min-height: 44px;

  box-sizing: border-box;

  padding: 4px 6px;

  border: 1px solid var(--color-border);
  border-radius: 11px;

  background: var(--color-surface-hover);

  strong {
    color: var(--color-primary);

    font-size: 1rem;
    font-weight: 900;

    line-height: 1;
  }

  > button {
    display: grid;
    place-items: center;

    width: 38px;
    height: 36px;
    min-height: 36px;

    margin: 0;
    padding: 0;

    border: 1px solid var(--color-accent);
    border-radius: 9px;

    background: var(--color-accent);
    color: var(--color-white);

    font-size: 1.35rem;
    font-weight: 850;

    line-height: 1;

    cursor: pointer;

    transition:
      background 180ms ease,
      transform 180ms ease;

    &:hover:not(:disabled) {
      background: var(--color-primary-hover);
      transform: scale(1.04);
    }

    &:active:not(:disabled) {
      transform: scale(0.94);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &:focus-visible {
      outline: 3px solid var(--color-primary-soft);
      outline-offset: 2px;
    }
  }
`;

/* =====================================================
   TARJETA DE PRODUCTO
===================================================== */

export const ProductCard = styled.article`
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 100%;
  min-width: 0;
  min-height: 310px;
  height: 100%;

  box-sizing: border-box;

  padding: 11px;

  overflow: hidden;

  border: 1px solid var(--color-border);
  border-radius: 17px;

  background: var(--color-surface);

  box-shadow: var(--shadow-sm);

  transition:
    transform 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease;

  &:hover {
    transform: translateY(-3px);

    border-color: var(--color-accent);

    box-shadow: var(--shadow-md);
  }

  /* Imagen del producto */

  .product-header {
    position: relative;

    flex: 0 0 auto;

    width: 100%;

    aspect-ratio: 16 / 9;

    overflow: hidden;

    border-radius: 12px;

    isolation: isolate;

    background: var(--color-surface-hover);
  }

  .product-header::after {
    content: "";

    position: absolute;
    inset: 35% 0 0;

    z-index: 0;

    pointer-events: none;

    background: linear-gradient(
      180deg,
      transparent 0%,
      var(--modal-overlay) 100%
    );
  }

  .product-image {
    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;

    background: var(--color-surface-hover);

    transition: transform 250ms ease;
  }

  &:hover .product-image {
    transform: scale(1.045);
  }

  /* Nombre sobre la imagen */

  .product-title,
  .product-header h4 {
    position: absolute;

    z-index: 1;

    right: 10px;
    bottom: 10px;
    left: 10px;

    margin: 0;

    color: var(--color-white);

    font-size: clamp(0.85rem, 1vw, 1rem);
    font-weight: 850;

    line-height: 1.25;

    text-align: center;

    text-shadow: 0 2px 5px var(--shadow-md);

    overflow-wrap: anywhere;
  }

  /* Ingredientes no disponibles */

  .unavailable-ingredients {
    position: absolute;

    z-index: 3;

    top: 15px;
    left: 15px;

    display: inline-flex;
    align-items: center;
    gap: 6px;

    max-width: calc(100% - 30px);

    padding: 6px 10px;

    border: 1px solid var(--color-border-strong);
    border-radius: 999px;

    background: var(--color-danger);
    color: var(--color-white);

    box-shadow: var(--shadow-sm);

    font-size: 0.7rem;
    font-weight: 800;

    overflow-wrap: anywhere;

    span {
      display: grid;
      place-items: center;

      flex: 0 0 15px;

      width: 15px;
      height: 15px;

      border-radius: 50%;

      background: var(--color-surface-muted);

      font-size: 0.65rem;
    }
  }

  /* Información del producto */

  .product-info {
    display: flex;
    flex: 1 1 auto;

    flex-direction: column;
    align-items: center;
    justify-content: center;

    gap: 9px;

    min-width: 0;

    padding: 13px 5px 12px;

    text-align: center;
  }

  /* Stock */

  .product-stock {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    gap: 7px;

    color: var(--color-text-light);

    font-size: 0.76rem;
    font-weight: 650;
  }

  .stock-indicator {
    flex: 0 0 8px;

    width: 8px;
    height: 8px;

    border-radius: 50%;

    background: var(--color-accent);
  }

  /* Nombre y descripción de promociones */

  .product-name {
    display: grid;

    width: 100%;

    gap: 5px;
  }

  .product-name h4 {
    margin: 0;

    color: var(--color-text);

    font-size: 0.95rem;
    font-weight: 850;

    line-height: 1.3;

    overflow-wrap: anywhere;
  }

  .product-name small {
    color: var(--color-text-light);

    font-size: 0.76rem;
    line-height: 1.45;
  }

  /* Precio */

  .product-price {
    color: var(--color-primary);

    font-size: clamp(1.2rem, 1.4vw, 1.45rem);
    font-weight: 900;

    letter-spacing: -0.035em;
  }

  /* Botón agregar */

  > button.product-action {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 44px;

    flex: 0 0 auto;

    margin-top: auto;
    padding: 10px 13px;

    border: 1px solid var(--color-accent);
    border-radius: 11px;

    background: var(--color-accent);
    color: var(--color-white);

    font-size: 0.85rem;
    font-weight: 850;

    cursor: pointer;

    transition:
      background 180ms ease,
      border-color 180ms ease,
      transform 180ms ease,
      box-shadow 180ms ease;

    &:hover:not(:disabled) {
      border-color: var(--color-primary-hover);

      background: var(--color-primary-hover);

      transform: translateY(-1px);

      box-shadow: var(--shadow-sm);
    }

    &:active:not(:disabled) {
      transform: scale(0.98);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.4;
    }

    &:focus-visible {
      outline: 3px solid var(--color-primary-soft);
      outline-offset: 3px;
    }
  }

  /* Controles de cantidad */

  ${ProductQuantityControls} {
    margin-top: auto;
  }

  /* Productos con guarniciones */

  .garnish-order-line {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 8px;

    width: 100%;
    min-width: 0;

    margin-top: 8px;
    padding-top: 9px;

    border-top: 1px solid var(--color-border);

    color: var(--color-text-secondary);

    font-size: 0.76rem;

    > span {
      min-width: 0;
      overflow-wrap: anywhere;
      font-weight: 700;
    }

    ${ProductQuantityControls} {
      width: auto;

      grid-template-columns: 32px minmax(20px, 1fr) 32px;

      gap: 5px;

      min-height: 36px;

      padding: 2px 4px;

      flex: 0 0 auto;

      > button {
        width: 30px;
        height: 30px;
        min-height: 30px;

        border-radius: 8px;

        font-size: 1.1rem;
      }
    }
  }

  @media (max-width: 650px) {
    min-height: 285px;
    padding: 9px;

    .product-info {
      padding: 10px 4px;
      gap: 7px;
    }

    .product-price {
      font-size: 1.15rem;
    }
  }

  @media (max-width: 480px) {
    min-height: 0;
    height: auto;

    .product-header {
      aspect-ratio: 16 / 8.5;
    }
  }
`;



/* =====================================================
   MODALES
===================================================== */

export const ModalOverlay = styled.div`
  position: fixed;

  z-index: 1500;

  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow-y: auto;

  padding: 20px;

  background: var(--modal-overlay);

  backdrop-filter: blur(7px);
`;

export const PromotionModal = styled.div`
  display: grid;
  gap: 14px;

  width: min(100%, 440px);

  padding: clamp(20px, 4vw, 28px);

  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);

  background: var(--color-surface);

  box-shadow: var(--shadow-lg);

  h3 {
    margin: 0;

    color: var(--color-primary);

    font-size: 1.25rem;
    font-weight: 900;
  }

  p {
    margin: 0;

    color: var(--color-text-secondary);

    font-size: 0.92rem;
    line-height: 1.6;
  }

  button {
    min-height: 44px;

    padding: 10px 15px;

    border: 1px solid var(--color-primary);
    border-radius: var(--radius-sm);

    background: var(--color-primary);
    color: var(--color-white);

    font-weight: 850;

    cursor: pointer;

    transition: background 180ms ease;

    &:hover {
      background: var(--color-primary-hover);
    }
  }

  .cancel-button {
    border-color: var(--color-border);

    background: var(--color-surface);
    color: var(--color-text-secondary);

    &:hover {
      background: var(--color-surface-hover);
    }
  }
`;

export const GarnishModal = styled.div`
  width: min(100%, 490px);

  padding: clamp(20px, 4vw, 28px);

  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);

  background: var(--color-surface);

  box-shadow: var(--shadow-lg);

  .garnish-modal-top {
    display: flex;
    align-items: flex-start;

    gap: 13px;

    margin-bottom: 22px;
  }

  .garnish-modal-icon {
    display: grid;
    place-items: center;

    flex: 0 0 46px;

    width: 46px;
    height: 46px;

    border-radius: 14px;

    background: var(--color-primary-soft);
    color: var(--color-primary);

    font-size: 1.4rem;
  }

  .garnish-modal-heading h3 {
    margin: 0 0 5px;

    color: var(--color-text);

    font-size: 1.15rem;
    font-weight: 850;
  }

  .garnish-modal-subtitle {
    display: grid;
    gap: 4px;

    margin: 0;

    color: var(--color-text-light);

    font-size: 0.86rem;
    line-height: 1.5;
  }

  .garnish-product-name {
    color: var(--color-primary);
    font-weight: 850;
  }

  .garnish-field-label {
    display: block;

    margin-bottom: 8px;

    color: var(--color-text-secondary);

    font-size: 0.84rem;
    font-weight: 800;
  }

  .garnish-select-wrap {
    position: relative;
  }

  .garnish-select {
    width: 100%;
    min-height: 46px;

    box-sizing: border-box;

    padding: 10px 13px;

    border: 1px solid var(--color-border-strong) !important;
    border-radius: var(--radius-sm) !important;

    background: var(--color-surface) !important;
    color: var(--color-text);

    font-size: 0.9rem;

    cursor: pointer;

    &:focus {
      outline: none;

      border-color: var(--color-accent) !important;

      box-shadow: 0 0 0 3px var(--color-primary-soft);
    }
  }

  .garnish-modal-actions {
    display: flex;
    justify-content: flex-end;

    flex-wrap: wrap;

    gap: 9px;

    margin-top: 23px;
  }

  .garnish-modal-actions button {
    min-height: 43px;

    padding: 9px 16px;

    border: 1px solid var(--color-primary);
    border-radius: var(--radius-sm);

    background: var(--color-primary);
    color: var(--color-white);

    font-size: 0.85rem;
    font-weight: 850;

    cursor: pointer;

    transition: background 180ms ease;

    &:hover:not(:disabled) {
      background: var(--color-primary-hover);
    }
  }

  .garnish-modal-actions .garnish-cancel-button {
    border-color: var(--color-border);

    background: var(--color-surface);
    color: var(--color-text-secondary);

    &:hover {
      background: var(--color-surface-hover);
    }
  }

  .garnish-modal-actions button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (max-width: 460px) {
    .garnish-modal-actions {
      flex-direction: column-reverse;
    }

    .garnish-modal-actions button {
      width: 100%;
    }
  }
`;

/* =====================================================
   PESTAÑAS DE TIPO DE PRODUCTO
===================================================== */

export const ProductTypeTabs = styled.nav`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 0;

  min-height: 53px;

  flex: 0 0 auto;

  overflow: hidden;

  border: 1px solid var(--color-border);
  border-radius: 13px;

  background: var(--color-surface-hover);
`;

export const ProductTypeTab = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 10px;

  min-width: 0;

  padding: 10px 12px;

  border: 1px solid
    ${({ $active }) =>
      $active ? "var(--color-primary)" : "transparent"};

  border-radius: 11px;

  background: ${({ $active }) =>
    $active ? "var(--color-primary)" : "transparent"};

  color: ${({ $active }) =>
    $active ? "var(--color-white)" : "var(--color-primary)"};

  font-size: 1rem;
  font-weight: 900;

  transition: var(--transition-normal);

  cursor: pointer;

  span {
    font-size: 1.25rem;
    line-height: 1;
  }

  &:hover {
    background: ${({ $active }) =>
      $active
        ? "var(--color-primary-hover)"
        : "var(--color-primary-soft)"};
  }
`;