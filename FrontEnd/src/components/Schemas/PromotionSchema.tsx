import * as Yup from "yup";
import type { PromotionFormValues } from "../../interfaces/Promotion.ts";

export const PromotionSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("El nombre es obligatorio")
    .min(2, "El nombre debe tener al menos 2 caracteres"),

  description: Yup.string().trim().required("La descripción es obligatoria"),

  price: Yup.number()
    .typeError("El precio debe ser un número")
    .required("El precio es obligatorio")
    .min(0, "El precio no puede ser negativo"),

  status: Yup.boolean(),

  items: Yup.array()
    .of(
      Yup.object({
        name: Yup.string()
          .trim()
          .required("El nombre del grupo es obligatorio"),

        quantity: Yup.number()
          .typeError("La cantidad debe ser un número")
          .required("La cantidad es obligatoria")
          .integer("La cantidad debe ser un número entero")
          .min(1, "La cantidad debe ser al menos 1"),

        product_ids: Yup.array()
          .of(Yup.string())
          .min(1, "Seleccioná al menos un producto")
          .required("Seleccioná al menos un producto"),
      }),
    )
    .min(1, "La promoción debe tener al menos un grupo")
    .required("Agregá al menos un grupo"),
});

export const getPromotionInitialValues = (promotion?: PromotionFormValues) => ({
  name: promotion?.name ?? "",
  description: promotion?.description ?? "",
  price: promotion?.price ?? 0,
  status: promotion?.status ?? true,

  items: promotion?.items?.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    product_ids: item.product_ids ?? [],
  })) ?? [
    {
      name: "",
      quantity: 1,
      product_ids: [],
    },
  ],
});
