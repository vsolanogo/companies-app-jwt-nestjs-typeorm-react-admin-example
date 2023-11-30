import React from "react";
import { ECompaniesTable } from "../shared";
import { getSortOrderEmoji } from "../../redux/companies/companiesSlice";

interface CompaniesTablePresentationProps {
  companyIds: string[];
  companyEntities: Record<string, any>;
  sortByType: string;
  sortOrderType: string;
  nameClickHandler: () => void;
  serviceClickHandler: () => void;
  navigateToCompany: (id: string) => void;
}

const CompaniesTablePresentation: React.FC<CompaniesTablePresentationProps> = ({
  companyIds,
  companyEntities,
  sortByType,
  sortOrderType,
  nameClickHandler,
  serviceClickHandler,
  navigateToCompany,
}: CompaniesTablePresentationProps): JSX.Element => {
  const sortOrderEmoji = getSortOrderEmoji(sortOrderType);

  return (
    <ECompaniesTable>
      <table>
        <thead>
          <tr>
            <th>Value</th>
            <th tabIndex={0} onClick={nameClickHandler} data-isbutton="true">
              Name {sortByType === "name" && sortOrderEmoji}
            </th>
            <th>Description</th>
            <th>Number of Employees</th>
            <th tabIndex={0} data-isbutton="true" onClick={serviceClickHandler}>
              Service of Activity
              {sortByType === "serviceOfActivity" && sortOrderEmoji}
            </th>
            <th>Address</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {companyIds.map((i, index) => (
            <tr
              key={i}
              tabIndex={0}
              onClick={() => {
                navigateToCompany(companyEntities[i]?.id);
              }}
              data-isbutton="true"
            >
              <td>{index + 1}</td>
              <td>{companyEntities[i]?.name}</td>
              <td>{companyEntities[i]?.description}</td>
              <td>{companyEntities[i]?.numberOfEmployees}</td>
              <td>{companyEntities[i]?.serviceOfActivity}</td>
              <td>{companyEntities[i]?.address}</td>
              <td>{companyEntities[i]?.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ECompaniesTable>
  );
};

export default CompaniesTablePresentation;
