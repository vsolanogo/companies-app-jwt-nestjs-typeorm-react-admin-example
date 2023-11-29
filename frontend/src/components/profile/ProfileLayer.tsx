import React from "react";
import { useAppDispatch } from "../../store/store";
import { getCompaniesOperation } from "../../redux/companies/companiesActions";
import { UserForm } from "../register/UserForm";
import {
  PatchUserValues,
  UserFormValues,
  patchUserValidationSchema,
} from "../../models/models";
import { useUserById, useUserId } from "../../redux/selectors/selectorHooks";
import parsePhoneNumberFromString from "libphonenumber-js";
import { patchUserOperation } from "../../redux/users/usersActions";

export const ProfileLayer: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userId = useUserId();
  const user = useUserById(userId);

  React.useEffect(() => {
    dispatch(getCompaniesOperation());
  }, []);

  const handleFormSubmit = (formData: UserFormValues) => {
    const { id, phoneNumber, lastName, firstName, description, position } =
      formData;

    const patchUserValues: PatchUserValues = {
      id,
      phoneNumber,
      lastName,
      firstName,
      description,
      position,
    };

    dispatch(patchUserOperation(patchUserValues));
  };

  const resParse = parsePhoneNumberFromString(user?.phoneNumber ?? "");

  const countryCode = resParse?.country;

  return (
    <div>
      <UserForm
        id={userId}
        noPassword={true}
        defaultPhone={user?.phoneNumber}
        defaultPhoneCountryCode={countryCode}
        defaultEmail={user?.email}
        disableEmail={true}
        defaultFirstName={user?.firstName}
        defaultLastName={user?.lastName}
        defaultNickName={user?.nickName}
        disableNickName={true}
        defaultDescription={user?.description}
        defaultPosition={user?.position}
        submitButtonName="Update"
        validationSchema={patchUserValidationSchema}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};
