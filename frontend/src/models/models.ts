import * as Yup from "yup";

export interface SigninDto {
  email: string;
  password: string;
}

export interface PostCompanyValues {
  name: string;
  address: string;
  serviceOfActivity: string;
  numberOfEmployees: number;
  description: string;
  type: string;
}

export interface PatchCompanyFormValues {
  id: string;
  name: string;
  address: string;
  serviceOfActivity: string;
  numberOfEmployees: number;
  description: string;
  type: string;
}

export interface CompanyFormValues {
  userId?: string;
  id?: string;
  name: string;
  address: string;
  serviceOfActivity: string;
  numberOfEmployees: number;
  description: string;
  type: string;
}

export interface UserFormValues {
  id?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  lastName?: string;
  firstName?: string;
  nickName?: string;
  description?: string;
  position?: string;
}

export enum Role {
  User = "user",
  Admin = "admin",
}

export interface PatchUserValues {
  id?: string;
  phoneNumber?: string;
  lastName?: string;
  firstName?: string;
  description?: string;
  position?: string;
}

export interface SignupFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  phoneNumber?: string;
  lastName?: string;
  firstName?: string;
  nickName?: string;
  description?: string;
  position?: string;
}

export type User = {
  id: string;
  roles: [Role];
  email: string;
  phoneNumber: string;
  lastName: string;
  firstName: string;
  nickName: string;
  description: string;
  position: string;
  createdAt: string;
  updatedAt: string;
};

export type Company = {
  id: string;
  name: string;
  address: string;
  serviceOfActivity: string;
  numberOfEmployees: number;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  user?: User;
};

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .required("Password is required"),
  confirmPassword: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
  phoneNumber: Yup.string().required("Phone number is required"),
  lastName: Yup.string().required("Last name is required"),
  firstName: Yup.string().required("First name is required"),
  nickName: Yup.string().required("Nick name is required"),
  description: Yup.string().required("Description is required"),
  position: Yup.string().required("Position is required"),
});

export const patchUserValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  lastName: Yup.string().required("Last name is required"),
  firstName: Yup.string().required("First name is required"),
  nickName: Yup.string().required("Nick name is required"),
  description: Yup.string().required("Description is required"),
  position: Yup.string().required("Position is required"),
});

export const signinValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export async function validateData(data, validationSchema) {
  try {
    await validationSchema.validate(data, { abortEarly: false });
    return {}; // No validation errors
  } catch (validationError: any) {
    // Format errors as an object with field names
    const errors = {};
    validationError?.inner.forEach((error) => {
      if (!errors[error.path]) {
        errors[error.path] = error.message;
      }
    });
    return errors;
  }
}

export const newCompanyValidationSchema = Yup.object().shape({
  name: Yup.string().required("Company name is required"),
  address: Yup.string().required("Company address is required"),
  serviceOfActivity: Yup.string().required("Service of activity is required"),
  numberOfEmployees: Yup.number()
    .required("Number of employees is required")
    .integer("Must be an integer"),
  description: Yup.string().required("Company description is required"),
  type: Yup.string().required("Company type is required"),
});
