import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import {
  FormContainer,
  FormGroup,
  ErrorText,
  FormActions,
  CancelButton,
  SubmitButton,
  ItemsContainer,
  PromotionItem,
  ItemHeader,
  RemoveItemButton,
  AddItemButton,
  ProductToolbar,
  SearchInput,
  CategorySelect,
  ProductSelection,
  ProductOption,
  ProductCheck,
  SelectedProductsInfo,
  EmptyProductsMessage,
  SectionTitle,
} from "./PromotionFormStyles.ts";

import type { AppDispatch, RootState } from "../../../store/store.ts";

import type { PromotionFormProps } from "../../../interfaces/Promotion.ts";

import {
  addPromotion,
  updatePromotion,
} from "../../../store/slices/promotionSlice.ts";

import {
  createPromotionAPI,
  updatePromotionAPI,
} from "../../../services/promotionService.ts";

import {
  getPromotionInitialValues,
  PromotionSchema,
} from "../../Schemas/PromotionSchema.tsx";

import { getAxiosErrorMessage } from "../../Utils/ErrorAxios.tsx";

const PromotionForm = ({ mode, promotion, onSuccess }: PromotionFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.products.products);

  const activeProducts = products.filter((product) => product.status);

  const categories = Array.from(
    new Set(activeProducts.map((product) => product.category).filter(Boolean)),
  );

  const [searchByGroup, setSearchByGroup] = useState<Record<number, string>>(
    {},
  );

  const [categoryByGroup, setCategoryByGroup] = useState<
    Record<number, string>
  >({});

  // Genera automáticamente el nombre del grupo.
  const getGroupName = (productIds: string[]): string => {
    const selectedProducts = activeProducts.filter((product) =>
      productIds.includes(product.id),
    );

    if (selectedProducts.length === 0) {
      return "";
    }

    const firstCategory = selectedProducts[0].category;

    const sameCategory = selectedProducts.every(
      (product) => product.category === firstCategory,
    );

    if (sameCategory && firstCategory) {
      return firstCategory;
    }

    return selectedProducts[0].name;
  };

  // Selecciona o deselecciona productos de un grupo.
  const toggleProduct = (
    productId: string,
    currentIds: string[],
    setFieldValue: (field: string, value: unknown) => void,
    fieldName: string,
    groupNameField: string,
  ) => {
    const exists = currentIds.includes(productId);

    const newIds = exists
      ? currentIds.filter((id) => id !== productId)
      : [...currentIds, productId];

    setFieldValue(fieldName, newIds);

    // Actualiza automáticamente el nombre del grupo.
    setFieldValue(groupNameField, getGroupName(newIds));
  };

  return (
    <Formik
      initialValues={getPromotionInitialValues(promotion)}
      enableReinitialize
      validationSchema={PromotionSchema}
      onSubmit={async (values, { setSubmitting, setStatus }) => {
        setSubmitting(true);
        setStatus(null);

        try {
          const promotionData = {
            name: values.name.trim(),

            // La descripción se genera automáticamente.
            description: values.items
              .map((item) => {
                const groupName =
                  getGroupName(item.product_ids) || item.name.trim();

                return `${Number(item.quantity)} ${groupName}`;
              })
              .join(" + "),

            price: Number(values.price),

            items: values.items.map((item, index) => ({
              name:
                getGroupName(item.product_ids) ||
                item.name.trim() ||
                `Grupo ${index + 1}`,

              quantity: Number(item.quantity),

              product_ids: item.product_ids,
            })),

            status: mode === "create" ? true : values.status,
          };

          if (mode === "create") {
            const newPromotion = await createPromotionAPI(promotionData);

            dispatch(addPromotion(newPromotion));
          }

          if (mode === "edit" && promotion) {
            const updatedPromotion = await updatePromotionAPI(
              promotion.id,
              promotionData,
            );

            dispatch(updatePromotion(updatedPromotion));
          }

          onSuccess();
        } catch (error) {
          const message = getAxiosErrorMessage(error);

          console.error("Error guardando promoción:", error);

          setStatus(message);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, status, values, setFieldValue }) => (
        <Form>
          <FormContainer>
            <div className="containerInfo">
              {/* DATOS PRINCIPALES */}

              <SectionTitle>Datos de la promoción</SectionTitle>

              <FormGroup>
                <label htmlFor="name">Nombre de la promoción</label>

                <Field
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ej.: Promo Familiar"
                />

                <ErrorMessage name="name" component={ErrorText} />
              </FormGroup>

              <FormGroup>
                <label htmlFor="price">Precio de la promoción</label>

                <Field
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Ej.: 35000"
                  onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
                    event.target.select();
                  }}
                />

                <ErrorMessage name="price" component={ErrorText} />
              </FormGroup>

              {/* COMPOSICIÓN DE LA PROMOCIÓN */}

              <SectionTitle>¿Qué incluye la promoción?</SectionTitle>

              <p>
                Agregá grupos, indicá las cantidades y seleccioná qué productos
                podrá elegir el cliente.
              </p>

              <FormGroup>
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <ItemsContainer>
                      {values.items.map((item, index) => {
                        const search = searchByGroup[index] ?? "";

                        const category = categoryByGroup[index] ?? "";

                        const filteredProducts = activeProducts.filter(
                          (product) => {
                            const matchesSearch = product.name
                              .toLowerCase()
                              .includes(search.toLowerCase());

                            const matchesCategory =
                              !category || product.category === category;

                            return matchesSearch && matchesCategory;
                          },
                        );

                        return (
                          <PromotionItem key={index}>
                            {/* ENCABEZADO DEL GRUPO */}

                            <ItemHeader>
                              <div>
                                <strong>
                                  {getGroupName(item.product_ids) ||
                                    `Grupo ${index + 1}`}
                                </strong>

                                <span>
                                  {item.product_ids.length === 0
                                    ? "Seleccioná los productos permitidos"
                                    : `${item.product_ids.length} producto${
                                        item.product_ids.length !== 1 ? "s" : ""
                                      } seleccionado${
                                        item.product_ids.length !== 1 ? "s" : ""
                                      }`}
                                </span>
                              </div>

                              {values.items.length > 1 && (
                                <RemoveItemButton
                                  type="button"
                                  onClick={() => remove(index)}
                                >
                                  Eliminar
                                </RemoveItemButton>
                              )}
                            </ItemHeader>

                            {/* NOMBRE INTERNO DEL GRUPO */}

                            <Field type="hidden" name={`items.${index}.name`} />

                            {/* CANTIDAD */}

                            <FormGroup>
                              <label htmlFor={`items.${index}.quantity`}>
                                Cantidad incluida
                              </label>

                              <Field
                                id={`items.${index}.quantity`}
                                name={`items.${index}.quantity`}
                                type="number"
                                min="1"
                                step="1"
                                placeholder="Ej.: 6"
                              />

                              <small>
                                Unidades que incluye este grupo. El cliente
                                podrá distribuirlas entre los productos
                                seleccionados.
                              </small>

                              <ErrorMessage
                                name={`items.${index}.quantity`}
                                component={ErrorText}
                              />
                            </FormGroup>

                            {/* SELECCIÓN DE PRODUCTOS */}

                            <FormGroup>
                              <label>Productos que pueden incluirse</label>

                              {activeProducts.length === 0 ? (
                                <EmptyProductsMessage>
                                  No hay productos activos disponibles.
                                </EmptyProductsMessage>
                              ) : (
                                <>
                                  <ProductToolbar>
                                    <SearchInput
                                      type="text"
                                      placeholder="Buscar producto..."
                                      value={search}
                                      onChange={(event) =>
                                        setSearchByGroup((previous) => ({
                                          ...previous,
                                          [index]: event.target.value,
                                        }))
                                      }
                                    />

                                    <CategorySelect
                                      value={category}
                                      onChange={(event) =>
                                        setCategoryByGroup((previous) => ({
                                          ...previous,
                                          [index]: event.target.value,
                                        }))
                                      }
                                    >
                                      <option value="">
                                        Todas las categorías
                                      </option>

                                      {categories.map((categoryName) => (
                                        <option
                                          key={categoryName}
                                          value={categoryName}
                                        >
                                          {categoryName}
                                        </option>
                                      ))}
                                    </CategorySelect>
                                  </ProductToolbar>

                                  <ProductSelection>
                                    {filteredProducts.length === 0 ? (
                                      <EmptyProductsMessage>
                                        No se encontraron productos.
                                      </EmptyProductsMessage>
                                    ) : (
                                      filteredProducts.map((product) => {
                                        const selected =
                                          item.product_ids.includes(product.id);

                                        return (
                                          <ProductOption
                                            key={product.id}
                                            $selected={selected}
                                            type="button"
                                            onClick={() =>
                                              toggleProduct(
                                                product.id,
                                                item.product_ids,
                                                setFieldValue,
                                                `items.${index}.product_ids`,
                                                `items.${index}.name`,
                                              )
                                            }
                                          >
                                            <ProductCheck $selected={selected}>
                                              {selected ? "✓" : ""}
                                            </ProductCheck>

                                            <span>{product.name}</span>
                                          </ProductOption>
                                        );
                                      })
                                    )}
                                  </ProductSelection>

                                  <SelectedProductsInfo>
                                    {item.product_ids.length === 0
                                      ? "Todavía no seleccionaste productos."
                                      : `${item.product_ids.length} producto${
                                          item.product_ids.length !== 1
                                            ? "s"
                                            : ""
                                        } permitido${
                                          item.product_ids.length !== 1
                                            ? "s"
                                            : ""
                                        } para este grupo.`}
                                  </SelectedProductsInfo>
                                </>
                              )}

                              <ErrorMessage
                                name={`items.${index}.product_ids`}
                                component={ErrorText}
                              />
                            </FormGroup>
                          </PromotionItem>
                        );
                      })}

                      {/* AGREGAR GRUPO */}

                      <AddItemButton
                        type="button"
                        onClick={() =>
                          push({
                            name: "",
                            quantity: 1,
                            product_ids: [],
                          })
                        }
                      >
                        + Agregar otro grupo
                      </AddItemButton>
                    </ItemsContainer>
                  )}
                </FieldArray>
              </FormGroup>
            </div>
            {/* ERRORES */}
            {status && <ErrorText>{status}</ErrorText>}
            {/* ACCIONES */}
            <FormActions>
              <CancelButton type="button" onClick={onSuccess}>
                Cancelar
              </CancelButton>

              <SubmitButton type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Guardando..."
                  : mode === "create"
                    ? "Crear promoción"
                    : "Guardar cambios"}
              </SubmitButton>
            </FormActions>
          </FormContainer>
        </Form>
      )}
    </Formik>
  );
};

export default PromotionForm;
