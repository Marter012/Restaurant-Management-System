import {
  SaleDetails,
  SaleCustomer,
  SaleCustomerAvatar,
  SaleCustomerInfo,
  SaleEyebrow,
  SaleSectionTitle,
  SaleItems,
  SaleItem,
  SaleItemInfo,
  SaleItemPrice,
  SaleTotal,
  SalePaymentInfo,
  SalePaymentRow,
  SalePaymentStatus,
} from "../../../CashDay/CashDayStyles.ts";

interface Props {
  sale: any;
}

const SaleDetailsContent = ({ sale }: Props) => {
  const methodLabels: Record<string, string> = {
    cash: "Efectivo",
    debit: "Débito",
    debit_card: "Tarjeta de débito",
    transfer: "Transferencia",
    qr: "QR",
    mercado_pago: "Mercado Pago",
    credit_card: "Tarjeta de crédito",
    pending: "Pendiente",
  };

  const payments = Array.isArray(sale.payments) ? sale.payments : [];

  const paymentStatus = () => {
    switch (sale.status_payment) {
      case "paid":
        return "Pagado";
      case "pending":
        return "Pendiente";
      case "cancelled":
        return "Cancelado";
      case "partially_paid":
        return "Pago parcial";
      default:
        return "Estado desconocido";
    }
  };

  const getMethodLabel = (method: string) =>
    methodLabels[method] ?? method ?? "Sin especificar";

  const totalAmount = Number(
    sale.total_price ?? sale.total_amount ?? sale.total ?? 0,
  );

  return (
    <SaleDetails>
      <SaleCustomer>
        <SaleCustomerAvatar>
          {(sale.customer_name || "S").charAt(0).toUpperCase()}
        </SaleCustomerAvatar>

        <SaleCustomerInfo>
          <SaleEyebrow>Cliente</SaleEyebrow>
          <strong>{sale.customer_name || "Sin nombre"}</strong>
        </SaleCustomerInfo>
      </SaleCustomer>

      <section>
        <SaleSectionTitle>Detalle de la venta</SaleSectionTitle>

        <SaleItems>
          {(sale.items || []).map((item: any, index: number) => (
            <SaleItem key={item.id ?? item.product_id ?? index}>
              <SaleItemInfo>
                <strong>{item.name}</strong>
                <small>Cantidad: {item.quantity}</small>
              </SaleItemInfo>

              <SaleItemPrice>
                ${(Number(item.subtotal) || 0).toLocaleString("es-AR")}
              </SaleItemPrice>
            </SaleItem>
          ))}
        </SaleItems>
      </section>

      <SaleTotal>
        <span>Total de la venta</span>
        <strong>${totalAmount.toLocaleString("es-AR")}</strong>
      </SaleTotal>

      <SalePaymentInfo>
        <SaleEyebrow>Información del pago</SaleEyebrow>

        {payments.length > 0 ? (
          payments.map((payment: any, index: number) => (
            <SalePaymentRow key={`${payment.method_payment}-${index}`}>
              <span>
                <strong>{getMethodLabel(payment.method_payment)}</strong>
              </span>

              <strong>
                ${(Number(payment.amount) || 0).toLocaleString("es-AR")}
              </strong>
            </SalePaymentRow>
          ))
        ) : (
          <SalePaymentRow>
            <span>
              <strong>Medio:</strong> {getMethodLabel(sale.method_payment)}
            </span>
          </SalePaymentRow>
        )}

        <SalePaymentRow>
          <span>
            <strong>Estado:</strong>
          </span>

          <SalePaymentStatus $status={sale.status_payment}>
            {sale.status_payment === "paid"
              ? "Pagado"
              : sale.status_payment === "pending"
                ? "Pendiente"
                : sale.status_payment === "partially_paid"
                  ? "Parcial"
                  : sale.status_payment === "cancelled"
                    ? "Cancelado"
                    : "Desconocido"}
          </SalePaymentStatus>
        </SalePaymentRow>
      </SalePaymentInfo>
    </SaleDetails>
  );
};

export default SaleDetailsContent;
