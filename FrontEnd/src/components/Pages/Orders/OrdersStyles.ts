import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const ContainerOrder = styled.div`
  width: 100%;
  max-width: 1600px;
  min-height: 85% ;
  max-height: 85% ;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 0;

  box-sizing: border-box;


  @media (max-width: 1000px) {
    margin-top: 0;
  }

  @media (max-width: 700px) {
    margin-top: 0;
  }
`;

/* =========================================================
   CONTENEDOR CUANDO NO HAY CAJA
========================================================= */

export const EmptyCashContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  box-sizing: border-box;

  padding: 30px 20px 20px;

  @media (max-width: 700px) {
    padding: 20px 12px;
  }

  @media (max-width: 400px) {
    padding: 15px 8px;
  }
`;

/* =========================================================
   MENSAJE DE CAJA
========================================================= */

export const CashMessage = styled.div`
  width: min(560px, 100%);

  padding: 35px 40px;

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  border-radius: 16px;

  svg {
    width: 52px;
    height: 52px;

    padding: 13px;

    margin-bottom: 18px;

    box-sizing: border-box;

    color: var(--app-primary);

    background: rgba(var(--app-accent-rgb), 0.16);

    border-radius: 50%;
  }

  h2 {
    margin: 0 0 9px;

    color: var(--app-primary);

    font-size: 21px;
    font-weight: 700;

    line-height: 1.3;
  }

  p {
    max-width: 420px;

    margin: 0 0 7px;

    color: var(--app-primary);

    font-size: 14px;
    font-weight: 500;

    line-height: 1.5;

    strong {
      color: var(--app-primary);
    }
  }

  span {
    color: var(--app-muted-dark);

    font-size: 12.5px;

    line-height: 1.5;
  }

  @media (max-width: 600px) {
    padding: 28px 22px;

    border-radius: 14px;

    svg {
      width: 48px;
      height: 48px;

      padding: 12px;

      margin-bottom: 16px;
    }

    h2 {
      font-size: 19px;
    }

    p {
      font-size: 13.5px;
    }

    span {
      font-size: 12px;
    }
  }

  @media (max-width: 400px) {
    padding: 24px 17px;

    svg {
      width: 44px;
      height: 44px;

      padding: 11px;
    }

    h2 {
      font-size: 17px;
    }

    p {
      font-size: 13px;
    }

    span {
      font-size: 11.5px;
    }
  }
`;

/* =========================================================
   LINK DEL MENSAJE
========================================================= */

export const CashMessageLink = styled(NavLink)`
width: min(560px, 100%);

  padding: 42px 48px;

  display: flex;

  flex-direction: column;

  align-items: center;

  text-align: center;

  background: var(--app-white);

  border: 1px solid var(--app-surface-soft);

  border-radius: 18px;

  box-shadow: 0 8px 24px rgba(var(--app-shadow-rgb), 0.07);

  box-sizing: border-box;

  transition: all 0.2s ease;

  text-decoration: none;
`;
