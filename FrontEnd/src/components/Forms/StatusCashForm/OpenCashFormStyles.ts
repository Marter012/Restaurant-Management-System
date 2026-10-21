import styled from "styled-components";
import { Form } from "formik";

export const FormStyles = styled(Form)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 20px;

  .containerInfo{
    width: 100%;
    height: 80%;
    overflow-y: auto;
    scrollbar-width: none;
  }
`;

export const FormContainer = styled.div`
  display: flex;

  flex-direction: column;

  gap: 18px;

  width: 100%;

  height: 100%;
`;

export const FormGroup = styled.div`
  display: flex;

  flex-direction: column;

  gap: 7px;

  width: 100%;
`;

export const Label = styled.label`
  font-weight: 600;

  color: var(--app-primary);
`;

export const Input = styled.input`
  width: 100%;

  padding: 11px 13px;

  box-sizing: border-box;

  border: 1px solid var(--app-accent);

  border-radius: 8px;

  background-color: var(--app-white);
  font-size: 1rem;

  outline: none;

  transition: 0.2s;

  &:focus {
    border-color: var(--app-primary);

    box-shadow: 0 0 0 2px rgba(var(--app-shadow-rgb), 0.1);
  }

  &:disabled {
    background-color: var(--app-surface-soft);

    cursor: not-allowed;
  }
`;
export const Select = styled.select`
  width: 100%;

  padding: 11px 13px;

  box-sizing: border-box;

  border: 1px solid var(--app-accent);

  border-radius: 8px;

  background-color: red;

  font-size: 1rem;

  outline: none;

  transition: 0.2s;

  &:focus {
    border-color: var(--app-primary);

    box-shadow: 0 0 0 2px rgba(var(--app-shadow-rgb), 0.1);
  }

  &:disabled {
    background-color: var(--app-surface-soft);

    cursor: not-allowed;
  }
`;
export const ErrorText = styled.span`
  color: var(--app-danger);

  font-size: 0.85rem;
`;

export const FormActions = styled.div`
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  margin-top: 10px;
`;

export const CancelButton = styled.button`
  padding: 11px 20px;

  border: none;

  border-radius: 8px;

  background-color: var(--app-surface-soft);

  color: var(--app-primary-active);

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background-color: var(--app-border);
  }
`;

export const SubmitButton = styled.button`
  padding: 11px 20px;

  border: none;

  border-radius: 8px;

  background-color: var(--app-primary);

  color: var(--app-white);

  font-weight: 600;

  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background-color: var(--app-primary);
  }

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;
