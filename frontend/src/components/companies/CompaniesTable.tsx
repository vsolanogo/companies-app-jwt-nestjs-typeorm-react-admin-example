import React from "react";
import { useAppDispatch } from "../../store/store";
import {
  companiesSetSortbyFieldAction,
  companiesSetSortorderTypeAction,
  getCompaniesOperation,
} from "../../redux/companies/companiesActions";
import { ECompaniesTable } from "../shared";
import {
  useCompanyIds,
  useCompanyEntities,
  useAllCompanies,
  useTotalCompanies,
  useCompaniesSortByType,
  useCompaniesSortOrderType,
} from "../../redux/selectors/selectorHooks";
import {
  getSortOrderEmoji,
  invertSortOrder,
} from "../../redux/companies/companiesSlice";
import { navigate } from "wouter/use-location";

export const CompaniesTable: React.FC = (): JSX.Element => {
  const companyIds = useCompanyIds();
  const companyEntities = useCompanyEntities();
  const allCompanies = useAllCompanies();
  const totalCompanies = useTotalCompanies();
  const dispatch = useAppDispatch();

  const sortByType = useCompaniesSortByType();
  const sortOrderType = useCompaniesSortOrderType();
  // const company = useCompanyById(companyId);

  console.log({ companyIds });
  console.log({ companyEntities });
  console.log({ allCompanies });
  console.log({ totalCompanies });

  const nameClickHandler = () => {
    dispatch(companiesSetSortbyFieldAction("name"));
    dispatch(companiesSetSortorderTypeAction(invertSortOrder(sortOrderType)));
    dispatch(getCompaniesOperation());
  };

  const serviceClickHandler = () => {
    dispatch(companiesSetSortbyFieldAction("serviceOfActivity"));
    dispatch(companiesSetSortorderTypeAction(invertSortOrder(sortOrderType)));
    dispatch(getCompaniesOperation());
  };

  const sortOrderEmoji = getSortOrderEmoji(sortOrderType);

  const handlerElementClick = (id) => {
    navigate(`/company/${id}`);
  };

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
                handlerElementClick(companyEntities[i]?.id);
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
