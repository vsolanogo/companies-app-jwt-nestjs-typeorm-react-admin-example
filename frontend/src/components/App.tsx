import React, { useEffect } from "react";
import { EWrapper } from "./shared";
import { Router } from "./Router";
import { ModalWindowMessage } from "./ModalWindowMessage";
import { useReduxMainState } from "../redux/selectors/selectorHooks";
import { useAppDispatch } from "../store/store";
import { loadAppOperation } from "../redux/user/userActions";

export const App = () => {
  const state = useReduxMainState();
  // console.log({ state });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadAppOperation());
  }, []);

  useEffect(() => {
    if (!state?.user?.id) {
      dispatch(loadAppOperation());
    }
  }, [state?.user?.id]);

  return (
    <>
      <ModalWindowMessage />
      <EWrapper>
        <Router />
      </EWrapper>
    </>
  );
};
