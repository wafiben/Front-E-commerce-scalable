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
        return rejectWithValue(response.message);
      }

      localStorage.setItem("token", response.token);
      dispatch(singnInLoading(false));
      return response;
    } catch (error: any) {
      dispatch(singnInLoading(false));
      return rejectWithValue(error.message || "Failed to Get Single User."); // ← Changed this
    }
  },
);
