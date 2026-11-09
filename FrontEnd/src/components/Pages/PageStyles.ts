import styled from "styled-components";

export const ContainerPage = styled.main`
  box-sizing: border-box;

  /* =====================================================
     DESKTOP — SIDEBAR 258px
  ===================================================== */

  width: calc(100% - 258px);
  min-width: 0;
  height: 100dvh;
  margin: 0 0 0 258px;
  padding: 34px clamp(22px, 3.2vw, 48px) 42px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  background: var(--color-background);
  color: var(--color-text);

  font-family: var(--font-family-base);

  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  & > * {
    min-width: 0;
    max-width: 100%;
  }

  /* =====================================================
     TABLET — SIDEBAR 82px
  ===================================================== */

  @media (min-width: 621px) and (max-width: 1024px) {
    width: calc(100% - 82px);
    margin-left: 82px;

    height: 100dvh;
    min-height: 0;

    padding: 30px clamp(18px, 3vw, 30px) 38px;
    gap: 22px;
  }

  /* =====================================================
     MEDIUM SCREENS — TYPOGRAPHIC ADJUSTMENTS
  ===================================================== */

  @media (min-width: 621px) and (max-width: 980px) {
    h1 {
      font-size: clamp(1.65rem, 3.2vw, 2.1rem);
      line-height: 1.2;
    }

    h2 {
      font-size: clamp(1.3rem, 2.6vw, 1.65rem);
      line-height: 1.3;
    }

    h3 {
      font-size: 1.1rem;
      line-height: 1.35;
    }

    p,
    label {
      font-size: var(--font-size-sm);
    }

    input,
    select,
    textarea,
    button {
      font-family: var(--font-family-base);
      font-size: var(--font-size-sm);
    }
  }

  /* =====================================================
     MOBILE — TOP NAVIGATION
     Reserve vertical space for the fixed navbar.
  ===================================================== */

  @media (max-width: 620px) {
    width: 100%;
    min-width: 0;
    margin: 0;

    height: 100dvh;
    min-height: 0;

    padding: 150px 14px 30px;
    gap: 20px;

    overflow-x: hidden;
    overflow-y: auto;

    h1 {
      font-family: var(--font-family-heading);
      font-size: clamp(1.55rem, 6vw, 1.9rem);
      line-height: 1.2;
      letter-spacing: -0.025em;
    }

    h2 {
      font-family: var(--font-family-heading);
      font-size: clamp(1.25rem, 5vw, 1.5rem);
      line-height: 1.3;
      letter-spacing: -0.02em;
    }

    h3 {
      font-family: var(--font-family-heading);
      font-size: 1.08rem;
      line-height: 1.35;
    }

    h4,
    h5,
    h6 {
      font-family: var(--font-family-heading);
      font-size: var(--font-size-sm);
      line-height: 1.4;
    }

    p {
      font-family: var(--font-family-description);
      font-size: var(--font-size-sm);
      line-height: 1.6;
    }

    label {
      font-family: var(--font-family-base);
      font-size: var(--font-size-sm);
      line-height: 1.5;
    }

    small {
      font-family: var(--font-family-description);
      font-size: var(--font-size-xs);
      line-height: 1.5;
    }

    input:not([type="checkbox"]):not([type="radio"]),
    select,
    textarea {
      min-height: 42px;
      max-width: 100%;
      font-family: var(--font-family-base);
      font-size: 16px;
    }

    textarea {
      min-height: 90px;
    }

    button {
      min-height: 40px;
      font-family: var(--font-family-base);
      font-size: var(--font-size-sm);
      line-height: 1.4;
    }

    img,
    svg {
      max-width: 100%;
    }

    table {
      max-width: 100%;
    }
  }

  /* =====================================================
     NARROW MOBILE
  ===================================================== */

  @media (max-width: 380px) {
    padding-right: 11px;
    padding-left: 11px;
    gap: 17px;

    h1 {
      font-size: 1.45rem;
    }

    h2 {
      font-size: 1.2rem;
    }

    button {
      font-size: var(--font-size-xs);
    }
  }
`;
