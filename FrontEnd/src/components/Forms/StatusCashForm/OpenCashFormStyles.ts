import styled from "styled-components";
import { Form } from "formik";

export const FormStyles = styled(Form)`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  gap: 20px;

  .containerInfo {
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
  color: var(--color-primary);
`;

export const Input = styled.input`
  width: 100%;
  padding: 11px 13px;
  box-sizing: border-box;
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-sm);
  background-color: var(--color-white);
  color: var(--color-text);
  font-size: 1rem;
  outline: none;
  transition: var(--transition-normal);

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }

  &:disabled {
    background-color: var(--color-surface-hover);
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 11px 13px;
  box-sizing: border-box;
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
  color: var(--color-text);
  font-size: 1rem;
  outline: none;
  transition: var(--transition-normal);

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-soft);
  }

  &:disabled {
    background-color: var(--color-surface-hover);
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.span`
  color: var(--color-danger);
  font-size: 0.85rem;
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;
