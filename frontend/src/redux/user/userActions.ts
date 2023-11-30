import { navigate } from "wouter/use-location";
import { AppThunkAction } from "../../store/store";
import { AuthApi, UserApi } from "../../api/api";
import { SigninDto, UserFormValues } from "../../models/models";
import { removeToken, storeToken } from "../../helpers/tokenstorage";
import { usersSlice } from "../users/usersSlice";
import { selectUserId } from "../selectors/selectors";

export enum UserActions {
  LOAD_APP = "user/app/Load",

  LOAD_USER_START = "user/Load/start",
  LOAD_USER_SUCCESS = "user/Load/success",
  LOAD_USER_ERROR = "user/Load/error",

  SET_DISPLAY_MESSAGE = "user/displayMessage",

  REGISTER_USER_START = "user/Register/start",
  REGISTER_USER_SUCCESS = "user/Register/success",
  REGISTER_USER_ERROR = "user/Register/error",

  LOGIN_USER_START = "user/Login/start",
  LOGIN_USER_SUCCESS = "user/Login/success",
  LOGIN_USER_ERROR = "user/Login/error",

  LOGOUT_USER_START = "user/Logout/start",
  LOGOUT_USER_SUCCESS = "user/Logout/success",
  LOGOUT_USER_ERROR = "user/Logout/error",
}

export const createPlainAction = (type) => (payload?) => ({ type, payload });

export const loadAppAction = createPlainAction(UserActions.LOAD_APP);

export const logoutStartAction = createPlainAction(
  UserActions.LOGOUT_USER_START
);
export const logoutSuccessAction = createPlainAction(
  UserActions.LOGOUT_USER_SUCCESS
);
export const logoutErrorAction = createPlainAction(
  UserActions.LOGOUT_USER_ERROR
);

export const loadUserStartAction = createPlainAction(
  UserActions.LOAD_USER_START
);
export const loadUserSuccessAction = createPlainAction(
  UserActions.LOAD_USER_SUCCESS
);
export const loadUserErrorAction = createPlainAction(
  UserActions.LOAD_USER_ERROR
);

export const setDisplayMessageAction = createPlainAction(
  UserActions.SET_DISPLAY_MESSAGE
);

export const registerStartAction = createPlainAction(
  UserActions.REGISTER_USER_START
);
export const registerSuccessAction = createPlainAction(
  UserActions.REGISTER_USER_SUCCESS
);
export const registerErrorAction = createPlainAction(
  UserActions.REGISTER_USER_ERROR
);

export const loginStartAction = createPlainAction(UserActions.LOGIN_USER_START);
export const loginSuccessAction = createPlainAction(
  UserActions.LOGIN_USER_SUCCESS
);
export const loginErrorAction = createPlainAction(UserActions.LOGIN_USER_ERROR);

export const loadAppOperation =
  (): AppThunkAction<Promise<void>> => async (dispatch) => {
    dispatch(loadUserOperation());
  };

export const loadUserOperation =
  (): AppThunkAction<Promise<void>> => async (dispatch) => {
    dispatch(loadUserStartAction());

    try {
      const res = await UserApi.get();
      dispatch(loadUserSuccessAction(res?.data?.id));
      dispatch(usersSlice.actions.addOne(res.data));
    } catch (error: any) {
      removeToken();
      dispatch(usersSlice.actions.removeAll());
      if (error?.response && error?.response?.status === 401) {
        dispatch(setDisplayMessageAction(error?.response?.data?.message));
      }
      dispatch(loadUserErrorAction());
      navigate("/signin");
    }
  };

export const logoutOperation =
  (): AppThunkAction<Promise<void>> => async (dispatch, getState) => {
    removeToken();
    navigate("/signin");
    dispatch(usersSlice.actions.removeAll());
    AuthApi.logout();
  };

export const registerOperation =
  (registerCredentials: UserFormValues): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    dispatch(registerStartAction());

    try {
      const res = await AuthApi.signup(registerCredentials);
      dispatch(registerSuccessAction(res.data));

      const { email, password } = registerCredentials;
      if (email !== undefined && password !== undefined) {
        dispatch(
          loginOperation({
            email,
            password,
          })
        );
      }
    } catch (error: any) {
      dispatch(setDisplayMessageAction(error?.response?.data?.message));

      dispatch(registerErrorAction(error));
    }
  };

export const loginOperation =
  (loginCredentials: SigninDto): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    dispatch(loginStartAction());

    try {
      const res = await AuthApi.login(loginCredentials);

      storeToken(res?.data?.access_token);

      dispatch(loginSuccessAction(res.data));

      await dispatch(loadUserOperation());

      navigate("/");
    } catch (error: any) {
      dispatch(loadUserErrorAction());

      if (error?.message) {
        dispatch(setDisplayMessageAction(error?.response?.data?.message));
        dispatch(loginErrorAction(error?.response?.data?.message));
      }
    }
  };
