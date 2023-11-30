import React from "react";
import { useAppDispatch } from "../../store/store";
import {
  companiesSetSortbyFieldAction,
  companiesSetSortorderTypeAction,
} from "../../redux/companies/companiesActions";
import {
  useCompanyIds,
  useCompanyEntities,
  useCompaniesSortByType,
  useCompaniesSortOrderType,
} from "../../redux/selectors/selectorHooks";
import { invertSortOrder } from "../../redux/companies/companiesSlice";
import CompaniesTablePresentation from "./CompaniesTablePresentation";
import { navigate } from "wouter/use-location";
interface CompanyProps {
  onFetchHandler: () => void;
}

export const CompaniesTable: React.FC<CompanyProps> = ({
  onFetchHandler,
}): JSX.Element => {
  const companyIds = useCompanyIds();
  const companyEntities = useCompanyEntities();
  const dispatch = useAppDispatch();

  const sortByType = useCompaniesSortByType();
  const sortOrderType = useCompaniesSortOrderType();

  const nameClickHandler = () => {
    dispatch(companiesSetSortbyFieldAction("name"));
    dispatch(companiesSetSortorderTypeAction(invertSortOrder(sortOrderType)));
    onFetchHandler();
  };

  const serviceClickHandler = () => {
    dispatch(companiesSetSortbyFieldAction("serviceOfActivity"));
    dispatch(companiesSetSortorderTypeAction(invertSortOrder(sortOrderType)));
    onFetchHandler();
  };

  const handlerElementClick = (id) => {
    navigate(`/company/${id}`);
  };

  return (
    <CompaniesTablePresentation
      companyIds={companyIds.map(String)}
      companyEntities={companyEntities}
      sortByType={sortByType}
      sortOrderType={sortOrderType}
      nameClickHandler={nameClickHandler}
      serviceClickHandler={serviceClickHandler}
      navigateToCompany={handlerElementClick}
    />
  );
};
