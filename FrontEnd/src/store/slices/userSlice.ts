import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  isLoginUser: boolean;
  isCheckingSession: boolean;
  mustChangeCredentials: boolean;
}

const initialState: UserState = {
  isLoginUser: false,
  isCheckingSession: true,
  mustChangeCredentials: false,
};

const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    loginUser: (state) => {
      state.isLoginUser = true;
      state.isCheckingSession = false;
    },
    logoutUser: (state) => {
      state.isLoginUser = false;
      state.isCheckingSession = false;
      state.mustChangeCredentials = false;
    },
    setSessionChecking: (state, action: PayloadAction<boolean>) => {
      state.isCheckingSession = action.payload;
    },
    setMustChangeCredentials: (state, action: PayloadAction<boolean>) => {
      state.mustChangeCredentials = action.payload;
    },
  },
});

export const {
  loginUser,
  logoutUser,
  setSessionChecking,
  setMustChangeCredentials,
} = userSlice.actions;

export default userSlice.reducer;
