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
const SaleDetailsContent = ({ sale }: { sale: any }) => (
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
        {sale.items.map((item: any) => (
          <SaleItem key={item.id}>
            <SaleItemInfo>
              <strong>{item.name}</strong>
              <small>Cantidad: {item.quantity}</small>
            </SaleItemInfo>
            <SaleItemPrice>
              ${item.subtotal.toLocaleString("es-AR")}
            </SaleItemPrice>
          </SaleItem>
        ))}
      </SaleItems>
    </section>
    <SaleTotal>
      <span>Total de la venta</span>
      <strong>${sale.total_price.toLocaleString("es-AR")}</strong>
    </SaleTotal>
    <SalePaymentInfo>
      <SaleEyebrow>Información del pago</SaleEyebrow>
      <SalePaymentRow>
        <span>
          <strong>Medio:</strong>{" "}
          {sale.method_payment === "cash"
            ? "Efectivo"
            : sale.method_payment === "debit"
              ? "Debito"
              : sale.method_payment === "transfer"
                ? "Transferencia"
                : sale.method_payment === "qr"
                  ? "QR"
                  : "Error"}
        </span>
        <SalePaymentStatus $status={sale.status_payment}>
          {sale.status_payment === "paid"
            ? "Pagado"
            : sale.status_payment === "pending"
              ? "Pendiente"
              : "Cancelado"}
        </SalePaymentStatus>
      </SalePaymentRow>
    </SalePaymentInfo>
  </SaleDetails>
);
export default SaleDetailsContent;
