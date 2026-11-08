import styled from "styled-components";

/* =========================================
   CONTENEDOR PRINCIPAL
========================================= */

export const StockFormContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 20px;

  box-sizing: border-box;

  color: var(--app-ink);
`;

/* =========================================
   INFORMACIÓN DEL PRODUCTO
========================================= */

export const StockInfo = styled.div`
  width: 100%;
  min-height: 145px;

  display: flex;
  align-items: center;
  gap: 20px;

  padding: 14px;

  box-sizing: border-box;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.12);

  border-radius: 19px;

  background: rgba(var(--app-shadow-rgb), 0.055);

  overflow: hidden;

  .stock-info-icon {
    margin-left: auto;

    flex-shrink: 0;

    color: var(--app-accent);

    font-size: 32px;

    opacity: 0.45;
  }

  @media (max-width: 600px) {
    min-height: 115px;

    gap: 12px;

    padding: 11px;

    border-radius: 15px;

    .stock-info-icon {
      display: none;
    }
  }
`;

/* =========================================
   IMAGEN DEL PRODUCTO
========================================= */

export const StockProductImage = styled.img`
  width: 125px;
  height: 115px;

  flex-shrink: 0;

  display: block;

  object-fit: cover;

  border-radius: 14px;

  background: var(--app-canvas);

  @media (max-width: 600px) {
    width: 90px;
    height: 90px;

    border-radius: 11px;
  }

  @media (max-width: 380px) {
    width: 75px;
    height: 80px;
  }
`;

/* =========================================
   INFORMACIÓN DEL PRODUCTO
========================================= */

export const StockProductHeader = styled.div`
  min-width: 0;

  flex: 1;

  display: flex;
  align-items: center;
  gap: 12px;

  padding-left: 19px;

  border-left: 2px solid rgba(var(--app-shadow-rgb), 0.15);

  @media (max-width: 600px) {
    padding-left: 12px;
  }
`;

export const StockProductInformation = styled.div`
  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 9px;

  h3 {
    margin: 0;

    color: var(--app-primary);

    font-size: clamp(16px, 1.8vw, 23px);

    font-weight: 800;

    line-height: 1.25;

    overflow-wrap: anywhere;
  }
`;

export const StockCurrentQuantity = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 8px;

  span {
    color: var(--app-ink);

    font-size: 14px;

    opacity: 0.8;
  }

  strong {
    display: inline-flex;
    align-items: center;

    padding: 7px 13px;

    border-radius: 30px;

    background: rgba(var(--app-shadow-rgb), 0.09);

    color: var(--app-accent);

    font-size: 14px;

    font-weight: 800;
  }

  @media (max-width: 600px) {
    gap: 6px;

    span {
      font-size: 12px;
    }

    strong {
      padding: 5px 9px;
      font-size: 12px;
    }
  }
`;

/* =========================================
   CONTENIDO DEL FORMULARIO
========================================= */

export const StockFormContent = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 20px;
`;

/* =========================================
   GRID DE CANTIDAD Y MOVIMIENTO
========================================= */

export const StockFormGrid = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 24px;

  align-items: start;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;

    gap: 17px;
  }
`;

/* =========================================
   GRUPOS DEL FORMULARIO
========================================= */

export const FormGroup = styled.div`
  width: 100%;

  min-width: 0;

  display: flex;
  flex-direction: column;

  gap: 9px;

  label {
    display: flex;
    align-items: center;

    gap: 8px;

    color: var(--app-accent);

    font-size: 15px;

    font-weight: 750;

    svg {
      font-size: 16px;
    }
  }

  input,
  select,
  textarea {
    width: 100%;

    box-sizing: border-box;

    border: 1px solid rgba(var(--app-shadow-rgb), 0.17);

    border-radius: 12px;

    background: var(--app-white);

    color: var(--app-primary);

    font-family: inherit;

    font-size: 14px;

    font-weight: 500;

    outline: none;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;

    &::placeholder {
      color: var(--app-ink);

      opacity: 0.48;
    }

    &:hover:not(:disabled) {
      border-color: var(--app-accent);
    }

    &:focus {
      border-color: var(--app-accent);

      box-shadow: 0 0 0 3px rgba(var(--app-shadow-rgb), 0.09);
    }

    &:disabled {
      opacity: 0.6;

      cursor: not-allowed;
    }
  }

  input,
  select {
    min-height: 50px;

    padding: 11px 15px;
  }

  input[type="number"] {
    font-size: 17px;

    font-weight: 750;
  }

  textarea {
    min-height: 125px;

    padding: 14px 17px;

    font-size: 14px;

    line-height: 1.5;

    resize: vertical;
  }

  @media (max-width: 600px) {
    gap: 8px;

    label {
      font-size: 14px;
    }

    input,
    select {
      min-height: 45px;
    }

    textarea {
      min-height: 105px;
    }
  }
`;

/* =========================================
   SELECTOR DE MOVIMIENTO
========================================= */

export const MovementContainer = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 12px;

  @media (max-width: 400px) {
    gap: 8px;
  }
`;

interface MovementButtonProps {
  $variant: "inflow" | "outflow";
  $active: boolean;
}

export const MovementButton = styled.button<MovementButtonProps>`
  width: 100%;

  min-height: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 10px 12px;

  border: 1.5px solid
    ${({ $variant, $active }) =>
      $active
        ? $variant === "inflow"
          ? "#438c4a"
          : "#c83c32"
        : "rgba(var(--app-shadow-rgb), 0.18)"};

  border-radius: 12px;

  background: ${({ $variant, $active }) => {
    if (!$active) return "var(--app-white)";

    return $variant === "inflow" ? "#438c4a" : "#c83c32";
  }};

  color: ${({ $variant, $active }) => {
    if ($active) return "#ffffff";

    return $variant === "inflow" ? "#438c4a" : "#c83c32";
  }};

  font-family: inherit;

  font-size: 14px;

  font-weight: 750;

  cursor: pointer;

  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);

    box-shadow: 0 4px 10px rgba(var(--app-shadow-rgb), 0.10);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid var(--app-accent);

    outline-offset: 3px;
  }

  @media (max-width: 500px) {
    min-height: 44px;

    gap: 6px;

    padding: 9px 8px;

    font-size: 13px;
  }
`;

export const MovementIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 17px;
`;

export const MovementLabel = styled.span`
  font-size: inherit;
  font-weight: inherit;
`;

/* =========================================
   ERRORES
========================================= */

export const ErrorText = styled.div`
  display: flex;
  align-items: center;

  gap: 7px;

  margin-top: 2px;

  color: var(--app-danger);

  font-size: 12px;

  font-weight: 650;

  line-height: 1.4;
`;