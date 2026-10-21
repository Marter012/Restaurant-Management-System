import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  /*
   * =========================================================
   * PALETA GLOBAL DE COLORES — BOUTIQUE SABORES
   * =========================================================
   */

  :root {
    color-scheme: light;

    /* COLORES PRINCIPALES — CHOCOLATE ARTESANAL */
    --app-primary: #4A2818;
    --app-primary-hover: #603820;
    --app-primary-active: #351B10;
    --app-primary-soft: #EBD9C1;
    --app-primary-rgb: 74, 40, 24;

    /* ACENTOS — CARAMELO TOSTADO */
    --app-accent: #B7834E;
    --app-accent-hover: #99683A;
    --app-accent-soft: #F1DFC4;
    --app-accent-rgb: 183, 131, 78;

    /* FONDOS — CREMA PANADERÍA */
    --app-canvas: #F5E8D1;
    --app-paper: #FFF8EC;
    --app-surface: #FFFCF5;
    --app-surface-soft: #F3E5CF;
    --app-sidebar: #E8D3B2;
    --app-white: #FFFCF5;
    --app-white-rgb: 255, 252, 245;

    /* TEXTOS — CAFÉ OSCURO */
    --app-ink: #352116;
    --app-muted: #806752;
    --app-muted-dark: #624630;
    --app-muted-rgb: 128, 103, 82;

    /* BORDES — BEIGE NATURAL */
    --app-border: #DCC5A4;
    --app-border-strong: #C7A77E;
    --app-border-rgb: 220, 197, 164;

    /* ESTADOS — OPERACIONES EXITOSAS */
    --app-success: #527343;
    --app-success-soft: #E7EFDE;
    --app-success-rgb: 82, 115, 67;

    /* ESTADOS — ADVERTENCIAS */
    --app-warning: #B87928;
    --app-warning-soft: #FBEDD5;
    --app-warning-rgb: 184, 121, 40;

    /* ESTADOS — ERRORES Y ACCIONES CRÍTICAS */
    --app-danger: #B83D30;
    --app-danger-hover: #942E24;
    --app-danger-soft: #F8E5DF;
    --app-danger-rgb: 184, 61, 48;

    /* ESTADOS — INFORMACIÓN */
    --app-info: #587B91;
    --app-info-soft: #E6EFF3;

    /* SOMBRAS Y SUPERPOSICIONES */
    --app-shadow-rgb: 74, 40, 24;
    --app-overlay-rgb: 53, 33, 22;
    --app-overlay: rgba(var(--app-overlay-rgb), 0.58);

    --app-shadow-xs: 0 2px 6px rgba(var(--app-shadow-rgb), 0.04);
    --app-shadow-sm: 0 5px 16px rgba(var(--app-shadow-rgb), 0.07);
    --app-shadow: 0 12px 32px rgba(var(--app-shadow-rgb), 0.09);
    --app-shadow-lg: 0 24px 65px rgba(var(--app-shadow-rgb), 0.16);

    /* BORDES REDONDEADOS */
    --app-radius-sm: 8px;
    --app-radius: 13px;
    --app-radius-lg: 18px;
    --app-radius-xl: 24px;

    /* TIPOGRAFÍA */
    --app-font-body: 'DM Sans', sans-serif;
    --app-font-heading: 'Manrope', sans-serif;

    /* TRANSICIONES */
    --app-transition: 180ms ease;
    --app-transition-slow: 260ms ease;

    /* COMPATIBILIDAD CON ESTILOS ANTERIORES */
    --app-green: var(--app-primary);
    --app-green-dark: var(--app-primary-hover);
    --app-lime: var(--app-accent);
    --app-orange: var(--app-accent);

    /* NAVBAR — CHOCOLATE Y CARAMELO */
    --app-navbar-start: #4A2818;
    --app-navbar-end: #B7834E;
    --app-navbar-text: #FFF8EC;
    --app-navbar-text-muted: #F1DFC4;
    --app-navbar-border: rgba(255, 248, 236, 0.45);
    --app-navbar-shadow: 0 8px 28px rgba(74, 40, 24, 0.16);
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    width: 100%;
    min-height: 100%;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  html, body, #root {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    min-width: 320px;
    background: var(--app-canvas);
    color: var(--app-ink);
    font-family: var(--app-font-body);
    font-size: 14px;
    line-height: 1.55;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--app-ink);
    font-family: var(--app-font-heading);
    font-weight: 750;
    letter-spacing: -.035em;
    line-height: 1.25;
  }

  button, input, select, textarea {
    font: inherit;
  }

  /* =========================================================
     BOTONES — ESTILOS BASE
     El degradado se aplica de forma explícita en cada
     styled-component mediante caramelButtonStyles.
     ========================================================= */

  button {
    border-radius: var(--app-radius-sm);
    cursor: pointer;
    transition:
      background-color var(--app-transition),
      background-image var(--app-transition),
      border-color var(--app-transition),
      color var(--app-transition),
      transform var(--app-transition),
      box-shadow var(--app-transition);
  }


  /* =========================================================
   FOCUS — SIN CONTORNOS NI SOMBRAS
   ========================================================= */

button:focus,
a:focus,
input:focus,
select:focus,
textarea:focus {
  outline: none !important;
  box-shadow: none !important;
}

input:not([type="checkbox"]):not([type="radio"]):focus,
select:focus,
textarea:focus {
  border-color: var(--app-border) !important;
  outline: none !important;
  box-shadow: none !important;
}
  a {
    color: var(--app-primary);
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }

  a:hover {
    color: var(--app-primary-hover);
  }

  input, select, textarea {
    color: var(--app-ink);
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--app-muted);
    opacity: 1;
  }

  ::selection {
    background: var(--app-primary-soft);
    color: var(--app-ink);
  }

/* =========================================================
   INPUTS Y SELECTS — SIN BORDES
   ========================================================= */

input:not([type="checkbox"]):not([type="radio"]),
select,
textarea {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  border-radius: var(--app-radius-sm);
  background: var(--app-paper);
  transition: background-color var(--app-transition);
}

/* Mantener los campos sin bordes al seleccionarlos */
input:not([type="checkbox"]):not([type="radio"]):focus,
select:focus,
textarea:focus {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

/* =========================================================
   FOCUS — SIN CONTORNOS NI SOMBRAS
   ========================================================= */

button:focus,
a:focus,
input:focus,
select:focus,
textarea:focus {
  outline: none !important;
  box-shadow: none !important;
}

input:not([type="checkbox"]):not([type="radio"]):focus,
select:focus,
textarea:focus {
  border-color: var(--app-border) !important;
  outline: none !important;
  box-shadow: none !important;
}

  input[type="checkbox"],
  input[type="radio"] {
    accent-color: var(--app-primary);
    cursor: pointer;
  }

  label {
    color: var(--app-muted-dark);
    font-weight: 650;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
    color: var(--app-ink);
  }

  th {
    color: var(--app-muted-dark);
    font-size: .7rem;
    font-weight: 800;
    letter-spacing: .075em;
    text-transform: uppercase;
  }

  td, th {
    border-bottom: 1px solid var(--app-border);
  }

  tbody tr:hover {
    background: var(--app-surface-soft);
  }

  img, svg {
    max-width: 100%;
  }

  /* =========================================================
     MODALES — ALINEACIÓN Y DIMENSIONES
     ========================================================= */

  [class*="ModalOverlay"],
  [class*="modal-overlay"],
  [class*="modalOverlay"],
  [class*="ModalBackdrop"],
  [class*="modal-backdrop"] {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(10px, 2.5vw, 28px);
    box-sizing: border-box;
    overflow-y: auto;
    overscroll-behavior: contain;
    backdrop-filter: blur(7px);
    -webkit-backdrop-filter: blur(7px);
  }

  [class*="ModalOverlay"] > *,
  [class*="modal-overlay"] > *,
  [class*="modalOverlay"] > *,
  [class*="ModalBackdrop"] > *,
  [class*="modal-backdrop"] > * {
    flex-shrink: 0;
    margin: auto;
  }

  [class*="ModalContainer"],
  [class*="modal-container"],
  [class*="ModalContent"],
  [class*="modal-content"] {
    max-height: calc(100dvh - 32px);
    min-height: 0;
    overflow-y: auto;
  }

  [class*="PageHeader"],
  [class*="page-header"] {
    gap: 14px;
  }

  [class*="Card"],
  [class*="card"] {
    border-radius: var(--app-radius-lg);
  }

  [class*="Table"],
  [class*="table"] {
    color: var(--app-ink);
  }

  /* =========================================================
     EDITOR DE INGREDIENTES
     ========================================================= */

  .ingredient-summary {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    width: 100%;
    max-width: 100%;
    margin-top: 8px;
  }

  .ingredient-summary small {
    color: var(--app-muted);
    font-size: .76rem;
    line-height: 1.5;
  }

  .ingredient-summary .removed-ingredients {
    color: var(--app-danger);
    font-weight: 800;
  }

  .ingredient-edit-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    min-height: 34px;
    margin-top: 6px;
    padding: 7px 12px;
    border: 1px solid var(--app-border-strong);
    border-radius: var(--app-radius-sm);
    background: var(--app-accent-soft);
    color: var(--app-primary-hover);
    font-size: .76rem;
    font-weight: 800;
  }

  .ingredient-edit-button:hover {
    border-color: var(--app-accent);
    background: var(--app-primary-soft);
    color: var(--app-primary-active);
  }

  .ingredient-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: clamp(12px, 2.5vw, 28px);
    overflow-y: auto;
    background: var(--app-overlay);
    backdrop-filter: blur(8px);
  }

  .ingredient-modal {
    width: min(100%, 510px);
    max-height: calc(100dvh - 36px);
    overflow: auto;
    margin: auto;
    padding: clamp(20px, 4vw, 28px);
    border: 1px solid var(--app-border);
    border-radius: var(--app-radius-xl);
    background: var(--app-paper);
    box-shadow: var(--app-shadow-lg);
  }

  .ingredient-modal-heading {
    margin-bottom: 22px;
  }

  .ingredient-modal-eyebrow {
    color: var(--app-accent-hover);
    font-size: .7rem;
    font-weight: 900;
    letter-spacing: .14em;
    text-transform: uppercase;
  }

  .ingredient-modal-heading h3 {
    margin: 8px 0;
    color: var(--app-ink);
    font-size: clamp(1.2rem, 4vw, 1.55rem);
  }

  .ingredient-modal-heading p {
    margin: 0;
    color: var(--app-muted);
    font-size: .88rem;
  }

  .ingredient-options-list {
    display: grid;
    gap: 9px;
  }

  .ingredient-option {
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    padding: 13px;
    border: 1px solid var(--app-border);
    border-radius: var(--app-radius);
    background: var(--app-surface-soft);
    cursor: pointer;
    transition:
      border-color var(--app-transition),
      background-color var(--app-transition);
  }

  .ingredient-option:hover {
    border-color: var(--app-border-strong);
    background: var(--app-primary-soft);
  }

  .ingredient-option input {
    width: 17px;
    height: 17px;
    margin: 0;
    accent-color: var(--app-primary);
  }

  .ingredient-option span {
    color: var(--app-ink);
    font-size: .9rem;
    font-weight: 700;
    overflow-wrap: anywhere;
  }

  .ingredient-option small {
    color: var(--app-success);
    font-size: .7rem;
    font-weight: 850;
  }

  .ingredient-option.is-removed {
    border-color: var(--app-danger);
    background: var(--app-danger-soft);
  }

  .ingredient-option.is-removed small {
    color: var(--app-danger);
  }

  .ingredient-modal-actions {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 24px;
    padding-top: 18px;
    border-top: 1px solid var(--app-border);
  }

  .ingredient-modal-actions button {
    min-height: 42px;
    padding: 10px 16px;
    border-radius: var(--app-radius-sm);
    font-size: .84rem;
    font-weight: 800;
  }

  .ingredient-cancel {
    border: 1px solid var(--app-border);
    background: var(--app-surface);
    color: var(--app-muted-dark);
  }

  .ingredient-cancel:hover {
    border-color: var(--app-border-strong);
    background: var(--app-surface-soft);
  }

  .ingredient-save {
    border: 1px solid var(--app-primary);
    background: var(--app-primary);
    color: var(--app-white);
  }

  .ingredient-save:hover {
    border-color: var(--app-primary-hover);
    background: var(--app-primary-hover);
  }

  /* =========================================================
     DASHBOARD
     ========================================================= */

  .home-page {
    gap: 24px !important;
  }

  .home-page > section {
    width: 100% !important;
    max-width: none !important;
  }

  .home-page > section:first-of-type {
    padding: clamp(22px, 3vw, 36px) !important;
    border: 1px solid var(--app-border) !important;
    border-radius: var(--app-radius-xl) !important;
    background: linear-gradient(
      125deg,
      var(--app-paper) 0%,
      var(--app-primary-soft) 58%,
      var(--app-sidebar) 100%
    ) !important;
    box-shadow: var(--app-shadow-sm) !important;
    color: var(--app-ink) !important;
  }

  .home-page > section:first-of-type h1,
  .home-page > section:first-of-type h2,
  .home-page > section:first-of-type h3,
  .home-page > section:first-of-type strong {
    color: var(--app-ink);
  }

  .home-page > section:first-of-type p {
    color: var(--app-muted-dark);
  }

  .home-page > section:first-of-type [class*="Greeting"] > span {
    color: var(--app-primary);
    font-weight: 800;
  }

  .home-page > section:first-of-type [class*="HeaderContent"] {
    grid-template-columns: minmax(0, 1.15fr) minmax(270px, .95fr) minmax(180px, .65fr);
    gap: 20px;
  }

  .home-page > section:first-of-type [class*="HeaderContent"]:has(> :nth-child(2):last-child) {
    grid-template-columns: minmax(0, 1.3fr) minmax(220px, .7fr);
  }

  .home-page > section:first-of-type [class*="UserBadge"] {
    border: 1px solid var(--app-border-strong);
    border-radius: var(--app-radius);
    background: rgba(var(--app-white-rgb), .72);
    color: var(--app-ink);
  }

  .home-page > section:first-of-type [class*="OutOfStockCard"] {
    border: 1px solid var(--app-border);
    border-left: 4px solid var(--app-accent);
    border-radius: var(--app-radius);
    background: var(--app-paper);
    box-shadow: none;
  }

  .home-page > section:first-of-type [class*="OutOfStockCard"] h2 {
    color: var(--app-ink);
  }

  .home-page > section:first-of-type [class*="OutOfStockCard"] p {
    color: var(--app-muted-dark);
  }

  .home-page h1 {
    font-size: clamp(1.8rem, 3vw, 2.7rem);
    line-height: 1.12;
  }

  .home-page h2 {
    letter-spacing: -.035em;
  }

  .home-page [class*="QuickActions"],
  .home-page [class*="WorkflowSteps"] {
    gap: 15px;
  }

  .home-page [class*="ActionItem"] {
    border: 1px solid var(--app-border);
    border-radius: var(--app-radius-lg);
    background: var(--app-paper);
    box-shadow: var(--app-shadow-xs);
    transition:
      transform var(--app-transition),
      box-shadow var(--app-transition),
      border-color var(--app-transition);
  }

  .home-page [class*="ActionItem"]:hover {
    transform: translateY(-3px);
    border-color: var(--app-border-strong);
    box-shadow: var(--app-shadow);
  }

  .home-page [class*="Workflow"],
  .home-page [class*="ActivityList"] {
    border-radius: var(--app-radius-lg);
  }

  .home-page [class*="Intro"] {
    margin-top: 4px;
  }

  /* =========================================================
     RESPONSIVE
     ========================================================= */

  @media (max-width: 1100px) {
    .home-page > section:first-of-type [class*="HeaderContent"] {
      grid-template-columns: minmax(0, 1fr) !important;
    }
  }

  @media (max-width: 980px) {
    .home-page.home-page {
      margin-left: 0;
      margin-top: 76px;
      min-height: calc(100dvh - 76px);
    }
  }

  @media (max-width: 620px) {
    body {
      font-size: 13px;
    }

    .home-page {
      gap: 18px !important;
    }

    .home-page > section:first-of-type {
      padding: 18px !important;
      border-radius: var(--app-radius-lg) !important;
    }

    .home-page [class*="QuickActions"] {
      grid-template-columns: minmax(0, 1fr) !important;
    }

    .ingredient-modal {
      padding: 20px;
      border-radius: var(--app-radius-lg);
    }

    .ingredient-modal-actions {
      flex-direction: column-reverse;
    }

    .ingredient-modal-actions button {
      width: 100%;
    }

    .ingredient-option {
      grid-template-columns: 20px minmax(0, 1fr);
    }

    .ingredient-option small {
      grid-column: 2;
    }

    th, td {
      padding: 10px;
    }
  }

  /* =========================================================
     SCROLLBARS
     ========================================================= */

  * {
    scrollbar-width: thin;
    scrollbar-color: var(--app-border-strong) transparent;
  }

  *::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    border: 2px solid transparent;
    border-radius: 20px;
    background: var(--app-border-strong);
    background-clip: padding-box;
  }

  *::-webkit-scrollbar-thumb:hover {
    background: var(--app-muted);
    background-clip: padding-box;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      scroll-behavior: auto !important;
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .01ms !important;
    }
  }
`;
