import { Formik, Form, Field, ErrorMessage } from "formik";

import {
  FormContainer,
  FormGroup,
  ErrorText,
  FormActions,
  CancelButton,
  SubmitButton,
} from "./ProductFormStyles.ts";

import { useDispatch } from "react-redux";

import type { ProductFormProps } from "../../../interfaces/Product.ts";

import type { AppDispatch } from "../../../store/store.ts";

import {
  addProduct,
  updateProduct,
} from "../../../store/slices/productSlice.ts";

import {
  createProductApi,
  updateProductApi,
} from "../../../services/productService.ts";

import {
  getProductInitialValues,
  ProductSchema,
} from "../../Schemas/ProductSchema.tsx";

const ProductForm = ({
  mode,
  product,
  onSuccess,
  categories,
}: ProductFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const formatCategory = (category: string) => {
    const trimmed = category.trim();

    if (!trimmed) {
      return "";
    }

    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  return (
    <Formik
      initialValues={getProductInitialValues(product)}
      enableReinitialize
      validationSchema={ProductSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        try {
          setStatus(null);

          const formattedValues = {
            ...values,
            category: formatCategory(values.category),

            garnish_options: values.has_garnish
              ? String(values.garnish_options ?? "")
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
              : [],

            ingredients: String(values.ingredients ?? "")
              .split(",")
              .map((item) => item.trim())
              .filter(Boolean),
          };

          if (mode === "create") {
            const productData = {
              ...formattedValues,
              quantity: 0,
            };

            const newProduct = await createProductApi(productData);

            dispatch(addProduct(newProduct));
          }

          if (mode === "edit" && product) {
            const updatedProduct = await updateProductApi(
              product.id,
              formattedValues,
            );

            dispatch(updateProduct(updatedProduct));
          }

          onSuccess();
        } catch (error) {
          console.error("Error guardando producto:", error);

          setStatus("No se pudo guardar el producto");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status, values, setFieldValue }) => (
        <Form className="activadoform">
          <FormContainer>
            <div className="fieldsForm">
              <div className="twoItems">
                {/* =================================================
                NOMBRE
            ================================================= */}

                <FormGroup>
                  <label htmlFor="name">Nombre</label>

                  <Field
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ej.: Empanada de jamón y queso"
                  />

                  <ErrorMessage name="name" component={ErrorText} />
                </FormGroup>

                {/* =================================================
                PRECIO
            ================================================= */}

                <FormGroup className="price-group">
                  <label htmlFor="price">Precio</label>

                  <Field
                    id="price"
                    name="price"
                    type="number"
                    min="0"
                    step="0.01"
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                      e.target.select();
                    }}
                  />

                  <ErrorMessage name="price" component={ErrorText} />
                </FormGroup>
              </div>

              {/* =================================================
                CATEGORÍA
                Permite escribir una categoría nueva o elegir
                una categoría existente.
            ================================================= */}

              <FormGroup className="category-group">
                <label htmlFor="category">Categoría</label>

                <div className="category-input">
                  <Field
                    id="category"
                    name="category"
                    type="text"
                    autoComplete="off"
                    placeholder="Escribí o seleccioná una categoría"
                  />

                  <Field
                    as="select"
                    name="category"
                    id="category-select"
                    aria-label="Seleccionar categoría existente"
                    title="Seleccionar una categoría existente"
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                      setFieldValue("category", e.target.value);
                    }}
                  >
                    <option value="">Elegir categoria</option>

                    {categories?.map((category) => (
                      <option key={category} value={formatCategory(category)}>
                        {formatCategory(category)}
                      </option>
                    ))}
                  </Field>

                  <datalist id="product-category-options">
                    {categories?.map((category) => (
                      <option key={category} value={formatCategory(category)} />
                    ))}
                  </datalist>
                </div>

                <ErrorMessage name="category" component={ErrorText} />
              </FormGroup>

              {/* =================================================
                INGREDIENTES
            ================================================= */}

              <FormGroup className="ingredients-group">
                <label htmlFor="ingredients">Ingredientes del producto</label>

                <Field
                  id="ingredients"
                  name="ingredients"
                  type="text"
                  placeholder="Ej.: pollo, cebolla, morrón, condimentos"
                />

                <small>
                  Separá los ingredientes con comas. En Nueva comanda se podrán
                  quitar individualmente para cada porción.
                </small>

                <ErrorMessage name="ingredients" component={ErrorText} />
              </FormGroup>

              {/* =================================================
                GUARNICIONES
            ================================================= */}

              <FormGroup className="garnish-group">
                <label className="garnish-toggle" htmlFor="has_garnish">
                  <Field
                    id="has_garnish"
                    type="checkbox"
                    name="has_garnish"
                    className="garnish-checkbox"
                  />

                  <span className="garnish-toggle-copy">
                    <strong>Incluye guarnición sin costo</strong>

                    <small>
                      El cliente podrá elegir una opción al pedir este producto.
                    </small>
                  </span>
                </label>

                {values.has_garnish && (
                  <div className="garnish-options">
                    <label htmlFor="garnish_options">
                      Opciones disponibles
                    </label>

                    <Field
                      id="garnish_options"
                      name="garnish_options"
                      type="text"
                      placeholder="Ej.: Papas fritas, ensalada"
                    />

                    <small>Separá cada opción con una coma.</small>

                    <ErrorMessage
                      name="garnish_options"
                      component={ErrorText}
                    />
                  </div>
                )}
              </FormGroup>

              {/* =================================================
                ERROR GENERAL
            ================================================= */}

              {status && <ErrorText>{status}</ErrorText>}

              {/* =================================================
                ACCIONES
            ================================================= */}
            </div>
            <FormActions>
              <CancelButton type="button" onClick={onSuccess}>
                Cancelar
              </CancelButton>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Guardando..."
                  : mode === "create"
                    ? "Crear producto"
                    : "Guardar cambios"}
              </SubmitButton>
            </FormActions>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
