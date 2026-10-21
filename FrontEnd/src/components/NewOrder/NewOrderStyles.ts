import { Form } from "formik";
import styled from "styled-components";

/* =========================================================
   FORMULARIO PRINCIPAL
========================================================= */

export const OrderForm = styled(Form)`
  width: 100%;
  height: 100%;

  max-width: 1600px;

  display: flex;
  flex-direction: column;

  min-width: 0;
  min-height: 0;

  box-sizing: border-box;
`;

/* =========================================================
   CONTENEDOR DE NUEVA COMANDA
========================================================= */

export const ContainerNewOrder = styled.div`
  width: 100%;
  height: 100%;

  min-width: 0;
  min-height: 0;

  display: flex;
  flex-direction: column;

  box-sizing: border-box;

  padding: 0;

  /*
   * En desktop dejamos que el grid
   * tenga una altura razonable.
   */
  @media (max-width: 1000px) {
    padding: 0;
  }

  @media (max-width: 700px) {
    padding: 0 10px 15px;

    /*
     * En móvil dejamos que el contenido
     * sea controlado por las secciones.
     */
  }

  @media (max-width: 400px) {
    padding: 0 8px 12px;
  }
`;

/* =========================================================
   SELECTOR MOBILE
========================================================= */

export const MobileOrderSelector = styled.div`
  display: none;

  @media (max-width: 1000px) {
    width: 100%;

    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 5px;

    padding: 5px;

    margin-bottom: 12px;

    box-sizing: border-box;

    background-color: rgba(var(--app-shadow-rgb), 0.15);

    border-radius: 10px;
  }

  @media (max-width: 500px) {
    margin-bottom: 10px;
  }

  @media (max-width: 400px) {
    gap: 3px;
    padding: 4px;
  }
`;

export const MobileOrderButton = styled.button<{
  $active: boolean;
}>`
  width: 100%;

  height: 42px;

  border: none;
  border-radius: 7px;

  background-color: ${({ $active }) => ($active ? "var(--app-accent)" : "transparent")};

  color: var(--app-primary);

  font-size: 0.92rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};

  cursor: pointer;

  transition:
    background-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background-color: ${({ $active }) =>
      $active ? "var(--app-accent)" : "rgba(var(--app-accent-rgb), 0.5)"};
  }

  &:active {
    transform: scale(0.98);
  }

  @media (max-width: 700px) {
    height: 40px;
    font-size: 0.86rem;
  }

  @media (max-width: 500px) {
    height: 38px;
    font-size: 0.82rem;
  }

  @media (max-width: 400px) {
    height: 36px;
    font-size: 0.76rem;
  }
`;

/* =========================================================
   GRID PRINCIPAL
========================================================= */

export const MainOrder = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  display: grid;

  grid-template-columns:
    minmax(270px, 0.82fr)
    minmax(400px, 1.25fr);

  gap: 14px;

  box-sizing: border-box;

  /*
   * Importante:
   * los hijos pueden reducirse dentro del grid.
   */
  > * {
    min-width: 0;
    min-height: 0;
  }

  /*
   * En desktop ambos paneles
   * permanecen visibles.
   */
  @media (max-width: 1100px) {
    grid-template-columns:
      minmax(250px, 0.78fr)
      minmax(360px, 1.22fr);

    gap: 12px;
  }

  @media (max-width: 1000px) {
    grid-template-columns: 1fr;

    /*
     * En tablet/celular solamente
     * mostramos la sección seleccionada.
     */
    grid-template-rows: 1fr;

    gap: 0;

    /*
     * Permitimos que el panel activo
     * ocupe todo el espacio disponible.
     */
    > .mobile-hidden {
      display: none;
    }

    > .mobile-active {
      display: block;
      height: 100%;
      width: 100%;
      min-width: 0;
    }
  }

  /*
   * =======================================================
   * CELULAR
   * =======================================================
   */

  @media (max-width: 700px) {
    grid-template-columns: 1fr;

    gap: 0;

    /*
     * Ya no necesitamos tener
     * dos filas simultáneamente.
     */
    grid-template-rows: 1fr;

    overflow: visible;

    padding-bottom: 5px;
  }

  @media (max-width: 500px) {
    gap: 0;
  }

  @media (max-width: 400px) {
    gap: 0;
  }
`;

export const StockWarningContent = styled.div`
  width: 100%;
  max-width: 620px;
  margin: 0 auto;
  padding: 8px 4px 2px;
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr);
  align-items: start;
  gap: 18px;
  box-sizing: border-box;

  @media (max-width: 520px) {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: 12px;
    padding: 4px 0 0;
  }
`;

export const StockWarningIcon = styled.div`
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 15px;
  background: rgba(190, 91, 39, 0.13);
  border: 1px solid rgba(190, 91, 39, 0.25);
  color: #a84f22;
  font-size: 1.8rem;
  font-weight: 800;
  line-height: 1;

  &::before {
    content: "";
    position: absolute;
  }

  @media (max-width: 520px) {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    font-size: 1.5rem;
  }
`;

export const StockWarningMessage = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding-top: 2px;
  color: var(--app-text, #38271f);

  strong {
    font-size: 1.02rem;
    line-height: 1.45;
    font-weight: 750;
  }

  span {
    font-size: 0.94rem;
    line-height: 1.65;
    color: var(--app-text-secondary, #6b5a50);
  }

  @media (max-width: 520px) {
    strong { font-size: 0.96rem; }
    span { font-size: 0.88rem; line-height: 1.55; }
  }
`;

export const StockWarningActions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 12px;
  padding-top: 18px;
  border-top: 1px solid rgba(94, 60, 42, 0.13);

  @media (max-width: 520px) {
    flex-direction: column-reverse;
    align-items: stretch;
    gap: 9px;
    margin-top: 6px;
    padding-top: 14px;
  }
`;

export const StockWarningButton = styled.button<{ $variant: "primary" | "secondary" }>`
  min-height: 44px;
  padding: 0 19px;
  border: 1px solid ${({ $variant }) => $variant === "primary" ? "#6e3b25" : "rgba(94, 60, 42, 0.25)"};
  border-radius: 11px;
  background: ${({ $variant }) => $variant === "primary" ? "#6e3b25" : "#fffaf4"};
  color: ${({ $variant }) => $variant === "primary" ? "#fffaf4" : "#5b4031"};
  font: inherit;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: ${({ $variant }) => $variant === "primary" ? "0 4px 10px rgba(75, 39, 23, 0.16)" : "none"};
  transition: background 160ms ease, border-color 160ms ease, transform 160ms ease, box-shadow 160ms ease;

  &:hover {
    background: ${({ $variant }) => $variant === "primary" ? "#542b1b" : "#f4e9dc"};
    border-color: ${({ $variant }) => $variant === "primary" ? "#542b1b" : "rgba(94, 60, 42, 0.4)"};
    box-shadow: ${({ $variant }) => $variant === "primary" ? "0 6px 14px rgba(75, 39, 23, 0.2)" : "none"};
  }

  &:active { transform: translateY(1px); }
  &:focus-visible { outline: 3px solid rgba(190, 91, 39, 0.35); outline-offset: 3px; }

  @media (max-width: 520px) {
    width: 100%;
    min-height: 46px;
  }
`;