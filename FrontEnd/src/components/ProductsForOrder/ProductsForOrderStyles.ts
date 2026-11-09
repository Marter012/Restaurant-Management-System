import styled from "styled-components";

export const ProductsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  height: 100%;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  padding: clamp(12px, 1.5vw, 20px);
  border: 1px solid var(--color-border);
  border-radius: 22px;
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  overflow: hidden;
`;

export const ProductsHeader = styled.header`
  display: grid;
  grid-template-columns: minmax(130px, 0.65fr) minmax(220px, 1fr);
  align-items: center;
  gap: 14px;
  flex: 0 0 auto;

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

export const SearchInput = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 46px;
  padding: 10px 15px;
  border: 1px solid var(--color-border-strong) !important;
  border-radius: 13px !important;
  background: var(--color-surface) !important;
  color: var(--color-text);
  font-size: 0.9rem;

  &::placeholder {
    color: var(--color-text-light);
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
  min-height: 46px;
  padding: 9px 13px;
  border: 1px solid var(--color-border-strong) !important;
  border-radius: 13px !important;
  background: var(--color-surface) !important;
  color: var(--color-text);
  font-weight: 700;
`;

export const ProductsToolbar = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(180px, 0.75fr);
  gap: 12px;
  min-width: 0;
  flex: 0 0 auto;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-auto-rows: minmax(240px, auto);
  align-content: start;
  align-items: stretch;
  gap: 12px;
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 2px 5px 5px 2px;
  scrollbar-width: thin;
  scrollbar-color: var(--color-accent) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-accent);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 1050px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 760px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-auto-rows: minmax(220px, auto);
    gap: 9px;
  }

  @media (max-width: 350px) {
    grid-template-columns: 1fr;
  }
`;

export const ProductQuantityControls = styled.div`
  display: grid;
  grid-template-columns: 38px minmax(24px, 1fr) 38px;
  align-items: center;
  justify-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  min-height: 42px;
  margin-top: auto;
  padding: 3px 5px;
  border: 1px solid var(--color-border);
  border-radius: 13px;
  background: var(--color-surface-hover);
  box-sizing: border-box;

  strong {
    color: var(--color-primary);
    font-size: 0.95rem;
    font-weight: 900;
    line-height: 1;
  }

  > button {
    display: grid;
    place-items: center;
    width: 36px;
    height: 34px;
    min-height: 34px;
    margin: 0;
    padding: 0;
    border: 1px solid var(--color-accent);
    border-radius: 9px;
    background: var(--color-accent);
    color: var(--color-white);
    font-size: 1.35rem;
    font-weight: 800;
    line-height: 1;
    cursor: pointer;
    transition: background var(--transition-normal), transform var(--transition-normal);

    &:hover:not(:disabled) {
      background: var(--color-primary-hover);
      transform: translateY(-1px);
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

export const ProductCard = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  min-width: 0;
  min-height: 240px;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 9px;
  border: 1px solid var(--color-border);
  border-radius: 17px;
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-accent);
    box-shadow: var(--shadow-md);
  }

  .product-header {
    position: relative;
    flex: 0 0 auto;
    width: 100%;
    overflow: hidden;
    border-radius: 13px;
    isolation: isolate;
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
    height: 115px;
    min-height: 115px;
    object-fit: cover;
    background: var(--color-surface-hover);
    transition: transform 220ms ease;
  }

  &:hover .product-image {
    transform: scale(1.035);
  }

  .product-title,
  .product-header h4 {
    position: absolute;
    z-index: 1;
    right: 8px;
    bottom: 8px;
    left: 8px;
    margin: 0;
    color: var(--color-white);
    font-size: clamp(0.78rem, 1vw, 0.95rem);
    font-weight: 850;
    line-height: 1.2;
    text-align: center;
    text-shadow: 0 1px 4px var(--shadow-md);
    overflow-wrap: anywhere;
  }

  .unavailable-ingredients {
    position: absolute;
    z-index: 3;
    top: 8px;
    left: 8px;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    max-width: calc(100% - 16px);
    padding: 5px 9px;
    border: 1px solid var(--color-border-strong);
    border-radius: 999px;
    background: var(--color-danger);
    color: var(--color-white);
    box-shadow: 0 2px 8px var(--shadow-sm);
    font-size: 0.68rem;
    font-weight: 850;
    line-height: 1.15;
    overflow-wrap: anywhere;

    span {
      display: grid;
      place-items: center;
      flex: 0 0 14px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: var(--color-surface-muted);
      font-size: 0.65rem;
    }
  }

  .product-info {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-width: 0;
    padding: 9px 2px 8px;
    text-align: center;
  }

  .product-stock {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--color-text-light);
    font-size: 0.72rem;
    font-weight: 650;
  }

  .stock-indicator {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-accent);
  }

  .product-name {
    display: grid;
    width: 100%;
  }

  .product-name h4 {
    margin: 0;
    color: var(--color-text);
    font-size: clamp(0.78rem, 0.95vw, 0.94rem);
    font-weight: 850;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }

  .product-name small {
    color: var(--color-text-light);
    font-size: 0.69rem;
    line-height: 1.35;
  }

  .product-price {
    color: var(--color-primary);
    font-size: 1.12rem;
    font-weight: 900;
    letter-spacing: -0.025em;
  }

  > button.product-action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 38px;
    flex: 0 0 auto;
    margin-top: auto;
    padding: 8px 10px;
    border: 1px solid var(--color-accent);
    border-radius: 10px;
    background: var(--color-accent);
    color: var(--color-white);
    font-size: 0.76rem;
    font-weight: 850;
    text-transform: capitalize;
    cursor: pointer;
    transition: background var(--transition-normal), transform var(--transition-normal);

    &:hover:not(:disabled) {
      border-color: var(--color-primary-hover);
      background: var(--color-primary-hover);
      transform: translateY(-1px);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.45;
    }
  }

  ${ProductQuantityControls} {
    margin-top: auto;
  }

  .garnish-order-line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    width: 100%;
    margin-top: 7px;
    padding-top: 7px;
    border-top: 1px solid var(--color-border);
    color: var(--color-text-secondary);
    font-size: 0.68rem;

    ${ProductQuantityControls} {
      width: auto;
      grid-template-columns: 30px minmax(16px, 1fr) 30px;
      gap: 4px;
      min-height: 34px;
      padding: 2px 3px;

      > button {
        width: 29px;
        height: 28px;
        min-height: 28px;
        border-radius: 7px;
        font-size: 1.1rem;
      }
    }
  }

  @media (max-width: 700px) {
    min-height: 220px;
    padding: 8px;

    .product-image {
      height: 95px;
      min-height: 95px;
    }

    .product-price {
      font-size: 1rem;
    }

    ${ProductQuantityControls} {
      grid-template-columns: 34px minmax(20px, 1fr) 34px;
      gap: 5px;
    }

    ${ProductQuantityControls} > button {
      width: 32px;
      height: 32px;
      min-height: 32px;
    }
  }
`;

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
  gap: 13px;
  width: min(100%, 440px);
  padding: 25px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);

  h3 {
    margin: 0;
    color: var(--color-primary);
  }

  p {
    margin: 0;
    color: var(--color-text-secondary);
    line-height: 1.6;
  }

  button {
    min-height: 42px;
    padding: 10px 14px;
    border: 1px solid var(--color-primary);
    border-radius: var(--radius-sm);
    background: var(--color-primary);
    color: var(--color-white);
    font-weight: 800;
  }

  button:hover {
    background: var(--color-primary-hover);
  }

  .cancel-button {
    border-color: var(--color-border);
    background: var(--color-surface);
    color: var(--color-text-secondary);
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
  }

  .garnish-modal-subtitle {
    display: grid;
    gap: 3px;
    margin: 0;
    color: var(--color-text-light);
    font-size: 0.86rem;
  }

  .garnish-product-name {
    color: var(--color-primary);
    font-weight: 850;
  }

  .garnish-field-label {
    display: block;
    margin-bottom: 7px;
    color: var(--color-text-secondary);
    font-size: 0.82rem;
    font-weight: 800;
  }

  .garnish-select-wrap {
    position: relative;
  }

  .garnish-select {
    width: 100%;
    min-height: 46px;
    padding: 10px 13px;
    border: 1px solid var(--color-border-strong) !important;
    border-radius: var(--radius-sm) !important;
    background: var(--color-surface) !important;
  }

  .garnish-modal-actions {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 9px;
    margin-top: 23px;
  }

  .garnish-modal-actions button {
    min-height: 42px;
    padding: 9px 15px;
    border: 1px solid var(--color-primary);
    border-radius: var(--radius-sm);
    background: var(--color-primary);
    color: var(--color-white);
    font-weight: 800;
  }

  .garnish-modal-actions .garnish-cancel-button {
    border-color: var(--color-border);
    background: var(--color-surface);
    color: var(--color-text-secondary);
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
    ${({ $active }) => ($active ? "var(--color-primary)" : "transparent")};
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
      $active ? "var(--color-primary-hover)" : "var(--color-primary-soft)"};
  }
`;
