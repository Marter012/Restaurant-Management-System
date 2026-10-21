import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const SessionContainer = styled.main`
  width: 100%;
  min-height: 100dvh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  box-sizing: border-box;

  background:
    radial-gradient(
      circle at top left,
      rgba(var(--app-accent-rgb), 0.45),
      transparent 40%
    ),
    radial-gradient(
      circle at bottom right,
      rgba(var(--app-accent-rgb), 0.2),
      transparent 40%
    ),
    var(--app-surface-soft);

  position: relative;
  overflow: hidden;

  color: var(--app-primary);

  &::before {
    content: "";
    position: absolute;
    inset: 0;

    pointer-events: none;

    opacity: 0.1;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cg fill='none' stroke='%23653007' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 25 Q32 12 44 25 Q32 38 20 25 Z'/%3E%3Cpath d='M26 25 L38 25'/%3E%3Ccircle cx='100' cy='35' r='12'/%3E%3Ccircle cx='100' cy='35' r='7'/%3E%3Cpath d='M25 95 Q38 80 51 95 L47 106 Q38 115 29 106 Z'/%3E%3Cpath d='M31 95 L45 95 M33 101 L43 101'/%3E%3Cpath d='M91 100 L91 120 M85 100 L97 100 M87 106 L95 106 M87 112 L95 112'/%3E%3C/g%3E%3C/svg%3E");

    background-repeat: repeat;
    background-size: 140px 140px;
  }
`;

export const SessionCard = styled.section`
  position: relative;
  z-index: 1;

  width: 100%;
  max-width: 390px;

  padding: 38px 30px;

  display: flex;
  flex-direction: column;
  align-items: center;

  box-sizing: border-box;

  text-align: center;

  background: rgba(var(--app-white-rgb), 0.94);

  border: 1px solid var(--app-accent-soft);
  border-radius: 22px;

  box-shadow:
    0 18px 45px rgba(var(--app-shadow-rgb), 0.1),
    0 4px 12px rgba(var(--app-shadow-rgb), 0.05);

  animation: ${fadeIn} 0.4s ease both;

  > span {
    color: var(--app-primary);
    font-size: 14px;
    font-weight: 600;
  }

  @media (max-width: 500px) {
    padding: 32px 22px;
    border-radius: 18px;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const SessionLogo = styled.div`
  width: 66px;
  height: 66px;

  margin-bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--app-warning);
  color: var(--app-primary);

  border: 1px solid rgba(var(--app-shadow-rgb), 0.1);

  font-size: 22px;
  font-weight: 800;
  letter-spacing: 1px;

  box-shadow: 0 6px 18px rgba(var(--app-shadow-rgb), 0.1);
`;

export const SessionTitle = styled.h1`
  margin: 0;

  color: var(--app-primary);

  font-size: 23px;
  font-weight: 700;
  line-height: 1.3;

  @media (max-width: 500px) {
    font-size: 21px;
  }
`;

export const SessionDescription = styled.p`
  margin: 10px 0 0;

  color: var(--app-muted-dark);

  font-size: 14px;
  line-height: 1.6;
`;

export const SpinnerContainer = styled.div`
  width: 54px;
  height: 54px;

  margin: 28px 0 18px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.div`
  width: 42px;
  height: 42px;

  border: 4px solid var(--app-accent-soft);
  border-top-color: var(--app-primary);

  border-radius: 50%;

  animation: ${spin} 0.85s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: 2s;
  }
`;