import styled from "styled-components";

export const CashBlockedOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 11000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background: var(--modal-overlay);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

export const CashBlockedModal = styled.section`
  width: min(1050px, 100%);
  max-height: 92dvh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background: var(--modal-background);
  border: 1px solid var(--modal-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  animation: modalAppear 0.22s ease-out;

  @keyframes modalAppear {
    from {
      opacity: 0;
      transform: translateY(12px) scale(0.98);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 700px) {
    border-radius: var(--radius-lg);
  }
`;

export const CashBlockedHeader = styled.header`
  min-height: 82px;
  padding: 15px 24px;
  display: flex;
  align-items: center;
  gap: 17px;
  border-bottom: 1px solid var(--color-border);

  h2 {
    flex: 1;
    margin: 0;
    color: var(--color-primary);
    font-size: clamp(1.2rem, 2.5vw, 1.7rem);
    font-weight: 850;
    letter-spacing: -0.5px;
    line-height: 1.2;
  }

  @media (max-width: 700px) {
    min-height: auto;
    padding: 13px;
    gap: 10px;

    h2 {
      font-size: 1.1rem;
    }
  }
`;

export const CashBlockedWarningIcon = styled.div`
  width: 76px;
  height: 76px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: var(--radius-xl);
  background: var(--color-primary-soft);
  color: var(--color-accent);
  font-size: 3rem;

  @media (max-width: 700px) {
    width: 54px;
    height: 54px;
    border-radius: var(--radius-md);
    font-size: 2rem;
  }
`;

export const CashBlockedCloseButton = styled.button`
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
  color: var(--color-primary);
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background: var(--color-primary-soft);
  }
`;

export const CashBlockedContent = styled.div`
  min-height: 230px;
  padding: 22px 30px;
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  align-items: center;
  gap: 25px;
  box-sizing: border-box;

  @media (max-width: 700px) {
    min-height: auto;
    padding: 18px;
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const CashBlockedIllustration = styled.div`
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;

  .illustration-circle {
    position: relative;
    width: 155px;
    height: 155px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--color-surface-muted);
  }

  .register-icon {
    font-size: 5rem;
    color: var(--color-primary);
  }

  .lock-icon {
    position: absolute;
    right: 0;
    bottom: 12px;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border: 4px solid var(--color-white);
    border-radius: 50%;
    background: var(--color-danger);
    color: var(--color-white);
    font-size: 1.5rem;
  }

  @media (max-width: 700px) {
    min-height: 130px;
    padding-bottom: 15px;

    .illustration-circle {
      width: 125px;
      height: 125px;
    }

    .register-icon {
      font-size: 4rem;
    }

    .lock-icon {
      width: 40px;
      height: 40px;
      right: 0;
      bottom: 8px;
      font-size: 1.2rem;
      border-width: 3px;
    }
  }
`;

export const CashBlockedInformation = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    margin: 0;
    color: var(--color-primary);
    font-size: 0.95rem;
    font-weight: 500;
    line-height: 1.5;
  }

  @media (max-width: 700px) {
    gap: 14px;

    > p {
      font-size: 0.9rem;
    }
  }
`;

export const CashBlockedDetails = styled.div`
  padding: 8px 17px;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
`;

export const CashBlockedDetailRow = styled.div`
  min-height: 45px;
  display: grid;
  grid-template-columns: 28px 85px minmax(0, 1fr);
  align-items: center;
  gap: 9px;
  color: var(--color-primary);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
  }

  svg {
    font-size: 1.3rem;
    color: var(--color-accent);
  }

  strong {
    font-size: 0.85rem;
    font-weight: 800;
  }

  span {
    font-size: 0.9rem;
    overflow-wrap: anywhere;
  }

  @media (max-width: 480px) {
    grid-template-columns: 24px 70px minmax(0, 1fr);
    gap: 7px;

    svg {
      font-size: 1.1rem;
    }

    strong,
    span {
      font-size: 0.8rem;
    }
  }
`;

export const CashBlockedActions = styled.footer`
  min-height: 95px;
  padding: 18px 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 14px;
  border-top: 1px solid var(--color-border);

  @media (max-width: 600px) {
    min-height: auto;
    padding: 16px;
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
`;

export const CashBlockedCancelButton = styled.button`
  min-width: 145px;
  min-height: 48px;
  padding: 11px 20px;
  border: 1px solid var(--color-primary-soft);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-primary);
  font-size: 0.92rem;
  font-weight: 750;
  cursor: pointer;

  &:hover {
    background: var(--color-surface-hover);
  }
`;

export const CashBlockedConfirmButton = styled.button`
  min-width: 250px;
  min-height: 48px;
  padding: 11px 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  border: none;
  border-radius: var(--radius-md);
  background: linear-gradient(110deg, var(--color-accent), var(--color-primary));
  color: var(--color-white);
  font-size: 0.92rem;
  font-weight: 800;
  cursor: pointer;
  box-shadow: var(--shadow-md);
  transition:
    filter 0.2s ease,
    transform 0.2s ease;

  &:hover {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }

  @media (max-width: 600px) {
    min-width: 0;
  }
`;
