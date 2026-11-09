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

  color: var(--color-text-secondary);
  scrollbar-width: thin;
  scrollbar-color: var(--color-border-strong) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-border-strong);
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
      ? "var(--color-success-soft)"
      : $status === "partially_paid"
        ? "var(--color-partial-soft)"
        : $status === "pending"
          ? "var(--color-pending-soft)"
          : $status === "cancelled"
            ? "var(--color-danger-soft)"
            : $tone === "active"
              ? "var(--color-primary-soft)"
              : $tone === "complete"
                ? "var(--color-success-soft)"
                : $tone === "missing"
                  ? "var(--color-danger-soft)"
                  : "var(--color-surface)"};

  color: ${({ $status, $tone }) =>
    $status === "paid"
      ? "var(--color-success)"
      : $status === "partially_paid"
        ? "var(--color-partial)"
        : $status === "pending"
          ? "var(--color-pending)"
          : $status === "cancelled"
            ? "var(--color-danger)"
            : $tone === "active"
              ? "var(--color-primary)"
              : $tone === "complete"
                ? "var(--color-success)"
                : $tone === "missing"
                  ? "var(--color-danger)"
                  : "var(--color-text-secondary)"};

  border: 1px solid
    ${({ $status, $tone }) =>
      $status === "paid" || $tone === "complete" || $tone === "active"
        ? "var(--color-success)"
        : $status === "cancelled" || $tone === "missing"
          ? "var(--color-danger)"
          : "var(--color-border)"};

  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);

  transition:
    background var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal),
    transform var(--transition-normal);

  &:hover {
    border-color: var(--color-border-strong);
    box-shadow: var(--shadow-md);
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

  border-radius: var(--radius-sm);
  color: var(--color-primary);
  font-size: 1rem;

  background: ${({ $type }) => {
    switch ($type) {
      case "status":
        return "var(--color-primary-soft)";
      case "payment":
        return "var(--color-primary-soft)";
      case "total":
        return "var(--color-primary-soft)";
      case "date":
        return "var(--color-surface-muted)";
      default:
        return "var(--color-surface-muted)";
    }
  }};
`;

export const OverviewContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  min-width: 0;

  > span {
    color: var(--color-text-secondary);
    font-size: 0.7rem;
    font-weight: 650;
  }

  > strong {
    color: var(--color-text);
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

  border-radius: var(--radius-sm);

  background: ${({ $active }) =>
    $active
      ? "var(--color-primary-soft)"
      : "var(--color-surface-muted)"};

  color: ${({ $active }) =>
    $active
      ? "var(--color-primary)"
      : "var(--color-text-secondary)"};

  font-size: 0.73rem;
  font-weight: 800;
`;

export const PaymentStatusBadge = styled.span<{ $status: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: fit-content;
  padding: 5px 10px;

  border-radius: var(--radius-sm);

  background: ${({ $status }) => {
    switch ($status) {
      case "paid":
        return "var(--color-success-soft)";
      case "partial":
        return "var(--color-partial-soft)";
      case "cancelled":
        return "var(--color-danger-soft)";
      default:
        return "var(--color-pending-soft)";
    }
  }};

  color: ${({ $status }) => {
    switch ($status) {
      case "paid":
        return "var(--color-success)";
      case "partial":
        return "var(--color-partial)";
      case "cancelled":
        return "var(--color-danger)";
      default:
        return "var(--color-pending)";
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

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);

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
      ? "var(--color-surface-muted)"
      : "var(--color-primary-soft)"};

  border-bottom: 1px solid var(--color-border);
  border-radius: ${({ $secondary }) =>
    $secondary ? "0" : "var(--radius-md) var(--radius-md) 0 0"};

  color: var(--color-primary);

  svg {
    flex-shrink: 0;
    color: var(--color-primary);
    font-size: 1.1rem;
  }

  h3 {
    margin: 0;
    color: var(--color-primary);
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

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);

  transition:
    background var(--transition-normal),
    border-color var(--transition-normal),
    box-shadow var(--transition-normal);

  &:hover {
    border-color: var(--color-border-strong);
    background: var(--color-surface-hover);
    box-shadow: var(--shadow-md);
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

  background: var(--color-surface-muted);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  color: var(--color-accent);
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
    color: var(--color-text);
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

  color: var(--color-text-secondary);
  font-size: 0.76rem;

  > span {
    display: inline-flex;
    align-items: center;
    gap: 5px;

    min-width: 0;
    overflow-wrap: anywhere;

    svg {
      flex-shrink: 0;
      color: var(--color-accent);
      font-size: 0.85rem;
    }
  }

  > strong {
    color: var(--color-text);
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
      ? "var(--color-danger-soft)"
      : "var(--color-surface-muted)"};

  color: ${({ $removed }) =>
    $removed
      ? "var(--color-danger)"
      : "var(--color-text-secondary)"};

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

  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  min-width: 0;
  padding: 11px 4px;

  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }

  > span {
    min-width: 0;
    color: var(--color-text-secondary);
    font-size: 0.81rem;
    overflow-wrap: anywhere;
  }

  > strong {
    min-width: 0;
    color: var(--color-text);
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

  border-radius: var(--radius-sm);
  color: var(--color-primary);
  font-size: 0.9rem;

  background: ${({ $type }) => {
    switch ($type) {
      case "cash":
        return "var(--color-success-soft)";
      case "transfer":
        return "var(--color-primary-soft)";
      case "qr":
        return "var(--color-primary-soft)";
      case "mercado_pago":
        return "var(--color-primary-soft)";
      case "discount":
        return "var(--color-primary-soft)";
      default:
        return "var(--color-primary-soft)";
    }
  }};
`;

/* DESCUENTOS Y OBSERVACIONES */

export const DiscountBadge = styled.strong`
  padding: 5px 10px;

  border-radius: var(--radius-sm);
  background: var(--color-primary-soft);
  color: var(--color-primary);

  font-size: 0.8rem;
  font-weight: 800;
`;

export const ObservationContent = styled.p`
  margin: 0;
  padding: 13px;

  background: var(--color-surface-hover);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);

  color: var(--color-text-secondary);
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

  background: var(--color-surface-hover);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-sm);

  color: var(--color-text);
  font-size: 0.83rem;
  text-align: center;
`;
 