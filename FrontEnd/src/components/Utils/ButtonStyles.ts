import styled, { css } from "styled-components";

// =========================================================
// BOTÓN PRINCIPAL Y ESTADOS
// Se aplica únicamente cuando se importa y se utiliza.
// =========================================================

export const caramelButtonStyles = css`
  background: var(--color-primary);
  color: var(--color-white);
  border-color: var(--color-primary);

  &:hover:not(:disabled) {
    background: var(--color-primary-hover);
    border-color: var(--color-primary-hover);
  }

  &:active:not(:disabled) {
    background: var(--color-sidebar-deep);
    border-color: var(--color-sidebar-deep);
  }
`;

export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 19px;
  border: 1px solid var(--color-primary);
  border-radius: var(--radius-md);
  background: var(--color-primary);
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: 700;
  cursor: pointer;
  transition:
    transform var(--transition-fast),
    background var(--transition-fast),
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);

  &:hover:not(:disabled) {
    background: var(--color-primary-hover);
    border-color: var(--color-primary-hover);
    box-shadow: var(--shadow-md);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.58;
    cursor: not-allowed;
  }

  &.ligth {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: var(--color-white);
    box-shadow: var(--shadow-sm);

    &:hover:not(:disabled) {
      background: var(--color-primary-hover);
      border-color: var(--color-primary-hover);
    }
  }
`;

export const CancelButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 19px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: var(--font-size-sm);
  font-weight: 700;
  cursor: pointer;
  transition:
    background var(--transition-fast),
    border-color var(--transition-fast),
    color var(--transition-fast);

  &:hover:not(:disabled) {
    background: var(--color-surface-hover);
    border-color: var(--color-border-strong);
  }

  &:disabled {
    opacity: 0.58;
    cursor: not-allowed;
  }
`;

export const StatusButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 19px;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: 700;
  cursor: pointer;
  background: var(--color-success);

  transition:
    background var(--transition-fast),
    border-color var(--transition-fast),
    transform var(--transition-fast),
    filter var(--transition-fast);

  &.active {
    background: var(--color-success) !important;
    border-color: var(--color-success) !important;
    color: var(--color-white) !important;
  }

  &.inactive {
    background: var(--color-primary) !important;
    border-color: var(--color-primary) !important;
    color: var(--color-white) !important;
  }

  &:hover:not(:disabled) {
    filter: brightness(1.07);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &.danger {
    background: var(--color-danger) !important;
    border-color: var(--color-danger) !important;
    color: var(--color-white) !important;
  }
`;
