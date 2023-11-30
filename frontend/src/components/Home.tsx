import React from "react";
import { useUserId, useUserById } from "../redux/selectors/selectorHooks";
import { Heading } from "./shared";

export const Home: React.FC = (): JSX.Element => {
  const id = useUserId();
  const userEntity = useUserById(id);

  return <Heading>Welcome, {userEntity?.nickName}</Heading>;
};
