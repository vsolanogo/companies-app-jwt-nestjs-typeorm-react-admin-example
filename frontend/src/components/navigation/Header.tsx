import React from "react";
import styled from "@emotion/styled";
import { useRoute, useLocation, useParams, useRouter, Link } from "wouter";

import { useIsAuthenticated } from "../../redux/selectors/selectorHooks";
import { logoutOperation } from "../../redux/user/userActions";
import { useAppDispatch } from "../../store/store";
import { SharedButton } from "../shared";

export const Header: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useIsAuthenticated();

  const handleSignout = () => {
    dispatch(logoutOperation());
  };

  const [match, params] = useRoute("/signin");

  console.log(match);
  console.log(params);

  const [location, /*setLocation*/] = useLocation();

  console.log({ location });

  const params2 = useParams();

  console.log({ params2 });

  const router = useRouter();

  console.log({ router });

  return (
    <EHeader>
      {!isAuthenticated && (
        <>
          <Link href={`/signin`}>
            <SharedButton data-isactive={location === "/signin"}>
              Login
            </SharedButton>
          </Link>

          <Link href={`/signup`}>
            <SharedButton data-isactive={location === "/signup"}>
              Register
            </SharedButton>
          </Link>
        </>
      )}

      {isAuthenticated && (
        <>
          <Link href={`/profile`}>
            <SharedButton data-isactive={location === "/profile"}>
              Profile
            </SharedButton>
          </Link>

          <Link href={`/companies`}>
            <SharedButton data-isactive={location === "/companies"}>
              Companies
            </SharedButton>
          </Link>

          <SharedButton onClick={handleSignout}>Sign out</SharedButton>
        </>
      )}
    </EHeader>
  );
};

const EHeader = styled.header`
  align-items: center;
  display: grid;
  grid-template-columns: max-content max-content;
  grid-column-gap: 0.5em;
  justify-content: center;
  top: 0;
  white-space: nowrap;
  width: 100%;
  z-index: 777;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  min-height: 4em;
  background: #ffffff;
  padding: 0.5rem;
  border: 1px solid #d2d6dc;
  border-radius: 0 0 0.375rem 0.375rem;
`;
