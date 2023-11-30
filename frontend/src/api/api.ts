import axios from "axios";
import { PatchCompanyFormValues } from "../models/models";
import { getToken } from "../helpers/tokenstorage";
import { store } from "../store/store";
import { loadUserErrorAction } from "../redux/user/userActions";
import { usersSlice } from "../redux/users/usersSlice";

axios.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      store.dispatch(usersSlice.actions.removeAll());
      store.dispatch(loadUserErrorAction());
    }

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
  getCompany: (id: string) => `${apiUrl}/company/${id}`,
  deleteCompany: (id: string) => `${apiUrl}/company/${id}`,
  getUserById: (id: string) => `${apiUrl}/user/${id}`,
  user: `${apiUrl}/user`,
  companyList: `${apiUrl}/company/list`,
  userList: `${apiUrl}/user/list`,
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
  getById(id) {
    return axios.get(urls.getUserById(id));
  },
  patch(body) {
    return axios.patch(urls.user, body);
  },
  getList() {
    return axios.get(urls.userList);
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
    return axios.patch(urls.company, body);
  },
  getList(body) {
    return axios.post(urls.companyList, body);
  },
  delete(id: string) {
    return axios.delete(urls.deleteCompany(id));
  },
};
