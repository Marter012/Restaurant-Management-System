// components/Forms/CloseCashFormStyles.ts

import styled from "styled-components";

export const FormContainer = styled.form`
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

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;

  padding: 12px 14px;

  border: 1px solid var(--app-border);
  border-radius: 8px;

  font-size: 16px;

  &:focus {
    outline: none;
    border-color: var(--app-primary);
  }

  &:disabled {
    background: var(--app-surface-soft);
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  color: var(--app-danger);
  font-size: 13px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
`;

export const CancelButton = styled.button`
  padding: 10px 18px;

  border: 1px solid var(--app-border);
  border-radius: 8px;

  background: var(--app-white);

  cursor: pointer;

  font-size: 14px;

  &:hover {
    background: var(--app-white);
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 18px;

  border: none;
  border-radius: 8px;

  background: var(--app-primary);
  color: var(--app-white);

  cursor: pointer;

  font-size: 14px;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;