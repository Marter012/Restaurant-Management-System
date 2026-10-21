import styled from "styled-components";

export const LoginContainer = styled.main`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;

  box-sizing: border-box;

  background-color: var(--app-surface-soft);

  background-image:
    radial-gradient(
      circle at 15% 20%,
      rgba(var(--app-accent-rgb), 0.45),
      transparent 35%
    ),
    radial-gradient(
      circle at 85% 80%,
      rgba(var(--app-accent-rgb), 0.18),
      transparent 35%
    );

  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;

    pointer-events: none;

    opacity: 0.13;

    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cg fill='none' stroke='%23653007' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M25 25 Q40 8 55 25 Q40 42 25 25 Z'/%3E%3Cpath d='M31 25 L49 25 M40 15 L40 35'/%3E%3Cpath d='M125 30 C125 18 143 18 143 30 C143 42 125 42 125 30 Z'/%3E%3Cpath d='M134 21 L134 39 M125 30 L143 30'/%3E%3Cpath d='M28 112 Q45 94 62 112 L58 125 Q45 136 32 125 Z'/%3E%3Cpath d='M34 111 L56 111 M38 118 L52 118 M41 125 L49 125'/%3E%3Ccircle cx='133' cy='119' r='17'/%3E%3Ccircle cx='133' cy='119' r='11'/%3E%3Ccircle cx='129' cy='115' r='2'/%3E%3Ccircle cx='138' cy='122' r='2'/%3E%3Cpath d='M82 70 L82 94 M75 70 L89 70 M78 76 L86 76 M78 82 L86 82 M78 88 L86 88'/%3E%3Cpath d='M105 145 Q115 132 125 145 Q115 158 105 145 Z'/%3E%3Cpath d='M108 145 L122 145'/%3E%3C/g%3E%3C/svg%3E");

    background-repeat: repeat;
    background-size: 180px 180px;

  }
`;

export const LoginCard = styled.div`
  position: relative;
  z-index: 1;

  width: 100%;
  max-width: 420px;

  padding: 38px 34px;

  box-sizing: border-box;

  background: rgba(var(--app-white-rgb), 0.94);

  border: 1px solid var(--app-accent-soft);
  border-radius: 20px;

  box-shadow:
    0 18px 45px rgba(var(--app-shadow-rgb), 0.12),
    0 4px 12px rgba(var(--app-shadow-rgb), 0.06);

  text-align: center;

  backdrop-filter: blur(4px);

  @media (max-width: 500px) {
    padding: 32px 24px;
    border-radius: 17px;
  }
`;

export const LoginLogo = styled.div`
  width: 72px;
  height: 72px;

  margin: 0 auto 18px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background: var(--app-warning);
  color: var(--app-primary);

  font-size: 24px;
  font-weight: 800;

  box-shadow:
    0 6px 18px rgba(var(--app-shadow-rgb), 0.12);
`;

export const LoginTitle = styled.h1`
  margin: 0;

  color: var(--app-primary);

  font-size: 27px;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: 500px) {
    font-size: 24px;
  }
`;

export const LoginSubtitle = styled.p`
  margin: 9px 0 28px;

  color: var(--app-muted-dark);

  font-size: 14px;
  line-height: 1.5;
`;

export const LoginForm = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;

  text-align: left;

  .passwordShow{
    display: flex;
    justify-content: center;
    align-items: center;
    svg{
      width: 50px;
    }
  }
`;

export const LoginLabel = styled.label`
  margin-bottom: 8px;

  color: var(--app-accent);

  font-size: 14px;
  font-weight: 600;
`;

export const LoginInput = styled.input`
  width: 100%;
  height: 48px;

  padding: 0 14px;

  box-sizing: border-box;

  border: 1px solid var(--app-accent-soft);
  border-radius: 11px;

  background: var(--app-white);

  color: var(--app-primary);

  font-size: 15px;

  outline: none;

  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;

  &::placeholder {
    color: var(--app-muted-dark);
  }

  &:focus {
    background: var(--app-white);
    border-color: var(--app-accent);

    box-shadow:
      0 0 0 3px rgba(var(--app-accent-rgb), 0.12);
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 48px;

  margin-top: 20px;

  border: none;
  border-radius: 11px;

  background: var(--app-primary);
  color: var(--app-white);

  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.15s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: var(--app-primary-active);

    box-shadow:
      0 6px 16px rgba(var(--app-shadow-rgb), 0.18);
  }

  &:active {
    transform: translateY(1px);
  }
`;

export const LoginError = styled.span`
  display: block;

  margin-top: 9px;

  color: var(--app-danger);

  font-size: 13px;
  font-weight: 500;
`;