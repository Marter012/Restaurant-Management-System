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

  background: var(--color-surface-hover);
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

    color: var(--color-primary);

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

  color: var(--color-text-secondary);

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

  border: 6px solid var(--color-primary-soft);
  border-top-color: var(--color-text-secondary);

  animation: ${spin} 1s linear infinite;

  @media (max-width: 600px) {
    width: 58px;
    height: 58px;

    border-width: 5px;
  }
`;

export const Title = styled.h2`
  margin: 0;

  color: var(--color-primary);

  font-size: 20px;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const Subtitle = styled.p`
  margin: 8px 0 28px;

  color: var(--color-text-secondary);

  font-size: 14px;
`;

export const StatusContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;

  gap: 10px;

  padding: 20px;

  box-sizing: border-box;

  background: var(--color-surface-hover);

  border: 1px solid var(--color-primary-soft);

  border-radius: var(--radius-lg);

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
    $completed ? "var(--color-primary)" : "var(--color-text-secondary)"};

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
    $completed ? "var(--color-white)" : "var(--color-text-secondary)"};

  background: ${({ $completed }) =>
    $completed ? "var(--color-primary)" : "transparent"};

  font-size: 13px;

  transition:
    background 0.3s ease,
    color 0.3s ease;
`;

export const RetryButton = styled.button`
  margin-top: 25px;

  padding: 11px 28px;

  border: none;
  border-radius: var(--radius-md);

  background: var(--color-primary);
  color: var(--color-white);

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: var(--color-primary-hover);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
