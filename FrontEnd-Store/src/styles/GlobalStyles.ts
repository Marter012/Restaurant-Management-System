import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --app-primary: #4A2818;
    --app-primary-hover: #603923;
    --app-accent: #B7834E;
    --app-canvas: #F5E8D1;
    --app-surface: #FFF9F0;
    --app-surface-strong: #FFFFFF;
    --app-ink: #332116;
    --app-muted: #806B5A;
    --app-border: #E7D6C1;
    --app-success: #287A50;
    --app-danger: #B4473D;
    --app-warning: #A66B25;
    --app-shadow: 0 16px 45px rgba(74, 40, 24, .10);
    --app-radius: 20px;
    --app-font: Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  *, *::before, *::after { box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { margin: 0; min-width: 320px; background: var(--app-canvas); color: var(--app-ink); font-family: var(--app-font); -webkit-font-smoothing: antialiased; }
  button, input, select, textarea { font: inherit; }
  button { cursor: pointer; }
  button:disabled { cursor: not-allowed; opacity: .58; }
  img { display: block; max-width: 100%; }
  a { color: inherit; text-decoration: none; }
  ::selection { background: rgba(183, 131, 78, .25); }
  :focus-visible { outline: 3px solid var(--app-accent); outline-offset: 3px; }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; animation-duration: .01ms !important; } }
`;
