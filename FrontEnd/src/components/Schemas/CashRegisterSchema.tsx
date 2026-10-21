import * as Yup from "yup";
import type { CashRegisterFormValues } from "../../interfaces/CashRegister.ts";


export const openCashInitialValues: CashRegisterFormValues = {
  opening_amount: 0,
  shift: "morning",
};

export const closeCashInitialValues: CashRegisterFormValues = {
  closingAmount: 0,
};

export const OpenCashSchema = Yup.object({
  opening_amount: Yup.number()
    .required("El monto inicial es obligatorio")
    .min(0, "El monto no puede ser negativo"),

  shift: Yup.string()
    .oneOf(
      ["morning", "night"],
      "El turno seleccionado no es válido",
    )
    .required("El turno es obligatorio"),
});

export const CloseCashSchema = Yup.object({
  closingAmount: Yup.number()
    .typeError("Ingresá un monto válido.")
    .required("El monto de cierre es obligatorio.")
    .min(
      0,
      "El monto no puede ser negativo.",
    ),
});