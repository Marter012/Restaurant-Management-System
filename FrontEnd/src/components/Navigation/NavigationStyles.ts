import styled from "styled-components";

export const NavigationContainer = styled.nav`
  position: relative;
  width: 100%;
  min-width: 0;
  flex-shrink: 0;
  .navigation-links {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
  }
  a,
  button:not(.menu-toggle) {
    position: relative;
    width: 100%;
    min-height: 46px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 13px;
    padding: 0 13px;
    border: 1px solid transparent;
    border-radius: 12px;
    background: transparent;
    color: var(--app-border);
    text-decoration: none;
    font-family: inherit;
    font-size: 0.88rem;
    font-weight: 650;
    text-align: left;
    white-space: nowrap;
    transition:
      background 0.18s ease,
      color 0.18s ease,
      border-color 0.18s ease,
      transform 0.18s ease;
  }
  a svg,
  button:not(.menu-toggle) svg {
    flex: 0 0 19px;
    font-size: 17px;
    color: var(--app-white);
  }
  a:hover,
  button:not(.menu-toggle):hover {
    color: var(--app-white);
    background: var(--app-primary-active);
  }
  a.active {
    color: var(--app-primary-active);
    background: var(--app-accent);
    border-color: var(--app-accent);
    box-shadow: 0 6px 16px rgba(var(--app-primary-rgb), 0.141);
  }
  a.active svg {
    color: var(--app-primary-active);
  }
  a.active::after {
    content: none;
  }
  .menu-toggle {
    display: none;
    width: 42px;
    height: 42px;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--app-primary);
    border-radius: 12px;
    background: var(--app-primary-active);
    color: var(--app-white);
    font-size: 18px;
  }
  ${""}
  @media (max-width: 980px) {
    width: auto;
    .menu-toggle {
      display: flex;
    }
    .navigation-links {
      position: absolute;
      top: calc(100% + 14px);
      right: 0;
      z-index: 1000;
      width: min(300px, calc(100vw - 24px));
      height: auto;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 5px;
      border: 1px solid var(--app-surface-soft);
      border-radius: 18px;
      background: var(--app-white);
      box-shadow: 0 22px 55px rgba(var(--app-shadow-rgb), 0.149);
      opacity: 0;
      visibility: hidden;
      transform: translateY(-7px);
      pointer-events: none;
      transition:
        opacity 0.18s ease,
        transform 0.18s ease,
        visibility 0.18s ease;
    }
    .navigation-links.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
    }
    a,
    button:not(.menu-toggle) {
      color: var(--app-primary-active);
      min-height: 46px;
    }
    a svg,
    button:not(.menu-toggle) svg {
      color: var(--app-primary);
    }
    a:hover,
    button:not(.menu-toggle):hover {
      color: var(--app-primary-active);
      background: var(--app-surface-soft);
    }
    a.active {
      color: var(--app-primary-active);
      background: var(--app-accent);
    }
  }
`;

export const PrintButton = styled.button`
  position: relative;

  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 8px;

  padding: 0 20px;

  box-sizing: border-box;
  flex-shrink: 0;

  border: none;
  border-radius: 0;

  background: transparent !important;
  color: #c29e70;
  border: none !important;
  font-size: 0.95rem;
  font-weight: 500;

  white-space: nowrap;
  cursor: pointer;

  transition:
    background-color 0.2s ease,
    color 0.2s ease;
  &:hover {
    color: #f4e9d8 !important;
    background-color: rgba(194, 158, 112, 0.12) !important;
  }

  &:focus-visible {
    outline: 2px solid #c29e70;
    outline-offset: -2px;
  }

  span {
    font-size: 0.95rem;
    font-weight: 500;
  }

  @media (max-width: 1300px) {
    width: 100%;
    height: 48px;

    justify-content: flex-start;
    gap: 12px;

    padding: 0 14px;

    border-radius: 8px;

    font-size: 0.9rem;

    span {
      display: inline;
    }
  }

  @media (max-width: 400px) {
    height: 46px;
    padding: 0 12px;
  }
`;

export const PrintIndicator = styled.span<{
  $online: boolean;
}>`

  right: 13px;

  width: 7px;
  height: 7px;

  border-radius: 50%;

  background-color: ${({ $online }) => ($online ? "#35a853" : "#d9534f")};

  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.15);

  pointer-events: none;

`;
