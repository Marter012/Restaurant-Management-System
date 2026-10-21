import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  isLoginUser: boolean;
  isCheckingSession: boolean;
}

const initialState: UserState = {
  isLoginUser: false,
  isCheckingSession: true,
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
    },

    setSessionChecking: (state, action: { payload: boolean }) => {
      state.isCheckingSession = action.payload;
    },
  },
});

export const {
  loginUser,
  logoutUser,
  setSessionChecking,
} = userSlice.actions;

export default userSlice.reducer;