import styled from "styled-components";
import { InputStyles } from "../Utils/GlobalStyles.ts";

export type ModalSize = "small" | "default" | "large" | "compact";

interface ModalContainerProps {
  $size?: ModalSize;
}

interface ModalContentProps {
  $scroll?: "active" | "false";
}

/* =====================================================
   MODAL CONTAINER
===================================================== */

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
    $size === "compact" ? "auto" : "min(90dvh, 900px)"};

  max-height: ${({ $size }) =>
    $size === "compact"
      ? "min(520px, calc(100dvh - 32px))"
      : "calc(100dvh - 24px)"};

  min-height: 0;
  box-sizing: border-box;
  overflow: hidden;

  border: 1px solid var(--modal-border);
  border-radius: var(--radius-xl);
  background: var(--modal-background);
  color: var(--color-text);

  box-shadow: var(--modal-shadow);

  @media (max-width: 900px) {
    width: ${({ $size }) =>
      $size === "compact"
        ? "min(620px, calc(100vw - 32px))"
        : "calc(100vw - 40px)"};

    max-width: calc(100vw - 32px);
    height: ${({ $size }) =>
      $size === "compact" ? "auto" : "min(88dvh, 820px)"};

    max-height: ${({ $size }) =>
      $size === "compact"
        ? "min(520px, calc(100dvh - 32px))"
        : "calc(100dvh - 32px)"};

    border-radius: var(--radius-lg);
  }

  @media (max-width: 600px) {
    width: calc(100vw - 24px);
    max-width: calc(100vw - 24px);

    height: ${({ $size }) =>
      $size === "compact" ? "auto" : "min(90dvh, 760px)"};

    max-height: calc(100dvh - 24px);
    border-radius: var(--radius-md);
  }

  @media (max-width: 380px) {
    width: calc(100vw - 16px);
    max-width: calc(100vw - 16px);
    max-height: calc(100dvh - 16px);
    border-radius: var(--radius-md);
  }
`;

/* =====================================================
   HEADER
===================================================== */

export const ModalHeader = styled.header`
  position: relative;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  flex: 0 0 auto;
  padding: 18px 24px;

  border-bottom: 1px solid var(--modal-border);
  background: var(--color-surface);
  color: var(--color-text);

  @media (max-width: 600px) {
    gap: 10px;
    padding: 14px 16px;
  }

  @media (max-width: 380px) {
    gap: 8px;
    padding: 11px 12px;
  }
`;

export const HeaderIdentity = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
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
  flex: 0 0 48px;

  width: 48px;
  height: 48px;

  border: 1px solid var(--color-primary-soft);
  border-radius: var(--radius-md);
  background: var(--color-primary-soft);
  color: var(--color-primary);

  svg {
    width: 23px;
    height: 23px;
  }

  @media (max-width: 600px) {
    flex-basis: 42px;
    width: 42px;
    height: 42px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  @media (max-width: 380px) {
    flex-basis: 36px;
    width: 36px;
    height: 36px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const HeaderText = styled.div`
  min-width: 0;

  h2 {
    margin: 0;
    color: var(--color-text);
    font-family: var(--font-family-heading);
    font-size: clamp(var(--font-size-lg), 2vw, var(--font-size-xl));
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.025em;
    overflow-wrap: anywhere;
  }

  p {
    margin: 4px 0 0;
    color: var(--color-text-secondary);
    font-family: var(--font-family-description);
    font-size: var(--font-size-sm);
    line-height: 1.4;
  }

  @media (max-width: 600px) {
    h2 {
      font-size: var(--font-size-md);
    }

    p {
      margin-top: 3px;
      font-size: var(--font-size-xs);
    }
  }

  @media (max-width: 380px) {
    h2 {
      font-size: var(--font-size-sm);
    }

    p {
      font-size: 0.7rem;
    }
  }
`;

export const CloseButton = styled.button`
  display: grid;
  place-items: center;
  flex: 0 0 40px;

  width: 40px;
  height: 40px;
  padding: 0;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text-secondary);

  cursor: pointer;

  transition:
    background-color var(--transition-normal),
    border-color var(--transition-normal),
    color var(--transition-normal),
    transform var(--transition-fast);

  svg {
    font-size: 1.25rem;
  }

  &:hover {
    border-color: var(--color-danger-soft);
    background: var(--color-danger-soft);
    color: var(--color-danger);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    flex-basis: 36px;
    width: 36px;
    height: 36px;
  }

  @media (max-width: 380px) {
    flex-basis: 32px;
    width: 32px;
    height: 32px;

    svg {
      font-size: 1.1rem;
    }
  }
`;

/* =====================================================
   CONTENT
===================================================== */

export const ModalContent = styled.div<ModalContentProps>`
  flex: 1 1 auto;
  width: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;

  padding: 20px 24px;

  overflow-x: hidden;
  overflow-y: ${({ $scroll = "active" }) =>
    $scroll === "active" ? "auto" : "hidden"};

  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border-strong) transparent;

  color: var(--color-text);
  font-family: var(--font-family-base);
  text-align: left;

  form {
    width: 100%;
    min-width: 0;
    min-height: 0;
  }

  > * {
    min-width: 0;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 999px;
    background: var(--color-border-strong);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-light);
  }

  @media (max-width: 600px) {
    padding: 16px;
  }

  @media (max-width: 380px) {
    padding: 12px;
  }
`;

/* =====================================================
   FOOTER
===================================================== */

export const ModalFooter = styled.footer`
  flex: 0 0 auto;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;

  padding: 16px 24px;

  border-top: 1px solid var(--modal-border);
  background: var(--color-surface);

  @media (max-width: 600px) {
    padding: 12px 16px;
  }

  @media (max-width: 380px) {
    padding: 10px 12px;
  }
`;

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
      font-size: var(--font-size-xs);
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
  padding: 10px 18px;

  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text-secondary);

  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: 600;
  white-space: nowrap;

  cursor: pointer;

  transition:
    background-color var(--transition-normal),
    border-color var(--transition-normal),
    color var(--transition-normal),
    transform var(--transition-fast);

  &:hover {
    border-color: var(--color-border-strong);
    background: var(--color-surface-hover);
    color: var(--color-text);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    min-width: 0;
    min-height: 44px;
    padding: 8px 7px;
    font-size: var(--font-size-xs);
  }
`;
