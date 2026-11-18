import styled from "styled-components";

export const NewOrderPageShell = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  min-width: 0;
  min-height: calc(100dvh - 150px);
`;


export const NewOrderPageContent = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: auto;
  overflow: visible;
  box-sizing: border-box;

  /* Contenedor del formulario: no debe recortar el panel sticky. */
  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    min-width: 0;
    min-height: 0;
    overflow: visible;
    box-sizing: border-box;
  }

  /* Estructura móvil original. */
  main {
    display: block;
    width: 100%;
    height: auto;
    min-width: 0;
    min-height: 0;
    overflow: visible;
    box-sizing: border-box;

    > div {
      display: none;
      width: 100%;
      height: auto;
      min-width: 0;
      min-height: 0;
      overflow: visible;
      box-sizing: border-box;
    }

    > div.mobile-active {
      display: block;
    }

    > div.mobile-hidden {
      display: none;
    }
  }


  /* Tablet: selector para alternar entre catálogo y detalle. */
  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 10px;
  }

  /* Móvil: una pestaña visible por vez, sin sticky ni scroll anidado. */
  @media (max-width: 1023px) {
    height: auto;
    min-height: 0;
    padding: 0;
    overflow: visible;

    > div {
      height: auto;
      overflow: visible;
    }

    main {
      display: block;
      height: auto;
      min-height: 0;
      overflow: visible;

      > div {
        height: auto;
        min-height: 0;
        overflow: visible;
      }

      > div.mobile-active {
        display: block;
      }

      > div.mobile-hidden {
        display: none;
      }
    }
  }

`;

export const NewOrderPageFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px 0;

  @media (max-width: 600px) {
    > button {
      width: 100%;
    }
  }
`;
