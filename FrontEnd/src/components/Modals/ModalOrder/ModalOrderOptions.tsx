import {
  FaCalendarAlt,
  FaUser,
  FaCoins,
  FaCheckCircle,
  FaCreditCard,
  FaTruck,
  FaBoxOpen,
  FaWallet,
  FaPlusCircle,
  FaCommentDots,
  FaMoneyBillWave,
  FaExchangeAlt,
  FaQrcode,
  FaPercentage,
  FaUtensils,
  FaHamburger,
  FaGlassWhiskey,
  FaGift,
} from "react-icons/fa";

import type { IOrder } from "../../../interfaces/Order.ts";

import {
  OrderOptions,
  OrderOverview,
  OverviewCard,
  OverviewIcon,
  OverviewContent,
  OrderStatus,
  PaymentStatusBadge,
  DetailSection,
  SectionHeader,
  OrderItemList,
  OrderItemCard,
  OrderItemImage,
  OrderItemContent,
  OrderItemHeading,
  ItemMetadata,
  ItemChips,
  ItemChip,
  DetailList,
  DetailRow,
  PaymentIcon,
  EmptyOrderDetail,
  ObservationContent,
  DiscountBadge,
} from "./ModalOrderOptionsStyles.ts";

import { getDateOnly } from "../../Utils/Formats.tsx";

interface Props {
  order: IOrder | null;
  onClose?: () => void;
}

const money = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);

const paymentNames: Record<string, string> = {
  cash: "Efectivo",
  transfer: "Transferencia",
  qr: "QR",
  debit: "Débito",
  debit_card: "Débito",
  pending: "Pendiente",
};

const paymentIcons = {
  cash: <FaMoneyBillWave />,
  transfer: <FaExchangeAlt />,
  qr: <FaQrcode />,
  debit: <FaCreditCard />,
  debit_card: <FaCreditCard />,
  mercado_pago: <FaWallet />,
};

const paymentStatusNames: Record<string, string> = {
  paid: "Pagada",
  pending: "Pendiente",
  partially_paid: "Pago parcial",
  cancelled: "Cancelada",
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "paid":
      return "paid";
    case "partially_paid":
      return "partial";
    case "pending":
      return "pending";
    case "cancelled":
      return "cancelled";
    default:
      return "pending";
  }
};

export default function ModalOrderOptions({ order }: Props) {
  if (!order) return null;

  const payments = order.payments?.length
    ? order.payments
    : order.method_payment && order.method_payment !== "pending"
      ? [
          {
            method_payment: order.method_payment,
            amount: order.total_price,
          },
        ]
      : [];
  const extraItems = order.extra_items ?? [];
  const createdAt = order.created_at
    ? getDateOnly(order.created_at)
    : "—";

  return (
    <OrderOptions>
      <OrderOverview>
        <OverviewCard $tone={order.customer_name?.trim() ? "complete" : "missing"}>
          <OverviewIcon $type="customer">
            <FaUser />
          </OverviewIcon>
          <OverviewContent>
            <span>Cliente</span>
            <strong>{order.customer_name || "Sin nombre"}</strong>
          </OverviewContent>
        </OverviewCard>

        <OverviewCard $tone={Number(order.total_price) > 0 ? "complete" : "missing"}>
          <OverviewIcon $type="total">
            <FaCoins />
          </OverviewIcon>
          <OverviewContent>
            <span>Total</span>
            <strong>{money(order.total_price)}</strong>
          </OverviewContent>
        </OverviewCard>

        <OverviewCard $tone={order.status ? "active" : "missing"}>
          <OverviewIcon $type="status">
            <FaCheckCircle />
          </OverviewIcon>
          <OverviewContent>
            <span>Estado</span>
            <OrderStatus $active={order.status}>
              {order.status ? "Activa" : "Inactiva"}
            </OrderStatus>
          </OverviewContent>
        </OverviewCard>

        <OverviewCard $status={order.status_payment} $tone={!order.status_payment ? "missing" : undefined}>
          <OverviewIcon $type="payment">
            <FaCreditCard />
          </OverviewIcon>
          <OverviewContent >
            <span>Pago</span>
            <PaymentStatusBadge
              $status={getPaymentStatusColor(order.status_payment)}
            >
              {paymentStatusNames[order.status_payment] ??
                order.status_payment}
            </PaymentStatusBadge>
          </OverviewContent>
        </OverviewCard>

        <OverviewCard $tone={order.delivery_time?.trim() ? "complete" : "missing"}>
          <OverviewIcon $type="delivery">
            <FaTruck />
          </OverviewIcon>
          <OverviewContent>
            <span>Entrega</span>
            <strong>
              {order.delivery_time || "Sin especificar"}
            </strong>
          </OverviewContent>
        </OverviewCard>

        <OverviewCard $tone={createdAt !== "—" ? "complete" : "missing"}>
          <OverviewIcon $type="date">
            <FaCalendarAlt />
          </OverviewIcon>
          <OverviewContent>
            <span>Creada</span>
            <strong>{createdAt}</strong>
          </OverviewContent>
        </OverviewCard>
      </OrderOverview>

      <DetailSection>
        <SectionHeader>
          <FaBoxOpen />
          <h3>Productos de la comanda</h3>
        </SectionHeader>

        {order.items?.length ? (
          <OrderItemList>
            {order.items.map((item, index) => {
              const extendedItem = item as typeof item & {
                image?: string;
                image_url?: string;
                product_image?: string;
              };

              const productImage =
                extendedItem.image_url ??
                extendedItem.image ??
                extendedItem.product_image;

              const isPromotion = item.item_type === "promotion";

              return (
                <OrderItemCard key={item.id ?? index}>
                  <OrderItemImage>
                    {productImage ? (
                      <img
                        src={productImage}
                        alt={item.name || "Producto"}
                      />
                    ) : isPromotion ? (
                      <FaGift />
                    ) : (
                      <FaHamburger />
                    )}
                  </OrderItemImage>

                  <OrderItemContent>
                    <OrderItemHeading>
                      <strong>
                        {item.name ||
                          (isPromotion ? "Promoción" : "Producto")}
                      </strong>
                      <span>
                        {money(
                          item.subtotal ??
                            item.unit_price * item.quantity,
                        )}
                      </span>
                    </OrderItemHeading>

                    <ItemMetadata>
                      <span>
                        <FaUtensils />
                        {item.quantity}{" "}
                        {item.quantity === 1 ? "unidad" : "unidades"}
                      </span>
                      <span>
                        Unitario: {money(item.unit_price)}
                      </span>
                    </ItemMetadata>

                    {item.garnish && (
                      <ItemMetadata>
                        <span>
                          <FaUtensils />
                          Guarnición: {item.garnish}
                        </span>
                      </ItemMetadata>
                    )}

                    {(item.ingredients?.length ||
                      item.removed_ingredients?.length) ? (
                      <ItemChips>
                        {(item.ingredients ?? [])
                          .filter(
                            (ingredient) =>
                              !(item.removed_ingredients ?? []).includes(
                                ingredient,
                              ),
                          )
                          .map((ingredient) => (
                            <ItemChip
                              key={`ingredient-${item.id}-${ingredient}`}
                            >
                              {ingredient}
                            </ItemChip>
                          ))}

                        {(item.removed_ingredients ?? []).map(
                          (ingredient) => (
                            <ItemChip
                              key={`removed-${item.id}-${ingredient}`}
                              $removed
                            >
                              Sin {ingredient}
                            </ItemChip>
                          ),
                        )}
                      </ItemChips>
                    ) : null}

                    {item.promotion_selections?.length ? (
                      <ItemMetadata>
                        <strong>Selecciones:</strong>
                        {item.promotion_selections.map(
                          (selection, selectionIndex) => (
                            <span
                              key={`${item.id}-selection-${selectionIndex}`}
                            >
                              {selection.product_name ??
                                selection.name ??
                                selection.product_id}
                              {" "}× {selection.quantity}
                            </span>
                          ),
                        )}
                      </ItemMetadata>
                    ) : null}
                  </OrderItemContent>
                </OrderItemCard>
              );
            })}
          </OrderItemList>
        ) : (
          <EmptyOrderDetail>
            Esta comanda no tiene productos registrados.
          </EmptyOrderDetail>
        )}

        {extraItems.length > 0 && (
          <>
            <SectionHeader $secondary>
              <FaPlusCircle />
              <h3>Extras</h3>
            </SectionHeader>

            <OrderItemList>
              {extraItems.map((extra, index) => {
                const extendedExtra = extra as typeof extra & {
                  image?: string;
                  image_url?: string;
                };

                const extraImage =
                  extendedExtra.image_url ?? extendedExtra.image;

                return (
                  <OrderItemCard key={`${extra.name}-${index}`}>
                    <OrderItemImage>
                      {extraImage ? (
                        <img src={extraImage} alt={extra.name} />
                      ) : (
                        <FaGlassWhiskey />
                      )}
                    </OrderItemImage>

                    <OrderItemContent>
                      <OrderItemHeading>
                        <strong>{extra.name}</strong>
                        <span>
                          {money(extra.price * extra.quantity)}
                        </span>
                      </OrderItemHeading>

                      <ItemMetadata>
                        <span>
                          {extra.quantity} × {money(extra.price)}
                        </span>
                      </ItemMetadata>
                    </OrderItemContent>
                  </OrderItemCard>
                );
              })}
            </OrderItemList>
          </>
        )}
      </DetailSection>

      <DetailSection>
        <SectionHeader>
          <FaWallet />
          <h3>Información y pagos</h3>
        </SectionHeader>

        <DetailList>
          <DetailRow>
            <span>Métodos de pago</span>
            <strong>
              {payments.length
                ? payments
                    .map(
                      (payment) =>
                        paymentNames[payment.method_payment] ??
                        payment.method_payment,
                    )
                    .join(" + ")
                : "Sin pagos registrados"}
            </strong>
          </DetailRow>

          {payments.map((payment, index) => (
            <DetailRow
              key={`${payment.method_payment}-${index}`}
            >
              <span className="payment-method">
                <PaymentIcon $type={payment.method_payment}>
                  {paymentIcons[
                    payment.method_payment as keyof typeof paymentIcons
                  ] ?? <FaCreditCard />}
                </PaymentIcon>
                {paymentNames[payment.method_payment] ??
                  payment.method_payment}
              </span>
              <strong>{money(payment.amount)}</strong>
            </DetailRow>
          ))}

          {order.discount_value ? (
            <DetailRow>
              <span className="payment-method">
                <PaymentIcon $type="discount">
                  <FaPercentage />
                </PaymentIcon>
                Descuento
              </span>
              <DiscountBadge>
                {order.discount_type === "percent"
                  ? `${order.discount_value}%`
                  : money(order.discount_value)}
              </DiscountBadge>
            </DetailRow>
          ) : null}

          <DetailRow>
            <span className="payment-method">
              <PaymentIcon $type="date">
                <FaCalendarAlt />
              </PaymentIcon>
              Fecha de creación
            </span>
            <strong>{createdAt}</strong>
          </DetailRow>
        </DetailList>

        {order.observations ? (
          <>
            <SectionHeader $secondary>
              <FaCommentDots />
              <h3>Observaciones</h3>
            </SectionHeader>
            <ObservationContent>
              {order.observations}
            </ObservationContent>
          </>
        ) : null}
      </DetailSection>
    </OrderOptions>
  );
}
