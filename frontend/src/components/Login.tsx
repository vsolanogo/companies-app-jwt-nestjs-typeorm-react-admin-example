import React, { useState } from "react";
import {
  setDisplayMessageAction,
  loginOperation,
} from "../redux/user/userActions";
import { useAppDispatch } from "../store/store";
import { validateEmail } from "../helpers/validateEmail";
import {
  FormInputsLayout,
  SharedButton,
  SharedCard,
  SharedInput,
} from "./shared";

export const Login: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {

    if (!validateEmail(email)) {

      dispatch(setDisplayMessageAction("Invalid email"));
      return;
    }

    dispatch(loginOperation({ email, password }));
  };

  return (
    <SharedCard>
      <FormInputsLayout>
        <SharedInput
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
        />
        <SharedInput
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
        />
        <SharedButton onClick={handleLogin}>Login</SharedButton>
      </FormInputsLayout>
    </SharedCard>
  );
};
