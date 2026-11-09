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
  color: var(--color-text);
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
  border: 1px solid color-mix(in srgb, var(--color-text) 12%, transparent);
  border-radius: 19px;
  background: var(--color-surface-muted);
  overflow: hidden;

  .stock-info-icon {
    margin-left: auto;
    flex-shrink: 0;
    color: var(--color-accent);
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
  background: var(--color-background);

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
  border-left: 2px solid color-mix(in srgb, var(--color-text) 15%, transparent);

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
    color: var(--color-primary);
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
    color: var(--color-text);
    font-size: 14px;
    opacity: 0.8;
  }

  strong {
    display: inline-flex;
    align-items: center;
    padding: 7px 13px;
    border-radius: 30px;
    background: var(--color-surface-muted);
    color: var(--color-accent);
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
    color: var(--color-accent);
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
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background: var(--color-surface);
    color: var(--color-primary);
    font-size: 14px;
    font-weight: 500;
    outline: none;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background 0.2s ease;

    &::placeholder {
      color: var(--color-text);
      opacity: 0.48;
    }

    &:hover:not(:disabled) {
      border-color: var(--color-accent);
    }

    &:focus {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-accent) 11%, transparent);
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
    ${({ $variant, $active }) => {
      if (!$active) return "var(--color-border-strong)";
      return $variant === "inflow" ? "var(--color-success)" : "var(--color-danger)";
    }};

  border-radius: 12px;

  background: ${({ $variant, $active }) => {
    if (!$active) return "var(--color-surface)";
    return $variant === "inflow" ? "var(--color-success)" : "var(--color-danger)";
  }};

  color: ${({ $variant, $active }) => {
    if ($active) return "var(--color-white)";
    return $variant === "inflow" ? "var(--color-success)" : "var(--color-danger)";
  }};

  font-size: 14px;
  font-weight: 750;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: var(--shadow-sm);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid var(--color-accent);
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
  color: var(--color-danger);
  font-size: 12px;
  font-weight: 650;
  line-height: 1.4;
`;
