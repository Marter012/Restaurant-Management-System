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
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;

    width: 100%;
    min-height: 44px;
    padding: 0 12px;

    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--color-sidebar-muted);

    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);
    font-weight: 600;
    line-height: 1.2;
    text-align: left;
    text-decoration: none;
    white-space: nowrap;

    transition:
      background-color var(--transition-normal),
      color var(--transition-normal),
      border-color var(--transition-normal),
      transform var(--transition-fast);
  }

  a svg,
  button:not(.menu-toggle) svg {
    flex: 0 0 19px;
    color: currentColor;
    font-size: 17px;
  }

  a:hover,
  button:not(.menu-toggle):hover {
    background: var(--color-sidebar-surface);
    color: var(--color-sidebar-text);
  }

  a:active,
  button:not(.menu-toggle):active {
    transform: translateY(1px);
  }

  a.active,
  a[aria-current="page"] {
    border-color: var(--color-sidebar-border);
    background: var(--color-sidebar-active);
    color: var(--color-sidebar-text);
    box-shadow: inset 3px 0 0 var(--color-accent);
  }

  a.active svg,
  a[aria-current="page"] svg {
    color: var(--color-white);
  }

  .menu-toggle {
    display: none;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    padding: 0;

    border: 1px solid var(--color-sidebar-border);
    border-radius: var(--radius-md);
    background: var(--color-sidebar-surface);
    color: var(--color-sidebar-text);

    font-size: 18px;
    transition:
      background-color var(--transition-normal),
      border-color var(--transition-normal);
  }

  .menu-toggle:hover {
    border-color: color-mix(in srgb, var(--color-accent) 55%, transparent);
    background: var(--color-sidebar-active);
  }

  /* TABLET: ICON-ONLY SIDEBAR */
  @media (min-width: 621px) and (max-width: 1024px) {
    width: 100%;

    .menu-toggle {
      display: none;
    }

    .navigation-links {
      position: static;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;

      width: 100%;
      height: auto;
      padding: 0;

      border: 0;
      border-radius: 0;
      background: transparent;
      box-shadow: none;

      opacity: 1;
      visibility: visible;
      transform: none;
      pointer-events: auto;
    }

    a,
    button:not(.menu-toggle) {
      justify-content: center;
      gap: 0;

      width: 50px;
      min-width: 50px;
      min-height: 48px;
      height: 48px;
      padding: 0;

      border-radius: var(--radius-md);
    }

    a span,
    button:not(.menu-toggle) span {
      display: none;
    }

    a svg,
    button:not(.menu-toggle) svg {
      flex: 0 0 auto;
      font-size: 19px;
    }

    a.active,
    a[aria-current="page"] {
      box-shadow: inset 0 -3px 0 var(--color-accent);
    }
  }

  /* MOBILE: HAMBURGER MENU */
  @media (max-width: 620px) {
    width: auto;

    .menu-toggle {
      display: flex;
      flex: 0 0 42px;
    }

    .navigation-links {
      position: absolute;
      top: calc(100% + 12px);
      right: 0;
      z-index: 1000;

      display: flex;
      flex-direction: column;
      align-items: stretch;
      gap: 4px;

      width: min(300px, calc(100vw - 24px));
      height: auto;
      padding: 8px;

      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      background: var(--color-surface);
      box-shadow: var(--shadow-lg);

      opacity: 0;
      visibility: hidden;
      transform: translateY(-6px);
      pointer-events: none;

      transition:
        opacity var(--transition-normal),
        transform var(--transition-normal),
        visibility var(--transition-normal);
    }

    .navigation-links.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
      pointer-events: auto;
    }

    a,
    button:not(.menu-toggle) {
      min-height: 44px;
      color: var(--color-text);
    }

    a svg,
    button:not(.menu-toggle) svg {
      color: var(--color-primary);
    }

    a:hover,
    button:not(.menu-toggle):hover {
      background: var(--color-surface-muted);
      color: var(--color-primary);
    }

    a.active,
    a[aria-current="page"] {
      border-color: transparent;
      background: var(--color-primary-soft);
      color: var(--color-primary);
      box-shadow: inset 3px 0 0 var(--color-primary);
    }

    a.active svg,
    a[aria-current="page"] svg {
      color: var(--color-primary);
    }
  }

  @media (max-width: 380px) {
    .menu-toggle {
      flex-basis: 38px;
      width: 38px;
      height: 38px;
    }
  }
`;

export const PrintButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  height: 100%;
  padding: 0 16px;
  flex-shrink: 0;

  border: 1px solid transparent;
  border-radius: var(--radius-md);
  background: transparent;
  color: var(--color-sidebar-muted);

  font-family: var(--font-family-base);
  font-size: var(--font-size-sm);
  font-weight: 600;
  white-space: nowrap;

  cursor: pointer;

  transition:
    background-color var(--transition-normal),
    color var(--transition-normal),
    border-color var(--transition-normal);

  &:hover {
    border-color: var(--color-sidebar-border);
    background: var(--color-sidebar-surface);
    color: var(--color-sidebar-text);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  span {
    font-size: inherit;
    font-weight: inherit;
  }

  @media (max-width: 1300px) {
    justify-content: flex-start;
    width: 100%;
    height: 46px;
    padding: 0 12px;
  }

  @media (min-width: 621px) and (max-width: 1024px) {
    justify-content: center;
    width: 50px;
    min-width: 50px;
    height: 48px;
    padding: 0;

    span {
      display: none;
    }
  }

  @media (max-width: 400px) {
    height: 44px;
    padding: 0 10px;
  }
`;

export const PrintIndicator = styled.span<{
  $online: boolean;
}>`
  display: inline-block;
  flex: 0 0 8px;
  width: 8px;
  height: 8px;

  border-radius: 50%;
  background-color: ${({ $online }) =>
    $online ? "var(--color-success)" : "var(--color-danger)"};

  box-shadow: 0 0 0 3px
    ${({ $online }) =>
      $online
        ? "var(--color-success-soft)"
        : "var(--color-danger-soft)"};

  pointer-events: none;
`;
