import { createPlainAction } from "../user/userActions";
import { AppThunkAction } from "../../store/store";

export enum RegisterActions {
  SET_PHONE_COUNTRY_CODE = "register/setPhoneCountryCode",
  SET_PHONE_DROP_DOWN_STATE = "register/setPhoneDropDownState",
  SET_PHONE_VALUE = "register/setPhoneValue",
}

export const setPhoneCountryCodeAction = createPlainAction(
  RegisterActions.SET_PHONE_COUNTRY_CODE
);

export const setPhoneDropDownStateAction = createPlainAction(
  RegisterActions.SET_PHONE_DROP_DOWN_STATE
);

export const setPhoneValueAction = createPlainAction(
  RegisterActions.SET_PHONE_VALUE
);

export const hidePhoneDropDownOperation =
  (): AppThunkAction<Promise<void>> => async (dispatch, getState) => {
    dispatch(setPhoneDropDownStateAction(false));
  };

export const displayPhoneDropDownOperation =
  (): AppThunkAction<Promise<void>> => async (dispatch, getState) => {
    dispatch(setPhoneDropDownStateAction(true));
  };
