import React from "react";
import { CompanyForm } from "./CompanyForm";
import {
  CompanyFormValues,
  PostCompanyValues,
  newCompanyValidationSchema,
} from "../../models/models";
import { useAppDispatch } from "../../store/store";
import { postCompanyOperation } from "../../redux/companies/companiesActions";

export const NewCompanyLayout: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (formData: CompanyFormValues) => {
    const {
      name,
      address,
      serviceOfActivity,
      numberOfEmployees,
      description,
      type,
    } = formData;

    const postCompanyValues: PostCompanyValues = {
      name,
      address,
      serviceOfActivity,
      numberOfEmployees,
      description,
      type,
    };

    dispatch(postCompanyOperation(postCompanyValues));
  };

  return (
    <CompanyForm
      validationSchema={newCompanyValidationSchema}
      onSubmit={handleFormSubmit}
    />
  );
};
