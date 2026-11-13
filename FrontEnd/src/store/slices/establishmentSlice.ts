import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface EstablishmentState {
  name: string;
  loaded: boolean;
}

const initialState: EstablishmentState = {
  name: "Boutique de Sabores",
  loaded: false,
};

const establishmentSlice = createSlice({
  name: "establishment",
  initialState,
  reducers: {
    setEstablishmentName: (state, action: PayloadAction<string>) => {
      const name = action.payload.trim();
      if (name) state.name = name;
      state.loaded = true;
    },
  },
});

export const { setEstablishmentName } = establishmentSlice.actions;
export default establishmentSlice.reducer;
