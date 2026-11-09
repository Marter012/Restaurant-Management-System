import styled from "styled-components";

export const FormContainer = styled.form`
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

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: 600;
  font-size: 14px;
  color: var(--color-text);
`;

export const Input = styled.input`
  width: 100%;
  box-sizing: border-box;

  padding: 12px 14px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  background: var(--color-surface);
  color: var(--color-text);
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: var(--color-primary);
  }

  &:disabled {
    background: var(--color-surface-hover);
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  color: var(--color-danger);
  font-size: 13px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 10px;
`;

export const SubmitButton = styled.button`
  padding: 10px 18px;

  border: none;
  border-radius: var(--radius-sm);

  background: var(--color-primary);
  color: var(--color-white);

  cursor: pointer;

  font-size: 14px;

  &:hover {
    background: var(--color-primary-hover);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
