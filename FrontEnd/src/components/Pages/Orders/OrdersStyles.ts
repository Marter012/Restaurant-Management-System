import styled from "styled-components";
import { Link } from "react-router-dom";

export const ContainerOrder = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const NewOrderButton = styled.button`
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 46px;
  padding: 11px 24px;
  border: 0;
  border-radius: var(--radius-md);
  background: linear-gradient(110deg, var(--color-accent), var(--color-primary));
  color: var(--color-white);
  font-size: 0.95rem;
  font-weight: 750;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition:
    transform 0.2s ease,
    filter 0.2s ease;

  &:hover {
    filter: brightness(1.06);
    transform: translateY(-1px);
  }

  @media (max-width: 650px) {
    width: 100%;
  }
`;

/* =========================================================
ESTADO SIN CAJA DISPONIBLE
========================================================= */

export const CashMessageLink = styled(Link)`
  display: block;
  width: 100%;
  text-decoration: none;
  color: inherit;
`;

export const CashMessage = styled.div`
  position: relative;
  width: 100%;
  min-height: 190px;
  padding: 30px 35px 30px 150px;

  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-rows: auto auto auto;
  align-content: center;
  gap: 9px;

  background: var(--color-white);
  border: 1px solid var(--color-accent);
  border-left: 6px solid var(--color-accent);
  border-radius: var(--radius-xl);

  box-shadow: var(--shadow-md);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  /* Icono */
  svg {
    position: absolute;
    left: 40px;
    top: 50%;
    transform: translateY(-50%);

    width: 76px;
    height: 76px;
    padding: 17px;

    color: var(--color-primary);
    background: var(--color-primary-soft);
    border-radius: var(--radius-xl);
  }

  /* Separador vertical */
  &::before {
    content: "";
    position: absolute;
    left: 126px;
    top: 18%;
    bottom: 18%;

    width: 2px;
    background: var(--color-border-strong);
  }

  h2 {
    margin: 0;
    color: var(--color-primary);

    font-size: clamp(18px, 1.5vw, 23px);
    font-weight: 750;
    line-height: 1.4;
  }

  p {
    margin: 0;
    color: var(--color-text);

    font-size: clamp(14px, 1.15vw, 18px);
    line-height: 1.6;
  }

  span {
    display: block;
    margin-top: 3px;

    color: var(--color-accent);

    font-size: 14px;
    font-weight: 650;
    line-height: 1.5;
  }

  ${CashMessageLink}:hover & {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
  }

  @media (max-width: 900px) {
    min-height: 175px;
    padding: 24px 24px 24px 115px;

    svg {
      left: 22px;
      width: 66px;
      height: 66px;
      padding: 15px;
    }

    &::before {
      left: 100px;
    }
  }

  @media (max-width: 600px) {
    min-height: auto;
    padding: 24px 20px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;

    svg {
      position: static;
      transform: none;

      width: 58px;
      height: 58px;
      padding: 13px;

      margin-bottom: 3px;
    }

    &::before {
      display: none;
    }

    h2 {
      font-size: 19px;
    }

    p {
      font-size: 14px;
    }

    span {
      font-size: 13px;
    }
  }
`;

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

  @media (max-width: 600px) {
    padding: 12px;
  }
`;

export const CashBlockedModal = styled.section`
  width: min(760px, 100%);
  max-height: 90dvh;
  display: flex;
  flex-direction: column;
  overflow: auto;
  background: var(--color-white);
  border: 1px solid var(--color-primary-soft);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
`;

export const CashBlockedHeader = styled.header`
  min-height: 76px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid var(--color-border);

  h2 {
    flex: 1;
    margin: 0;
    color: var(--color-primary);
    font-size: clamp(1.1rem, 2.5vw, 1.6rem);
    font-weight: 850;
  }
`;

export const CashBlockedWarningIcon = styled.div`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  background: var(--color-primary-soft);
  color: var(--color-accent);
  font-size: 1.7rem;
`;

export const CashBlockedCloseButton = styled.button`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
  color: var(--color-primary);
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background: var(--color-primary-soft);
  }
`;

export const CashBlockedContent = styled.div`
  padding: 28px;
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr);
  align-items: center;
  gap: 28px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 20px;
  }
`;

export const CashBlockedIllustration = styled.div`
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
    font-size: 5.2rem;
    color: var(--color-primary);
  }

  .lock-icon {
    position: absolute;
    right: -5px;
    bottom: 5px;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border: 4px solid var(--color-white);
    border-radius: 50%;
    background: var(--color-danger);
    color: var(--color-white);
    font-size: 1.4rem;
  }
`;

export const CashBlockedInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  p {
    margin: 0;
    color: var(--color-primary);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

export const CashBlockedDetails = styled.div`
  padding: 10px 16px;
  border-radius: var(--radius-md);
  background: var(--color-surface-muted);
`;

export const CashBlockedDetailRow = styled.div`
  min-height: 46px;
  display: grid;
  grid-template-columns: 25px 65px minmax(0, 1fr);
  align-items: center;
  gap: 9px;
  color: var(--color-primary);

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-border);
  }

  svg {
    color: var(--color-accent);
    font-size: 1.2rem;
  }

  strong,
  span {
    font-size: 0.88rem;
  }
`;

export const CashBlockedActions = styled.footer`
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid var(--color-border);

  @media (max-width: 600px) {
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
`;

export const CashBlockedCancelButton = styled.button`
  min-height: 44px;
  padding: 10px 20px;
  border: 1px solid var(--color-primary-soft);
  border-radius: var(--radius-md);
  background: var(--color-white);
  color: var(--color-primary);
  font-weight: 750;
  cursor: pointer;

  &:hover {
    background: var(--color-surface-muted);
  }
`;

export const CashBlockedConfirmButton = styled.button`
  min-height: 44px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  border: none;
  border-radius: var(--radius-md);
  background: linear-gradient(
    110deg,
    var(--color-accent),
    var(--color-primary)
  );
  color: var(--color-white);
  font-weight: 800;
  cursor: pointer;

  &:hover {
    filter: brightness(1.08);
  }
`;

/* AVISO INFORMATIVO EN COMANDAS */

export const OrderNotice = styled.section`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin: 18px 0 22px;
  padding: 20px 22px;
  border: 1px solid var(--color-primary-soft);
  border-left: 5px solid var(--color-danger);
  border-radius: var(--radius-lg);
  background: var(--color-white);
  box-shadow: var(--shadow-md);

  /* TABLET Y ESCRITORIO: aviso vertical, centrado y consistente. */
  @media (min-width: 601px) {
    flex-direction: column;
    align-items: center;
    gap: 14px;
    margin: 18px 0 22px;
    padding: 24px 28px;
    border-left: 0;
    border-top: 5px solid var(--color-danger);
    border-radius: 17px;
    text-align: center;

    & > button {
      min-width: 220px;
      min-height: 46px;
      justify-content: center;
    }
  }

  /* CELULAR: misma composición, con dimensiones más compactas. */
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin: 12px 0 16px;
    padding: 14px 12px;
    border-left: 0;
    border-top: 4px solid var(--color-danger);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
    text-align: center;

    & > button {
      width: 100%;
      min-height: 42px;
      justify-content: center;
    }
  }
`;

export const OrderNoticeIcon = styled.div`
  width: 44px;
  height: 44px;
  flex: 0 0 44px;
  display: grid;
  place-items: center;
  border-radius: var(--radius-md);
  background: var(--color-primary-soft);
  color: var(--color-danger);
  font-size: 1.55rem;

  @media (min-width: 601px) {
    width: 48px;
    height: 48px;
    flex-basis: 48px;
    align-self: center;
    border-radius: 14px;
    font-size: 1.6rem;
  }

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
    flex-basis: 40px;
    align-self: center;
    border-radius: 12px;
    font-size: 1.35rem;
  }
`;

export const OrderNoticeContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;

  h2 {
    margin: 0;
    color: var(--color-primary);
    font-size: 1.08rem;
    font-weight: 800;
  }

  p {
    margin: 0;
    color: var(--color-text-secondary);
    font-size: 0.92rem;
    line-height: 1.5;
  }

  @media (min-width: 601px) {
    width: 100%;
    align-items: center;
    gap: 9px;
    text-align: center;

    h2 {
      font-size: 1.2rem;
      line-height: 1.3;
    }

    p {
      max-width: 900px;
      font-size: 0.95rem;
      line-height: 1.55;
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    align-items: center;
    gap: 7px;
    text-align: center;

    h2 {
      font-size: 1.02rem;
      line-height: 1.3;
    }

    p {
      font-size: 0.82rem;
      line-height: 1.45;
    }
  }
`;

export const OrderNoticeDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 24px;
  margin-top: 5px;

  @media (min-width: 601px) {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 10px 14px;
    margin-top: 8px;
  }

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    width: 100%;
    gap: 6px;
    margin-top: 6px;
  }
`;

export const OrderNoticeDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary);
  font-size: 0.88rem;

  svg {
    color: var(--color-accent);
    font-size: 1.1rem;
  }

  strong {
    font-weight: 800;
  }

  @media (min-width: 601px) {
    min-width: 210px;
    min-height: 42px;
    padding: 9px 14px;
    box-sizing: border-box;
    justify-content: center;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-surface-muted);
    font-size: 0.88rem;
    line-height: 1.35;

    svg {
      flex-shrink: 0;
      font-size: 1.05rem;
    }
  }

  @media (max-width: 600px) {
    min-width: 0;
    min-height: 36px;
    padding: 6px 8px;
    box-sizing: border-box;
    justify-content: flex-start;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface-muted);
    font-size: 0.78rem;
    line-height: 1.3;

    svg {
      flex-shrink: 0;
      font-size: 0.92rem;
    }
  }
`;