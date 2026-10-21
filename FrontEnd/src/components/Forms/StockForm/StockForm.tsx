import { Formik, Form, Field, ErrorMessage } from "formik";

import { createStockMovementAPI } from "../../../services/stockMovementService.ts";

import {
  StockFormContainer,
  StockInfo,
  FormGroup,
  ErrorText,
  FormActions,
  CancelButton,
  SubmitButton,
} from "./StockMovementStyles.ts";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store.ts";
import { updateProduct } from "../../../store/slices/productSlice.ts";
import { getProductAPI } from "../../../services/productService.ts";
import axios from "axios";
import type { StockFormProps } from "../../../interfaces/StockMovement.ts";
import {
  StockInitialValues,
  StockSchema,
} from "../../Schemas/StockMovement.tsx";

const StockForm = ({ product, onSuccess }: StockFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Formik
      initialValues={StockInitialValues}
      validationSchema={StockSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        try {
          setStatus(null);

          const updateProductStock = await createStockMovementAPI({
            product_id: product.id,

            type: values.type,

            description: values.description,

            quantity: values.quantity,

            order_id: "",

            status: true,
          });

          const updatedProduct = await getProductAPI(
            updateProductStock.product_id,
          );

          dispatch(updateProduct(updatedProduct));

          onSuccess();
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Data:", error.response?.data);
            setStatus(error.response?.data.detail);
          } else {
            console.error("Error desconocido:", error);
          }
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status, values, setFieldValue }) => (
        <Form className="stockForm">
          <StockFormContainer>
            <div className="containerInfo">
              <StockInfo>
                <h3>{product.name}</h3>

                <p>
                  Stock actual: <strong>{product.quantity}</strong>
                </p>
              </StockInfo>

              <div className="typeMovement">
                <FormGroup>
                  <label htmlFor="quantity">Cantidad</label>

                  <Field id="quantity" name="quantity" type="number" min="1" />

                  <ErrorMessage name="quantity" component={ErrorText} />
                </FormGroup>
                <FormGroup>
                  <label>Tipo de movimiento</label>

                  <div className="stock-type-buttons ">
                    <button
                      type="button"
                      className={values.type === "inflow" ? "inflow" : ""}
                      onClick={() => setFieldValue("type", "inflow")}
                    >
                      Ingreso
                    </button>

                    <button
                      type="button"
                      className={values.type === "outflow" ? "outflow" : ""}
                      onClick={() => setFieldValue("type", "outflow")}
                    >
                      Egreso
                    </button>
                  </div>

                  <ErrorMessage name="type" component={ErrorText} />
                </FormGroup>
              </div>

              <FormGroup>
                <label htmlFor="description">Descripción</label>

                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  placeholder="Ej: Ingreso de mercadería"
                />

                <ErrorMessage name="description" component={ErrorText} />
              </FormGroup>

              {status && <ErrorText>{status}</ErrorText>}
            </div>
            <FormActions>
              <CancelButton type="button" onClick={onSuccess}>
                Cancelar
              </CancelButton>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Guardando..." : "Modificar stock"}
              </SubmitButton>
            </FormActions>
          </StockFormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default StockForm;
