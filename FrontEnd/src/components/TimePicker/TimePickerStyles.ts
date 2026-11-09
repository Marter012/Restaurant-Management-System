import styled from "styled-components";

export const TimePickerContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 0;
  height: 46px;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition:
    border-color var(--transition-normal),
    background var(--transition-normal),
    box-shadow var(--transition-normal),
    transform var(--transition-fast);

  background: var(--color-background);

  &:hover {
    border-color: var(--color-accent);
  }

  cursor: pointer;

  &:focus-within {
    border-color: var(--color-primary);
    background: var(--color-background);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }

  &:has(input:disabled) {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const TimePickerIcon = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 42px;
  height: 100%;
  padding: 0;
  border: none;
  background: transparent;
  color: var(--color-primary);
  font-size: 1.3rem;
  cursor: pointer;

  transition:
    color var(--transition-normal),
    transform var(--transition-normal);

  &:hover {
    color: var(--color-accent);
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: -3px;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const TimePickerTextInput = styled.input`
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 100%;
  padding: 0 8px 0 0;
  border: none;
  outline: none;
  cursor: pointer;

  color: var(--color-primary);
  font-size: 0.9rem;
  font-weight: 750;
  letter-spacing: 0.05em;
  box-sizing: border-box;

  &::placeholder {
    color: var(--color-text-secondary);
    opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const TimePickerNativeInput = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
  opacity: 0;
  pointer-events: none;
  cursor: pointer;
`;
