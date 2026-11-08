import styled from "styled-components";

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex-shrink: 0;

  .brand-logo {
    width: 46px;
    height: 46px;
    display: grid;
    place-items: center;
    flex: 0 0 46px;
    border-radius: 15px;
    background: var(--app-accent);
    color: var(--app-primary-active);
    font-size: 1rem;
    font-weight: 950;
    letter-spacing: -0.06em;
    box-shadow: 0 7px 18px rgba(var(--app-primary-rgb), 0.188);
  }

  .brand-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .brand-info h2 {
    margin: 0;
    color: var(--app-white);
    font-family: inherit;
    font-size: 1rem;
    line-height: 1.15;
    font-weight: 850;
    letter-spacing: -0.04em;
    white-space: normal;
  }

  .brand-info span {
    color: var(--app-border);
    font-size: 0.67rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-weight: 700;
  }

  /* TABLET */

  @media (min-width: 621px) and (max-width: 1024px) {
    width: 100%;
    justify-content: center;

    .brand-logo {
      width: 48px;
      height: 48px;
      flex-basis: 48px;
    }

    .brand-info {
      display: none;
    }
  }

  /* MOBILE */

  @media (max-width: 620px) {
    gap: 8px;

    .brand-logo {
      width: 38px;
      height: 38px;
      flex-basis: 38px;
      border-radius: 12px;
    }

    .brand-info {
      display: flex;
      min-width: 0;
      max-width: 145px;
    }

    .brand-info h2 {
      font-size: 0.78rem;
      line-height: 1.1;
    }

    .brand-info span {
      font-size: 0.48rem;
      letter-spacing: 0.04em;
    }
  }

  @media (max-width: 380px) {
    gap: 6px;

    .brand-info {
      max-width: 112px;
    }

    .brand-info h2 {
      font-size: 0.70rem;
    }

    .brand-info span {
      font-size: 0.43rem;
    }
  }
`;