import styled from "styled-components";

/** Contenedor raíz compartido por todas las vistas de la tienda. */
export const PageContainer = styled.main`
  box-sizing: border-box;
  min-height: 100vh;
  min-height: 100svh;
  margin: 0;
  padding: 0 0 calc(88px + env(safe-area-inset-bottom));
  color: var(--app-ink);
  background: linear-gradient(180deg, #f8f7f0 0%, var(--app-canvas) 48%, #ecefe5 100%);
  & > * { box-sizing: border-box; }
`;
