import { Formik, Field, ErrorMessage } from "formik";
import { useSelector } from "react-redux";

import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  ErrorText,
  FormActions,
  CancelButton,
  SubmitButton,
  FormStyles,
} from "./OpenCashFormStyles.ts";

import type {
  CashRegisterFormValues,
  OpenCashFormProps,
} from "../../../interfaces/CashRegister.ts";
import type { RootState } from "../../../store/store.ts";
import {
  openCashInitialValues,
  OpenCashSchema,
} from "../../Schemas/CashRegisterSchema.tsx";

const OpenCashForm = ({ onSubmit, onClose }: OpenCashFormProps) => {
  const shift = useSelector((state: RootState) => state.daySelected.shift);

  const handleSubmit = (values: CashRegisterFormValues) => {
    onSubmit(Number(values.opening_amount), values.shift ?? "morning");
  };

  return (
    <Formik
      initialValues={openCashInitialValues}
      validationSchema={OpenCashSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormStyles>
          <FormContainer>
            <div className="containerInfo">
              <FormGroup>
                <Label htmlFor="shift">Turno</Label>

                <Field
                  as={Input}
                  id="shift"
                  name="shift"
                  disabled
                  value={shift === "morning" ? "Mañana" : "Noche"}
                />

                <ErrorMessage name="shift" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="opening_amount">Monto inicial</Label>

                <Field
                  as={Input}
                  id="opening_amount"
                  name="opening_amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0"
                />

                <ErrorMessage name="opening_amount" component={ErrorText} />
              </FormGroup>
            </div>
            <FormActions>
              <CancelButton type="button" onClick={onClose}>
                Cancelar
              </CancelButton>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Abriendo..." : "Abrir caja"}
              </SubmitButton>
            </FormActions>
          </FormContainer>
        </FormStyles>
      )}
    </Formik>
  );
};

export default OpenCashForm;
