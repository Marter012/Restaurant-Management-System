import ModalForm from "../ModalForm/ModalForm.tsx";

import {
  PrintStatusContainer,
  PrintStatusIcon,
  PrintStatusTitle,
  PrintStatusDescription,
  PrintStatusBadge,
  PrintStatusActions,
  PrintStatusButton,
  PrintStatusIndicator,
} from "./ModalPrintFalseStyles.ts";

interface PrintFalseProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ModalPrintFalse = ({ show, setShow }: PrintFalseProps) => {
  const handleClose = () => {
    setShow(false);
  };

  return (
    <ModalForm
      isOpen={show}
      title="Estado de la impresora"
      onClose={handleClose}
    >
      <PrintStatusContainer>
        <PrintStatusIcon aria-hidden="true">
          <PrintStatusIndicator />
          !
        </PrintStatusIcon>

        <PrintStatusBadge>
          Impresora desconectada
        </PrintStatusBadge>

        <PrintStatusTitle>
          No se puede imprimir
        </PrintStatusTitle>

        <PrintStatusDescription>
          La impresora no está disponible en este momento.
          Verificá que esté encendida, conectada correctamente
          y que el equipo pueda detectarla.
        </PrintStatusDescription>

        <PrintStatusActions>
          <PrintStatusButton
            type="button"
            onClick={handleClose}
          >
            Entendido
          </PrintStatusButton>
        </PrintStatusActions>
      </PrintStatusContainer>
    </ModalForm>
  );
};

export default ModalPrintFalse;