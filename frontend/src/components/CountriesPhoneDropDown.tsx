import React from "react";
import styled from "@emotion/styled";
import { getCountryCallingCode, CountryCode } from "libphonenumber-js";
import ReactCountryFlag from "react-country-flag";
import { useAppDispatch } from "../store/store";
import {
  hidePhoneDropDownOperation,
  setPhoneCountryCodeAction,
  setPhoneValueAction,
} from "../redux/register/registerActions";
import {
  useCountries,
  usePhoneDropDownState,
} from "../redux/selectors/selectorHooks";
import { CountryInfo } from "../redux/register/registerReducer";
import OutsideClickHandler from "react-outside-click-handler";

export const CountriesPhoneDropDown: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isOpen = usePhoneDropDownState();
  const countries = useCountries();

  const handleCountryChange = (code: string) => {
    dispatch(setPhoneCountryCodeAction(code));
    dispatch(
      setPhoneValueAction(`+${getCountryCallingCode(code as CountryCode)}`)
    );
    dispatch(hidePhoneDropDownOperation());
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (isOpen) {
          dispatch(hidePhoneDropDownOperation());
        }
      }}
    >
      <EWrapper data-display={isOpen}>
        {countries.map((i: CountryInfo, index) => (
          <EListItem
            key={`${i.id}countriesphone`}
            tabIndex={0}
            onClick={() => {
              handleCountryChange(i.id);
            }}
          >
            <ReactCountryFlag
              countryCode={i.id}
              svg
              style={{ height: "22px", width: "25px" }}
            />

            <EElement>{i.name}</EElement>

            <EElement>
              +{`${getCountryCallingCode(i.id as CountryCode)}`}
            </EElement>
          </EListItem>
        ))}
      </EWrapper>
    </OutsideClickHandler>
  );
};

const EWrapper = styled.div`
  max-height: 18.75em;
  overflow: auto;
  z-index: 44;
  position: absolute;
  padding: 0.375em 0;
  margin: 0;
  box-shadow: 0.0625em 0.125em 1.125em rgba(0, 0, 0, 0.25);
  background-color: white;
  width: 100%;
  border-radius: 0.4375em;
  display: none;

  &[data-display="true"] {
    display: block;
  }
`;

const EListItem = styled.div`
  min-height: 2.6875em;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 0.375em;
  font-size: 0.875rem;
  color: #4b5563;
  font-family: Arial, sans-serif;
  :hover {
    background-color: #f1f1f1;
  }
`;

const EElement = styled.div`
  padding-left: 0.25em;
`;
