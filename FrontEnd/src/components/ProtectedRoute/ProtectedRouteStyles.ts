import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

export const ProtectedLoading = styled.div`
  width: 100%;
  min-height: 100dvh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;

  background: var(--color-background);
  color: var(--color-text);
`;

export const ProtectedSpinner = styled.div`
  width: 42px;
  height: 42px;

  border: 4px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;

  animation: ${rotate} 0.8s linear infinite;
`;

export const ProtectedLoadingText = styled.p`
  margin: 0;

  color: var(--color-text-secondary);
  font-size: var(--font-size-sm);
  font-weight: 600;
`;
