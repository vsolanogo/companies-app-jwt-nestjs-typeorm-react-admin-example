import { createSelector } from "reselect";
import { useAppSelector } from "../../store/store";
import {
  selectReduxMainState,
  selectUserState,
  // selectUserEmail,
  selectDisplayMessage,
  selectRegisterState,
  selectCurrentPhoneCountryCode,
  selectCountries,
  selectPhoneValue,
  selectPhoneDropDownState,
  selectIsAuthenticated,
  selectUserId,
  selectUsersState,
  selectCompaniesState,
  selectCompaniesSortByType,
  selectCompaniesSortOrderType,
} from "./selectors";
import { CountryInfo } from "../register/registerReducer";
import {
  selectAllUsers,
  selectTotalUsers,
  selectUserById,
  selectUserEntities,
  selectUserIds,
} from "../users/usersSlice";
import { Company, User } from "../../models/models";
import {
  selectCompanyById,
  selectCompanyIds,
  selectCompanyEntities,
  selectAllCompanies,
  selectTotalCompanies,
  SortOrderType,
} from "../companies/companiesSlice";
import { Dictionary, EntityId } from "@reduxjs/toolkit";

export const useReduxMainState = (): any =>
  useAppSelector(createSelector(selectReduxMainState, (i) => i));

export const useUserState = (): any =>
  useAppSelector(createSelector(selectUserState, (i) => i));

export const useDisplayMessage = (): string =>
  useAppSelector(createSelector(selectDisplayMessage, (i) => i));

export const useIsAuthenticated = (): boolean =>
  useAppSelector(createSelector(selectIsAuthenticated, (i) => i));

export const useUserId = (): string =>
  useAppSelector(createSelector(selectUserId, (i) => i));

// Register

export const useRegisterState = (): any =>
  useAppSelector(createSelector(selectRegisterState, (i) => i));

export const useCurrentPhoneCountryCode = (): string =>
  useAppSelector(createSelector(selectCurrentPhoneCountryCode, (i) => i));

export const useCountries = (): CountryInfo[] =>
  useAppSelector(createSelector(selectCountries, (i) => i));

export const usePhoneValue = (): string =>
  useAppSelector(createSelector(selectPhoneValue, (i) => i));

export const usePhoneDropDownState = (): boolean =>
  useAppSelector(createSelector(selectPhoneDropDownState, (i) => i));

// Users

export const useUserIds = (): EntityId[] =>
  useAppSelector(
    createSelector(selectUsersState, (state) => selectUserIds(state))
  );

export const useUserById = (id: string): User | undefined =>
  useAppSelector(
    createSelector(selectUsersState, (state) => selectUserById(state, id))
  );

export const useUserEntities = (): Dictionary<User> =>
  useAppSelector(
    createSelector(selectUsersState, (state) => selectUserEntities(state))
  );

export const useAllUsers = (): User[] =>
  useAppSelector(
    createSelector(selectUsersState, (state) => selectAllUsers(state))
  );

export const useTotalUsers = (): number =>
  useAppSelector(
    createSelector(selectUsersState, (state) => selectTotalUsers(state))
  );

// Companies

export const useCompanyIds = (): EntityId[] =>
  useAppSelector(
    createSelector(selectCompaniesState, (state) => selectCompanyIds(state))
  );

export const useCompanyEntities = (): Dictionary<Company> =>
  useAppSelector(
    createSelector(selectCompaniesState, (state) =>
      selectCompanyEntities(state)
    )
  );

export const useAllCompanies = (): Company[] =>
  useAppSelector(
    createSelector(selectCompaniesState, (state) => selectAllCompanies(state))
  );

export const useTotalCompanies = (): number =>
  useAppSelector(
    createSelector(selectCompaniesState, (state) => selectTotalCompanies(state))
  );

export const useCompanyById = (id: string): Company | undefined =>
  useAppSelector(
    createSelector(selectCompaniesState, (state) =>
      selectCompanyById(state, id)
    )
  );

export const useCompaniesSortByType = (): string =>
  useAppSelector(createSelector(selectCompaniesSortByType, (i) => i));

export const useCompaniesSortOrderType = (): SortOrderType =>
  useAppSelector(createSelector(selectCompaniesSortOrderType, (i) => i));
