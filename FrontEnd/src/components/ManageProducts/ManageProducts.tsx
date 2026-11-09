import { forwardRef, useImperativeHandle, useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {
  FaPlus,
  FaBoxes,
  FaSearch,
  FaTimes,
  FaTh,
  FaHamburger,
  FaPizzaSlice,
  FaBeer,
  FaIceCream,
  FaUtensils,
  FaEllipsisV,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import {
  ContainerManageProducts,
  Filter,
  AddProductButton,
} from "./ManageProductsStyles";

import type { AppDispatch, RootState } from "../../store/store";

import { setProducts, updateProduct } from "../../store/slices/productSlice";

import {
  deleteProductAPI,
  updateProductStatusAPI,
} from "../../services/productService";

import ModalForm from "../../components/ModalForm/ModalForm";

import type { Product } from "../../interfaces/Product";

import usePrintAgent from "../../hooks/usePrintOrder";

import { buildProductsTicket } from "../Tickets/ProductsTicket";

import ModalPrintFalse from "../ModalPrintFalse/ModalPrintFalse";

import BulkProductEditor from "./BulkProductEditor";
import ModalProductDelete from "../Modals/ModalProduct/ModalProductDelete.tsx";
import ModalProductCreate from "../Modals/ModalProduct/ModalProductCreate.tsx";
import ModalProductEdit from "../Modals/ModalProduct/ModalProductEdit.tsx";
import ModalProductStock from "../Modals/ModalProduct/ModalProductStock.tsx";
import ModalProductOptions from "../Modals/ModalProduct/ModalProductOptions.tsx";
import { ActionButton, StatusButton } from "../Utils/ButtonStyles.ts";
import { useAlert } from "../context/AlertContext.tsx";

type ModalMode = "options" | "edit" | "delete" | "create" | "updateQuantity";

export interface ManageProductsRef {
  openCreate: () => void;
  printProducts: () => void;
}

interface ManageProductsProps {
  showActive: boolean;
  setShowActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddProduct = ({ onClick }: { onClick: () => void }) => {
  return (
    <AddProductButton type="button" onClick={onClick}>
      <FaPlus />
      Nuevo producto
    </AddProductButton>
  );
};

export const PrintProducts = ({ onClick }: { onClick: () => void }) => {
  return (
    <AddProductButton type="button" onClick={onClick}>
      🖨️ Imprimir Productos
    </AddProductButton>
  );
};

const ManageProducts = forwardRef<ManageProductsRef, ManageProductsProps>(
  ({ showActive, setShowActive }, ref) => {
    const dispatch = useDispatch<AppDispatch>();

    const { products, loading, error } = useSelector(
      (state: RootState) => state.products,
    );

    const categories = Array.from(
      new Set(
        products.map((product) => product.category.trim()).filter(Boolean),
      ),
    ).sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));

    const [modalOpen, setModalOpen] = useState(false);

    const [modalMode, setModalMode] = useState<ModalMode>("options");

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
      null,
    );

    const [selectedCategory, setSelectedCategory] = useState("Todas");

    const [productSearch, setProductSearch] = useState("");

    const [stockFilter, setStockFilter] = useState("Todos");

    const [deleting, setDeleting] = useState(false);

    const [deleteAction, setDeleteAction] = useState<"delete" | "status">(
      "status",
    );

    const [bulkOpen, setBulkOpen] = useState(false);

    const [isAdmin, setIsAdmin] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
      void getMeAdmin();
    }, []);

    const getMeAdmin = async () => {
      try {
        const { getMe } = await import("../../services/authService");

        const user = await getMe();

        setIsAdmin(user.role === "admin");
      } catch {
        setIsAdmin(false);
      }
    };

    const { showAlert } = useAlert();

    const filteredProducts = products
      .filter((product) => {
        const matchesStatus = product.status === showActive;

        const matchesCategory =
          selectedCategory === "Todas" || product.category === selectedCategory;

        const normalizeSearch = (value: unknown): string =>
          String(value ?? "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLocaleLowerCase("es")
            .trim();

        const searchTerms = normalizeSearch(productSearch)
          .split(/\s+/)
          .filter(Boolean);

        const productData = product as Product & {
          description?: string;
          ingredients?: string[] | string;
          garnish_options?: string[] | string;
        };

        const searchableFields = [
          productData.name,
          productData.category,
          productData.description,
          productData.price,
          productData.price?.toLocaleString("es-AR"),
          productData.quantity,
          productData.ingredients,
          productData.garnish_options,
        ];

        const searchableText = normalizeSearch(
          searchableFields
            .map((value) =>
              Array.isArray(value) ? value.join(" ") : String(value ?? ""),
            )
            .join(" "),
        );

        const matchesSearch = searchTerms.every((term) =>
          searchableText.includes(term),
        );

        const matchesStock =
          stockFilter === "Todos" ||
          (stockFilter === "Disponible" && product.quantity > 0) ||
          (stockFilter === "Sin stock" && product.quantity <= 0);

        return (
          matchesStatus && matchesCategory && matchesSearch && matchesStock
        );
      })
      .sort((a, b) => {
        const categoryOrder = a.category.localeCompare(b.category, "es", {
          sensitivity: "base",
        });

        return (
          categoryOrder ||
          a.name.localeCompare(b.name, "es", {
            sensitivity: "base",
          })
        );
      });

    const categoryCounts = categories.map((category) => ({
      name: category,
      count: products.filter(
        (product) =>
          product.status === showActive && product.category === category,
      ).length,
    }));

    const getCategoryIcon = (category: string) => {
      const value = category.toLocaleLowerCase("es");

      if (value.includes("hamburg")) return <FaHamburger />;

      if (value.includes("pizza")) return <FaPizzaSlice />;

      if (
        value.includes("bebida") ||
        value.includes("agua") ||
        value.includes("gaseosa")
      ) {
        return <FaBeer />;
      }

      if (value.includes("postre") || value.includes("dulce")) {
        return <FaIceCream />;
      }

      if (value.includes("guarn") || value.includes("adicional")) {
        return <FaUtensils />;
      }

      return <FaUtensils />;
    };

    const openModal = (mode: ModalMode, product?: Product) => {
      setModalMode(mode);
      setSelectedProduct(product ?? null);
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
      setSelectedProduct(null);
      setModalMode("options");
      setDeleting(false);
    };

    const getModalTitle = () => {
      switch (modalMode) {
        case "create":
          return "Nuevo producto";

        case "edit":
          return "Editar producto";

        case "delete":
          return deleteAction === "delete"
            ? "Eliminar producto"
            : selectedProduct?.status
              ? "Desactivar producto"
              : "Activar producto";

        case "updateQuantity":
          return "Modificar stock";

        case "options":
          return "Opciones del producto";

        default:
          return "Producto";
      }
    };

    const getModalDescription = () => {
      switch (modalMode) {
        case "create":
          return "Completá la información para registrar un nuevo producto.";

        case "edit":
          return "Modificá la información del producto seleccionado.";

        case "delete":
          return deleteAction === "delete"
            ? "Confirmá si deseas eliminar este producto."
            : "Administrá el estado de disponibilidad del producto.";

        case "updateQuantity":
          return "Actualizá las unidades disponibles en el inventario.";

        case "options":
          return "Consultá y administrá la información del producto.";

        default:
          return "Administración de productos.";
      }
    };

    const { printTicket, showPrinterModal, setShowPrinterModal } =
      usePrintAgent();

    const handlePrint = async (productList: Product[]) => {
      const ticket = buildProductsTicket(productList);

      await printTicket(ticket);
    };

    const handleToggleStatus = async () => {
      if (!selectedProduct) return;

      try {
        setDeleting(true);

        const status = !selectedProduct.status;

        await updateProductStatusAPI(selectedProduct.id, status);

        dispatch(
          updateProduct({
            ...selectedProduct,
            status,
          }),
        );

        setShowActive(status);

        showAlert(
          status
            ? "Producto activado correctamente"
            : "Producto desactivado correctamente",
          "success",
        );

        closeModal();
      } catch (error) {
        console.error("Error actualizando producto:", error);

        showAlert(
          selectedProduct.status
            ? "No se pudo desactivar el producto. Intentá nuevamente."
            : "No se pudo activar el producto. Intentá nuevamente.",
          "error",
        );
      } finally {
        setDeleting(false);
      }
    };

    const handleDeleteProduct = async () => {
      if (!selectedProduct || deleting) return;

      try {
        setDeleting(true);

        await deleteProductAPI(selectedProduct.id);

        dispatch(
          setProducts(
            products.filter((product) => product.id !== selectedProduct.id),
          ),
        );

        showAlert("Producto eliminado correctamente", "success");

        closeModal();
      } catch (error) {
        console.error("Error eliminando producto:", error);

        const responseDetail = (
          error as { response?: { data?: { detail?: unknown } } }
        )?.response?.data?.detail;

        showAlert(
          typeof responseDetail === "string"
            ? responseDetail
            : "No se pudo eliminar el producto. Intentá nuevamente.",
          "error",
        );
      } finally {
        setDeleting(false);
      }
    };

    useImperativeHandle(
      ref,
      () => ({
        openCreate: () => {
          openModal("create");
        },

        printProducts: () => {
          handlePrint(products);
        },
      }),
      [products],
    );

    return (
      <ContainerManageProducts>
        <ModalPrintFalse
          show={showPrinterModal}
          setShow={setShowPrinterModal}
        />

        <Filter>
          <label className="product-search">
            <FaSearch aria-hidden="true" />

            <input
              type="text"
              value={productSearch}
              onChange={(event) => setProductSearch(event.target.value)}
              placeholder="Buscar producto"
              aria-label="Buscar producto"
            />

            {productSearch && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setProductSearch("")}
                aria-label="Limpiar búsqueda"
              >
                <FaTimes />
              </button>
            )}
          </label>

          <label className="select-filter">
            <span>Estado</span>

            <select
              value={showActive ? "Activos" : "Inactivos"}
              onChange={(event) =>
                setShowActive(event.target.value === "Activos")
              }
            >
              <option value="Activos">Activos</option>
              <option value="Inactivos">Inactivos</option>
            </select>
          </label>

          <label className="select-filter stock-filter">
            <span>Stock</span>

            <select
              value={stockFilter}
              onChange={(event) => setStockFilter(event.target.value)}
            >
              <option value="Todos">Todos</option>
              <option value="Disponible">Disponible</option>
              <option value="Sin stock">Sin stock</option>
            </select>
          </label>

          {isAdmin && (
            <button
              type="button"
              className="bulk-stock"
              onClick={() => setBulkOpen(true)}
            >
              Modificar productos
            </button>
          )}

          <button
            type="button"
            className="new-product"
            onClick={() => openModal("create")}
          >
            <FaPlus />
            Nuevo producto
          </button>

          <button
            type="button"
            className="print-products"
            onClick={() => handlePrint(products)}
          >
            🖨 Imprimir
          </button>
        </Filter>

        <div
          className="category-strip"
          role="tablist"
          aria-label="Acceso rápido a categorías"
        >
          <button
            type="button"
            className={selectedCategory === "Todas" ? "selected" : ""}
            onClick={() => setSelectedCategory("Todas")}
          >
            <FaTh />

            <span>Todos</span>

            <small>
              ({products.filter((p) => p.status === showActive).length})
            </small>
          </button>

          {categoryCounts.map(({ name, count }) => (
            <button
              type="button"
              key={`secondary-${name}`}
              className={selectedCategory === name ? "selected" : ""}
              onClick={() => setSelectedCategory(name)}
            >
              {getCategoryIcon(name)}

              <span>{name}</span>

              <small>({count})</small>
            </button>
          ))}
        </div>

        {loading && <p className="products-feedback">Cargando productos...</p>}

        {error && <p className="products-feedback error">{error}</p>}

        {!loading && !error && (
          <div className="product-catalog-grid">
            {filteredProducts.length === 0 ? (
              <div className="product-empty">
                {productSearch.trim()
                  ? `No se encontraron productos con “${productSearch.trim()}”.`
                  : showActive
                    ? "No hay productos activos."
                    : "No hay productos inactivos."}
              </div>
            ) : (
              filteredProducts.map((product) => {
                const description = String(
                  (
                    product as Product & {
                      description?: string;
                    }
                  ).description ?? "",
                ).trim();

                return (
                  <article
                    className="product-visual-card"
                    key={product.id}
                    onClick={() => openModal("options", product)}
                  >
                    <div className="product-visual-image">
                      <img
                        src={product.image || "/images/Products.png"}
                        alt={product.name}
                        onError={(event) => {
                          event.currentTarget.src = "/images/Products.png";
                        }}
                      />

                      <span
                        className={
                          product.quantity > 0
                            ? "stock-badge available"
                            : "stock-badge unavailable"
                        }
                      >
                        {product.quantity > 0 ? (
                          <>
                            <FaCheckCircle />
                            Disponible
                          </>
                        ) : (
                          <>
                            <FaExclamationCircle />
                            Sin stock
                          </>
                        )}
                      </span>

                      <button
                        type="button"
                        className="product-edit"
                        aria-label={`Editar ${product.name}`}
                        onClick={(event) => {
                          event.stopPropagation();

                          openModal("options", product);
                        }}
                      >
                        <FaEllipsisV />
                      </button>
                    </div>

                    <div className="product-visual-content">
                      <h3>{product.name}</h3>

                      <p className="product-description">
                        {description ||
                          product.category ||
                          "Producto de Boutique de Sabores"}
                      </p>

                      <div className="product-visual-footer">
                        <strong>
                          $ {product.price.toLocaleString("es-AR")}
                        </strong>

                        <span>
                          <FaBoxes />
                          Stock: {product.quantity}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        )}

        {/* MODALES */}

        <ModalForm
          isOpen={modalOpen}
          title={getModalTitle()}
          description={getModalDescription()}
          icon={<FaBoxes />}
          onClose={closeModal}
          size={modalMode === "delete" ? "compact" : "default"}
          footerActions={
            <>
              {modalMode === "options" && selectedProduct && (
                <>
                  {selectedProduct.status && (
                    <ActionButton
                      type="button"
                      onClick={() => setModalMode("edit")}
                    >
                      Modificar
                    </ActionButton>
                  )}

                  <ActionButton
                    type="button"
                    onClick={() => setModalMode("updateQuantity")}
                  >
                    <FaBoxes />
                    stock
                  </ActionButton>

                  <StatusButton
                    type="button"
                    className={selectedProduct.status ? "active" : "inactive"}
                    onClick={() => {
                      setDeleteAction("status");
                      setModalMode("delete");
                    }}
                  >
                    {selectedProduct.status ? "Desactivar " : "Activar "}
                  </StatusButton>
                </>
              )}

              {modalMode === "create" && (
                <ActionButton
                  type="submit"
                  form="manage-product-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creando..." : "Crear"}
                </ActionButton>
              )}

              {modalMode === "edit" && (
                <ActionButton
                  type="submit"
                  form="manage-product-form"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : "Guardar"}
                </ActionButton>
              )}

              {modalMode === "updateQuantity" && (
                <ActionButton type="submit" form="manage-stock-form">
                  <FaBoxes />
                  Actualizar
                </ActionButton>
              )}

              {modalMode === "delete" && selectedProduct && (
                <>
                  <StatusButton
                    type="button"
                    disabled={deleting}
                    onClick={
                      deleteAction === "delete"
                        ? handleDeleteProduct
                        : handleToggleStatus
                    }
                    className={
                      deleteAction === "delete"
                        ? "danger"
                        : selectedProduct.status
                          ? "active"
                          : "inactive"
                    }
                  >
                    {deleting
                      ? "Procesando..."
                      : deleteAction === "delete"
                        ? "Eliminar producto"
                        : selectedProduct.status
                          ? "Desactivar "
                          : "Activar "}
                  </StatusButton>
                  {deleteAction !== "delete" ? (
                    <StatusButton
                      type="button"
                      className="danger"
                      disabled={deleting}
                      onClick={() => {
                        setDeleteAction("delete");
                        setModalMode("delete");
                      }}
                    >
                      Borrar
                    </StatusButton>
                  ) : (
                    ""
                  )}
                </>
              )}
            </>
          }
        >
          {/* CONTENIDO DE LOS MODALES */}

          {modalMode === "options" && selectedProduct && (
            <ModalProductOptions product={selectedProduct} />
          )}

          {modalMode === "delete" && selectedProduct && (
            <ModalProductDelete product={selectedProduct} mode={deleteAction} />
          )}

          {modalMode === "create" && (
            <ModalProductCreate
              categories={categories}
              onSuccess={closeModal}
              onSubmittingChange={setIsSubmitting}
            />
          )}

          {modalMode === "edit" && selectedProduct && (
            <ModalProductEdit
              product={selectedProduct}
              categories={categories}
              onSuccess={closeModal}
              onSubmittingChange={setIsSubmitting}
            />
          )}

          {modalMode === "updateQuantity" && selectedProduct && (
            <ModalProductStock
              product={selectedProduct}
              onSuccess={closeModal}
            />
          )}
        </ModalForm>

        <BulkProductEditor
          isOpen={bulkOpen}
          products={products}
          categories={categories}
          onClose={() => setBulkOpen(false)}
        />
      </ContainerManageProducts>
    );
  },
);

ManageProducts.displayName = "ManageProducts";

export default ManageProducts;
