import { Formik, Field, ErrorMessage } from "formik";

import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  ErrorMessage as StyledErrorMessage,
  ButtonContainer,
  CancelButton,
  SubmitButton,
} from "./CloseCashFormStyles.ts";

import type {
  CashRegisterFormValues,
  CloseCashFormProps,
} from "../../../interfaces/CashRegister.ts";

import {
  closeCashInitialValues,
  CloseCashSchema,
} from "../../Schemas/CashRegisterSchema.tsx";

const CloseCashForm = ({
  openingAmount,
  onSubmit,
  onClose,
}: CloseCashFormProps) => {
  const handleSubmit = async (values: CashRegisterFormValues) => {
    try {
      await onSubmit(Number(values.closingAmount));
    } catch (error) {
      console.error("Error cerrando caja:", error);
    }
  };

  return (
    <Formik
      initialValues={closeCashInitialValues}
      validationSchema={CloseCashSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit }) => (
        <FormContainer>
        <div className="containerInfo">
            <FormGroup>
            <Label htmlFor="closingAmount">Monto de cierre</Label>

            <Field
              as={Input}
              id="closingAmount"
              name="closingAmount"
              type="number"
              min="0"
              step="0.01"
              placeholder="Ej: 35000"
            />

            <ErrorMessage name="closingAmount" component={StyledErrorMessage} />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="openingAmount">Monto de apertura</Label>

            <Input
              id="openingAmount"
              type="text"
              value={`$ ${openingAmount.toLocaleString("es-AR")}`}
              disabled
              readOnly
            />
          </FormGroup>
        </div>

          <ButtonContainer>
            <CancelButton type="button" onClick={onClose}>
              Cancelar
            </CancelButton>

            <SubmitButton
              type="button"
              disabled={isSubmitting}
              onClick={() => {
                handleSubmit();
              }}
            >
              {isSubmitting ? "Cerrando..." : "Cerrar caja"}
            </SubmitButton>
          </ButtonContainer>
        </FormContainer>
      )}
    </Formik>
  );
};

export default CloseCashForm;
