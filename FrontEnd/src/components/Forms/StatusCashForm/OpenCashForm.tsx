import { Formik, Field, ErrorMessage } from "formik";

import {
  FormGroup,
  Label,
  Input,
  ErrorText,
  FormStyles,
} from "./OpenCashFormStyles.ts";

import type {
  CashRegisterFormValues,
  OpenCashFormProps,
} from "../../../interfaces/CashRegister.ts";
import type { RootState } from "../../../store/store.ts";
import { useSelector } from "react-redux";
import {
  openCashInitialValues,
  OpenCashSchema,
} from "../../Schemas/CashRegisterSchema.tsx";

interface OpenCashFormRefactorProps extends OpenCashFormProps {
  formId?: string;
  onSubmittingChange?: (submitting: boolean) => void;
}

const OpenCashForm = ({
  onSubmit,
  formId = "open-cash-form",
  onSubmittingChange,
}: OpenCashFormRefactorProps) => {
  const shift = useSelector((state: RootState) => state.daySelected.shift);

  const handleSubmit = async (values: CashRegisterFormValues) => {
    onSubmittingChange?.(true);
    try {
      await onSubmit(Number(values.opening_amount), values.shift ?? "morning");
    } finally {
      onSubmittingChange?.(false);
    }
  };

  return (
    <Formik
      initialValues={openCashInitialValues}
      validationSchema={OpenCashSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <FormStyles id={formId}>
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
        </FormStyles>
      )}
    </Formik>
  );
};

export default OpenCashForm;
