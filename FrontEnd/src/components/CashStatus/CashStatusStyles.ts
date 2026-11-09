import styled from "styled-components";

type CashStatusType = "open" | "closed" | "not-open";
interface DropdownProps {
  $placement: "top" | "bottom";
}
interface CalendarDayProps {
  $selected: boolean;
  $currentMonth: boolean;
  $today: boolean;
}
interface ShiftOptionProps {
  $selected: boolean;
}
interface StatusDotProps {
  $status: CashStatusType;
}
interface ShiftChoiceProps {
  $selected: boolean;
}

// Diseño base para el panel lateral de escritorio (ancho disponible aproximado: 222px).
export const CashStatusContainer = styled.div`
  position: relative;
  display: block;
  width: 100%;
  min-width: 0;
  color: var(--color-text);
  font-family: var(--font-family-base);
`;

export const CashHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: "date" "status" "shift";
  gap: 7px;
  width: 100%;
  min-width: 0;
  padding: 9px;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  border-radius: 17px;
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  cursor: pointer;

  @media (max-width: 1000px) {
    [data-view-mode="auto"] & {
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas: "date" "status" "shift";
      justify-items: center;
      gap: 5px;
      padding: 5px;
      border-radius: 12px;
    }
  }

  [data-view-mode="tablet"] &,
  [data-view-mode="mobile"] & {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "date" "status" "shift";
    justify-items: center;
    gap: 5px;
    padding: 5px;
    border-radius: 12px;
  }

  /* Celular: fecha, turnos y estado en una sola línea. */
  @media (max-width: 620px) {
    [data-view-mode="auto"] & {
      grid-template-columns: auto auto auto;
      grid-template-areas: "date shift status";
      align-items: center;
      justify-content: space-between;
      justify-items: stretch;
      column-gap: 6px;
      row-gap: 0;
      padding: 5px 7px;
      border-radius: 11px;
    }
  }

  [data-view-mode="mobile"] & {
    grid-template-columns: auto auto auto;
    grid-template-areas: "date shift status";
    align-items: center;
    justify-content: space-between;
    justify-items: stretch;
    column-gap: 6px;
    row-gap: 0;
    padding: 5px 7px;
    border-radius: 11px;
  }
`;

export const DateTimeGroup = styled.div`
  display: contents;
`;

export const DateButton = styled.button<{ $active?: boolean }>`
  grid-area: date;
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  min-width: 0;
  padding: 5px 7px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--color-accent)" : "transparent")};
  border-radius: 12px;
  background: ${({ $active }) =>
    $active ? "var(--color-surface-muted)" : "transparent"};
  color: var(--color-text);
  text-align: left;
  cursor: pointer;

  .date-icon-wrap {
    display: grid;
    place-items: center;
    flex: 0 0 34px;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    background: var(--color-background);
    color: var(--color-primary);
  }
  .calendar-icon {
    font-size: 1.05rem;
  }
  .calendar-day-number {
    display: none;
  }
  .arrow {
    flex: 0 0 auto;
    margin-left: auto;
    color: var(--color-primary);
    font-size: 0.75rem;
  }
  .arrow.open {
    transform: rotate(180deg);
  }
  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  @media (max-width: 1000px) {
    [data-view-mode="auto"] & {
      justify-content: center;
      width: 100%;
      padding: 3px 0;
      gap: 0;

      .date-icon-wrap {
        position: relative;
        flex-basis: 34px;
        width: 34px;
        height: 34px;
        border-radius: 9px;
      }

      .calendar-icon {
        font-size: 1.2rem;
      }

      .calendar-day-number {
        position: absolute;
        display: block;
        inset: 0;
        padding-top: 13px;
        color: var(--color-text);
        font-size: 0.62rem;
        font-weight: 900;
        line-height: 1;
        text-align: center;
        pointer-events: none;
      }

      .arrow {
        display: none;
      }
    }
  }

  [data-view-mode="tablet"] &,
  [data-view-mode="mobile"] & {
    justify-content: center;
    width: 100%;
    padding: 3px 0;
    gap: 0;

    .date-icon-wrap {
      position: relative;
      flex-basis: 34px;
      width: 34px;
      height: 34px;
      border-radius: 9px;
    }

    .calendar-icon {
      font-size: 1.2rem;
    }

    .calendar-day-number {
      position: absolute;
      display: block;
      inset: 0;
      padding-top: 13px;
      color: var(--color-text);
      font-size: 0.62rem;
      font-weight: 900;
      line-height: 1;
      text-align: center;
      pointer-events: none;
    }

    .arrow {
      display: none;
    }
  }

  @media (max-width: 620px) {
    [data-view-mode="auto"] & {
      justify-content: flex-start;
      width: auto;
      padding: 2px 3px;
      gap: 5px;
      white-space: nowrap;

      .date-icon-wrap {
        flex: 0 0 27px;
        width: 27px;
        height: 27px;
        border-radius: 7px;
      }

      .calendar-icon {
        font-size: 0.9rem;
      }

      .calendar-day-number {
        display: none;
      }
    }
  }

  [data-view-mode="mobile"] & {
    justify-content: flex-start;
    width: auto;
    padding: 2px 3px;
    gap: 5px;
    white-space: nowrap;

    .date-icon-wrap {
      flex: 0 0 27px;
      width: 27px;
      height: 27px;
      border-radius: 7px;
    }

    .calendar-icon {
      font-size: 0.9rem;
    }

    .calendar-day-number {
      display: none;
    }
  }
`;

export const DateInfo = styled.span`
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 2px;

  small {
    color: var(--color-text-secondary);
    font-size: 0.58rem;
    font-weight: 800;
    letter-spacing: 0.07em;
    line-height: 1;
  }
  .date-full,
  .date-short {
    display: none;
  }
  .date-medium {
    overflow: hidden;
    color: var(--color-text);
    font-size: 0.88rem;
    font-weight: 800;
    line-height: 1.2;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 1000px) {
    [data-view-mode="auto"] & {
      display: none;
    }
  }

  [data-view-mode="tablet"] &,
  [data-view-mode="mobile"] & {
    display: none;
  }

  @media (max-width: 620px) {
    [data-view-mode="auto"] & {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      gap: 0;

      small,
      .date-full,
      .date-medium {
        display: none;
      }

      .date-short {
        display: inline;
        color: var(--color-text);
        font-size: 0.72rem;
        font-weight: 850;
        line-height: 1;
        white-space: nowrap;
      }
    }
  }

  [data-view-mode="mobile"] & {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    gap: 0;

    small,
    .date-full,
    .date-medium {
      display: none;
    }

    .date-short {
      display: inline;
      color: var(--color-text);
      font-size: 0.72rem;
      font-weight: 850;
      line-height: 1;
      white-space: nowrap;
    }
  }
`;

export const TimeInfo = styled.div`
  display: none;
`;

export const ShiftToggle = styled.div`
  grid-area: shift;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px;
  width: 100%;
  min-width: 0;
  padding: 3px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-background);

  @media (max-width: 1000px) {
    [data-view-mode="auto"] & {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 3px;
      padding: 2px;
      border-radius: 9px;
    }
  }

  [data-view-mode="tablet"] &,
  [data-view-mode="mobile"] & {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3px;
    padding: 2px;
    border-radius: 9px;
  }

  @media (max-width: 620px) {
    [data-view-mode="auto"] & {
      grid-area: shift;
      display: grid;
      grid-template-columns: repeat(2, max-content);
      gap: 4px;
      width: auto;
      padding: 2px;
      border-radius: 8px;
    }
  }

  [data-view-mode="mobile"] & {
    grid-area: shift;
    display: grid;
    grid-template-columns: repeat(2, max-content);
    gap: 4px;
    width: auto;
    padding: 2px;
    border-radius: 8px;
  }
`;

export const ShiftChoice = styled.button<ShiftChoiceProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 0;
  min-height: 36px;
  padding: 7px 8px;
  border: 1px solid
    ${({ $selected }) => ($selected ? "var(--color-primary)" : "transparent")};
  border-radius: 9px;
  background: ${({ $selected }) =>
    $selected ? "var(--color-primary)" : "transparent"};
  color: ${({ $selected }) =>
    $selected ? "var(--color-surface)" : "var(--color-text)"};
  font-family: var(--font-family-base);
  font-size: 0.82rem;
  font-weight: 800;
  white-space: nowrap;
  cursor: pointer;

  > svg:first-child {
    flex: 0 0 auto;
    font-size: 0.95rem;
  }
  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  @media (max-width: 1000px) {
    [data-view-mode="auto"] & {
      min-height: 30px;
      padding: 4px 2px;
      gap: 0;
      border-radius: 7px;
      font-size: 0;

      > svg:first-child {
        font-size: 0.95rem;
      }
    }
  }

  [data-view-mode="tablet"] &,
  [data-view-mode="mobile"] & {
    min-height: 30px;
    padding: 4px 2px;
    gap: 0;
    border-radius: 7px;
    font-size: 0;

    > svg:first-child {
      font-size: 0.95rem;
    }
  }

  @media (max-width: 620px) {
    [data-view-mode="auto"] & {
      min-height: 27px;
      padding: 4px 6px;
      gap: 4px;
      border-radius: 6px;
      font-size: 0.62rem;

      > svg:first-child {
        font-size: 0.85rem;
      }

      > span {
        display: inline;
        font-size: 0.62rem;
        line-height: 1;
      }
    }
  }

  [data-view-mode="mobile"] & {
    min-height: 27px;
    padding: 4px 6px;
    gap: 4px;
    border-radius: 6px;
    font-size: 0.62rem;

    > svg:first-child {
      font-size: 0.85rem;
    }

    > span {
      display: inline;
      font-size: 0.62rem;
      line-height: 1;
    }
  }
`;

export const CashStateBadge = styled.div<{ $status: CashStatusType }>`
  grid-area: status;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  min-height: 34px;
  box-sizing: border-box;
  padding: 6px 10px;
  border: 1px solid
    ${({ $status }) =>
      $status === "open"
        ? "color-mix(in srgb, var(--color-success) 28%, transparent)"
        : $status === "closed"
          ? "color-mix(in srgb, var(--color-danger) 28%, transparent)"
          : "var(--color-border)"};
  border-radius: 10px;
  background: ${({ $status }) =>
    $status === "open"
      ? "var(--color-success-soft)"
      : $status === "closed"
        ? "var(--color-danger-soft)"
        : "var(--color-surface)"};

  .cash-icon {
    flex: 0 0 auto;
    color: ${({ $status }) =>
      $status === "open"
        ? "var(--color-success)"
        : $status === "closed"
          ? "var(--color-danger)"
          : "var(--color-text-secondary)"};
    font-size: 0.95rem;
  }
  .cash-copy {
    display: flex;
    align-items: center;
    min-width: 0;
  }
  small {
    display: none;
  }
  strong {
    color: ${({ $status }) =>
      $status === "open"
        ? "var(--color-success)"
        : $status === "closed"
          ? "var(--color-danger)"
          : "var(--color-text-secondary)"};
    font-size: 0.78rem;
    font-weight: 850;
    white-space: nowrap;
  }
  > span:last-child {
    margin-left: auto;
  }

  @media (max-width: 1000px) {
    [data-view-mode="auto"] & {
      justify-content: center;
      min-height: 16px;
      padding: 2px;
      border: 0;
      background: transparent;

      .cash-icon,
      .cash-copy {
        display: none;
      }

      > span:last-child {
        margin: 0;
      }
    }
  }

  [data-view-mode="tablet"] &,
  [data-view-mode="mobile"] & {
    justify-content: center;
    min-height: 16px;
    padding: 2px;
    border: 0;
    background: transparent;

    .cash-icon,
    .cash-copy {
      display: none;
    }

    > span:last-child {
      margin: 0;
    }
  }

  @media (max-width: 620px) {
    [data-view-mode="auto"] & {
      grid-area: status;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 4px;
      width: auto;
      min-height: 27px;
      padding: 2px 5px;
      border: 1px solid
        ${({ $status }) =>
          $status === "open"
            ? "color-mix(in srgb, var(--color-success) 28%, transparent)"
            : $status === "closed"
              ? "color-mix(in srgb, var(--color-danger) 28%, transparent)"
              : "var(--color-border)"};
      border-radius: 7px;
      background: ${({ $status }) =>
        $status === "open"
          ? "var(--color-success-soft)"
          : $status === "closed"
            ? "var(--color-danger-soft)"
            : "var(--color-surface)"};

      .cash-icon {
        display: none;
      }

      .cash-copy {
        display: flex;
        align-items: center;
        min-width: 0;
      }

      strong {
        font-size: 0.64rem;
        font-weight: 850;
        line-height: 1;
      }

      > span:last-child {
        flex: 0 0 7px;
        width: 7px;
        height: 7px;
        margin: 0;
      }
    }
  }

  [data-view-mode="mobile"] & {
    grid-area: status;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 4px;
    width: auto;
    min-height: 27px;
    padding: 2px 5px;
    border: 1px solid
      ${({ $status }) =>
        $status === "open"
          ? "color-mix(in srgb, var(--color-success) 28%, transparent)"
          : $status === "closed"
            ? "color-mix(in srgb, var(--color-danger) 28%, transparent)"
            : "var(--color-border)"};
    border-radius: 7px;
    background: ${({ $status }) =>
      $status === "open"
        ? "var(--color-success-soft)"
        : $status === "closed"
          ? "var(--color-danger-soft)"
          : "var(--color-surface)"};

    .cash-icon {
      display: none;
    }

    .cash-copy {
      display: flex;
      align-items: center;
      min-width: 0;
    }

    strong {
      font-size: 0.64rem;
      font-weight: 850;
      line-height: 1;
    }

    > span:last-child {
      flex: 0 0 7px;
      width: 7px;
      height: 7px;
      margin: 0;
    }
  }
`;

export const CashStatusOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2147483645;
  background: color-mix(in srgb, var(--color-sidebar-deep) 24%, transparent);
  backdrop-filter: blur(2px);
`;

export const Dropdown = styled.div<DropdownProps>`
  position: fixed;
  z-index: 2147483646;
  box-sizing: border-box;
  padding: 18px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: 0 24px 64px var(--modal-shadow);
  @media (max-width: 620px) {
    &[data-view-mode="auto"] {
      grid-template-columns: 1fr;

      max-width: 70dvw;
      max-height: 70dvh;
      overflow-y: auto;
    }
  }

  &[data-view-mode="mobile"] {
    grid-template-columns: 1fr;

    max-width: 70dvw;
    max-height: 70dvh;
    overflow-y: auto;
  }
`;

export const DropdownContent = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(230px, 0.95fr);
  gap: 20px;
  width: 100%;
  min-width: 0;

  @media (max-width: 620px) {
    [data-view-mode="auto"] & {
      grid-template-columns: 1fr;

      max-width: 100%;
      max-height: 70dvh;
      overflow-y: auto;
    }
  }

  [data-view-mode="mobile"] & {
    grid-template-columns: 1fr;

    max-width: 100%;
    max-height: 70dvh;
    overflow-y: auto;
  }
`;

export const CalendarSection = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 4px;
`;

export const CalendarHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  strong {
    color: var(--color-text);
    font-size: 1rem;
    font-weight: 800;
    text-transform: capitalize;
  }
`;

export const CalendarNavigation = styled.button`
  display: grid;
  place-items: center;
  flex: 0 0 36px;
  width: 36px;
  height: 36px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface);
  color: var(--color-primary);
  cursor: pointer;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 5px;
  width: 100%;
`;

export const CalendarWeekDay = styled.span`
  display: grid;
  place-items: center;
  min-height: 30px;
  color: var(--color-text-secondary);
  font-size: 0.72rem;
  font-weight: 800;
`;

export const CalendarDay = styled.button<CalendarDayProps>`
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  min-width: 0;
  border: 1px solid
    ${({ $selected, $today }) =>
      $selected
        ? "var(--color-primary)"
        : $today
          ? "var(--color-accent)"
          : "transparent"};
  border-radius: 11px;
  background: ${({ $selected }) =>
    $selected ? "var(--color-primary)" : "transparent"};
  color: ${({ $selected, $currentMonth }) =>
    $selected
      ? "var(--color-surface)"
      : $currentMonth
        ? "var(--color-text)"
        : "var(--color-text-secondary)"};
  font-family: var(--font-family-base);
  font-size: 0.82rem;
  font-weight: ${({ $selected, $today }) => ($selected || $today ? 800 : 600)};
  cursor: pointer;
  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
    pointer-events: none;
    text-decoration: none;
  }
`;

export const CalendarFooter = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 40px;
  margin-top: 14px;
  border: 1px solid var(--color-border);
  border-radius: 11px;
  background: var(--color-surface);
  color: var(--color-primary);
  font-family: var(--font-family-base);
  font-size: 0.8rem;
  font-weight: 750;
  cursor: pointer;
`;

export const ShiftSection = styled.section`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  min-width: 0;
  gap: 9px;
  padding: 4px 0 4px 18px;
  border-left: 1px solid var(--color-border);
  @media (max-width: 620px) {
    [data-view-mode="auto"] & {
      padding: 0;
      border-left: 0;
    }
  }

  [data-view-mode="mobile"] & {
    padding: 0;
    border-left: 0;
  }
`;

export const ShiftSectionTitle = styled.div`
  margin-bottom: 3px;
  color: var(--color-text-secondary);
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.09em;
  text-transform: uppercase;
`;

export const ShiftOption = styled.button<ShiftOptionProps>`
  display: flex;
  align-items: center;
  gap: 11px;
  width: 100%;
  min-width: 0;
  padding: 12px;
  border: 1px solid
    ${({ $selected }) =>
      $selected ? "var(--color-accent)" : "var(--color-border)"};
  border-radius: 13px;
  background: ${({ $selected }) =>
    $selected ? "var(--color-background)" : "var(--color-surface)"};
  color: var(--color-text);
  text-align: left;
  font-family: var(--font-family-base);
  cursor: pointer;

  .option-icon {
    display: grid;
    place-items: center;
    flex: 0 0 36px;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: var(--color-background);
    color: var(--color-primary);
    font-size: 1rem;
  }
  .check {
    flex: 0 0 auto;
    margin-left: 5px;
    color: var(--color-primary);
  }
`;

export const ShiftOptionInfo = styled.span`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  gap: 3px;
  strong {
    color: var(--color-text);
    font-size: 0.9rem;
    font-weight: 800;
  }
  small {
    color: var(--color-text-secondary);
    font-size: 0.74rem;
    line-height: 1.3;
  }
`;

export const StatusDot = styled.span<StatusDotProps>`
  display: inline-block;
  flex: 0 0 9px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: ${({ $status }) =>
    $status === "open"
      ? "var(--color-success)"
      : $status === "closed"
        ? "var(--color-danger)"
        : "var(--color-text-light)"};
`;

export const OpenCashLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 44px;
  box-sizing: border-box;
  margin-top: 5px;
  padding: 10px 14px;
  border-radius: 12px;
  background: var(--color-primary);
  color: var(--color-surface);
  font-size: 0.84rem;
  font-weight: 800;
  text-align: center;
  text-decoration: none;
`;
