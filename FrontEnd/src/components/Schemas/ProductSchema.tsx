import * as Yup from "yup";
import type { ProductFormValues } from "../../interfaces/Product.ts";

export const ProductSchema = Yup.object({
  name: Yup.string().trim().required("El nombre es obligatorio"),
  image: Yup.string().nullable().optional().max(7_000_000, "La imagen es demasiado grande"),

  price: Yup.number()
    .typeError("El precio debe ser un número")
    .required("El precio es obligatorio")
    .positive("El precio debe ser positivo"),

  category: Yup.string().trim().required("La categoría es obligatoria"),
  ingredients: Yup.string().optional(),
});

export const getProductInitialValues = (product?: ProductFormValues) => ({
  name: product?.name ?? "",
  image: product?.image ?? "",
  price: product?.price ?? 0,
  category: product?.category ?? "",
  has_garnish: product?.has_garnish ?? false,
  garnish_options: product?.garnish_options?.join(", ") ?? "",
  ingredients: product?.ingredients?.join(", ") ?? "",
});
