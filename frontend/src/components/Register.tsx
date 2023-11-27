import React, { useState } from "react";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import ReactCountryFlag from "react-country-flag";
import { css } from "@emotion/react";
import { useAppDispatch } from "../store/store";
import { registerOperation } from "../redux/user/userActions";
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
} from "./shared";
import { CountriesPhoneDropDown } from "./CountriesPhoneDropDown";
import {
  setPhoneCountryCodeAction,
  setPhoneValueAction,
  displayPhoneDropDownOperation,
} from "../redux/register/registerActions";
import {
  useCurrentPhoneCountryCode,
  usePhoneDropDownState,
  usePhoneValue,
} from "../redux/selectors/selectorHooks";
import { pressOnlyNumbers } from "../helpers/pressOnlyNumbers";
import {
  SignupFormErrors,
  SignupFormValues,
  signUpValidationSchema,
} from "../models/models";

async function validateData(data) {
  try {
    await signUpValidationSchema.validate(data, { abortEarly: false });
    return {}; // No validation errors
  } catch (validationError: any) {
    // Format errors as an object with field names
    const errors = {};
    validationError?.inner.forEach((error) => {
      if (!errors[error.path]) {
        errors[error.path] = error.message;
      }
    });
    return errors;
  }
}

export const Register: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const phone = usePhoneValue();
  const currentCountryCode = useCurrentPhoneCountryCode();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickName, setNickName] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [signupFormErrors, setSignupFormErrors] = useState<SignupFormErrors>(
    {}
  );
  const phoneDropDownIsOpen = usePhoneDropDownState();

  const handleCountryFlagClick = (e) => {
    dispatch(displayPhoneDropDownOperation());
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
      dispatch(setPhoneValueAction(formatted));
      dispatch(setPhoneCountryCodeAction(resParse.country));
    } else if (resParse?.country) {
      dispatch(setPhoneValueAction(resParse.number));
      dispatch(setPhoneCountryCodeAction(resParse.country));
    } else if (resParse) {
      dispatch(setPhoneValueAction(resParse.number));
      dispatch(setPhoneCountryCodeAction(currentCountryCode));
    } else {
      dispatch(setPhoneValueAction(val));
      dispatch(setPhoneCountryCodeAction(currentCountryCode));
    }
  };

  const getRegisterData = () => {
    const registerData: SignupFormValues = {
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
    const errors = await validateData(getRegisterData());

    if (Object.keys(errors).length === 0) {
      setSignupFormErrors({});
    } else {
      setSignupFormErrors(errors);
    }

    return errors;
  };

  const handleRegister = async () => {
    const errors = await validateFields();

    console.log({errors})

    if (Object.keys(errors).length === 0) {
      dispatch(registerOperation(getRegisterData()));
    }
  };


  console.log({signupFormErrors})
  return (
    <SharedCard>
      <FormInputsLayout>
        <EFieldWrapper>
          <InputLabel data-display={!!email}>Email</InputLabel>

          <SharedInput
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            data-iserror={!!signupFormErrors.email}
          />

          <ErrorMessage data-iserror={!!signupFormErrors.email}>
            {signupFormErrors.email}
          </ErrorMessage>
        </EFieldWrapper>

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
        </EFieldWrapper>

        <EPhoneBlock>
          <SharedButtonLikeInput
            onClick={handleCountryFlagClick}
            disabled={phoneDropDownIsOpen}
          >
            <ReactCountryFlag
              countryCode={currentCountryCode}
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
          <CountriesPhoneDropDown />
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
              setNickName(e.target.value);
            }}
            value={nickName}
            data-iserror={!!signupFormErrors.nickName}
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

        <SharedButton onClick={handleRegister}>Register</SharedButton>
      </FormInputsLayout>
    </SharedCard>
  );
};
