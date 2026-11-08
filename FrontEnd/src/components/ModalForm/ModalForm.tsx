import type { ReactNode } from "react";
import { IoClose } from "react-icons/io5";

import {
  ModalContainer,
  ModalHeader,
  HeaderIdentity,
  HeaderIcon,
  HeaderText,
  CloseButton,
  ModalContent,
  ModalFooter,
  FooterActions,
  CancelButton,
  type ModalSize,
  FooterControls,
} from "./ModalFormStyles.ts";
import { Portal } from "../Portal/Portal.tsx";

interface ModalFormProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  description?: string;
  icon?: ReactNode;
  footerActions?: ReactNode;
  cancelText?: string;
  ariaLabel?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  size?: ModalSize;
  scroll?: "active" | "false";
  showCloseButton?: boolean;
  showCancelButton?: boolean;
}

const ModalForm = ({
  isOpen,
  title,
  onClose,
  children,
  description,
  icon,
  footerActions,
  ariaLabel,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  size = "default",
  scroll = "active",
  showCloseButton = true,
  showCancelButton = true,
}: ModalFormProps) => {
  return (
    <Portal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEscape={closeOnEscape}
      ariaLabel={ariaLabel || title}
    >
      <ModalContainer $size={size} onClick={(event) => event.stopPropagation()}>
        <ModalHeader>
          <HeaderIdentity>
            {icon && <HeaderIcon>{icon}</HeaderIcon>}
            <HeaderText>
              <h2>{title}</h2>
              {description && <p>{description}</p>}
            </HeaderText>
          </HeaderIdentity>

          {showCloseButton && (
            <CloseButton
              type="button"
              onClick={onClose}
              aria-label="Cerrar modal"
            >
              <IoClose />
            </CloseButton>
          )}
        </ModalHeader>

        <ModalContent $scroll={scroll}>{children}</ModalContent>
{(showCancelButton || footerActions) && (
  <ModalFooter>
          <FooterControls>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>

            <FooterActions>{footerActions}</FooterActions>
          </FooterControls> </ModalFooter>
)}
      </ModalContainer>
    </Portal>
  );
};

export default ModalForm;
