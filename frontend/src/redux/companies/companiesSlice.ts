import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { Company } from "../../models/models";
import {
  CompaniesActions,
  companiesSetSortbyFieldAction,
  companiesSetSortorderTypeAction,
} from "./companiesActions";

const companyAdapter = createEntityAdapter<Company>({
  selectId: (i) => i.id,
});

export type SortByType = "serviceOfActivity" | "name";
export type SortOrderType = "desc" | "asc";

export const getSortOrderEmoji = (order): string => {
  return order === "asc" ? "🔼" : "🔽";
};

export const invertSortOrder = (order: SortOrderType): SortOrderType => {
  return order === "asc" ? "desc" : "asc";
};

export const companiesSlice = createSlice({
  name: "companies",
  initialState: {
    sortByType: "name",
    sortOrderType: "asc",
    isLoading: false,
    ...companyAdapter.getInitialState(),
  },
  reducers: {
    addOne: companyAdapter.addOne,
    upsertOne: companyAdapter.upsertOne,
    addMany: companyAdapter.addMany,
    removeAll: companyAdapter.removeAll,
  },
  extraReducers: (builder) => {
    builder
      .addCase(CompaniesActions.COMPANIES_GET_START, (state) => {
        state.isLoading = true;
      })
      .addCase(CompaniesActions.COMPANIES_GET_SUCCESS, (state) => {
        state.isLoading = false;
      })
      .addCase(CompaniesActions.COMPANIES_GET_ERROR, (state) => {
        state.isLoading = false;
      })
      .addCase(companiesSetSortbyFieldAction, (state, action) => {
        state.sortByType = action.payload;
      })
      .addCase(companiesSetSortorderTypeAction, (state, action) => {
        state.sortOrderType = action.payload;
      })
      .addDefaultCase((state) => state);
  },
});

const companiesgetselectors = companyAdapter.getSelectors();

export const {
  selectIds: selectCompanyIds,
  selectEntities: selectCompanyEntities,
  selectAll: selectAllCompanies,
  selectTotal: selectTotalCompanies,
  selectById: selectCompanyById,
} = companyAdapter.getSelectors();
