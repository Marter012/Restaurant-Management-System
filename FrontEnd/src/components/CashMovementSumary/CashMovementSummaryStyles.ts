import styled from "styled-components";

// =========================================================
// CONTENEDOR
// =========================================================

export const SummaryContainer = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;

  background: var(--app-white);

  border: 1px solid var(--app-surface-soft);
  border-radius: 12px;

  padding: 20px;

  box-sizing: border-box;

  box-shadow: 0 2px 8px rgba(var(--app-shadow-rgb), 0.04);

  /*
    ALTURA CONTROLADA EN ESCRITORIO
  */
  height: 100%;

  min-height: 0;

  overflow: hidden;

  form{
    width: 100%;
    height: 100%;
  }

  .actions {
    width: 100%;
    max-width: 100%;

    display: flex;
    align-items: center;

    gap: 10px;

    margin-top: 20px;

    flex-shrink: 0;

    box-sizing: border-box;

    button {
      flex: 1 1 0;
      min-width: 0;
      width: 100%;

      border: none;
      border-radius: 8px;

      padding: 10px 14px;

      cursor: pointer;

      font-weight: 600;
      font-size: 14px;

      background: var(--app-muted-dark);
      color: var(--app-white);

      box-sizing: border-box;

      transition:
        opacity 0.2s ease,
        transform 0.15s ease;

      &:hover {
        opacity: 0.9;
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }

  /* =======================================================
     TABLET
     ======================================================= */

  @media (max-width: 1050px) {
    width: 100%;
    max-width: 100%;

  }

  /* =======================================================
     MOBILE
     ======================================================= */

  @media (max-width: 700px) {
    width: 100%;
    max-width: 100%;

    padding: 16px;

    border-radius: 12px;

    overflow: hidden;

    .actions {
      width: 100%;
      max-width: 100%;

      display: flex;

      gap: 8px;

      margin-top: 16px;

      button {
        flex: 1 1 0;
        min-width: 0;
        width: 50%;

        min-height: 42px;

        padding: 10px 8px;

        font-size: 13px;
      }
    }
  }

  /* =======================================================
     MOBILE PEQUEÑO
     ======================================================= */

  @media (max-width: 420px) {
    padding: 13px;

    border-radius: 10px;

    .actions {
      gap: 7px;

      margin-top: 14px;

      button {
        width: 50%;

        min-height: 40px;

        padding: 9px 6px;

        font-size: 12px;
      }
    }
  }
`;

// =========================================================
// HEADER
// =========================================================

export const SummaryHeader = styled.div`
  width: 100%;

  display: flex;

  justify-content: space-between;
  align-items: center;

  margin-bottom: 16px;

  flex-shrink: 0;

  box-sizing: border-box;

  h3 {
    margin: 0;

    font-size: 20px;
    line-height: 1.2;

    color: var(--app-muted-dark);
  }

  @media (max-width: 700px) {
    margin-bottom: 14px;

    h3 {
      font-size: 18px;
    }
  }

  @media (max-width: 420px) {
    margin-bottom: 12px;

    h3 {
      font-size: 16px;
    }
  }
`;

// =========================================================
// RESUMEN
// =========================================================

export const SummaryItems = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SummaryItem = styled.div`
  display: flex;

  width: 100%;

  justify-content: space-evenly;
  align-items: center;

  padding: 12px 0;

  border-bottom: 1px solid var(--app-surface-soft);

  span {
    font-size: 14px;
    color: var(--app-primary);
  }
`;

export const SummaryValue = styled.strong<{
  $type: "income" | "expense" | "";
}>`
  font-size: 16px;

  color: ${({ $type }) =>
    $type === "income"
      ? "var(--app-primary)"
      : $type === "expense"
        ? "var(--app-danger)"
        : "var(--app-muted-dark)"};
`;

// =========================================================
// LISTA
// =========================================================

export const MovementList = styled.div`
  width: 100%;
  max-width: 100%;
  min-width: 0;

  /*
    IMPORTANTE:
    La lista ocupa solamente el espacio disponible
    dentro de SummaryContainer.
  */
  flex: 1;

  min-height: 0;
  height: 60%;
  margin-top: 0;
  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  box-sizing: border-box;

  h4 {
    margin: 0 0 12px;

    font-size: 14px;

    color: var(--app-primary-active);
  }

  > p {
    padding: 20px 0;

    margin: 0;

    text-align: center;

    font-size: 13px;

    color: var(--app-muted);
  }

  @media (max-width: 1050px) {

    flex: none;

  }

  /*
    MOBILE
  */
  @media (max-width: 700px) {
    width: 100%;
    max-width: 100%;

    flex: none;

    margin-top: 0;


    > p {
      padding: 18px 10px;

      font-size: 12px;
    }
  }

  @media (max-width: 420px) {
    > p {
      padding: 16px 8px;

      font-size: 11px;
    }
  }
`;

// =========================================================
// MOVIMIENTO
// =========================================================

export const MovementRow = styled.div`
  display: flex;

  width: 100%;
  max-width: 100%;
  min-width: 0;

  min-height: 58px;

  justify-content: space-between;
  align-items: center;

  gap: 12px;

  padding: 9px 10px;

  box-sizing: border-box;

  border-bottom: 1px solid var(--app-surface-soft);

  background-color: var(--app-white);

  &:last-child {
    border-bottom: none;
  }

  > div {
    display: flex;

    flex-direction: column;

    min-width: 0;

    flex: 1;

    gap: 3px;

    overflow: hidden;

    strong {
      min-width: 0;

      font-size: 14px;

      color: var(--app-muted-dark);

      overflow: hidden;

      text-overflow: ellipsis;

      white-space: nowrap;
    }

    span {
      min-width: 0;

      font-size: 12px;

      color: var(--app-muted-dark);

      overflow: hidden;

      text-overflow: ellipsis;

      white-space: nowrap;
    }

    small {
      min-width: 0;

      font-size: 11px;

      color: var(--app-muted);

      overflow: hidden;

      text-overflow: ellipsis;

      white-space: nowrap;
    }
  }

  @media (max-width: 700px) {
    min-height: 56px;

    gap: 8px;

    padding: 8px;

    > div {
      strong {
        font-size: 13px;
      }

      small {
        font-size: 10px;
      }
    }
  }

  @media (max-width: 420px) {
    min-height: 52px;

    padding: 7px;

    > div {
      strong {
        font-size: 12px;
      }

      small {
        font-size: 9px;
      }
    }
  }
`;

// =========================================================
// TIPO / MONTO
// =========================================================

export const MovementType = styled.span<{
  $type: "income" | "expense";
}>`
  flex-shrink: 0;

  max-width: 45%;

  font-size: 14px;

  font-weight: 700;

  white-space: nowrap;

  overflow: hidden;

  text-overflow: ellipsis;

  color: ${({ $type }) => ($type === "income" ? "var(--app-primary)" : "var(--app-danger)")};

  @media (max-width: 700px) {
    max-width: 42%;

    font-size: 13px;
  }

  @media (max-width: 420px) {
    max-width: 44%;

    font-size: 12px;
  }
`;
