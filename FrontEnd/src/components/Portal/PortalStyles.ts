import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  z-index: 2147483647;

  width: 100%;
  height: 100%;
  height: 100dvh;

  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 12px;

  overflow-y: auto;
  overscroll-behavior: contain;

  background: rgba(var(--app-shadow-rgb), 0.58);

  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);

  animation: overlayIn 0.18s ease;

  @keyframes overlayIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (max-width: 600px) {
    padding: 10px;
    align-items: center;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const ModalSurface = styled.div`
  position: relative;

  margin: auto;
  padding: 0;

  display: flex;
  flex-direction: column;

  overflow: visible;

  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
  animation: modalIn 0.22s ease;

  @keyframes modalIn {
    from {
      opacity: 0;
      transform: translateY(8px) scale(0.985);
    }

    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;