import * as Yup from "yup";
import type { IOrder } from "../../interfaces/Order";

export const OrderSchema = Yup.object({
  customer_name: Yup.string().optional(),

  items: Yup.array()
    .of(
      Yup.object({
        product_id: Yup.string().optional(),

        promotion_id: Yup.string()
          .nullable()
          .optional(),

        removed_ingredients: Yup.array().of(Yup.string()).default([]),
        garnish: Yup.string().optional(),
        quantity: Yup.number()
          .required("La cantidad es obligatoria")
          .integer("La cantidad debe ser un número entero")
          .min(1, "La cantidad debe ser mayor a 0"),
      }).test(
        "product-or-promotion",
        "Seleccioná un producto o una promoción",
        (item) =>
          Boolean(
            item?.product_id || item?.promotion_id,
          ),
      ),
    )
    .ensure(),

  extra_items: Yup.array()
    .of(
      Yup.object({
        name: Yup.string().trim().required("El extra necesita una descripción"),
        price: Yup.number()
          .typeError("El precio del extra debe ser un número")
          .min(0, "El precio del extra no puede ser negativo")
          .required("El precio del extra es obligatorio"),
        quantity: Yup.number()
          .typeError("La cantidad del extra debe ser un número")
          .integer("La cantidad del extra debe ser un número entero")
          .min(1, "La cantidad del extra debe ser mayor a 0")
          .required("La cantidad del extra es obligatoria"),
      }),
    )
    .ensure(),

  method_payment: Yup.string().required(
    "Seleccioná un método de pago",
  ),

  status_payment: Yup.string().required(
    "Seleccioná el estado del pago",
  ),

  delivery_time: Yup.string().optional(),

  payments: Yup.array()
    .of(
      Yup.object({
        method_payment: Yup.string()
          .oneOf(["cash", "transfer", "qr", "debit_card", "mercado_pago"])
          .required("Seleccioná un medio de pago"),
        amount: Yup.number()
          .typeError("El importe del pago debe ser un número")
          .moreThan(0, "El importe de cada pago debe ser mayor a cero")
          .required("Ingresá el importe del pago"),
      }),
    )
    .ensure(),

  status: Yup.boolean().required(),
}).test(
  "items-or-extras",
  "La comanda debe tener al menos un producto, promoción o producto extra agregado",
  (order) => Boolean(order?.items?.length || order?.extra_items?.length),
);


export const getOrderInitialValues = (
  order: IOrder,
) => ({
  order_number: order.order_number ?? 1,

  customer_name: order.customer_name ?? "",

  items:
    order.items?.map((item) => ({
      product_id: item.product_id ?? "",
      promotion_id: item.promotion_id ?? null,
      quantity: item.quantity,
      garnish: item.garnish ?? undefined,
      removed_ingredients: item.removed_ingredients ?? [],
    })) ?? [],

  method_payment: order.method_payment ?? "cash",

  status_payment: order.status_payment ?? "pending",

  delivery_time: order.delivery_time ?? "",

  status: order.status ?? true,
  payments: (order.payments?.length
    ? order.payments
    : [{ method_payment: order.method_payment ?? "cash", amount: Number(order.total_price ?? 0) }]
  ).map((payment) => ({
    method_payment: payment.method_payment,
    amount: Number(payment.amount ?? 0),
  })),
});