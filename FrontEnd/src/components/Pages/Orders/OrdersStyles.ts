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
  border-radius: 11px;
  background: linear-gradient(110deg, var(--app-accent), var(--app-primary));
  color: var(--app-white);
  font-size: 0.95rem;
  font-weight: 750;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(var(--app-shadow-rgb), 0.12);
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
  position: relative;
  width: 100%;
  display: block;
  text-decoration: none;
  color: inherit;
  box-sizing: border-box;

  &::after {
    content: "▣   Ir a Cajas";
    position: absolute;
    bottom: 25px;
    left: 50%;
    transform: translateX(-50%);

    width: 220px;
    min-height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid var(--app-accent);
    border-radius: 13px;
    background: linear-gradient(110deg, var(--app-accent), var(--app-primary));

    color: var(--app-white);
    font-size: 1.05rem;
    font-weight: 800;
    box-shadow: 0 5px 14px rgba(var(--app-shadow-rgb), 0.14);
    transition:
      filter 0.2s ease,
      transform 0.2s ease;
  }

  &:hover::after {
    filter: brightness(1.08);
    transform: translate(-50%, -2px);
  }

  @media (max-width: 600px) {
    &::after {
      width: calc(100% - 40px);
      bottom: 18px;
    }
  }
`;
export const CashMessage = styled.div`
  position: relative;
  isolation: isolate;

  width: 100%;
  min-height: 510px;
  padding: 35px 25px 105px;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 17px;

  overflow: hidden;
  text-align: center;

  background: var(--app-white);
  border: 2px solid var(--app-accent-soft);
  border-radius: 20px;

  box-shadow: 0 12px 30px rgba(var(--app-shadow-rgb), 0.06);

  &::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 25px;
    left: 50%;
    width: 250px;
    height: 200px;
    transform: translateX(-50%);

    background: radial-gradient(
      circle,
      var(--app-surface-soft) 0%,
      var(--app-accent-soft) 65%,
      transparent 72%
    );

    border-radius: 48% 52% 55% 45%;
    opacity: 0.85;
  }

  & > svg {
    width: 125px;
    height: 125px;
    margin: 0;
    padding: 15px;
    box-sizing: border-box;

    color: var(--app-primary);
    font-size: 5rem;

    filter: drop-shadow(
      0 5px 5px rgba(var(--app-shadow-rgb), 0.12)
    );
  }

  h2 {
    margin: 0;
    color: var(--app-primary);
    font-size:  2rem;
    font-weight: 850;
    line-height: 1.2;
    letter-spacing: -0.7px;
  }

  p {
    margin: 0;
    color: var(--app-ink);
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.5;
  }

  span {
    width: min(650px, 100%);
    min-height: 62px;
    padding: 12px 20px;
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;

    border-radius: 17px;
    background: var(--app-surface-soft);

    color: var(--app-primary);
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.5;

    &::before {
      content: "ⓘ";
      flex-shrink: 0;
      font-size: 1.6rem;
      color: var(--app-accent);
    }
  }

  @media (max-width: 700px) {
    min-height: 470px;
    padding: 25px 16px 90px;
    gap: 15px;

    &::before {
      width: 200px;
      height: 165px;
    }

    & > svg {
      width: 105px;
      height: 105px;
    }

    span {
      min-height: 58px;
      padding: 10px;
      font-size: 0.88rem;
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
  background: rgba(35, 21, 14, 0.58);
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
  background: var(--app-white);
  border: 1px solid var(--app-accent-soft);
  border-radius: 20px;
  box-shadow: 0 25px 80px rgba(var(--app-shadow-rgb), 0.3);
`;

export const CashBlockedHeader = styled.header`
  min-height: 76px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid var(--app-border);

  h2 {
    flex: 1;
    margin: 0;
    color: var(--app-primary);
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
  border-radius: 13px;
  background: var(--app-accent-soft);
  color: var(--app-accent);
  font-size: 1.7rem;
`;

export const CashBlockedCloseButton = styled.button`
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 10px;
  background: var(--app-surface-soft);
  color: var(--app-primary);
  font-size: 1.4rem;
  cursor: pointer;

  &:hover {
    background: var(--app-accent-soft);
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
    background: var(--app-surface-soft);
  }

  .register-icon {
    font-size: 5.2rem;
    color: var(--app-primary);
  }

  .lock-icon {
    position: absolute;
    right: -5px;
    bottom: 5px;
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border: 4px solid var(--app-white);
    border-radius: 50%;
    background: var(--app-danger);
    color: var(--app-white);
    font-size: 1.4rem;
  }
`;

export const CashBlockedInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  p {
    margin: 0;
    color: var(--app-primary);
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

export const CashBlockedDetails = styled.div`
  padding: 10px 16px;
  border-radius: 13px;
  background: var(--app-surface-soft);
`;

export const CashBlockedDetailRow = styled.div`
  min-height: 46px;
  display: grid;
  grid-template-columns: 25px 65px minmax(0, 1fr);
  align-items: center;
  gap: 9px;
  color: var(--app-primary);

  &:not(:last-child) {
    border-bottom: 1px solid var(--app-border);
  }

  svg {
    color: var(--app-accent);
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
  border-top: 1px solid var(--app-border);

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
  border: 1px solid var(--app-accent-soft);
  border-radius: 10px;
  background: var(--app-white);
  color: var(--app-primary);
  font-weight: 750;
  cursor: pointer;

  &:hover {
    background: var(--app-surface-soft);
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
  border-radius: 10px;
  background: linear-gradient(
    110deg,
    var(--app-accent),
    var(--app-primary)
  );
  color: var(--app-white);
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
  border: 1px solid var(--app-accent-soft);
  border-left: 5px solid var(--app-danger);
  border-radius: 16px;
  background: var(--app-white);
  box-shadow: 0 8px 24px rgba(var(--app-shadow-rgb), 0.07);

  /* TABLET Y ESCRITORIO: aviso vertical, centrado y consistente. */
  @media (min-width: 601px) {
    flex-direction: column;
    align-items: center;
    gap: 14px;
    margin: 18px 0 22px;
    padding: 24px 28px;
    border-left: 0;
    border-top: 5px solid var(--app-danger);
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
    border-top: 4px solid var(--app-danger);
    border-radius: 13px;
    box-shadow: 0 5px 14px rgba(var(--app-shadow-rgb), 0.06);
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
  border-radius: 13px;
  background: var(--app-accent-soft);
  color: var(--app-danger);
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
    color: var(--app-primary);
    font-size: 1.08rem;
    font-weight: 800;
  }

  p {
    margin: 0;
    color: var(--app-muted-dark);
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
  color: var(--app-primary);
  font-size: 0.88rem;

  svg {
    color: var(--app-accent);
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
    border: 1px solid var(--app-border);
    border-radius: 11px;
    background: var(--app-surface-soft);
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
    border: 1px solid var(--app-border);
    border-radius: 9px;
    background: var(--app-surface-soft);
    font-size: 0.78rem;
    line-height: 1.3;

    svg {
      flex-shrink: 0;
      font-size: 0.92rem;
    }
  }
`;