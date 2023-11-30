import React from "react";
import styled from "@emotion/styled";
import { useRoute, useLocation, Link } from "wouter";
import { useUserById, useUserId } from "../../redux/selectors/selectorHooks";
import { logoutOperation } from "../../redux/user/userActions";
import { useAppDispatch } from "../../store/store";
import { SharedButton, SharedButtonLink } from "../shared";
import { Role } from "../../models/models";

export const Header: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const id = useUserId();
  const userEntity = useUserById(id);

  const handleSignout = () => {
    dispatch(logoutOperation());
  };

  const [match, params] = useRoute("/signin");

  const [location /*setLocation*/] = useLocation();

  const isAdmin = userEntity?.roles?.includes(Role.Admin);

  const cols = isAdmin ? 6 : id ? 4 : 2;

  return (
    <EHeader data-columns={`${cols}`}>
      {!id && (
        <>
          <SharedButtonLink
            href={`/signin`}
            data-isactive={location === "/signin"}
          >
            Login
          </SharedButtonLink>

          <SharedButtonLink
            href={`/signup`}
            data-isactive={location === "/signup"}
          >
            Register
          </SharedButtonLink>
        </>
      )}

      {id && (
        <>
          <SharedButtonLink
            href={`/profile`}
            data-isactive={location === "/profile"}
          >
            Profile
          </SharedButtonLink>

          <SharedButtonLink
            href={`/companies`}
            data-isactive={location === "/companies"}
          >
            Companies
          </SharedButtonLink>

          <SharedButtonLink
            href={`/newcompany`}
            data-isactive={location === "/newcompany"}
          >
            New company
          </SharedButtonLink>

          {isAdmin && (
            <>
              <SharedButtonLink
                href={`/allcompanies`}
                data-isactive={location === "/allcompanies"}
                data-isadmin="true"
              >
                All companies
              </SharedButtonLink>

              <SharedButtonLink
                href={`/allusers`}
                data-isactive={location === "/allusers"}
                data-isadmin="true"
              >
                All users
              </SharedButtonLink>
            </>
          )}

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
  box-sizing: border-box;

  &[data-columns="2"] {
    grid-template-columns: max-content max-content;
  }

  &[data-columns="4"] {
    grid-template-columns: repeat(4, max-content);
  }

  &[data-columns="6"] {
    grid-template-columns: repeat(6, max-content);
  }
`;
