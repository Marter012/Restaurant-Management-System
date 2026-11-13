import { useEffect, useMemo, useState } from "react";
import { FaBoxes, FaSearch, FaSave, FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";

import ModalForm from "../../components/ModalForm/ModalForm.tsx";
import type { AppDispatch } from "../../store/store.ts";
import { setProducts } from "../../store/slices/productSlice.ts";
import type { Product } from "../../interfaces/Product.ts";

import {
  BulkEditorContainer,
  BulkEditorToolbar,
  BulkEditorFooterSummary,
  BulkEditorFooterActions,
  BulkEditorButton,
  BulkEditorListTable,
  BulkEditorListRow,
} from "./BulkProductEditorStyles.ts";

import {
  getProductsAPI,
  updateProductsBulkApi,
} from "../../services/productService.ts";
import { useAlert } from "../context/AlertContext.tsx";
import { getProductFallbackImage, getProductImage } from "../Utils/productImage.ts";

type ProductDraft = { quantity: string; price: string };

interface BulkProductEditorProps {
  isOpen: boolean;
  products: Product[];
  categories: string[];
  onClose: () => void;
}

const BulkProductEditor = ({
  isOpen,
  products,
  categories,
  onClose,
}: BulkProductEditorProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [category, setCategory] = useState("Todas");
  const [search, setSearch] = useState("");
  const [drafts, setDrafts] = useState<Record<string, ProductDraft>>({});
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editStock, setEditStock] = useState(true);
  const [editPrices, setEditPrices] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const activeProducts = products.filter((product) => product.status);

    setDrafts(
      Object.fromEntries(
        activeProducts.map((product) => [
          product.id,
          {
            quantity: String(product.quantity),
            price: String(product.price),
          },
        ]),
      ),
    );

    setSelectedIds(activeProducts.map((product) => product.id));
    setCategory("Todas");
    setSearch("");
    setEditStock(true);
    setEditPrices(true);
    setError("");
  }, [isOpen, products]);

  const filteredProducts = useMemo(
    () =>
      products
        .filter((product) => product.status)
        .filter(
          (product) => category === "Todas" || product.category === category,
        )
        .filter((product) =>
          product.name
            .toLocaleLowerCase("es")
            .includes(search.trim().toLocaleLowerCase("es")),
        )
        .sort((a, b) =>
          a.name.localeCompare(b.name, "es", { sensitivity: "base" }),
        ),
    [products, category, search],
  );

  const { showAlert } = useAlert();

  const selectedProducts = filteredProducts.filter((product) =>
    selectedIds.includes(product.id),
  );

  const invalidProducts = selectedProducts.filter((product) => {
    const draft = drafts[product.id];
    if (!draft) return true;

    const quantity = Number(draft.quantity);
    const price = Number(draft.price);

    return (
      (editStock &&
        (draft.quantity.trim() === "" ||
          !Number.isInteger(quantity) ||
          quantity < 0)) ||
      (editPrices &&
        (draft.price.trim() === "" || !Number.isFinite(price) || price < 0))
    );
  });

  const changes = selectedProducts.flatMap((product) => {
    const draft = drafts[product.id];
    if (!draft) return [];

    const item: {
      product_id: string;
      quantity?: number;
      price?: number;
    } = { product_id: product.id };

    if (editStock && Number(draft.quantity) !== Number(product.quantity)) {
      item.quantity = Number(draft.quantity);
    }

    if (editPrices && Number(draft.price) !== Number(product.price)) {
      item.price = Number(draft.price);
    }

    return item.quantity !== undefined || item.price !== undefined
      ? [item]
      : [];
  });
  const updateDraft = (
    productId: string,
    field: keyof ProductDraft,
    value: string,
  ) => {
    setDrafts((previous) => ({
      ...previous,
      [productId]: { ...previous[productId], [field]: value },
    }));
  };

  const toggleProduct = (productId: string) => {
    setSelectedIds((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId],
    );
  };

  const saveChanges = async () => {
    if (!editStock && !editPrices) {
      setError("Activá al menos un tipo de modificación: stock o precio.");
      return;
    }

    if (selectedProducts.length === 0) {
      setError("Seleccioná al menos un producto para modificar.");
      return;
    }

    if (invalidProducts.length > 0) {
      setError(
        "Revisá los valores ingresados. El stock debe ser un número entero y los precios no pueden ser negativos.",
      );
      return;
    }

    if (changes.length === 0) {
      setError("No hay cambios pendientes para guardar.");
      return;
    }

    setSaving(true);
    setError("");

    try {
      await updateProductsBulkApi({ products: changes });

      const response = await getProductsAPI();

      dispatch(setProducts(response));

      showAlert("Los productos se actualizaron correctamente.", "success");

      onClose();
    } catch (error) {
      console.error("Error actualizando productos en lote:", error);

      showAlert(
        "No se pudieron guardar los cambios. Verificá tu conexión y tus permisos e intentá nuevamente.",
        "error",
      );
    } finally {
      setSaving(false);
    }
  };
  return (
    <ModalForm
      isOpen={isOpen}
      title="Actualización masiva"
      description="Elegí los productos y editá sus valores desde una única tabla."
      icon={<FaBoxes />}
      onClose={() => {
        if (!saving) onClose();
      }}
      size="default"
      scroll="active"
      footerActions={
        <BulkEditorFooterActions>
          <BulkEditorFooterSummary>
            <span className="summary-count">{selectedProducts.length}</span>
            <span>
              {selectedProducts.length === 1
                ? "producto seleccionado"
                : "productos seleccionados"}
            </span>
            {changes.length > 0 && (
              <span className="summary-changes">
                {changes.length} con cambios
              </span>
            )}
          </BulkEditorFooterSummary>

          <div className="footer-buttons">
            <BulkEditorButton
              type="button"
              disabled={
                saving ||
                selectedProducts.length === 0 ||
                invalidProducts.length > 0 ||
                changes.length === 0 ||
                (!editStock && !editPrices)
              }
              onClick={saveChanges}
            >
              <FaSave />
              {saving ? "Guardando..." : "Guardar cambios"}
            </BulkEditorButton>
          </div>
        </BulkEditorFooterActions>
      }
    >
      <BulkEditorContainer>
        <BulkEditorToolbar>
          <label className="category-control">
            <span>Categoría</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              disabled={saving}
            >
              <option value="Todas">Todas las categorías</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="search-control">
            <FaSearch aria-hidden="true" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nombre..."
              aria-label="Buscar producto"
              disabled={saving}
            />
          </label>

          <div className="edit-modes" aria-label="Campos a modificar">
            <span className="edit-modes-label">Modificar:</span>
            <label className={`mode-toggle ${editStock ? "is-active" : ""}`}>
              <input
                type="checkbox"
                checked={editStock}
                onChange={(event) => setEditStock(event.target.checked)}
                disabled={saving}
              />
              <span>Stock</span>
            </label>
            <label className={`mode-toggle ${editPrices ? "is-active" : ""}`}>
              <input
                type="checkbox"
                checked={editPrices}
                onChange={(event) => setEditPrices(event.target.checked)}
                disabled={saving}
              />
              <span>Precio</span>
            </label>
          </div>
        </BulkEditorToolbar>

        <BulkEditorListTable
          headers={[
            "Producto",
            "Stock actual",
            "Stock nuevo",
            "Precio actual",
            "Precio nuevo",
          ]}
        >
          {filteredProducts.length === 0 ? (
            <p className="bulk-empty">
              No se encontraron productos para este filtro.
            </p>
          ) : (
            filteredProducts.map((product) => {
              const selected = selectedIds.includes(product.id);
              const draft = drafts[product.id] ?? {
                quantity: String(product.quantity),
                price: String(product.price),
              };

              return (
                <BulkEditorListRow
                  key={product.id}
                  $columns={5}
                  className={selected ? "is-selected" : ""}
                >
                  <div className="bulk-product-cell">
                    <input
                      className="bulk-product-checkbox"
                      type="checkbox"
                      aria-label={`Incluir ${product.name}`}
                      checked={selected}
                      onChange={() => toggleProduct(product.id)}
                      disabled={saving}
                    />
                    <img
                      src={getProductImage(product.image, product.category)}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = getProductFallbackImage(
                          product.category,
                        );
                      }}
                      alt={product.name}
                    />
                    <div className="product-copy">
                      <strong title={product.name}>{product.name}</strong>
                      <span>{product.category}</span>
                    </div>
                  </div>

                  <div className="bulk-current-cell">
                    <span className="cell-value">
                      {Number(product.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>

                  <div className="bulk-value-cell">
                    <input
                      className="value-input"
                      aria-label={`Nuevo stock de ${product.name}`}
                      type="number"
                      min="0"
                      step="1"
                      value={draft.quantity}
                      disabled={saving || !selected || !editStock}
                      onChange={(event) =>
                        updateDraft(product.id, "quantity", event.target.value)
                      }
                    />
                  </div>

                  <div className="bulk-current-cell">
                    <span className="cell-value">
                      $ {Number(product.price).toLocaleString("es-AR")}
                    </span>
                  </div>

                  <div className="bulk-value-cell price-input-wrap">
                    <span>$</span>
                    <input
                      className="value-input"
                      aria-label={`Nuevo precio de ${product.name}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={draft.price}
                      disabled={saving || !selected || !editPrices}
                      onChange={(event) =>
                        updateDraft(product.id, "price", event.target.value)
                      }
                    />
                  </div>
                </BulkEditorListRow>
              );
            })
          )}
        </BulkEditorListTable>

        {error && (
          <p className="bulk-editor-error" role="alert">
            {error}
          </p>
        )}

        <div className="bulk-editor-hint">
          <FaCheckCircle aria-hidden="true" />
          <span>
            Los cambios se aplican únicamente a los productos seleccionados
            cuando presionás “Guardar cambios”.
          </span>
        </div>
      </BulkEditorContainer>
    </ModalForm>
  );
};

export default BulkProductEditor;
