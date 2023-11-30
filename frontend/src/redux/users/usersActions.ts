import {
  createPlainAction,
  setDisplayMessageAction,
} from "../user/userActions";
import { AppThunkAction } from "../../store/store";
import { UserApi } from "../../api/api";
import { PatchUserValues } from "../../models/models";
import { usersSlice } from "./usersSlice";

export enum UsersActions {
  PATCH_USER_START = "user/Patch/start",
  PATCH_USER_SUCCESS = "user/Patch/success",
  PATCH_USER_ERROR = "user/Patch/error",
}

export const patchUserStartAction = createPlainAction(
  UsersActions.PATCH_USER_START
);

export const patchUserSuccessAction = createPlainAction(
  UsersActions.PATCH_USER_SUCCESS
);

export const patchUserErrorAction = createPlainAction(
  UsersActions.PATCH_USER_ERROR
);

export const patchUserOperation =
  (patchUserDto: PatchUserValues): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    try {
      const res = await UserApi.patch(patchUserDto);
      dispatch(usersSlice.actions.upsertOne(res.data));

      dispatch(setDisplayMessageAction("Success"));
    } catch (error: any) {
      dispatch(setDisplayMessageAction(error?.response?.data?.message));
    }
  };

export const getAllUsersOperation =
  (): AppThunkAction<Promise<void>> => async (dispatch) => {
    try {
      const res = await UserApi.getList();
      dispatch(usersSlice.actions.upsertMany(res.data));
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        dispatch(setDisplayMessageAction(error?.response?.data?.message));
      }
    }
  };

export const getUserAsAdminOperation =
  (id: string): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    try {
      const res = await UserApi.getById(id);
      dispatch(usersSlice.actions.upsertOne(res.data));
    } catch (error: any) {
      dispatch(setDisplayMessageAction(error?.response?.data?.message));
    }
  };
