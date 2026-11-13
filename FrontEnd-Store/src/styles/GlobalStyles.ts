import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
 :root{--app-primary:#4a2818;--app-primary-hover:#633a25;--app-accent:#b7834e;--app-canvas:#f5eadb;--app-surface:#fffdf9;--app-surface-strong:#efe2d1;--app-ink:#2c211b;--app-muted:#81756b;--app-border:#e8dccc;--app-success:#218653;--app-danger:#b63b32;--app-warning:#a96b16;--app-shadow:0 18px 50px rgba(74,40,24,.09);--app-radius:22px;--app-font:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
 *,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:90px}body{margin:0;min-width:320px;background:var(--app-canvas);color:var(--app-ink);font-family:var(--app-font);-webkit-font-smoothing:antialiased}button,input,select,textarea{font:inherit}button{cursor:pointer}button:disabled{cursor:not-allowed;opacity:.55}img{display:block;max-width:100%}a{color:inherit;text-decoration:none}::selection{background:#b7834e44}:focus-visible{outline:3px solid var(--app-accent);outline-offset:3px}
 body{background-image:radial-gradient(#cdbba7 0.65px,transparent .65px);background-size:21px 21px}
 @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important}}
`;
