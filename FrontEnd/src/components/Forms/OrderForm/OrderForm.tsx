import { Formik, Form, Field, ErrorMessage } from "formik";
import type { FieldProps } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

import type { RootState, AppDispatch } from "../../../store/store.ts";

import type {
  IUpdateOrder,
  OrderFormProps,
  OrderFormValues,
} from "../../../interfaces/Order.ts";

import { updateOrderAPI } from "../../../services/orderService.ts";

import { setOrders } from "../../../store/slices/orderSlice.ts";

import {
  FormContainer,
  FormGroup,
  FormRow,
  Label,
  Input,
  Select,
  ErrorText,
  ProductsContainer,
  ProductRow,
  QuantityInput,
  FormActions,
  CancelButton,
  SubmitButton,
  AddPaymentButton,
  RemovePaymentButton,
  PaymentsSummary,
  PaymentSummaryRow,
  PaymentStatusText,
} from "./OrderFormStyles.ts";

import {
  getOrderInitialValues,
  OrderSchema,
} from "../../Schemas/OrderSchema.tsx";

import { getCashMovementsAPI } from "../../../services/cashMovementService.ts";
import { setCashMovements } from "../../../store/slices/cashMovementSlice.ts";

const OrderForm = ({ order, onSuccess }: OrderFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const orders = useSelector((state: RootState) => state.orders.orders);

  const products = useSelector((state: RootState) => state.products.products);

  const [error, setError] = useState<string | null>(null);

  if (!order) {
    return (
      <FormContainer>
        <ErrorText>No se encontró la comanda que se desea modificar.</ErrorText>
      </FormContainer>
    );
  }

  const handleSubmit = async (
    values: OrderFormValues,
    {
      setSubmitting,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
    },
  ) => {
    try {
      setError(null);

      const payments = (values.payments ?? []).map((payment) => ({
        method_payment: payment.method_payment,
        amount: Math.max(0, Number(payment.amount) || 0),
      }));
      const paymentsTotal = payments.reduce(
        (sum, payment) => sum + payment.amount,
        0,
      );
      if (values.status_payment === "paid" && payments.length > 0) {
        if (payments.some((payment) => payment.amount <= 0)) {
          setError("Cada medio de pago debe tener un importe mayor a cero.");
          setSubmitting(false);
          return;
        }
        if (Math.abs(paymentsTotal - Number(order.total_price ?? 0)) > 0.01) {
          setError(
            "La suma de los medios de pago debe coincidir con el total de la comanda.",
          );
          setSubmitting(false);
          return;
        }
      }

      const updateData: IUpdateOrder = {
        order_number: values.order_number,
        customer_name: values.customer_name,
        method_payment: payments[0]?.method_payment ?? values.method_payment,
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
        if (axios.isAxiosError(error)) {
          console.error(
            "Error actualizando movimientos de caja:",
            error.response?.data ?? error.message,
          );
        } else {
          console.error(
            "Error desconocido actualizando movimientos de caja:",
            error,
          );
        }
      }

      onSuccess?.();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.detail ??
          error.response?.data?.message ??
          error.message ??
          "Ocurrió un error al actualizar la comanda.";

        setError(
          typeof message === "string"
            ? message
            : "Ocurrió un error al actualizar la comanda.",
        );
      } else {
        console.error("Error desconocido:", error);

        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const activeProducts = products.filter((product) => product.status === true);

  return (
    <Formik
      initialValues={getOrderInitialValues(order)}
      validationSchema={OrderSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, values, setFieldValue }) => {
        const orderTotal = Number(order.total_price ?? 0);
        const currentPayments = values.payments ?? [];
        const paymentsTotal = currentPayments.reduce(
          (sum, payment) => sum + Math.max(0, Number(payment.amount) || 0),
          0,
        );
        const paymentDifference = orderTotal - paymentsTotal;

        // Reutiliza la lógica de Nueva comanda: el medio editado se limita al
        // saldo disponible y el otro medio ajusta automáticamente la diferencia.
        const updatePaymentAmount = (index: number, rawValue: string) => {
          const payments = [...(values.payments ?? [])];
          if (!payments.length) return;
          const balanceIndex = payments.findIndex(
            (_, itemIndex) => itemIndex !== index,
          );
          const entered = Math.max(0, Number(rawValue) || 0);
          const fixedOthersTotal = payments.reduce(
            (sum, payment, itemIndex) => {
              if (itemIndex === index || itemIndex === balanceIndex) return sum;
              return sum + Math.max(0, Number(payment.amount) || 0);
            },
            0,
          );
          const available = Math.max(0, orderTotal - fixedOthersTotal);
          const amount = Math.min(entered, available);
          payments[index] = {
            ...payments[index],
            amount: Number(amount.toFixed(2)),
          };
          if (balanceIndex >= 0) {
            payments[balanceIndex] = {
              ...payments[balanceIndex],
              amount: Number(
                Math.max(0, orderTotal - fixedOthersTotal - amount).toFixed(2),
              ),
            };
          }
          setFieldValue("payments", payments);
        };

        return (
          <Form>
            <FormContainer>
              {error && <ErrorText>{error}</ErrorText>}
              <div className="containerInfo">
                <FormGroup>
                  <Label htmlFor="order_number">Número de comanda</Label>

                  <Field
                    as={Input}
                    id="order_number"
                    name="order_number"
                    type="number"
                    disabled
                  />

                  <ErrorMessage name="order_number" component={ErrorText} />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="customer_name">Nombre del cliente</Label>

                  <Field
                    as={Input}
                    id="customer_name"
                    name="customer_name"
                    placeholder="Opcional"
                  />

                  <ErrorMessage name="customer_name" component={ErrorText} />
                </FormGroup>

                <FormRow>
                  <FormGroup>
                    <Label htmlFor="method_payment">Método de pago</Label>

                    <Field name="method_payment">
                      {({ field }: FieldProps<string>) => (
                        <Select
                          {...field}
                          id="method_payment"
                          onChange={(event) => {
                            field.onChange(event);
                            const payments = values.payments ?? [];
                            if (payments.length <= 1) {
                              setFieldValue("payments", [
                                {
                                  method_payment: event.target.value,
                                  amount: orderTotal,
                                },
                              ]);
                            }
                          }}
                        >
                          <option value="cash">Efectivo</option>
                          <option value="transfer">Transferencia</option>
                          <option value="qr">QR</option>
                          <option value="debit_card">Débito</option>
                          <option value="mercado_pago">Mercado Pago</option>
                        </Select>
                      )}
                    </Field>

                    <ErrorMessage name="method_payment" component={ErrorText} />
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="status_payment">Estado del pago</Label>

                    <Field
                      as={Select}
                      id="status_payment"
                      name="status_payment"
                    >
                      <option value="pending">Pendiente</option>
                      <option value="paid">Pagado</option>
                      <option value="cancelled">Cancelado</option>
                    </Field>

                    <ErrorMessage name="status_payment" component={ErrorText} />
                  </FormGroup>
                </FormRow>

                <FormGroup>
                  <Label>
                    Medios de pago de la comanda (Total: $
                    {orderTotal.toLocaleString("es-AR")})
                  </Label>

                  {currentPayments.map((payment, index) => (
                    <FormRow key={`edit-payment-${index}`}>
                      <FormGroup>
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
                      </FormGroup>

                      <FormGroup>
                        <Input
                          aria-label={`Importe del medio de pago ${index + 1}`}
                          name={`payments.${index}.amount`}
                          type="number"
                          min="0"
                          step="0.01"
                          value={payment.amount ?? 0}
                          onChange={(event) =>
                            updatePaymentAmount(index, event.target.value)
                          }
                        />
                      </FormGroup>

                      <RemovePaymentButton
                        type="button"
                        onClick={() => {
                          const remainingPayments = currentPayments.filter(
                            (_, paymentIndex) => paymentIndex !== index,
                          );
                          if (remainingPayments.length === 1) {
                            remainingPayments[0] = {
                              ...remainingPayments[0],
                              amount: orderTotal,
                            };
                          }
                          setFieldValue("payments", remainingPayments);
                        }}
                      >
                        Quitar
                      </RemovePaymentButton>
                    </FormRow>
                  ))}

                  <AddPaymentButton
                    type="button"
                    onClick={() => {
                      const payments = values.payments ?? [];
                      if (payments.length === 0) {
                        setFieldValue("payments", [
                          {
                            method_payment: values.method_payment || "cash",
                            amount: orderTotal,
                          },
                          { method_payment: "debit_card", amount: 0 },
                        ]);
                      } else {
                        setFieldValue("payments", [
                          ...payments,
                          { method_payment: "cash", amount: 0 },
                        ]);
                      }
                    }}
                  >
                    + Agregar medio de pago
                  </AddPaymentButton>

                  <PaymentsSummary>
                    <PaymentSummaryRow>
                      <span>Total de la comanda</span>
                      <strong>${orderTotal.toLocaleString("es-AR")}</strong>
                    </PaymentSummaryRow>
                    <PaymentSummaryRow>
                      <span>Total distribuido</span>
                      <strong>${paymentsTotal.toLocaleString("es-AR")}</strong>
                    </PaymentSummaryRow>
                    <PaymentStatusText
                      $balanced={Math.abs(paymentDifference) < 0.01}
                    >
                      {Math.abs(paymentDifference) < 0.01
                        ? "La suma coincide con el total."
                        : paymentDifference > 0
                          ? `Falta distribuir: $${paymentDifference.toLocaleString("es-AR")}`
                          : `El importe supera el total en $${Math.abs(paymentDifference).toLocaleString("es-AR")}`}
                    </PaymentStatusText>
                  </PaymentsSummary>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="delivery_time">Horario de entrega</Label>

                  <Field
                    as={Input}
                    id="delivery_time"
                    name="delivery_time"
                    type="time"
                  />

                  <ErrorMessage name="delivery_time" component={ErrorText} />
                </FormGroup>

                <ProductsContainer>
                  <Label>Productos</Label>

                  {order.items?.map((item, index) => {
                    const isPromotion =
                      item.item_type === "promotion" || !!item.promotion_id;

                    const product = item.product_id
                      ? activeProducts.find(
                          (product) => product.id === item.product_id,
                        )
                      : undefined;
                    return (
                      <ProductRow key={item.id ?? index}>
                        <FormGroup>
                          <Label>
                            {isPromotion ? "Promoción" : "Producto"}
                          </Label>

                          <Input
                            value={
                              isPromotion
                                ? `🎁 ${item.name ?? "Promoción"}`
                                : (product?.name ?? item.name ?? "Producto")
                            }
                            disabled
                            readOnly
                          />
                        </FormGroup>

                        <FormGroup>
                          <Label>Cantidad</Label>
                          <QuantityInput
                            value={item.quantity}
                            disabled
                            readOnly
                          />
                        </FormGroup>
                      </ProductRow>
                    );
                  })}
                </ProductsContainer>
              </div>
              <FormActions>
                <CancelButton type="button" onClick={() => onSuccess?.()}>
                  Cancelar
                </CancelButton>

                <SubmitButton type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Guardando..." : "Guardar cambios"}
                </SubmitButton>
              </FormActions>
            </FormContainer>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OrderForm;
