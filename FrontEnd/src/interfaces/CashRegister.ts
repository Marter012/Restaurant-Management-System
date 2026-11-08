export type CashRegisterShift = "morning" | "night";

export type CashRegisterStatus = "open" | "close";

export interface ICashRegister {
  id: string;

  date: string;

  shift: CashRegisterShift;

  opened_at: string;

  opening_amount: number;

  // Resumen de ventas
  sales_total?: number;
  sales_cash?: number;
  sales_transfer?: number;
  sales_qr?: number;
  sales_debit_card?: number;

  // Movimientos manuales
  manual_income?: number;
  manual_expense?: number;
  manual_income_cash?: number;
  manual_expense_cash?: number;

  // Cierre de caja
  closed_at?: string | null;

  closing_amount?: number | null;

  expected_amount?: number | null;

  difference?: number | null;

  status_cash_register: CashRegisterStatus;

  status: boolean;
}

export interface ICreateCashRegister {
  date: string;

  shift: CashRegisterShift;

  opened_at?: string;

  opening_amount: number;

  status_cash_register: "open";

  status: boolean;
}

export interface IUpdateCashRegister {
  date?: string;

  shift?: CashRegisterShift;

  opened_at?: string;

  opening_amount?: number;

  closed_at?: string;

  closing_amount?: number;

  status_cash_register?: CashRegisterStatus;

  status?: boolean;
}
export interface CashRegisterFormValues {
  opening_amount?: number;
  closingAmount?: number;
  shift?: "morning" | "night";
}

export interface OpenCashFormProps {
  onSubmit: (openingAmount: number, shift: "morning" | "night") => void;
  onClose: () => void;
}

export interface CloseCashFormProps {
  openingAmount: number;
  onSubmit: (closingAmount: number) => void;
  onClose: () => void;
}
