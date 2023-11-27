export const selectReduxMainState = (state) => state ?? null;

export const selectUserState = (state) => state?.user ?? null;

export const selectDisplayMessage = (state) => {
  return selectUserState(state)?.displayMessage ?? null;
};

export const selectIsAuthenticated = (state) => {
  return selectUserState(state)?.isAuthenticated ?? false;
};

export const selectUserId = (state) => {
  return selectUserState(state)?.id ?? null;
};

// Register

export const selectRegisterState = (state) => state?.register ?? null;

export const selectCurrentPhoneCountryCode = (state) =>
  selectRegisterState(state)?.currentPhoneCountryCode ?? null;

export const selectCountries = (state) =>
  selectRegisterState(state)?.countries ?? [];

export const selectPhoneValue = (state) =>
  selectRegisterState(state)?.phoneValue ?? null;

export const selectPhoneDropDownState = (state) =>
  selectRegisterState(state)?.phoneDropDownState ?? false;

// Users

export const selectUsersState = (state) => state?.users;

// Companies

export const selectCompaniesState = (state) => state?.companies;

export const selectCompaniesSortByType = (state) => {
  return selectCompaniesState(state)?.sortByType;
};

export const selectCompaniesSortOrderType = (state) => {
  return selectCompaniesState(state)?.sortOrderType;
};



// sortByType: 'name' as SortByType,
// sortOrderType: 'asc' as SortOrderType,

// export const select = (state) => {
//   return selectUserState(state)?.isAuthenticated ?? false;
// };
