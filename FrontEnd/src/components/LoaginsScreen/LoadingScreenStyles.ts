import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  position: relative;

  width: 100%;
  height: 100dvh;
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  box-sizing: border-box;
  overflow-y: auto;

  background: var(--app-surface-soft);
`;

export const Content = styled.div`
  width: 100%;
  max-width: 420px;
  height: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 40px 30px;

  box-sizing: border-box;

  text-align: center;

  @media (max-width: 600px) {
    max-width: 340px;
    padding: 30px 20px;
  }
`;

export const Brand = styled.div`
  margin-bottom: 35px;

  h1 {
    margin: 0;

    color: var(--app-primary);

    font-size: 25px;
    font-weight: 700;

    letter-spacing: 2px;
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 21px;
    }
  }
`;

export const BrandSubtitle = styled.span`
  display: block;

  margin-top: 7px;

  color: var(--app-muted-dark);

  font-size: 14px;

  letter-spacing: 1.5px;
`;

export const SpinnerContainer = styled.div`
  width: 90px;
  height: 90px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 28px;
`;

export const Spinner = styled.div`
  width: 68px;
  height: 68px;

  border-radius: 50%;

  border: 6px solid var(--app-accent-soft);
  border-top-color: var(--app-muted-dark);

  animation: ${spin} 1s linear infinite;

  @media (max-width: 600px) {
    width: 58px;
    height: 58px;

    border-width: 5px;
  }
`;

export const Title = styled.h2`
  margin: 0;

  color: var(--app-primary);

  font-size: 20px;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const Subtitle = styled.p`
  margin: 8px 0 28px;

  color: var(--app-muted-dark);

  font-size: 14px;
`;

export const StatusContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 10px;

  padding: 20px;

  box-sizing: border-box;

  background: rgba(var(--app-white-rgb), 0.45);

  border: 1px solid var(--app-accent-soft);

  border-radius: 14px;

  @media (max-width: 600px) {
    padding: 16px;
  }
`;

interface StatusProps {
  $completed: boolean;
}

export const StatusItem = styled.div<StatusProps>`
  display: flex;
  align-items: center;

  gap: 10px;

  color: ${({ $completed }) =>
    $completed ? "var(--app-primary)" : "var(--app-muted-dark)"};

  font-size: 14px;

  text-align: left;

  transition:
    color 0.3s ease,
    opacity 0.3s ease;
`;

export const StatusIcon = styled.span<StatusProps>`
  width: 22px;
  height: 22px;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;

  border-radius: 50%;

  color: ${({ $completed }) =>
    $completed ? "var(--app-white)" : "var(--app-muted)"};

  background: ${({ $completed }) =>
    $completed ? "var(--app-muted-dark)" : "transparent"};

  font-size: 13px;

  transition:
    background 0.3s ease,
    color 0.3s ease;
`;

export const RetryButton = styled.button`
  margin-top: 25px;

  padding: 11px 28px;

  border: none;
  border-radius: 10px;

  background: var(--app-muted-dark);
  color: var(--app-white);

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: var(--app-primary);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
