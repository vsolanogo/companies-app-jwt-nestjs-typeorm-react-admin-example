import React, { useState } from "react";
import { loginOperation } from "../redux/user/userActions";
import { useAppDispatch } from "../store/store";
import {
  EFieldWrapper,
  ErrorMessage,
  FormInputsLayout,
  InputLabel,
  SharedButton,
  SharedCard,
  SharedInput,
} from "./shared";
import { signinValidationSchema, validateData } from "../models/models";

interface SignInFormData {
  email?: string;
  password?: string;
}

export const Login: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signinFormErrors, setSigninFormErrors] = useState<SignInFormData>({});

  const validateFields = async () => {
    const errors = await validateData(
      { email, password },
      signinValidationSchema
    );

    if (Object.keys(errors).length === 0) {
      setSigninFormErrors({});
    } else {
      setSigninFormErrors(errors);
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = await validateFields();

    if (Object.keys(errors).length === 0) {
      dispatch(loginOperation({ email, password }));
    }
  };

  return (
    <SharedCard>
      <FormInputsLayout>
        <EFieldWrapper>
          <InputLabel data-display={!!email}>Email</InputLabel>

          <SharedInput
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            data-iserror={!!signinFormErrors.email}
          />
          <ErrorMessage data-iserror={!!signinFormErrors.email}>
            {signinFormErrors.email}
          </ErrorMessage>
        </EFieldWrapper>

        <EFieldWrapper>
          <InputLabel data-display={!!email}>Password</InputLabel>

          <SharedInput
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            data-iserror={!!signinFormErrors.password}
          />
          <ErrorMessage data-iserror={!!signinFormErrors.password}>
            {signinFormErrors.password}
          </ErrorMessage>
        </EFieldWrapper>

        <SharedButton onClick={handleSubmit}>Login</SharedButton>
      </FormInputsLayout>
    </SharedCard>
  );
};
