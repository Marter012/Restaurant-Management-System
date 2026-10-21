import { css } from "styled-components";

// =========================================================
// BOTÓN CHOCOLATE Y CARAMELO
// Se aplica únicamente cuando se importa y se utiliza.
// =========================================================

export const caramelButtonStyles = css`
  background-image: linear-gradient(
    135deg,
    #B78350 0%,
    #94633D 50%,
    #60351F 100%
  ) !important;

  color: #FFF8EC;
  border-color: #94633D;

  &:hover {
    background-image: linear-gradient(
      135deg,
      #C4925F 0%,
      #A67549 50%,
      #70452C 100%
    );
  }

  &:active {
    background-image: linear-gradient(
      135deg,
      #94633D 0%,
      #60351F 100%
    );
  }
`;