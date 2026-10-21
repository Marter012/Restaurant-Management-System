import styled from "styled-components";
import { caramelButtonStyles } from "../Utils/ButtonStyles.ts";

// =========================================================
// DESIGN SYSTEM
// Los colores se consumen directamente desde las variables de :root.
// =========================================================

// =========================================================
// CONTENEDOR GENERAL
// Panel limpio, bordes discretos y apariencia de dashboard
// =========================================================

export const CardTable = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  border: 1px solid var(--app-border);
  border-radius: var(--app-radius);
  box-shadow:
    0 1px 2px rgba(var(--app-shadow-rgb), 0.025),
    0 8px 24px rgba(var(--app-shadow-rgb), 0.035);

  text-align: center;
  box-sizing: border-box;

  transition:
    border-color var(--app-transition),
    box-shadow var(--app-transition);

  &:focus-within {
    border-color: var(--app-border-strong);
  }

  @media (max-width: 700px) {
    border-radius: var(--app-radius-sm);
  }

  @media (max-width: 400px) {
    border-radius: var(--app-radius-sm);
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// =========================================================
// CABECERA
// Estilo administrativo moderno y tipografía compacta
// =========================================================

export const TableHeader = styled.div<{ $columns: number }>`
  display: grid;

  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));

  gap: 16px;
  align-items: center;

  padding: 15px 18px;

  background: var(--app-white);

  border-bottom: 1px solid var(--app-border);

  box-sizing: border-box;

  h4 {
    min-width: 0;
    margin: 0;
    color: var(--app-navbar-text);

    font-family: inherit;
    font-size: 13px;
    font-weight: 800;

    line-height: 1.4;
    letter-spacing: 0.075em;
    text-transform: uppercase;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ${caramelButtonStyles}

  @media (max-width: 850px) {
    gap: 10px;
    padding: 13px 12px;

    h4 {
      font-size: 12px;
    }
  }

  @media (max-width: 600px) {
    grid-template-columns:
      minmax(0, 1.6fr)
      0.65fr
      0.9fr
      0.8fr;

    gap: 6px;
    padding: 11px 8px;

    h4 {
      font-size: 12px !important;
      letter-spacing: 0.015em;
    }

    h4:nth-child(4) {
      display: none;
    }
  }
`;

// =========================================================
// CONTENEDOR DE FILAS
// Fondo neutro para dar profundidad al nuevo diseño
// =========================================================

export const ContainerRows = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 0;

  flex: 1 1 auto;

  display: flex;
  flex-direction: column;

  gap: 0;

  padding: 5px 8px;

  overflow-y: auto;
  overflow-x: hidden;

  background: var(--app-white);

  box-sizing: border-box;

  scrollbar-width: none;

  background-color: var(--app-muted-dark);
  @media (max-width: 600px) {
    padding: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    scroll-behavior: auto;
  }
`;

// =========================================================
// FILAS
// Rediseño: registros modernos con apariencia de tarjetas
// =========================================================

export const TableRow = styled.div<{ $columns: number }>`
  position: relative;

  display: grid;

  grid-template-columns: repeat(${({ $columns }) => $columns}, minmax(0, 1fr));

  gap: 16px;
  align-items: center;

  min-width: 0;

  margin: 4px 0;
  padding: 16px 14px;

  border: 1px solid transparent;
  border-radius: var(--app-radius-sm);
  background: #f3e5cf;

  color: var(--app-muted-dark);

  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
  box-sizing: border-box;

  box-shadow: var(--app-shadow-xs);

  transition:
    background-color var(--app-transition),
    border-color var(--app-transition),
    box-shadow var(--app-transition),
    transform var(--app-transition);

  &:hover {
    z-index: 1;

    background: var(--app-surface-soft);

    border-color: var(--app-border);

    box-shadow:
      0 2px 4px rgba(var(--app-shadow-rgb), 0.025),
      0 5px 12px rgba(var(--app-shadow-rgb), 0.035);
  }

  &:focus-within {
    border-color: var(--app-surface-soft);

    box-shadow: 0 0 0 3px rgba(var(--app-muted-rgb), 0.08);
  }

  &:last-child {
    margin-bottom: 4px;
  }

  span,
  p,
  strong {
    min-width: 0;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  p {
    margin: 0;
  }

  span {
    color: var(--app-muted-dark);
  }

  strong {
    color: var(--app-ink);
    font-size: 14px;
    font-weight: 750;
  }

  // -------------------------------------------------------
  // ACCIONES
  // -------------------------------------------------------

  .actions {
    min-width: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    gap: 7px;
  }

  .actions button {
    flex-shrink: 0;
  }

  // -------------------------------------------------------
  // PRECIOS Y VALORES DESTACADOS
  // -------------------------------------------------------

  .price {
    color: var(--app-ink);
    font-size: 13px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  strong:last-child {
    color: var(--app-success);
    font-size: 13px;
    font-weight: 800;
  }

  // -------------------------------------------------------
  // INDICADORES DE ESTADO
  // Se conservan las clases existentes
  // -------------------------------------------------------

  .status-text {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: fit-content;
    max-width: 100%;

    padding: 5px 9px;

    border: 1px solid var(--app-surface-soft);
    border-radius: 999px;

    background: var(--app-success-soft);
    color: var(--app-success);

    font-size: 12px;
    font-weight: 800;
    line-height: 1.25;
  }

  .stock {
    font-variant-numeric: tabular-nums;
  }

  // -------------------------------------------------------
  // ESTADO PENDIENTE
  // -------------------------------------------------------

  &.pending {
    background: var(--app-warning-soft);

    border-color: var(--app-accent-soft);

    color: var(--app-accent);

    &:hover {
      background: var(--app-surface-soft);
      border-color: var(--app-accent);
    }

    strong {
      color: var(--app-accent);
    }

    .status-text {
      background: var(--app-surface-soft);
      border-color: var(--app-accent);
      color: var(--app-accent);
    }
  }

  // -------------------------------------------------------
  // RESPONSIVE TABLET
  // -------------------------------------------------------

  @media (max-width: 850px) {
    gap: 10px;

    margin: 3px 0;
    padding: 13px 10px;

    font-size: 13px;

    border-radius: var(--app-radius-sm);

    .actions {
      gap: 5px;
    }

    strong {
      font-size: 13px;
    }

    strong:last-child {
      font-size: 13px;
    }
  }

  h4,
  strong,
  p {
    font-size: 15px !important;
  }

  // -------------------------------------------------------
  // RESPONSIVE MÓVIL
  // Se mantienen las clases utilizadas por productos
  // -------------------------------------------------------

  @media (max-width: 600px) {
    grid-template-columns:
      minmax(0, 1.6fr)
      0.65fr
      0.9fr
      0.8fr;

    gap: 6px;

    margin: 3px 0;
    padding: 11px 7px;

    font-size: 12px;

    border-radius: var(--app-radius-sm);

    .category {
      display: none;
    }

    .actions {
      justify-content: flex-end;
      gap: 4px;
    }

    .price {
      font-weight: 800;
    }

    .product-name {
      min-width: 0;
    }

    .stock {
      text-align: center;
    }

    .price {
      text-align: center;
    }

    .buttonstock {
      width: 30px;
      min-width: 30px;
      height: 30px;

      padding: 6px;
      gap: 0;

      border-radius: var(--app-radius-sm);
    }

    .button-text {
      display: none;
    }

    .actions button:not(.buttonstock) {
      width: 30px;
      min-width: 30px;
      height: 30px;

      padding: 6px;
      gap: 0;

      border-radius: var(--app-radius-sm);
    }

    .status-text {
      display: none;
    }

    .actions svg {
      width: 14px;
      height: 14px;

      flex-shrink: 0;
    }

    strong:last-child {
      font-size: 12px;
    }
  }

  // -------------------------------------------------------
  // RESPONSIVE MÓVIL PEQUEÑO
  // -------------------------------------------------------

  @media (max-width: 400px) {
    grid-template-columns:
      minmax(0, 1.5fr)
      0.6fr
      0.85fr
      0.7fr;

    gap: 4px;

    margin: 2px 0;
    padding: 10px 5px;

    font-size: 12px;

    border-radius: var(--app-radius-sm);

    .actions {
      gap: 3px;
    }

    .buttonstock,
    .actions button:not(.buttonstock) {
      width: 28px;
      min-width: 28px;
      height: 28px;

      padding: 5px;
    }

    .actions svg {
      width: 13px;
      height: 13px;
    }

    strong {
      font-size: 12px;
    }

    strong:last-child {
      font-size: 12px;
    }
  }

  // -------------------------------------------------------
  // ACCESIBILIDAD
  // -------------------------------------------------------

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;

// =========================================================
// BOTONES DE TABLA
// Botones compactos con estética profesional
// =========================================================

export const TableButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  gap: 7px;

  width: fit-content;
  min-width: 0;
  min-height: 32px;

  padding: 7px 11px;

  border: 1px solid var(--app-border-strong);
  border-radius: var(--app-radius-sm);

  background: var(--app-surface);
  color: var(--app-muted-dark);

  font-family: inherit;
  font-size: 12px;
  font-weight: 750;
  line-height: 1.2;

  white-space: nowrap;

  cursor: pointer;

  box-shadow: var(--app-shadow-xs);

  transition:
    background-color var(--app-transition),
    border-color var(--app-transition),
    color var(--app-transition),
    box-shadow var(--app-transition),
    transform var(--app-transition);

  &:hover:not(:disabled) {
    filter: brightness(1.2);
  }

  &:focus-visible {
    outline: 3px solid var(--app-surface-soft);
    outline-offset: 2px;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: none;
  }

  &:disabled {
    background: var(--app-surface-soft);
    border-color: var(--app-border);
    color: var(--app-muted);

    cursor: not-allowed;

    transform: none;
    box-shadow: none;
  }

  svg {
    width: 14px;
    height: 14px;

    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    min-width: 30px;
    width: 30px;
    height: 30px;

    padding: 6px;

    gap: 0;

    border-radius: var(--app-radius-sm);

    .button-text {
      display: none;
    }

    svg {
      width: 14px;
      height: 14px;
    }
  }

  @media (max-width: 400px) {
    min-width: 28px;
    width: 28px;
    height: 28px;

    padding: 5px;

    svg {
      width: 13px;
      height: 13px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`;
