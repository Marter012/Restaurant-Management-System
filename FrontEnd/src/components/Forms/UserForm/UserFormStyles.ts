import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  min-width: 0;
  padding: 2px 0 4px;

  @media (max-width: 600px) {
    gap: 15px;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 0;

  label {
    display: flex;
    align-items: center;
    gap: 7px;
    color: var(--color-text);
    font-size: 13px;
    font-weight: 800;
    line-height: 1.4;

    &::before {
      display: block;
      width: 6px;
      height: 6px;
      flex: 0 0 6px;
      border-radius: 50%;
      background: var(--color-accent);
      content: "";
    }
  }

  input,
  select {
    display: block;
    width: 100%;
    min-width: 0;
    height: 48px;
    box-sizing: border-box;
    padding: 0 14px;
    border: 1.5px solid var(--color-border-strong) !important;
    border-radius: var(--radius-md);
    background: var(--color-surface) !important;
    color: var(--color-text) !important;
    font-size: 14px;
    font-weight: 550;
    line-height: 1.4;
    outline: none;
    box-shadow: var(--shadow-sm);
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease,
      background 180ms ease;

    &::placeholder {
      color: var(--color-text-secondary);
      opacity: 0.9;
    }

    &:hover:not(:disabled) {
      border-color: var(--color-accent) !important;
      background: var(--color-white) !important;
    }

    &:focus {
      border-color: var(--color-primary) !important;
      background: var(--color-white) !important;
      box-shadow: 0 0 0 3px var(--color-primary-soft) !important;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  select {
    padding-right: 38px;
    cursor: pointer;
  }

  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px var(--color-surface) inset;
    -webkit-text-fill-color: var(--color-text);
    caret-color: var(--color-text);
  }

  @media (max-width: 600px) {
    gap: 7px;

    label {
      font-size: 12px;
    }

    input,
    select {
      height: 45px;
      padding-left: 12px;
      font-size: 13px;
    }
  }
`;

export const ErrorText = styled.span`
  display: block;
  width: fit-content;
  max-width: 100%;
  margin-top: 1px;
  padding: 5px 8px;
  border-left: 3px solid var(--color-danger);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  font-size: 11px;
  font-weight: 700;
  line-height: 1.4;
  overflow-wrap: anywhere;
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
  min-height: 43px;
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  padding: 10px 18px;
  background: var(--color-white);
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    transform 180ms ease;

  &:hover:not(:disabled) {
    border-color: var(--color-accent);
    background: var(--color-surface);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid var(--color-primary-soft);
    outline-offset: 2px;
  }
`;

export const SubmitButton = styled.button`
  min-height: 43px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
  padding: 10px 18px;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 13px;
  font-weight: 850;
  cursor: pointer;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;

  &:hover:not(:disabled) {
    border-color: var(--color-primary-hover);
    background: var(--color-primary-hover);
    box-shadow: var(--shadow-sm);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid var(--color-primary-soft);
    outline-offset: 2px;
  }
`;
