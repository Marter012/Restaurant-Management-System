import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ErrorMessage, Field } from "formik";
import type { FieldProps } from "formik";
import { useSelector } from "react-redux";

import {
  AddExtraButton,
  CombinedPaymentRow,
  CombinedPayments,
  CombinedPaymentsHeading,
  CreateOrderButton,
  CustomerInput,
  DataSection,
  DataSectionHeading,
  DetailsModal,
  DetailsModalHeader,
  DetailsModalOverlay,
  DetailsNav,
  DetailsPanel,
  Error,
  ExtraIngredientRemoveButton,
  ExtraIngredientTag,
  ExtraIngredientsAddButton,
  ExtraIngredientsEmpty,
  ExtraIngredientsForm,
  ExtraIngredientsHeader,
  ExtraIngredientsInput,
  ExtraIngredientsList,
  ExtraIngredientsSection,
  ExtraItem,
  ExtraItemsList,
  FieldLabelExtraNameField,
  FieldsGrid,
  IngredientCancel,
  IngredientEditButton,
  IngredientModal,
  IngredientModalActions,
  IngredientModalHeading,
  IngredientModalOverlay,
  IngredientOptionsList,
  IngredientSave,
  IngredientSummary,
  OptionCard,
  OptionClear,
  OrderData,
  OrderFooter,
  OrderHeader,
  OrderItem,
  OrderItems,
  OrderOptionsColumn,
  OrderSection,
  OrderSummaryColumn,
  PaymentStatusSelect,
  PromotionRow,
  PromotionsDetails,
  PromotionsToggle,
  QuantityControls,
  SectionTitleSectionTitle,
  Select,
  SmallTextAddedIngredients,
  SmallTextDiscountHint,
  SmallTextRemovedIngredients,
  SpanTextDiscount,
  SpanTextIngredientModalEyebrow,
  SpanTextOptionStatus,
  StyledInputDateDisplay,
  SubtotalInfo,
  SubtotalRow,
  TimeInput,
  TotalInfo,
  TotalRow,
  TotalSection,
} from "./CreateOrderStyles";
import type { OrderItemForm, OrderFormValues } from "../../interfaces/Order.ts";
import type { Product } from "../../interfaces/Product";
import type { RootState } from "../../store/store.ts";
import type { AppliedPromotion } from "../NewOrder/NewOrder.tsx";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface CreateOrderProps {
  nextOrderNumber: number;
  values: OrderFormValues;
  subtotal: number;
  promotionDiscount: number;
  totalPrice: number;
  getProduct: (id: string) => Product | undefined;
  increaseQuantity: (
    id: string,
    garnish?: string,
    removedIngredients?: string[],
  ) => void;
  decreaseQuantity: (
    id: string,
    garnish?: string,
    removedIngredients?: string[],
  ) => void;
  allowOutOfStock: boolean;
  isSubmitting: boolean;
  errors: string;
  appliedPromotions: AppliedPromotion[];
  setFieldValue: (field: string, value: unknown) => void;
}

export default function CreateOrder({
  nextOrderNumber,
  values,
  subtotal,
  promotionDiscount,
  totalPrice,
  getProduct,
  increaseQuantity,
  decreaseQuantity,
  allowOutOfStock,
  isSubmitting,
  errors,
  appliedPromotions,
  setFieldValue,
}: CreateOrderProps) {
  const [showPromotions, setShowPromotions] = useState(false);
  const [ingredientItemIndex, setIngredientItemIndex] = useState<number | null>(
    null,
  );
  const [ingredientDraft, setIngredientDraft] = useState<string[]>([]);
  const [addedIngredientDraft, setAddedIngredientDraft] = useState("");
  const [activeDetails, setActiveDetails] = useState<
    "delivery" | "discount" | "extra"
  >("delivery");
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const selectedDay = useSelector((state: RootState) => state.daySelected.day);
  useEffect(() => {
    const currentPayments = values.payments ?? [];

    // Si ya existen medios de pago, no los sobrescribimos.
    if (currentPayments.length > 0) return;

    // Si todavía no se seleccionó un método, no hacemos nada.
    if (!values.method_payment) return;

    // Creamos automáticamente el primer medio de pago.
    setFieldValue("payments", [
      {
        method_payment: values.method_payment,
        amount: totalPrice,
      },
    ]);
  }, [values.method_payment, values.payments, totalPrice, setFieldValue]);
  const previousTotalPrice = useRef(totalPrice);
  useEffect(() => {
    if (previousTotalPrice.current !== totalPrice) {
      previousTotalPrice.current = totalPrice;
      const currentPayments = values.payments ?? [];
      if (currentPayments.length >= 2) {
        const lastIndex = currentPayments.length - 1;
        const othersTotal = currentPayments.reduce(
          (sum, payment, index) =>
            sum +
            (index === lastIndex
              ? 0
              : Math.max(0, Number(payment.amount) || 0)),
          0,
        );
        const updated = currentPayments.map((payment, index) =>
          index === lastIndex
            ? {
                ...payment,
                amount: Math.max(
                  0,
                  Number((totalPrice - othersTotal).toFixed(2)),
                ),
              }
            : payment,
        );
        setFieldValue("payments", updated);
      } else if (currentPayments.length === 1) {
        setFieldValue("payments", [
          { ...currentPayments[0], amount: totalPrice },
        ]);
      }
    }
  }, [totalPrice, values.payments, setFieldValue]);

  const updatePaymentAmount = (index: number, rawValue: string) => {
    const current = [...(values.payments ?? [])];

    if (!current.length) return;

    const balanceIndex = current.findIndex(
      (_, itemIndex) => itemIndex !== index,
    );

    // Permite escribir libremente mientras se edita el importe.
    const entered = Math.max(0, Number(rawValue) || 0);

    // Sumamos los importes de los otros medios, excepto el que
    // estamos editando y el que usaremos para ajustar la diferencia.
    const fixedOthersTotal = current.reduce((sum, payment, itemIndex) => {
      if (itemIndex === index || itemIndex === balanceIndex) {
        return sum;
      }

      return sum + Math.max(0, Number(payment.amount) || 0);
    }, 0);

    // El importe editado no puede superar el total disponible.
    const available = Math.max(0, totalPrice - fixedOthersTotal);
    const amount = Math.min(entered, available);

    current[index] = {
      ...current[index],
      amount: Number(amount.toFixed(2)),
    };

    // El otro medio se ajusta automáticamente con la diferencia.
    if (balanceIndex >= 0) {
      current[balanceIndex] = {
        ...current[balanceIndex],
        amount: Number(
          Math.max(0, totalPrice - fixedOthersTotal - amount).toFixed(2),
        ),
      };
    }

    setFieldValue("payments", current);
  };

  const promotionsQuantity = appliedPromotions.reduce(
    (total, promotion) => total + promotion.quantity,
    0,
  );

  // Configuración única de las tarjetas; las acciones originales se conservan.
  const optionCards = [
    {
      key: "delivery",
      label: "Entrega",
      configured: Boolean(values.delivery_time),
      status: values.delivery_time ? "Configurada" : "Opcional",
      ariaLabel: values.delivery_time
        ? "Entrega configurada"
        : "Configurar entrega",
      clearAriaLabel: "Quitar configuración de entrega",
      clearTitle: "Restablecer entrega",
      onClear: () => setFieldValue("delivery_time", ""),
      onClick: () => {
        setActiveDetails("delivery");
        setShowDetailsModal(true);
      },
    },
    {
      key: "discount",
      label: "Descuento",
      configured: Boolean(
        values.discount_type && Number(values.discount_value) > 0,
      ),
      status:
        values.discount_type && Number(values.discount_value) > 0
          ? "Aplicado"
          : "Opcional",
      ariaLabel:
        values.discount_type && Number(values.discount_value) > 0
          ? "Descuento configurado"
          : "Configurar descuento",
      clearAriaLabel: "Quitar descuento",
      clearTitle: "Quitar descuento",
      onClear: () => {
        setFieldValue("discount_type", "");
        setFieldValue("discount_value", 0);
      },
      onClick: () => {
        setActiveDetails("discount");
        setShowDetailsModal(true);
      },
    },
    {
      key: "extra",
      label: "Extra",
      configured: (values.extra_items ?? []).length > 0,
      status:
        (values.extra_items ?? []).length > 0
          ? `${(values.extra_items ?? []).length} agregado${(values.extra_items ?? []).length === 1 ? "" : "s"}`
          : "Opcional",
      ariaLabel:
        (values.extra_items ?? []).length > 0
          ? "Productos extra agregados"
          : "Agregar producto extra",
      clearAriaLabel: "Quitar todos los extras",
      clearTitle: "Quitar todos los extras",
      onClear: () => {
        setFieldValue("extra_items", []);
        setFieldValue("extra_name", "");
        setFieldValue("extra_price", 0);
        setFieldValue("extra_quantity", 1);
      },
      onClick: () => {
        setActiveDetails("extra");
        setShowDetailsModal(true);
      },
    },
  ];

  return (
    <OrderSection>
      {/* Fila 1: encabezado y cliente, ancho completo */}
      <OrderHeader>
        <h3>Nueva comanda</h3>
        <span>N.º {nextOrderNumber}</span>
        <Field
          as={CustomerInput}
          name="customer_name"
          placeholder="Nombre del cliente"
          autoComplete="off"
        />
      </OrderHeader>

      {/* Fila 2: productos y opciones, dos columnas */}
      <OrderSummaryColumn>
        <SectionTitleSectionTitle>
          Productos de la comanda
        </SectionTitleSectionTitle>

        <OrderItems>
          {values.items.length === 0 ? (
            <p>No hay productos agregados a la comanda.</p>
          ) : (
            values.items.map((item: OrderItemForm, itemIndex: number) => {
              const product = getProduct(item.product_id);

              if (!product) return null;

              return (
                <OrderItem
                  key={`${item.product_id}-${item.garnish ?? "sin-guarnicion"}-${(item.removed_ingredients ?? []).join("|")}`}
                >
                  <div>
                    <h4>{product.name}</h4>
                    {item.garnish && <small>Guarnición: {item.garnish}</small>}
                    {product.ingredients?.length ? (
                      <IngredientSummary>
                        <small>
                          Ingredientes:{" "}
                          {product.ingredients
                            .filter(
                              (ingredient) =>
                                !(item.removed_ingredients ?? []).includes(
                                  ingredient,
                                ),
                            )
                            .join(", ") || "Sin ingredientes"}
                        </small>
                        {(item.removed_ingredients ?? []).length > 0 && (
                          <SmallTextRemovedIngredients>
                            Sin: {item.removed_ingredients?.join(", ")}
                          </SmallTextRemovedIngredients>
                        )}
                        {(
                          (
                            item as OrderItemForm & {
                              added_ingredients?: string[];
                            }
                          ).added_ingredients ?? []
                        ).length > 0 && (
                          <SmallTextAddedIngredients>
                            Extra:{" "}
                            {(
                              item as OrderItemForm & {
                                added_ingredients?: string[];
                              }
                            ).added_ingredients?.join(", ")}
                          </SmallTextAddedIngredients>
                        )}
                        <IngredientEditButton
                          type="button"
                          onClick={() => {
                            setIngredientItemIndex(itemIndex);
                            setIngredientDraft([
                              ...(item.removed_ingredients ?? []),
                            ]);
                            setAddedIngredientDraft("");
                          }}
                        >
                          Personalizar ingredientes
                        </IngredientEditButton>
                      </IngredientSummary>
                    ) : null}
                    <span>
                      ${(product.price * item.quantity).toLocaleString("es-AR")}
                    </span>
                  </div>

                  <QuantityControls>
                    <button
                      type="button"
                      onClick={() =>
                        decreaseQuantity(
                          item.product_id,
                          item.garnish,
                          item.removed_ingredients ?? [],
                        )
                      }
                    >
                      −
                    </button>
                    <strong>{item.quantity}</strong>
                    <button
                      type="button"
                      onClick={() =>
                        increaseQuantity(
                          item.product_id,
                          item.garnish,
                          item.removed_ingredients ?? [],
                        )
                      }
                      disabled={
                        !allowOutOfStock &&
                        values.items
                          .filter(
                            (entry) => entry.product_id === item.product_id,
                          )
                          .reduce((sum, entry) => sum + entry.quantity, 0) >=
                          (getProduct(item.product_id)?.quantity ?? 0)
                      }
                    >
                      +
                    </button>
                  </QuantityControls>
                </OrderItem>
              );
            })
          )}
        </OrderItems>
      </OrderSummaryColumn>

      <OrderOptionsColumn>
        <OrderData>
          <DataSection>
            <DataSectionHeading>
              <strong>Tipo de pago</strong>
            </DataSectionHeading>
            <FieldsGrid>
              <label>
                Medio de pago
                <Field as={Select} name="method_payment">
                  <option value="" disabled>
                    Seleccionar 1
                  </option>
                  <option value="cash">Efectivo</option>
                  <option value="transfer">Transferencia</option>
                  <option value="debit_card">Débito</option>
                  <option value="qr">QR</option>
                </Field>
                <ErrorMessage
                  className="errorMessage"
                  name="method_payment"
                  component="span"
                />
              </label>
              <label>
                Estado del pago
                <Field name="status_payment">
                  {({ field }: FieldProps<string>) => (
                    <PaymentStatusSelect {...field} $status={field.value}>
                      <option value="pending">Pendiente</option>
                      <option value="paid">Pagado</option>
                    </PaymentStatusSelect>
                  )}
                </Field>
                <ErrorMessage name="status_payment" component="span" />
              </label>
            </FieldsGrid>

            <CombinedPayments>
              <CombinedPaymentsHeading>
                <span>Pago combinado</span>
                <button
                  type="button"
                  onClick={() => {
                    const current = values.payments ?? [];
                    if (current.length === 0) {
                      setFieldValue("payments", [
                        {
                          method_payment: values.method_payment || "cash",
                          amount: totalPrice,
                        },
                        { method_payment: "debit_card", amount: 0 },
                      ]);
                    } else {
                      setFieldValue("payments", [
                        ...current,
                        { method_payment: "cash", amount: 0 },
                      ]);
                    }
                  }}
                >
                  + Agregar medio
                </button>
              </CombinedPaymentsHeading>
              {(values.payments ?? []).map((_, index) => (
                <CombinedPaymentRow key={`payment-${index}`}>
                  <Field
                    as={Select}
                    aria-label={`Medio de pago ${index + 1}`}
                    name={`payments.${index}.method_payment`}
                  >
                    <option value="cash">Efectivo</option>
                    <option value="transfer">Transferencia</option>
                    <option value="qr">QR</option>
                    <option value="debit_card">Débito</option>
                    <option value="mercado_pago">Mercado Pago</option>
                  </Field>
                  <Field name={`payments.${index}.amount`}>
                    {({ field }: FieldProps<number>) => (
                      <input
                        {...field}
                        aria-label={`Importe del medio de pago ${index + 1}`}
                        type="number"
                        min="0"
                        max={totalPrice}
                        step="0.01"
                        placeholder="Importe"
                        value={field.value ?? 0}
                        onChange={(event) =>
                          updatePaymentAmount(index, event.target.value)
                        }
                      />
                    )}
                  </Field>
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue(
                        "payments",
                        values.payments?.filter(
                          (_, itemIndex) => itemIndex !== index,
                        ) ?? [],
                      )
                    }
                  >
                    Quitar
                  </button>
                </CombinedPaymentRow>
              ))}
            </CombinedPayments>
          </DataSection>

          {showDetailsModal &&
            createPortal(
              <DetailsModalOverlay
                role="presentation"
                onClick={() => setShowDetailsModal(false)}
              >
                <DetailsModal
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="details-modal-title"
                  onClick={(event) => event.stopPropagation()}
                >
                  <DetailsModalHeader>
                    <div>
                      <span>CONFIGURACIÓN DE COMANDA</span>
                      <h3 id="details-modal-title">
                        {activeDetails === "delivery"
                          ? "Entrega"
                          : activeDetails === "discount"
                            ? "Descuento"
                            : "Producto extra"}
                      </h3>
                    </div>
                    <button
                      type="button"
                      aria-label="Cerrar"
                      onClick={() => setShowDetailsModal(false)}
                    >
                      ×
                    </button>
                  </DetailsModalHeader>
                  <DetailsPanel>
                    {activeDetails === "discount" && (
                      <DataSection>
                        <FieldsGrid>
                          <label>
                            Tipo de descuento
                            <Field as={Select} name="discount_type">
                              <option value="">Sin descuento</option>
                              <option value="percent">Porcentaje</option>
                              <option value="amount">Importe fijo</option>
                            </Field>
                          </label>
                          {values.discount_type && (
                            <label>
                              {values.discount_type === "percent"
                                ? "Porcentaje a descontar"
                                : "Importe a descontar"}
                              <Field
                                name="discount_value"
                                type="number"
                                min="0"
                                max={
                                  values.discount_type === "percent"
                                    ? 100
                                    : undefined
                                }
                                placeholder="0"
                              />
                            </label>
                          )}
                        </FieldsGrid>
                        <SmallTextDiscountHint>
                          Se aplica sobre el total de la comanda.
                        </SmallTextDiscountHint>
                      </DataSection>
                    )}

                    {activeDetails === "extra" && (
                      <DataSection>
                        <FieldsGrid>
                          <FieldLabelExtraNameField>
                            Producto extra
                            <Field
                              name="extra_name"
                              type="text"
                              placeholder="Ej.: envío, producto especial"
                            />
                          </FieldLabelExtraNameField>
                          <label>
                            Precio extra
                            <Field
                              name="extra_price"
                              type="number"
                              min="0"
                              placeholder="$ 0"
                            />
                          </label>
                          <label>
                            Cantidad extra
                            <Field
                              name="extra_quantity"
                              type="number"
                              min="1"
                              placeholder="1"
                            />
                          </label>
                          <AddExtraButton
                            type="button"
                            disabled={!values.extra_name?.trim()}
                            onClick={() => {
                              const extra = {
                                name: values.extra_name!.trim(),
                                price: Number(values.extra_price ?? 0),
                                quantity: Number(values.extra_quantity ?? 1),
                              };
                              if (extra.price < 0 || extra.quantity < 1) return;
                              setFieldValue("extra_items", [
                                ...(values.extra_items ?? []),
                                extra,
                              ]);
                              setFieldValue("extra_name", "");
                              setFieldValue("extra_price", 0);
                              setFieldValue("extra_quantity", 1);
                            }}
                          >
                            + Agregar extra
                          </AddExtraButton>
                        </FieldsGrid>
                        {(values.extra_items ?? []).length > 0 && (
                          <ExtraItemsList>
                            {(values.extra_items ?? []).map((extra, index) => (
                              <ExtraItem key={`${extra.name}-${index}`}>
                                <span>
                                  {extra.name} ×{extra.quantity}
                                </span>
                                <strong>
                                  $
                                  {(
                                    extra.price * extra.quantity
                                  ).toLocaleString("es-AR")}
                                </strong>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setFieldValue(
                                      "extra_items",
                                      values.extra_items?.filter(
                                        (_, itemIndex) => itemIndex !== index,
                                      ) ?? [],
                                    )
                                  }
                                >
                                  Quitar
                                </button>
                              </ExtraItem>
                            ))}
                          </ExtraItemsList>
                        )}
                      </DataSection>
                    )}

                    {activeDetails === "delivery" && (
                      <DataSection>
                        <FieldsGrid>
                          <label>
                            Horario
                            <Field
                              as={TimeInput}
                              type="time"
                              name="delivery_time"
                            />
                            <ErrorMessage
                              name="delivery_time"
                              component="span"
                            />
                          </label>
                          <label>
                            Fecha
                            <StyledInputDateDisplay
                              value={selectedDay}
                              readOnly
                            />
                          </label>
                        </FieldsGrid>
                      </DataSection>
                    )}
                  </DetailsPanel>
                </DetailsModal>
              </DetailsModalOverlay>,
              document.querySelector(".create-order-form") ?? document.body,
            )}
        </OrderData>
        {errors && <Error>{errors}</Error>}
      </OrderOptionsColumn>

      {/* Opciones independientes: se generan desde una configuración única. */}
      <DetailsNav aria-label="Opciones de la comanda">
        {optionCards.map((option) => (
          <OptionCard
            key={option.key}
            className={`optionCard ${option.configured ? "is-modified" : ""}`}
          >
            {option.configured && (
              <OptionClear
                className="button-delete"
                aria-label={option.clearAriaLabel}
                title={option.clearTitle}
                onClick={option.onClear}
              >
                <IoIosCloseCircleOutline />
              </OptionClear>
            )}
            <button
              type="button"
              className={option.configured ? "has-value" : ""}
              aria-label={option.ariaLabel}
              onClick={option.onClick}
            >
              <SpanTextOptionStatus className="checkMobile" aria-hidden="true">
                {option.configured ? "✓" : "＋"}
              </SpanTextOptionStatus>
              <div className="containerInfo">
                <span>{option.label}</span>
                <small>{option.status}</small>
              </div>
            </button>
          </OptionCard>
        ))}
      </DetailsNav>

      {/* Fila 3: totales y acción, ancho completo */}
      <OrderFooter>
        <TotalSection>
          <SubtotalRow>
            <SubtotalInfo>
              <span>Subtotal</span>
              <strong>${subtotal.toLocaleString("es-AR")}</strong>
            </SubtotalInfo>
            {promotionDiscount > 0 && (
              <SpanTextDiscount>
                Descuento -${promotionDiscount.toLocaleString("es-AR")}
              </SpanTextDiscount>
            )}
          </SubtotalRow>

          <TotalRow>
            <TotalInfo>
              <strong>Total</strong>
              <strong>${totalPrice.toLocaleString("es-AR")}</strong>
            </TotalInfo>
            {appliedPromotions.length > 0 && (
              <PromotionsToggle
                type="button"
                onClick={() => setShowPromotions((previous) => !previous)}
              >
                🎁 {promotionsQuantity} promo
                {promotionsQuantity !== 1 ? "s" : ""}{" "}
                {showPromotions ? "▲" : "▼"}
              </PromotionsToggle>
            )}
          </TotalRow>

          {showPromotions && appliedPromotions.length > 0 && (
            <PromotionsDetails>
              {appliedPromotions.map((applied) => (
                <PromotionRow key={applied.promotion.id}>
                  <span>
                    🎁 {applied.promotion.name} ×{applied.quantity}
                  </span>
                  <strong>${applied.totalPrice.toLocaleString("es-AR")}</strong>
                </PromotionRow>
              ))}
            </PromotionsDetails>
          )}
        </TotalSection>

        <CreateOrderButton
          type="submit"
          disabled={
            isSubmitting ||
            (values.items.length === 0 &&
              (values.extra_items ?? []).length === 0)
          }
        >
          {isSubmitting ? "Creando comanda..." : "Crear comanda"}
        </CreateOrderButton>
      </OrderFooter>
      {ingredientItemIndex !== null &&
        values.items[ingredientItemIndex] &&
        (() => {
          const selectedItem = values.items[ingredientItemIndex];
          const selectedProduct = getProduct(selectedItem.product_id);
          if (!selectedProduct?.ingredients?.length) return null;
          return (
            <IngredientModalOverlay
              role="presentation"
              onClick={() => setIngredientItemIndex(null)}
            >
              <IngredientModal
                role="dialog"
                aria-modal="true"
                aria-labelledby="ingredient-modal-title"
                onClick={(event) => event.stopPropagation()}
              >
                <IngredientModalHeading>
                  <SpanTextIngredientModalEyebrow className="ingredient-modal-eyebrow">
                    PERSONALIZACIÓN
                  </SpanTextIngredientModalEyebrow>
                  <h3 id="ingredient-modal-title">
                    Ingredientes de {selectedProduct.name}
                  </h3>
                  <p>Marcá lo que querés quitar de esta línea de la comanda.</p>
                </IngredientModalHeading>
                <IngredientOptionsList>
                  {selectedProduct.ingredients.map((ingredient) => (
                    <label
                      key={ingredient}
                      className={
                        ingredientDraft.includes(ingredient)
                          ? "ingredient-option is-removed"
                          : "ingredient-option"
                      }
                    >
                      <input
                        type="checkbox"
                        checked={ingredientDraft.includes(ingredient)}
                        onChange={(event) =>
                          setIngredientDraft((current) =>
                            event.target.checked
                              ? [...current, ingredient]
                              : current.filter((item) => item !== ingredient),
                          )
                        }
                      />
                      <span>{ingredient}</span>
                      <small>
                        {ingredientDraft.includes(ingredient)
                          ? "Se quitará"
                          : "Incluido"}
                      </small>
                    </label>
                  ))}
                </IngredientOptionsList>
                <ExtraIngredientsSection>
                  <ExtraIngredientsHeader>
                    <div>
                      <h4>Agregar ingrediente extra</h4>
                      <p>
                        Escribí un ingrediente personalizado. No suma costo
                        automáticamente.
                      </p>
                    </div>
                  </ExtraIngredientsHeader>

                  <ExtraIngredientsForm>
                    <ExtraIngredientsInput
                      id="custom-added-ingredient"
                      type="text"
                      maxLength={80}
                      value={addedIngredientDraft}
                      onChange={(event) =>
                        setAddedIngredientDraft(event.target.value)
                      }
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                          const value = addedIngredientDraft.trim();
                          const current =
                            (
                              values.items[
                                ingredientItemIndex
                              ] as OrderItemForm & {
                                added_ingredients?: string[];
                              }
                            ).added_ingredients ?? [];

                          if (
                            !value ||
                            current.some(
                              (entry) =>
                                entry.toLocaleLowerCase("es") ===
                                value.toLocaleLowerCase("es"),
                            )
                          ) {
                            return;
                          }

                          setFieldValue(
                            "items",
                            values.items.map((item, index) =>
                              index === ingredientItemIndex
                                ? {
                                    ...item,
                                    added_ingredients: [...current, value],
                                  }
                                : item,
                            ),
                          );
                          setAddedIngredientDraft("");
                        }
                      }}
                      placeholder="Ej.: más cheddar"
                      aria-label="Nombre del ingrediente extra"
                    />
                    <ExtraIngredientsAddButton
                      type="button"
                      disabled={!addedIngredientDraft.trim()}
                      onClick={() => {
                        const value = addedIngredientDraft.trim();
                        const current =
                          (
                            values.items[
                              ingredientItemIndex
                            ] as OrderItemForm & {
                              added_ingredients?: string[];
                            }
                          ).added_ingredients ?? [];

                        if (
                          !value ||
                          current.some(
                            (entry) =>
                              entry.toLocaleLowerCase("es") ===
                              value.toLocaleLowerCase("es"),
                          )
                        ) {
                          return;
                        }

                        setFieldValue(
                          "items",
                          values.items.map((item, index) =>
                            index === ingredientItemIndex
                              ? {
                                  ...item,
                                  added_ingredients: [...current, value],
                                }
                              : item,
                          ),
                        );
                        setAddedIngredientDraft("");
                      }}
                    >
                      + Agregar
                    </ExtraIngredientsAddButton>
                  </ExtraIngredientsForm>

                  {(
                    (
                      values.items[ingredientItemIndex] as OrderItemForm & {
                        added_ingredients?: string[];
                      }
                    ).added_ingredients ?? []
                  ).length > 0 ? (
                    <ExtraIngredientsList>
                      {(
                        (
                          values.items[ingredientItemIndex] as OrderItemForm & {
                            added_ingredients?: string[];
                          }
                        ).added_ingredients ?? []
                      ).map((ingredient, index) => (
                        <ExtraIngredientTag key={`${ingredient}-${index}`}>
                          <span>{ingredient}</span>
                          <ExtraIngredientRemoveButton
                            type="button"
                            aria-label={`Quitar ${ingredient}`}
                            onClick={() => {
                              const current =
                                (
                                  values.items[
                                    ingredientItemIndex
                                  ] as OrderItemForm & {
                                    added_ingredients?: string[];
                                  }
                                ).added_ingredients ?? [];
                              setFieldValue(
                                "items",
                                values.items.map((item, itemIndex) =>
                                  itemIndex === ingredientItemIndex
                                    ? {
                                        ...item,
                                        added_ingredients: current.filter(
                                          (_, extraIndex) =>
                                            extraIndex !== index,
                                        ),
                                      }
                                    : item,
                                ),
                              );
                            }}
                          >
                            ×
                          </ExtraIngredientRemoveButton>
                        </ExtraIngredientTag>
                      ))}
                    </ExtraIngredientsList>
                  ) : (
                    <ExtraIngredientsEmpty>
                      Todavía no agregaste ingredientes extra.
                    </ExtraIngredientsEmpty>
                  )}
                </ExtraIngredientsSection>
                <IngredientModalActions>
                  <IngredientCancel
                    type="button"
                    onClick={() => setIngredientItemIndex(null)}
                  >
                    Cancelar
                  </IngredientCancel>
                  <IngredientSave
                    type="button"
                    onClick={() => {
                      setFieldValue(
                        "items",
                        values.items.map((item, index) =>
                          index === ingredientItemIndex
                            ? { ...item, removed_ingredients: ingredientDraft }
                            : item,
                        ),
                      );
                      setIngredientItemIndex(null);
                    }}
                  >
                    Guardar personalización
                  </IngredientSave>
                </IngredientModalActions>
              </IngredientModal>
            </IngredientModalOverlay>
          );
        })()}
    </OrderSection>
  );
}
