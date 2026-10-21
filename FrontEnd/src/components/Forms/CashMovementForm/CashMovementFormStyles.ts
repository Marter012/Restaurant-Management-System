import styled from "styled-components";

export const Form = styled.form`
  display: flex;

  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 18px;

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

  gap: 7px;
`;

export const Label = styled.label`
  font-size: 0.9rem;

  font-weight: 600;

  color: var(--app-primary);
`;

export const Input = styled.input`
  width: 100%;

  padding: 11px;

  box-sizing: border-box;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.25);

  border-radius: 7px;

  background: var(--app-white);

  color: var(--app-primary-active);

  outline: none;

  &:focus {
    border-color: var(--app-primary);
  }
`;

export const Select = styled.select`
  width: 100%;

  padding: 11px;

  box-sizing: border-box;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.25);

  border-radius: 7px;

  background: var(--app-white);

  color: var(--app-primary-active);

  outline: none;

  &:focus {
    border-color: var(--app-primary);
  }
`;

export const TextArea = styled.textarea`
  width: 100%;

  padding: 11px;

  box-sizing: border-box;

  resize: vertical;

  border: 1px solid rgba(var(--app-shadow-rgb), 0.25);

  border-radius: 7px;

  background: var(--app-white);

  color: var(--app-primary-active);

  outline: none;

  font-family: inherit;

  &:focus {
    border-color: var(--app-primary);
  }
`;

export const Actions = styled.div`
  display: flex;

  justify-content: flex-end;

  gap: 10px;

  margin-top: 5px;
`;

export const CancelButton = styled.button`
  padding: 10px 18px;

  border: none;

  border-radius: 7px;

  background: var(--app-surface-soft);

  color: var(--app-primary-active);

  font-weight: 600;

  cursor: pointer;
`;

export const SubmitButton = styled.button`
  padding: 10px 18px;

  border: none;

  border-radius: 7px;

  background: var(--app-primary);

  color: var(--app-white);

  font-weight: 600;

  cursor: pointer;

  &:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }
`;
