import { createSlice } from "@reduxjs/toolkit";
import { authState } from "../../types/authState";
import { logIn, singnInLoading } from "./actions";

const initialState: authState = {
  isLoggedIn: false,
  loading: false,
};

export const authSlice = createSlice({
  name: "authReducer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(singnInLoading, (state, action) => {
        state.loading = action.payload; // ← Handle loading state
      })
      .addCase(logIn.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});
