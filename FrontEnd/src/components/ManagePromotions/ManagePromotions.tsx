import { forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaPlus,
  FaSearch,
  FaTimes,
  FaPercent,
  FaCalendarAlt,
  FaEllipsisV,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

import ModalForm from "../../components/ModalForm/ModalForm";
import type { AppDispatch, RootState } from "../../store/store";
import {
  setPromotions,
  updatePromotion,
} from "../../store/slices/promotionSlice";
import {
  deletePromotionAPI,
  getPromotionsAPI,
  updatePromotionStatusAPI,
} from "../../services/promotionService";
import type { Promotion } from "../../interfaces/Promotion";

import {
  ContainerManagePromotions,
  Filter,
  AddPromotionButton,
  PromotionGrid,
  PromotionCard,
  PromotionImage,
  PromotionCardContent,
  PromotionCardFooter,
  PromotionBadge,
  PromotionMenuButton,
  SearchControl,
  FilterSelect,
  EmptyPromotions,
} from "./ManagePromotionsStyles.ts";
import ModalPromotionCreate from "../Modals/ModalPromotion/ModalPromotionCreate.tsx";
import ModalPromotionEdit from "../Modals/ModalPromotion/ModalPromotionEdit.tsx";
import ModalPromotionOptions from "../Modals/ModalPromotion/ModalPromotionOptions.tsx";
import ModalPromotionDelete from "../Modals/ModalPromotion/ModalPromotionDelete.tsx";
import { ActionButton, StatusButton } from "../Utils/ButtonStyles.ts";
import { useAlert } from "../context/AlertContext.tsx";

type ModalMode = "options" | "create" | "edit" | "delete";
type DeleteAction = "delete" | "status";
interface ManagePromotionProps {
  showActive: boolean;
  setShowActive: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ManagePromotionRef {
  openModal: () => void;
}

type PromotionWithOptionalMetadata = Promotion & {
  type?: string;
  category?: string;
  start_date?: string;
  end_date?: string;
  valid_from?: string;
  valid_until?: string;
};

const formatDate = (value?: string) => {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("es-AR", { day: "2-digit", month: "short" });
};

const getApiErrorMessage = (error: unknown, fallback: string): string => {
  const apiError = error as {
    response?: { data?: { detail?: unknown; message?: unknown } };
    message?: unknown;
  };
  const detail = apiError?.response?.data?.detail;
  const message = apiError?.response?.data?.message ?? apiError?.message;

  if (typeof detail === "string" && detail.trim()) return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    const messages = detail
      .map((item) => {
        if (typeof item === "string") return item;
        if (item && typeof item === "object" && "msg" in item) {
          return String((item as { msg: unknown }).msg);
        }
        return "";
      })
      .filter(Boolean);
    if (messages.length) return messages.join(". ");
  }
  if (typeof message === "string" && message.trim()) return message;
  return fallback;
};

export const AddPromotion = ({ onClick }: { onClick: () => void }) => (
  <AddPromotionButton type="button" onClick={onClick}>
    <FaPlus /> Nueva promoción
  </AddPromotionButton>
);

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
    const [deleting, setDeleting] = useState(false);
    const [deleteAction, setDeleteAction] = useState<DeleteAction>("status");
    const [promotionSearch, setPromotionSearch] = useState("");
    const [menuPromotionId, setMenuPromotionId] = useState<string | null>(null);

    const loadPromotions = async () => {
      try {
        const data = await getPromotionsAPI();
        dispatch(setPromotions(data));
      } catch (loadError) {
        console.error("Error cargando promociones:", loadError);
      }
    };

    const { showAlert } = useAlert();

    const handleDeletePromotion = async () => {
      if (!selectedPromotion || deleting) return;

      try {
        setDeleting(true);

        await deletePromotionAPI(selectedPromotion.id);

        dispatch(
          setPromotions(
            promotions.filter(
              (promotion) => promotion.id !== selectedPromotion.id,
            ),
          ),
        );

        showAlert("Promoción eliminada correctamente", "success");

        closeModal();
      } catch (deleteError) {
        console.error("Error eliminando promoción:", deleteError);

        showAlert(
          getApiErrorMessage(
            deleteError,
            "No se pudo eliminar la promoción. Intentá nuevamente.",
          ),
          "error",
        );
      } finally {
        setDeleting(false);
      }
    };
    const now = new Date();
    const allPromotions = promotions as PromotionWithOptionalMetadata[];

    const filteredPromotions = allPromotions
      .filter((promotion) => promotion.status === showActive)
      .filter((promotion) =>
        promotion.name
          .toLocaleLowerCase("es")
          .includes(promotionSearch.trim().toLocaleLowerCase("es")),
      )
      .sort((a, b) =>
        a.name.localeCompare(b.name, "es", { sensitivity: "base" }),
      );

    const openModal = (mode: ModalMode, promotion?: Promotion) => {
      setModalMode(mode);
      setSelectedPromotion(promotion ?? null);
      setMenuPromotionId(null);
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
      setSelectedPromotion(null);
      setModalMode("options");
      setDeleting(false);
    };

    const getModalTitle = () => {
      switch (modalMode) {
        case "create":
          return "Nueva promoción";
        case "edit":
          return "Editar promoción";
        case "delete":
          if (deleteAction === "delete") return "Borrar promoción";
          return selectedPromotion?.status
            ? "Desactivar promoción"
            : "Activar promoción";
        default:
          return "Opciones de la promoción";
      }
    };

    const getModalDescription = () => {
      switch (modalMode) {
        case "create":
          return "Configurá el precio y los productos que incluye la promoción.";
        case "edit":
          return "Actualizá los datos y la composición de esta promoción.";
        case "delete":
          if (deleteAction === "delete") {
            return "Esta acción eliminará definitivamente la promoción.";
          }
          return selectedPromotion?.status
            ? "Confirmá si querés desactivar esta promoción."
            : "Confirmá si querés volver a activar esta promoción.";
        default:
          return "Consultá la información y administrá esta promoción.";
      }
    };

    const getProductName = (productId: string) =>
      products.find((product) => product.id === productId)?.name ?? productId;

    useImperativeHandle(ref, () => ({ openModal: () => openModal("create") }));

    return (
      <ContainerManagePromotions>
        <Filter>
          <SearchControl className="promotion-search">
            <FaSearch aria-hidden="true" />

            <input
              type="search"
              value={promotionSearch}
              onChange={(event) => setPromotionSearch(event.target.value)}
              placeholder="Buscar promoción por nombre..."
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
          </SearchControl>

          <label className="select-filter">
            <span>Estado</span>

            <FilterSelect
              value={showActive ? "active" : "inactive"}
              onChange={(event) =>
                setShowActive(event.target.value === "active")
              }
              aria-label="Filtrar por estado"
            >
              <option value="active">Activas</option>
              <option value="inactive">Inactivas</option>
            </FilterSelect>
          </label>

          <AddPromotion onClick={() => openModal("create")} />
        </Filter>

        {loading && (
          <p className="promotions-feedback">Cargando promociones...</p>
        )}
        {error && <p className="promotions-feedback">{error}</p>}

        {!loading && !error && (
          <PromotionGrid>
            {filteredPromotions.length === 0 ? (
              <EmptyPromotions>
                No se encontraron promociones para los filtros seleccionados.
              </EmptyPromotions>
            ) : (
              filteredPromotions.map((promotion) => {
                const metadata = promotion as PromotionWithOptionalMetadata;
                const start = formatDate(
                  metadata.start_date || metadata.valid_from,
                );
                const end = formatDate(
                  metadata.end_date || metadata.valid_until,
                );
                const isScheduled =
                  !!metadata.start_date && new Date(metadata.start_date) > now;
                const isExpired =
                  !!(metadata.end_date || metadata.valid_until) &&
                  new Date(metadata.end_date || metadata.valid_until || "") <
                    now;
                const badgeLabel = !promotion.status
                  ? "Inactiva"
                  : isScheduled
                    ? "Programada"
                    : isExpired
                      ? "Finalizada"
                      : "Activa";

                return (
                  <PromotionCard
                    key={promotion.id}
                    onClick={() => openModal("options", promotion)}
                  >
                    <PromotionImage>
                      <img
                        src={promotion.image || "/images/Products.png"}
                        alt={promotion.name}
                        onError={(event) => {
                          event.currentTarget.src = "/images/Products.png";
                        }}
                      />
                      <PromotionBadge
                        $status={
                          !promotion.status
                            ? "inactive"
                            : isScheduled
                              ? "scheduled"
                              : isExpired
                                ? "expired"
                                : "active"
                        }
                      >
                        {!promotion.status ? (
                          <FaTimesCircle />
                        ) : isScheduled ? (
                          <FaClock />
                        ) : isExpired ? (
                          <FaTimesCircle />
                        ) : (
                          <FaCheckCircle />
                        )}
                        {badgeLabel}
                      </PromotionBadge>
                      <PromotionMenuButton
                        type="button"
                        aria-label={`Opciones de ${promotion.name}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setMenuPromotionId(
                            menuPromotionId === promotion.id
                              ? null
                              : promotion.id,
                          );
                        }}
                      >
                        <FaEllipsisV />
                      </PromotionMenuButton>
                      {menuPromotionId === promotion.id && (
                        <div
                          className="promotion-card-menu"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => openModal("options", promotion)}
                          >
                            Ver detalles
                          </button>
                          {promotion.status && (
                            <button
                              type="button"
                              onClick={() => openModal("edit", promotion)}
                            >
                              Editar promoción
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              setDeleteAction("status");
                              openModal("delete", promotion);
                            }}
                          >
                            {promotion.status ? "Desactivar" : "Activar"}
                          </button>
                        </div>
                      )}
                    </PromotionImage>

                    <PromotionCardContent>
                      <h3>{promotion.name}</h3>
                      <p>{promotion.description}</p>
                      <PromotionCardFooter>
                        <strong>
                          ${promotion.price.toLocaleString("es-AR")}
                        </strong>
                        <span>
                          <FaCalendarAlt />{" "}
                          {isScheduled
                            ? `Desde ${start}`
                            : isExpired
                              ? "Finalizada"
                              : end
                                ? `Hasta ${end}`
                                : "Vigente"}
                        </span>
                      </PromotionCardFooter>
                    </PromotionCardContent>
                  </PromotionCard>
                );
              })
            )}
          </PromotionGrid>
        )}

        <ModalForm
          isOpen={modalOpen}
          title={getModalTitle()}
          description={getModalDescription()}
          icon={<FaPercent />}
          size={modalMode === "delete" ? "compact" : "default"}
          onClose={closeModal}
          footerActions={
            <>
              {modalMode === "options" && selectedPromotion && (
                <>
                  {selectedPromotion.status && (
                    <ActionButton
                      type="button"
                      onClick={() => setModalMode("edit")}
                    >
                      Modificar
                    </ActionButton>
                  )}
                  <StatusButton
                    className={selectedPromotion.status ? "active" : "inactive"}
                    type="button"
                    onClick={() => {
                      setDeleteAction("status");
                      setModalMode("delete");
                    }}
                  >
                    {selectedPromotion.status ? "Desactivar " : "Activar "}
                  </StatusButton>
                  <StatusButton
                    className="danger"
                    type="button"
                    disabled={deleting}
                    onClick={() => {
                      setDeleteAction("delete");
                      setModalMode("delete");
                    }}
                  >
                    Borrar
                  </StatusButton>
                </>
              )}

              {(modalMode === "create" || modalMode === "edit") && (
                <ActionButton type="submit" form="promotion-form">
                  {modalMode === "create" ? "Crear " : "Guardar"}
                </ActionButton>
              )}

              {modalMode === "delete" && selectedPromotion && (
                <StatusButton
                  className={
                    deleteAction === "delete"
                      ? "danger"
                      : selectedPromotion.status
                        ? "active"
                        : "inactive"
                  }
                  type="button"
                  disabled={deleting}
                  onClick={async () => {
                    if (deleteAction === "delete") {
                      await handleDeletePromotion();
                      return;
                    }
                    if (deleting) return;

                    try {
                      setDeleting(true);

                      const status = !selectedPromotion.status;

                      const updated = await updatePromotionStatusAPI(
                        selectedPromotion.id,
                        status,
                      );

                      dispatch(updatePromotion(updated));
                      setShowActive(status);

                      showAlert(
                        status
                          ? "Promoción activada correctamente"
                          : "Promoción desactivada correctamente",
                        "success",
                      );

                      closeModal();
                    } catch (updateError) {
                      console.error(
                        "Error actualizando promoción:",
                        updateError,
                      );

                      showAlert(
                        getApiErrorMessage(
                          updateError,
                          "No se pudo actualizar el estado de la promoción. Intentá nuevamente.",
                        ),
                        "error",
                      );
                    } finally {
                      setDeleting(false);
                    }
                  }}
                >
                  {deleting
                    ? "Procesando..."
                    : deleteAction === "delete"
                      ? "Eliminar "
                      : selectedPromotion.status
                        ? "Desactivar"
                        : "Activar"}
                </StatusButton>
              )}
            </>
          }
        >
          {modalMode === "options" && selectedPromotion && (
            <ModalPromotionOptions
              promotion={selectedPromotion}
              getProductName={getProductName}
            />
          )}

          {modalMode === "create" && (
            <ModalPromotionCreate
              onSuccess={async () => {
                await loadPromotions();
                closeModal();
              }}
            />
          )}

          {modalMode === "edit" && selectedPromotion && (
            <ModalPromotionEdit
              promotion={selectedPromotion}
              onSuccess={async () => {
                await loadPromotions();
                closeModal();
              }}
            />
          )}

          {modalMode === "delete" && selectedPromotion && (
            <ModalPromotionDelete
              promotion={selectedPromotion}
              mode={deleteAction}
            />
          )}
        </ModalForm>
      </ContainerManagePromotions>
    );
  },
);

ManagePromotions.displayName = "ManagePromotions";
export default ManagePromotions;
