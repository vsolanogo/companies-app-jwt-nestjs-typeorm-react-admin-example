import React from "react";
import { setDisplayMessageAction } from "../redux/user/userActions";
import { useAppDispatch } from "../store/store";
import OutsideClickHandler from "react-outside-click-handler";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import {
  Heading2,
  SharedModalBackground,
  SharedCard,
  SharedButton,
} from "./shared";
import { useDisplayMessage } from "../redux/selectors/selectorHooks";

export const ModalWindowMessage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const message = useDisplayMessage();

  const handleClose = () => {
    dispatch(setDisplayMessageAction(null));
  };

  if (message)
    return (
      <>
        <SharedModalBackground />

        <EWindow>
          <OutsideClickHandler onOutsideClick={handleClose}>
            <div
              css={css`
                position: relative;
              `}
            >
              <SharedCard>
                <CloseButton onClick={handleClose}></CloseButton>
                <Heading2>{message}</Heading2>
              </SharedCard>
            </div>
          </OutsideClickHandler>
        </EWindow>
      </>
    );

  return <></>;
};

export const EWindow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1300;
`;

export const CloseButton = styled(SharedButton)`
  background: #fff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 23' fill='none' stroke='%23fd7014' stroke-width='2' xmlns:v='https://vecta.io/nano'%3E%3Cpath d='M1.7071 1.0429l21 21'/%3E%3Cpath d='M1.2929 22.043l21-21'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 1.2em 1.2em;
  background-position: center;
  position: absolute;
  right: 0px;
  top: 0px;
  width: 1.8em;
  height: 1.8em;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  padding: 1em;
  transition: all 0.3s;
  right: 8px;
  top: 8px;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 23' fill='none' stroke='%23fd7014' stroke-width='2' xmlns:v='https://vecta.io/nano'%3E%3Cpath d='M1.7071 1.0429l21 21'/%3E%3Cpath d='M1.2929 22.043l21-21'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 1.2em 1.2em;
    background-position: center;
  }
`;
