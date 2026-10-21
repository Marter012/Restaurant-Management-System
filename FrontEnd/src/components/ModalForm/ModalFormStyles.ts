import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: clamp(10px, 2.5vw, 24px);
  box-sizing: border-box;
  overflow-y: auto;
  overscroll-behavior: contain;

  background: rgba(var(--app-shadow-rgb), 0.6);

  z-index: 1000;
`;

export const ModalContainer = styled.div`
  min-width: 600px;
  max-width: 80dvw;
  height: 80dvh;
  margin: auto;

  display: flex;
  flex-direction: column;

  background-color: var(--app-white);

  border-radius: 14px;

  overflow: hidden;

  box-shadow: 0 10px 40px rgba(var(--app-shadow-rgb), 0.3);
  @media (max-width: 1000px) {
    min-width: 90dvw;
    max-width: 90dvw;
  }
`;

export const ModalHeader = styled.div`
  min-height: 65px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;

  background: linear-gradient(135deg, #b78350 0%, #94633d 50%, #60351f 100%);

  color: var(--app-white);

  h3 {
    color: var(--app-white);
    margin: 0;
    font-size: 1.3rem;
  }
`;

export const CloseButton = styled.button`
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 50%;

  background: transparent;

  color: var(--app-white);

  cursor: pointer;

  transition: 0.2s;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: rgba(var(--app-white-rgb), 0.15);
  }
`;

export const ModalContent = styled.div`
  height: 100%;
  padding: 25px;

  overflow-y: auto;
  text-align: center;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  form {
    width: 100%;
    height: 100%;
  }
`;
