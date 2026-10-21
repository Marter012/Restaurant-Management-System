import type { Product } from "../../interfaces/Product.ts";

const LINE_WIDTH = 40;

const formatMoney = (value: number | null | undefined): string => {
  return `$${(value ?? 0).toLocaleString("es-AR")}`;
};

const centerText = (text: string): string => {
  if (text.length >= LINE_WIDTH) {
    return text.substring(0, LINE_WIDTH);
  }

  const spaces = Math.floor((LINE_WIDTH - text.length) / 2);

  return `${" ".repeat(spaces)}${text}`;
};

const line = (left: string, right: string): string => {
  const available = LINE_WIDTH - left.length - right.length;

  if (available < 1) {
    return `${left.substring(0, LINE_WIDTH - right.length - 1)} ${right}`;
  }

  return `${left}${" ".repeat(available)}${right}`;
};

export const buildProductsTicket = (
  products: Product[],
): string => {
  const lines: string[] = [];

  lines.push("=".repeat(LINE_WIDTH));
  lines.push(centerText("BOUTIQUE DE SABORES"));
  lines.push(centerText("LISTADO DE PRODUCTOS"));
  lines.push("=".repeat(LINE_WIDTH));

  lines.push("");

  products.forEach((product) => {
    lines.push(product.name);

    lines.push(
      line(
        `Stock: ${product.quantity}`,
        formatMoney(product.price),
      ),
    );

    lines.push("-".repeat(LINE_WIDTH));
  });

  lines.push("");

  lines.push(centerText("Fin del listado"));

  lines.push("=".repeat(LINE_WIDTH));

  return lines.join("\n");
};