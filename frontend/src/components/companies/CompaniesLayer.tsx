import React from "react";
import { useAppDispatch } from "../../store/store";
import { getCompaniesOperation } from "../../redux/companies/companiesActions";
import { CompaniesTable } from "./CompaniesTable";

export const CompaniesLayer: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getCompaniesOperation());
  }, []);

  return <div><CompaniesTable/></div>;
};
