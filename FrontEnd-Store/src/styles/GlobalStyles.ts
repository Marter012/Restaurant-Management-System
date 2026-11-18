import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
 :root{--app-primary:#183b36;--app-primary-hover:#24564e;--app-accent:#d66f4e;--app-canvas:#f2f0e8;--app-surface:#fffefa;--app-surface-strong:#e7e8dc;--app-ink:#172d29;--app-muted:#71807a;--app-border:#dfe3d8;--app-success:#2b8059;--app-danger:#b9473d;--app-warning:#b4772e;--app-shadow:0 22px 60px rgba(24,59,54,.10);--app-radius:20px;--app-font:Inter,ui-sans-serif,system-ui,-apple-system,"Segoe UI",sans-serif}
 *,*::before,*::after{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:92px}body{margin:0;min-width:320px;background:var(--app-canvas);color:var(--app-ink);font-family:var(--app-font);-webkit-font-smoothing:antialiased}button,input,select,textarea{font:inherit}button{cursor:pointer}button:disabled{cursor:not-allowed;opacity:.55}img{display:block;max-width:100%}a{color:inherit;text-decoration:none}::selection{background:#d66f4e44}:focus-visible{outline:3px solid var(--app-accent);outline-offset:3px}
 body{background-image:linear-gradient(90deg,rgba(24,59,54,.025) 1px,transparent 1px),linear-gradient(rgba(24,59,54,.025) 1px,transparent 1px);background-size:28px 28px}
 @media(prefers-reduced-motion:reduce){*,*::before,*::after{scroll-behavior:auto!important;transition-duration:.01ms!important;animation-duration:.01ms!important}}
`;
