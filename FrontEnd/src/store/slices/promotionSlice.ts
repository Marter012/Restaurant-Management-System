import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Promotion } from "../../interfaces/Promotion";

interface PromotionState {
  promotions: Promotion[];
  loading: boolean;
  error: string | null;
}

const initialState: PromotionState = {
  promotions: [],
  loading: false,
  error: null,
};

const promotionSlice = createSlice({
  name: "promotions",

  initialState,

  reducers: {
    setPromotions: (
      state,
      action: PayloadAction<Promotion[]>,
    ) => {
      state.promotions = action.payload;
    },

    addPromotion: (
      state,
      action: PayloadAction<Promotion>,
    ) => {
      state.promotions.push(action.payload);
    },

    updatePromotion: (
      state,
      action: PayloadAction<Promotion>,
    ) => {
      const index = state.promotions.findIndex(
        (promotion) => promotion.id === action.payload.id,
      );

      if (index !== -1) {
        state.promotions[index] = action.payload;
      }
    },

    setPromotionLoading: (
      state,
      action: PayloadAction<boolean>,
    ) => {
      state.loading = action.payload;
    },

    setPromotionError: (
      state,
      action: PayloadAction<string | null>,
    ) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPromotions,
  addPromotion,
  updatePromotion,
  setPromotionLoading,
  setPromotionError,
} = promotionSlice.actions;

export default promotionSlice.reducer;