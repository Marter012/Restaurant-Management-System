export type CashMovementType = "inflow" | "outflow";

export type CashPaymentMethod = "transfer" | "cash" | "debit" | "debit_card" | "mercado_pago" | "qr";

export interface CashMovementFormProps {
  isOpen: boolean;

  type: CashMovementType;

  cashRegisterId: string;

  onClose: () => void;

  onSubmit: (movement: ICreateCashMovement) => Promise<void>;
}
export interface ICashMovement {
  id: string;

  cash_register_id: string;

  order_id: string;

  type: CashMovementType;

  category: string;

  amount: number;

  method_payment: CashPaymentMethod;

  description: string;

  date: string;

  status: boolean;
}

export interface ICreateCashMovement {
  cash_register_id: string;

  order_id?: string;

  type: CashMovementType;

  category: string;

  amount: number;

  method_payment: CashPaymentMethod;

  description: string;

  date?: string;

  status: boolean;
}

export interface IUpdateCashMovement {
  cash_register_id: string;

  order_id?: string;

  type: CashMovementType;

  category: string;

  amount: number;

  method_payment: CashPaymentMethod;

  description: string;

  date?: string;

  status: boolean;
}
