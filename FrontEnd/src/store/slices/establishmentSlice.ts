import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface EstablishmentState {
  name: string;
  logo: string | null;
  loaded: boolean;
}

const initialState: EstablishmentState = {
  name: "Boutique de Sabores",
  logo: null,
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
    setEstablishmentLogo: (state, action: PayloadAction<string | null>) => {
      state.logo = action.payload;
      state.loaded = true;
    },
  },
});

export const { setEstablishmentName, setEstablishmentLogo } = establishmentSlice.actions;
export default establishmentSlice.reducer;
