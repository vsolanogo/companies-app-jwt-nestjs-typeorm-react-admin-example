import React from "react";
import { EWrapper } from "./shared";
import { Router } from "./Router";
import { ModalWindowMessage } from "./ModalWindowMessage";
import { useReduxMainState } from "../redux/selectors/selectorHooks";
import { useAppDispatch } from "../store/store";
import { loadAppOperation } from "../redux/user/userActions";

export const App = () => {
  const state = useReduxMainState();
  console.log({state})
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(loadAppOperation());
  }, []);

  return (
    <>
      <ModalWindowMessage />
      <EWrapper>
        <Router />
      </EWrapper>
    </>
  );
};
