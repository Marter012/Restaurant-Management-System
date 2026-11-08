import type { StockFormValues } from "../../interfaces/StockMovement.ts";
import * as Yup from "yup";

export const StockSchema = Yup.object({
  type: Yup.string().required("Seleccioná el tipo de movimiento"),

  quantity: Yup.number()
    .required("Ingresá una cantidad")
    .positive("La cantidad debe ser mayor a 0")
    .integer("La cantidad debe ser un número entero"),

  description: Yup.string(),
});
export const StockInitialValues: StockFormValues = {
  type: "inflow",

  quantity: 0,

  description: "",
};
