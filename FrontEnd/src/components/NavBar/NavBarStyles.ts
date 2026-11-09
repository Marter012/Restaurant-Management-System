import styled from "styled-components";

export const NavBarContainer = styled.header`

  position: fixed;
  inset: 0 auto 0 0;

  z-index: 5;

  width: 258px;
  min-height: 100dvh;

  padding: 26px 15px 18px;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  gap: 22px;

  overflow-y: auto;
  overflow-x: visible;

  /* =====================================================
     SIDEBAR IDENTITY
  ===================================================== */

  background:
    radial-gradient(
      circle at 0% 0%,
      rgba(72, 163, 154, 0.12),
      transparent 38%
    ),
    linear-gradient(
      155deg,
      var(--color-sidebar) 0%,
      var(--color-sidebar-deep) 100%
    );

  color: var(--color-sidebar-text);

  border-right: 1px solid var(--color-sidebar-border);

  box-shadow:
    8px 0 28px rgba(16, 47, 45, 0.07);

  /* =====================================================
     ELEMENT ORDER
  ===================================================== */

  & > :nth-child(1) {
    order: 1;
  }

  & > :nth-child(3) {
    order: 2;
  }

  & > :nth-child(2) {
    order: 3;

    margin-top: auto;

    width: 100%;
  }


  /* =====================================================
     NAVIGATION
  ===================================================== */

  & > :nth-child(3) {
    width: 100%;
  }

  & > :nth-child(3) > div:nth-of-type(2) {

    display: flex;
    flex-direction: column;
    align-items: stretch;

    gap: 7px;

    padding-top: 16px;

    border-top: 1px solid var(--color-sidebar-border);

  }

  & > :nth-child(3) > div:nth-of-type(2) button {
    max-width: 100%;
  }

  & > :nth-child(3) > div:nth-of-type(2) > * {
    width: 100%;
  }


  /* =====================================================
     NAVIGATION INTERACTIONS
  ===================================================== */

  & > :nth-child(3) a,
  & > :nth-child(3) button {

    transition:
      background-color var(--transition-normal),
      color var(--transition-normal),
      border-color var(--transition-normal);

  }

  & > :nth-child(3) a:hover,
  & > :nth-child(3) button:hover {

    background-color: var(--color-sidebar-surface);

    color: var(--color-sidebar-text);

  }

  & > :nth-child(3) a[aria-current="page"],
  & > :nth-child(3) button[aria-current="page"],
  & > :nth-child(3) a.active,
  & > :nth-child(3) button.active {

    background-color: var(--color-sidebar-active);

    color: var(--color-sidebar-text);

    border-color: transparent;

  }


  /* =====================================================
     TABLET — COMPACT SIDEBAR
  ===================================================== */

  @media (min-width: 621px) and (max-width: 1024px) {

    width: 82px;

    min-height: 100dvh;

    padding: 22px 10px 16px;

    gap: 20px;

    align-items: center;

    overflow-x: visible;

    & > :nth-child(1) {

      order: 1;

      width: 100%;

      justify-content: center;

    }

    & > :nth-child(3) {

      order: 2;

      width: 100%;

    }

    & > :nth-child(2) {

      display: block;

      order: 3;

      margin-top: auto;

      width: 100%;

      min-width: 0;

      flex: 0 0 auto;

    }

    /* Secondary navigation */

    & > :nth-child(3) > div:nth-of-type(2) {

      display: none;

    }

  }


  /* =====================================================
     MOBILE — TOP NAVIGATION
  ===================================================== */

  @media (max-width: 620px) {

    inset: 0 0 auto 0;

    width: 100%;

    min-height: 0;

    height: auto;

    padding: 11px 15px;

    display: flex;

    flex-direction: row;

    flex-wrap: wrap;

    align-items: center;

    justify-content: space-between;

    column-gap: 10px;

    row-gap: 10px;

    overflow: visible;

    border-right: 0;

    border-bottom: 1px solid var(--color-sidebar-border);

    box-shadow: var(--shadow-md);


    /* BRAND */

    & > :nth-child(1) {

      order: 1;

      width: auto;

      min-width: 0;

      flex: 1 1 0;

    }


    /* NAVIGATION MENU */

    & > :nth-child(3) {

      order: 2;

      width: auto;

      min-width: 44px;

      flex: 0 0 auto;

      margin-left: auto;

    }


    /* CASH STATUS */

    & > :nth-child(2) {

      order: 3;

      display: block;

      margin: 0;

      width: 100%;

      min-width: 0;

      max-width: 100%;

      flex: 1 0 100%;

    }


    /* SECONDARY NAVIGATION */

    & > :nth-child(3) > div:nth-of-type(2) {

      display: flex;

      flex-direction: row;

      align-items: center;

      gap: 7px;

      padding: 0;

      border-top: 0;

      width: auto;

    }

    & > :nth-child(3) > div:nth-of-type(2) > * {

      width: auto;

    }

  }


  /* =====================================================
     SMALL MOBILE
  ===================================================== */

  @media (max-width: 380px) {

    padding: 9px 10px;

    column-gap: 6px;

    row-gap: 8px;

  }

`;