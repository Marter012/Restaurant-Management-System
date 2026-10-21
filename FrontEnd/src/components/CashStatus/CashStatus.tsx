import { useEffect, useRef, useState } from "react";
import {
  FaCalendarAlt,
  FaSun,
  FaMoon,
  FaChevronDown,
  FaCheck,
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
  DateButton,
  DateInfo,
  ShiftSelector,
  ShiftSelectorButton,
  ShiftSelectorContent,
  ShiftDropdown,
  ShiftOption,
  ShiftOptionInfo,
  StatusDot,
  OpenCashLink,
} from "./CashStatusStyles";

import { getDateOnly } from "../Utils/Formats.tsx";

type CashStatusType = "open" | "closed" | "not-open";

interface ShiftStatus {
  morning: CashStatusType;
  night: CashStatusType;
}

const CashStatus = () => {
  const dispatch = useDispatch<AppDispatch>();

  const cashRegisters = useSelector(
    (state: RootState) => state.cashRegister.cashRegister,
  );

  const selectedDate = useSelector((state: RootState) => state.daySelected.day);

  const selectedShift = useSelector(
    (state: RootState) => state.daySelected.shift,
  );

  const [shiftStatus, setShiftStatus] = useState<ShiftStatus>({
    morning: "not-open",
    night: "not-open",
  });

  const [showShiftMenu, setShowShiftMenu] = useState(false);

  const [dropdownPlacement, setDropdownPlacement] = useState<"top" | "bottom">(
    "bottom",
  );

  const toggleShiftMenu = () => {
    if (!showShiftMenu && shiftSelectorRef.current) {
      const rect = shiftSelectorRef.current.getBoundingClientRect();

      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;

      const dropdownHeight = 190;

      if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
        setDropdownPlacement("top");
      } else {
        setDropdownPlacement("bottom");
      }
    }

    setShowShiftMenu((current) => !current);
  };
  // Ref del selector completo
  const shiftSelectorRef = useRef<HTMLDivElement>(null);

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

    let morningStatus: CashStatusType = "not-open";

    if (morningCashRegister) {
      morningStatus =
        morningCashRegister.status_cash_register === "open" ? "open" : "closed";
    }

    let nightStatus: CashStatusType = "not-open";

    if (nightCashRegister) {
      nightStatus =
        nightCashRegister.status_cash_register === "open" ? "open" : "closed";
    }

    setShiftStatus({
      morning: morningStatus,
      night: nightStatus,
    });
  }, [selectedDate, cashRegisters]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        shiftSelectorRef.current &&
        !shiftSelectorRef.current.contains(event.target as Node)
      ) {
        setShowShiftMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(selectDay(event.target.value));
  };

  const openCalendar = () => {
    const input = document.querySelector(
      ".cash-date-input",
    ) as HTMLInputElement | null;

    input?.showPicker();
  };

  const handleShiftChange = (shift: ShiftType) => {
    dispatch(selectShift(shift));
    setShowShiftMenu(false);
  };

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

  const currentStatus =
    selectedShift === "morning" ? shiftStatus.morning : shiftStatus.night;

  const currentShiftName = selectedShift === "morning" ? "Mañana" : "Noche";

  const currentShiftIcon = selectedShift === "morning" ? <FaSun /> : <FaMoon />;

  const date = new Date(`${selectedDate}T00:00:00`);

  const dayNumber = date.getDate();

  const month = date
    .toLocaleDateString("es-AR", {
      month: "short",
    })
    .replace(".", "")
    .toUpperCase();

  return (
    <CashStatusContainer>
      {/* FECHA */}
      <DateButton type="button" onClick={openCalendar}>
        <div className="calendar-icon">
          <FaCalendarAlt />
        </div>

        <DateInfo>
          <span className="day-number">{dayNumber}</span>

          <span className="month">{month}</span>
        </DateInfo>

        <input
          className="cash-date-input"
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          aria-label="Seleccionar fecha"
        />
      </DateButton>

      {/* SELECTOR DE TURNO */}
      <ShiftSelector ref={shiftSelectorRef}>
        <ShiftSelectorButton
          type="button"
          onClick={toggleShiftMenu}
          $status={currentStatus}
        >
          <span className="shift-icon">{currentShiftIcon}</span>

          <span className="shift-content">
            <strong>{currentShiftName}</strong>

            <small>{getStatusText(currentStatus)}</small>
          </span>

          <StatusDot $status={currentStatus} />

          <FaChevronDown className={`arrow ${showShiftMenu ? "open" : ""}`} />
        </ShiftSelectorButton>

        {showShiftMenu && (
          <ShiftDropdown $placement={dropdownPlacement}>
            <ShiftSelectorContent>
              <span>Seleccionar turno</span>
            </ShiftSelectorContent>

            {/* MAÑANA */}
            <ShiftOption
              type="button"
              $selected={selectedShift === "morning"}
              onClick={() => handleShiftChange("morning")}
            >
              <span className="option-icon">
                <FaSun />
              </span>

              <ShiftOptionInfo>
                <strong>Mañana</strong>

                <small>{getStatusText(shiftStatus.morning)}</small>
              </ShiftOptionInfo>

              <StatusDot $status={shiftStatus.morning} />

              {selectedShift === "morning" && <FaCheck className="check" />}
            </ShiftOption>

            {/* NOCHE */}
            <ShiftOption
              type="button"
              $selected={selectedShift === "night"}
              onClick={() => handleShiftChange("night")}
            >
              <span className="option-icon">
                <FaMoon />
              </span>

              <ShiftOptionInfo>
                <strong>Noche</strong>

                <small>{getStatusText(shiftStatus.night)}</small>
              </ShiftOptionInfo>

              <StatusDot $status={shiftStatus.night} />

              {selectedShift === "night" && <FaCheck className="check" />}
            </ShiftOption>

            {/* ABRIR CAJA */}
            {currentStatus === "not-open" && (
              <OpenCashLink
                as={NavLink}
                to="cashRegister"
                onClick={() => setShowShiftMenu(false)}
              >
                Abrir caja de {currentShiftName.toLowerCase()}
              </OpenCashLink>
            )}
          </ShiftDropdown>
        )}
      </ShiftSelector>
    </CashStatusContainer>
  );
};

export default CashStatus;
