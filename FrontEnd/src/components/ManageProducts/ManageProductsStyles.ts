import styled from "styled-components";

export const ContainerManageProducts = styled.div`
  width: 100%;
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  box-sizing: border-box;
  color: var(--color-text);

  .category-strip {
    width: 100%;
    min-height: 48px;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 5px;
    overflow-x: auto;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 13px;
    box-shadow: var(--shadow-sm);
    scrollbar-width: none;

    button {
      flex: 0 0 auto;
      min-height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 14px;
      border: 0;
      border-right: 1px solid var(--color-border);
      border-radius: 0px;
      background: transparent;
      color: var(--color-primary);
      font: inherit;
      font-size: 0.82rem;
      cursor: pointer;
      white-space: nowrap;
      transition:
        background 0.18s ease,
        color 0.18s ease;
      svg {
        font-size: 0.95rem;
      }
      small {
        font-size: 0.72rem;
        opacity: 0.72;
      }
      &:hover {
        background: var(--color-surface-muted);
      }
      &.selected {
        background: var(--color-primary);
        color: var(--color-white);
        border-color: transparent;
      }
    }
  }

  .active {
    background-color: var(--color-success);
    color: var(--color-white);
  }
  .inactive {
    background-color: var(--color-danger);
    color: var(--color-white);
  }
  .buttonstock {
    background-color: var(--color-primary);
    color: var(--color-white);
  }

  .product-catalog-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 12px;
    align-content: start;
  }

  .product-visual-card {
    min-width: 0;
    overflow: hidden;
    border: 1px solid var(--color-border);
    border-radius: 14px;
    background: var(--color-surface);
    box-shadow: var(--shadow-sm);
    cursor: pointer;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease;
    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  }

  .product-visual-image {
    height: 112px;
    position: relative;
    background: var(--color-surface-muted);
  }
  .product-visual-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .stock-badge {
    position: absolute;
    top: 8px;
    left: 8px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 7px;
    border-radius: 20px;
    font-size: 0.65rem;
    font-weight: 800;
  }
  .stock-badge.available {
    background: var(--color-success-soft);
    color: var(--color-success);
  }
  .stock-badge.unavailable {
    background: var(--color-danger-soft);
    color: var(--color-danger);
  }
  .product-edit {
    position: absolute;
    right: 8px;
    top: 8px;
    width: 27px;
    height: 27px;
    display: grid;
    place-items: center;
    border: 0;
    border-radius: 7px;
    background: var(--color-surface);
    color: var(--color-primary);
    cursor: pointer;
  }
  .product-visual-content {
    padding: 9px 11px 10px;
  }
  .product-visual-content h3 {
    overflow: hidden;
    margin: 0;
    color: var(--color-text);
    font-size: 0.84rem;
    line-height: 1.25;
    font-weight: 800;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .product-description {
    min-height: 16px;
    overflow: hidden;
    margin: 3px 0 8px;
    color: var(--color-text-secondary);
    font-size: 0.68rem;
    line-height: 1.3;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .product-visual-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    padding-top: 7px;
    border-top: 1px solid var(--color-border);
  }
  .product-visual-footer strong {
    color: var(--color-primary);
    font-size: 0.82rem;
    white-space: nowrap;
  }
  .product-visual-footer span {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    color: var(--color-success);
    font-size: 0.66rem;
    font-weight: 700;
    white-space: nowrap;
  }
  .product-empty,
  .products-feedback {
    grid-column: 1 / -1;
    padding: 28px;
    text-align: center;
    color: var(--color-text-secondary);
    background: var(--color-surface);
    border: 1px dashed var(--color-border);
    border-radius: 14px;
  }
  .products-feedback.error {
    color: var(--color-danger);
  }

  @media (max-width: 1100px) {
    .product-catalog-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }
  @media (max-width: 760px) {
    .product-catalog-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 9px;
    }
    .product-visual-image {
      height: 110px;
    }
  }
  @media (max-width: 420px) {
    .product-catalog-grid {
      gap: 7px;
    }
    .product-visual-image {
      height: 90px;
    }
    .product-visual-content {
      padding: 8px;
    }
    .product-visual-content h3 {
      font-size: 0.75rem;
    }
    .product-description {
      font-size: 0.62rem;
    }
    .product-visual-footer {
      align-items: flex-start;
      flex-direction: column;
    }
  }
`;

export const AddProductButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  border: none;
  border-radius: 9px;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    filter 0.2s ease,
    transform 0.2s ease;
  &:hover {
    background-color: var(--color-primary-hover);
  }
  &:active {
    transform: scale(0.98);
  }
  svg {
    width: 15px;
    height: 15px;
  }
  @media (max-width: 600px) {
    width: 100%;
    padding: 11px 15px;
    font-size: 13px;
  }
`;

export const Filter = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  box-sizing: border-box;
  .product-search {
    min-width: 180px;
    height: 42px;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 0 12px;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-surface);
    color: var(--color-accent);
    box-sizing: border-box;
    &:focus-within {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 14%, transparent);
    }
    > svg {
      flex: 0 0 auto;
    }
    input {
      width: 100%;
      height: 100%;
      min-width: 0;
      border: 0;
      outline: 0;
      background: transparent;
      color: var(--color-primary);
      font: inherit;
      font-size: 0.84rem;
    }
    input::placeholder {
      color: var(--color-text-secondary);
    }
    button.clear-search {
      min-width: 28px;
      width: 28px;
      height: 28px;
      min-height: 28px;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--color-text-secondary);
    }
  }
  .select-filter {
    min-width: 125px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    color: var(--color-text-secondary);
    font-size: 0.7rem;
    font-weight: 700;
  }
  select {
    width: 100%;
    height: 42px;
    min-width: 0;
    padding: 0 12px;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-surface);
    color: var(--color-primary);
    font: inherit;
    font-size: 0.84rem;
    font-weight: 600;
    cursor: pointer;
    outline: none;
  }
  button.bulk-stock {
    min-height: 42px;
    margin-left: auto;
    padding: 0 15px;
    border: 1px solid var(--color-primary);
    border-radius: 10px;
    background: var(--color-surface);
    color: var(--color-primary);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 700;
    white-space: nowrap;
    cursor: pointer;
  }
  button.new-product,
  button.print-products {
    min-height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    padding: 0 14px;
    border: 0;
    border-radius: 10px;
    background: var(--color-primary);
    color: var(--color-white);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 700;
    white-space: nowrap;
    cursor: pointer;
  }
  button.print-products {
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-primary);
  }
  @media (max-width: 1200px) {
    flex-wrap: wrap;
    align-items: stretch;
    .product-search {
      flex: 1 1 100%;
    }
    .select-filter {
      flex: 1 1 calc(50% - 5px);
    }
    button.bulk-stock,
    button.new-product,
    button.print-products {
      flex: 1 1 calc(33.333% - 7px);
      min-width: 0;
      margin-left: 0;
    }
  }

  @media (max-width: 760px) {
    
    button.new-product,
    button.print-products {
      flex: 1 1 calc(50% - 5px);
    }
    button.bulk-stock{
      display: none;
    }
  }
`;

// =========================================================
// OPCIONES DEL PRODUCTO
// =========================================================

export const ProductOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;
  width: 100%;
  min-width: 0;
  min-height: 100%;
  box-sizing: border-box;

  @media (max-width: 600px) {
    gap: 17px;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  h3 {
    margin: 0 0 3px;
    color: var(--color-text);
    font-size: clamp(1.1rem, 2vw, 1.35rem);
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.02em;
  }

  p {
    margin: 0;
    color: var(--color-text);
    font-size: 0.9rem;
    line-height: 1.55;
  }

  > img {
    display: block;
    width: 100%;
    max-height: 260px;
    min-height: 170px;
    object-fit: cover;
    object-position: center;
    border: 1px solid var(--color-border);
    border-radius: 15px;
    background: var(--color-surface-muted);
  }

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    min-height: 50px;
    padding: 12px 15px;
    box-sizing: border-box;
    border: 1px solid color-mix(in srgb, var(--color-accent) 45%, transparent);
    border-radius: 12px;
    background: var(--color-surface-muted);

    span {
      color: var(--color-text);
      font-size: 0.88rem;
      line-height: 1.4;
    }

    strong {
      color: var(--color-primary);
      font-size: 0.95rem;
      font-weight: 800;
      text-align: right;
      overflow-wrap: anywhere;
    }
  }

  > strong {
    color: var(--color-primary);
    font-size: 0.95rem;
    font-weight: 750;
  }

  @media (max-width: 500px) {
    gap: 10px;

    > img {
      min-height: 145px;
      max-height: 205px;
    }

    > div {
      min-height: 46px;
      padding: 10px 12px;
      gap: 10px;

      span,
      strong {
        font-size: 0.82rem;
      }
    }
  }
`;

export const ProductActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
  box-sizing: border-box;

  > div {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
    width: 100%;
  }

  button {
    flex: 0 1 auto;
    min-width: 145px;
  }

  @media (max-width: 520px) {
    align-items: stretch;

    > div {
      flex-direction: column;
    }

    button {
      width: 100%;
      min-width: 0;
    }
  }
`;



export const BulkStockContainer = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  gap: 14px;

  color: var(--color-primary);

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
    color: var(--color-primary);
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
  border: 1px solid var(--color-primary-soft);
  border-radius: 10px;
  background: var(--color-white);
  color: var(--color-primary);
  font: inherit;
  font-size: 0.9rem;
  outline: none;
  cursor: pointer;

  &:focus-visible {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 16%, transparent);
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
  background: var(--color-surface-muted);
  color: var(--color-primary);
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
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-white);

  .bulk-product-info {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .bulk-product-info strong {
    overflow-wrap: anywhere;
    color: var(--color-primary);
    font-size: 0.88rem;
    font-weight: 700;
  }

  .bulk-product-info span,
  .bulk-quantity span {
    color: var(--color-text);
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
  border: 1px solid var(--color-primary-soft);
  border-radius: 8px;
  background: var(--color-white);
  color: var(--color-primary);
  font: inherit;
  font-size: 0.95rem;
  font-weight: 700;
  text-align: center;

  &:focus-visible {
    outline: 3px solid color-mix(in srgb, var(--color-accent) 25%, transparent);
    border-color: var(--color-accent);
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

// =========================================================
// CONTENEDOR PRINCIPAL DEL PRODUCTO
// =========================================================

export const ProductModalLayout = styled.div`
  display: grid;
  grid-template-columns: 355px minmax(0, 1fr);
  grid-template-rows: auto auto auto auto;

  column-gap: 30px;
  row-gap: 25px;

  width: 100%;
  min-width: 0;
  padding: 0;

  box-sizing: border-box;

  color: var(--color-primary);

  @media (max-width: 1050px) {
    grid-template-columns: 290px minmax(0, 1fr);
    column-gap: 20px;
    row-gap: 20px;
  }

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 20px;
  }
`;

// =========================================================
// PRESENTACIÓN PRINCIPAL
// =========================================================

export const ProductHero = styled.div`
  display: contents;
`;

// =========================================================
// IMAGEN DEL PRODUCTO
// =========================================================

export const ProductImage = styled.div`
  grid-column: 1;
  grid-row: 1 / 3;

  position: relative;

  width: 100%;
  height: 310px;
  min-width: 0;

  overflow: hidden;

  border: 1px solid var(--color-border);
  border-radius: 18px;

  background: var(--color-surface-muted);

  box-sizing: border-box;

  img {
    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;
    object-position: center;

    transition: transform 250ms ease;
  }

  &:hover img {
    transform: scale(1.025);
  }

  @media (max-width: 1050px) {
    height: 280px;
  }

  @media (max-width: 750px) {
    grid-column: 1;
    grid-row: auto;

    height: 280px;
    max-width: 100%;
  }

  @media (max-width: 480px) {
    height: 220px;
  }
`;

// =========================================================
// INFORMACIÓN PRINCIPAL
// =========================================================

export const ProductMainInfo = styled.div`
  grid-column: 2;
  grid-row: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;

  gap: 15px;

  min-width: 0;
  min-height: 145px;

  box-sizing: border-box;

  h2 {
    margin: 0;

    color: var(--color-primary);

    font-size: clamp(1.8rem, 3vw, 2.55rem);
    font-weight: 850;

    line-height: 1.12;
    letter-spacing: -0.035em;

    overflow-wrap: anywhere;
  }

  .product-labels {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    gap: 12px;
  }

  .category {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    gap: 10px;

    min-height: 45px;
    padding: 0 19px;

    border-radius: 30px;

    background: var(--color-surface-muted);
    color: var(--color-primary);

    font-size: 0.98rem;
    font-weight: 750;

    white-space: nowrap;

    svg {
      font-size: 1.05rem;
    }
  }

  .product-summary {
    max-width: 680px;

    margin: 0;

    color: var(--color-primary);

    font-size: 1.05rem;
    font-weight: 450;

    line-height: 1.5;

    overflow-wrap: anywhere;
  }

  @media (max-width: 1050px) {
    gap: 12px;

    h2 {
      font-size: 1.8rem;
    }

    .category {
      min-height: 40px;
      padding: 0 14px;
      font-size: 0.86rem;
    }

    .product-summary {
      font-size: 0.92rem;
    }
  }

  @media (max-width: 750px) {
    grid-column: 1;
    grid-row: auto;

    min-height: auto;

    h2 {
      font-size: 1.9rem;
    }
  }
`;

// =========================================================
// ESTADO DEL PRODUCTO
// =========================================================

export const ProductStatusBadge = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 9px;

  min-height: 45px;
  padding: 0 19px;

  border-radius: 30px;

  background: ${({ $active }) =>
    $active ? "var(--color-success-soft)" : "var(--color-danger-soft)"};

  color: ${({ $active }) => ($active ? "var(--color-success)" : "var(--color-danger)")};

  font-size: 0.98rem;
  font-weight: 800;

  white-space: nowrap;

  svg {
    font-size: 1.05rem;
  }

  @media (max-width: 1050px) {
    min-height: 40px;
    padding: 0 14px;
    font-size: 0.86rem;
  }
`;

// =========================================================
// MÉTRICAS DEL PRODUCTO
// =========================================================

export const ProductMetrics = styled.div`
  grid-column: 2;
  grid-row: 2;

  display: grid;

  grid-template-columns: repeat(4, minmax(0, 1fr));

  gap: 13px;

  width: 100%;
  min-width: 0;

  box-sizing: border-box;

  @media (max-width: 1150px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 750px) {
    grid-column: 1;
    grid-row: auto;

    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

// =========================================================
// TARJETA INDIVIDUAL DE MÉTRICA
// =========================================================

export const ProductMetric = styled.div`
  display: flex;
  align-items: center;

  gap: 13px;

  min-width: 0;
  min-height: 105px;

  padding: 15px;

  box-sizing: border-box;

  border: 1px solid var(--color-border);
  border-radius: 17px;

  background: var(--color-surface-muted);

  > svg {
    flex-shrink: 0;

    color: var(--color-accent);

    font-size: 2rem;
  }

  > div {
    display: flex;
    flex-direction: column;

    justify-content: center;

    gap: 8px;

    min-width: 0;
  }

  span {
    color: var(--color-text);

    font-size: 0.88rem;
    font-weight: 500;

    line-height: 1.25;
  }

  strong {
    color: var(--color-primary);

    font-size: 1.08rem;
    font-weight: 850;

    line-height: 1.2;

    overflow-wrap: anywhere;
  }

  @media (max-width: 1050px) {
    min-height: 85px;
    padding: 12px;

    gap: 10px;

    > svg {
      font-size: 1.55rem;
    }

    span {
      font-size: 0.78rem;
    }

    strong {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 420px) {
    min-height: 75px;
  }
`;

// =========================================================
// SECCIONES DE INGREDIENTES Y GUARNICIONES
// =========================================================

export const ProductDetailSections = styled.div`
  grid-column: 1 / -1;
  grid-row: 3;

  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 20px;

  width: 100%;
  min-width: 0;

  box-sizing: border-box;

  @media (max-width: 750px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

// =========================================================
// TARJETAS DE DETALLES
// =========================================================

export const ProductDetailCard = styled.section`
  display: flex;
  flex-direction: column;

  gap: 17px;

  width: 100%;
  min-width: 0;
  min-height: 145px;

  padding: 20px 24px;

  box-sizing: border-box;

  border: 1px solid var(--color-border);
  border-radius: 18px;

  background: var(--color-surface);

  h3 {
    display: flex;
    align-items: center;

    gap: 14px;

    margin: 0;

    color: var(--color-primary);

    font-size: 1.3rem;
    font-weight: 850;

    line-height: 1.3;

    svg {
      flex-shrink: 0;

      color: var(--color-accent);

      font-size: 1.55rem;
    }
  }

  p {
    display: flex;
    align-items: center;

    min-height: 58px;

    margin: 0;
    padding: 12px 17px;

    box-sizing: border-box;

    border-radius: 13px;

    background: var(--color-surface-muted);

    color: var(--color-primary);

    font-size: 0.98rem;
    line-height: 1.5;
  }

  @media (max-width: 750px) {
    min-height: 120px;
    padding: 17px;

    h3 {
      font-size: 1.1rem;
    }

    p {
      min-height: 48px;
      font-size: 0.88rem;
    }
  }
`;

// =========================================================
// LISTA DE INGREDIENTES Y GUARNICIONES
// =========================================================

export const ProductChipList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 10px;

  width: 100%;
  min-width: 0;
`;

// =========================================================
// ETIQUETA INDIVIDUAL
// =========================================================

export const ProductChip = styled.span`
  display: inline-flex;
  align-items: center;

  gap: 9px;

  min-height: 38px;

  padding: 8px 14px;

  box-sizing: border-box;

  border: 1px solid var(--color-border);
  border-radius: 30px;

  background: var(--color-surface-muted);

  color: var(--color-primary);

  font-size: 0.88rem;
  font-weight: 650;

  svg {
    flex-shrink: 0;

    color: var(--color-accent);

    font-size: 0.85rem;
  }
`;

// =========================================================
// DESCRIPCIÓN DEL PRODUCTO
// =========================================================

export const ProductDescription = styled.section`
  grid-column: 1 / -1;
  grid-row: 4;

  display: flex;
  flex-direction: column;

  gap: 15px;

  width: 100%;
  min-width: 0;

  padding: 20px 24px;

  box-sizing: border-box;

  border: 1px solid var(--color-border);
  border-radius: 18px;

  background: var(--color-surface);

  h3 {
    display: flex;
    align-items: center;

    gap: 14px;

    margin: 0;

    color: var(--color-primary);

    font-size: 1.3rem;
    font-weight: 850;

    svg {
      flex-shrink: 0;

      color: var(--color-accent);

      font-size: 1.5rem;
    }
  }

  p {
    display: block;

    width: 100%;
    min-height: 62px;

    margin: 0;
    padding: 14px 20px;

    box-sizing: border-box;

    border-radius: 13px;

    background: var(--color-surface-muted);

    color: var(--color-primary);

    font-size: 1rem;
    line-height: 1.55;

    overflow-wrap: anywhere;
  }

  @media (max-width: 750px) {
    padding: 17px;

    h3 {
      font-size: 1.1rem;
    }

    p {
      min-height: 50px;
      padding: 12px;
      font-size: 0.88rem;
    }
  }
`;
