import React from "react";
import { useAppDispatch } from "../../store/store";
import { UsersTable } from "./UsersTable";
import { getAllUsersOperation } from "../../redux/users/usersActions";

export const AllUsersLayout: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllUsersOperation());
  }, []);

  return <UsersTable />;
};
