import React from "react";
import { useAppDispatch } from "../../store/store";
import { getAllCompaniesOperation } from "../../redux/companies/companiesActions";
import { CompaniesTable } from "./CompaniesTable";

export const AllCompaniesLayout: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getAllCompaniesOperation());
  }, []);

  const fetchHandler = () => {
    dispatch(getAllCompaniesOperation());
  };

  return <CompaniesTable onFetchHandler={fetchHandler} />;
};
