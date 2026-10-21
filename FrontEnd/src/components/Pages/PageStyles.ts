import styled from "styled-components";

export const ContainerPage = styled.main`
  box-sizing: border-box;

  width: auto;
  min-width: 0;
  height: 100dvh;
  margin: 0 0 0 258px;
  padding: 34px clamp(22px, 3.2vw, 48px) 42px;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  background: var(--app-canvas);
  color: var(--app-ink);

  overflow-x: hidden;
  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: var(--app-border) transparent;

  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;


  @media (max-width: 980px) {
    width: 100%;
    min-width: 0;

    margin: 0;

    height: 100dvh;
    min-height: 0;

    padding: 82px clamp(20px, 3.5vw, 34px) 38px;

    gap: 25px;

    font-size: 15px;
    line-height: 1.6;

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
      font-size: 0.95rem;
    }

    input,
    select,
    textarea,
    button {
      font-size: 0.95rem;
    }
  }

  /* =====================================================
     MÓVILES
     Mejor legibilidad, controles táctiles y espaciado.
     ===================================================== */

  @media (max-width: 620px) {
    width: 100%;
    min-width: 0;

    margin: 0;

    height: 100dvh;
    min-height: 0;

    padding: 74px 14px 30px;

    gap: 20px;

    font-size: 14px;
    line-height: 1.65;

    /* El scroll vertical principal permanece en el main. */
    overflow-x: hidden;
    overflow-y: auto;

    /* Los hijos no deben desbordar horizontalmente. */
    & > * {
      min-width: 0;
      max-width: 100%;
    }

    /* Encabezados más cómodos de leer. */
    h1 {
      font-size: clamp(1.55rem, 6vw, 1.9rem);
      line-height: 1.2;
      letter-spacing: -0.025em;
    }

    h2 {
      font-size: clamp(1.25rem, 5vw, 1.5rem);
      line-height: 1.3;
      letter-spacing: -0.02em;
    }

    h3 {
      font-size: 1.08rem;
      line-height: 1.35;
    }

    h4,
    h5,
    h6 {
      font-size: 0.98rem;
      line-height: 1.4;
    }

    p {
      font-size: 0.9rem;
      line-height: 1.6;
    }

    label {
      font-size: 0.9rem;
      line-height: 1.5;
    }

    small {
      font-size: 0.8rem;
      line-height: 1.5;
    }

    /* Campos más cómodos para utilizar con el dedo. */
    input:not([type="checkbox"]):not([type="radio"]),
    select,
    textarea {
      min-height: 42px;
      max-width: 100%;
      font-size: 16px;
    }

    textarea {
      min-height: 90px;
    }

    /* Botones con un área táctil más cómoda. */
    button {
      min-height: 40px;
      font-size: 0.9rem;
      line-height: 1.4;
    }

    /* Evita que imágenes y contenido ancho desborden. */
    img,
    svg {
      max-width: 100%;
    }

    /* Evita que las tablas fuercen el ancho de la pantalla. */
    table {
      max-width: 100%;
    }
  }

  /* =====================================================
     MÓVILES ESTRECHOS
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
      font-size: 0.86rem;
    }
  }
`;