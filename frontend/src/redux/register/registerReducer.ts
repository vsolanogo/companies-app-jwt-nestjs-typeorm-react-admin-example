import { AnyAction } from "redux";
import { RegisterActions } from "./registerActions";
import {
  getCountries,
} from "libphonenumber-js";
import ct from "countries-and-timezones";

const countriesToUse: string[] = getCountries().map((i) => i);

const ctgetall: CountriesObject = ct.getAllCountries();

const countries: CountryInfo[] = Object.keys(ctgetall)
  .map((i) => {
    return {
      name: ctgetall[i].name,
      id: ctgetall[i].id,
    };
  })
  .filter((i) => countriesToUse.includes(i.id))
  .sort((a, b) => a.name.localeCompare(b.name));

export type CountryInfo = {
  id: string;
  name: string;
};

export type CountriesObject = Record<string, CountryInfo>;

export interface RegisterState {
  currentPhoneCountryCode: string;
  countries: CountryInfo[];
  phoneDropDownState: boolean;
  phoneValue: string;
}

export const initialState: RegisterState = {
  currentPhoneCountryCode: "US",
  countries: countries,
  phoneDropDownState: false,
  phoneValue: "+380",
};

export function registerReducer(
  state: RegisterState = initialState,
  action: AnyAction = { type: null, payload: null }
) {
  switch (action.type) {
    case RegisterActions.SET_PHONE_COUNTRY_CODE: {
      return {
        ...state,
        currentPhoneCountryCode: action.payload,
      };
    }

    case RegisterActions.SET_PHONE_DROP_DOWN_STATE: {
      return {
        ...state,
        phoneDropDownState: action.payload,
      };
    }

    case RegisterActions.SET_PHONE_VALUE: {
      return {
        ...state,
        phoneValue: action.payload,
      };
    }

    default:
      return state;
  }
}
