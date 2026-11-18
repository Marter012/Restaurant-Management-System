import styled from "styled-components";

export const NavBarContainer = styled.header`
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 1000;
  width: 76px;
  height: 100dvh;
  min-height: 100dvh;

  padding: 22px 10px 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;

  box-sizing: border-box;
overflow-x: none;
overflow-y: auto;
scrollbar-width: none;

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

  box-shadow: 8px 0 28px rgba(16, 47, 45, 0.07);

  /* BRAND */

  > :nth-child(1) {
    width: 100%;
    flex: 0 0 auto;
    justify-content: center;
  }

  /* CASH STATUS
     Se conserva su componente y funcionamiento actual.
  */

  > :nth-child(2) {
    width: 100%;
    min-width: 0;
    flex: 0 0 auto;
  }

  /* NAVIGATION */

  > :nth-child(3) {
    width: 100%;
    min-width: 0;
    flex: 0 0 auto;
  }

  @media (min-width: 621px) {
    width: 76px;
    padding: 22px 10px 18px;
    align-items: center;

    > :nth-child(1) {
      width: 100%;
      justify-content: center;
    }

    > :nth-child(3) {
      width: 100%;
    }
  }

  /* MOBILE */

  @media (max-width: 620px) {
    inset: 0 0 auto 0;

    width: 100%;
    height: auto;
    min-height: 0;

    padding: 11px 15px;

    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;

    column-gap: 10px;
    row-gap: 10px;

    border-right: 0;
    border-bottom: 1px solid var(--color-sidebar-border);

    box-shadow: var(--shadow-md);

    > :nth-child(1) {
      order: 1;
      width: auto;
      min-width: 0;
      flex: 1 1 0;
    }

    > :nth-child(3) {
      order: 2;
      width: auto;
      min-width: 44px;
      flex: 0 0 auto;
      margin-left: auto;
    }

    > :nth-child(2) {
      order: 3;
      display: block;

      width: 100%;
      min-width: 0;
      max-width: 100%;

      margin: 0;
      flex: 1 0 100%;
    }
  }

  @media (max-width: 380px) {
    padding: 9px 10px;
    column-gap: 6px;
    row-gap: 8px;
  }
`;