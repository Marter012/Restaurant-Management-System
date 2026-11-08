import styled, { keyframes } from "styled-components";
import type { AlertType } from "./Alert";

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-35px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateX(0) scale(1);
  }
`;

export const AlertContainer = styled.div<{
  $type: AlertType;
  $stackIndex: number;
}>`
  position: fixed;
  left: 24px;
  bottom: ${({ $stackIndex }) => `calc(24px + ${$stackIndex} * 76px)`};
  z-index: 20000;

  display: flex;
  align-items: center;
  gap: 12px;

  width: max-content;
  max-width: min(90vw, 420px);
  min-width: 280px;

  padding: 15px 17px;

  border: 1px solid
    ${({ $type }) =>
      $type === "success" ? "var(--app-success)" : "var(--app-danger)"};

  border-radius: 13px;

  background: ${({ $type }) =>
    $type === "success" ? "var(--app-success)" : "var(--app-danger)"};

  color: white;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);

  animation: ${slideIn} 0.28s cubic-bezier(0.22, 1, 0.36, 1) both;

  will-change: transform, opacity;

  @media (max-width: 480px) {
    left: 15px;
    bottom: ${({ $stackIndex }) => `calc(15px + ${$stackIndex} * 76px)`};

    width: calc(100vw - 30px);
    max-width: none;
    min-width: 0;
    box-sizing: border-box;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const AlertIcon = styled.span`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;

  font-size: 1.2rem;
`;

export const AlertMessage = styled.p`
  flex: 1;
  min-width: 0;
  margin: 0;

  font-size: 0.9rem;
  font-weight: 650;
  line-height: 1.45;

  overflow-wrap: anywhere;
`;

export const CloseButton = styled.button`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;

  width: 26px;
  height: 26px;
  padding: 0;

  border: none;
  border-radius: 6px;

  background: transparent;
  color: inherit;

  cursor: pointer;
  font-size: 1rem;

  transition: background 0.18s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
  }
`;