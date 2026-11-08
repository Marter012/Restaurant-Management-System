import { Formik, Form, Field, ErrorMessage } from "formik";

import {
  FaBoxes,
  FaLayerGroup,
  FaExchangeAlt,
  FaPlusCircle,
  FaMinusCircle,
  FaClipboardList,
} from "react-icons/fa";

import { useDispatch } from "react-redux";

import axios from "axios";

import { createStockMovementAPI } from "../../../services/stockMovementService.ts";
import { getProductAPI } from "../../../services/productService.ts";

import type { AppDispatch } from "../../../store/store.ts";
import { updateProduct } from "../../../store/slices/productSlice.ts";

import type { StockFormProps } from "../../../interfaces/StockMovement.ts";

import {
  StockInitialValues,
  StockSchema,
} from "../../Schemas/StockMovement.tsx";


import {
  StockFormContainer,
  StockInfo,
  StockProductImage,
  StockProductInformation,
  StockProductHeader,
  StockCurrentQuantity,
  StockFormContent,
  StockFormGrid,
  FormGroup,
  MovementContainer,
  MovementButton,
  MovementIcon,
  ErrorText,
} from "./StockFormStyles.ts";
import { useAlert } from "../../context/AlertContext.tsx";

const StockForm = ({ product, onSuccess }: StockFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const { showAlert } = useAlert();

  return (
    <Formik
      initialValues={StockInitialValues}
      validationSchema={StockSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
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

          showAlert(
            "Stock actualizado correctamente",
            "success",
          );

          onSuccess();
        } catch (error) {
          console.error("Error actualizando stock:", error);

          const message = axios.isAxiosError(error)
            ? typeof error.response?.data?.detail === "string"
              ? error.response.data.detail
              : "No se pudo actualizar el stock."
            : "Ocurrió un error inesperado al actualizar el stock.";

          showAlert(message, "error");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form
          id="manage-stock-form"
          className="stockForm"
        >
          <StockFormContainer>
            <StockInfo>
              <StockProductImage
                src={product.image || "/images/Products.png"}
                alt={product.name}
                onError={(event) => {
                  event.currentTarget.src = "/images/Products.png";
                }}
              />

              <StockProductHeader>
                <StockProductInformation>
                  <h3>{product.name}</h3>

                  <StockCurrentQuantity>
                    <span>Stock actual:</span>

                    <strong>
                      {product.quantity} unidades
                    </strong>
                  </StockCurrentQuantity>
                </StockProductInformation>

                <FaBoxes className="stock-info-icon" />
              </StockProductHeader>
            </StockInfo>

            <StockFormContent>
              <StockFormGrid>
                <FormGroup>
                  <label htmlFor="quantity">
                    <FaLayerGroup />
                    Cantidad
                  </label>

                  <Field
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    placeholder="Ingresá la cantidad"
                  />

                  <ErrorMessage
                    name="quantity"
                    component={ErrorText}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    <FaExchangeAlt />
                    Tipo de movimiento
                  </label>

                  <MovementContainer>
                    <MovementButton
                      type="button"
                      $variant="inflow"
                      $active={values.type === "inflow"}
                      onClick={() =>
                        setFieldValue("type", "inflow")
                      }
                    >
                      <MovementIcon>
                        <FaPlusCircle />
                      </MovementIcon>

                      Ingreso
                    </MovementButton>

                    <MovementButton
                      type="button"
                      $variant="outflow"
                      $active={values.type === "outflow"}
                      onClick={() =>
                        setFieldValue("type", "outflow")
                      }
                    >
                      <MovementIcon>
                        <FaMinusCircle />
                      </MovementIcon>

                      Egreso
                    </MovementButton>
                  </MovementContainer>

                  <ErrorMessage
                    name="type"
                    component={ErrorText}
                  />
                </FormGroup>
              </StockFormGrid>

              <FormGroup>
                <label htmlFor="description">
                  <FaClipboardList />
                  Descripción
                </label>

                <Field
                  id="description"
                  name="description"
                  placeholder="Ej: Ingreso de mercadería"
                />

                <ErrorMessage
                  name="description"
                  component={ErrorText}
                />
              </FormGroup>
            </StockFormContent>
          </StockFormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default StockForm;