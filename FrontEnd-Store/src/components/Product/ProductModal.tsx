import { useState } from "react";
import { FaCheck, FaPlus, FaTimes, FaUtensils } from "react-icons/fa";
import type { StoreProduct } from "../../types/store.ts";
import { money } from "../../utils/money.ts";
import { imageSource } from "../../utils/images.ts";
import {
  ModalOverlay,
  ProductDialog,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
  ProductSummary,
  DialogProductImage,
  ImageFallback,
  ProductInformation,
  ProductCategory,
  ProductName,
  ProductDescription,
  PriceRow,
  Price,
  OldPrice,
  FormSection,
  SectionHeading,
  SectionHint,
  OptionList,
  OptionRow,
  OptionInput,
  OptionText,
  OptionStatus,
  NoteInput,
  ModalFooter,
  AddButton,
} from "./ProductModalStyles.ts";

interface Props {
  product: StoreProduct | null;
  unavailableIngredients: string[];
  garnish: string;
  removedIngredients: string[];
  note: string;
  onGarnishChange: (value: string) => void;
  onNoteChange: (value: string) => void;
  onToggleIngredient: (value: string) => void;
  onClose: () => void;
  onAdd: () => void;
}

export const ProductModal = ({
  product,
  unavailableIngredients,
  garnish,
  removedIngredients,
  note,
  onGarnishChange,
  onNoteChange,
  onToggleIngredient,
  onClose,
  onAdd,
}: Props) => {
  if (!product) return null;

  const productImage = imageSource(product.image);

  return (
    <ModalOverlay
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <ProductDialog
        role="dialog"
        aria-modal="true"
        aria-label={`Personalizá ${product.name}`}
      >
        <ModalHeader>
          <div>
            <span>Tu pedido</span>
            <ModalTitle>Personalizá tu producto</ModalTitle>
          </div>
          <CloseButton type="button" onClick={onClose} aria-label="Cerrar">
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          <ProductSummary>
            {productImage ? (
              <DialogProductImage src={productImage} alt={product.name} />
            ) : (
              <ImageFallback aria-hidden="true">
                <FaUtensils />
              </ImageFallback>
            )}

            <ProductInformation>
              <ProductCategory>{product.category}</ProductCategory>
              <ProductName>{product.name}</ProductName>
              <ProductDescription>
                {product.description || "Elegí las opciones para tu pedido."}
              </ProductDescription>
              <PriceRow>
                <Price>{money(product.final_price)}</Price>
                {product.effective_discount_percentage > 0 && (
                  <OldPrice>{money(product.price)}</OldPrice>
                )}
              </PriceRow>
            </ProductInformation>
          </ProductSummary>

          {product.has_garnish && product.garnish_options.length > 0 && (
            <FormSection>
              <SectionHeading>Elegí una guarnición</SectionHeading>
              <SectionHint>Seleccioná la opción que acompaña tu pedido.</SectionHint>
              <OptionList>
                {product.garnish_options.map((option) => (
                  <OptionRow key={option} $selected={garnish === option}>
                    <OptionInput
                      type="radio"
                      name={`garnish-${product.id}`}
                      checked={garnish === option}
                      onChange={() => onGarnishChange(option)}
                    />
                    <OptionText>{option}</OptionText>
                    {garnish === option && <FaCheck aria-hidden="true" />}
                  </OptionRow>
                ))}
              </OptionList>
            </FormSection>
          )}

          {product.ingredients.length > 0 && (
            <FormSection>
              <SectionHeading>¿Querés quitar algún ingrediente?</SectionHeading>
              <SectionHint>
                Marcá los ingredientes que preferís excluir de tu producto.
              </SectionHint>
              <OptionList>
                {product.ingredients.map((ingredient) => {
                  const normalized = ingredient.toLocaleLowerCase("es");
                  const unavailable = unavailableIngredients.includes(normalized);
                  const selected = unavailable || removedIngredients.includes(normalized);

                  return (
                    <OptionRow key={ingredient} $selected={selected} $disabled={unavailable}>
                      <OptionInput
                        type="checkbox"
                        disabled={unavailable}
                        checked={selected}
                        onChange={() => onToggleIngredient(ingredient)}
                      />
                      <OptionText>{ingredient}</OptionText>
                      {unavailable && (
                        <OptionStatus>No disponible</OptionStatus>
                      )}
                    </OptionRow>
                  );
                })}
              </OptionList>
            </FormSection>
          )}

          <FormSection>
            <SectionHeading htmlFor="product-note">
              Indicaciones especiales
              <span>Opcional</span>
            </SectionHeading>
            <SectionHint>
              ¿Querés aclarar algo sobre la preparación?
            </SectionHint>
            <NoteInput
              id="product-note"
              value={note}
              onChange={(event) => onNoteChange(event.target.value)}
              maxLength={180}
              placeholder="Ej. bien cocido, poca salsa..."
            />
            <SectionHint $align="right">{note.length}/180</SectionHint>
          </FormSection>
        </ModalContent>

        <ModalFooter>
          <AddButton type="button" onClick={onAdd}>
            <FaPlus />
            <span>Agregar al pedido</span>
            <strong>{money(product.final_price)}</strong>
          </AddButton>
        </ModalFooter>
      </ProductDialog>
    </ModalOverlay>
  );
};
