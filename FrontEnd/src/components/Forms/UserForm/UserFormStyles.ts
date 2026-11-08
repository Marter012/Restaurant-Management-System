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
    color: var(--app-ink);
    font-size: 13px;
    font-weight: 800;
    line-height: 1.4;

    &::before {
      display: block;
      width: 6px;
      height: 6px;
      flex: 0 0 6px;
      border-radius: 50%;
      background: var(--app-accent);
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
    border: 1.5px solid var(--app-border-strong) !important;
    border-radius: 11px;
    background: var(--app-surface) !important;
    color: var(--app-ink) !important;
    font-family: inherit;
    font-size: 14px;
    font-weight: 550;
    line-height: 1.4;
    outline: none;
    box-shadow: var(--app-shadow-xs);
    transition:
      border-color 180ms ease,
      box-shadow 180ms ease,
      background 180ms ease;

    &::placeholder {
      color: var(--app-muted);
      opacity: 0.9;
    }

    &:hover:not(:disabled) {
      border-color: var(--app-accent) !important;
      background: var(--app-white) !important;
    }

    &:focus {
      border-color: var(--app-primary) !important;
      background: var(--app-white) !important;
      box-shadow:
        0 0 0 3px var(--app-accent-soft),
        var(--app-shadow-sm) !important;
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
    -webkit-box-shadow: 0 0 0 1000px var(--app-surface) inset;
    -webkit-text-fill-color: var(--app-ink);
    caret-color: var(--app-ink);
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
  border-left: 3px solid var(--app-danger);
  border-radius: 0 6px 6px 0;
  background: var(--app-warning-soft);
  color: var(--app-danger);
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
  border: 1px solid var(--app-border-strong);
  border-radius: 10px;
  padding: 10px 18px;
  background: var(--app-white);
  color: var(--app-primary);
  font-family: inherit;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    transform 180ms ease;

  &:hover:not(:disabled) {
    border-color: var(--app-accent);
    background: var(--app-surface);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid var(--app-accent-soft);
    outline-offset: 2px;
  }
`;

export const SubmitButton = styled.button`
  min-height: 43px;
  border: 1px solid var(--app-primary);
  border-radius: 10px;
  padding: 10px 18px;
  background: var(--app-primary);
  color: var(--app-white);
  font-family: inherit;
  font-size: 13px;
  font-weight: 850;
  cursor: pointer;
  transition:
    background 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;

  &:hover:not(:disabled) {
    border-color: var(--app-primary-active);
    background: var(--app-primary-active);
    box-shadow: var(--app-shadow-sm);
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
    outline: 3px solid var(--app-accent-soft);
    outline-offset: 2px;
  }
`;
