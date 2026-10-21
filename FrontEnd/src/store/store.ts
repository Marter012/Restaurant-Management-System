import { configureStore } from "@reduxjs/toolkit";
import productsRouter from "./slices/productSlice.ts";
import OrderRouter from "./slices/orderSlice.ts";
import cashRegisterRouter from "./slices/cashRegisterSlice.ts";
import daySelectedRouter from "./slices/daySelectedSlice.ts";
import cashMovementRouter from "./slices/cashMovementSlice.ts";
import promotionRouter from "./slices/promotionSlice.ts";
import printAgentRouter from "./slices/printAgentSlice.ts";
import userRouter from "./slices/userSlice.ts";

export const store = configureStore({
  reducer: {
    daySelected: daySelectedRouter,
    products: productsRouter,
    promotion: promotionRouter,
    orders: OrderRouter,
    cashRegister: cashRegisterRouter,
    cashMovement: cashMovementRouter,
    printAgent: printAgentRouter,
    user: userRouter,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
