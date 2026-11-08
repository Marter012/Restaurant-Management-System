import * as Yup from "yup";

export const UserSchema = Yup.object({
  username: Yup.string()
    .trim()
    .required("El username es obligatorio.")
    .min(3, "El username debe tener al menos 3 caracteres."),

  email: Yup.string()
    .trim()
    .email("Ingresá un email válido.")
    .required("El email es obligatorio."),

  role: Yup.string()
    .required("Seleccioná un rol."),

  password: Yup.string()
    .required("La contraseña es obligatoria.")
    .min(6, "La contraseña debe tener al menos 6 caracteres."),

  status: Yup.boolean()
    .required(),
});