import { useEffect, useRef, useState } from "react";

import {
  TimePickerContainer,
  TimePickerIcon,
  TimePickerNativeInput,
  TimePickerTextInput,
} from "./TimePickerStyles.ts";

import { isValidTime, normalizeTimeInput } from "../Utils/timeUtils.ts";

interface TimePickerProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  name?: string;
  ariaLabel?: string;
}

export default function TimePicker({
  value,
  onChange,
  placeholder = "--:--",
  disabled = false,
  id,
  name,
  ariaLabel = "Seleccionar horario",
}: TimePickerProps) {
  const textInputRef = useRef<HTMLInputElement>(null);
  const nativeInputRef = useRef<HTMLInputElement>(null);
  const isFocused = useRef(false);

  const [inputValue, setInputValue] = useState(value || "");

  // Sincroniza cambios externos cuando el usuario no está editando.
  useEffect(() => {
    if (!isFocused.current) {
      setInputValue(value || "");
    }
  }, [value]);

  const handleFocus = () => {
    isFocused.current = true;

    requestAnimationFrame(() => {
      textInputRef.current?.select();
    });
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const rawValue = event.target.value;
    const normalized = normalizeTimeInput(rawValue);

    setInputValue(normalized);
    onChange(normalized);

    // Mantiene el cursor al final después de normalizar.
    requestAnimationFrame(() => {
      const input = textInputRef.current;

      if (input && document.activeElement === input) {
        const position = input.value.length;
        input.setSelectionRange(position, position);
      }
    });
  };

  const handleNativeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const selectedTime = event.target.value;

    setInputValue(selectedTime);
    onChange(selectedTime);
  };

  const handleBlur = () => {
    isFocused.current = false;

    if (!inputValue || isValidTime(inputValue)) {
      onChange(inputValue);
    }
  };

  const openNativePicker = () => {
    if (disabled) return;

    const nativeInput = nativeInputRef.current;

    if (!nativeInput) return;

    if (typeof nativeInput.showPicker === "function") {
      try {
        nativeInput.showPicker();
      } catch {
        nativeInput.click();
      }
    } else {
      nativeInput.click();
    }
  };

  return (
    <TimePickerContainer>
      <TimePickerIcon
        type="button"
        disabled={disabled}
        aria-label="Abrir selector de horario"
        onClick={openNativePicker}
      >
        ◷
      </TimePickerIcon>

      <TimePickerTextInput
        ref={textInputRef}
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder={placeholder}
        value={inputValue}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={inputValue.length > 0 && !isValidTime(inputValue)}
        onFocus={handleFocus}
        onChange={handleTextChange}
        onBlur={handleBlur}
      />

      <TimePickerNativeInput
        ref={nativeInputRef}
        type="time"
        value={isValidTime(inputValue) ? inputValue : ""}
        disabled={disabled}
        tabIndex={-1}
        aria-label="Selector nativo de horario"
        onChange={handleNativeChange}
      />
    </TimePickerContainer>
  );
}