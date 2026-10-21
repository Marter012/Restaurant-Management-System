import { useMemo, useState } from "react";

import type { ProductsForOrderProps } from "../../interfaces/Product";
import type { Product } from "../../interfaces/Product";
import type { Promotion } from "../../interfaces/Promotion";

import {
  ProductsSection,
  ProductsHeader,
  SearchInput,
  ProductGrid,
  ProductCard,
  ModalOverlay,
  PromotionModal,
  GarnishModal,
  CategorySelect,
} from "./ProductsForOrderStyles.ts";

import { QuantityControls } from "../CreateOrder/CreateOrderStyles.ts";

import { useSelector } from "react-redux";
import type { RootState } from "../../store/store.ts";

const ProductsForOrder = ({
  products,
  items,
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  addPromotion,
  allowOutOfStock = false,
}: ProductsForOrderProps) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [showPromotionInfo, setShowPromotionInfo] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [selectedGarnishProduct, setSelectedGarnishProduct] = useState<Product | null>(null);
  const [garnishChoice, setGarnishChoice] = useState("");

  const promotions = useSelector(
    (state: RootState) => state.promotion.promotions,
  );

  const categories = [
    "Todos",
    ...Array.from(new Set(products.map((product) => product.category))).sort(
      (a, b) => a.localeCompare(b, "es"),
    ),
    "Promociones",
  ];

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          (allowOutOfStock || product.quantity > 0) &&
          product.name.toLowerCase().includes(search.toLowerCase()) &&
          (category === "Todos" ||
            category === "Promociones" ||
            product.category === category),
      ),
    [products, search, category, allowOutOfStock],
  );

  const filteredPromotions = useMemo(
    () =>
      promotions.filter(
        (promotion) =>
          promotion.status &&
          promotion.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [promotions, search],
  );

  const handlePromotionClick = (promotion: Promotion) => {
    setSelectedPromotion(promotion);
    setShowPromotionInfo(true);
  };

  const confirmPromotion = () => {
    if (!selectedPromotion) return;
    addPromotion(selectedPromotion);
    setShowPromotionInfo(false);
    setSelectedPromotion(null);
  };

  const closePromotionModal = () => {
    setShowPromotionInfo(false);
    setSelectedPromotion(null);
  };

  const closeGarnishModal = () => {
    setSelectedGarnishProduct(null);
    setGarnishChoice("");
  };

  const confirmGarnish = () => {
    if (!selectedGarnishProduct || !garnishChoice) return;
    addProduct(selectedGarnishProduct, garnishChoice);
    closeGarnishModal();
  };

  const showPromotions = category === "Todos" || category === "Promociones";
  const showProducts = category !== "Promociones";

  return (
    <>
      <ProductsSection>
        <ProductsHeader>
          <h3>Productos</h3>
          <SearchInput
            type="text"
            placeholder="Buscar producto o promoción..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </ProductsHeader>

        <CategorySelect
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </CategorySelect>

        <ProductGrid>
          {showProducts &&
            filteredProducts.map((product) => {
              const productLines = items.filter((item) => item.product_id === product.id);
              const totalQuantity = productLines.reduce((sum, item) => sum + item.quantity, 0);
              const hasGarnishChoices = Boolean(product.has_garnish && product.garnish_options?.length);
              const openGarnishPicker = () => {
                setSelectedGarnishProduct(product);
                setGarnishChoice(product.garnish_options?.[0] ?? "");
              };

              return (
                <ProductCard key={product.id}>
                  <div className="product-info">
                    <div className="product-name">
                      <h4>{product.name}</h4>
                      <small>Stock: {product.quantity}</small>
                    </div>
                    <span className="product-price">
                      ${product.price.toLocaleString("es-AR")}
                    </span>
                  </div>

                  {hasGarnishChoices ? (
                    <>
                      <button
                        type="button"
                        disabled={!allowOutOfStock && totalQuantity >= product.quantity}
                        onClick={openGarnishPicker}
                      >
                        + ELEGIR GUARNICIÓN
                      </button>
                      {productLines.map((line) => (
                        <div
                          className="garnish-order-line"
                          key={`${product.id}-${line.garnish ?? "sin-guarnicion"}`}
                        >
                          <span>{line.garnish || "Sin guarnición"}</span>
                          <QuantityControls>
                            <button
                              type="button"
                              aria-label={`Quitar ${product.name}, ${line.garnish ?? "sin guarnición"}`}
                              onClick={() => decreaseQuantity(product.id, line.garnish)}
                            >−</button>
                            <strong>{line.quantity}</strong>
                            <button
                              type="button"
                              aria-label={`Agregar ${product.name}, ${line.garnish ?? "sin guarnición"}`}
                              disabled={!allowOutOfStock && totalQuantity >= product.quantity}
                              onClick={() => increaseQuantity(product.id, line.garnish)}
                            >+</button>
                          </QuantityControls>
                        </div>
                      ))}
                    </>
                  ) : totalQuantity === 0 ? (
                    <button
                      type="button"
                      disabled={!allowOutOfStock && product.quantity <= 0}
                      onClick={() => addProduct(product)}
                    >
                      + AGREGAR
                    </button>
                  ) : (
                    <QuantityControls>
                      <button type="button" onClick={() => decreaseQuantity(product.id)}>−</button>
                      <strong>{totalQuantity}</strong>
                      <button
                        type="button"
                        disabled={!allowOutOfStock && totalQuantity >= product.quantity}
                        onClick={() => increaseQuantity(product.id)}
                      >+</button>
                    </QuantityControls>
                  )}
                </ProductCard>
              );
            })}

          {showPromotions &&
            filteredPromotions.map((promotion) => (
              <ProductCard key={`promotion-${promotion.id}`}>
                <div className="product-info">
                  <div className="product-name">
                    <h4>🎁 {promotion.name}</h4>
                    <small>{promotion.description}</small>
                  </div>
                  <span className="product-price">
                    ${promotion.price.toLocaleString("es-AR")}
                  </span>
                </div>
                <button type="button" onClick={() => handlePromotionClick(promotion)}>
                  + AGREGAR PROMO
                </button>
              </ProductCard>
            ))}
        </ProductGrid>
      </ProductsSection>

      {showPromotionInfo && selectedPromotion && (
        <ModalOverlay>
          <PromotionModal>
            <h3>🎁 {selectedPromotion.name}</h3>
            <p>
              Esta promoción se aplica automáticamente al seleccionar los
              productos necesarios para completarla.
            </p>
            <button type="button" onClick={confirmPromotion}>Continuar</button>
            <button
              type="button"
              className="cancel-button"
              onClick={closePromotionModal}
            >
              Cancelar
            </button>
          </PromotionModal>
        </ModalOverlay>
      )}

      {selectedGarnishProduct && (
        <ModalOverlay onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeGarnishModal();
        }}>
          <GarnishModal
            role="dialog"
            aria-modal="true"
            aria-labelledby="garnish-modal-title"
          >
            <div className="garnish-modal-top">
              <div className="garnish-modal-icon" aria-hidden="true">🍽</div>
              <div className="garnish-modal-heading">
                <h3 id="garnish-modal-title">Elegí la guarnición</h3>
                <p className="garnish-modal-subtitle">
                  Seleccioná la opción que acompaña tu pedido.
                  <span className="garnish-product-name">{selectedGarnishProduct.name}</span>
                </p>
              </div>
            </div>

            <label className="garnish-field-label" htmlFor="garnish-choice">
              Guarnición incluida
            </label>
            <div className="garnish-select-wrap">
              <select
                id="garnish-choice"
                className="garnish-select"
                value={garnishChoice}
                onChange={(event) => setGarnishChoice(event.target.value)}
              >
                {selectedGarnishProduct.garnish_options?.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="garnish-modal-actions">
              <button
                type="button"
                className="garnish-cancel-button"
                onClick={closeGarnishModal}
              >Cancelar</button>
              <button
                type="button"
                className="garnish-confirm-button"
                disabled={!garnishChoice}
                onClick={confirmGarnish}
              >Agregar a la orden</button>
            </div>
          </GarnishModal>
        </ModalOverlay>
      )}
    </>
  );
};

export default ProductsForOrder;