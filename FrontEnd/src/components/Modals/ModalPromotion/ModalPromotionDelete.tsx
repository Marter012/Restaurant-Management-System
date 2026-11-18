import { Power, Warning, TrashSimple } from "@phosphor-icons/react";

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
          <TrashSimple />
        ) : isActive ? (
          <Power />
        ) : (
          <Warning />
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
