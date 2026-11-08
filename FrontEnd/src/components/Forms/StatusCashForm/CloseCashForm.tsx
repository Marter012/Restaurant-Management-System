import { Formik, Field, ErrorMessage } from "formik";

import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  ErrorMessage as StyledErrorMessage,
} from "./CloseCashFormStyles.ts";

import type {
  CashRegisterFormValues,
  CloseCashFormProps,
} from "../../../interfaces/CashRegister.ts";

import {
  closeCashInitialValues,
  CloseCashSchema,
} from "../../Schemas/CashRegisterSchema.tsx";

interface CloseCashFormRefactorProps extends CloseCashFormProps {
  formId?: string;
  onSubmittingChange?: (submitting: boolean) => void;
}

const CloseCashForm = ({
  openingAmount,
  onSubmit,
  formId = "close-cash-form",
  onSubmittingChange,
}: CloseCashFormRefactorProps) => {
  const handleSubmit = async (values: CashRegisterFormValues) => {
    onSubmittingChange?.(true);
    try {
      await onSubmit(Number(values.closingAmount));
    } catch (error) {
      console.error("Error cerrando caja:", error);
    } finally {
      onSubmittingChange?.(false);
    }
  };

  return (
    <Formik
      initialValues={closeCashInitialValues}
      validationSchema={CloseCashSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <FormContainer id={formId} onSubmit={handleSubmit}>
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
              <ErrorMessage
                name="closingAmount"
                component={StyledErrorMessage}
              />
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
        </FormContainer>
      )}
    </Formik>
  );
};

export default CloseCashForm;
