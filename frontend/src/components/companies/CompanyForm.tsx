import React, { useEffect, useState } from "react";
import {
  SharedButton,
  SharedCard,
  SharedInput,
  FormInputsLayout,
  ErrorMessage,
  EFieldWrapper,
  InputLabel,
} from "../shared";
import { pressOnlyNumbers } from "../../helpers/pressOnlyNumbers";
import { CompanyFormValues, validateData } from "../../models/models";

interface CompanyProps {
  id?: string;
  userId?: string;
  defaultName?: string;
  defaultAddress?: string;
  defaultServiceOfActivity?: string;
  defaultNumberOfEmployees?: number;
  defaultDescription?: string;
  defaultType?: string;
  submitButtonName?: string;
  validationSchema: any;
  onSubmit: (formData: CompanyFormValues) => void;
  onCompanyRemove?: (id: string) => void;
}

export const CompanyForm: React.FC<CompanyProps> = ({
  id,
  userId,
  defaultName = "",
  defaultAddress = "",
  defaultServiceOfActivity = "",
  defaultNumberOfEmployees = 0,
  defaultDescription = "",
  defaultType = "",
  submitButtonName = "Create",
  validationSchema,
  onSubmit,
  onCompanyRemove,
}): JSX.Element => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [serviceOfActivity, setServiceOfActivity] = useState("");
  const [numberOfEmployees, setNumberOfEmployees] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    setName(defaultName);
    setAddress(defaultAddress);
    setServiceOfActivity(defaultServiceOfActivity);
    setNumberOfEmployees(String(defaultNumberOfEmployees));
    setDescription(defaultDescription);
    setType(defaultType);
  }, [
    defaultName,
    defaultAddress,
    defaultServiceOfActivity,
    defaultNumberOfEmployees,
    defaultDescription,
    defaultType,
  ]);

  type FormErrors = typeof validationSchema.fields;

  const [companyFormErrors, setCompanyFormErrors] = useState<FormErrors>({});

  const collectPossibleFields = () => {
    const registerData: CompanyFormValues = {
      userId,
      id,
      name,
      address,
      serviceOfActivity,
      numberOfEmployees: Number(numberOfEmployees),
      description,
      type,
    };

    return registerData;
  };

  const validateFields = async () => {
    const errors = await validateData(
      collectPossibleFields(),
      validationSchema
    );

    if (Object.keys(errors).length === 0) {
      setCompanyFormErrors({});
    } else {
      setCompanyFormErrors(errors);
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = await validateFields();

    if (Object.keys(errors).length === 0) {
      onSubmit(collectPossibleFields());
    }
  };

  const handleRemove = () => {
    if (onCompanyRemove) {
      onCompanyRemove(id || "");
    }
  };

  return (
    <SharedCard>
      <FormInputsLayout>
        <EFieldWrapper>
          <InputLabel data-display={!!name}>Name</InputLabel>

          <SharedInput
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            data-iserror={!!companyFormErrors.name}
          />

          <ErrorMessage data-iserror={!!companyFormErrors.name}>
            {companyFormErrors.name}
          </ErrorMessage>
        </EFieldWrapper>

        <EFieldWrapper>
          <InputLabel data-display={!!address}>Address</InputLabel>

          <SharedInput
            type="text"
            placeholder="Address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            value={address}
            data-iserror={!!companyFormErrors.address}
            as={"textarea"}
          />

          <ErrorMessage data-iserror={!!companyFormErrors.address}>
            {companyFormErrors.address}
          </ErrorMessage>
        </EFieldWrapper>

        <EFieldWrapper>
          <InputLabel data-display={!!serviceOfActivity}>
            Service of activity
          </InputLabel>

          <SharedInput
            type="text"
            placeholder="Service of activity"
            onChange={(e) => {
              setServiceOfActivity(e.target.value);
            }}
            value={serviceOfActivity}
            data-iserror={!!companyFormErrors.serviceOfActivity}
          />

          <ErrorMessage data-iserror={!!companyFormErrors.serviceOfActivity}>
            {companyFormErrors.serviceOfActivity}
          </ErrorMessage>
        </EFieldWrapper>

        <EFieldWrapper>
          <InputLabel data-display={!!numberOfEmployees}>
            Number of employees
          </InputLabel>

          <SharedInput
            type="number"
            placeholder="Number of employees"
            onKeyPress={pressOnlyNumbers}
            onChange={(e) => {
              setNumberOfEmployees(e.target.value);
            }}
            value={numberOfEmployees}
            data-iserror={!!companyFormErrors.numberOfEmployees}
          />

          <ErrorMessage data-iserror={!!companyFormErrors.numberOfEmployees}>
            {companyFormErrors.numberOfEmployees}
          </ErrorMessage>
        </EFieldWrapper>

        <EFieldWrapper>
          <InputLabel data-display={!!description}>Description</InputLabel>

          <SharedInput
            type="text"
            placeholder="Description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            value={description}
            as={"textarea"}
            data-iserror={!!companyFormErrors.description}
          />

          <ErrorMessage data-iserror={!!companyFormErrors.description}>
            {companyFormErrors.description}
          </ErrorMessage>
        </EFieldWrapper>

        <EFieldWrapper>
          <InputLabel data-display={!!type}>Type</InputLabel>

          <SharedInput
            type="text"
            placeholder="Type"
            onChange={(e) => {
              setType(e.target.value);
            }}
            value={type}
            data-iserror={!!companyFormErrors.type}
          />

          <ErrorMessage data-iserror={!!companyFormErrors.type}>
            {companyFormErrors.type}
          </ErrorMessage>
        </EFieldWrapper>

        <SharedButton onClick={handleSubmit}>{submitButtonName}</SharedButton>

        {onCompanyRemove && (
          <SharedButton onClick={handleRemove} data-isremoval="true">
            Remove
          </SharedButton>
        )}
      </FormInputsLayout>
    </SharedCard>
  );
};
