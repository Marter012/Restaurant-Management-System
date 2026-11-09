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
  color: var(--color-text);

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
    color: var(--color-text);
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
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background: var(--color-white);
    color: var(--color-text);
  font: inherit;
    font-size: 0.92rem;
    font-weight: 500;
    outline: none;
    transition:
      border-color 180ms ease,
      background-color 180ms ease,
      box-shadow 180ms ease;

    &::placeholder {
      color: var(--color-text-secondary);
      font-weight: 400;
      opacity: 0.9;
    }

    &:hover:not(:disabled) {
      border-color: var(--color-accent);
    }

    &:focus {
      border-color: var(--color-primary);
      background: var(--color-white);
      box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.11);
    }

    &:disabled {
      background: var(--color-surface-muted);
      color: var(--color-text-secondary);
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
      background: var(--color-primary);
      color: var(--color-white);
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
    position: relative;
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
      color: var(--color-text-secondary);
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
    border: 1px solid var(--color-border);
    border-radius: 13px;
    background: var(--color-white);
    cursor: pointer;
    transition:
      border-color 180ms ease,
      background-color 180ms ease;

    &:hover {
      border-color: var(--color-accent);
      background: var(--color-surface-muted);
    }

    &:has(.garnish-checkbox:checked) {
      border-color: var(--color-accent);
      background: var(--color-primary-soft);
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
      accent-color: var(--color-primary);
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
        color: var(--color-primary);
        font-size: 0.88rem;
        font-weight: 800;
        line-height: 1.35;
      }

      small {
        color: var(--color-text-secondary);
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
    border: 1px solid var(--color-border);
    border-radius: 12px;
    background: var(--color-surface-muted);
    animation: garnishReveal 180ms ease-out;

    > label {
      color: var(--color-text);
      font-size: 0.84rem;
      font-weight: 750;
    }

    input {
      background: var(--color-white);
    }

    small {
      color: var(--color-text-secondary);
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

  color: var(--color-danger);
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

// =========================================================
// AUTOCOMPLETE DE CATEGORÍAS
// =========================================================

export const CategorySuggestions = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 50;

  display: flex;
  flex-direction: column;

  width: 100%;
  max-height: 200px;
  overflow-y: auto;

  padding: 5px;
  border: 1px solid var(--color-border);
  border-radius: 11px;

  background: var(--color-white);
  box-shadow: var(--shadow-md);

  overscroll-behavior: contain;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: var(--color-accent);
  }
`;

export const CategorySuggestion = styled.button`
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 42px;
  padding: 10px 12px;

  border: none;
  border-radius: 7px;

  background: transparent;
  color: var(--color-text);
  font: inherit;
  font-size: 0.87rem;
  font-weight: 600;
  text-align: left;

  cursor: pointer;
  transition: background 150ms ease;

  &:hover,
  &:focus-visible {
    background: var(--color-primary-soft);
    outline: none;
  }
`;

// =========================================================
// INGREDIENTES REUTILIZABLES
// =========================================================

export const IngredientSuggestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  padding: 13px;

  border: 1px solid var(--color-border);
  border-radius: 12px;

  background: var(--color-surface-muted);

  .ingredient-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    max-height: 150px;
    overflow-y: auto;
    padding: 2px;

    overscroll-behavior: contain;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: var(--color-accent);
    }
  }

  .no-ingredients {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: 0.8rem;
    line-height: 1.5;
  }
`;

export const IngredientSuggestionsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 6px;

  span {
    color: var(--color-primary);
    font-size: 0.82rem;
    font-weight: 800;
  }

  small {
    color: var(--color-text-secondary);
    font-size: 0.72rem;
  }
`;

export const IngredientChip = styled.button<{ $selected: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;

  min-height: 34px;
  max-width: 100%;

  padding: 7px 11px;

  border: 1px solid
    ${({ $selected }) =>
      $selected ? "var(--color-primary)" : "var(--color-border)"};

  border-radius: 20px;

  background: ${({ $selected }) =>
    $selected ? "var(--color-primary)" : "var(--color-white)"};

  color: ${({ $selected }) =>
    $selected ? "var(--color-white)" : "var(--color-text)"};
  font: inherit;
  font-size: 0.77rem;
  font-weight: 700;

  cursor: pointer;

  transition:
    background 160ms ease,
    border-color 160ms ease,
    color 160ms ease,
    transform 160ms ease;

  svg {
    flex-shrink: 0;
    font-size: 0.65rem;
  }

  &:hover {
    border-color: var(--color-primary);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
`;
