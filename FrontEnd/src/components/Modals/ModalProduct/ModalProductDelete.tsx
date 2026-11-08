import {
  FaPowerOff,
  FaExclamationTriangle,
  FaTrashAlt,
} from "react-icons/fa";

import {
  DeleteContainer,
  DeleteIcon,
  DeleteTitle,
  DeleteDescription,
  DeleteProductName,
} from "./ModalProductStyles";

import type { Product } from "../../../interfaces/Product.ts";

interface ModalProductDeleteProps {
  product: Product;
  mode?: "delete" | "status";
}

const ModalProductDelete = ({
  product,
  mode = "status",
}: ModalProductDeleteProps) => {
  const isActive = product.status;
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
          ? "Eliminar producto"
          : isActive
            ? "Desactivar producto"
            : "Activar producto"}
      </DeleteTitle>

      <DeleteDescription>
        {isDelete
          ? "¿Estás seguro de que deseas eliminar este producto?"
          : isActive
            ? "¿Estás seguro de que deseas desactivar este producto?"
            : "¿Estás seguro de que deseas activar este producto?"}
      </DeleteDescription>

      <DeleteProductName>{product.name}</DeleteProductName>

    </DeleteContainer>
  );
};

export default ModalProductDelete;
