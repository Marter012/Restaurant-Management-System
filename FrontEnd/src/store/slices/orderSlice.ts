import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IOrder } from "../../interfaces/Order.ts";

interface OrderState {
  orders: IOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

const OrderSlice = createSlice({
  name: "orders",
  initialState: initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
    },
    addOrder: (state, action: PayloadAction<IOrder>) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action: PayloadAction<IOrder>) => {
      const index = state.orders.findIndex(
        (order) => order.order_number === action.payload.order_number,
      );
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    },
    setOrderLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setOrderError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setOrders, addOrder, updateOrder, setOrderLoading, setOrderError } =
  OrderSlice.actions;
export default OrderSlice.reducer;
