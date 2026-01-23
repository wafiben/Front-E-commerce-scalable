import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserFreelancer,
  createUserLoading,
  deleteUser,
  deleteUserLoading,
  getAllUsers,
  getAllUsersLoading,
  getOneUser,
  getSingleUserLoading,
  modifySingleUser,
  modifyUserLoading,
  getMe,
  getMeLoading,
} from "./actions";
import { UserState } from "../../types/userState";

const initialState: UserState = {
  users: [],
  id: null,
  loading: false,
  letter: "",
  age: 100,
  user: null,
  currentUser: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      console.log(action.payload);
      state.users = action.payload.users ?? action.payload;
      state.loading = false;
    });
    builder.addCase(getOneUser.fulfilled, (state: any, action) => {
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    });
    builder.addCase(
      getSingleUserLoading,
      (state: any, action: PayloadAction<boolean>) => {
        return {
          ...state,
          loading: true,
        };
      },
    );

    builder.addCase(deleteUser.fulfilled, (state: any, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(
      deleteUserLoading,
      (state: any, action: PayloadAction<boolean>) => {
        return {
          ...state,
          loading: true,
        };
      },
    );

    builder.addCase(createUserFreelancer.fulfilled, (state: any, action) => {
      return {
        ...state,
        id: action.payload,
        loading: false,
      };
    });
    builder.addCase(
      createUserLoading,
      (state: any, action: PayloadAction<boolean>) => {
        return {
          ...state,
          loading: true,
        };
      },
    );

    builder.addCase(modifySingleUser.fulfilled, (state: any, action) => {
      return {
        ...state,
        loading: false,
      };
    });
    builder.addCase(
      modifyUserLoading,
      (state: any, action: PayloadAction<boolean>) => {
        return {
          ...state,
          loading: true,
        };
      },
    );

    builder.addCase(
      getAllUsersLoading,
      (state, action: PayloadAction<boolean>) => {
        console.log("Loading users...");
        return {
          ...state,
          loading: true,
        };
      },
    );

    builder.addCase(getMe.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    });

    builder.addCase(getMe.rejected, (state, action) => {
      state.currentUser = null;
      state.loading = false;
    });

    builder.addCase(getMeLoading, (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        loading: action.payload,
      };
    });
  },
});
