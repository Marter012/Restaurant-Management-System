import { useMemo, useState, type FocusEvent } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { FaImage, FaPlus, FaTrash, FaCheck, FaMinus } from "react-icons/fa";

import {
  FormContainer,
  PromotionEditorLayout,
  PromotionMainColumn,
  PromotionCompositionColumn,
  SectionTitle,
  FormGroup,
  ErrorText,
  PromotionImagePanel,
  PromotionImagePreview,
  PromotionImagePlaceholder,
  PromotionImageUpload,
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
  EmptyProductsMessage,
  PromotionDescriptionPreview,
  PromotionStatusRow,
  PromotionStatusSwitch,
  GroupQuantityControl,
  GroupProductsHeading,
  GroupControlsRow,
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
import { useAlert } from "../../context/AlertContext.tsx";

const PromotionForm = ({
  mode,
  promotion,
  onSuccess,
  onSubmittingChange,
}: PromotionFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  const activeProducts = useMemo(
    () => products.filter((product) => product.status),
    [products],
  );

  const categories = useMemo(
    () =>
      Array.from(
        new Set(
          activeProducts.map((product) => product.category).filter(Boolean),
        ),
      ),
    [activeProducts],
  );

  const [searchByGroup, setSearchByGroup] = useState<Record<number, string>>(
    {},
  );
  const [categoryByGroup, setCategoryByGroup] = useState<
    Record<number, string>
  >({});

  const getGroupName = (productIds: string[]) => {
    const selected = activeProducts.filter((product) =>
      productIds.includes(product.id),
    );
    if (!selected.length) return "";
    const firstCategory = selected[0].category;

    return selected.every((product) => product.category === firstCategory) &&
      firstCategory
      ? firstCategory
      : selected[0].name;
  };

  const { showAlert } = useAlert();

  const toggleProduct = (
    productId: string,
    currentIds: string[],
    setFieldValue: (field: string, value: unknown) => void,
    fieldName: string,
    groupNameField: string,
  ) => {
    const nextIds = currentIds.includes(productId)
      ? currentIds.filter((id) => id !== productId)
      : [...currentIds, productId];

    setFieldValue(fieldName, nextIds);
    setFieldValue(groupNameField, getGroupName(nextIds));
  };

  return (
    <Formik
      initialValues={getPromotionInitialValues(promotion)}
      enableReinitialize
      validationSchema={PromotionSchema}
      onSubmit={async (values, { setSubmitting }) => {
        onSubmittingChange?.(true);

        try {
          const promotionData = {
            name: values.name.trim(),
            image: values.image || null,
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
            const created = await createPromotionAPI(promotionData);
            dispatch(addPromotion(created));
          } else if (mode === "edit" && promotion) {
            const updated = await updatePromotionAPI(
              promotion.id,
              promotionData,
            );

            dispatch(updatePromotion(updated));
          }

          showAlert(
            mode === "create"
              ? "Promoción creada correctamente"
              : "Promoción actualizada correctamente",
            "success",
          );

          await onSuccess();
        } catch (error) {
          console.error("Error guardando promoción:", error);
          showAlert(getAxiosErrorMessage(error), "error");
        } finally {
          setSubmitting(false);
          onSubmittingChange?.(false);
        }
      }}
    >
      {({ values, setFieldValue }) => {
        const generatedDescription = values.items
          .map((item) => {
            const groupName =
              getGroupName(item.product_ids) || item.name.trim();
            return groupName ? `${Number(item.quantity)} ${groupName}` : "";
          })
          .filter(Boolean)
          .join(" + ");

        return (
          <Form id="promotion-form">
            <FormContainer>
              <PromotionEditorLayout>
                <PromotionMainColumn>
                  <SectionTitle>Datos principales</SectionTitle>

                  <PromotionImagePanel>
                    {values.image ? (
                      <PromotionImagePreview
                        src={values.image}
                        alt="Vista previa de la promoción"
                      />
                    ) : (
                      <PromotionImagePlaceholder>
                        <FaImage />
                        <strong>Imagen de la promoción</strong>
                        <span>Seleccioná una fotografía</span>
                      </PromotionImagePlaceholder>
                    )}

                    <PromotionImageUpload htmlFor="promotion-image">
                      {values.image ? "Cambiar imagen" : "Agregar imagen"}
                    </PromotionImageUpload>

                    <input
                      id="promotion-image"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0];
                        if (!file) return;

                        if (file.size > 5 * 1024 * 1024) {
                          showAlert(
                            "La imagen no puede superar los 5 MB.",
                            "error",
                          );
                          setFieldValue("image", "");
                          event.currentTarget.value = "";
                          return;
                        }

                        const reader = new FileReader();
                        reader.onload = () =>
                          setFieldValue("image", String(reader.result || ""));
                        reader.readAsDataURL(file);
                      }}
                    />

                    <small>JPG, PNG o WebP · Máximo 5 MB</small>
                  </PromotionImagePanel>

                  <FormGroup>
                    <label htmlFor="promotion-name">Nombre</label>
                    <Field
                      id="promotion-name"
                      name="name"
                      type="text"
                      placeholder="Ej. Promo Empanadas"
                      data-capitalize-words="true"
                    />
                    <ErrorMessage name="name" component={ErrorText} />
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="promotion-price">Precio</label>
                    <Field
                      id="promotion-price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0,00"
                      onFocus={(event: FocusEvent<HTMLInputElement>) =>
                        event.target.select()
                      }
                    />
                    <ErrorMessage name="price" component={ErrorText} />
                  </FormGroup>

                  <PromotionDescriptionPreview>
                    <label>Descripción generada</label>
                    <p>
                      {generatedDescription ||
                        "La descripción se completará automáticamente según los grupos y productos seleccionados."}
                    </p>
                  </PromotionDescriptionPreview>

                  {mode === "edit" && (
                    <PromotionStatusRow>
                      <div>
                        <strong>Promoción activa</strong>
                        <span>Disponible para utilizar en ventas.</span>
                      </div>
                      <PromotionStatusSwitch
                        type="button"
                        $active={Boolean(values.status)}
                        role="switch"
                        aria-checked={Boolean(values.status)}
                        onClick={() => setFieldValue("status", !values.status)}
                      >
                        <span />
                      </PromotionStatusSwitch>
                    </PromotionStatusRow>
                  )}
                </PromotionMainColumn>

                <PromotionCompositionColumn>
                  <div className="composition-heading">
                    <SectionTitle>Productos incluidos</SectionTitle>
                    <span>Definí los grupos y productos de la promoción.</span>
                  </div>

                  <FieldArray name="items">
                    {({ push, remove }) => (
                      <ItemsContainer>
                        {values.items.map((item, index) => {
                          const search = searchByGroup[index] ?? "";
                          const category = categoryByGroup[index] ?? "";

                          const filtered = activeProducts.filter(
                            (product) =>
                              product.name
                                .toLowerCase()
                                .includes(search.toLowerCase()) &&
                              (!category || product.category === category),
                          );

                          return (
                            <PromotionItem key={index}>
                              <ItemHeader>
                                <div>
                                  <span className="group-index">
                                    GRUPO {index + 1}
                                  </span>
                                  <strong>
                                    {getGroupName(item.product_ids) ||
                                      "Seleccioná productos"}
                                  </strong>
                                </div>

                                {values.items.length > 1 && (
                                  <RemoveItemButton
                                    type="button"
                                    onClick={() => remove(index)}
                                    aria-label={`Eliminar grupo ${index + 1}`}
                                  >
                                    <FaTrash />
                                  </RemoveItemButton>
                                )}
                              </ItemHeader>

                              <Field
                                type="hidden"
                                name={`items.${index}.name`}
                              />

                              <GroupControlsRow>
                                <GroupQuantityControl>
                                  <label>Cantidad incluida</label>
                                  <div className="stepper">
                                    <button
                                      type="button"
                                      aria-label="Disminuir cantidad"
                                      disabled={Number(item.quantity) <= 1}
                                      onClick={() =>
                                        setFieldValue(
                                          `items.${index}.quantity`,
                                          Math.max(
                                            1,
                                            Number(item.quantity) - 1,
                                          ),
                                        )
                                      }
                                    >
                                      <FaMinus />
                                    </button>
                                    <strong>{Number(item.quantity)}</strong>
                                    <button
                                      type="button"
                                      aria-label="Aumentar cantidad"
                                      onClick={() =>
                                        setFieldValue(
                                          `items.${index}.quantity`,
                                          Number(item.quantity) + 1,
                                        )
                                      }
                                    >
                                      <FaPlus />
                                    </button>
                                  </div>
                                </GroupQuantityControl>

                                <GroupProductsHeading>
                                  <strong>Productos</strong>
                                  <span>
                                    {item.product_ids.length} seleccionados
                                  </span>
                                </GroupProductsHeading>

                                <ProductToolbar>
                                  <SearchInput
                                    type="search"
                                    placeholder="Buscar producto..."
                                    value={search}
                                    onChange={(event) =>
                                      setSearchByGroup((old) => ({
                                        ...old,
                                        [index]: event.target.value,
                                      }))
                                    }
                                  />
                                  <CategorySelect
                                    value={category}
                                    onChange={(event) =>
                                      setCategoryByGroup((old) => ({
                                        ...old,
                                        [index]: event.target.value,
                                      }))
                                    }
                                  >
                                    <option value="">
                                      Todas las categorías
                                    </option>
                                    {categories.map((cat) => (
                                      <option key={cat} value={cat}>
                                        {cat}
                                      </option>
                                    ))}
                                  </CategorySelect>
                                </ProductToolbar>
                              </GroupControlsRow>

                              <ProductSelection>
                                {filtered.length ? (
                                  filtered.map((product) => {
                                    const selected = item.product_ids.includes(
                                      product.id,
                                    );

                                    return (
                                      <ProductOption
                                        key={product.id}
                                        type="button"
                                        $selected={selected}
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
                                          {selected && <FaCheck />}
                                        </ProductCheck>
                                        <span>{product.name}</span>
                                      </ProductOption>
                                    );
                                  })
                                ) : (
                                  <EmptyProductsMessage>
                                    {activeProducts.length
                                      ? "No hay coincidencias."
                                      : "No hay productos activos."}
                                  </EmptyProductsMessage>
                                )}
                              </ProductSelection>

                              <ErrorMessage
                                name={`items.${index}.product_ids`}
                                component={ErrorText}
                              />
                            </PromotionItem>
                          );
                        })}

                        <AddItemButton
                          type="button"
                          onClick={() =>
                            push({ name: "", quantity: 1, product_ids: [] })
                          }
                        >
                          <FaPlus /> Agregar grupo
                        </AddItemButton>
                      </ItemsContainer>
                    )}
                  </FieldArray>
                </PromotionCompositionColumn>
              </PromotionEditorLayout>
            </FormContainer>
          </Form>
        );
      }}
    </Formik>
  );
};

export default PromotionForm;
