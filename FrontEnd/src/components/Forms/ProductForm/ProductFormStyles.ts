import styled from "styled-components";
import { InputStyles } from "../../Utils/GlobalStyles.ts";

// =========================================================
// CONTENEDOR PRINCIPAL
// =========================================================

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  min-width: 0;
  min-height: 100%;
  box-sizing: border-box;
  color: var(--app-ink);

  ${InputStyles}
  .fieldsForm {
    display: flex;
    flex-direction: column;
    gap: 21px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    overflow: visible;

    > * {
      width: 100%;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }

    .twoItems {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: start;
      gap: 16px;
      width: 100%;
      min-width: 0;

      > * {
        min-width: 0;
        width: 100%;
      }
    }
  }

  @media (max-width: 620px) {
    .fieldsForm {
      gap: 17px;

      .twoItems {
        grid-template-columns: minmax(0, 1fr);
        gap: 15px;
      }
    }
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  > label:not(.garnish-toggle) {
    color: var(--app-ink);
    font-size: 0.88rem;
    font-weight: 750;
    line-height: 1.35;
  }

  input:not([type="checkbox"]),
  select,
  textarea {
    display: block;
    width: 100%;
    min-width: 0;
    min-height: 49px;
    box-sizing: border-box;
    padding: 12px 15px;
    border: 1px solid var(--app-border);
    border-radius: 12px;
    background: var(--app-white);
    color: var(--app-ink);
    font-family: inherit;
    font-size: 0.92rem;
    font-weight: 500;
    outline: none;
    transition:
      border-color 180ms ease,
      background-color 180ms ease,
      box-shadow 180ms ease;

    &::placeholder {
      color: var(--app-muted);
      font-weight: 400;
      opacity: 0.9;
    }

    &:hover:not(:disabled) {
      border-color: var(--app-accent);
    }

    &:focus {
      border-color: var(--app-primary);
      background: var(--app-white);
      box-shadow: 0 0 0 3px rgba(var(--app-primary-rgb), 0.11);
    }

    &:disabled {
      background: var(--app-surface-soft);
      color: var(--app-muted);
      cursor: not-allowed;
    }
  }

 input[type="file"] {
  width: 100%;
  min-width: 0;
  min-height: 52px;
  padding: 8px;
  cursor: pointer;

  &::file-selector-button {
    min-height: 34px;
    margin-right: 12px;
    padding: 0 13px;
    border: 0;
    border-radius: 8px;
    background: var(--app-primary);
    color: var(--app-white);
    font: inherit;
    font-size: 0.82rem;
    font-weight: 700;
    cursor: pointer;
  }

  @media (max-width: 1000px) {
    min-height: 46px;
    padding: 6px;
    font-size: 0.76rem;

    &::file-selector-button {
      min-height: 32px;
      margin-right: 7px;
      padding: 0 9px;
      font-size: 0.76rem;
    }
  }
}
  input[type="number"] {
    appearance: textfield;
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      margin: 0;
      appearance: none;
      -webkit-appearance: none;
    }
  }

  .category-input {
    display: flex;
    align-items: stretch;
    gap: 10px;
    width: 100%;
    min-width: 0;

    input,
    select {
      flex: 1 1 0;
      width: 0;
      max-width: none;
      min-width: 0;
      min-height: 49px;
    }

    select {
      padding: 0 12px;
      cursor: pointer;
    }

   
    
    @media (max-width: 420px) {
      flex-direction: column;

      input,
      select {
        flex: 1 1 auto;
        width: 100%;
      }
    }
  }
  

  &.ingredients-group {
    gap: 8px;

    > small {
      padding: 0 2px;
      color: var(--app-muted-dark);
      font-size: 0.78rem;
      line-height: 1.5;
    }
  }

  &.garnish-group {
    gap: 9px;
  }

  .garnish-toggle {
    display: flex;
    align-items: center;
    gap: 13px;
    width: 100%;
    min-height: 68px;
    box-sizing: border-box;
    padding: 13px 15px;
    border: 1px solid var(--app-border);
    border-radius: 13px;
    background: var(--app-white);
    cursor: pointer;
    transition:
      border-color 180ms ease,
      background-color 180ms ease;

    &:hover {
      border-color: var(--app-accent);
      background: var(--app-surface-soft);
    }

    &:has(.garnish-checkbox:checked) {
      border-color: var(--app-accent);
      background: var(--app-primary-soft);
    }

    .garnish-checkbox {
      appearance: auto;
      -webkit-appearance: checkbox;
      width: 19px;
      height: 19px;
      min-height: 19px;
      flex: 0 0 19px;
      margin: 0;
      padding: 0;
      accent-color: var(--app-primary);
      cursor: pointer;
      box-shadow: none;
    }

    .garnish-toggle-copy {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
      min-width: 0;

      strong {
        color: var(--app-primary);
        font-size: 0.88rem;
        font-weight: 800;
        line-height: 1.35;
      }

      small {
        color: var(--app-muted-dark);
        font-size: 0.78rem;
        line-height: 1.45;
      }
    }
  }

  .garnish-options {
    display: flex;
    flex-direction: column;
    gap: 9px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: 15px;
    border: 1px solid var(--app-border);
    border-radius: 12px;
    background: var(--app-surface-soft);
    animation: garnishReveal 180ms ease-out;

    > label {
      color: var(--app-ink);
      font-size: 0.84rem;
      font-weight: 750;
    }

    input {
      background: var(--app-white);
    }

    small {
      color: var(--app-muted-dark);
      font-size: 0.76rem;
      line-height: 1.45;
    }
  }

  @keyframes garnishReveal {
    from {
      opacity: 0;
      transform: translateY(-3px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 520px) {
    .garnish-toggle {
      min-height: 64px;
      padding: 11px;
      gap: 10px;
    }

    .garnish-options {
      padding: 12px;
    }
  }
`;

export const ErrorText = styled.span`
  display: flex;
  align-items: flex-start;
  gap: 6px;

  margin-top: 1px;

  color: var(--app-danger);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.4;

  overflow-wrap: anywhere;

  &::before {
    content: "!";

    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 14px;
    height: 14px;
    flex: 0 0 14px;

    margin-top: 1px;

    border: 1px solid currentColor;
    border-radius: 50%;

    font-size: 0.6rem;
    font-weight: 800;
  }
`;

// =========================================================
// ACCIONES
// =========================================================

export const FormActions = styled.div`
  display: none;
`;

export const CancelButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 42px;

  box-sizing: border-box;
  padding: 10px 18px;

  border: 1px solid var(--app-border);
  border-radius: 9px;

  background: var(--app-white);
  color: var(--app-ink);

  font-family: inherit;
  font-size: 0.83rem;
  font-weight: 700;

  cursor: pointer;

  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    color 180ms ease,
    transform 180ms ease;

  &:hover:not(:disabled) {
    border-color: var(--app-accent);
    background: var(--app-surface-soft);
    color: var(--app-primary);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid rgba(var(--app-primary-rgb), 0.18);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
`;

// =========================================================
// BOTÓN CREAR / GUARDAR
// =========================================================

export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-height: 42px;

  box-sizing: border-box;
  padding: 10px 19px;

  border: 1px solid var(--app-primary);
  border-radius: 9px;

  background: var(--app-primary);
  color: var(--app-white);

  font-family: inherit;
  font-size: 0.83rem;
  font-weight: 750;

  cursor: pointer;

  box-shadow: 0 3px 7px rgba(var(--app-primary-rgb), 0.12);

  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    box-shadow 180ms ease,
    transform 180ms ease;

  &:hover:not(:disabled) {
    background: var(--app-primary-hover);
    border-color: var(--app-primary-hover);

    box-shadow: 0 5px 12px rgba(var(--app-primary-rgb), 0.17);

    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 3px solid rgba(var(--app-primary-rgb), 0.2);
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;
