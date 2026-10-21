import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Product } from "../../interfaces/Product.ts";

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },

    addProduct: (state, action: PayloadAction<Product>) => {
      state.products.push(action.payload);
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id,
      );

      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },

    setProductLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setProductError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, addProduct, updateProduct, setProductLoading, setProductError } =
  productSlice.actions;

export default productSlice.reducer;
