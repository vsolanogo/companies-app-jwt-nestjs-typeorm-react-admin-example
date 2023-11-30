import React from "react";
import {
  useUserIds,
  useUserEntities,
} from "../../redux/selectors/selectorHooks";
import { navigate } from "wouter/use-location";
import { ECompaniesTable } from "../shared";

export const UsersTable: React.FC = (): JSX.Element => {
  const userIds = useUserIds();
  const userEntities = useUserEntities();

  const handlerElementClick = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <ECompaniesTable>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th>Email</th>
            <th>Phone number</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Position</th>
            <th>Description</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          {userIds.map((i, index) => (
            <tr
              key={i}
              tabIndex={0}
              onClick={(e) => {
                handlerElementClick(userEntities[i]?.id);
              }}
              data-isbutton="true"
            >
              <td>{index + 1}</td>
              <td>{userEntities[i]?.email}</td>
              <td>{userEntities[i]?.phoneNumber}</td>
              <td>{userEntities[i]?.firstName}</td>
              <td>{userEntities[i]?.lastName}</td>
              <td>{userEntities[i]?.position}</td>
              <td>{userEntities[i]?.description}</td>
              <td>{userEntities[i]?.roles?.map((i) => i).join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ECompaniesTable>
  );
};
