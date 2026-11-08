import styled, { css } from "styled-components";

// =========================================================
// BOTÓN CHOCOLATE Y CARAMELO
// Se aplica únicamente cuando se importa y se utiliza.
// =========================================================

export const caramelButtonStyles = css`
  background-image: linear-gradient(
    135deg,
    #B78350 0%,
    #94633D 50%,
    #60351F 100%
  ) !important;

  color: #FFF8EC;
  border-color: #94633D;

  &:hover {
    background-image: linear-gradient(
      135deg,
      #C4925F 0%,
      #A67549 50%,
      #70452C 100%
    );
  }

  &:active {
    background-image: linear-gradient(
      135deg,
      #94633D 0%,
      #60351F 100%
    );
  }
`;


export const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 46px;
  padding: 0 19px;
  border: 1px solid var(--app-primary);
  border-radius: 11px;
  background: var(--app-primary);
  color: var(--app-white);
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 750;
  cursor: pointer;
  transition:
    transform 180ms ease,
    filter 180ms ease,
    box-shadow 180ms ease;

  &:hover:not(:disabled) {
    filter: brightness(1.08);
    box-shadow: 0 8px 18px rgba(var(--app-shadow-rgb), 0.16);
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
    background: var(--app-accent);
    border-color: var(--app-accent);
    color: var(--app-white);
    box-shadow: 0 4px 12px rgba(var(--app-shadow-rgb), 0.15);
  }
`;

export const CancelButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0 19px;
  border: 1px solid var(--app-border);
  border-radius: 11px;
  background: var(--app-white);
  color: var(--app-primary);
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 180ms ease,
    border-color 180ms ease;

  &:hover:not(:disabled) {
    background: var(--app-surface-soft);
    border-color: var(--app-accent);
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
  border-radius: 11px;
  color: var(--app-white);
  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 750;
  cursor: pointer;
  transition:
    filter 180ms ease,
    transform 180ms ease;

  &.active {
    background: #4f8b50 !important;
    color: var(--app-white) !important;
  }

  &.inactive {
    background: var(--app-primary) !important;
    color: var(--app-white) !important;
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
    background-color: #c3212c;
}
`;
