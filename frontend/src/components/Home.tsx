import React from "react";
import { useUserId, useUserById } from "../redux/selectors/selectorHooks";
import { Heading2 } from "./shared";

export const Home: React.FC = (): JSX.Element => {
  const id = useUserId();
  const userEntity = useUserById(id);

  return (
    <div>
      <Heading2>{id}</Heading2>
      <Heading2>{JSON.stringify(userEntity, undefined, 2)}</Heading2>
    </div>
  );
};
