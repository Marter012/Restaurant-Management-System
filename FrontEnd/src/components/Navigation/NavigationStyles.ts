import styled from "styled-components";

export const NavigationContainer = styled.nav`
  position: relative;
  width: 100%;
  min-width: 0;
  max-height: 100dvh;
  flex-shrink: 0;
  overflow: visible;

  /* ==========================================
     LISTA DE NAVEGACIÓN
  ========================================== */

  .navigation-links {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;

    width: 100%;
    max-height: calc(100dvh - 150px);
    min-height: 0;

    padding: 6px 0;
    box-sizing: border-box;

    /* Scroll vertical independiente */
    overflow-y: auto;
    overflow-x: hidden;

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  /* ==========================================
     ENLACES
  ========================================== */

  a,
  button:not(.menu-toggle) {
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    flex: 0 0 46px;

    width: 46px;
    height: 46px;
    min-height: 46px;

    padding: 0;
    box-sizing: border-box;

    border: 1px solid transparent;
    border-radius: 13px;

    background: transparent;
    color: var(--color-sidebar-muted);

    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);
    font-weight: 600;

    text-decoration: none;
    white-space: nowrap;

    cursor: pointer;

    transition:
      background-color 180ms ease,
      color 180ms ease,
      border-color 180ms ease,
      transform 180ms ease,
      box-shadow 180ms ease;
  }

  /* ==========================================
     ICONOS
  ========================================== */

  a svg,
  button:not(.menu-toggle) svg {
    display: block;

    flex: 0 0 25px;

    width: 25px;
    height: 25px;

    font-size: 25px;
  }

  /* ==========================================
     OCULTAR NOMBRES DENTRO DE LOS ENLACES
     LOS NOMBRES SE MUESTRAN EN EL TOOLTIP
  ========================================== */

  .navigation-links a > span:not(.notification-badge),
  .navigation-links button:not(.menu-toggle) > span:not(.notification-badge) {
    display: none !important;
  }

  /* ==========================================
     TOOLTIP INDEPENDIENTE DEL SCROLL
  ========================================== */

  .navigation-tooltip {
    display: block;

    position: fixed;

    left: 88px;

    z-index: 99999;

    width: max-content;
    max-width: 210px;

    padding: 11px 15px;

    box-sizing: border-box;

    border: 1px solid var(--color-sidebar-border);
    border-radius: 10px;

    background: var(--color-sidebar-deep);
    color: var(--color-sidebar-text);

    font-family: var(--font-family-base);
    font-size: 13px;
    font-weight: 650;
    line-height: 1.3;

    white-space: nowrap;

    box-shadow: var(--shadow-lg);

    pointer-events: none;

    transform: translateY(-50%);

    animation: navigationTooltipIn 150ms ease;
  }

  @keyframes navigationTooltipIn {
    from {
      opacity: 0;
      transform: translate(6px, -50%);
    }

    to {
      opacity: 1;
      transform: translate(0, -50%);
    }
  }

  /* ==========================================
     HOVER
  ========================================== */

  .navigation-links a:hover,
  .navigation-links button:not(.menu-toggle):hover {
    background: var(--color-sidebar-surface);
    color: var(--color-sidebar-text);

    border-color: var(--color-sidebar-border);
  }

  .navigation-links a:active,
  .navigation-links button:not(.menu-toggle):active {
    transform: scale(0.96);
  }

  .navigation-links a .notification-badge {
    position: absolute;
    top: -3px;
    right: -4px;
    display: grid;
    place-items: center;
    min-width: 19px;
    height: 19px;
    padding: 0 4px;
    border: 2px solid var(--color-sidebar-surface);
    border-radius: 999px;
    background: #dc2626;
    color: #fff;
    font-size: 0.62rem;
    font-weight: 950;
    line-height: 1;
    box-shadow: 0 2px 8px #0003;
    animation: notification-pop 220ms ease-out;
  }

  @keyframes notification-pop {
    from { transform: scale(0.55); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

  /* ==========================================
     RUTA ACTIVA
  ========================================== */

  .navigation-links a.active,
  .navigation-links a[aria-current="page"] {
    border-color: var(--color-sidebar-border);

    background: var(--color-sidebar-active);
    color: var(--color-sidebar-text);

    box-shadow: inset 3px 0 0 var(--color-accent);
  }

  .navigation-links a.active svg,
  .navigation-links a[aria-current="page"] svg {
    color: var(--color-white);
  }

  /* ==========================================
     ACCESIBILIDAD
  ========================================== */

  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 3px;
  }

  /* ==========================================
     BOTÓN MENÚ MOBILE
  ========================================== */

  .menu-toggle {
    display: none;

    align-items: center;
    justify-content: center;

    width: 42px;
    height: 42px;

    padding: 0;

    border: 1px solid var(--color-sidebar-border);
    border-radius: 10px;

    background: var(--color-sidebar-surface);
    color: var(--color-sidebar-text);

    font-size: 18px;

    cursor: pointer;
  }

  /* ==========================================
     DESKTOP
  ========================================== */

  @media (min-width: 621px) {
    width: 100%;

    .menu-toggle {
      display: none;
    }

    .navigation-links {
      position: relative;

      display: flex;
      flex-direction: column;
      align-items: center;

      width: 100%;

      max-height: calc(100dvh - 150px);

      overflow-y: auto;
      overflow-x: hidden;

      gap: 8px;
    }

    .navigation-links a,
    .navigation-links button:not(.menu-toggle) {
      flex: 0 0 46px;

      width: 46px;
      height: 46px;
      min-height: 46px;

      justify-content: center;
    }

    /* NUNCA MOSTRAR TEXTO AL LADO DEL ICONO */

    .navigation-links a > span:not(.notification-badge),
    .navigation-links button:not(.menu-toggle) > span:not(.notification-badge) {
      display: none !important;
    }

    .navigation-tooltip {
      display: block;
    }
  }

  /* ==========================================
     MOBILE
  ========================================== */

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

      z-index: 1500;

      display: flex;
      flex-direction: column;
      align-items: stretch;

      width: min(290px, calc(100vw - 24px));

      max-height: calc(100dvh - 100px);

      padding: 9px;
      gap: 5px;

      box-sizing: border-box;

      overflow-y: auto;
      overflow-x: hidden;

      border: 1px solid var(--color-border);
      border-radius: 13px;

      background: var(--color-surface);
      box-shadow: var(--shadow-lg);

      opacity: 0;
      visibility: hidden;
      pointer-events: none;

      transform: translateY(-6px);

      transition:
        opacity 180ms ease,
        transform 180ms ease,
        visibility 180ms ease;
    }

    .navigation-links.open {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;

      transform: translateY(0);
    }

    .navigation-links a,
    .navigation-links button:not(.menu-toggle) {
      display: flex;

      flex: 0 0 44px;

      justify-content: flex-start;

      width: 100%;
      min-height: 44px;
      height: 44px;

      padding: 0 12px;

      color: var(--color-text);
    }

    /* EN MOBILE LOS NOMBRES SÍ SE MUESTRAN
       DENTRO DEL MENÚ DESPLEGABLE */

    .navigation-links a > span:not(.notification-badge),
    .navigation-links button:not(.menu-toggle) > span:not(.notification-badge) {
      display: inline-block !important;

      position: static;

      width: auto;
      max-width: none;

      padding: 0;

      border: 0;
      border-radius: 0;

      background: transparent;
      color: inherit;

      box-shadow: none;

      opacity: 1;
      visibility: visible;
      pointer-events: auto;

      transform: none;

      font-size: var(--font-size-sm);
    }

    .navigation-links a svg,
    .navigation-links button:not(.menu-toggle) svg {
      flex: 0 0 22px;

      width: 22px;
      height: 22px;

      color: var(--color-primary);
    }

    .navigation-links a:hover,
    .navigation-links button:not(.menu-toggle):hover {
      background: var(--color-surface-muted);
      color: var(--color-primary);
    }

    .navigation-links a.active,
    .navigation-links a[aria-current="page"] {
      border-color: transparent;

      background: var(--color-primary-soft);
      color: var(--color-primary);

      box-shadow: inset 3px 0 0 var(--color-primary);
    }

    .navigation-links a.active svg,
    .navigation-links a[aria-current="page"] svg {
      color: var(--color-primary);
    }

    /* SIN TOOLTIP EN MOBILE */

    .navigation-tooltip {
      display: none;
    }
  }

  /* ==========================================
     PANTALLAS MUY PEQUEÑAS
  ========================================== */

  @media (max-width: 380px) {
    .menu-toggle {
      width: 38px;
      height: 38px;
      flex-basis: 38px;
    }
  }

  /* ==========================================
     MOVIMIENTO REDUCIDO
  ========================================== */

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
`;

/* ==========================================
   BOTÓN DE IMPRESIÓN
========================================== */

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
      $online ? "var(--color-success-soft)" : "var(--color-danger-soft)"};

  pointer-events: none;
`;
