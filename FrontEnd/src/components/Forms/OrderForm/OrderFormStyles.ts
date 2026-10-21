import styled from "styled-components";

// =========================================================
// CONTENEDOR
// =========================================================

export const FormContainer = styled.div`
  display: flex;

  flex-direction: column;

  gap: 20px;

  width: 100%;
  height: 100%;
  .containerInfo {
    width: 100%;
    height: 80%;
    overflow-y: auto;
    scrollbar-width: none;
  }
`;

// =========================================================
// GRUPO DEL FORMULARIO
// =========================================================

export const FormGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: 7px;

  width: 100%;

  label {
    color: var(--app-primary);

    font-size: 0.88rem;

    font-weight: 700;

    line-height: 1.2;
  }

  input,
  select {
    width: 100%;

    min-height: 44px;

    box-sizing: border-box;

    padding: 10px 13px;

    border: 1px solid var(--app-accent);

    border-radius: 8px;

    background-color: var(--app-white);

    color: var(--app-primary);

    font-family: inherit;

    font-size: 0.92rem;

    outline: none;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease;

    &::placeholder {
      color: var(--app-muted-dark);
    }

    &:hover {
      border-color: var(--app-accent);
    }

    &:focus {
      border-color: var(--app-primary);

      box-shadow: 0 0 0 3px rgba(var(--app-shadow-rgb), 0.1);
    }

    &:disabled {
      background-color: var(--app-surface-soft);

      color: var(--app-muted-dark);

      cursor: not-allowed;
    }
  }

  input[type="number"] {
    appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      margin: 0;

      appearance: none;
    }
  }
`;

// =========================================================
// FILA DE CAMPOS
// =========================================================

export const FormRow = styled.div`
  display: grid;

  grid-template-columns: repeat(2, minmax(0, 1fr));

  gap: 14px;

  width: 100%;
`;

// =========================================================
// LABEL
// =========================================================

export const Label = styled.label`
  color: var(--app-primary);

  font-size: 0.88rem;

  font-weight: 700;

  line-height: 1.2;
`;

// =========================================================
// INPUT
// =========================================================

export const Input = styled.input`
  width: 100%;

  min-height: 44px;

  box-sizing: border-box;

  padding: 10px 13px;

  border: 1px solid var(--app-accent);

  border-radius: 8px;

  background-color: var(--app-white);

  color: var(--app-primary);

  font-family: inherit;

  font-size: 0.92rem;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &::placeholder {
    color: var(--app-muted-dark);
  }

  &:hover {
    border-color: var(--app-accent);
  }

  &:focus {
    border-color: var(--app-primary);

    box-shadow: 0 0 0 3px rgba(var(--app-shadow-rgb), 0.1);
  }

  &:disabled {
    background-color: var(--app-surface-soft);

    color: var(--app-muted-dark);

    cursor: not-allowed;
  }
`;

// =========================================================
// SELECT
// =========================================================

export const Select = styled.select`
  width: 100%;

  min-height: 44px;

  box-sizing: border-box;

  padding: 10px 13px;

  border: 1px solid var(--app-accent);

  border-radius: 8px;

  background-color: var(--app-white);

  color: var(--app-primary);

  font-family: inherit;

  font-size: 0.92rem;

  outline: none;

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    border-color: var(--app-accent);
  }

  &:focus {
    border-color: var(--app-primary);

    box-shadow: 0 0 0 3px rgba(var(--app-shadow-rgb), 0.1);
  }

  &:disabled {
    background-color: var(--app-surface-soft);

    color: var(--app-muted-dark);

    cursor: not-allowed;
  }
`;

// =========================================================
// ERROR
// =========================================================

export const ErrorText = styled.span`
  display: flex;

  align-items: center;

  gap: 5px;

  margin-top: 1px;

  color: var(--app-danger);

  font-size: 0.78rem;

  font-weight: 500;

  line-height: 1.3;
`;

// =========================================================
// PRODUCTOS
// =========================================================

export const ProductsContainer = styled.div`
  display: flex;

  flex-direction: column;

  gap: 12px;

  width: 100%;
`;

// =========================================================
// FILA DE PRODUCTO
// =========================================================

export const ProductRow = styled.div`
  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    110px
    auto;

  align-items: end;

  gap: 12px;

  width: 100%;

  padding: 12px;

  box-sizing: border-box;

  border: 1px solid var(--app-accent-soft);

  border-radius: 8px;

  background-color: var(--app-white);

  transition:
    border-color 0.2s ease,
    background-color 0.2s ease;

  &:hover {
    border-color: var(--app-accent);

    background-color: var(--app-white);
  }
`;

// =========================================================
// CANTIDAD
// =========================================================

export const QuantityInput = styled.input`
  width: 100%;

  min-height: 44px;

  box-sizing: border-box;

  padding: 10px 13px;

  border: 1px solid var(--app-accent);

  border-radius: 8px;

  background-color: var(--app-white);

  color: var(--app-primary);

  font-family: inherit;

  font-size: 0.92rem;

  text-align: center;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: var(--app-accent);
  }

  &:focus {
    border-color: var(--app-primary);

    box-shadow: 0 0 0 3px rgba(var(--app-shadow-rgb), 0.1);
  }

  &:disabled {
    background-color: var(--app-surface-soft);

    color: var(--app-muted-dark);

    cursor: not-allowed;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    margin: 0;

    appearance: none;
  }
`;

// =========================================================
// ELIMINAR PRODUCTO
// =========================================================

export const RemoveButton = styled.button`
  min-height: 44px;

  padding: 10px 14px;

  border: 1px solid var(--app-danger-soft);

  border-radius: 8px;

  background-color: var(--app-danger-soft);

  color: var(--app-danger);

  font-family: inherit;

  font-size: 0.82rem;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--app-danger);

    border-color: var(--app-danger);

    color: var(--app-white);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// =========================================================
// AGREGAR PRODUCTO
// =========================================================

export const AddButton = styled.button`
  align-self: flex-start;

  min-height: 40px;

  padding: 9px 15px;

  border: 1px solid var(--app-accent);

  border-radius: 8px;

  background-color: var(--app-surface-soft);

  color: var(--app-primary);

  font-family: inherit;

  font-size: 0.84rem;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--app-accent-soft);

    border-color: var(--app-accent);

    color: var(--app-primary-active);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// =========================================================
// ACCIONES
// =========================================================

export const FormActions = styled.div`
  display: flex;

  align-items: center;

  justify-content: flex-end;

  gap: 10px;

  margin-top: 5px;

  padding-top: 16px;

  border-top: 1px solid var(--app-surface-soft);
`;

// =========================================================
// BOTÓN CANCELAR
// =========================================================

export const CancelButton = styled.button`
  min-height: 42px;

  padding: 10px 20px;

  border: 1px solid var(--app-border);

  border-radius: 8px;

  background-color: var(--app-surface-soft);

  color: var(--app-primary);

  font-family: inherit;

  font-size: 0.86rem;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--app-surface-soft);

    border-color: var(--app-border);

    color: var(--app-primary-active);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;

    transform: none;
  }
`;

// =========================================================
// BOTÓN GUARDAR
// =========================================================

export const SubmitButton = styled.button`
  min-height: 42px;

  padding: 10px 20px;

  border: 1px solid var(--app-primary);

  border-radius: 8px;

  background-color: var(--app-primary);

  color: var(--app-white);

  font-family: inherit;

  font-size: 0.86rem;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--app-primary);

    border-color: var(--app-primary);

    box-shadow: 0 3px 8px rgba(var(--app-shadow-rgb), 0.18);
  }

  &:active {
    transform: scale(0.98);

    box-shadow: none;
  }

  &.deactivate {
    background-color: var(--app-danger);
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;

    box-shadow: none;

    transform: none;
  }
`;

// =========================================================
// BOTONES DE MEDIOS DE PAGO
// =========================================================

export const AddPaymentButton = styled.button`
  align-self: flex-start;
  min-height: 40px;
  padding: 9px 15px;
  border: 1px solid var(--app-accent);
  border-radius: 8px;
  background-color: var(--app-surface-soft);
  color: var(--app-primary);
  font-family: inherit;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--app-accent-soft);
    border-color: var(--app-accent);
  }

  &:active {
    transform: scale(0.98);
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const RemovePaymentButton = styled.button`
  min-height: 40px;
  padding: 9px 12px;
  border: 1px solid var(--app-danger-soft);
  border-radius: 8px;
  background-color: var(--app-danger-soft);
  color: var(--app-danger);
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background-color: var(--app-danger);
    border-color: var(--app-danger);
    color: var(--app-white);
  }
  &:active {
    transform: scale(0.98);
  }
`;

export const PaymentsSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 4px;
  padding: 13px 15px;
  border: 1px solid var(--app-accent-soft);
  border-radius: 10px;
  background: var(--app-white);
`;

export const PaymentSummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--app-accent);
  font-size: 0.88rem;

  strong {
    color: var(--app-primary);
    font-size: 0.95rem;
  }
`;

export const PaymentStatusText = styled.small<{ $balanced: boolean }>`
  display: block;
  margin-top: 3px;
  padding-top: 9px;
  border-top: 1px solid var(--app-accent-soft);
  color: ${({ $balanced }) =>
    $balanced ? "var(--app-primary)" : "var(--app-accent)"};
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.4;
`;
