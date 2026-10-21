import styled from "styled-components";

type CashStatusType = "open" | "closed" | "not-open";

interface StatusProps {
  $status: CashStatusType;
}

interface SelectedProps {
  $selected: boolean;
}

interface DropdownProps {
  $placement?: "top" | "bottom";
}

// =========================================================
// CONTENEDOR GENERAL
// =========================================================

export const CashStatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  min-width: 0;
  position: relative;
  z-index: 20;
  font-family: inherit;
`;

// =========================================================
// BOTÓN DE FECHA
// Los estilos locales prevalecen sobre los globales.
// =========================================================

export const DateButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  height: 48px;
  min-width: 82px;
  padding: 0 11px;

  border: 1px solid var(--app-surface-soft) !important;
  border-radius: 12px !important;

  background: var(--app-accent) !important;
  background-image: none !important;

  color: var(--app-white) !important;
  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: var(--app-border) !important;

    background: var(--app-white) !important;
    background-image: none !important;

    color: var(--app-primary) !important;
  }

  &:active {
    transform: scale(0.98) !important;
  }

  .calendar-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 27px;
    height: 27px;
    border-radius: 8px;

    background: var(--app-surface-soft);
    color: var(--app-primary);

    font-size: 13px;
  }

  .day-number,
  .month {
    color: inherit;
  }

  .cash-date-input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  @media (max-width: 700px) {
    min-width: 78px;
    height: 46px;
    padding: 0 9px;
    gap: 7px;
  }
`;

// =========================================================
// INFORMACIÓN DE FECHA
// =========================================================

export const DateInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-width: 28px;
  line-height: 1;
  color: inherit;

  .day-number {
    font-size: 17px;
    font-weight: 800;
    color: inherit;
  }

  .month {
    margin-top: 3px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: inherit;
  }
`;

// =========================================================
// SELECTOR DE TURNO
// =========================================================

export const ShiftSelector = styled.div`
  position: relative;
  min-width: 155px;

  @media (max-width: 700px) {
    min-width: 0;
    width: 100%;
    max-width: 230px;
  }
`;

// =========================================================
// BOTÓN DEL SELECTOR DE TURNO
// Mantiene el color correspondiente al estado de caja.
// =========================================================

export const ShiftSelectorButton = styled.button<StatusProps>`
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 48px;
  padding: 6px 10px;

  border: 1px solid var(--app-surface-soft) !important;
  border-radius: 12px !important;

  background: ${({ $status }) => {
    switch ($status) {
      case "open":
        return "var(--app-primary)";
      case "closed":
        return "var(--app-danger)";
      default:
        return "var(--app-white)";
    }
  }} !important;

  background-image: none !important;

  color: ${({ $status }) =>
    $status === "not-open"
      ? "var(--app-primary)"
      : "var(--app-white)"} !important;

  cursor: pointer;

  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: var(--app-border) !important;

    background: var(--app-white) !important;
    background-image: none !important;

    color: var(--app-primary) !important;
  }

  &:active {
    transform: scale(0.99) !important;
  }

  .shift-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;
    flex-shrink: 0;

    border-radius: 9px;

    background: var(--app-surface-soft);
    color: var(--app-primary);

    font-size: 13px;

    @media (max-width: 700px) {
      display: none;
    }
  }

  .shift-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    flex: 1;
    min-width: 0;

    line-height: 1.1;
    text-align: center;

    strong {
      font-size: 12px;
      font-weight: 750;
      color: inherit;
    }

    small {
      margin-top: 3px;
      white-space: nowrap;
      color: inherit;
    }
  }

  .arrow {
    flex-shrink: 0;
    margin-left: 7px;

    font-size: 10px;
    color: inherit;

    transition: transform 0.2s ease;

    &.open {
      transform: rotate(180deg);
    }
  }

  @media (max-width: 700px) {
    min-height: 46px;
  }
`;

// =========================================================
// INDICADOR DE ESTADO
// =========================================================

export const StatusDot = styled.span<StatusProps>`
  width: 7px;
  height: 7px;
  flex-shrink: 0;

  margin-left: 5px;
  border-radius: 50%;

  background: ${({ $status }) => {
    switch ($status) {
      case "open":
        return "var(--app-primary)";
      case "closed":
        return "var(--app-danger)";
      default:
        return "var(--app-border)";
    }
  }};
`;

// =========================================================
// MENÚ DESPLEGABLE DE TURNOS
// =========================================================

export const ShiftDropdown = styled.div<DropdownProps>`
  position: absolute;

  ${({ $placement = "bottom" }) =>
    $placement === "top"
      ? `
        bottom: calc(100% + 7px);
        top: auto;
      `
      : `
        top: calc(100% + 7px);
        bottom: auto;
      `}

  right: 0;

  width: 235px;
  max-width: calc(100vw - 24px);
  padding: 7px;

  border: 1px solid var(--app-border);
  border-radius: var(--app-radius);

  background: var(--app-surface);
  color: var(--app-primary);

  box-shadow: var(--app-shadow);
  z-index: 1000;
`;

// =========================================================
// ENCABEZADO DEL SELECTOR
// =========================================================

export const ShiftSelectorContent = styled.div`
  display: flex;
  align-items: center;

  height: 30px;
  padding: 0 10px;

  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.7px;

  color: var(--app-primary);
`;

// =========================================================
// OPCIONES DEL SELECTOR DE TURNO
// =========================================================

export const ShiftOption = styled.button<SelectedProps>`
  display: flex;
  align-items: center;

  width: 100%;
  min-height: 50px;
  padding: 7px 9px;

  border: none !important;
  border-radius: 10px !important;

  background: ${({ $selected }) =>
    $selected ? "var(--app-surface-soft)" : "transparent"} !important;

  background-image: none !important;

  color: var(--app-primary) !important;
  cursor: pointer;
  text-align: left;

  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: var(--app-surface-soft) !important;
    background-image: none !important;

    color: var(--app-primary) !important;
  }

  &:active {
    transform: scale(0.99) !important;
  }

  .option-icon {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 30px;
    height: 30px;
    flex-shrink: 0;

    border-radius: 8px;

    background: var(--app-surface-soft);
    color: inherit;

    font-size: 12px;
  }

  .check {
    margin-left: 8px;
    font-size: 11px;
    color: inherit;
  }
`;

// =========================================================
// INFORMACIÓN DE CADA OPCIÓN
// =========================================================

export const ShiftOptionInfo = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  min-width: 0;
  margin-left: 9px;

  line-height: 1.1;

  strong {
    font-size: 11px;
    font-weight: 750;
    color: inherit;
  }

  small {
    margin-top: 3px;
    font-size: 9px;
    color: inherit;
  }
`;

// =========================================================
// ENLACE PARA ABRIR LA CAJA
// =========================================================

export const OpenCashLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  min-height: 37px;

  margin-top: 5px;
  border-top: 1px solid var(--app-surface-soft);

  padding-top: 7px;

  color: var(--app-ink);

  font-size: 10px;
  font-weight: 700;

  text-decoration: none;

  transition: color 0.2s ease;

  &:hover {
    color: var(--app-primary-active);
  }
`;