import { useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import type { StoreProduct } from "../../types/store.ts";
import { money } from "../../utils/money.ts";
import { productImage, categoryImage } from "../../utils/images.ts";
import {
  AddButton,
  Card,
  DiscountBadge,
  ImageWrap,
  ProductBody,
  ProductCategory,
  ProductDescription,
  ProductImage,
  ProductImagePlaceholder,
  NoPhotoBadge,
  ProductName,
  Price,
  PriceRow,
  OldPrice,
  QuantityControl,
  QuantityButton,
  QuantityValue,
} from "./ProductCardStyles.ts";
import placeholderImage from "../../assets/product-placeholder.svg";

interface Props {
  product: StoreProduct;
  quantity: number;
  onSelect: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const ProductCard = ({
  product,
  quantity,
  onSelect,
  onIncrement,
  onDecrement,
}: Props) => {
  const [imageFailed, setImageFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);
  const originalImage = productImage(product);
  const hasUploadedImage = Boolean(product.image?.trim());
  const displayedImage = fallbackFailed ? placeholderImage : imageFailed || !hasUploadedImage ? categoryImage(product.category) : originalImage;
  const hasPhoto = hasUploadedImage && !imageFailed && !fallbackFailed;

  return (
    <Card>
      <ImageWrap>
        <ProductImage
          src={displayedImage}
          alt={hasPhoto ? product.name : "Plato con cubiertos - imagen ilustrativa"}
          loading="lazy"
          onError={() => { if (!imageFailed) setImageFailed(true); else setFallbackFailed(true); }}
        />
        {!hasPhoto && <><ProductImagePlaceholder aria-hidden="true" /><NoPhotoBadge>Imagen ilustrativa</NoPhotoBadge></>}
        
        {product.effective_discount_percentage > 0 && (
          <DiscountBadge>{product.effective_discount_percentage}% OFF</DiscountBadge>
        )}
      </ImageWrap>

      <ProductBody>
        <ProductCategory>{product.category || "Producto"}</ProductCategory>
        <ProductName>{product.name}</ProductName>
        <ProductDescription>
          {product.description ||
            (product.has_garnish
              ? "Personalizá tu pedido con las opciones disponibles."
              : "Preparado para disfrutar.")}
        </ProductDescription>

        <PriceRow>
          <Price>{money(product.final_price)}</Price>
          {product.effective_discount_percentage > 0 && (
            <OldPrice>{money(product.price)}</OldPrice>
          )}
        </PriceRow>

        {quantity > 0 ? (
          <QuantityControl aria-label={`Cantidad de ${product.name}`}>
            <QuantityButton
              type="button"
              onClick={onDecrement}
              aria-label={`Quitar una unidad de ${product.name}`}
            >
              <FaMinus />
            </QuantityButton>
            <QuantityValue aria-live="polite">{quantity}</QuantityValue>
            <QuantityButton
              type="button"
              onClick={onIncrement}
              aria-label={`Agregar otra unidad de ${product.name}`}
            >
              <FaPlus />
            </QuantityButton>
          </QuantityControl>
        ) : (
          <AddButton type="button" onClick={onSelect}>
            <FaPlus />
            <span>Elegir producto</span>
          </AddButton>
        )}
      </ProductBody>
    </Card>
  );
};
