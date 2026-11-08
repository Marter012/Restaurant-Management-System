import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import type { AppDispatch } from "../../../store/store.ts";
import type {
  IUpdateOrder,
  IOrder,
  OrderFormProps,
} from "../../../interfaces/Order.ts";
import { updateOrderAPI } from "../../../services/orderService.ts";
import { setOrders } from "../../../store/slices/orderSlice.ts";
import { getCashMovementsAPI } from "../../../services/cashMovementService.ts";
import { setCashMovements } from "../../../store/slices/cashMovementSlice.ts";
import {
  getOrderInitialValues,
  OrderSchema,
} from "../../Schemas/OrderSchema.tsx";
import { useEffect, useRef, useState } from "react";
import type { FieldProps } from "formik";

import {
  CombinedPayments,
  CombinedPaymentsHeading,
  CustomerInput,
  ObservationField,
  ObservationTextarea,
  DeliveryTimeRow,
  DataSectionHeading,
  DetailsNav,
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
  FieldsGrid,
  IngredientEditButton,
  IngredientModalHeading,
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
  SmallTextRemovedIngredients,
  SpanTextDiscount,
  SpanTextIngredientModalEyebrow,
  SpanTextOptionStatus,
  SubtotalInfo,
  SubtotalRow,
  TotalInfo,
  TotalRow,
  TotalSection,
  CombinedPaymentRow,
  DataSection,
} from "./OrderFormStyles.ts";
import type {
  OrderItemForm,
  OrderFormValues,
} from "../../../interfaces/Order.ts";
import type { Product } from "../../../interfaces/Product";
import type { RootState } from "../../../store/store.ts";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ModalForm from "../../ModalForm/ModalForm";
import OrderConfigurationModals from "../../Modals/ModalOrder/OrderConfigurationModals/OrderConfigurationModals.tsx";

interface CreateOrderProps {
  nextOrderNumber: number;
  orderNumberLabel?: string;
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
  unavailableIngredients: string[];
  isSubmitting: boolean;
  errors: string;
  appliedPromotions: {
    promotion: {
      id: string;
      name: string;
    };
    quantity: number;
    totalPrice: number;
  }[];
  setFieldValue: (field: string, value: unknown) => void;
}

function CreateOrderContent({
  nextOrderNumber,
  orderNumberLabel,
  values,
  subtotal,
  promotionDiscount,
  totalPrice,
  getProduct,
  increaseQuantity,
  decreaseQuantity,
  allowOutOfStock,
  unavailableIngredients,
  errors,
  appliedPromotions,
  setFieldValue,
}: CreateOrderProps) {
  const selectedDay = useSelector((state: RootState) => state.daySelected.day);
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

  useEffect(() => {
    const currentPayments = values.payments ?? [];
    if (currentPayments.length > 0) return;
    if (!values.method_payment || values.status_payment === "pending") return;
    if (values.status_payment === "cancelled") return;

    setFieldValue("payments", [
      {
        method_payment: values.method_payment,
        amount: values.status_payment === "paid" ? totalPrice : 0,
      },
    ]);
  }, [
    values.method_payment,
    values.status_payment,
    values.payments,
    totalPrice,
    setFieldValue,
  ]);

  const previousTotalPrice = useRef(totalPrice);
  useEffect(() => {
    if (previousTotalPrice.current === totalPrice) return;
    previousTotalPrice.current = totalPrice;

    const currentPayments = values.payments ?? [];
    if (!currentPayments.length) return;

    let remaining = Math.max(0, totalPrice);
    const adjustedPayments = currentPayments.map((payment) => {
      const amount = Math.min(
        Math.max(0, Number(payment.amount) || 0),
        remaining,
      );
      remaining = Math.max(0, remaining - amount);
      return { ...payment, amount: Number(amount.toFixed(2)) };
    });

    setFieldValue("payments", adjustedPayments);
  }, [totalPrice]);

  const updatePaymentAmount = (index: number, rawValue: string) => {
    const current = [...(values.payments ?? [])];
    if (!current.length) return;

    const otherPaymentsTotal = current.reduce(
      (sum, payment, itemIndex) =>
        sum +
        (itemIndex === index ? 0 : Math.max(0, Number(payment.amount) || 0)),
      0,
    );

    const available = Math.max(0, totalPrice - otherPaymentsTotal);
    const entered = Math.max(0, Number(rawValue) || 0);

    current[index] = {
      ...current[index],
      amount: Number(Math.min(entered, available).toFixed(2)),
    };

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
      <OrderHeader>
        <div className="order-heading">
          <h3>Detalles de la Comanda</h3>
          <span>{orderNumberLabel ?? `N.º de Orden: ${nextOrderNumber}`}</span>
        </div>
        <label htmlFor="new-order-customer">Cliente (opcional)</label>
        <Field
          as={CustomerInput}
          id="new-order-customer"
          name="customer_name"
          placeholder="Nombre del cliente"
          autoComplete="off"
        />
        <ObservationField>
          <label htmlFor="new-order-observations">
            Comentarios u observaciones
          </label>
          <Field
            as={ObservationTextarea}
            id="new-order-observations"
            name="observations"
            placeholder="Agregá aclaraciones para preparar o entregar la comanda..."
            maxLength={500}
            rows={3}
          />
          <ErrorMessage name="observations" component={Error} />
        </ObservationField>
      </OrderHeader>

      {/* Fila 2: productos y opciones, dos columnas */}
      <OrderSummaryColumn>
        <SectionTitleSectionTitle>
          Productos de la comanda
        </SectionTitleSectionTitle>

        <OrderItems>
          {values.items.length === 0 &&
          (values.extra_items ?? []).length === 0 ? (
            <p>No hay productos agregados a la comanda.</p>
          ) : (
            <>
              {/* PRODUCTOS NORMALES */}
              {values.items.map((item: OrderItemForm, itemIndex: number) => {
                const product = getProduct(item.product_id);

                if (!product) return null;

                return (
                  <OrderItem
                    key={`${item.product_id}-${item.garnish ?? "sin-guarnicion"}-${(item.removed_ingredients ?? []).join("|")}`}
                  >
                    <img
                      className="order-item-image"
                      src={product.image || "/images/Products.png"}
                      alt={product.name}
                    />

                    <div>
                      <h4>{product.name}</h4>

                      {item.garnish && (
                        <small>Guarnición: {item.garnish}</small>
                      )}

                      {(product.ingredients?.length ?? 0) > 0 && (
                        <IngredientSummary>
                          <small>
                            Ingredientes:{" "}
                            {(product.ingredients ?? [])
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
                              Sin: {(item.removed_ingredients ?? []).join(", ")}
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
                      )}

                      <span>
                        $
                        {(product.price * item.quantity).toLocaleString(
                          "es-AR",
                        )}
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
              })}

              {/* PRODUCTOS EXTRAS */}
              {(values.extra_items ?? []).map((extra, index) => (
                <OrderItem key={`extra-${index}`}>
                  <img
                    className="order-item-image"
                    src="/images/Products.png"
                    alt={extra.name}
                  />

                  <div>
                    <h4>{extra.name}</h4>
                    <small>Producto extra</small>

                    <span>
                      $
                      {(
                        Number(extra.price) * Number(extra.quantity)
                      ).toLocaleString("es-AR")}
                    </span>
                  </div>

                  <QuantityControls>
                    <button
                      type="button"
                      onClick={() => {
                        const updatedExtras = [...(values.extra_items ?? [])];
                        const newQuantity =
                          Number(updatedExtras[index].quantity) - 1;

                        if (newQuantity <= 0) {
                          updatedExtras.splice(index, 1);
                        } else {
                          updatedExtras[index] = {
                            ...updatedExtras[index],
                            quantity: newQuantity,
                          };
                        }

                        setFieldValue("extra_items", updatedExtras);
                      }}
                    >
                      −
                    </button>

                    <strong>{extra.quantity}</strong>

                    <button
                      type="button"
                      onClick={() => {
                        const updatedExtras = [...(values.extra_items ?? [])];

                        updatedExtras[index] = {
                          ...updatedExtras[index],
                          quantity: Number(updatedExtras[index].quantity) + 1,
                        };

                        setFieldValue("extra_items", updatedExtras);
                      }}
                    >
                      +
                    </button>
                  </QuantityControls>
                </OrderItem>
              ))}
            </>
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
                Estado del pago
                <Field name="status_payment">
                  {({ field }: FieldProps<string>) => (
                    <PaymentStatusSelect
                      {...field}
                      $status={field.value}
                      onChange={(event) => {
                        field.onChange(event);
                        if (event.target.value === "pending") {
                          setFieldValue("method_payment", "pending");
                          setFieldValue("payments", []);
                        } else if (event.target.value === "cancelled") {
                          setFieldValue("payments", []);
                        } else {
                          const method =
                            values.method_payment &&
                            values.method_payment !== "pending"
                              ? values.method_payment
                              : "cash";
                          setFieldValue("method_payment", method);
                          setFieldValue("payments", [
                            {
                              method_payment: method,
                              amount:
                                event.target.value === "paid" ? totalPrice : 0,
                            },
                          ]);
                        }
                      }}
                    >
                      <option value="pending">Pendiente</option>
                      <option value="partially_paid">Pago parcial</option>
                      <option value="paid">Pagado</option>
                    </PaymentStatusSelect>
                  )}
                </Field>
                <ErrorMessage name="status_payment" component="span" />
              </label>
              {(values.status_payment === "paid" ||
                values.status_payment === "partially_paid") && (
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
                    <option value="mercado_pago">Mercado Pago</option>
                  </Field>
                  <ErrorMessage
                    className="errorMessage"
                    name="method_payment"
                    component="span"
                  />
                </label>
              )}
            </FieldsGrid>

            {(values.status_payment === "paid" ||
              values.status_payment === "partially_paid") && (
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
                            amount:
                              values.status_payment === "paid" ? totalPrice : 0,
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
            )}

            {(values.status_payment === "paid" ||
              values.status_payment === "partially_paid") && (
              <div className="payment-summary">
                {(() => {
                  const paid = (values.payments ?? []).reduce(
                    (sum, payment) =>
                      sum + Math.max(0, Number(payment.amount) || 0),
                    0,
                  );
                  const balance = Math.max(0, totalPrice - paid);
                  return (
                    <>
                      <div>
                        <span>Total abonado</span>
                        <strong>${paid.toLocaleString("es-AR")}</strong>
                      </div>
                      <div>
                        <span>Saldo pendiente</span>
                        <strong>${balance.toLocaleString("es-AR")}</strong>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </DataSection>

          <OrderConfigurationModals
            isOpen={showDetailsModal}
            activeDetails={activeDetails}
            values={values}
            selectedDay={selectedDay}
            setFieldValue={setFieldValue}
            onClose={() => setShowDetailsModal(false)}
          />
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

      <DeliveryTimeRow>
        <label htmlFor="new-order-delivery-time">
          <span aria-hidden="true">◷</span>
          Tiempo de entrega (opcional)
        </label>
        <Field
          id="new-order-delivery-time"
          type="time"
          name="delivery_time"
        />
      </DeliveryTimeRow>

      {/* Totales, medios de pago y acción principal. */}
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
      </OrderFooter>
      {ingredientItemIndex !== null &&
        values.items[ingredientItemIndex] &&
        (() => {
          const selectedItem = values.items[ingredientItemIndex];
          const selectedProduct = getProduct(selectedItem.product_id);
          const ingredients = selectedProduct?.ingredients ?? [];

          if (!selectedProduct || ingredients.length === 0) return null;

          return (
            <ModalForm
              isOpen={true}
              title={`Ingredientes de ${selectedProduct.name}`}
              description="Marcá lo que querés quitar de esta línea de la comanda."
              onClose={() => setIngredientItemIndex(null)}
              size="small"
              scroll="active"
              footerActions={
                <IngredientSave
                  type="button"
                  onClick={() => {
                    setFieldValue(
                      "items",
                      values.items.map((item, index) =>
                        index === ingredientItemIndex
                          ? {
                              ...item,
                              removed_ingredients: Array.from(
                                new Set([
                                  ...ingredientDraft,
                                  ...ingredients.filter((ingredient) =>
                                    unavailableIngredients.some(
                                      (unavailable) =>
                                        unavailable
                                          .trim()
                                          .toLocaleLowerCase("es") ===
                                        ingredient
                                          .trim()
                                          .toLocaleLowerCase("es"),
                                    ),
                                  ),
                                ]),
                              ),
                            }
                          : item,
                      ),
                    );
                    setIngredientItemIndex(null);
                  }}
                >
                  Guardar personalización
                </IngredientSave>
              }
            >
              <IngredientModalHeading>
                <SpanTextIngredientModalEyebrow className="ingredient-modal-eyebrow">
                  PERSONALIZACIÓN
                </SpanTextIngredientModalEyebrow>
              </IngredientModalHeading>
              <IngredientOptionsList>
                {ingredients.map((ingredient) => {
                  const isUnavailable = unavailableIngredients.some(
                    (unavailable) =>
                      unavailable.trim().toLocaleLowerCase("es") ===
                      ingredient.trim().toLocaleLowerCase("es"),
                  );
                  return (
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
                        checked={
                          ingredientDraft.includes(ingredient) || isUnavailable
                        }
                        disabled={isUnavailable}
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
                        {isUnavailable
                          ? "No disponible"
                          : ingredientDraft.includes(ingredient)
                            ? "Se quitará"
                            : "Incluido"}
                      </small>
                    </label>
                  );
                })}
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
                          values.items[ingredientItemIndex] as OrderItemForm & {
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
                                        (_, extraIndex) => extraIndex !== index,
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
            </ModalForm>
          );
        })()}
    </OrderSection>
  );
}

const formatOrderMoney = (value: number) =>
  `$${value.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function EditOrderContent({
  order,
  onSuccess,
  readOnly = false,
}: {
  order: IOrder;
  onSuccess?: () => void;
  readOnly?: boolean;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const products = useSelector((state: RootState) => state.products.products);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (
    values: OrderFormValues,
    { setSubmitting }: { setSubmitting: (value: boolean) => void },
  ) => {
    if (readOnly) {
      setSubmitting(false);
      return;
    }
    try {
      setError(null);
      const isPending = values.status_payment === "pending";
      const isCancelled = values.status_payment === "cancelled";
      const payments =
        isPending || isCancelled
          ? []
          : (values.payments ?? []).map((payment) => ({
              method_payment: payment.method_payment,
              amount: Math.max(0, Number(payment.amount) || 0),
            }));
      const paymentsTotal = payments.reduce(
        (sum, payment) => sum + payment.amount,
        0,
      );
      const orderTotal = Number(order.total_price ?? 0);
      if (values.status_payment === "partially_paid" && payments.length === 0) {
        setError(
          "Agregá al menos un medio de pago para registrar un pago parcial.",
        );
        setSubmitting(false);
        return;
      }
      if (
        (values.status_payment === "paid" ||
          values.status_payment === "partially_paid") &&
        payments.length
      ) {
        if (payments.some((payment) => payment.amount <= 0)) {
          setError("Cada medio de pago debe tener un importe mayor a cero.");
          setSubmitting(false);
          return;
        }
        if (
          values.status_payment === "paid" &&
          Math.abs(paymentsTotal - orderTotal) > 0.01
        ) {
          setError(
            "Para marcar la comanda como pagada, los medios de pago deben cubrir el total.",
          );
          setSubmitting(false);
          return;
        }
        if (
          values.status_payment === "partially_paid" &&
          (paymentsTotal >= orderTotal || paymentsTotal <= 0)
        ) {
          setError(
            "El pago parcial debe ser mayor a cero y menor que el total de la comanda.",
          );
          setSubmitting(false);
          return;
        }
      }
      const updateData: IUpdateOrder = {
        order_number: values.order_number,
        customer_name: values.customer_name,
        observations: values.observations?.trim() ?? "",
        method_payment: isPending
          ? "pending"
          : (payments[0]?.method_payment ?? values.method_payment),
        status_payment: values.status_payment,
        delivery_time: values.delivery_time,
        cash_register_id: order.cash_register_id,
        status: values.status,
        payments,
      };
      const response = await updateOrderAPI(order.id, updateData);
      dispatch(
        setOrders(
          orders.map((item) => (item.id === order.id ? response : item)),
        ),
      );
      try {
        const movements = await getCashMovementsAPI();
        dispatch(setCashMovements(movements));
      } catch (movementError) {
        if (axios.isAxiosError(movementError))
          console.error(
            "Error actualizando movimientos de caja:",
            movementError.response?.data ?? movementError.message,
          );
        else
          console.error(
            "Error desconocido actualizando movimientos de caja:",
            movementError,
          );
      }
      onSuccess?.();
    } catch (submitError) {
      if (axios.isAxiosError(submitError)) {
        const message =
          submitError.response?.data?.detail ??
          submitError.response?.data?.message ??
          submitError.message ??
          "Ocurrió un error al actualizar la comanda.";
        setError(
          typeof message === "string"
            ? message
            : "Ocurrió un error al actualizar la comanda.",
        );
      } else {
        console.error("Error desconocido:", submitError);
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={getOrderInitialValues(order)}
      validationSchema={OrderSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue, isSubmitting }) => {
        const total = Number(order.total_price ?? 0);
        const pending = values.status_payment === "pending";
        const cancelled = values.status_payment === "cancelled";
        const payments = pending || cancelled ? [] : (values.payments ?? []);
        const paid = payments.reduce(
          (sum, payment) => sum + Math.max(0, Number(payment.amount) || 0),
          0,
        );
        const balance = total - paid;
        const changeStatus = (status: string) => {
          setFieldValue("status_payment", status);
          if (status === "pending") {
            setFieldValue("method_payment", "pending");
            setFieldValue("payments", []);
          } else if (status === "cancelled") setFieldValue("payments", []);
          else if (status === "paid" && !(values.payments ?? []).length) {
            setFieldValue("method_payment", "cash");
            setFieldValue("payments", [
              { method_payment: "cash", amount: total },
            ]);
          } else if (
            status === "partially_paid" &&
            !(values.payments ?? []).length
          ) {
            setFieldValue("method_payment", "cash");
            setFieldValue("payments", [
              {
                method_payment: "cash",
                amount: Number((total / 2).toFixed(2)),
              },
            ]);
          }
        };
        const changeAmount = (index: number, raw: string) => {
          const next = [...payments];
          if (!next.length) return;
          const balanceIndex = next.findIndex((_, i) => i !== index);
          const fixed = next.reduce(
            (sum, p, i) =>
              i === index || i === balanceIndex
                ? sum
                : sum + Math.max(0, Number(p.amount) || 0),
            0,
          );
          const amount = Math.min(
            Math.max(0, Number(raw) || 0),
            Math.max(0, total - fixed),
          );
          next[index] = { ...next[index], amount: Number(amount.toFixed(2)) };
          if (balanceIndex >= 0)
            next[balanceIndex] = {
              ...next[balanceIndex],
              amount: Number(Math.max(0, total - fixed - amount).toFixed(2)),
            };
          setFieldValue("payments", next);
        };
        return (
          <Form id="manage-order-form">
            <OrderSection>
              <OrderHeader>
                <div className="order-heading">
                  <h3>Detalles de la Comanda</h3>
                  <span>N.º de Orden: {values.order_number}</span>
                </div>
                <label htmlFor="edit-order-customer">Cliente (opcional)</label>
                <Field
                  as={CustomerInput}
                  id="edit-order-customer"
                  name="customer_name"
                  placeholder="Nombre del cliente"
                  disabled={readOnly}
                />
                <ObservationField>
                  <label htmlFor="edit-order-observations">
                    Comentarios u observaciones
                  </label>
                  <Field
                    as={ObservationTextarea}
                    id="edit-order-observations"
                    name="observations"
                    placeholder="Agregá aclaraciones para preparar o entregar la comanda..."
                    maxLength={500}
                    rows={3}
                    disabled={readOnly}
                  />
                  <ErrorMessage name="observations" component={Error} />
                </ObservationField>
              </OrderHeader>

              <OrderSummaryColumn>
                <SectionTitleSectionTitle>
                  Productos de la comanda
                </SectionTitleSectionTitle>
                <OrderItems>
                  {order.items?.length ? (
                    order.items.map((item, index) => {
                      const product = item.product_id
                        ? products.find(
                            (candidate) => candidate.id === item.product_id,
                          )
                        : undefined;
                      const isPromotion =
                        item.item_type === "promotion" ||
                        Boolean(item.promotion_id);
                      const itemTotal = Number(
                        item.subtotal ??
                          Number(item.unit_price ?? 0) *
                            Number(item.quantity ?? 1),
                      );
                      return (
                        <OrderItem key={item.id ?? index}>
                          <img
                            className="order-item-image"
                            src={product?.image || "/images/Products.png"}
                            alt={item.name || product?.name || "Producto"}
                          />
                          <div>
                            <h4>
                              {isPromotion
                                ? item.name || "Promoción"
                                : product?.name || item.name || "Producto"}
                            </h4>
                            {item.garnish && (
                              <small>Guarnición: {item.garnish}</small>
                            )}
                            {!!item.removed_ingredients?.length && (
                              <small>
                                Sin: {item.removed_ingredients.join(", ")}
                              </small>
                            )}
                            <span>{formatOrderMoney(itemTotal)}</span>
                          </div>
                          <strong>× {item.quantity}</strong>
                        </OrderItem>
                      );
                    })
                  ) : (
                    <p>Esta comanda no tiene productos registrados.</p>
                  )}
                </OrderItems>
                <p className="locked-note">
                  Los productos, cantidades, ingredientes y configuraciones se
                  mantienen sin modificaciones durante la edición.
                </p>
              </OrderSummaryColumn>

              <OrderOptionsColumn>
                <OrderData>
                  <DataSection>
                    <DataSectionHeading>
                      <strong>Estado y entrega</strong>
                    </DataSectionHeading>
                    <FieldsGrid>
                      <label>
                        N.º de comanda
                        <Field
                          as={CustomerInput}
                          name="order_number"
                          type="number"
                          disabled
                        />
                      </label>
                      <label>
                        Estado de pago
                        <Field
                          as={PaymentStatusSelect}
                          name="status_payment"
                          $status={values.status_payment}
                          disabled={readOnly}
                          onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>,
                          ) => changeStatus(event.target.value)}
                        >
                          <option value="pending">Pendiente</option>
                          <option value="partially_paid">Pago parcial</option>
                          <option value="paid">Pagada</option>
                          <option value="cancelled">Cancelada</option>
                        </Field>
                      </label>
                      <label>
                        Estado de la comanda
                        <Field name="status">
                          {({ field }: FieldProps<boolean>) => (
                            <Select
                              {...field}
                              value={String(field.value)}
                              disabled={readOnly}
                              onChange={(event) =>
                                setFieldValue(
                                  "status",
                                  event.target.value === "true",
                                )
                              }
                            >
                              <option value="true">Activa</option>
                              <option value="false">Inactiva</option>
                            </Select>
                          )}
                        </Field>
                      </label>
                    </FieldsGrid>
                  </DataSection>
                  <DataSection>
                    <DataSectionHeading>
                      <strong>Medios de pago</strong>
                    </DataSectionHeading>
                    {pending ? (
                      <p>
                        La comanda está pendiente. No tiene medios de pago
                        registrados.
                      </p>
                    ) : cancelled ? (
                      <p>
                        La comanda está cancelada. No se registran medios de
                        pago.
                      </p>
                    ) : (
                      <CombinedPayments>
                        <CombinedPaymentsHeading>
                          <span>Distribución de pagos</span>
                          {!readOnly && (
                            <button
                              type="button"
                              onClick={() =>
                                setFieldValue("payments", [
                                  ...payments,
                                  { method_payment: "cash", amount: 0 },
                                ])
                              }
                            >
                              ＋ Agregar medio
                            </button>
                          )}
                        </CombinedPaymentsHeading>
                        {payments.map((payment, index) => (
                          <CombinedPaymentRow key={`edit-payment-${index}`}>
                            <label>
                              Medio de pago
                              <select
                                value={payment.method_payment}
                                disabled={readOnly}
                                onChange={(event) => {
                                  const next = [...payments];
                                  next[index] = {
                                    ...next[index],
                                    method_payment: event.target.value,
                                  };
                                  setFieldValue("payments", next);
                                  if (index === 0)
                                    setFieldValue(
                                      "method_payment",
                                      event.target.value,
                                    );
                                }}
                              >
                                <option value="cash">Efectivo</option>
                                <option value="transfer">Transferencia</option>
                                <option value="qr">QR</option>
                                <option value="debit_card">Débito</option>
                                <option value="mercado_pago">
                                  Mercado Pago
                                </option>
                              </select>
                            </label>
                            <label>
                              Importe
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={payment.amount ?? 0}
                                disabled={readOnly}
                                onChange={(event) =>
                                  changeAmount(index, event.target.value)
                                }
                              />
                            </label>
                            {!readOnly && (
                              <button
                                type="button"
                                onClick={() => {
                                  const next = payments.filter(
                                    (_, i) => i !== index,
                                  );
                                  if (next.length === 1)
                                    next[0] = { ...next[0], amount: total };
                                  setFieldValue("payments", next);
                                }}
                              >
                                Quitar
                              </button>
                            )}
                          </CombinedPaymentRow>
                        ))}
                      </CombinedPayments>
                    )}
                    <div className="payment-summary">
                      <div>
                        <span>Total de la comanda</span>
                        <strong>{formatOrderMoney(total)}</strong>
                      </div>
                      <div>
                        <span>Total abonado</span>
                        <strong>{formatOrderMoney(paid)}</strong>
                      </div>
                      <div>
                        <span>Saldo pendiente</span>
                        <strong>
                          {formatOrderMoney(Math.max(0, balance))}
                        </strong>
                      </div>
                    </div>
                    {!pending && !cancelled && (
                      <Error
                        $paid={Math.abs(balance) < 0.01}
                        data-paid={Math.abs(balance) < 0.01 ? "true" : "false"}
                      >
                        {Math.abs(balance) < 0.01
                          ? "La comanda se encuentra completamente pagada."
                          : balance > 0
                            ? `Falta distribuir: ${formatOrderMoney(balance)}`
                            : `El importe supera el total en ${formatOrderMoney(Math.abs(balance))}`}
                      </Error>
                    )}
                  </DataSection>
                </OrderData>
              </OrderOptionsColumn>

              <DeliveryTimeRow>
                <label htmlFor="edit-order-delivery-time">
                  <span aria-hidden="true">◷</span>Tiempo de entrega (opcional)
                </label>
                <Field
                  id="edit-order-delivery-time"
                  type="time"
                  name="delivery_time"
                  disabled={readOnly}
                />
              </DeliveryTimeRow>
              <OrderFooter>
                <TotalSection>
                  <SubtotalRow>
                    <SubtotalInfo>
                      <span>Total registrado</span>
                      <strong>{formatOrderMoney(total)}</strong>
                    </SubtotalInfo>
                  </SubtotalRow>
                  <TotalRow>
                    <TotalInfo>
                      <strong>Total</strong>
                      <strong>{formatOrderMoney(total)}</strong>
                    </TotalInfo>
                  </TotalRow>
                </TotalSection>
              </OrderFooter>
              {error && <Error role="alert">{error}</Error>}
              {!readOnly && (
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando cambios..." : "Guardar cambios"}
                </button>
              )}
            </OrderSection>
          </Form>
        );
      }}
    </Formik>
  );
}

export type CreateOrderViewProps = {
  nextOrderNumber: number;
  orderNumberLabel?: string;
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
  unavailableIngredients: string[];
  isSubmitting: boolean;
  errors: string;
  appliedPromotions: {
    promotion: { id: string; name: string };
    quantity: number;
    totalPrice: number;
  }[];
  setFieldValue: (field: string, value: unknown) => void;
};

type UnifiedOrderFormProps = OrderFormProps & {
  createProps?: CreateOrderViewProps;
};

export default function OrderForm({
  mode = "edit",
  order,
  onSuccess,
  readOnly = false,
  createProps,
}: UnifiedOrderFormProps) {
  if (mode === "create")
    return createProps ? <CreateOrderContent {...createProps} /> : null;
  if (!order)
    return (
      <OrderSection>
        <Error role="alert">
          No se encontró la comanda que se desea modificar.
        </Error>
      </OrderSection>
    );
  return (
    <EditOrderContent order={order} onSuccess={onSuccess} readOnly={readOnly} />
  );
}
