import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { ICashMovement } from "../../interfaces/CashMovements.ts";

interface CashMovementState {
  cashMovements: ICashMovement[];

  loading: boolean;

  error: string | null;
}

const initialState: CashMovementState = {
  cashMovements: [],

  loading: false,

  error: null,
};

export const cashMovementSlice = createSlice({
  name: "cashMovement",

  initialState,

  reducers: {
    setCashMovements: (state, action: PayloadAction<ICashMovement[]>) => {
      state.cashMovements = action.payload;
    },

    addCashMovement: (state, action: PayloadAction<ICashMovement>) => {
      state.cashMovements.push(action.payload);
    },

    setCashMovemenvtLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setCashMovemenvtError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCashMovements,
  addCashMovement,
  setCashMovemenvtLoading,
  setCashMovemenvtError,
} = cashMovementSlice.actions;

export default cashMovementSlice.reducer;
