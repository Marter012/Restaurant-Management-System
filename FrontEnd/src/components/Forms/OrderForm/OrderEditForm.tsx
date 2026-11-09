import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import type { FieldProps } from "formik";
import type { AppDispatch, RootState } from "../../../store/store.ts";
import type {
  IUpdateOrder,
  IOrder,
  OrderFormValues,
} from "../../../interfaces/Order.ts";
import { updateOrderAPI } from "../../../services/orderService.ts";
import { setOrders } from "../../../store/slices/orderSlice.ts";
import { getCashMovementsAPI } from "../../../services/cashMovementService.ts";
import { setCashMovements } from "../../../store/slices/cashMovementSlice.ts";
import {
  getOrderInitialValues,
  OrderSchema,
} from "../../Schemas/OrderSchema.tsx";
import {
  CombinedPayments,
  CombinedPaymentsHeading,
  CombinedPaymentRow,
  CustomerInput,
  DataSection,
  DataSectionHeading,
  DeliveryTimeRow,
  Error,
  FieldsGrid,
  ObservationField,
  OrderData,
  OrderFooter,
  OrderHeader,
  OrderItem,
  OrderItems,
  OrderOptionsColumn,
  OrderSection,
  OrderSummaryColumn,
  PaymentStatusSelect,
  SectionTitleSectionTitle,
  Select,
  SubtotalInfo,
  SubtotalRow,
  TotalInfo,
  TotalRow,
  TotalSection,
} from "./OrderFormStyles.ts";
import TimePicker from "../../TimePicker/TimePicker.tsx";
import { useAlert } from "../../context/AlertContext.tsx";
import { getAxiosErrorMessage } from "../../Utils/ErrorAxios.tsx";

const formatOrderMoney = (value: number) =>
  `$${value.toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function EditOrderContent({
  order,
  onSuccess,
  onSubmittingChange,
  readOnly = false,
}: {
  order: IOrder;
  onSuccess?: () => void;
  onSubmittingChange?: (value: boolean) => void;
  readOnly?: boolean;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector((state: RootState) => state.orders.orders);
  const products = useSelector((state: RootState) => state.products.products);

  const { showAlert } = useAlert();

  const handleSubmit = async (
    values: OrderFormValues,
    { setSubmitting }: { setSubmitting: (value: boolean) => void },
  ) => {
    if (readOnly) {
      setSubmitting(false);
      return;
    }

    onSubmittingChange?.(true);
    try {
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
        showAlert(
          "Agregá al menos un medio de pago para registrar un pago parcial.",
          "error",
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
          showAlert(
            "Cada medio de pago debe tener un importe mayor a cero.",
            "error",
          );
          setSubmitting(false);
          return;
        }
        if (
          values.status_payment === "paid" &&
          Math.abs(paymentsTotal - orderTotal) > 0.01
        ) {
          showAlert(
            "Para marcar la comanda como pagada, los medios de pago deben cubrir el total.",
            "error",
          );
          setSubmitting(false);
          return;
        }
        if (
          values.status_payment === "partially_paid" &&
          (paymentsTotal >= orderTotal || paymentsTotal <= 0)
        ) {
          showAlert(
            "El pago parcial debe ser mayor a cero y menor que el total de la comanda.",
            "error",
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
      } catch (error) {
        if (axios.isAxiosError(error))
          console.error(
            "Error actualizando movimientos de caja:",
            error.response?.data ?? error.message,
          );
        else
          console.error(
            "Error desconocido actualizando movimientos de caja:",
            error,
          );
      }
      showAlert("La comanda se actualizó correctamente.", "success");
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = getAxiosErrorMessage(error);
        showAlert(
          typeof message === "string"
            ? message
            : "Ocurrió un error al actualizar la comanda.",
          "error",
        );
      } else {
        console.error("Error desconocido:", error);
        showAlert("Ocurrió un error inesperado.", "error");
      }
    } finally {
      setSubmitting(false);
      onSubmittingChange?.(false);
    }
  };

  return (
    <Formik
      initialValues={getOrderInitialValues(order)}
      validationSchema={OrderSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => {
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

          const entered = Math.max(0, Number(raw) || 0);

          if (index === 0) {
            const otherPaymentsTotal = next
              .slice(1)
              .reduce(
                (sum, payment) =>
                  sum + Math.max(0, Number(payment.amount) || 0),
                0,
              );

            next[0] = {
              ...next[0],
              amount: Number(
                Math.min(
                  entered,
                  Math.max(0, total - otherPaymentsTotal),
                ).toFixed(2),
              ),
            };
          } else {
            const otherPaymentsTotal = next.reduce(
              (sum, payment, itemIndex) =>
                itemIndex === 0 || itemIndex === index
                  ? sum
                  : sum + Math.max(0, Number(payment.amount) || 0),
              0,
            );

            const amount = Math.min(
              entered,
              Math.max(0, total - otherPaymentsTotal),
            );

            next[index] = {
              ...next[index],
              amount: Number(amount.toFixed(2)),
            };

            const remainingPaymentsTotal = next
              .slice(1)
              .reduce(
                (sum, payment) =>
                  sum + Math.max(0, Number(payment.amount) || 0),
                0,
              );

            next[0] = {
              ...next[0],
              amount: Number(
                Math.max(0, total - remainingPaymentsTotal).toFixed(2),
              ),
            };
          }

          setFieldValue("payments", next);
        };

        const parentOrder = order.parent_order_id
          ? orders.find((candidate) => candidate.id === order.parent_order_id)
          : null;

        const displayOrderNumber =
          parentOrder?.order_number ?? order.order_number;

        return (
          <Form id="manage-order-form">
            <OrderSection>
              <OrderHeader>
                <div className="order-heading">
                  <h3>Detalles de la Comanda</h3>
                  <span>
                    N.º de Orden: #{String(displayOrderNumber).padStart(4, "0")}
                    {order.additional_number
                      ? `-${String(order.additional_number).padStart(2, "0")}`
                      : ""}
                  </span>
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
                    id="edit-order-observations"
                    name="observations"
                    placeholder="Especificaciones del pedido"
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
                  <span aria-hidden="true">◷</span>
                  Tiempo de entrega (opcional)
                </label>

                <Field name="delivery_time">
                  {({ field, form }: FieldProps<string>) => (
                    <TimePicker
                      id="edit-order-delivery-time"
                      name={field.name}
                      value={field.value || ""}
                      onChange={(value) =>
                        form.setFieldValue(field.name, value)
                      }
                      placeholder="--:--"
                      disabled={readOnly}
                      ariaLabel="Tiempo de entrega"
                    />
                  )}
                </Field>
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
            </OrderSection>
          </Form>
        );
      }}
    </Formik>
  );
}

export default function OrderEditForm({
  order,
  onSuccess,
  onSubmittingChange,
  readOnly = false,
}: {
  order: IOrder | null;
  onSuccess?: () => void;
  onSubmittingChange?: (value: boolean) => void;
  readOnly?: boolean;
}) {
  if (!order) {
    return (
      <OrderSection>
        <Error role="alert">
          No se encontró la comanda que se desea modificar.
        </Error>
      </OrderSection>
    );
  }

  return (
    <EditOrderContent
      order={order}
      onSuccess={onSuccess}
      onSubmittingChange={onSubmittingChange}
      readOnly={readOnly}
    />
  );
}
