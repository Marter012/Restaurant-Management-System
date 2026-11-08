import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaTimes,
} from "react-icons/fa";

import {
  AlertContainer,
  AlertIcon,
  AlertMessage,
  CloseButton,
} from "./AlertStyles";

export type AlertType = "success" | "error";

interface AlertProps {
  message: string;
  type: AlertType;
  onClose: () => void;
  duration?: number;
  stackIndex?: number;
}

const Alert = ({
  message,
  type,
  onClose,
  duration = 5000,
  stackIndex = 0,
}: AlertProps) => {
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      closeRef.current();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [duration]);

  return createPortal(
    <AlertContainer
      $type={type}
      $stackIndex={stackIndex}
      role="alert"
    >
      <AlertIcon>
        {type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}
      </AlertIcon>

      <AlertMessage>{message}</AlertMessage>

      <CloseButton
        type="button"
        onClick={onClose}
        aria-label="Cerrar alerta"
      >
        <FaTimes />
      </CloseButton>
    </AlertContainer>,
    document.body,
  );
};

export default Alert;