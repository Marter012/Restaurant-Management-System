import styled from "styled-components";

export const NavBarContainer = styled.header`
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 1;
  width: 258px;
  min-height: 100dvh;
  padding: 28px 17px 18px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;
  overflow-y: auto;
  overflow-x: visible;
  background: linear-gradient(
    -50deg,
    var(--app-navbar-start) 0%,
    var(--app-primary) 30%,
    var(--app-accent) 100%
  );

  color: var(--app-navbar-text);
  border: 1px solid var(--app-navbar-border);
  box-shadow: var(--app-navbar-shadow);
  color: var(--app-surface-soft);
  border-right: 1px solid var(--app-primary-active);
  box-shadow: 12px 0 38px rgba(var(--app-shadow-rgb), 0.08);
  & > :nth-child(1) {
    order: 1;
  }
  & > :nth-child(3) {
    order: 2;
  }
  & > :nth-child(2) {
    order: 3;
    margin-top: auto;
    width: 100%;
  }
  & > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 9px;
    padding-top: 16px;
    border-top: 1px solid var(--app-primary-active);
  }
  & > div:nth-of-type(2) button {
    max-width: 100%;
  }
  & > div:nth-of-type(2) > * {
    width: 100%;
  }
  @media (max-width: 980px) {
    inset: 0 0 auto 0;
    width: 100%;
    min-height: 76px;
    height: auto;
    padding: 12px 18px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    overflow: visible;
    border-right: 0;
    border-bottom: 1px solid var(--app-primary-active);
    & > :nth-child(1) {
      order: 1;
    }
    & > :nth-child(3) {
      order: 3;
    }
    & > :nth-child(2) {
      order: 2;
      margin: 0 0 0 auto;
      width: auto;
    }
    & > div:nth-of-type(2) {
      flex-direction: row;
      align-items: center;
      gap: 7px;
      padding: 0;
      border-top: 0;
      width: auto;
    }
    & > div:nth-of-type(2) > * {
      width: auto;
    }
  }
  @media (max-width: 620px) {
    padding: 10px 12px;
    min-height: 68px;
    gap: 8px;
  }
`;
