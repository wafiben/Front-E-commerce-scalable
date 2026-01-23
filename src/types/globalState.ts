import { authState } from "./authState";
import { UserState } from "./userState";

export type GlobalState = {
  userReducer: UserState;
  authReducer: authState;
};
