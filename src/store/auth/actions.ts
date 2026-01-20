import { createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { LOG_IN_LOADING } from "../constants";
import { singnIn } from "../../api/user/user";
import { UserDto } from "../../types/userDto";

export const singnInLoading: any = createAction(LOG_IN_LOADING);

export const logIn: any = createAsyncThunk(
  singnInLoading,
  async (userInfo: UserDto, { dispatch, rejectWithValue }) => {
    try {
      dispatch(singnInLoading(true));
      const response = await singnIn(userInfo);
      if (response.status !== 200) {
        dispatch(singnInLoading(false));
        return rejectWithValue(response.message); // ← Use rejectWithValue for errors
      }
      localStorage.setItem("token", response.token);
      dispatch(singnInLoading(false));
      return response;
    } catch (error: any) {
      throw new Error("Failed to Get Single User.");
    } finally {
      dispatch(singnInLoading(false));
    }
  },
);
