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
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-sm);
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;

  background: var(--app-canvas);
  &:hover {
    border-color: var(--app-accent);
  }
    cursor: pointer;

  &:focus-within {
    border-color: var(--app-primary);
    background: var(--app-canvas);
    box-shadow: 0 0 0 3px var(--app-accent);
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
  color: var(--app-primary);
  font-size: 1.3rem;
  cursor: pointer;

  transition:
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    color: var(--app-accent);
    transform: scale(1.1);
  }

  &:focus-visible {
    outline: 2px solid var(--app-primary);
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

  color: var(--app-primary);
  font-size: 0.9rem;
  font-weight: 750;
  letter-spacing: 0.05em;
  box-sizing: border-box;

  &::placeholder {
    color: var(--app-muted-dark);
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
