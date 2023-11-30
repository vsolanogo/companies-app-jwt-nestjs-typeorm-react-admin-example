import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { UserForm } from "../register/UserForm";
import {
  PatchUserValues,
  UserFormValues,
  patchUserValidationSchema,
} from "../../models/models";
import { useUserById, useUserId } from "../../redux/selectors/selectorHooks";
import {
  getUserAsAdminOperation,
  patchUserOperation,
} from "../../redux/users/usersActions";
import { useRoute } from "wouter";
import { HeadingH3 } from "../shared";

export const UserLayout: React.FC = (): JSX.Element => {
  const [match, params] = useRoute("/profile/:id");

  const dispatch = useAppDispatch();

  const userId = useUserId();
  const profileId = params?.id ? params?.id : userId;
  const user = useUserById(profileId);

  useEffect(() => {
    if (params?.id) {
      dispatch(getUserAsAdminOperation(params.id));
    }
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

  return (
    <div>
      <HeadingH3>You are currently editing another person's profile.</HeadingH3>
      <UserForm
        id={user?.id}
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
    </div>
  );
};
