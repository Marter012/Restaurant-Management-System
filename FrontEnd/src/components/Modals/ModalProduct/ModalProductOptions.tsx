import {
  FaCheckCircle,
  FaExclamationCircle,
  FaUtensils,
  FaTag,
  FaBoxes,
  FaThLarge,
  FaImage,
  FaHandPaper,
  FaAlignLeft,
} from "react-icons/fa";

import {
  ProductOptionsContainer,
  ProductMain,
  ProductImageWrapper,
  ProductImage,
  ProductImageOverlay,
  ProductInformation,
  ProductTitle,
  ProductBadges,
  ProductBadge,
  ProductDescriptionText,
  ProductMetrics,
  ProductMetric,
  MetricIcon,
  MetricInformation,
  MetricLabel,
  MetricValue,
  ProductDetailsGrid,
  ProductDetailCard,
  ProductDetailHeader,
  ProductDetailContent,
  ProductChipList,
  ProductChip,
  ProductDescriptionCard,
} from "./ModalProductStyles.ts";
import type { Product } from "../../../interfaces/Product.ts";

interface ModalProductOptionsProps {
  product: Product;
}

type ProductExtended = Product & {
  description?: string | null;
  ingredients?: string[] | string | null;
  garnish_options?: string[] | string | null;
  has_garnish?: boolean;
};

const parseOptions = (
  value: string[] | string | null | undefined,
): string[] => {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean);
  }

  try {
    const parsed: unknown = JSON.parse(value);

    if (Array.isArray(parsed)) {
      return parsed
        .filter((item): item is string => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const ModalProductOptions = ({ product }: ModalProductOptionsProps) => {
  const details = product as ProductExtended;

  const ingredients = parseOptions(details.ingredients);
  const garnishOptions = parseOptions(details.garnish_options);
  const hasStock = product.quantity > 0;

  return (
    <ProductOptionsContainer>
      <ProductMain>
        <ProductImageWrapper>
          <ProductImage
            src={product.image || "/images/Products.png"}
            alt={product.name}
            onError={(event) => {
              event.currentTarget.src = "/images/Products.png";
            }}
          />

          <ProductImageOverlay aria-hidden="true">
            <FaImage />
          </ProductImageOverlay>
        </ProductImageWrapper>

        <ProductInformation>
          <ProductTitle>{product.name}</ProductTitle>

          <ProductBadges>
            <ProductBadge variant="category">
              <FaUtensils />
              <span>{product.category || "Sin categoría"}</span>
            </ProductBadge>

            <ProductBadge variant={product.status ? "active" : "inactive"}>
              <FaCheckCircle />
              <span>{product.status ? "Activo" : "Inactivo"}</span>
            </ProductBadge>
          </ProductBadges>

          {details.description && (
            <ProductDescriptionText>
              {details.description}
            </ProductDescriptionText>
          )}

          <ProductMetrics>
            <ProductMetric>
              <MetricIcon>
                <FaTag />
              </MetricIcon>

              <MetricInformation>
                <MetricLabel>Precio de venta</MetricLabel>
                <MetricValue>
                  ${product.price.toLocaleString("es-AR")}
                </MetricValue>
              </MetricInformation>
            </ProductMetric>

            <ProductMetric>
              <MetricIcon>
                <FaBoxes />
              </MetricIcon>

              <MetricInformation>
                <MetricLabel>Stock disponible</MetricLabel>
                <MetricValue>
                  {product.quantity}{" "}
                  {product.quantity === 1 ? "unidad" : "unidades"}
                </MetricValue>
              </MetricInformation>
            </ProductMetric>

            <ProductMetric>
              <MetricIcon>
                <FaExclamationCircle />
              </MetricIcon>

              <MetricInformation>
                <MetricLabel>Disponibilidad</MetricLabel>
                <MetricValue $danger={!hasStock} $success={hasStock}>
                  {hasStock ? "Disponible" : "Sin stock"}
                </MetricValue>
              </MetricInformation>
            </ProductMetric>

            <ProductMetric>
              <MetricIcon>
                <FaThLarge />
              </MetricIcon>

              <MetricInformation>
                <MetricLabel>Categoría</MetricLabel>
                <MetricValue>{product.category || "Sin categoría"}</MetricValue>
              </MetricInformation>
            </ProductMetric>
          </ProductMetrics>
        </ProductInformation>
      </ProductMain>

      <ProductDetailsGrid>
        <ProductDetailCard>
          <ProductDetailHeader>
            <FaUtensils />
            <h3>Ingredientes</h3>
          </ProductDetailHeader>

          <ProductDetailContent>
            {ingredients.length > 0 ? (
              <ProductChipList>
                {ingredients.map((ingredient, index) => (
                  <ProductChip key={`${ingredient}-${index}`}>
                    {ingredient}
                  </ProductChip>
                ))}
              </ProductChipList>
            ) : (
              <span>Sin ingredientes cargados.</span>
            )}
          </ProductDetailContent>
        </ProductDetailCard>

        <ProductDetailCard>
          <ProductDetailHeader>
            <FaHandPaper />
            <h3>Guarniciones sin costo</h3>
          </ProductDetailHeader>

          <ProductDetailContent>
            {details.has_garnish && garnishOptions.length > 0 ? (
              <ProductChipList>
                {garnishOptions.map((garnish, index) => (
                  <ProductChip key={`${garnish}-${index}`}>
                    {garnish}
                  </ProductChip>
                ))}
              </ProductChipList>
            ) : (
              <span>Sin opciones configuradas.</span>
            )}
          </ProductDetailContent>
        </ProductDetailCard>

        <ProductDescriptionCard>
          <ProductDetailHeader>
            <FaAlignLeft />
            <h3>Descripción</h3>
          </ProductDetailHeader>

          <ProductDetailContent>
            {details.description || "Sin descripción cargada."}
          </ProductDetailContent>
        </ProductDescriptionCard>
      </ProductDetailsGrid>
    </ProductOptionsContainer>
  );
};

export default ModalProductOptions;
