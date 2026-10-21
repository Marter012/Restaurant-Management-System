import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICashRegister } from "../../interfaces/CashRegister.ts";

interface CashRegisterState {
  cashRegister: ICashRegister[];
  loading: boolean;
  error: string | null;
}

const initialState: CashRegisterState = {
  cashRegister: [],
  loading: false,
  error: null,
};

export const cashRegisterSlice = createSlice({
  name: "cashRegister",
  initialState: initialState,
  reducers: {
    setCashRegisters: (state, action: PayloadAction<ICashRegister[]>) => {
      state.cashRegister = action.payload;
    },
    addCashRegister: (state, action: PayloadAction<ICashRegister>) => {
      state.cashRegister.push(action.payload);
    },
    updateCashRegister: (state, action: PayloadAction<ICashRegister>) => {
      const index = state.cashRegister.findIndex(
        (cashRegister) => cashRegister.id === action.payload.id,
      );
      if (index !== -1) {
        state.cashRegister[index] = action.payload;
      }
    },
    setCashRegisterLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setCashRegisterError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCashRegisters,
  addCashRegister,
  updateCashRegister,
  setCashRegisterLoading,
  setCashRegisterError,
} = cashRegisterSlice.actions;

export default cashRegisterSlice.reducer;
