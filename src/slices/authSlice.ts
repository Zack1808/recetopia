import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, User } from "../interfaces/states";

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registration: (state: AuthState, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state: AuthState) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { registration, logout } = authSlice.actions;
export default authSlice.reducer;
