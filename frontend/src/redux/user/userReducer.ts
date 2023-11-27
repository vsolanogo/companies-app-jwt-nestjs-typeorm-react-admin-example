import { AnyAction } from "redux";
import { UserActions } from "./userActions";

export interface UserState {
  displayMessage: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  id: string | null;
}

export const initialState: UserState = {
  displayMessage: null,
  isLoading: false,
  isAuthenticated: false,
  id: null,
};

export function userReducer(
  state: UserState = initialState,
  action: AnyAction = { type: null, payload: null }
) {
  switch (action.type) {
    case UserActions.SET_DISPLAY_MESSAGE: {
      return {
        ...state,
        displayMessage: action.payload,
      };
    }

    case UserActions.LOGIN_USER_START:
      return {
        ...state,
        isLoading: false,
      };

    case UserActions.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case UserActions.LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case UserActions.LOAD_USER_START:
      return {
        ...state,
        id: null,
        isLoading: true,
        isAuthenticated: false,
      };

    case UserActions.LOAD_USER_SUCCESS:
      return {
        ...state,
        id: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };

    case UserActions.LOAD_USER_ERROR:
      return {
        ...state,
        id: null,
        isLoading: false,
        isAuthenticated: false,
      };

    case UserActions.LOGOUT_USER_START:
      return {
        ...state,
        isAuthenticated: false,
        id: null,
        isLoading: true,
      };

    case UserActions.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        id: null,
        isLoading: false,
      };

    case UserActions.LOGOUT_USER_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        id: null,
        isLoading: false,
      };

    case UserActions.REGISTER_USER_START:
      return {
        ...state,
        isLoading: true,
      };

    case UserActions.REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case UserActions.REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
}
