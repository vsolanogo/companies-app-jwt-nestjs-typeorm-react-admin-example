import * as Yup from "yup";

export interface SigninDto {
  email: string;
  password: string;
}

export interface SignupFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  lastName: string;
  firstName: string;
  nickName: string;
  description: string;
  position: string;
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
  user: string;
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

export const signinValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});
