import styled from "styled-components";

export const NavBarContainer = styled.header`
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 5;
  width: 258px;
  min-height: 100dvh;
  padding: 28px 17px 18px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 24px;
  overflow-y: auto;
  overflow-x: visible;

  background: linear-gradient(
    -50deg,
    var(--app-navbar-start) 0%,
    var(--app-primary) 30%,
    var(--app-accent) 100%
  );

  color: var(--app-navbar-text);
  border: 1px solid var(--app-navbar-border);
  box-shadow: var(--app-navbar-shadow);
  color: var(--app-surface-soft);
  border-right: 1px solid var(--app-primary-active);
  box-shadow: 12px 0 38px rgba(var(--app-shadow-rgb), 0.08);

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

  & > :nth-child(3) > div:nth-of-type(2) {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 9px;
    padding-top: 16px;
    border-top: 1px solid var(--app-primary-active);
  }

  & > :nth-child(3) > div:nth-of-type(2) button {
    max-width: 100%;
  }

  & > :nth-child(3) > div:nth-of-type(2) > * {
    width: 100%;
  }

  /* TABLET: NAVBAR LATERAL COMPACTO */
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

    /* Esta regla se aplica al contenido secundario de Navigation,
       no al segundo hijo directo (CashStatus). */
    & > :nth-child(3) > div:nth-of-type(2) {
      display: none;
    }
  }

  /* MOBILE: MARCA Y MENÚ ARRIBA; ESTADO DE CAJA ABAJO */
  @media (max-width: 620px) {
    inset: 0 0 auto 0;
    width: 100%;
    min-height: 0;
    height: auto;
    padding: 10px 12px 9px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    column-gap: 8px;
    row-gap: 9px;
    overflow: visible;
    border-right: 0;
    border-bottom: 1px solid var(--app-primary-active);

    /* Primera fila: marca a la izquierda. */
    & > :nth-child(1) {
      order: 1;
      width: auto;
      min-width: 0;
      flex: 1 1 0;
    }

    /* Primera fila: menú hamburguesa a la derecha. */
    & > :nth-child(3) {
      order: 2;
      width: auto;
      min-width: 44px;
      flex: 0 0 auto;
      margin-left: auto;
    }

    /* Segunda fila: CashStatus ocupa todo el ancho disponible. */
    & > :nth-child(2) {
      order: 3;
      display: block;
      margin: 0;
      width: 100%;
      min-width: 0;
      max-width: 100%;
      flex: 1 0 100%;
    }

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

  @media (max-width: 380px) {
    padding: 9px 8px;
    column-gap: 5px;
    row-gap: 8px;
  }
`;
