import { createAction } from "@reduxjs/toolkit";
import { navigate } from "wouter/use-location";
import { AppThunkAction } from "../../store/store";
import { CompaniesApi, CompanyApi } from "../../api/api";
import { SortByType, SortOrderType, companiesSlice } from "./companiesSlice";
import {
  createPlainAction,
  setDisplayMessageAction,
} from "../user/userActions";
import {
  selectCompaniesSortByType,
  selectCompaniesSortOrderType,
} from "../selectors/selectors";
import { PatchCompanyFormValues, PostCompanyValues } from "../../models/models";
import { usersSlice } from "../users/usersSlice";

export enum CompaniesActions {
  COMPANIES_GET_START = "companies/Get/start",
  COMPANIES_GET_SUCCESS = "companies/Get/success",
  COMPANIES_GET_ERROR = "companies/Get/error",

  COMPANIES_SET_SORTBY_FIELD = "companies/Set/stortByField",
  COMPANIES_SET_SORTORDER_TYPE = "companies/Set/stortOrderType",

  COMPANIES_POST_START = "companies/Post/start",
  COMPANIES_POST_SUCCESS = "companies/Post/success",
  COMPANIES_POST_ERROR = "companies/Get/error",
}

export const companiesGetStartAction = createPlainAction(
  CompaniesActions.COMPANIES_GET_START
);
export const companiesGetSuccessAction = createPlainAction(
  CompaniesActions.COMPANIES_GET_SUCCESS
);
export const companiesGetErrorAction = createPlainAction(
  CompaniesActions.COMPANIES_GET_ERROR
);
export const companiesSetSortbyFieldAction = createAction<SortByType>(
  CompaniesActions.COMPANIES_SET_SORTBY_FIELD
);
export const companiesSetSortorderTypeAction = createAction<SortOrderType>(
  CompaniesActions.COMPANIES_SET_SORTORDER_TYPE
);

export const getCompaniesOperation =
  (): AppThunkAction<Promise<void>> => async (dispatch, getState) => {
    const state = getState();
    const sortByType = selectCompaniesSortByType(state);
    const sortOrder = selectCompaniesSortOrderType(state);
    dispatch(companiesGetStartAction());

    try {
      const res = await CompaniesApi.post({
        sortBy: sortByType,
        sortOrder: sortOrder,
      });

      dispatch(companiesSlice.actions.removeAll());
      dispatch(companiesSlice.actions.addMany(res.data));
      dispatch(companiesGetSuccessAction());
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        dispatch(setDisplayMessageAction(error?.response?.data?.message));
      }
      dispatch(companiesGetErrorAction());
    }
  };

export const postCompanyOperation =
  (createCompanyData: PostCompanyValues): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    try {
      const res = await CompanyApi.post(createCompanyData);

      dispatch(companiesSlice.actions.addOne(res.data));

      dispatch(setDisplayMessageAction("Success"));

      navigate(`/company/${res.data.id}`);
    } catch (error: any) {
      dispatch(setDisplayMessageAction(error?.response?.data?.message));
    }
  };

export const getCompanyOperation =
  (id: string): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    try {
      const res = await CompanyApi.get(id);
      dispatch(companiesSlice.actions.upsertOne(res.data));
      console.log(res.data);
      dispatch(usersSlice.actions.upsertOne(res.data.user));
      console.log(res.data.user);
    } catch (error: any) {
      dispatch(setDisplayMessageAction(error?.response?.data?.message));
    }
  };

export const patchCompanyOperation =
  (patchCompanyData: PatchCompanyFormValues): AppThunkAction<Promise<void>> =>
  async (dispatch) => {
    try {
      const res = await CompanyApi.patch(patchCompanyData);

      dispatch(companiesSlice.actions.upsertOne(res.data));

      dispatch(setDisplayMessageAction("Success"));
    } catch (error: any) {
      dispatch(setDisplayMessageAction(error?.response?.data?.message));
    }
  };
