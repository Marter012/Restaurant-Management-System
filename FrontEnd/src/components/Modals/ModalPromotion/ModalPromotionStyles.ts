import styled from "styled-components";

// =========================================================
// VISTA GENERAL DE LA PROMOCIÓN
// =========================================================

export const PromotionOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  color: var(--app-ink);

  .promotion-overview {
    display: grid;
    grid-template-columns: minmax(220px, 0.42fr) minmax(0, 0.9fr) minmax(180px, 0.48fr);
    align-items: center;
    gap: 24px;
    width: 100%;
    min-width: 0;
    padding: 2px 0 20px;
    border-bottom: 1px solid var(--app-border);
  }

  .promotion-overview-image {
    position: relative;
    min-width: 0;
    overflow: hidden;
    border-radius: 13px;
    background: var(--app-surface-soft);
  }

  .promotion-overview-image img {
    display: block;
    width: 100%;
    height: 205px;
    object-fit: cover;
  }

  .promotion-image-tag {
    position: absolute;
    left: 12px;
    bottom: 12px;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 11px;
    border-radius: 8px;
    background: var(--app-primary);
    color: var(--app-white);
    font-size: 0.78rem;
    font-weight: 800;
  }

  .promotion-overview-main {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
    min-width: 0;
  }

  .promotion-overview-main h2 {
    margin: 0;
    color: var(--app-primary);
    font-size: clamp(1.35rem, 2.2vw, 2rem);
    font-weight: 850;
    line-height: 1.15;
    overflow-wrap: anywhere;
  }

  .promotion-overview-price {
    display: inline-flex;
    align-items: center;
    max-width: 100%;
    padding: 10px 15px;
    border-radius: 12px;
    background: var(--app-surface-soft);
    color: var(--app-primary);
    font-size: 1.55rem;
    font-weight: 850;
    white-space: nowrap;
  }

  .promotion-overview-status {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 15px;
    min-height: 110px;
    min-width: 0;
    padding-left: 24px;
    border-left: 1px solid var(--app-border);
  }

  .promotion-detail-status {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    width: fit-content;
    max-width: 100%;
    padding: 9px 13px;
    border-radius: 22px;
    font-size: 0.82rem;
    font-weight: 800;
  }

  .promotion-detail-status.is-active {
    background: #e1efdf;
    color: #286b38;
  }

  .promotion-detail-status.is-inactive {
    background: var(--app-danger-soft);
    color: var(--app-danger);
  }

  .promotion-availability {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    color: var(--app-muted-dark);
    font-size: 0.82rem;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .promotion-availability svg {
    flex: 0 0 auto;
    color: var(--app-accent);
    font-size: 1rem;
  }

  .promotion-description-row {
    display: grid;
    grid-template-columns: 34px 135px minmax(0, 1fr);
    align-items: center;
    gap: 12px;
    min-width: 0;
    padding: 14px 17px;
    border: 1px solid var(--app-border);
    border-radius: 11px;
    background: var(--app-surface-soft);
  }

  .promotion-description-icon {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--app-canvas);
    color: var(--app-primary);
    font-size: 1.25rem;
    font-weight: 800;
  }

  .promotion-description-row > strong {
    padding-right: 13px;
    border-right: 1px solid var(--app-accent);
    color: var(--app-primary);
    font-size: 0.88rem;
  }

  .promotion-description-value {
    min-width: 0;
    color: var(--app-ink);
    font-size: 0.9rem;
    line-height: 1.45;
    overflow-wrap: anywhere;
  }

  .containerInfo {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    min-width: 0;
  }

  @media (max-width: 850px) {
    .promotion-overview {
      grid-template-columns: minmax(180px, 0.7fr) minmax(0, 1fr);
      gap: 18px;
    }

    .promotion-overview-status {
      grid-column: 1 / -1;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
      min-height: 0;
      padding: 14px 0 0;
      border-left: 0;
      border-top: 1px solid var(--app-border);
    }
  }

  @media (max-width: 600px) {
    gap: 15px;

    .promotion-overview {
      grid-template-columns: minmax(0, 1fr);
      gap: 13px;
    }

    .promotion-overview-image img {
      height: 190px;
    }

    .promotion-overview-main {
      gap: 9px;
    }

    .promotion-overview-main h2 {
      font-size: 1.35rem;
    }

    .promotion-overview-price {
      font-size: 1.25rem;
    }

    .promotion-overview-status {
      flex-direction: column;
      align-items: flex-start;
      gap: 9px;
    }

    .promotion-description-row {
      grid-template-columns: 30px minmax(0, 1fr);
      gap: 8px 10px;
      padding: 12px;
    }

    .promotion-description-row > strong {
      border: 0;
      padding: 0;
    }

    .promotion-description-value {
      grid-column: 1 / -1;
    }
  }
`;

// =========================================================
// INFORMACIÓN AUXILIAR DE PROMOCIÓN
// =========================================================

export const PromotionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
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
    background: var(--app-surface-soft);
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
// PRODUCTOS INCLUIDOS
// =========================================================

export const PromotionItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  min-width: 0;

  .promotion-products-title {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .promotion-products-title-icon {
    display: grid;
    place-items: center;
    flex: 0 0 34px;
    width: 34px;
    height: 34px;
    border-radius: 9px;
    background: var(--app-surface-soft);
    color: var(--app-accent);
    font-size: 1.3rem;
    font-weight: 800;
  }

  h3 {
    margin: 0;
    color: var(--app-primary);
    font-size: 1.12rem;
    font-weight: 850;
  }

  .promotion-groups-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    min-width: 0;
  }

  @media (max-width: 600px) {
    gap: 11px;

    h3 {
      font-size: 1rem;
    }
  }
`;

// =========================================================
// GRUPO DE PRODUCTOS
// =========================================================

export const PromotionItem = styled.div`
  display: grid;
  grid-template-columns: minmax(210px, 0.38fr) minmax(0, 1fr);
  align-items: center;
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 15px;
  border: 1px solid var(--app-border);
  border-radius: 14px;
  background: var(--app-surface);
  box-shadow: var(--app-shadow-xs);

  .promotion-group-meta {
    display: flex;
    align-items: center;
    gap: 13px;
    min-width: 0;
    padding-right: 15px;
    border-right: 1px solid var(--app-border);
  }

  .promotion-group-icon {
    display: grid;
    place-items: center;
    flex: 0 0 52px;
    width: 52px;
    height: 52px;
    border-radius: 13px;
    background: var(--app-surface-soft);
    font-size: 1.55rem;
  }

  .promotion-group-label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 7px;
    min-width: 0;
  }

  .promotion-group-label strong {
    color: var(--app-primary);
    font-size: 0.92rem;
    font-weight: 850;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }

  /* Insignia independiente para "N unidades a elegir". */
  .promotion-group-label span {
    display: inline-flex;
    align-items: center;
    width: fit-content;
    max-width: 100%;
    box-sizing: border-box;
    padding: 6px 10px;
    border: 1px solid var(--app-border);
    border-radius: 999px;
    background: var(--app-surface-soft);
    color: var(--app-primary);
    font-size: 0.76rem;
    font-weight: 750;
    line-height: 1.25;
    overflow-wrap: anywhere;
  }

  /* Cada producto ocupa su propio chip y mantiene separación visible. */
  .promotion-detail-products {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 9px;
    width: 100%;
    min-width: 0;
  }

  .promotion-product-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 1 auto;
    width: fit-content;
    max-width: 100%;
    min-width: 0;
    min-height: 36px;
    box-sizing: border-box;
    margin: 0;
    padding: 8px 12px;
    border: 1px solid var(--app-border);
    border-radius: 999px;
    background: var(--app-white);
    color: var(--app-ink);
    font-size: 0.8rem;
    font-weight: 650;
    line-height: 1.3;
    text-align: center;
    overflow-wrap: anywhere;
    word-break: normal;
    box-shadow: 0 2px 5px rgba(var(--app-shadow-rgb), 0.05);
  }

  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    padding: 13px;

    .promotion-group-meta {
      padding: 0 0 12px;
      border-right: 0;
      border-bottom: 1px solid var(--app-border);
    }

    .promotion-group-icon {
      flex-basis: 46px;
      width: 46px;
      height: 46px;
      font-size: 1.4rem;
    }

    .promotion-detail-products {
      gap: 8px;
    }

    .promotion-product-chip {
      min-height: 35px;
      padding: 7px 11px;
      font-size: 0.78rem;
    }
  }

  @media (max-width: 380px) {
    padding: 11px;

    .promotion-group-meta {
      gap: 10px;
    }

    .promotion-group-label strong {
      font-size: 0.86rem;
    }

    .promotion-group-label span {
      font-size: 0.72rem;
    }

    .promotion-product-chip {
      padding: 7px 9px;
      font-size: 0.74rem;
    }
  }
`;
