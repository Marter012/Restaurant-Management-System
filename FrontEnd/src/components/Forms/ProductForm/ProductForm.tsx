import { useEffect, useMemo, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FaCheck, FaPlus } from "react-icons/fa";

import {
  FormContainer,
  FormGroup,
  ErrorText,
  CategorySuggestions,
  CategorySuggestion,
  IngredientSuggestions,
  IngredientChip,
  IngredientSuggestionsTitle,
} from "./ProductFormStyles.ts";

import { useDispatch, useSelector } from "react-redux";

import type { ProductFormProps } from "../../../interfaces/Product.ts";

import type { AppDispatch, RootState } from "../../../store/store.ts";

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

import { useAlert } from "../../context/AlertContext.tsx";

const normalizeText = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es")
    .trim();

const formatCategory = (category: string) => {
  const trimmed = category.trim();

  if (!trimmed) return "";

  return trimmed.charAt(0).toLocaleUpperCase("es") +
    trimmed.slice(1).toLocaleLowerCase("es");
};

const getIngredients = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map(String).flatMap((item) => item.split(","));
  }

  if (typeof value === "string") {
    return value.split(",");
  }

  return [];
};

const ProductForm = ({
  mode,
  product,
  onSuccess,
  categories,
  onSubmittingChange,
}: ProductFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector(
    (state: RootState) => state.products.products,
  );

  const { showAlert } = useAlert();

  const [showCategorySuggestions, setShowCategorySuggestions] =
    useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target as Node)
      ) {
        setShowCategorySuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const capitalizeWords = (value: string) =>
  value.replace(/\p{L}+/gu, (word) => {
    if (word.length <= 2) return word;

    return (
      word.charAt(0).toLocaleUpperCase("es") +
      word.slice(1)
    );
  });

  return (
    <Formik
      initialValues={getProductInitialValues(product)}
      enableReinitialize
      validationSchema={ProductSchema}
      onSubmit={async (values, { setSubmitting }) => {
        onSubmittingChange?.(true);

        try {
          const formattedValues = {
            ...values,
            category: formatCategory(values.category),

            garnish_options: values.has_garnish
              ? String(values.garnish_options ?? "")
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean)
              : [],

            ingredients: getIngredients(values.ingredients)
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

          showAlert(
            mode === "create"
              ? "Producto creado correctamente"
              : "Producto actualizado correctamente",
            "success",
          );

          onSuccess();
        } catch (error) {
          console.error("Error guardando producto:", error);

          showAlert("No se pudo guardar el producto", "error");
        } finally {
          setSubmitting(false);
          onSubmittingChange?.(false);
        }
      }}
    >
      {({ values, setFieldValue }) => {
        const categorySearch = normalizeText(values.category || "");

        const filteredCategories = (categories ?? []).filter((category) =>
          normalizeText(category).includes(categorySearch),
        );

        const selectedCategory = normalizeText(values.category || "");

        const suggestedIngredients = useMemo(() => {
          if (!selectedCategory) return [];

          const matchingProducts = products.filter(
            (item) =>
              normalizeText(item.category || "") === selectedCategory,
          );

          const uniqueIngredients = new Map<string, string>();

          matchingProducts.forEach((item) => {
            getIngredients(item.ingredients).forEach((ingredient) => {
              const trimmed = ingredient.trim();

              if (!trimmed) return;

              const key = normalizeText(trimmed);

              if (!uniqueIngredients.has(key)) {
                uniqueIngredients.set(key, trimmed);
              }
            });
          });

          return Array.from(uniqueIngredients.values()).sort((a, b) =>
            a.localeCompare(b, "es"),
          );
        }, [products, selectedCategory]);

        const currentIngredients = getIngredients(values.ingredients)
          .map((item) => item.trim())
          .filter(Boolean);

       const toggleIngredient = (ingredient: string) => {
  const formattedIngredient = capitalizeWords(ingredient);

  const exists = currentIngredients.some(
    (item) =>
      normalizeText(item) === normalizeText(formattedIngredient),
  );

  const updatedIngredients = exists
    ? currentIngredients.filter(
        (item) =>
          normalizeText(item) !== normalizeText(formattedIngredient),
      )
    : [...currentIngredients, formattedIngredient];

  setFieldValue("ingredients", updatedIngredients.join(", "));
};

        return (
          <Form id="manage-product-form" className="activadoform">
            <FormContainer>
              <div className="fieldsForm">
                <FormGroup>
                  <label htmlFor="product-image">
                    Fotografía del producto
                  </label>

                  <input
                    id="product-image"
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

                        event.currentTarget.value = "";
                        return;
                      }

                      const reader = new FileReader();

                      reader.onload = () =>
                        setFieldValue("image", String(reader.result || ""));

                      reader.readAsDataURL(file);
                    }}
                  />

                  <small>
                    JPG, PNG o WebP. Máximo 5 MB. Si no cargás una imagen se
                    utilizará la imagen predeterminada.
                  </small>

                  {values.image && (
                    <img
                      src={values.image}
                      alt="Vista previa del producto"
                      style={{
                        width: 120,
                        height: 90,
                        objectFit: "cover",
                        borderRadius: 12,
                      }}
                    />
                  )}
                </FormGroup>

                <div className="twoItems">
                  <FormGroup>
                    <label htmlFor="name">Nombre</label>

                    <Field
                      id="name"
                      name="name"
                      type="text"
                      data-capitalize-words="true"
                      placeholder="Ej.: Empanada de jamón y queso"
                    />

                    <ErrorMessage name="name" component={ErrorText} />
                  </FormGroup>

                  <FormGroup className="price-group">
                    <label htmlFor="price">Precio</label>

                    <Field
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      onFocus={(event: React.FocusEvent<HTMLInputElement>) =>
                        event.target.select()
                      }
                    />

                    <ErrorMessage name="price" component={ErrorText} />
                  </FormGroup>
                </div>

                {/* CATEGORÍA */}

                <FormGroup className="category-group">
                  <label htmlFor="category">Categoría</label>

                  <div className="category-input" ref={categoryRef}>
                    <Field
                      id="category"
                      name="category"
                      type="text"
                      autoComplete="off"
                      data-capitalize-words="true"
                      placeholder="Escribí o seleccioná una categoría"
                      onFocus={() => setShowCategorySuggestions(true)}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("category", event.target.value);
                        setShowCategorySuggestions(true);
                      }}
                    />

                    {showCategorySuggestions &&
                      values.category.trim() &&
                      filteredCategories.length > 0 && (
                        <CategorySuggestions>
                          {filteredCategories.map((category) => (
                            <CategorySuggestion
                              key={category}
                              type="button"
                              onClick={() => {
                                setFieldValue(
                                  "category",
                                  formatCategory(category),
                                );

                                setShowCategorySuggestions(false);
                              }}
                            >
                              {formatCategory(category)}
                            </CategorySuggestion>
                          ))}
                        </CategorySuggestions>
                      )}
                  </div>

                  <ErrorMessage name="category" component={ErrorText} />
                </FormGroup>

                {/* INGREDIENTES */}

                <FormGroup className="ingredients-group">
                  <label htmlFor="ingredients">
                    Ingredientes del producto
                  </label>

                  <Field
                    id="ingredients"
                    name="ingredients"
                    type="text"
                    data-capitalize-words="true"
                    placeholder="Ej.: pollo, cebolla, morrón, condimentos"
                  />

                  <small>
                    Separá los ingredientes con comas. En Nueva comanda se
                    podrán quitar individualmente para cada porción.
                  </small>

                  {values.category.trim() && (
                    <IngredientSuggestions>
                      <IngredientSuggestionsTitle>
                        <span>Ingredientes utilizados en esta categoría</span>

                        <small>
                          {suggestedIngredients.length} disponibles
                        </small>
                      </IngredientSuggestionsTitle>

                      {suggestedIngredients.length > 0 ? (
                        <div className="ingredient-chips">
                          {suggestedIngredients.map((ingredient) => {
                            const selected = currentIngredients.some(
                              (item) =>
                                normalizeText(item) ===
                                normalizeText(ingredient),
                            );

                            return (
                              <IngredientChip
                                key={normalizeText(ingredient)}
                                type="button"
                                $selected={selected}
                                onClick={() => toggleIngredient(ingredient)}
                              >
                                {selected ? <FaCheck /> : <FaPlus />}

                                {formatCategory(ingredient)}
                              </IngredientChip>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="no-ingredients">
                          Todavía no hay ingredientes registrados en esta
                          categoría. Podés agregarlos escribiendo en el campo.
                        </p>
                      )}
                    </IngredientSuggestions>
                  )}

                  <ErrorMessage name="ingredients" component={ErrorText} />
                </FormGroup>

                {/* GUARNICIONES */}

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
                        El cliente podrá elegir una opción al pedir este
                        producto.
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
                    data-capitalize-words="true"

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
              </div>
            </FormContainer>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductForm;