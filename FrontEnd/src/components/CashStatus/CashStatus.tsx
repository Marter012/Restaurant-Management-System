import { useEffect, useLayoutEffect, useRef, useState } from "react";

import type { CSSProperties } from "react";
import { createPortal } from "react-dom";

import {
  FaCalendarAlt,
  FaSun,
  FaMoon,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaCheck,
  FaLayerGroup,
} from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import type { RootState, AppDispatch } from "../../store/store.ts";

import {
  selectDay,
  selectShift,
  type ShiftType,
} from "../../store/slices/daySelectedSlice.ts";

import {
  CashStatusContainer,
  CashHeader,
  DateTimeGroup,
  DateButton,
  DateInfo,
  ShiftToggle,
  ShiftChoice,
  CashStateBadge,
  Dropdown,
  DropdownContent,
  CalendarSection,
  CalendarHeader,
  CalendarNavigation,
  CalendarGrid,
  CalendarWeekDay,
  CalendarDay,
  CalendarFooter,
  ShiftSection,
  ShiftSectionTitle,
  ShiftOption,
  ShiftOptionInfo,
  StatusDot,
  OpenCashLink,
  CashStatusOverlay,
} from "./CashStatusStyles";

import { getDateOnly } from "../Utils/Formats.tsx";

export type ViewMode = "auto" | "desktop" | "tablet" | "mobile";


type CashStatusType = "open" | "closed" | "not-open";

interface ShiftStatus {
  morning: CashStatusType;
  night: CashStatusType;
}

interface CalendarDayItem {
  date: Date;
  currentMonth: boolean;
  selected: boolean;
  today: boolean;
}

const WEEK_DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

const formatLocalDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const getToday = () => formatLocalDate(new Date());

interface CashStatusProps {
  /** Vista responsive exclusiva de esta instancia. */
  viewMode?: ViewMode;
}

const CashStatus = ({ viewMode = "auto" }: CashStatusProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const cashRegisters = useSelector(
    (state: RootState) => state.cashRegister.cashRegister,
  );

  const selectedDate = useSelector((state: RootState) => state.daySelected.day);

  const selectedShift = useSelector(
    (state: RootState) => state.daySelected.shift,
  );

  // ---------------------------------------
  // REFS
  // ---------------------------------------

  const selectorRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------
  // ESTADOS
  // ---------------------------------------

  const [showDropdown, setShowDropdown] = useState(false);

  const [dropdownPlacement, setDropdownPlacement] = useState<"top" | "bottom">(
    "bottom",
  );

  const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({
    visibility: "hidden",
  });

  // Estado de cada turno para la fecha operativa seleccionada.
  const [shiftStatus, setShiftStatus] = useState<ShiftStatus>({
    morning: "not-open",
    night: "not-open",
  });

  // Mes visible en el calendario del dropdown.
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => {
    const initialDate = new Date(`${selectedDate}T00:00:00`);
    return new Date(initialDate.getFullYear(), initialDate.getMonth(), 1);
  });

  // Al iniciar la aplicación, seleccionar el turno según la hora local.
  useEffect(() => {
    const currentHour = new Date().getHours();
    const defaultShift: ShiftType =
      currentHour >= 6 && currentHour < 18 ? "morning" : "night";

    dispatch(selectShift(defaultShift));
  }, [dispatch]);

  // FECHA FORMATEADA
  // ---------------------------------------

  const selectedDateObject = new Date(`${selectedDate}T00:00:00`);

  const compactDateLabel = selectedDateObject.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
  });

  const mediumDateLabel = selectedDateObject.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
  });

  // Formato compacto utilizado únicamente en celular: "17 nov".
  const shortDateLabel = selectedDateObject
    .toLocaleDateString("es-AR", {
      day: "numeric",
      month: "short",
    })
    .replace(".", "");

  // ---------------------------------------
  // ESTADOS DE CAJA
  // ---------------------------------------

  useEffect(() => {
    if (!cashRegisters || cashRegisters.length === 0) {
      setShiftStatus({
        morning: "not-open",
        night: "not-open",
      });

      return;
    }

    const morningCashRegister = cashRegisters.find((cash) => {
      const cashDate = cash.date
        ? getDateOnly(cash.date)
        : getDateOnly(cash.opened_at);

      return cashDate === selectedDate && cash.shift === "morning";
    });

    const nightCashRegister = cashRegisters.find((cash) => {
      const cashDate = cash.date
        ? getDateOnly(cash.date)
        : getDateOnly(cash.opened_at);

      return cashDate === selectedDate && cash.shift === "night";
    });

    const morningStatus: CashStatusType = morningCashRegister
      ? morningCashRegister.status_cash_register === "open"
        ? "open"
        : "closed"
      : "not-open";

    const nightStatus: CashStatusType = nightCashRegister
      ? nightCashRegister.status_cash_register === "open"
        ? "open"
        : "closed"
      : "not-open";

    setShiftStatus({
      morning: morningStatus,
      night: nightStatus,
    });
  }, [selectedDate, cashRegisters]);

  // ---------------------------------------
  // TURNO SELECCIONADO
  // ---------------------------------------

  const currentStatus =
    selectedShift === "morning" ? shiftStatus.morning : shiftStatus.night;

  const currentShiftName = selectedShift === "morning" ? "Mañana" : "Noche";

  const getStatusText = (status: CashStatusType) => {
    switch (status) {
      case "open":
        return "Caja abierta";

      case "closed":
        return "Caja cerrada";

      default:
        return "Sin abrir";
    }
  };

  // ---------------------------------------
  // POSICIONAMIENTO DEL DROPDOWN
  // ---------------------------------------

  const updateDropdownPosition = () => {
    if (!selectorRef.current || !dropdownRef.current) return;

    const rect = selectorRef.current.getBoundingClientRect();

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const isMobile =
      viewMode === "mobile" ||
      (viewMode === "auto" &&
        window.matchMedia("(max-width: 700px)").matches);

    if (isMobile) {
      setDropdownStyle({
        position: "fixed",
        width: `min(480px, calc(100vw - 24px))`,
        maxWidth: "calc(100vw - 24px)",
        maxHeight: "calc(100dvh - 24px)",
        overflowY: "auto",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        visibility: "visible",
        zIndex: 2147483646,
      });

      return;
    }

    const dropdownRect = dropdownRef.current.getBoundingClientRect();

    const dropdownWidth = Math.min(660, viewportWidth - 24);

    const dropdownHeight = Math.min(dropdownRect.height, viewportHeight - 24);

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const placement =
      spaceBelow < dropdownHeight + 12 && spaceAbove > spaceBelow
        ? "top"
        : "bottom";

    setDropdownPlacement(placement);

    const left = Math.max(
      12,
      Math.min(rect.left, viewportWidth - dropdownWidth - 12),
    );

    let top =
      placement === "bottom"
        ? rect.bottom + 12
        : rect.top - dropdownHeight - 12;

    top = Math.max(12, Math.min(top, viewportHeight - dropdownHeight - 12));

    setDropdownStyle({
      position: "fixed",
      top: `${top}px`,
      left: `${left}px`,
      width: `${dropdownWidth}px`,
      maxWidth: "calc(100vw - 24px)",
      maxHeight: "calc(100dvh - 24px)",
      overflowY: "auto",
      transform: "none",
      visibility: "visible",
      zIndex: 2147483646,
    });
  };

  // ---------------------------------------
  // ABRIR / CERRAR DROPDOWN
  // ---------------------------------------

  const toggleDropdown = () => {
    if (!showDropdown) {
      const date = new Date(`${selectedDate}T00:00:00`);

      setCalendarMonth(new Date(date.getFullYear(), date.getMonth(), 1));

      setDropdownStyle({
        position: "fixed",
        top: "0px",
        left: "0px",
        visibility: "hidden",
        zIndex: 2147483646,
      });

      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  // ---------------------------------------
  // CALCULAR POSICIÓN ANTES DEL PINTADO
  // ---------------------------------------

  useLayoutEffect(() => {
    if (!showDropdown) return;

    updateDropdownPosition();

    const handleResize = () => {
      updateDropdownPosition();
    };

    const handleScroll = () => {
      updateDropdownPosition();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [showDropdown, viewMode]);

  // ---------------------------------------
  // CERRAR AL HACER CLICK FUERA
  // ---------------------------------------

  useEffect(() => {
    if (!showDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const clickedSelector = selectorRef.current?.contains(target);

      const clickedDropdown = dropdownRef.current?.contains(target);

      if (!clickedSelector && !clickedDropdown) {
        setShowDropdown(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showDropdown]);

  // ---------------------------------------
  // CALENDARIO
  // ---------------------------------------

  const today = getToday();

  const changeMonth = (direction: number) => {
    setCalendarMonth((current) => {
      return new Date(current.getFullYear(), current.getMonth() + direction, 1);
    });
  };

  const monthLabel = calendarMonth.toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  });

  const generateCalendarDays = (): CalendarDayItem[] => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();

    const firstDay = new Date(year, month, 1);

    const startingDay = (firstDay.getDay() + 6) % 7;

    const lastDay = new Date(year, month + 1, 0).getDate();

    const previousMonthLastDay = new Date(year, month, 0).getDate();

    const days: CalendarDayItem[] = [];

    for (let i = 0; i < 42; i++) {
      let date: Date;
      let currentMonth = true;

      if (i < startingDay) {
        const day = previousMonthLastDay - startingDay + i + 1;

        date = new Date(year, month - 1, day);
        currentMonth = false;
      } else if (i >= startingDay + lastDay) {
        const day = i - startingDay - lastDay + 1;

        date = new Date(year, month + 1, day);
        currentMonth = false;
      } else {
        const day = i - startingDay + 1;

        date = new Date(year, month, day);
      }

      const formattedDate = formatLocalDate(date);

      days.push({
        date,
        currentMonth,
        selected: formattedDate === selectedDate,
        today: formattedDate === today,
      });
    }

    return days;
  };

  const handleDateChange = (date: Date) => {
    dispatch(selectDay(formatLocalDate(date)));
  };

  const handleToday = () => {
    const todayDate = new Date();

    dispatch(selectDay(formatLocalDate(todayDate)));

    setCalendarMonth(
      new Date(todayDate.getFullYear(), todayDate.getMonth(), 1),
    );
  };

  // ---------------------------------------
  // CAMBIAR TURNO
  // ---------------------------------------

  const handleShiftChange = (shift: ShiftType) => {
    dispatch(selectShift(shift));
  };

  // ---------------------------------------
  // OPCIONES DE TURNO
  // ---------------------------------------

  const renderShiftOption = (
    shift: ShiftType,
    name: string,
    status: CashStatusType,
  ) => {
    const isSelected = selectedShift === shift;

    return (
      <ShiftOption
        type="button"
        key={shift}
        $selected={isSelected}
        onClick={() => handleShiftChange(shift)}
      >
        <span className="option-icon">
          {shift === "morning" ? <FaSun /> : <FaMoon />}
        </span>

        <ShiftOptionInfo>
          <strong>{name}</strong>

          <small>{getStatusText(status)}</small>
        </ShiftOptionInfo>

        <StatusDot $status={status} />

        {isSelected && <FaCheck className="check" />}
      </ShiftOption>
    );
  };

  // ---------------------------------------
  // PORTAL INDEPENDIENTE
  // ---------------------------------------

  const dropdownPortal =
    showDropdown && typeof document !== "undefined"
      ? createPortal(
          <>
            {/* OVERLAY */}
            <CashStatusOverlay onClick={() => setShowDropdown(false)} />

            {/* DROPDOWN */}
            <Dropdown
              ref={dropdownRef}
              $placement={dropdownPlacement}
              data-view-mode={viewMode}
              style={dropdownStyle}
            >
              <DropdownContent>
                {/* CALENDARIO */}
                <CalendarSection>
                  <CalendarHeader>
                    <CalendarNavigation
                      type="button"
                      onClick={() => changeMonth(-1)}
                      aria-label="Mes anterior"
                    >
                      <FaChevronLeft />
                    </CalendarNavigation>

                    <strong>{monthLabel}</strong>

                    <CalendarNavigation
                      type="button"
                      onClick={() => changeMonth(1)}
                      aria-label="Mes siguiente"
                    >
                      <FaChevronRight />
                    </CalendarNavigation>
                  </CalendarHeader>

                  <CalendarGrid>
                    {WEEK_DAYS.map((day) => (
                      <CalendarWeekDay key={day}>{day}</CalendarWeekDay>
                    ))}

                    {generateCalendarDays().map((item, index) => (
                      <CalendarDay
                        key={`${formatLocalDate(item.date)}-${index}`}
                        type="button"
                        $selected={item.selected}
                        $currentMonth={item.currentMonth}
                        $today={item.today}
                        disabled={formatLocalDate(item.date) > today}
                        onClick={() => handleDateChange(item.date)}
                      >
                        {item.date.getDate()}
                      </CalendarDay>
                    ))}
                  </CalendarGrid>

                  <CalendarFooter type="button" onClick={handleToday}>
                    <FaCalendarAlt />
                    <span>
                      Hoy,{" "}
                      {new Date().toLocaleDateString("es-AR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </CalendarFooter>
                </CalendarSection>

                {/* SELECTOR DE TURNO */}
                <ShiftSection>
                  <ShiftSectionTitle>
                    <span>Seleccionar turno</span>
                  </ShiftSectionTitle>

                  {renderShiftOption("morning", "Mañana", shiftStatus.morning)}

                  {renderShiftOption("night", "Noche", shiftStatus.night)}

                  {currentStatus === "not-open" && (
                    <OpenCashLink
                      as={NavLink}
                      to="cashRegister"
                      onClick={() => setShowDropdown(false)}
                    >
                      Abrir caja de {currentShiftName.toLowerCase()}
                    </OpenCashLink>
                  )}
                </ShiftSection>
              </DropdownContent>
            </Dropdown>
          </>,
          document.body,
        )
      : null;

  // ---------------------------------------
  // RENDER
  // ---------------------------------------

  return (
    <>
      <CashStatusContainer ref={selectorRef} data-view-mode={viewMode}>
        <CashHeader
          role="button"
          tabIndex={0}
          aria-label={`Fecha ${compactDateLabel}, turno ${currentShiftName}, ${getStatusText(currentStatus)}. Abrir selector`}
          aria-expanded={showDropdown}
          onClick={toggleDropdown}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              toggleDropdown();
            }
          }}
        >
          <DateTimeGroup>
            <DateButton as="div" $active={showDropdown}>
              <span className="date-icon-wrap">
                <FaCalendarAlt className="calendar-icon" />
              </span>
              <DateInfo>
                <small>FECHA OPERATIVA</small>
                <span className="date-medium">{mediumDateLabel}</span>
                <span className="date-short">{shortDateLabel}</span>
              </DateInfo>
              <FaChevronDown
                className={`arrow ${showDropdown ? "open" : ""}`}
              />
            </DateButton>
          </DateTimeGroup>

          <ShiftToggle
            aria-label={`Seleccionar turno. Turno actual: ${currentShiftName}`}
          >
            <ShiftChoice
              type="button"
              $selected={selectedShift === "morning"}
              title="Seleccionar turno mañana"
              aria-pressed={selectedShift === "morning"}
              onClick={(event) => {
                event.stopPropagation();
                handleShiftChange("morning");
              }}
            >
              <FaSun />
              <span>Mañana</span>
            </ShiftChoice>
            <ShiftChoice
              type="button"
              $selected={selectedShift === "night"}
              title="Seleccionar turno noche"
              aria-pressed={selectedShift === "night"}
              onClick={(event) => {
                event.stopPropagation();
                handleShiftChange("night");
              }}
            >
              <FaMoon />
              <span>Noche</span>
            </ShiftChoice>
          </ShiftToggle>

          <CashStateBadge
            $status={currentStatus}
            title={getStatusText(currentStatus)}
          >
            <FaLayerGroup className="cash-icon" />
            <span className="cash-copy">
              <small>Caja</small>
              <strong>
                {currentStatus === "open"
                  ? "Abierta"
                  : currentStatus === "closed"
                    ? "Cerrada"
                    : "Sin abrir"}
              </strong>
            </span>
            <StatusDot $status={currentStatus} />
          </CashStateBadge>
        </CashHeader>
      </CashStatusContainer>

      {dropdownPortal}
    </>
  );
};

export default CashStatus;
