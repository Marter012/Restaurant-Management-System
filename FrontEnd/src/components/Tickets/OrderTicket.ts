import type { IOrder, IOrderItem } from "../../interfaces/Order.ts";

const formatMoney = (value: number): string => {
  return `$${value.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

const formatDate = (date: string): string => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("es-AR");
};

const formatTime = (date: string): string => {
  if (!date) return "";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatProductLine = (
  item: IOrderItem,
  width = 40,
): string => {
  const quantity = `${item.quantity} x`;
  const price = formatMoney(item.subtotal);

  let name = item.name || "Producto";

  const availableNameLength =
    width -
    quantity.length -
    price.length -
    4;

  if (name.length > availableNameLength) {
    name =
      name.substring(0, availableNameLength - 3) +
      "...";
  }

  const spaces =
    width -
    quantity.length -
    name.length -
    price.length;

  return (
    quantity +
    " " +
    name +
    " ".repeat(Math.max(2, spaces)) +
    price
  );
};

const getPaymentMethod = (
  method: string,
): string => {
  switch (method) {
    case "cash":
      return "Efectivo";

    case "debit":
      return "Débito";

    case "qr":
      return "QR";

    case "transfer":
      return "Transferencia";

    default:
      return method || "No especificado";
  }
};

const getPaymentStatus = (
  status: string,
): string => {
  switch (status) {
    case "paid":
      return "Pagado";

    case "pending":
      return "Pendiente";

    case "cancelled":
      return "Cancelado";

    default:
      return status || "No especificado";
  }
};

export const buildOrderTicket = (
  order: IOrder,
): string => {
  const width = 40;

  const separator = "-".repeat(width);
  const doubleSeparator = "=".repeat(width);

  const lines: string[] = [];

  lines.push(doubleSeparator);

  lines.push(
    "         BOUTIQUE DE SABORES",
  );

  lines.push(doubleSeparator);

  lines.push(
    `PEDIDO #${String(order.order_number).padStart(
      2,
      "0",
    )}`,
  );

  lines.push(
    `Cliente: ${
      order.customer_name || "Sin nombre"
    }`,
  );

  lines.push(
    `Fecha: ${formatDate(order.created_at)}`,
  );

  lines.push(
    `Hora: ${formatTime(order.created_at)}`,
  );

  lines.push(
    `Retiro: ${
      order.delivery_time || "No especificado"
    }`,
  );

  lines.push(separator);

  lines.push(
    "                 PRODUCTOS",
  );

  lines.push(separator);

  if (!order.items.length) {
    lines.push("Sin productos");
  }

  order.items.forEach((item) => {
    lines.push(
      formatProductLine(item, width),
    );
    if (item.garnish) lines.push(`   Guarnición: ${item.garnish}`);
    if (item.removed_ingredients?.length) {
      lines.push(`   SIN: ${item.removed_ingredients.join(", ")}`);
    }

    /*
     * Si es una promoción y tiene productos
     * seleccionados, también los mostramos.
     */

    if (
      item.item_type === "promotion" &&
      item.promotion_selections?.length
    ) {
      item.promotion_selections.forEach(
        (selection) => {
          lines.push(
            `   • Producto x${selection.quantity}`,
          );
        },
      );
    }
  });

  lines.push(separator);

  const total = formatMoney(
    order.total_price,
  );

  const totalSpaces =
    width -
    "TOTAL".length -
    total.length;

  lines.push(
    "TOTAL" +
      " ".repeat(Math.max(2, totalSpaces)) +
      total,
  );

  lines.push(separator);

  lines.push(
    `Pago: ${getPaymentMethod(
      order.method_payment,
    )}`,
  );

  lines.push(
    `Estado pago: ${getPaymentStatus(
      order.status_payment,
    )}`,
  );

  lines.push(
    `Estado comanda: ${
      order.status ? "Activa" : "Inactiva"
    }`,
  );

  lines.push(separator);

  lines.push(
    "       ¡Gracias por su compra!",
  );

  lines.push("");

  lines.push(doubleSeparator);

  return lines.join("\n");
};
