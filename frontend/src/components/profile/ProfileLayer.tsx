import React from "react";
import { useAppDispatch } from "../../store/store";
import { UserForm } from "../register/UserForm";
import {
  PatchUserValues,
  UserFormValues,
  patchUserValidationSchema,
} from "../../models/models";
import { useUserById, useUserId } from "../../redux/selectors/selectorHooks";
import { patchUserOperation } from "../../redux/users/usersActions";

export const ProfileLayer: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userId = useUserId();
  const user = useUserById(userId);

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

  return (
    <UserForm
      id={userId}
      noPassword={true}
      defaultPhone={user?.phoneNumber}
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
  );
};
