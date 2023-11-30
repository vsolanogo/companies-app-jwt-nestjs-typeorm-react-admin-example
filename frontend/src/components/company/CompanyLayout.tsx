import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import {
  deleteCompanyOperation,
  getCompanyOperation,
  patchCompanyOperation,
} from "../../redux/companies/companiesActions";
import { useRoute } from "wouter";
import { CompanyForm } from "../companies/CompanyForm";
import {
  CompanyFormValues,
  PatchCompanyFormValues,
  newCompanyValidationSchema,
} from "../../models/models";
import { useCompanyById } from "../../redux/selectors/selectorHooks";

export const CompanyLayout: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [match, params] = useRoute("/company/:id");
  const company = useCompanyById(params?.id || "");

  useEffect(() => {
    if (params?.id) {
      dispatch(getCompanyOperation(params.id));
    }
  }, []);

  useEffect(() => {}, []);

  const handleFormSubmit = (formData: CompanyFormValues) => {
    const {
      id,
      name,
      address,
      serviceOfActivity,
      numberOfEmployees,
      description,
      type,
    } = formData;

    if (!id) {
      console.error("Company ID is required for form submission.");
      return;
    }

    const postCompanyValues: PatchCompanyFormValues = {
      id,
      name,
      address,
      serviceOfActivity,
      numberOfEmployees,
      description,
      type,
    };
    dispatch(patchCompanyOperation(postCompanyValues));
  };

  const handleRemove = (id: string) => {
    dispatch(deleteCompanyOperation(id));
  };

  return (
    <CompanyForm
      id={company?.id}
      userId={company?.user?.id}
      defaultName={company?.name}
      defaultAddress={company?.address}
      defaultServiceOfActivity={company?.serviceOfActivity}
      defaultNumberOfEmployees={company?.numberOfEmployees}
      defaultDescription={company?.description}
      defaultType={company?.type}
      submitButtonName="Update"
      validationSchema={newCompanyValidationSchema}
      onSubmit={handleFormSubmit}
      onCompanyRemove={handleRemove}
    />
  );
};
