import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ModalOverlay, ModalSurface } from "./PortalStyles.ts";

interface PortalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  ariaLabel?: string;
}

export const Portal = ({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  ariaLabel = "Ventana modal",
}: PortalProps) => {
  const surfaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeOnEscape, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay
      onClick={(event) => {
        if (event.target === event.currentTarget) {

          if (closeOnOverlayClick) {
            onClose();
          }
        }
      }}
    >
      <ModalSurface
        ref={surfaceRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
      >
        {children}
      </ModalSurface>
    </ModalOverlay>,
    document.body,
  );
};
