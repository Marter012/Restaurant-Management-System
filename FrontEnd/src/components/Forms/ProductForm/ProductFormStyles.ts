import styled from "styled-components";

// =========================================================
// CONTENEDOR PRINCIPAL
// =========================================================

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  width: 100%;
  min-width: 0;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  box-sizing: border-box;

  color: var(--app-ink);

  .fieldsForm {
    display: flex;
    flex-direction: column;
    gap: 18px;

    width: 100%;
    min-width: 0;
    height: 80%;

    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    box-sizing: border-box;
    &::-webkit-scrollbar {
      display: none;
    }

    > * {
      width: 100%;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }

    .twoItems {
      display: flex;
      align-items: flex-start;
      gap: 16px;

      width: 100%;
      min-width: 0;

      > * {
        flex: 1 1 0;
        width: 0;
        min-width: 0;
      }
    }
  }

  @media (max-width: 520px) {
    gap: 14px;

    .fieldsForm {
      gap: 14px;
      height: 80%;

      .twoItems {
        flex-direction: column;
        gap: 14px;

        > * {
          flex: 1 1 auto;
          width: 100%;
        }
      }
    }
  }

  @media (max-height: 620px) {
    gap: 12px;

    .fieldsForm {
      height: 75%;
      gap: 12px;
    }
  }
`;

// =========================================================
// GRUPOS DEL FORMULARIO
// =========================================================

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  > label:not(.garnish-toggle) {
    color: var(--app-ink);
    font-size: 0.82rem;
    font-weight: 750;
    line-height: 1.35;
  }

  input:not([type="checkbox"]),
  select,
  textarea {
    display: block;

    width: 100%;
    min-width: 0;
    min-height: 42px;

    box-sizing: border-box;
    padding: 10px 12px;

    border: 1px solid var(--app-border);
    border-radius: 9px;

    background: var(--app-surface);
    color: var(--app-ink);

    font-family: inherit;
    font-size: 0.85rem;
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

      box-shadow: 0 0 0 3px rgba(var(--app-primary-rgb), 0.08);
    }

    &:disabled {
      background: var(--app-surface-soft);
      color: var(--app-muted);
      cursor: not-allowed;
    }
  }

  /* =======================================================
     PRECIO
     ======================================================= */

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

  /* =======================================================
     CATEGORÍA
     Campo editable + selector de categorías existentes
     ======================================================= */

  .category-input {
    display: flex;
    align-items: stretch;
    gap: 7px;

    width: 100%;
    min-width: 0;

    input {
      flex: 1 1 0;
      width: 0;
      max-width: none;
      min-width: 0;

      height: 42px;
      min-height: 42px;
    }

    select {
      flex: 1 1 0;
      width: 0;
      max-width: none;
      min-width: 0;

      height: 42px;
      min-height: 42px;

      padding: 0 5px;

      border-radius: 9px;
      color: var(--app-primary);
      cursor: pointer;
    }

    @media (max-width: 360px) {
      flex-direction: column;

      input,
      select {
        flex: 1 1 auto;
        width: 100%;
        max-width: 100%;
      }
    }
  }

  /* =======================================================
     INGREDIENTES
     ======================================================= */

  &.ingredients-group {
    gap: 7px;

    input {
      min-height: 42px;
    }

    > small {
      padding: 0 2px;

      color: var(--app-muted-dark);
      font-size: 0.73rem;
      font-weight: 400;
      line-height: 1.45;
    }
  }

  /* =======================================================
     GUARNICIONES
     ======================================================= */

  &.garnish-group {
    gap: 7px;
  }

  .garnish-toggle {
    display: flex;
    align-items: center;
    gap: 11px;

    width: 100%;
    min-height: 58px;

    box-sizing: border-box;
    padding: 10px 13px;

    border: 1px solid var(--app-border);
    border-radius: 10px;

    background: var(--app-surface);

    cursor: pointer;

    transition:
      border-color 180ms ease,
      background-color 180ms ease,
      box-shadow 180ms ease;

    &:hover {
      border-color: var(--app-accent);
      background: var(--app-surface-soft);
    }

    &:has(.garnish-checkbox:checked) {
      border-color: var(--app-accent);
      background: var(--app-primary-soft);

      box-shadow: 0 0 0 2px rgba(var(--app-primary-rgb), 0.05);
    }

    .garnish-checkbox {
      appearance: auto;
      -webkit-appearance: checkbox;

      width: 18px;
      height: 18px;
      min-height: 18px;

      flex: 0 0 18px;

      margin: 0;
      padding: 0;

      accent-color: var(--app-primary);
      cursor: pointer;

      box-shadow: none;

      &:focus {
        box-shadow: none;
      }
    }

    .garnish-toggle-copy {
      display: flex;
      flex-direction: column;
      gap: 3px;

      flex: 1;
      min-width: 0;

      strong {
        color: var(--app-primary);
        font-size: 0.82rem;
        font-weight: 800;
        line-height: 1.35;
      }

      small {
        color: var(--app-muted-dark);
        font-size: 0.73rem;
        font-weight: 400;
        line-height: 1.4;
      }
    }
  }

  /* =======================================================
     OPCIONES DE GUARNICIÓN
     ======================================================= */

  .garnish-options {
    display: flex;
    flex-direction: column;
    gap: 7px;

    width: 100%;
    min-width: 0;

    box-sizing: border-box;
    padding: 12px;

    border: 1px solid var(--app-border);
    border-radius: 10px;

    background: var(--app-surface-soft);

    animation: garnishReveal 180ms ease-out;

    > label {
      color: var(--app-ink);
      font-size: 0.79rem;
      font-weight: 750;
    }

    input {
      background: var(--app-white);
    }

    small {
      color: var(--app-muted-dark);
      font-size: 0.72rem;
      line-height: 1.4;
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

  /* =======================================================
     RESPONSIVE DE LOS GRUPOS
     ======================================================= */

  @media (max-width: 520px) {
    .category-input {
      gap: 6px;
    }

    .garnish-toggle {
      min-height: 58px;
      padding: 10px;
      gap: 9px;

      .garnish-toggle-copy {
        strong {
          font-size: 0.8rem;
        }

        small {
          font-size: 0.72rem;
        }
      }
    }

    .garnish-options {
      padding: 10px;
    }
  }
`;

// =========================================================
// ERRORES DE VALIDACIÓN
// =========================================================

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
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;

  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  margin-top: 0;
  padding-top: 14px;

  border-top: 1px solid var(--app-border);

  button {
    min-width: 125px;
    min-height: 42px;
  }

  @media (max-width: 480px) {
    gap: 8px;
    padding-top: 12px;

    button {
      flex: 1 1 0;
      min-width: 0;
      padding: 10px 8px;
    }
  }

  @media (max-width: 340px) {
    flex-direction: column-reverse;
    align-items: stretch;

    button {
      width: 100%;
      flex: 1 1 auto;
    }
  }
`;

// =========================================================
// BOTÓN CANCELAR
// =========================================================

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
