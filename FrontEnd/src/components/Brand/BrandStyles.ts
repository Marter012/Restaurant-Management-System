import styled from "styled-components";

export const BrandContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  flex-shrink: 0;

  .brand-logo {
    display: grid;
    place-items: center;
    flex: 0 0 44px;
    width: 44px;
    height: 44px;

    border: 1px solid color-mix(in srgb, var(--color-white) 14%, transparent);
    border-radius: var(--radius-md);
    background: var(--color-accent);
    color: var(--color-white);

    font-family: var(--font-family-heading);
    font-size: var(--font-size-md);
    font-weight: 800;
    letter-spacing: -0.04em;

    box-shadow: var(--shadow-sm);
  }

  .brand-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 0;
  }

  .brand-info h2 {
    margin: 0;
    color: var(--color-sidebar-text);
    font-family: var(--font-family-heading);
    font-size: var(--font-size-md);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.025em;
    white-space: normal;
  }

  .brand-info span {
    color: var(--color-sidebar-muted);
    font-family: var(--font-family-description);
    font-size: var(--font-size-xs);
    font-weight: 600;
    letter-spacing: 0.075em;
    line-height: 1.2;
    text-transform: uppercase;
  }

  /* TABLET */
  @media (min-width: 621px) and (max-width: 1024px) {
    width: 100%;
    justify-content: center;

    .brand-logo {
      flex-basis: 46px;
      width: 46px;
      height: 46px;
    }

    .brand-info {
      display: none;
    }
  }

  /* MOBILE */
  @media (max-width: 620px) {
    gap: 9px;

    .brand-logo {
      flex-basis: 38px;
      width: 38px;
      height: 38px;
      border-radius: var(--radius-sm);
      font-size: var(--font-size-sm);
    }

    .brand-info {
      display: flex;
      min-width: 0;
      max-width: 190px;
    }

    .brand-info h2 {
      font-size: var(--font-size-sm);
      line-height: 1.15;
    }

    .brand-info span {
      font-size: 0.65rem;
      letter-spacing: 0.045em;
    }
  }

  @media (max-width: 380px) {
    gap: 7px;

    .brand-info {
      max-width: 145px;
    }

    .brand-info h2 {
      font-size: var(--font-size-xs);
    }

    .brand-info span {
      font-size: 0.58rem;
    }
  }
`;
