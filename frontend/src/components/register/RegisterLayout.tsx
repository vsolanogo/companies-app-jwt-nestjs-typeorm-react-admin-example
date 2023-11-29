import React from "react";
import { UserForm } from "./UserForm";
import { UserFormValues, signUpValidationSchema } from "../../models/models";
import { useAppDispatch } from "../../store/store";
import { registerOperation } from "../../redux/user/userActions";

export const RegisterLayout: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleFormSubmit = (formData: UserFormValues) => {
    dispatch(registerOperation(formData));
  };

  return (
    <UserForm
      validationSchema={signUpValidationSchema}
      onSubmit={handleFormSubmit}
    />
  );
};
