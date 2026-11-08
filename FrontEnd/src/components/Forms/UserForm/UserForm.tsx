import { Formik, Form, Field, ErrorMessage } from "formik";

import {
  FormContainer,
  FormGroup,
  ErrorText,
} from "./UserFormStyles.ts";

import {
  createUserAPI,
  type CreateUserData,
} from "../../../services/userService.ts";

import { UserSchema } from "../../Schemas/UserSchema.tsx";

interface UserFormProps {
  onSuccess: (user: Awaited<ReturnType<typeof createUserAPI>>) => void;
  onCancel: () => void;
}

const UserForm = ({
  onSuccess,
}: UserFormProps) => {
  const initialValues: CreateUserData = {
    username: "",
    password: "",
    role: "employee",
    email: "",
    status: true,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UserSchema}
      onSubmit={async (
        values,
        { setSubmitting, setStatus },
      ) => {
        try {
          setStatus(null);

          const formattedValues: CreateUserData = {
            username: values.username.trim(),
            password: values.password,
            role: values.role,
            email: values.email.trim(),
            status: values.status,
          };

          const newUser = await createUserAPI(
            formattedValues,
          );

          onSuccess(newUser);
        } catch (error) {
          console.error(
            "Error creando usuario:",
            error,
          );

          setStatus(
            "No se pudo crear el usuario.",
          );
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ status }) => (
       <Form id="create-user-form">
          <FormContainer>
            <FormGroup>
              <label htmlFor="username">
                Nombre
              </label>

              <Field
                id="username"
                name="username"
                type="text"
                placeholder="Ej: juanperez"
                autoComplete="username"
              />

              <ErrorMessage
                name="username"
                component={ErrorText}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="email">
                Email
              </label>

              <Field
                id="email"
                name="email"
                type="email"
                placeholder="Ej: juan@gmail.com"
                autoComplete="email"
              />

              <ErrorMessage
                name="email"
                component={ErrorText}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="role">
                Rol
              </label>

              <Field
                as="select"
                id="role"
                name="role"
              >
                <option value="employee">
                  Empleado
                </option>

                <option value="admin">
                  Administrador
                </option>
              </Field>

              <ErrorMessage
                name="role"
                component={ErrorText}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="password">
                Contraseña inicial
              </label>

              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
              />

              <ErrorMessage
                name="password"
                component={ErrorText}
              />
            </FormGroup>

            <FormGroup>
              <label htmlFor="status">
                Estado
              </label>

              <Field
                as="select"
                id="status"
                name="status"
              >
                <option value="true">
                  Activo
                </option>

                <option value="false">
                  Inactivo
                </option>
              </Field>

              <ErrorMessage
                name="status"
                component={ErrorText}
              />
            </FormGroup>

            {status && (
              <ErrorText>
                {status}
              </ErrorText>
            )}

          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;