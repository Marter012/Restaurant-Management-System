import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPlus, FaBoxes, FaEdit, FaSearch, FaTimes } from "react-icons/fa";

import ListTable from "../../components/Tables/ListTable.tsx";

import {
  ContainerManageProducts,
  Filter,
  AddProductButton,
  ProductOptions,
  ProductInfo,
  ProductActions,
  ActionButton,
  CancelButton,
  StatusButton,
  BulkStockContainer,
  BulkStockToolbar,
  BulkStockSelect,
  BulkStockSummary,
  BulkStockList,
  BulkStockRow,
  BulkStockInput,
  BulkStockActions,
} from "./ManageProductsStyles.ts";

import type { AppDispatch, RootState } from "../../store/store.ts";

import { updateProduct, setProducts } from "../../store/slices/productSlice.ts";

import { updateProductStatusAPI } from "../../services/productService.ts";

import ModalForm from "../../components/ModalForm/ModalForm.tsx";

import type { Product } from "../../interfaces/Product.ts";

import ProductForm from "../Forms/ProductForm/ProductForm.tsx";

import StockForm from "../Forms/StockForm/StockForm.tsx";

import { TableButton, TableRow } from "../Tables/ListTableStyles.ts";


import usePrintAgent from "../../hooks/usePrintOrder.ts";
import { api } from "../../services/api.ts";
import { getMe } from "../../services/authService.ts";
import { buildProductsTicket } from "../Tickets/ProductsTicket.ts";
import ModalPrintFalse from "../ModalPrintFalse/ModalPrintFalse.tsx";

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

    const [deleteError, setDeleteError] = useState<string | null>(null);

    const [deleting, setDeleting] = useState(false);
    const [bulkOpen, setBulkOpen] = useState(false);
    const [bulkCategory, setBulkCategory] = useState("Todas");
    const [bulkStock, setBulkStock] = useState<Record<string, number>>({});
    const [bulkSaving, setBulkSaving] = useState(false);
    const [bulkError, setBulkError] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      void getMe()
        .then((user) => setIsAdmin(user.role === "admin"))
        .catch(() => setIsAdmin(false));
    }, []);

    const openBulkStock = () => {
      setBulkStock(
        Object.fromEntries(
          products.filter((p) => p.status).map((p) => [p.id, p.quantity]),
        ),
      );
      setBulkError("");
      setBulkCategory("Todas");
      setBulkOpen(true);
    };

    const bulkFilteredProducts = products
      .filter((product) => product.status)
      .filter(
        (product) =>
          bulkCategory === "Todas" || product.category === bulkCategory,
      )
      .sort((a, b) =>
        a.name.localeCompare(b.name, "es", { sensitivity: "base" }),
      );

    const saveBulkStock = async () => {
      setBulkSaving(true);
      setBulkError("");
      try {
        await api.put("/stockMovement/bulk/adjust", {
          products: bulkFilteredProducts.map((p) => ({
            product_id: p.id,
            quantity: Number(bulkStock[p.id] ?? 0),
          })),
        });
        const response = await api.get("/product/");
        dispatch(setProducts(response.data));
        setBulkOpen(false);
      } catch {
        setBulkError(
          "No se pudo guardar el stock. Verificá tus permisos e intentá de nuevo.",
        );
      } finally {
        setBulkSaving(false);
      }
    };

    const filteredProducts = products
      .filter((product) => {
        const matchesStatus = product.status === showActive;

        const matchesCategory =
          selectedCategory === "Todas" || product.category === selectedCategory;

        const matchesSearch = product.name
          .toLocaleLowerCase("es")
          .includes(productSearch.trim().toLocaleLowerCase("es"));

        return matchesStatus && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const categoryOrder = a.category.localeCompare(b.category, "es", {
          sensitivity: "base",
        });
        return (
          categoryOrder ||
          a.name.localeCompare(b.name, "es", { sensitivity: "base" })
        );
      });

    const openModal = (mode: ModalMode, product?: Product) => {
      setModalMode(mode);
      setSelectedProduct(product ?? null);
      setDeleteError(null);
      setModalOpen(true);
    };

    const closeModal = () => {
      setModalOpen(false);
      setSelectedProduct(null);
      setModalMode("options");
      setDeleteError(null);
      setDeleting(false);
    };

    const getModalTitle = () => {
      switch (modalMode) {
        case "create":
          return "Nuevo producto";

        case "edit":
          return "Editar producto";

        case "delete":
          return selectedProduct?.status
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

    const { printTicket, showPrinterModal, setShowPrinterModal } =
      usePrintAgent();

    const handlePrint = async (product: Product[]) => {
      const ticket = buildProductsTicket(product);

      await printTicket(ticket);
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
        <ModalPrintFalse show={showPrinterModal} setShow={setShowPrinterModal}/>

        <Filter>
          <button
            type="button"
            className={showActive ? "active" : ""}
            onClick={() => setShowActive(true)}
          >
            Activos
          </button>

          <button
            type="button"
            className={!showActive ? "active" : ""}
            onClick={() => setShowActive(false)}
          >
            Inactivos
          </button>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="Todas">Todas las categorías</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <label className="product-search">
            <FaSearch aria-hidden="true" />
            <input
              type="search"
              value={productSearch}
              onChange={(event) => setProductSearch(event.target.value)}
              placeholder="Buscar por nombre..."
              aria-label="Buscar producto por nombre"
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
          {isAdmin && (
            <button
              type="button"
              className="bulk-stock"
              onClick={openBulkStock}
            >
              Modificar stock
            </button>
          )}
        </Filter>

        {loading && <p>Cargando productos...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="products-table">
            <ListTable
              headers={["Nombre", "Stock", "Precio", "Categoría", "Acciones"]}
            >
              {filteredProducts.length === 0 && (
                <p>
                  {productSearch.trim()
                    ? `No se encontraron productos con “${productSearch.trim()}”.`
                    : selectedCategory !== "Todas"
                      ? `No hay productos en la categoría ${selectedCategory}.`
                      : showActive
                        ? "No hay productos activos."
                        : "No hay productos inactivos."}
                </p>
              )}
              {filteredProducts.map((product) => (
                <TableRow
                  $columns={5}
                  className="products-table-row"
                  key={product.id}
                  onClick={() => openModal("options", product)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="name">
                    <strong>{product.name}</strong>
                  </div>

                  <p className="stock">{product.quantity}</p>

                  <p className="price">
                    ${product.price.toLocaleString("es-AR")}
                  </p>

                  <div className="category">
                    <p>{product.category}</p>
                  </div>

                  <div className="actions">
                    {product.status === true && (
                      <TableButton
                        className="buttonstock"
                        type="button"
                        title="Modificar stock"
                        aria-label="Modificar stock"
                        onClick={(event) => {
                          event.stopPropagation();
                          openModal("updateQuantity", product);
                        }}
                      >
                        <FaBoxes />

                        <span className="button-text">Stock</span>
                      </TableButton>
                    )}

                    <TableButton
                      type="button"
                      title="Opciones"
                      aria-label="Opciones"
                      onClick={(event) => {
                        event.stopPropagation();
                        openModal("options", product);
                      }}
                      className={product.status ? "active" : "inactive"}
                    >
                      <span className="button-text">Editar</span>

                      <FaEdit />
                    </TableButton>
                  </div>
                </TableRow>
              ))}
            </ListTable>
          </div>
        )}

        <ModalForm
          isOpen={modalOpen}
          title={getModalTitle()}
          onClose={closeModal}
        >
          {modalMode === "options" && selectedProduct && (
            <ProductOptions>
                <h3>{selectedProduct.name}</h3>
              <ProductInfo>

                <div>
                  <span>Precio de venta</span>
                  <strong>
                    ${selectedProduct.price.toLocaleString("es-AR")}
                  </strong>
                </div>

                <div>
                  <span>Stock disponible</span>
                  <strong>{selectedProduct.quantity}</strong>
                </div>

                <div>
                  <span>Categoría</span>
                  <strong>{selectedProduct.category || "Sin categoría"}</strong>
                </div>

                {(() => {
                  const productDetails = selectedProduct as Product & {
                    ingredients?: string[] | string | null;
                    garnish_options?: string[] | string | null;
                    has_garnish?: boolean;
                  };

                  const ingredients = Array.isArray(productDetails.ingredients)
                    ? productDetails.ingredients.filter(Boolean)
                    : String(productDetails.ingredients ?? "")
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean);

                  const garnishOptions = Array.isArray(
                    productDetails.garnish_options,
                  )
                    ? productDetails.garnish_options.filter(Boolean)
                    : String(productDetails.garnish_options ?? "")
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean);

                  return (
                    <>
                      <div className="product-detail-list">
                        <span>Ingredientes</span>
                        {ingredients.length > 0 ? (
                          <strong>{ingredients.join(", ")}</strong>
                        ) : (
                          <strong>Sin ingredientes cargados</strong>
                        )}
                      </div>

                      {productDetails.has_garnish && (
                        <div className="product-detail-list">
                          <span>Guarnición sin costo</span>
                          {garnishOptions.length > 0 ? (
                            <strong>{garnishOptions.join(", ")}</strong>
                          ) : (
                            <strong>Sin opciones configuradas</strong>
                          )}
                        </div>
                      )}
                    </>
                  );
                })()}
              </ProductInfo>

              <ProductActions>
                <div>
                  {selectedProduct.status === true && (
                    <ActionButton
                      type="button"
                      onClick={() => setModalMode("edit")}
                    >
                      Modificar producto
                    </ActionButton>
                  )}

                  <StatusButton
                    className={selectedProduct.status ? "active" : "inactive"}
                    type="button"
                    onClick={() => {
                      setDeleteError(null);
                      setModalMode("delete");
                    }}
                  >
                    {selectedProduct.status
                      ? "Desactivar Producto"
                      : "Activar Producto"}
                  </StatusButton>
                </div>

                <CancelButton type="button" onClick={closeModal}>
                  Cancelar
                </CancelButton>
              </ProductActions>
            </ProductOptions>
          )}

          {modalMode === "create" && (
            <ProductForm
              categories={categories}
              mode="create"
              onSuccess={closeModal}
            />
          )}

          {modalMode === "edit" && selectedProduct && (
            <ProductForm
              mode="edit"
              product={selectedProduct}
              onSuccess={closeModal}
            />
          )}

          {modalMode === "updateQuantity" && selectedProduct && (
            <StockForm product={selectedProduct} onSuccess={closeModal} />
          )}

          {modalMode === "delete" && selectedProduct && (
            <ProductOptions>
              <ProductInfo>
                <h3>
                  {selectedProduct.status
                    ? "Desactivar producto"
                    : "Activar producto"}
                </h3>

                <p>
                  {selectedProduct.status
                    ? "¿Estás seguro de que desea desactivar este producto?"
                    : "¿Estás seguro de que desea activar este producto?"}
                </p>

                <strong>{selectedProduct.name}</strong>

                {deleteError && <p>{deleteError}</p>}
              </ProductInfo>

              <ProductActions>
                <StatusButton
                  className={selectedProduct.status ? "active" : "inactive"}
                  type="button"
                  disabled={deleting}
                  onClick={async () => {
                    try {
                      setDeleting(true);
                      setDeleteError(null);

                      const status = !selectedProduct.status;

                      await updateProductStatusAPI(selectedProduct.id, status);

                      dispatch(
                        updateProduct({
                          ...selectedProduct,
                          status,
                        }),
                      );

                      setShowActive(!selectedProduct.status);

                      closeModal();
                    } catch (error) {
                      console.error("Error actualizando producto:", error);

                      setDeleteError(
                        selectedProduct.status
                          ? "No se pudo desactivar el producto. Intentá nuevamente."
                          : "No se pudo activar el producto. Intentá nuevamente.",
                      );
                    } finally {
                      setDeleting(false);
                    }
                  }}
                >
                  {deleting
                    ? "Procesando..."
                    : selectedProduct.status
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
              </ProductActions>
            </ProductOptions>
          )}
        </ModalForm>

        <ModalForm
          isOpen={bulkOpen}
          title="Modificar stock de productos"
          onClose={() => setBulkOpen(false)}
        >
          <BulkStockContainer className="bulldetector">
            <div className="stockHeader">
              <BulkStockSummary aria-live="polite">
                {bulkFilteredProducts.length === 0
                  ? "No hay productos activos en esta categoría."
                  : `${bulkFilteredProducts.length} producto${bulkFilteredProducts.length === 1 ? "" : "s"} ${bulkCategory === "Todas" ? "activo" : `en ${bulkCategory}`} para modificar.`}
              </BulkStockSummary>
              <BulkStockToolbar>
                <BulkStockSelect
                  id="bulk-stock-category"
                  value={bulkCategory}
                  onChange={(event) => setBulkCategory(event.target.value)}
                  disabled={bulkSaving}
                >
                  <option value="Todas">Todas las categorías</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </BulkStockSelect>
              </BulkStockToolbar>
            </div>

            <BulkStockList>
              {bulkFilteredProducts.map((product) => (
                <BulkStockRow key={product.id}>
                  <div className="bulk-product-info">
                    <strong>{product.name}</strong>
                    <span>{product.category || "Sin categoría"}</span>
                  </div>
                  <label className="bulk-quantity">
                    <span>Stock</span>
                    <BulkStockInput
                      aria-label={`Stock de ${product.name}`}
                      type="number"
                      min="0"
                      value={bulkStock[product.id] ?? 0}
                      disabled={bulkSaving}
                      onChange={(event) =>
                        setBulkStock((previous) => ({
                          ...previous,
                          [product.id]: Math.max(0, Number(event.target.value)),
                        }))
                      }
                    />
                  </label>
                </BulkStockRow>
              ))}
            </BulkStockList>

            {bulkError && (
              <p className="bulk-error" role="alert">
                {bulkError}
              </p>
            )}

            <BulkStockActions>
              <CancelButton
                type="button"
                disabled={bulkSaving}
                onClick={() => setBulkOpen(false)}
              >
                Cancelar
              </CancelButton>
              <ActionButton
                type="button"
                disabled={bulkSaving || bulkFilteredProducts.length === 0}
                onClick={saveBulkStock}
              >
                {bulkSaving
                  ? "Guardando..."
                  : bulkCategory === "Todas"
                    ? "Guardar todos"
                    : `Guardar ${bulkFilteredProducts.length} producto${bulkFilteredProducts.length === 1 ? "" : "s"}`}
              </ActionButton>
            </BulkStockActions>
          </BulkStockContainer>
        </ModalForm>
      </ContainerManageProducts>
    );
  },
);

ManageProducts.displayName = "ManageProducts";

export default ManageProducts;
