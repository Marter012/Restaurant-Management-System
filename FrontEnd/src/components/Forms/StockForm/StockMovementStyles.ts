import styled from "styled-components";

export const StockFormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  gap: 20px;

  .typeMovement {
    display: flex;
  }
  .containerInfo {
    width: 100%;
    height: 80%;
  }
`;

export const StockInfo = styled.div`
  display: flex;
  flex-direction: column;

  gap: 6px;

  padding: 14px 16px;

  border-radius: 10px;

  background-color: rgba(var(--app-shadow-rgb), 0.08);

  h3 {
    margin: 0;

    color: var(--app-accent);

    font-size: 1.1rem;
  }

  p {
    margin: 0;

    font-size: 0.9rem;

    opacity: 0.7;
  }

  strong {
    color: var(--app-accent);
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  gap: 6px;

  label {
    font-size: 0.9rem;

    font-weight: 600;

    color: var(--app-accent);
  }

  input,
  select,
  textarea {
    width: 100%;

    padding: 10px 12px;

    box-sizing: border-box;

    border: 1px solid rgba(var(--app-shadow-rgb), 0.25);

    border-radius: 8px;

    background-color: var(--app-white);

    color: var(--app-primary-active);

    font-family: inherit;

    font-size: 0.9rem;

    outline: none;

    transition:
      border-color 0.2s,
      box-shadow 0.2s;

    &:focus {
      border-color: var(--app-accent);

      box-shadow: 0 0 0 2px rgba(var(--app-shadow-rgb), 0.1);
    }
  }

  textarea {
    min-height: 80px;

    resize: vertical;
  }

  .stock-type-buttons {
    display: flex;
    width: 100%;
    justify-content: space-around;
    button {
      color: black !important;
      border: none;
      padding: 10px 35px;
      border-radius: 10px;
      cursor: pointer;
    }
    .inflow {
      background-color: #50934d !important;
    }
    .outflow {
      background-color: #e01c1c !important;
    }

  }
`;

export const ErrorText = styled.div`
  color: var(--app-danger);

  font-size: 0.8rem;
`;

export const FormActions = styled.div`
  display: flex;

  gap: 10px;

  margin-top: 4px;
`;

export const CancelButton = styled.button`
  flex: 1;

  padding: 11px 14px;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.35);

  border-radius: 8px;

  background-color: transparent;

  color: var(--app-accent);

  font-size: 0.9rem;

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background-color: rgba(var(--app-shadow-rgb), 0.08);
  }
`;

export const SubmitButton = styled.button`
  flex: 1;

  padding: 11px 14px;

  border: none;

  border-radius: 8px;

  background-color: var(--app-accent);

  color: var(--app-white);

  font-size: 0.9rem;

  font-weight: 600;

  cursor: pointer;

  transition:
    background-color 0.2s,
    transform 0.2s;

  &:hover:not(:disabled) {
    background-color: var(--app-accent);

    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;
