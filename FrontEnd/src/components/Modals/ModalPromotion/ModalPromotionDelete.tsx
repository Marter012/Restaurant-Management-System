import { FaPowerOff, FaExclamationTriangle, FaTrashAlt } from "react-icons/fa";

import {
  DeleteContainer,
  DeleteIcon,
  DeleteTitle,
  DeleteDescription,
  DeleteProductName,
} from "../ModalProduct/ModalProductStyles.ts";

import type { Promotion } from "../../../interfaces/Promotion.ts";

interface ModalPromotionDeleteProps {
  promotion: Promotion;
  mode?: "delete" | "status";
}

const ModalPromotionDelete = ({
  promotion,
  mode = "status",
}: ModalPromotionDeleteProps) => {
  const isActive = promotion.status;
  const isDelete = mode === "delete";

  return (
    <DeleteContainer>
      <DeleteIcon $danger={isDelete || isActive}>
        {isDelete ? (
          <FaTrashAlt />
        ) : isActive ? (
          <FaPowerOff />
        ) : (
          <FaExclamationTriangle />
        )}
      </DeleteIcon>

      <DeleteTitle>
        {isDelete
          ? "Eliminar promoción"
          : isActive
            ? "Desactivar promoción"
            : "Activar promoción"}
      </DeleteTitle>

      <DeleteDescription>
        {isDelete
          ? "¿Estás seguro de que deseas eliminar esta promoción?"
          : isActive
            ? "¿Estás seguro de que deseas desactivar esta promoción?"
            : "¿Estás seguro de que deseas activar esta promoción?"}
      </DeleteDescription>

      <DeleteProductName>{promotion.name}</DeleteProductName>
    </DeleteContainer>
  );
};

export default ModalPromotionDelete;
