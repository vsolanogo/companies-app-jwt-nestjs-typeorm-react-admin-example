import { AppThunkAction } from "../../store/store";
import { CompaniesApi } from "../../api/api";
import { SortByType, SortOrderType, companiesSlice } from "./companiesSlice";
import {
  createPlainAction,
  setDisplayMessageAction,
} from "../user/userActions";
import { createAction } from "@reduxjs/toolkit";
import {
  selectCompaniesSortByType,
  selectCompaniesSortOrderType,
} from "../selectors/selectors";

export enum CompaniesActions {
  COMPANIES_GET_START = "companies/Get/start",
  COMPANIES_GET_SUCCESS = "companies/Get/success",
  COMPANIES_GET_ERROR = "companies/Get/error",

  COMPANIES_SET_SORTBY_FIELD = "companies/Set/stortByField",
  COMPANIES_SET_SORTORDER_TYPE = "companies/Set/stortOrderType",
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

// export const companiesSetSortbyField = createPlainAction(
//   CompaniesActions.COMPANIES_SET_SORTBY_FIELD
// );
// export const companiesSetSortorderType = createPlainAction(
//   CompaniesActions.COMPANIES_SET_SORTORDER_TYPE
// );

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

    dispatch(companiesSlice.actions.removeAll());

    try {
      const res = await CompaniesApi.post({
        sortBy: sortByType,
        sortOrder: sortOrder,
      });

      dispatch(companiesSlice.actions.addMany(res.data));
      dispatch(companiesGetSuccessAction());
    } catch (error: any) {
      if (error?.response && error?.response?.status === 401) {
        dispatch(setDisplayMessageAction(error?.response?.data?.message));
      }
      dispatch(companiesGetErrorAction());
    }
  };
