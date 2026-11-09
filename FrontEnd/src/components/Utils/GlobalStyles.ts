import { createGlobalStyle, css } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&family=Source+Sans+3:wght@400;500;600;700&display=swap');

  /* =====================================================
     DESIGN SYSTEM — PETROLEUM MINIMAL
  ===================================================== */
:root {
  color-scheme: light;

  /* ================= BRAND ================= */

  --color-primary: #294C60;
  --color-primary-hover: #203D4E;
  --color-primary-soft: #E8F0F4;
  --color-accent: #4B8DA8;

  /* ================= SIDEBAR ================= */

  --color-sidebar: #1D3547;
  --color-sidebar-deep: #172B3A;
  --color-sidebar-surface: #29475C;
  --color-sidebar-active: #345B72;
  --color-sidebar-border: rgba(255, 255, 255, 0.10);
  --color-sidebar-text: #FFFFFF;
  --color-sidebar-muted: #B3C2CC;

  /* ================= BACKGROUNDS ================= */

  --color-background: #F4F6F9;
  --color-surface: #FFFFFF;
  --color-surface-hover: #F0F3F6;
  --color-surface-muted: #E8EDF2;

  /* ================= TEXT ================= */

  --color-text: #25313C;
  --color-text-secondary: #657482;
  --color-text-light: #929EAA;
  --color-white: #FFFFFF;

  /* ================= BORDERS ================= */

  --color-border: #E0E6EC;
  --color-border-strong: #C9D3DC;

  /* ================= BUTTON STATES ================= */

  --color-active: #23845B;
  --color-active-soft: #E4F3EB;

  --color-inactive: #C65353;
  --color-inactive-soft: #FBEAEA;

  /* ================= OPERATIONAL STATUS ================= */

  --color-success: #23845B;
  --color-success-soft: #E4F3EB;

  --color-danger: #C65353;
  --color-danger-soft: #FBEAEA;

  --color-partial: #B77932;
  --color-partial-soft: #FBF0DF;

  --color-pending: #A88A28;
  --color-pending-soft: #F9F3D9;

  /* ================= MODALS ================= */

  --modal-background: #FFFFFF;
  --modal-overlay: rgba(24, 39, 53, 0.55);
  --modal-border: #E0E6EC;
  --modal-shadow: 0 20px 60px rgba(31, 48, 64, 0.14);

  /* ================= SHADOWS ================= */

  --shadow-sm: 0 2px 8px rgba(31, 48, 64, 0.04);
  --shadow-md: 0 6px 20px rgba(31, 48, 64, 0.07);
  --shadow-lg: 0 16px 40px rgba(31, 48, 64, 0.12);

  /* ================= BORDER RADIUS ================= */

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 20px;

  /* ================= FONT FAMILIES ================= */

  --font-family-base: 'Inter', sans-serif;
  --font-family-heading: 'Manrope', sans-serif;
  --font-family-description: 'Source Sans 3', sans-serif;

  /* ================= FONT SIZES ================= */

  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-md: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.375rem;
  --font-size-2xl: 1.75rem;
  --font-size-3xl: 2.25rem;

  /* ================= TRANSITIONS ================= */

  --transition-fast: 150ms ease;
  --transition-normal: 200ms ease;
  --transition-slow: 300ms ease;
}
  /* =====================================================
     RESET
  ===================================================== */

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    width: 100%;
    min-height: 100%;
    scroll-behavior: smooth;
    -webkit-text-size-adjust: 100%;
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
  }


  /* =====================================================
     BODY
  ===================================================== */

  body {
    min-width: 320px;

    background: var(--color-background);
    color: var(--color-text);

    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);
    line-height: 1.55;

    font-synthesis: none;
    text-rendering: optimizeLegibility;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }


  /* =====================================================
     HEADINGS
  ===================================================== */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 0;

    color: var(--color-text);
    font-family: var(--font-family-heading);

    font-weight: 700;
    letter-spacing: -0.035em;
    line-height: 1.25;
  }

  h1 {
    font-size: var(--font-size-3xl);
  }

  h2 {
    font-size: var(--font-size-2xl);
  }

  h3 {
    font-size: var(--font-size-xl);
  }


  /* =====================================================
     DESCRIPTIONS
  ===================================================== */

  p,
  small,
  figcaption {
    font-family: var(--font-family-description);
    color: var(--color-text-secondary);
  }

  small {
    font-size: var(--font-size-xs);
  }


  /* =====================================================
     BUTTONS
  ===================================================== */

  button {
    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);

    cursor: pointer;

    border-radius: var(--radius-sm);

    transition:
      background-color var(--transition-normal),
      border-color var(--transition-normal),
      color var(--transition-normal),
      box-shadow var(--transition-normal),
      transform var(--transition-fast);
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }


  /* =====================================================
     LINKS
  ===================================================== */

  a {
    color: var(--color-primary);
    text-decoration: none;

    transition: color var(--transition-fast);
  }

  a:hover {
    color: var(--color-primary-hover);
  }


  /* =====================================================
     FORMS
  ===================================================== */

  input,
  select,
  textarea {
    font-family: var(--font-family-base);
    font-size: var(--font-size-sm);
    color: var(--color-text);
  }

  input::placeholder,
  textarea::placeholder {
    color: var(--color-text-light);
    opacity: 1;
  }

  input:focus-visible,
  select:focus-visible,
  textarea:focus-visible,
  button:focus-visible,
  a:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  input[type="checkbox"],
  input[type="radio"] {
    accent-color: var(--color-primary);
    cursor: pointer;
  }

  label {
    color: var(--color-text-secondary);
    font-family: var(--font-family-base);
    font-weight: 600;
  }


  /* =====================================================
     TABLES
  ===================================================== */

  table {
    width: 100%;
    border-collapse: collapse;
    color: var(--color-text);
    font-family: var(--font-family-base);
  }

  th {
    color: var(--color-text-secondary);
    font-size: var(--font-size-xs);
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  th,
  td {
    border-bottom: 1px solid var(--color-border);
  }


  /* =====================================================
     MEDIA
  ===================================================== */

  img,
  svg {
    max-width: 100%;
  }


  /* =====================================================
     SELECTION
  ===================================================== */

  ::selection {
    background: var(--color-primary-soft);
    color: var(--color-primary);
  }


  /* =====================================================
     SCROLLBARS
  ===================================================== */

  * {
    scrollbar-width: thin;
    scrollbar-color: var(--color-border-strong) transparent;
  }

  *::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: var(--color-border-strong);
  }

  *::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-light);
  }


  /* =====================================================
     RESPONSIVE
  ===================================================== */

  @media (max-width: 620px) {

    body {
      font-size: var(--font-size-sm);
    }

    h1 {
      font-size: var(--font-size-2xl);
    }

    h2 {
      font-size: var(--font-size-xl);
    }

  }


  /* =====================================================
     ACCESSIBILITY
  ===================================================== */

  @media (prefers-reduced-motion: reduce) {

    *,
    *::before,
    *::after {
      scroll-behavior: auto !important;
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }

  }

`;


/* =====================================================
   INPUT STYLES
===================================================== */

export const InputStyles = css`

  input,
  select,
  textarea {
    background-color: var(--color-surface);
    color: var(--color-text);
  }

`;