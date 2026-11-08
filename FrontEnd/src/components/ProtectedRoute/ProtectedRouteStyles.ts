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

  background: var(--app-canvas);
  color: var(--app-ink);
`;

export const ProtectedSpinner = styled.div`
  width: 42px;
  height: 42px;

  border: 4px solid var(--app-border);
  border-top-color: var(--app-primary);
  border-radius: 50%;

  animation: ${rotate} 0.8s linear infinite;
`;

export const ProtectedLoadingText = styled.p`
  margin: 0;

  color: var(--app-muted);
  font-size: 14px;
  font-weight: 600;
`;