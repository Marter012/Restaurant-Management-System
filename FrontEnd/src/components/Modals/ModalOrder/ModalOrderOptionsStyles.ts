import styled from "styled-components";

/* CONTENEDOR */

export const OrderOptions = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.9fr);
  gap: 17px;

  width: 100%;
  height: 100%;
  max-height: 82dvh;
  min-height: 0;
  padding: 0 7px 12px 0;

  overflow-x: hidden;
  overflow-y: auto;

  color: var(--app-order-text);
  scrollbar-width: thin;
  scrollbar-color: var(--app-order-scrollbar) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--app-order-scrollbar);
    border-radius: 10px;
  }

  @media (max-width: 1023px) {
    grid-template-columns: 1fr;
    gap: 13px;
  }

  @media (max-width: 600px) {
    gap: 10px;
    padding: 0 3px 10px;
    max-height: 84dvh;
  }
`;

/* RESUMEN */

export const OrderOverview = styled.div`
  grid-column: 1 / -1;

  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 9px;
  width: 100%;
  margin-top: 10px;

  @media (max-width: 1023px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const OverviewCard = styled.div<{
  $status?: string;
  $tone?: "complete" | "missing" | "active";
}>`
  display: flex;
  align-items: center;
  gap: 9px;

  min-width: 0;
  min-height: 76px;
  padding: 10px;

  background: ${({ $status, $tone }) =>
    $status === "paid"
      ? "var(--app-order-paid-background)"
      : $status === "partially_paid"
        ? "var(--app-order-partial-background)"
        : $status === "pending"
          ? "var(--app-order-pending-background)"
          : $status === "cancelled"
            ? "var(--app-order-cancelled-background)"
            : $tone === "active"
              ? "var(--app-order-status-active-background)"
              : $tone === "complete"
                ? "var(--app-order-paid-background)"
                : $tone === "missing"
                  ? "var(--app-order-cancelled-background)"
                  : "var(--app-order-card)"};

  color: ${({ $status, $tone }) =>
    $status === "paid"
      ? "var(--app-order-paid-text)"
      : $status === "partially_paid"
        ? "var(--app-order-partial-text)"
        : $status === "pending"
          ? "var(--app-order-pending-text)"
          : $status === "cancelled"
            ? "var(--app-order-cancelled-text)"
            : $tone === "active"
              ? "var(--app-order-status-active-text)"
              : $tone === "complete"
                ? "var(--app-order-paid-text)"
                : $tone === "missing"
                  ? "var(--app-order-cancelled-text)"
                  : "var(--app-order-text)"};

  border: 1px solid
    ${({ $status, $tone }) =>
      $status === "paid" || $tone === "complete" || $tone === "active"
        ? "var(--app-order-paid-text)"
        : $status === "cancelled" || $tone === "missing"
          ? "var(--app-order-cancelled-text)"
          : "var(--app-order-border)"};

  border-radius: var(--app-radius);
  box-shadow: var(--app-order-shadow);

  transition:
    background var(--app-transition),
    border-color var(--app-transition),
    box-shadow var(--app-transition),
    transform var(--app-transition);

  &:hover {
    border-color: var(--app-order-border-strong);
    box-shadow: var(--app-order-shadow-hover);
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    min-height: 53px;
    padding: 8px 11px;
  }
`;

export const OverviewIcon = styled.div<{ $type: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 34px;
  height: 34px;

  border-radius: var(--app-radius-sm);
  color: var(--app-order-icon);
  font-size: 1rem;

  background: ${({ $type }) => {
    switch ($type) {
      case "status":
        return "var(--app-order-status-active-background)";
      case "payment":
        return "var(--app-order-payment-default)";
      case "total":
        return "var(--app-order-discount-background)";
      case "date":
        return "var(--app-order-section-header-secondary)";
      default:
        return "var(--app-order-icon-background)";
    }
  }};
`;

export const OverviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  min-width: 0;

  > span {
    color: var(--app-order-muted);
    font-size: 0.7rem;
    font-weight: 650;
  }

  > strong {
    color: var(--app-order-title);
    font-size: 0.83rem;
    font-weight: 800;
    overflow-wrap: anywhere;
  }

  @media (max-width: 600px) {
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    > span {
      font-size: 0.78rem;
    }

    > strong {
      font-size: 0.8rem;
      text-align: right;
    }
  }
`;

/* ESTADOS */

export const OrderStatus = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  padding: 4px 10px;

  border-radius: var(--app-radius-sm);

  background: ${({ $active }) =>
    $active
      ? "var(--app-order-status-active-background)"
      : "var(--app-order-status-inactive-background)"};

  color: ${({ $active }) =>
    $active
      ? "var(--app-order-status-active-text)"
      : "var(--app-order-status-inactive-text)"};

  font-size: 0.73rem;
  font-weight: 800;
`;

export const PaymentStatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  padding: 5px 10px;

  border-radius: var(--app-radius-sm);

  background: ${({ $status }) => {
    switch ($status) {
      case "paid":
        return "var(--app-order-paid-background)";
      case "partial":
        return "var(--app-order-partial-background)";
      case "cancelled":
        return "var(--app-order-cancelled-background)";
      default:
        return "var(--app-order-pending-background)";
    }
  }};

  color: ${({ $status }) => {
    switch ($status) {
      case "paid":
        return "var(--app-order-paid-text)";
      case "partial":
        return "var(--app-order-partial-text)";
      case "cancelled":
        return "var(--app-order-cancelled-text)";
      default:
        return "var(--app-order-pending-text)";
    }
  }};

  font-size: 0.72rem;
  font-weight: 800;
`;

/* SECCIONES */

export const DetailSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;

  min-width: 0;
  padding: 0 11px 12px;

  background: var(--app-order-background);
  border: 1px solid var(--app-order-border);
  border-radius: var(--app-radius);
  box-shadow: var(--app-order-shadow);

  @media (max-width: 600px) {
    gap: 9px;
    padding: 0 9px 10px;
  }
`;

export const SectionHeader = styled.div<{ $secondary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;

  margin: 0 -11px;
  padding: 12px 14px;

  background: ${({ $secondary }) =>
    $secondary
      ? "var(--app-order-section-header-secondary)"
      : "var(--app-order-section-header)"};

  border-bottom: 1px solid var(--app-order-section-border);
  border-radius: ${({ $secondary }) =>
    $secondary ? "0" : "var(--app-radius) var(--app-radius) 0 0"};

  color: var(--app-order-section-text);

  svg {
    flex-shrink: 0;
    color: var(--app-order-icon);
    font-size: 1.1rem;
  }

  h3 {
    margin: 0;
    color: var(--app-order-section-text);
    font-size: 0.98rem;
    font-weight: 800;
  }

  @media (max-width: 600px) {
    margin: 0 -9px;
    padding: 11px;

    h3 {
      font-size: 0.9rem;
    }
  }
`;

/* PRODUCTOS Y EXTRAS */

export const OrderItemList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;

  width: 100%;
  min-width: 0;
`;

export const OrderItemCard = styled.article`
  display: flex;
  align-items: flex-start;
  gap: 12px;

  min-width: 0;
  padding: 11px;

  background: var(--app-order-product-background);
  border: 1px solid var(--app-order-product-border);
  border-radius: var(--app-radius);
  box-shadow: var(--app-order-shadow);

  transition:
    background var(--app-transition),
    border-color var(--app-transition),
    box-shadow var(--app-transition);

  &:hover {
    border-color: var(--app-order-border-strong);
    background: var(--app-order-product-hover);
    box-shadow: var(--app-order-shadow-hover);
  }

  @media (max-width: 600px) {
    gap: 9px;
    padding: 9px;
  }
`;

export const OrderItemImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 72px;
  height: 72px;
  overflow: hidden;

  background: var(--app-order-product-image-background);
  border: 1px solid var(--app-order-border);
  border-radius: var(--app-radius-sm);

  color: var(--app-order-icon-accent);
  font-size: 1.8rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 600px) {
    width: 55px;
    height: 55px;
    font-size: 1.4rem;
  }
`;

export const OrderItemContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;

  min-width: 0;
`;

export const OrderItemHeading = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 9px;

  min-width: 0;

  strong,
  span {
    color: var(--app-order-title);
    font-size: 0.88rem;
    font-weight: 800;
  }

  strong {
    overflow-wrap: anywhere;
  }

  span {
    flex-shrink: 0;
    font-weight: 850;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    strong,
    span {
      font-size: 0.78rem;
    }
  }
`;

/* METADATOS */

export const ItemMetadata = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px 12px;

  color: var(--app-order-text);
  font-size: 0.76rem;

  > span {
    display: inline-flex;
    align-items: center;
    gap: 5px;

    min-width: 0;
    overflow-wrap: anywhere;

    svg {
      flex-shrink: 0;
      color: var(--app-order-icon-accent);
      font-size: 0.85rem;
    }
  }

  > strong {
    color: var(--app-order-title);
    font-size: 0.77rem;
  }

  @media (max-width: 600px) {
    font-size: 0.69rem;

    > span {
      font-size: 0.69rem;
    }
  }
`;

/* INGREDIENTES */

export const ItemChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 5px;
`;

export const ItemChip = styled.span<{ $removed?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  max-width: 100%;
  padding: 5px 9px;

  border-radius: 20px;

  background: ${({ $removed }) =>
    $removed
      ? "var(--app-order-ingredient-removed-background)"
      : "var(--app-order-ingredient-background)"};

  color: ${({ $removed }) =>
    $removed
      ? "var(--app-order-ingredient-removed-text)"
      : "var(--app-order-ingredient-text)"};

  font-size: 0.69rem;
  font-weight: 750;
  overflow-wrap: anywhere;

  @media (max-width: 600px) {
    padding: 4px 7px;
    font-size: 0.65rem;
  }
`;

/* PAGOS */

export const DetailList = styled.div`
  display: flex;
  flex-direction: column;

  min-width: 0;
  padding: 2px 9px;

  background: var(--app-order-payment-background);
  border: 1px solid var(--app-order-payment-border);
  border-radius: var(--app-radius-sm);
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  min-width: 0;
  padding: 11px 4px;

  border-bottom: 1px solid var(--app-order-payment-border);

  &:last-child {
    border-bottom: none;
  }

  > span {
    min-width: 0;
    color: var(--app-order-text);
    font-size: 0.81rem;
    overflow-wrap: anywhere;
  }

  > strong {
    min-width: 0;
    color: var(--app-order-title);
    font-size: 0.83rem;
    font-weight: 800;
    text-align: right;
    overflow-wrap: anywhere;
  }

  .payment-method {
    display: inline-flex;
    align-items: center;
    gap: 9px;
  }

  @media (max-width: 600px) {
    padding: 10px 3px;

    > span,
    > strong {
      font-size: 0.75rem;
    }
  }
`;

export const PaymentIcon = styled.span<{ $type: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  width: 30px;
  height: 30px;

  border-radius: var(--app-radius-sm);
  color: var(--app-order-icon);
  font-size: 0.9rem;

  background: ${({ $type }) => {
    switch ($type) {
      case "cash":
        return "var(--app-order-payment-cash)";
      case "transfer":
        return "var(--app-order-payment-transfer)";
      case "qr":
        return "var(--app-order-payment-qr)";
      case "mercado_pago":
        return "var(--app-order-payment-mercadopago)";
      case "discount":
        return "var(--app-order-discount-background)";
      default:
        return "var(--app-order-payment-default)";
    }
  }};
`;

/* DESCUENTOS Y OBSERVACIONES */

export const DiscountBadge = styled.strong`
  padding: 5px 10px;

  border-radius: var(--app-radius-sm);
  background: var(--app-order-discount-background);
  color: var(--app-order-discount-text);

  font-size: 0.8rem;
  font-weight: 800;
`;

export const ObservationContent = styled.p`
  margin: 0;
  padding: 13px;

  background: var(--app-order-observation-background);
  border: 1px solid var(--app-order-observation-border);
  border-radius: var(--app-radius-sm);

  color: var(--app-order-text);
  font-size: 0.84rem;
  line-height: 1.55;
  overflow-wrap: anywhere;
`;

/* ESTADO VACÍO */

export const EmptyOrderDetail = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 90px;
  padding: 17px;

  background: var(--app-order-card-hover);
  border: 1px dashed var(--app-order-border-strong);
  border-radius: var(--app-radius-sm);

  color: var(--app-order-title);
  font-size: 0.83rem;
  text-align: center;
`;
 