import axios from "axios";
import { PatchCompanyFormValues } from "../models/models";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const apiUrl = "/api";
// const apiUrl = "http://localhost:3000";

const urls = {
  signup: `${apiUrl}/signup`,
  signin: `${apiUrl}/signin`,
  logout: `${apiUrl}/logout`,
  profile: `${apiUrl}/profile`,
  companies: `${apiUrl}/companies`,
  company: `${apiUrl}/company`,
  patchCompany: (id: string) => `${apiUrl}/company/${id}`,
  getCompany: (id: string) => `${apiUrl}/company/${id}`,
  user: `${apiUrl}/user`,
};

export const AuthApi = {
  signup(body) {
    return axios.post(urls.signup, body);
  },
  login(body) {
    return axios.post(urls.signin, body);
  },
  logout() {
    delete axios.defaults.headers.common["Authorization"];
    return axios.post(urls.logout);
  },
};

export const UserApi = {
  get() {
    return axios.get(urls.profile);
  },
  patch(body) {
    return axios.patch(urls.user, body);
  },
};

export const CompaniesApi = {
  post(body) {
    return axios.post(urls.companies, body);
  },
};

export const CompanyApi = {
  post(body) {
    return axios.post(urls.company, body);
  },
  get(id: string) {
    return axios.get(urls.getCompany(id));
  },
  patch(body: PatchCompanyFormValues) {
    return axios.patch(urls.patchCompany(body.id), body);
  },
};
