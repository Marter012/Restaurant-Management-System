import styled from "styled-components";
import { InputStyles } from "../Utils/GlobalStyles.ts";

export type ModalSize = "small" | "default" | "large" | "compact";

interface ModalContainerProps {
  $size?: ModalSize;
}

interface ModalContentProps {
  $scroll?: "active" | "false";
}

// =========================================================
// CONTENEDOR PRINCIPAL
// =========================================================

export const ModalContainer = styled.div<ModalContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  ${InputStyles}

  width: ${({ $size = "default" }) => {
    if ($size === "compact") return "min(620px, calc(100vw - 32px))";
    if ($size === "small") return "min(680px, calc(100vw - 32px))";
    if ($size === "large") return "min(1450px, calc(100vw - 32px))";
    return "min(1120px, calc(100vw - 32px))";
  }};

  min-width: 0;
  max-width: calc(100vw - 24px);

  height: ${({ $size }) =>
    $size === "compact" ? "auto" : "min(95dvh, 900px)"};

  max-height: ${({ $size }) =>
    $size === "compact"
      ? "min(520px, calc(100dvh - 32px))"
      : "calc(100dvh - 24px)"};

  min-height: 0;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid rgba(var(--app-shadow-rgb), 0.12);
  border-radius: 22px;
  background: var(--app-white);
  color: var(--app-primary-active);
  box-shadow:
    0 28px 70px rgba(var(--app-shadow-rgb), 0.28),
    0 8px 24px rgba(var(--app-shadow-rgb), 0.12);

  // =========================================================
  // TABLET
  // =========================================================

  @media (max-width: 900px) {
    width: ${({ $size }) =>
      $size === "compact" ? "min(620px, calc(100vw - 32px))" : "95vw"};

    min-width: 0;

    min-width: ${({ $size }) =>
      $size === "compact"
        ? "min(620px, calc(100vw - 32px))"
        : "95vw"} !important;
    height: ${({ $size }) => ($size === "compact" ? "auto" : "90dvh")};

    max-height: ${({ $size }) =>
      $size === "compact" ? "min(520px, calc(100dvh - 32px))" : "90dvh"};

    border-radius: 18px;
  }

  // =========================================================
  // CELULAR
  // =========================================================

  @media (max-width: 600px) {
    width: ${({ $size }) =>
      $size === "compact" ? "min(620px, calc(100vw - 32px))" : "80vw"};

    min-width: 0;

    max-width: ${({ $size }) =>
      $size === "compact" ? "min(620px, calc(100vw - 32px))" : "80vw"};

    height: ${({ $size }) => ($size === "compact" ? "auto" : "90dvh")};

    max-height: ${({ $size }) =>
      $size === "compact" ? "min(520px, calc(100dvh - 32px))" : "90dvh"};

    border-radius: 16px;
  }

  // =========================================================
  // CELULAR PEQUEÑO
  // =========================================================

  @media (max-width: 380px) {
    width: ${({ $size }) =>
      $size === "compact" ? "min(620px, calc(100vw - 32px))" : "80vw"};

    max-width: ${({ $size }) =>
      $size === "compact" ? "min(620px, calc(100vw - 32px))" : "80vw"};

    border-radius: 14px;
  }
`;

// =========================================================
// HEADER
// =========================================================

export const ModalHeader = styled.header`
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex: 0 0 auto;
  padding: 18px 24px;
  border-bottom: 1px solid var(--app-border);
  background: var(--app-surface);
  color: var(--app-primary);

  @media (max-width: 600px) {
    padding: 14px 16px;
    gap: 10px;
  }

  @media (max-width: 380px) {
    padding: 11px 12px;
    gap: 8px;
  }
`;

export const HeaderIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  min-width: 0;

  @media (max-width: 600px) {
    gap: 11px;
  }

  @media (max-width: 380px) {
    gap: 9px;
  }
`;

export const HeaderIcon = styled.div`
  display: grid;
  place-items: center;
  flex: 0 0 58px;
  width: 58px;
  height: 58px;
  border-radius: 16px;
  background: var(--app-primary);
  color: var(--app-canvas);

  svg {
    width: 27px;
    height: 27px;
  }

  @media (max-width: 600px) {
    flex-basis: 46px;
    width: 46px;
    height: 46px;
    border-radius: 13px;

    svg {
      width: 22px;
      height: 22px;
    }
  }

  @media (max-width: 380px) {
    flex-basis: 38px;
    width: 38px;
    height: 38px;
    border-radius: 11px;

    svg {
      width: 19px;
      height: 19px;
    }
  }
`;

export const HeaderText = styled.div`
  min-width: 0;

  h2 {
    margin: 0;
    color: var(--app-primary-active);
    font-size: clamp(1.05rem, 2vw, 1.45rem);
    font-weight: 800;
    line-height: 1.25;
    overflow-wrap: anywhere;
  }

  p {
    margin: 5px 0 0;
    color: var(--app-muted-dark);
    font-size: 0.88rem;
    line-height: 1.4;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: clamp(0.98rem, 4vw, 1.18rem);
    }

    p {
      margin-top: 3px;
      font-size: 0.78rem;
      line-height: 1.35;
    }
  }

  @media (max-width: 380px) {
    h2 {
      font-size: 0.94rem;
    }

    p {
      font-size: 0.72rem;
    }
  }
`;

export const CloseButton = styled.button`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  width: 46px;
  height: 46px;
  padding: 0;
  border: 0;
  border-radius: 13px;
  background: var(--app-accent);
  color: var(--app-primary-active);
  cursor: pointer;
  transition:
    filter 0.18s ease,
    transform 0.18s ease;

  svg {
    font-size: 1.5rem;
  }

  &:hover {
    filter: brightness(1.08);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid var(--app-primary);
    outline-offset: 3px;
  }

  @media (max-width: 600px) {
    width: 38px;
    height: 38px;
  }

  @media (max-width: 380px) {
    width: 32px;
    height: 32px;
    border-radius: 9px;

    svg {
      font-size: 1.2rem;
    }
  }
`;

// =========================================================
// CONTENIDO
// =========================================================

export const ModalContent = styled.div<ModalContentProps>`
  flex: 1 1 auto;
  min-width: 0;
  min-height: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 20px 24px;
  overflow-x: hidden;
  overflow-y: ${({ $scroll = "active" }) =>
    $scroll === "active" ? "auto" : "hidden"};
  overscroll-behavior: contain;
  text-align: left;
  scrollbar-width: thin;
  scrollbar-color: var(--app-accent) transparent;

  form {
    width: 100%;
    min-width: 0;
    min-height: 0;
  }

  > * {
    min-width: 0;
  }

  @media (max-width: 600px) {
    padding: 16px;
  }

  @media (max-width: 380px) {
    padding: 12px;
  }
`;

// =========================================================
// FOOTER
// =========================================================

export const ModalFooter = styled.footer`
  flex: 0 0 auto;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 16px 24px;
  border-top: 1px solid var(--app-border);
  background: var(--app-surface);

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

// Cancelar y las acciones comparten el mismo sistema de layout.
export const FooterControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px 14px;

  width: 100%;
  min-width: 0;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: stretch;
    justify-items: stretch;
    gap: 8px;
    width: 100%;

    > div {
      display: contents;
    }

    > button,
    > div > button {
      width: 100%;
      min-width: 0;
      min-height: 44px;
      box-sizing: border-box;
      justify-self: stretch;
    }
  }
`;

export const FooterActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;

  flex: 0 1 auto;
  min-width: 0;

  button {
    flex: 0 0 auto;
    width: fit-content;
    min-width: max-content;
    min-height: 44px;
    padding: 9px 15px;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    display: contents;

    button {
      width: 100%;
      min-width: 0;
      min-height: 44px;
      padding: 8px 7px;
      white-space: normal;
      overflow-wrap: anywhere;
      font-size: 0.78rem;
    }
  }
`;

export const CancelButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  flex: 0 0 auto;
  width: fit-content;
  min-width: 128px;
  min-height: 44px;
  box-sizing: border-box;
  padding: 10px 20px;

  border: 1px solid var(--app-border);
  border-radius: 10px;
  background: var(--app-white);
  color: var(--app-primary);

  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;

  transition:
    background 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: var(--app-surface-soft);
    border-color: var(--app-accent);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid var(--app-primary);
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    min-width: 0;
    min-height: 44px;
    padding: 8px 7px;
    font-size: 0.78rem;
  }
`;
