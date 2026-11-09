import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 var(--color-accent);
  }

  70% {
    box-shadow: 0 0 0 10px transparent;
  }

  100% {
    box-shadow: 0 0 0 0 transparent;
  }
`;

export const PrintStatusContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  padding: 12px 8px 4px;
  box-sizing: border-box;

  text-align: center;
`;

export const PrintStatusIcon = styled.div`
  position: relative;

  width: 76px;
  height: 76px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid var(--color-accent);
  border-radius: 50%;

  background-color: var(--color-primary-soft);
  color: var(--color-primary);

  font-size: 38px;
  font-weight: 800;
  line-height: 1;

  animation: ${pulse} 2s ease-out infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const PrintStatusIndicator = styled.span`
  position: absolute;

  top: 2px;
  right: 2px;

  width: 14px;
  height: 14px;

  border: 3px solid var(--color-white);
  border-radius: 50%;

  background-color: var(--color-primary);
`;

export const PrintStatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 7px 12px;

  border: 1px solid var(--color-accent);
  border-radius: 999px;

  background-color: var(--color-primary-soft);
  color: var(--color-primary);

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const PrintStatusTitle = styled.h3`
  width: 100%;
  margin: 0;

  color: var(--color-text);

  font-size: clamp(20px, 4vw, 25px);
  font-weight: 800;
  line-height: 1.25;

  overflow-wrap: anywhere;
`;

export const PrintStatusDescription = styled.p`
  width: 100%;
  max-width: 380px;

  margin: 0;

  color: var(--color-text-secondary);

  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;

  overflow-wrap: anywhere;
`;
