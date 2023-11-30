import React, { useEffect, useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import ReactCountryFlag from "react-country-flag";
import { css } from "@emotion/react";
import {
  SharedButton,
  SharedCard,
  SharedInput,
  FormInputsLayout,
  SharedButtonLikeInput,
  EPhoneBlock,
  ErrorMessage,
  EFieldWrapper,
  InputLabel,
} from "../shared";
import { CountriesPhoneDropDown } from "../CountriesPhoneDropDown";
import { pressOnlyNumbers } from "../../helpers/pressOnlyNumbers";
import { UserFormValues, validateData } from "../../models/models";

interface UserProps {
  id?: string;
  noPassword?: boolean;
  defaultPhone?: string;
  defaultPhoneCountryCode?: string;
  defaultEmail?: string;
  defaultFirstName?: string;
  defaultLastName?: string;
  defaultNickName?: string;
  defaultDescription?: string;
  defaultPosition?: string;
  submitButtonName?: string;
  disableEmail?: boolean;
  disableNickName?: boolean;
  validationSchema: any;
  onSubmit: (formData: UserFormValues) => void;
}

export const UserForm: React.FC<UserProps> = ({
  id,
  noPassword = false,
  defaultPhone = "+380",
  defaultPhoneCountryCode = "UA",
  defaultEmail = "",
  defaultFirstName = "",
  defaultLastName = "",
  defaultNickName = "",
  defaultDescription = "",
  defaultPosition = "",
  submitButtonName = "Register",
  validationSchema,
  onSubmit,
  disableEmail = false,
  disableNickName = false,
}): JSX.Element => {
  const [phone, setPhone] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("");
  const [phoneDropDown, setPhoneDropDown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");

  useEffect(() => {
    setPhone(defaultPhone);
    setPhoneCountryCode(defaultPhoneCountryCode);
    setEmail(defaultEmail);
    setFirstName(defaultFirstName);
    setLastName(defaultLastName);
    setNickName(defaultNickName);
    setDescription(defaultDescription);
    setPosition(defaultPosition);

    const resParse = parsePhoneNumberFromString(defaultPhone ?? "");
    const countryCode = resParse?.country;

    setPhoneCountryCode(countryCode || "UA");
  }, [
    defaultPhone,
    defaultPhoneCountryCode,
    defaultEmail,
    defaultFirstName,
    defaultLastName,
    defaultNickName,
    defaultDescription,
    defaultPosition,
  ]);

  type FormErrors = typeof validationSchema.fields;
  const [signupFormErrors, setSignupFormErrors] = useState<FormErrors>({});

  const handleCountryFlagClick = (e) => {
    setPhoneDropDown(true);
  };

  const handleNumberChange = (e) => {
    let val = "";

    if (e.target.value.length === 0) {
      val = "+";
    } else {
      val = `+${e.target.value.replace(/\+/g, "")}`;
    }

    const resParse = parsePhoneNumberFromString(val);

    if (resParse?.country && resParse?.isValid()) {
      const formatted = resParse.format("INTERNATIONAL");
      setPhone(formatted);
      setPhoneCountryCode(resParse.country);
    } else if (resParse?.country) {
      setPhone(resParse.number);
      setPhoneCountryCode(resParse.country);
    } else if (resParse) {
      setPhone(resParse.number);
    } else {
      setPhone(val);
    }
  };

  const collectPossibleFields = () => {
    const registerData: UserFormValues = {
      id,
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      nickName,
      description,
      position,
      phoneNumber: phone,
    };

    return registerData;
  };

  const validateFields = async () => {
    const errors = await validateData(
      collectPossibleFields(),
      validationSchema
    );

    if (Object.keys(errors).length === 0) {
      setSignupFormErrors({});
    } else {
      setSignupFormErrors(errors);
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = await validateFields();

    if (Object.keys(errors).length === 0) {
      onSubmit(collectPossibleFields());
    }
  };

  return (
    <SharedCard>
      <FormInputsLayout>
        <EFieldWrapper>
          <InputLabel data-display={!!email}>Email</InputLabel>

          <SharedInput
            type="email"
            placeholder="Email"
            onChange={(e) => {
              if (!disableEmail) {
                setEmail(e.target.value);
              }
            }}
            value={email}
            data-iserror={!!signupFormErrors.email}
            data-disabled={disableEmail}
          />

          <ErrorMessage data-iserror={!!signupFormErrors.email}>
            {signupFormErrors.email}
          </ErrorMessage>
        </EFieldWrapper>

        {!noPassword && (
          <>
            <EFieldWrapper>
              <InputLabel data-display={!!password}>Password</InputLabel>

              <SharedInput
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
                data-iserror={!!signupFormErrors.password}
              />

              <ErrorMessage data-iserror={!!signupFormErrors.password}>
                {signupFormErrors.password}
              </ErrorMessage>
            </EFieldWrapper>
            <EFieldWrapper>
              <InputLabel data-display={!!confirmPassword}>
                Confirm password
              </InputLabel>

              <SharedInput
                type="password"
                placeholder="Confirm password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
                data-iserror={!!signupFormErrors.confirmPassword}
              />

              <ErrorMessage data-iserror={!!signupFormErrors.confirmPassword}>
                {signupFormErrors.confirmPassword}
              </ErrorMessage>
            </EFieldWrapper>{" "}
          </>
        )}

        <EPhoneBlock>
          <SharedButtonLikeInput
            onClick={handleCountryFlagClick}
            disabled={phoneDropDown}
          >
            <ReactCountryFlag
              countryCode={phoneCountryCode}
              svg
              style={{ height: "22px", width: "25px" }}
            />
          </SharedButtonLikeInput>

          <EFieldWrapper>
            <InputLabel data-display={!!phone}>Phone number</InputLabel>

            <SharedInput
              type="tel"
              placeholder="Phone number"
              onKeyPress={pressOnlyNumbers}
              onChange={handleNumberChange}
              value={phone}
              data-iserror={!!signupFormErrors.phoneNumber}
            />
          </EFieldWrapper>

          <ErrorMessage data-iserror={!!signupFormErrors.phoneNumber}>
            {signupFormErrors.phoneNumber}
          </ErrorMessage>
        </EPhoneBlock>

        <div
          css={css`
            position: relative;
          `}
        >
          <CountriesPhoneDropDown
            onPhoneValue={setPhone}
            onPhoneCountryCode={setPhoneCountryCode}
            onPhoneDropDown={setPhoneDropDown}
            isOpen={phoneDropDown}
          />
        </div>

        <EFieldWrapper>
          <InputLabel data-display={!!firstName}>First name</InputLabel>

          <SharedInput
            type="text"
            placeholder="First name"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            value={firstName}
            data-iserror={!!signupFormErrors.firstName}
          />

          <ErrorMessage data-iserror={!!signupFormErrors.firstName}>
            {signupFormErrors.firstName}
          </ErrorMessage>
        </EFieldWrapper>

        <EFieldWrapper>
          <InputLabel data-display={!!lastName}>Last name</InputLabel>

          <SharedInput
            type="text"
            placeholder="Last name"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            value={lastName}
            data-iserror={!!signupFormErrors.lastName}
          />
          <ErrorMessage data-iserror={!!signupFormErrors.lastName}>
            {signupFormErrors.lastName}
          </ErrorMessage>
        </EFieldWrapper>

        <EFieldWrapper>
          <InputLabel data-display={!!nickName}>Nickname</InputLabel>

          <SharedInput
            type="text"
            placeholder="Nickname"
            onChange={(e) => {
              if (!disableNickName) {
                setNickName(e.target.value);
              }
            }}
            value={nickName}
            data-iserror={!!signupFormErrors.nickName}
            data-disabled={disableEmail}
          />
          <ErrorMessage data-iserror={!!signupFormErrors.nickName}>
            {signupFormErrors.nickName}
          </ErrorMessage>
        </EFieldWrapper>

        <EFieldWrapper>
          <InputLabel data-display={!!description}>Description</InputLabel>

          <SharedInput
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            as={"textarea"}
            data-iserror={!!signupFormErrors.description}
            css={css`
              min-height: 10em;
            `}
          />
          <ErrorMessage data-iserror={!!signupFormErrors.description}>
            {signupFormErrors.description}
          </ErrorMessage>
        </EFieldWrapper>

        <EFieldWrapper>
          <InputLabel data-display={!!position}>Position</InputLabel>

          <SharedInput
            type="text"
            placeholder="Position"
            onChange={(e) => {
              setPosition(e.target.value);
            }}
            value={position}
            data-iserror={!!signupFormErrors.position}
          />
          <ErrorMessage data-iserror={!!signupFormErrors.position}>
            {signupFormErrors.position}
          </ErrorMessage>
        </EFieldWrapper>

        <SharedButton onClick={handleSubmit}>{submitButtonName}</SharedButton>
      </FormInputsLayout>
    </SharedCard>
  );
};
