import type { ICashRegister } from "../../interfaces/CashRegister.ts";

const LINE_WIDTH = 40;

const formatMoney = (value: number | null | undefined): string => {
  return `$${(value ?? 0).toLocaleString("es-AR")}`;
};

const formatDate = (date: string): string => {
  if (!date) return "";

  const dateOnly = date.substring(0, 10);
  const [year, month, day] = dateOnly.split("-");

  if (!year || !month || !day) return "";

  return `${day}/${month}/${year}`;
};

const formatDateTime = (date: string | null | undefined): string => {
  if (!date) return "—";

  const value = date.replace("T", " ");

  return value.substring(0, 16);
};

const formatShift = (shift: ICashRegister["shift"]): string => {
  return shift === "morning" ? "Mañana" : "Noche";
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

export const buildCashTicket = (cashRegister: ICashRegister): string => {
  const difference = cashRegister.difference ?? 0;

  const status =
    cashRegister.status_cash_register === "close" ? "CERRADA" : "ABIERTA";

  const lines: string[] = [];

  // HEADER
  lines.push("=".repeat(LINE_WIDTH));
  lines.push(centerText("BOUTIQUE DE SABORES"));
  lines.push(centerText("CIERRE DE CAJA"));
  lines.push("=".repeat(LINE_WIDTH));

  // DATOS DEL CIERRE
  lines.push(
    line(formatDate(cashRegister.date), formatShift(cashRegister.shift)),
  );

  lines.push(
    line(
      `Apertura: ${formatDateTime(cashRegister.opened_at).substring(11, 16)}`,
      `Cierre: ${formatDateTime(cashRegister.closed_at).substring(11, 16)}`,
    ),
  );

  lines.push("-".repeat(LINE_WIDTH));

  // VENTAS
  lines.push("VENTAS");

  lines.push(line("Ventas totales:", formatMoney(cashRegister.sales_total)));

  lines.push("");

  lines.push(line("Efectivo:", formatMoney(cashRegister.sales_cash)));

  lines.push(line("Transferencia:", formatMoney(cashRegister.sales_transfer)));

  lines.push(line("QR:", formatMoney(cashRegister.sales_qr)));

  lines.push(line("Débito:", formatMoney(cashRegister.sales_debit_card)));

  lines.push("-".repeat(LINE_WIDTH));

  // MOVIMIENTOS
  lines.push("MOVIMIENTOS");

  lines.push(line("Ingresos:", formatMoney(cashRegister.manual_income)));

  lines.push(line("Egresos:", formatMoney(cashRegister.manual_expense)));

  lines.push(
    line("Ingreso efectivo:", formatMoney(cashRegister.manual_income_cash)),
  );

  lines.push(
    line("Egreso efectivo:", formatMoney(cashRegister.manual_expense_cash)),
  );

  lines.push("-".repeat(LINE_WIDTH));

  // CONTROL DE EFECTIVO
  lines.push("CONTROL DE EFECTIVO");

  lines.push(line("Apertura:", formatMoney(cashRegister.opening_amount)));

  lines.push(line("+ Ventas efectivo:", formatMoney(cashRegister.sales_cash)));

  lines.push(
    line("+ Ingreso efectivo:", formatMoney(cashRegister.manual_income_cash)),
  );

  lines.push(
    line("- Egreso efectivo:", formatMoney(cashRegister.manual_expense_cash)),
  );

  lines.push("----------------------------------------");

  lines.push(line("ESPERADO:", formatMoney(cashRegister.expected_amount)));

  lines.push(line("CONTADO:", formatMoney(cashRegister.closing_amount)));

  lines.push(
    line(
      "DIFERENCIA:",
      `${difference > 0 ? "+" : ""}${formatMoney(difference)}`,
    ),
  );

  lines.push("-".repeat(LINE_WIDTH));

  // ESTADO
  lines.push(line("ESTADO:", status));

  lines.push("");

  // FOOTER
  lines.push(centerText("¡Gracias por trabajar"));
  lines.push(centerText("con Boutique de Sabores!"));

  lines.push("=".repeat(LINE_WIDTH));

  return lines.join("\n");
};
