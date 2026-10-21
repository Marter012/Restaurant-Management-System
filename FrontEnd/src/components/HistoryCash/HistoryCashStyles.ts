import styled from "styled-components";

/* ========================================================= */
/* HISTORIAL */
/* ========================================================= */

export const HistoryContainer = styled.div`
  width: 100%;
  max-height: 80% !important;
  min-height: 80% !important;
  display: flex;
  flex-direction: column;

  gap: 16px;

  padding: 20px;

  box-sizing: border-box;

  background: var(--app-surface-soft);

  border: 1px solid var(--app-accent);

  border-radius: 14px;

  overflow: hidden;

  @media (max-width: 700px) {
    height: auto;
    min-height: 0;

    padding: 14px;

    gap: 12px;

    border-radius: 12px;
  }

  @media (max-width: 420px) {
    padding: 10px;

    gap: 10px;

    border-radius: 10px;
  }
`;

/* ========================================================= */
/* HEADER */
/* ========================================================= */

export const HistoryHeader = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 20px;

  flex-shrink: 0;

  .header-info {
    display: flex;
    flex-direction: column;

    gap: 4px;

    min-width: 0;
  }

  h3 {
    margin: 0;

    color: var(--app-primary-active);

    font-size: 1.15rem;

    font-weight: 700;
  }

  span {
    color: var(--app-primary);

    font-size: 0.75rem;
  }

  @media (max-width: 650px) {
    align-items: stretch;

    flex-direction: column;

    gap: 10px;

    h3 {
      font-size: 1.05rem;
    }

    span {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 420px) {
    h3 {
      font-size: 1rem;
    }

    span {
      font-size: 0.66rem;
    }
  }
`;

/* ========================================================= */
/* SELECTOR DE MES */
/* ========================================================= */

export const MonthSelector = styled.div`
  display: flex;

  align-items: center;

  gap: 5px;

  padding: 4px;

  background: var(--app-accent-soft);

  border: 1px solid var(--app-accent);

  border-radius: 9px;

  flex-shrink: 0;

  @media (max-width: 650px) {
    width: 100%;

    justify-content: space-between;

    box-sizing: border-box;
  }
`;

export const MonthButton = styled.button`
  width: 30px;
  height: 30px;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 0;

  border: none;

  border-radius: 7px;

  background: var(--app-surface-soft);

  color: var(--app-accent);

  font-size: 1.1rem;

  line-height: 1;

  cursor: pointer;

  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: var(--app-accent);

    color: var(--app-white);
  }

  &:active {
    transform: scale(0.96);
  }

  @media (max-width: 420px) {
    width: 28px;
    height: 28px;
  }
`;

export const MonthTitle = styled.span`
  min-width: 135px;

  margin: 0 !important;

  text-align: center;

  color: var(--app-primary-active) !important;

  font-size: 0.78rem !important;

  font-weight: 700;

  opacity: 1 !important;

  @media (max-width: 420px) {
    min-width: 0;

    flex: 1;

    font-size: 0.72rem !important;
  }
`;

/* ========================================================= */
/* LISTA */
/* ========================================================= */

export const HistoryList = styled.div`
  width: 100%;

  display: flex;

  flex-direction: column;

  gap: 6px;

  flex: 1;

  min-height: 0;

  overflow-x: auto;

  overflow-y: auto;

  scrollbar-width: thin;

  scrollbar-color: var(--app-accent) transparent;

  &::-webkit-scrollbar {
    height: 5px;
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--app-accent);

    border-radius: 10px;
  }

  @media (max-width: 700px) {
    overflow-x: hidden;

    overflow-y: auto;
  }
`;

/* ========================================================= */
/* FILAS */
/* ========================================================= */

export const HistoryRow = styled.div<{
  $header?: boolean;
}>`
  min-width: 950px;

  min-height: ${({ $header }) => ($header ? "38px" : "55px")};

  display: grid;

  grid-template-columns:
    1.1fr
    0.8fr
    1fr
    1fr
    1fr
    1fr
    1fr
    0.9fr
    0.65fr;

  align-items: center;

  gap: 6px;

  padding: 0 14px;

  box-sizing: border-box;

  border-radius: 9px;

  background: ${({ $header }) => ($header ? "var(--app-accent-soft)" : "var(--app-surface-soft)")};

  border: 1px solid ${({ $header }) => ($header ? "var(--app-accent)" : "var(--app-accent-soft)")};

  box-shadow: ${({ $header }) =>
    $header ? "none" : "0 2px 5px rgba(var(--app-shadow-rgb), 0.05)"};

  span,
  strong {
    text-align: center;
  }

  ${({ $header }) =>
    !$header &&
    `
      cursor: pointer;

      transition:
        background 0.18s ease,
        border-color 0.18s ease,
        transform 0.18s ease;

      &:hover {
        background: var(--app-surface-soft);

        border-color: var(--app-accent);

        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }
    `}

  ${({ $header }) =>
    $header
      ? `
        color: var(--app-accent);

        font-size: 0.68rem;

        font-weight: 700;

        span {
          color: var(--app-accent);
        }
      `
      : `
        span {
          color: var(--app-primary);

          font-size: 0.76rem;
        }

        strong {
          color: var(--app-primary-active);

          font-size: 0.78rem;
        }
      `}

  .closed,
  .open {
    justify-self: center;

    padding: 5px 11px;

    border-radius: 18px;

    font-size: 0.65rem;

    font-weight: 700;

    white-space: nowrap;
  }

  .closed {
    color: var(--app-accent);

    background: var(--app-surface-soft);

    border: 1px solid var(--app-accent-soft);
  }

  .open {
    color: var(--app-primary);

    background: var(--app-surface-soft);

    border: 1px solid var(--app-success-soft);
  }

  .positive {
    color: var(--app-primary) !important;

    font-weight: 700;
  }

  .negative {
    color: var(--app-danger) !important;

    font-weight: 700;
  }

  .zero {
    color: var(--app-accent) !important;

    font-weight: 700;
  }

  .print-button {
    width: 34px;
    height: 34px;

    display: flex;

    align-items: center;
    justify-content: center;

    justify-self: center;

    padding: 0;

    border: 1px solid var(--app-accent);

    border-radius: 8px;

    background: var(--app-surface-soft);

    color: var(--app-accent);

    font-size: 1rem;

    cursor: pointer;

    transition:
      background 0.18s ease,
      color 0.18s ease,
      transform 0.18s ease;

    svg {
      font-size: 17px;
    }

    &:hover:not(:disabled) {
      background: var(--app-accent);

      color: var(--app-white);

      transform: translateY(-1px);
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }

    &:disabled {
      opacity: 0.45;

      cursor: not-allowed;
    }

    span {
      font-size: 0.65rem;

      color: inherit;
    }
  }

  /* =======================================================
     TABLET
     ======================================================= */

  @media (max-width: 850px) {
    min-width: 0;

    grid-template-columns:
      minmax(0, 1.2fr)
      minmax(0, 0.9fr)
      minmax(0, 0.9fr)
      48px;

    gap: 6px;

    padding: 0 10px;

    min-height: ${({ $header }) => ($header ? "36px" : "52px")};

    /* Ocultamos:
       3 = Apertura
       4 = Ventas
       5 = Esperado
       6 = Cierre
       7 = Diferencia
    */

    > :nth-child(3),
    > :nth-child(4),
    > :nth-child(5),
    > :nth-child(6),
    > :nth-child(7) {
      display: none;
    }

    span,
    strong {
      min-width: 0;

      overflow: hidden;

      text-overflow: ellipsis;

      white-space: nowrap;
    }

    .closed,
    .open {
      padding: 4px 8px;

      font-size: 0.6rem;
    }

    .print-button {
      width: 32px;
      height: 32px;

      svg {
        font-size: 16px;
      }
    }
  }

  /* =======================================================
     MOBILE
     ======================================================= */

  @media (max-width: 600px) {
    min-width: 0;

    width: 100%;

    grid-template-columns:
      minmax(0, 1.3fr)
      minmax(0, 0.9fr)
      minmax(0, 0.9fr)
      40px;

    gap: 5px;

    padding: 0 8px;

    min-height: ${({ $header }) => ($header ? "34px" : "50px")};

    border-radius: 8px;

    > :nth-child(3),
    > :nth-child(4),
    > :nth-child(5),
    > :nth-child(6),
    > :nth-child(7) {
      display: none;
    }

    ${({ $header }) =>
      $header
        ? `
          font-size: 0.6rem;

          span {
            font-size: 0.6rem;
          }
        `
        : `
          span {
            font-size: 0.68rem;
          }

          strong {
            font-size: 0.7rem;
          }
        `}

    .closed,
    .open {
      padding: 4px 6px;

      font-size: 0.57rem;

      border-radius: 14px;
    }

    .print-button {
      width: 30px;
      height: 30px;

      border-radius: 7px;

      svg {
        font-size: 15px;
      }
    }
  }

  /* =======================================================
     CELULARES PEQUEÑOS
     ======================================================= */

  @media (max-width: 420px) {
    grid-template-columns:
      minmax(0, 1.2fr)
      minmax(0, 0.8fr)
      minmax(0, 0.85fr)
      36px;

    gap: 4px;

    padding: 0 6px;

    min-height: ${({ $header }) => ($header ? "32px" : "46px")};

    ${({ $header }) =>
      $header
        ? `
          font-size: 0.55rem;

          span {
            font-size: 0.55rem;
          }
        `
        : `
          span {
            font-size: 0.62rem;
          }

          strong {
            font-size: 0.65rem;
          }
        `}

    .closed,
    .open {
      padding: 3px 5px;

      font-size: 0.52rem;
    }

    .print-button {
      width: 28px;
      height: 28px;

      svg {
        font-size: 14px;
      }
    }
  }
`;

/* ========================================================= */
/* SIN REGISTROS */
/* ========================================================= */

export const EmptyMessage = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  min-height: 140px;

  padding: 30px 20px;

  box-sizing: border-box;

  color: var(--app-primary);

  background: var(--app-surface-soft);

  border: 1px dashed var(--app-accent);

  border-radius: 10px;

  text-align: center;

  font-size: 0.82rem;

  @media (max-width: 600px) {
    min-height: 110px;

    padding: 20px 12px;

    font-size: 0.75rem;
  }
`;

/* ========================================================= */
/* HEADER DEL MODAL */
/* ========================================================= */

export const SummaryHeader = styled.div`
  display: flex;

  align-items: center;
  justify-content: space-between;

  gap: 15px;

  padding: 14px 16px;

  margin-bottom: 14px;

  background: var(--app-surface-soft);

  border: 1px solid var(--app-accent-soft);

  border-radius: 10px;

  h3 {
    margin: 0;

    color: var(--app-primary-active);

    font-size: 1.05rem;

    font-weight: 700;
  }

  span {
    display: block;

    margin-top: 4px;

    color: var(--app-primary);

    font-size: 0.73rem;
  }

  @media (max-width: 500px) {
    align-items: flex-start;

    flex-direction: column;

    gap: 8px;

    padding: 12px;

    h3 {
      font-size: 0.95rem;
    }

    span {
      font-size: 0.68rem;
    }
  }
`;

/* ========================================================= */
/* ESTADO */
/* ========================================================= */

export const SummaryStatus = styled.span`
  display: inline-flex !important;

  align-items: center;
  justify-content: center;

  margin: 0 !important;

  padding: 6px 12px;

  border-radius: 20px;

  font-size: 0.68rem !important;

  font-weight: 700;

  white-space: nowrap;

  &.closed {
    color: var(--app-accent) !important;

    background: var(--app-surface-soft);

    border: 1px solid var(--app-accent-soft);
  }

  &.open {
    color: var(--app-primary) !important;

    background: var(--app-surface-soft);

    border: 1px solid var(--app-success-soft);
  }
`;

/* ========================================================= */
/* SECCIONES DEL MODAL */
/* ========================================================= */

export const SummarySection = styled.section`
  display: flex;

  flex-direction: column;

  gap: 9px;

  margin-bottom: 14px;

  padding: 13px;

  background: var(--app-surface-soft);

  border: 1px solid var(--app-accent-soft);

  border-radius: 10px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SummarySectionHeader = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;

  h4 {
    margin: 0;

    color: var(--app-primary-active);

    font-size: 0.78rem;

    font-weight: 700;
  }

  > strong {
    color: var(--app-primary-active);

    font-size: 0.78rem;
  }
`;

/* ========================================================= */
/* RESUMEN */
/* ========================================================= */

export const SummaryGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 8px;

  @media (max-width: 700px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 420px) {
    gap: 6px;
  }
`;

export const SummaryCard = styled.div`
  min-height: 72px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  gap: 5px;

  padding: 11px 13px;

  box-sizing: border-box;

  background: var(--app-surface-soft);

  border: 1px solid var(--app-accent-soft);

  border-radius: 8px;

  span {
    color: var(--app-primary);

    font-size: 0.65rem;
  }

  strong {
    color: var(--app-primary-active);

    font-size: 0.94rem;

    font-weight: 700;
  }
`;

/* ========================================================= */
/* DETALLES */
/* ========================================================= */

export const DetailGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 8px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div`
  min-height: 48px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 10px;

  padding: 9px 11px;

  box-sizing: border-box;

  background: var(--app-surface-soft);

  border: 1px solid var(--app-accent-soft);

  border-radius: 8px;

  div {
    display: flex;

    align-items: center;

    gap: 7px;

    min-width: 0;
  }

  span {
    color: var(--app-primary);

    font-size: 0.69rem;
  }

  .icon {
    font-size: 0.9rem;
  }

  strong {
    color: var(--app-primary-active);

    font-size: 0.76rem;

    white-space: nowrap;
  }
`;

/* ========================================================= */
/* CÁLCULO DE EFECTIVO */
/* ========================================================= */

export const CashCalculation = styled.div`
  display: flex;

  flex-direction: column;

  gap: 0;

  overflow: hidden;

  background: var(--app-surface-soft);

  border: 1px solid var(--app-accent-soft);

  border-radius: 9px;
`;

export const CalculationTitle = styled.div`
  padding: 10px 13px;

  color: var(--app-primary-active);

  background: var(--app-accent-soft);

  border-bottom: 1px solid var(--app-accent);

  font-size: 0.72rem;

  font-weight: 700;
`;

export const CalculationRow = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

  padding: 8px 13px;

  border-bottom: 1px solid var(--app-accent-soft);

  span {
    color: var(--app-primary);

    font-size: 0.69rem;
  }

  strong {
    color: var(--app-primary-active);

    font-size: 0.75rem;

    white-space: nowrap;
  }
`;

export const CalculationResult = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

  padding: 10px 13px;

  background: var(--app-accent-soft);

  border-bottom: 1px solid var(--app-accent);

  span {
    color: var(--app-primary-active);

    font-size: 0.72rem;

    font-weight: 700;
  }

  strong {
    color: var(--app-primary-active);

    font-size: 0.82rem;

    font-weight: 700;
  }
`;

/* ========================================================= */
/* DIFERENCIA */
/* ========================================================= */

export const DifferenceLabel = styled.div`
  display: flex;

  flex-direction: column;

  gap: 2px;

  strong {
    font-size: 0.8rem;

    font-weight: 700;
  }

  span {
    font-size: 0.65rem;

    opacity: 0.7;
  }
`;

export const DifferenceValue = styled.strong`
  font-size: 1.05rem;

  font-weight: 800;

  white-space: nowrap;
`;

export const DifferenceBox = styled.div`
  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 15px;

  margin: 8px;

  padding: 12px 14px;

  border-radius: 8px;

  &.positive {
    background: var(--app-surface-soft);

    ${DifferenceLabel},
    ${DifferenceValue} {
      color: var(--app-primary);
    }
  }

  &.negative {
    background: var(--app-danger-soft);

    ${DifferenceLabel},
    ${DifferenceValue} {
      color: var(--app-danger);
    }
  }

  &.zero {
    background: var(--app-surface-soft);

    ${DifferenceLabel},
    ${DifferenceValue} {
      color: var(--app-accent);
    }
  }
`;
