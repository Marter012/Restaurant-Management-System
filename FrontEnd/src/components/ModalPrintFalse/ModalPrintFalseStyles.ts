import styled, { keyframes } from "styled-components";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(var(--app-accent-rgb), 0.25);
  }

  70% {
    box-shadow: 0 0 0 10px rgba(var(--app-accent-rgb), 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(var(--app-accent-rgb), 0);
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

  border: 1px solid var(--app-accent);
  border-radius: 50%;

  background-color: var(--app-accent-soft);
  color: var(--app-primary);

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

  border: 3px solid var(--app-white);
  border-radius: 50%;

  background-color: var(--app-primary);
`;

export const PrintStatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 7px 12px;

  border: 1px solid var(--app-accent);
  border-radius: 999px;

  background-color: var(--app-accent-soft);
  color: var(--app-primary);

  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const PrintStatusTitle = styled.h3`
  width: 100%;
  margin: 0;

  color: var(--app-ink);

  font-size: clamp(20px, 4vw, 25px);
  font-weight: 800;
  line-height: 1.25;

  overflow-wrap: anywhere;
`;

export const PrintStatusDescription = styled.p`
  width: 100%;
  max-width: 380px;

  margin: 0;

  color: var(--app-muted);

  font-size: 14px;
  font-weight: 400;
  line-height: 1.7;

  overflow-wrap: anywhere;
`;

export const PrintStatusActions = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 8px;
  padding-top: 16px;

  border-top: 1px solid var(--app-primary-soft);
`;

export const PrintStatusButton = styled.button`
  width: 100%;
  max-width: 240px;
  min-height: 44px;

  display: inline-flex;
  align-items: center;
  justify-content: center;

  padding: 11px 20px;

  border: none;
  border-radius: 10px;

  background-color: var(--app-primary);
  color: var(--app-white);

  font-family: inherit;
  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background-color: var(--app-primary-hover);
    box-shadow: 0 4px 12px rgba(var(--app-shadow-rgb), 0.15);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 2px solid var(--app-accent);
    outline-offset: 3px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
