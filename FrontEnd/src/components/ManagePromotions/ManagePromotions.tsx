import { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FaPlus, FaSearch, FaTimes } from "react-icons/fa";
import { MdOutlineMoreHoriz } from "react-icons/md";

import ListTable from "../../components/Tables/ListTable";
import ModalForm from "../../components/ModalForm/ModalForm";

import type { AppDispatch, RootState } from "../../store/store";

import {
  setPromotions,
  updatePromotion,
} from "../../store/slices/promotionSlice";

import {
  getPromotionsAPI,
  updatePromotionStatusAPI,
} from "../../services/promotionService";

import type { Promotion } from "../../interfaces/Promotion";

import PromotionForm from "../Forms/PromotionForm/PromotionForm.tsx";

import {
  ContainerManagePromotions,
  Filter,
  AddPromotionButton,
  PromotionOptions,
  PromotionInfo,
  PromotionItems,
  PromotionItem,
  PromotionActions,
  ActionButton,
  CancelButton,
} from "./ManagePromotionsStyles.ts";

import { TableButton, TableRow } from "../Tables/ListTableStyles";
import { StatusButton } from "../ManageProducts/ManageProductsStyles.ts";

type ModalMode = "options" | "create" | "edit" | "delete";

interface ManagePromotionProps {
  showActive: boolean;
  setShowActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ManagePromotionRef {
  openModal: () => void;
}

export const AddPromotion = ({ onClick }: { onClick: () => void }) => {
  return (
    <AddPromotionButton type="button" onClick={onClick}>
      <FaPlus />
      Nueva promoción
    </AddPromotionButton>
  );
};

const ManagePromotions = forwardRef<ManagePromotionRef, ManagePromotionProps>(
  ({ showActive, setShowActive }, ref) => {
    const dispatch = useDispatch<AppDispatch>();

    const { promotions, loading, error } = useSelector(
      (state: RootState) => state.promotion,
    );

    const products = useSelector((state: RootState) => state.products.products);

    const [modalOpen, setModalOpen] = useState(false);

    const [modalMode, setModalMode] = useState<ModalMode>("options");

    const [selectedPromotion, setSelectedPromotion] =
      useState<Promotion | null>(null);

    const [deleteError, setDeleteError] = useState<string | null>(null);

    const [deleting, setDeleting] = useState(false);
    const [promotionSearch, setPromotionSearch] = useState("");

    const loadPromotions = async () => {
      try {
        const data = await getPromotionsAPI();

        dispatch(setPromotions(data));
      } catch (error) {
        console.error("Error cargando promociones:", error);
      }
    };

    const filteredPromotions = promotions
      .filter((promotion) => {
        const matchesStatus = promotion.status === showActive;
        const matchesSearch = promotion.name
          .toLocaleLowerCase("es")
          .includes(promotionSearch.trim().toLocaleLowerCase("es"));
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) =>
        a.name.localeCompare(b.name, "es", { sensitivity: "base" }),
      );

    const openModal = (mode: ModalMode, promotion?: Promotion) => {
      setModalMode(mode);

      setSelectedPromotion(promotion ?? null);

      setDeleteError(null);

      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);

      setSelectedPromotion(null);

      setModalMode("options");

      setDeleteError(null);

      setDeleting(false);
    };

    const getModalTitle = () => {
      switch (modalMode) {
        case "create":
          return "Nueva promoción";

        case "edit":
          return "Editar promoción";

        case "delete":
          return selectedPromotion?.status
            ? "Desactivar promoción"
            : "Activar promoción";

        default:
          return "Opciones de la promoción";
      }
    };

    const getProductName = (productId: string) => {
      return (
        products.find((product) => product.id === productId)?.name ?? productId
      );
    };

    useImperativeHandle(
      ref,
      () => ({
        openModal: () => {
          openModal("create");
        },
      }),
      [products],
    );

    return (
      <ContainerManagePromotions>
        <Filter>
          <button
            type="button"
            className={showActive ? "active" : ""}
            onClick={() => setShowActive(true)}
          >
            Activas
          </button>

          <button
            type="button"
            className={!showActive ? "active" : ""}
            onClick={() => setShowActive(false)}
          >
            Inactivas
          </button>
          <label className="promotion-search">
            <FaSearch aria-hidden="true" />
            <input
              type="search"
              value={promotionSearch}
              onChange={(event) => setPromotionSearch(event.target.value)}
              placeholder="Buscar promoción..."
              aria-label="Buscar promoción por nombre"
            />
            {promotionSearch && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setPromotionSearch("")}
                aria-label="Limpiar búsqueda"
              >
                <FaTimes />
              </button>
            )}
          </label>
        </Filter>

        {loading && <p>Cargando promociones...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <ListTable
            className="promotions-table"
            headers={[
              "Nombre",
              "Descripción",
              "Precio",
              "Composición",
              "Acciones",
            ]}
          >
            {filteredPromotions.length === 0 && (
              <p>
                {promotionSearch.trim()
                  ? `No se encontraron promociones con “${promotionSearch.trim()}”.`
                  : showActive
                    ? "No hay promociones activas."
                    : "No hay promociones inactivas."}
              </p>
            )}
            {filteredPromotions.map((promotion) => (
              <TableRow
                $columns={5}
                className="promotions-table-row"
                key={promotion.id}
                onClick={() => openModal("options", promotion)}
                style={{ cursor: "pointer" }}
              >
                <div className="promotion-name">
                  <strong>{promotion.name}</strong>
                </div>

                <p className="promotion-description">{promotion.description}</p>

                <p className="price">
                  ${promotion.price.toLocaleString("es-AR")}
                </p>

                <div className="promotion-composition">
                  {promotion.items.map((item) => (
                    <div key={item.id}>
                      <strong>
                        {item.quantity} {item.name}
                      </strong>
                    </div>
                  ))}
                </div>

                <div className="actions">
                  <TableButton
                    type="button"
                    title="Opciones"
                    aria-label="Opciones de promoción"
                    onClick={() => openModal("options", promotion)}
                    className={promotion.status ? "active" : "inactive"}
                  >
                    <span className="button-text">Editar</span>

                    <MdOutlineMoreHoriz />
                  </TableButton>
                </div>
              </TableRow>
            ))}
          </ListTable>
        )}

        <ModalForm
          isOpen={modalOpen}
          title={getModalTitle()}
          onClose={closeModal}
        >
          {modalMode === "options" && selectedPromotion && (
            <PromotionOptions>
              <h3>{selectedPromotion.name}</h3>
              <div className="containerInfo">
                <PromotionInfo>
                  <div>
                    <span>Descripción</span>

                    <strong>{selectedPromotion.description}</strong>
                  </div>

                  <div>
                    <span>Precio</span>

                    <strong>
                      ${selectedPromotion.price.toLocaleString("es-AR")}
                    </strong>
                  </div>
                </PromotionInfo>

                <PromotionItems>
                  <h3>Composición</h3>

                  {selectedPromotion.items.map((item) => (
                    <PromotionItem key={item.id}>
                      <div>
                        <strong>{item.name}</strong>

                        <span>Cantidad: {item.quantity}</span>
                      </div>

                      <div>
                        <span>Productos permitidos</span>

                        {item.product_ids.map((productId) => (
                          <p key={productId}>{getProductName(productId)}</p>
                        ))}
                      </div>
                    </PromotionItem>
                  ))}
                </PromotionItems>
              </div>

              <PromotionActions>
                {selectedPromotion.status && (
                  <ActionButton
                    type="button"
                    onClick={() => setModalMode("edit")}
                  >
                    Modificar promoción
                  </ActionButton>
                )}

                <StatusButton
                  className={selectedPromotion.status ? "active" : "inactive"}
                  type="button"
                  onClick={() => {
                    setDeleteError(null);

                    setModalMode("delete");
                  }}
                >
                  {selectedPromotion.status
                    ? "Desactivar promoción"
                    : "Activar promoción"}
                </StatusButton>

                <CancelButton type="button" onClick={closeModal}>
                  Cancelar
                </CancelButton>
              </PromotionActions>
            </PromotionOptions>
          )}

          {modalMode === "create" && (
            <PromotionForm
              mode="create"
              onSuccess={async () => {
                await loadPromotions();
                closeModal();
              }}
            />
          )}

          {modalMode === "edit" && selectedPromotion && (
            <PromotionForm
              mode="edit"
              promotion={selectedPromotion}
              onSuccess={async () => {
                await loadPromotions();
                closeModal();
              }}
            />
          )}

          {modalMode === "delete" && selectedPromotion && (
            <PromotionOptions>
              <div className="containerInfo">
                <PromotionInfo>
                  <h3>
                    {selectedPromotion.status
                      ? "Desactivar promoción"
                      : "Activar promoción"}
                  </h3>

                  <p>
                    {selectedPromotion.status
                      ? "¿Estás seguro de que querés desactivar esta promoción?"
                      : "¿Estás seguro de que querés activar esta promoción?"}
                  </p>

                  <strong>{selectedPromotion.name}</strong>

                  {deleteError && <p>{deleteError}</p>}
                </PromotionInfo>
              </div>

              <PromotionActions>
                <StatusButton
                  className={selectedPromotion.status ? "active" : "inactive"}
                  type="button"
                  disabled={deleting}
                  onClick={async () => {
                    try {
                      setDeleting(true);
                      setDeleteError(null);

                      const status = !selectedPromotion.status;

                      const updated = await updatePromotionStatusAPI(
                        selectedPromotion.id,
                        status,
                      );

                      dispatch(updatePromotion(updated));

                      setShowActive(status);

                      closeModal();
                    } catch (error) {
                      console.error("Error actualizando promoción:", error);

                      setDeleteError(
                        "No se pudo actualizar el estado de la promoción.",
                      );
                    } finally {
                      setDeleting(false);
                    }
                  }}
                >
                  {deleting
                    ? "Procesando..."
                    : selectedPromotion.status
                      ? "Desactivar"
                      : "Activar"}
                </StatusButton>

                <CancelButton
                  type="button"
                  disabled={deleting}
                  onClick={() => setModalMode("options")}
                >
                  Cancelar
                </CancelButton>
              </PromotionActions>
            </PromotionOptions>
          )}
        </ModalForm>
      </ContainerManagePromotions>
    );
  },
);

ManagePromotions.displayName = "ManagePromotions";

export default ManagePromotions;
