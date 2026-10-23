import { useMemo, useState, useEffect, useRef } from "react";
import { Formik } from "formik";

import {
  ContainerNewOrder,
  MainOrder,
  OrderForm,
  MobileOrderSelector,
  MobileOrderButton,
  StockWarningButton,
  StockWarningActions,
  StockWarningMessage,
  StockWarningContent,
  StockWarningIcon,
} from "./NewOrderStyles";

import type {
  ICreateOrder,
  ICreateOrderItem,
  OrderItemForm,
  OrderFormValues,
  PromotionSelection,
} from "../../interfaces/Order";

import type { Product } from "../../interfaces/Product";
import type { Promotion } from "../../interfaces/Promotion";

import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../store/store";

import { createOrderAPI } from "../../services/orderService.ts";

import { setOrders } from "../../store/slices/orderSlice.ts";

import axios from "axios";

import type { Dispatch, SetStateAction } from "react";

import ProductsForOrder from "../ProductsForOrder/ProductsForOrder.tsx";

import CreateOrder from "../CreateOrder/CreateOrder.tsx";

import { setProducts } from "../../store/slices/productSlice.ts";

import { getProductsAPI } from "../../services/productService.ts";

import { OrderSchema } from "../Schemas/OrderSchema.tsx";

import { getCashMovementsAPI } from "../../services/cashMovementService.ts";

import { setCashMovements } from "../../store/slices/cashMovementSlice.ts";

import { getAxiosErrorMessage } from "../Utils/ErrorAxios.tsx";

import { buildOrderTicket } from "../Tickets/OrderTicket.ts";

import { printOrderAPI } from "../../services/printAgentService.ts";
import { api } from "../../services/api.ts";
import ModalForm from "../ModalForm/ModalForm.tsx";

interface NewOrderProps {
  $setSelected: Dispatch<SetStateAction<"create" | "manage">>;
}

export interface AppliedPromotion {
  promotion: Promotion;
  quantity: number;
  selections: PromotionSelection[];
  totalPrice: number;
}

interface PromotionMatch {
  promotion: Promotion;
  selections: PromotionSelection[];
  quantity: number;
}

const NewOrder = ({ $setSelected }: NewOrderProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const [mobileSection, setMobileSection] = useState<"products" | "order">(
    "products",
  );

  const allProducts = useSelector(
    (state: RootState) => state.products.products,
  );

  const products = allProducts.filter((item) => item.status === true);

  const allOrders = useSelector((state: RootState) => state.orders.orders);

  const selectedDay = useSelector((state: RootState) => state.daySelected.day);

  const selectedShift = useSelector(
    (state: RootState) => state.daySelected.shift,
  );

  const cashRegisters = useSelector(
    (state: RootState) => state.cashRegister.cashRegister,
  );

  const [errors, setErrors] = useState("");
  const [allowOutOfStock, setAllowOutOfStock] = useState(false);
  const [showStockWarning, setShowStockWarning] = useState(false);
  const confirmedNoStock = useRef(false);

  useEffect(() => {
    void api
      .get("/settings/")
      .then((response) =>
        setAllowOutOfStock(Boolean(response.data.allow_out_of_stock)),
      )
      .catch(() => setAllowOutOfStock(false));
  }, []);

  const promotions = useSelector(
    (state: RootState) => state.promotion.promotions,
  );

  const selectedCashRegister = useMemo(
    () =>
      cashRegisters.find(
        (cashRegister) =>
          cashRegister.date === selectedDay &&
          cashRegister.shift === selectedShift,
      ),
    [cashRegisters, selectedDay, selectedShift],
  );

  const OrdersForCash = allOrders.filter(
    (item) => item.cash_register_id === selectedCashRegister?.id,
  );

  const nextOrderNumber = OrdersForCash.length
    ? Math.max(...OrdersForCash.map((order) => order.order_number)) + 1
    : 1;

  const initialValues: OrderFormValues = {
    customer_name: "",
    items: [],
    method_payment: "",
    status_payment: "paid",
    delivery_time: "",
    status: true,
    discount_type: "",
    discount_value: 0,
    extra_items: [],
    extra_name: "",
    extra_price: 0,
    extra_quantity: 1,
    payments: [],
  };

  /*
   * ============================================================
   * CARGAR PROMOCIONES
   * ============================================================
   */

  const findPromotionMatch = (
    promotion: Promotion,
    availableItems: Map<string, number>,
  ): PromotionMatch | null => {
    if (!promotion.status || !promotion.items.length) {
      return null;
    }

    const selections: PromotionSelection[] = [];

    const consumed = new Map<string, number>();

    for (
      let groupIndex = 0;
      groupIndex < promotion.items.length;
      groupIndex++
    ) {
      const group = promotion.items[groupIndex];

      let remainingGroupQuantity = group.quantity;

      for (const productId of group.product_ids) {
        if (remainingGroupQuantity <= 0) {
          break;
        }

        const available = Math.max(
          0,
          (availableItems.get(productId) ?? 0) - (consumed.get(productId) ?? 0),
        );

        if (available <= 0) {
          continue;
        }

        const quantityToUse = Math.min(available, remainingGroupQuantity);

        if (quantityToUse > 0) {
          selections.push({
            promotion_item_id: group.id,
            product_id: productId,
            quantity: quantityToUse,
          });

          consumed.set(
            productId,
            (consumed.get(productId) ?? 0) + quantityToUse,
          );

          remainingGroupQuantity -= quantityToUse;
        }
      }

      if (remainingGroupQuantity > 0) {
        return null;
      }
    }

    consumed.forEach((quantity, productId) => {
      const current = availableItems.get(productId) ?? 0;

      availableItems.set(productId, current - quantity);
    });

    return {
      promotion,
      selections,
      quantity: 1,
    };
  };

  /*
   * ============================================================
   * PROMOCIONES APLICADAS
   * ============================================================
   */

  const getAppliedPromotions = (
    orderItems: OrderItemForm[],
  ): AppliedPromotion[] => {
    if (!orderItems.length || !promotions.length) {
      return [];
    }

    const availableItems = new Map<string, number>();

    orderItems.forEach((item) => {
      availableItems.set(
        item.product_id,
        (availableItems.get(item.product_id) ?? 0) + item.quantity,
      );
    });

    const result: AppliedPromotion[] = [];

    for (const promotion of promotions) {
      let promotionQuantity = 0;

      const allSelections: PromotionSelection[] = [];

      while (true) {
        const match = findPromotionMatch(promotion, availableItems);

        if (!match) {
          break;
        }

        promotionQuantity += match.quantity;

        allSelections.push(...match.selections);
      }

      if (promotionQuantity > 0) {
        result.push({
          promotion,
          quantity: promotionQuantity,
          selections: allSelections,
          totalPrice: promotion.price * promotionQuantity,
        });
      }
    }

    return result;
  };

  /*
   * ============================================================
   * CREAR ITEMS PARA EL BACKEND
   * ============================================================
   */

  const buildOrderItems = (
    orderItems: OrderItemForm[],
    appliedPromotions: AppliedPromotion[],
  ): ICreateOrderItem[] => {
    const consumed = new Map<string, number>();

    const result: ICreateOrderItem[] = [];

    appliedPromotions.forEach((applied) => {
      applied.selections.forEach((selection) => {
        const current = consumed.get(selection.product_id) ?? 0;

        consumed.set(selection.product_id, current + selection.quantity);
      });

      result.push({
        item_type: "promotion",
        product_id: null,
        promotion_id: applied.promotion.id,
        quantity: applied.quantity,
        promotion_selections: applied.selections,
      });
    });

    const remainingConsumed = new Map(consumed);
    orderItems.forEach((item) => {
      const stillConsumed = remainingConsumed.get(item.product_id) ?? 0;
      const consumedFromThisLine = Math.min(item.quantity, stillConsumed);
      remainingConsumed.set(
        item.product_id,
        Math.max(0, stillConsumed - consumedFromThisLine),
      );
      const remainingQuantity = item.quantity - consumedFromThisLine;
      if (remainingQuantity <= 0) return;

      result.push({
        item_type: "product",
        product_id: item.product_id,
        promotion_id: null,
        quantity: remainingQuantity,
        promotion_selections: [],
        garnish: item.garnish,
        removed_ingredients: item.removed_ingredients ?? [],
      });
    });

    return result;
  };
  const stateprinter = useSelector(
    (state: RootState) => state.printAgent.printerStatus,
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={OrderSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          setErrors("");

          const requestedByProduct = values.items.reduce((totals, item) => {
            totals.set(
              item.product_id,
              (totals.get(item.product_id) ?? 0) + item.quantity,
            );
            return totals;
          }, new Map<string, number>());
          const exceedsStock = [...requestedByProduct.entries()].some(
            ([productId, quantity]) =>
              quantity >
              (products.find((product) => product.id === productId)?.quantity ??
                0),
          );
          if (allowOutOfStock && exceedsStock && !confirmedNoStock.current) {
            setShowStockWarning(true);
            return;
          }
          const confirmedOutOfStock = confirmedNoStock.current;
          confirmedNoStock.current = false;

          if (!selectedCashRegister) {
            setErrors("No existe una caja para el día y turno seleccionados.");

            return;
          }

          if (selectedCashRegister.status_cash_register !== "open") {
            setErrors(
              "La caja seleccionada no está abierta. Abrí la caja antes de crear una comanda.",
            );

            return;
          }

          const appliedPromotions = getAppliedPromotions(values.items);

          const orderItems = buildOrderItems(values.items, appliedPromotions);

          const order: ICreateOrder = {
            order_number: nextOrderNumber,
            customer_name: values.customer_name,
            items: orderItems,
            method_payment:
              values.payments?.[0]?.method_payment ?? values.method_payment,
            status_payment: values.status_payment,
            delivery_time: values.delivery_time,
            cash_register_id: selectedCashRegister.id,
            status: true,
            discount_type: values.discount_type || null,
            discount_value: values.discount_value ?? 0,
            extra_items: values.extra_items ?? [],
            payments: values.payments ?? [],
            confirmed_out_of_stock: confirmedOutOfStock,
          };

          const createdOrder = await createOrderAPI(order);

          dispatch(setOrders([...allOrders, createdOrder]));

          /*
           * ============================================================
           * IMPRIMIR COMANDA
           * ============================================================
           */

          try {
            if (
              stateprinter?.connected &&
              stateprinter?.online &&
              stateprinter?.agent_connected
            ) {
              const ticket = buildOrderTicket(createdOrder);

              await printOrderAPI(ticket);
            }
          } catch {
            // La impresión es opcional: un Print Agent desconectado no invalida la venta.
          }

          try {
            const updatedProducts = await getProductsAPI();

            dispatch(setProducts(updatedProducts));
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log("ERROR AXIOS:", error);
              console.log("STATUS:", error.response?.status);
              console.log("DATA:", error.response?.data);
              console.log("DETAIL:", error.response?.data?.detail);
              console.log("MESSAGE:", error.response?.data?.message);

              setErrors(
                error.response?.data?.detail ??
                  error.response?.data?.message ??
                  error.message ??
                  "Ocurrió un error.",
              );
            } else {
              console.error("ERROR DESCONOCIDO:", error);

              setErrors("Ocurrió un error inesperado.");
            }
          }

          try {
            const updatedMovements = await getCashMovementsAPI();

            dispatch(setCashMovements(updatedMovements));
          } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log("ERROR AXIOS:", error);
              console.log("STATUS:", error.response?.status);
              console.log("DATA:", error.response?.data);
              console.log("DETAIL:", error.response?.data?.detail);
              console.log("MESSAGE:", error.response?.data?.message);

              setErrors(
                error.response?.data?.detail ??
                  error.response?.data?.message ??
                  error.message ??
                  "Ocurrió un error.",
              );
            } else {
              console.error("ERROR DESCONOCIDO:", error);

              setErrors("Ocurrió un error inesperado.");
            }
          }

          resetForm();

          $setSelected("manage");
        } catch (error) {
          const message = getAxiosErrorMessage(error);

          setErrors(message);
        }
      }}
    >
      {({ values, setFieldValue, isSubmitting, submitForm }) => {
        const getProduct = (id: string) =>
          products.find((product) => product.id === id);

        const appliedPromotions = getAppliedPromotions(values.items);

        const addProduct = (product: Product, garnish?: string) => {
          setErrors("");

          const existing = values.items.find(
            (item) =>
              item.product_id === product.id &&
              item.garnish === garnish &&
              JSON.stringify(item.removed_ingredients ?? []) === "[]",
          );

          const currentProductQuantity = values.items
            .filter((item) => item.product_id === product.id)
            .reduce((sum, item) => sum + item.quantity, 0);

          if (existing) {
            if (
              !allowOutOfStock &&
              currentProductQuantity >= product.quantity
            ) {
              return;
            }

            setFieldValue(
              "items",
              values.items.map((item) =>
                item.product_id === product.id &&
                item.garnish === garnish &&
                JSON.stringify(item.removed_ingredients ?? []) === "[]"
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            );

            return;
          }

          if (!allowOutOfStock && product.quantity <= 0) {
            return;
          }

          setFieldValue("items", [
            ...values.items,
            {
              product_id: product.id,
              quantity: 1,
              garnish,
              removed_ingredients: [],
            },
          ]);
        };

        const addPromotion = (promotion: Promotion) => {
          setErrors("");

          const availableItems = new Map<string, number>();
          values.items.forEach((item) => {
            availableItems.set(
              item.product_id,
              (availableItems.get(item.product_id) ?? 0) + item.quantity,
            );
          });

          const match = findPromotionMatch(promotion, availableItems);
          if (!match) {
            setErrors(
              `Para aplicar la promoción "${promotion.name}", agregá los productos necesarios a la comanda.`,
            );
          }
          // Las promociones se aplican automáticamente cuando los productos
          // ya seleccionados completan su composición. No volver a sumar esos
          // productos, porque duplicaría cantidades y podría falsear el stock.
        };

        const increaseQuantity = (
          id: string,
          garnish?: string,
          removedIngredients: string[] = [],
        ) => {
          const product = getProduct(id);

          if (!product) {
            return;
          }

          const currentItem = values.items.find(
            (item) =>
              item.product_id === id &&
              (item.garnish ?? "") === (garnish ?? "") &&
              JSON.stringify(item.removed_ingredients ?? []) ===
                JSON.stringify(removedIngredients),
          );

          if (!currentItem) {
            return;
          }

          const currentProductQuantity = values.items
            .filter((item) => item.product_id === id)
            .reduce((sum, item) => sum + item.quantity, 0);

          if (!allowOutOfStock && currentProductQuantity >= product.quantity) {
            return;
          }

          setFieldValue(
            "items",
            values.items.map((item) =>
              item.product_id === id &&
              (item.garnish ?? "") === (garnish ?? "") &&
              JSON.stringify(item.removed_ingredients ?? []) ===
                JSON.stringify(removedIngredients)
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          );
        };

        const decreaseQuantity = (
          id: string,
          garnish?: string,
          removedIngredients: string[] = [],
        ) => {
          setFieldValue(
            "items",
            values.items.flatMap((item) => {
              if (
                item.product_id !== id ||
                (item.garnish ?? "") !== (garnish ?? "") ||
                JSON.stringify(item.removed_ingredients ?? []) !==
                  JSON.stringify(removedIngredients)
              )
                return [item];
              if (item.quantity <= 1) return [];
              return [{ ...item, quantity: item.quantity - 1 }];
            }),
          );
        };

        /*
         * ========================================================
         * SUBTOTAL
         * ========================================================
         */

        const subtotal = values.items.reduce((total, item) => {
          const product = getProduct(item.product_id);

          return product ? total + product.price * item.quantity : total;
        }, 0);

        /*
         * ========================================================
         * PRODUCTOS CONSUMIDOS POR PROMOCIONES
         * ========================================================
         */

        const promotionConsumed = new Map<string, number>();

        appliedPromotions.forEach((applied) => {
          applied.selections.forEach((selection) => {
            const current = promotionConsumed.get(selection.product_id) ?? 0;

            promotionConsumed.set(
              selection.product_id,
              current + selection.quantity,
            );
          });
        });

        /*
         * ========================================================
         * TOTAL DE PRODUCTOS FUERA DE PROMOCIONES
         * ========================================================
         */

        const remainingProductsTotal = values.items.reduce((total, item) => {
          const product = getProduct(item.product_id);

          if (!product) {
            return total;
          }

          const consumed = promotionConsumed.get(item.product_id) ?? 0;

          const remaining = Math.max(0, item.quantity - consumed);

          return total + product.price * remaining;
        }, 0);

        /*
         * ========================================================
         * TOTAL DE PROMOCIONES
         * ========================================================
         */

        const promotionsTotal = appliedPromotions.reduce(
          (total, applied) => total + applied.totalPrice,
          0,
        );

        /*
         * ========================================================
         * TOTAL FINAL
         * ========================================================
         */

        const totalPrice = Math.max(
          0,
          (remainingProductsTotal +
            promotionsTotal +
            (values.extra_items ?? []).reduce(
              (sum, extra) => sum + extra.price * extra.quantity,
              0,
            )) *
            (values.discount_type === "percent"
              ? (100 - Number(values.discount_value ?? 0)) / 100
              : 1) -
            (values.discount_type === "amount"
              ? Number(values.discount_value ?? 0)
              : 0),
        );

        /*
         * ========================================================
         * DESCUENTO
         * ========================================================
         */

        const promotionDiscount = Math.max(0, subtotal - totalPrice);

        return (
          <OrderForm>
            <ContainerNewOrder>
              <MobileOrderSelector>
                <MobileOrderButton
                  type="button"
                  $active={mobileSection === "products"}
                  onClick={() => setMobileSection("products")}
                >
                  🛒 Productos
                </MobileOrderButton>

                <MobileOrderButton
                  type="button"
                  $active={mobileSection === "order"}
                  onClick={() => setMobileSection("order")}
                >
                  🧾 Comanda
                </MobileOrderButton>
              </MobileOrderSelector>

              <MainOrder>
                <div
                  className={
                    mobileSection === "products"
                      ? "mobile-active"
                      : "mobile-hidden"
                  }
                >
                  <ProductsForOrder
                    products={products}
                    items={values.items}
                    addProduct={addProduct}
                    allowOutOfStock={allowOutOfStock}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    addPromotion={addPromotion}
                  />
                </div>

                <div
                  className={
                    mobileSection === "order"
                      ? "mobile-active"
                      : "mobile-hidden"
                  }
                >
                  <CreateOrder
                    nextOrderNumber={nextOrderNumber}
                    values={values}
                    subtotal={subtotal}
                    promotionDiscount={promotionDiscount}
                    totalPrice={totalPrice}
                    getProduct={getProduct}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    allowOutOfStock={allowOutOfStock}
                    isSubmitting={isSubmitting}
                    errors={errors}
                    appliedPromotions={appliedPromotions}
                    setFieldValue={setFieldValue}
                  />
                </div>
              </MainOrder>
            </ContainerNewOrder>
            <ModalForm
              isOpen={showStockWarning}
              title="Confirmar venta sin stock"
              onClose={() => setShowStockWarning(false)}
            >
              <StockWarningContent>
                <StockWarningIcon aria-hidden="true">!</StockWarningIcon>
                <StockWarningMessage>
                  <strong>
                    Esta comanda se registrará sin modificar el inventario.
                  </strong>
                  <span>
                    Antes de continuar, corroborá con cocina que todos los
                    productos solicitados estén disponibles. El stock no se
                    descontará ni se actualizará al registrar esta venta.
                  </span>
                </StockWarningMessage>
                <StockWarningActions>
                  <StockWarningButton
                    type="button"
                    $variant="secondary"
                    onClick={() => setShowStockWarning(false)}
                  >
                    Volver a la orden
                  </StockWarningButton>
                  <StockWarningButton
                    type="button"
                    $variant="primary"
                    onClick={() => {
                      confirmedNoStock.current = true;
                      setShowStockWarning(false);
                      void submitForm();
                    }}
                  >
                    Confirmar con cocina
                  </StockWarningButton>
                </StockWarningActions>
              </StockWarningContent>
            </ModalForm>
          </OrderForm>
        );
      }}
    </Formik>
  );
};

export default NewOrder;
