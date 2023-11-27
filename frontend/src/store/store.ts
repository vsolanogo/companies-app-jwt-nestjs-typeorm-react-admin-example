import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { UserState, userReducer } from "../redux/user/userReducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  RegisterState,
  registerReducer,
} from "../redux/register/registerReducer";
import { usersSlice } from "../redux/users/usersSlice";
import { companiesSlice } from "../redux/companies/companiesSlice";

export type AppThunkAction<R = void> = ThunkAction<
  R,
  AppStore,
  undefined,
  AnyAction
>;

export interface AppStore {
  user: UserState;
  register: RegisterState;
  users: ReturnType<typeof usersSlice.reducer>;
  companies: ReturnType<typeof companiesSlice.reducer>;
}

export const store = configureStore({
  reducer: {
    user: userReducer,
    register: registerReducer,
    users: usersSlice.reducer,
    companies: companiesSlice.reducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
