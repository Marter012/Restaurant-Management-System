import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 12px;
    font-weight: 700;
    color: var(--app-primary-active);
  }

  input,
  select {
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--app-accent-soft);
    border-radius: 10px;
    padding: 11px 12px;
    background: var(--app-white);
    color: var(--app-primary-active);
    font-size: 13px;
    outline: none;
    transition: 0.2s ease;

    &:focus {
      border-color: var(--app-primary);
      box-shadow: 0 0 0 3px rgba(var(--app-shadow-rgb), 0.08);
    }
  }
`;

export const ErrorText = styled.span`
  color: var(--app-danger);
  font-size: 11px;
  font-weight: 600;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 5px;

  @media (max-width: 450px) {
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
`;

export const CancelButton = styled.button`
  border: 1px solid var(--app-accent-soft);
  border-radius: 10px;
  padding: 11px 18px;
  background: var(--app-white);
  color: var(--app-primary);
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SubmitButton = styled.button`
  border: none;
  border-radius: 10px;
  padding: 11px 18px;
  background: var(--app-primary);
  color: var(--app-white);
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: var(--app-primary-active);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
