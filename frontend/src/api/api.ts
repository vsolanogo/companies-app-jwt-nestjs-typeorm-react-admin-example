import axios from "axios";

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

// const apiUrl = "/api";
const apiUrl = "http://localhost:3000";

const urls = {
  signup: `${apiUrl}/signup`,
  signin: `${apiUrl}/signin`,
  logout: `${apiUrl}/logout`,
  profile: `${apiUrl}/profile`,
  companies: `${apiUrl}/companies`,
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
};

export const CompaniesApi = {
  post(body) {
    console.log({ body });
    return axios.post(urls.companies, body);
  },
};
