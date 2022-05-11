import axios from "axios";
import { API_URL } from "./configs/apiUrl";

const token = "";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    config.headers.token = token;
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "authorization"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// api put
export const apiLogout = () => {
  return axios.put(`${API_URL}/logout`);
};

export const apiAdminUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/admin/update`, param);
};

export const apiMaintainUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/maintain/update`, param);
};

export const apiSlotHelpListUpdate = (param = {}) => {
  return axios.put(`${API_URL}/backend/help/update`, param);
};

// api get
export const apiAdminList = () => {
  return axios.get(`${API_URL}/backend/admin/admin_list`);
};

export const apiAdminUserInfo = () => {
  return axios.get(`${API_URL}/backend/admin/user_info`);
};

export const apiMaintainList = () => {
  return axios.get(`${API_URL}/backend/maintain/maintain_list`);
};

export const apiMenuList = () => {
  return axios.get(`${API_URL}/backend/menu/menu_list`);
};

export const apiSlotHelpList = () => {
  return axios.get(`${API_URL}/backend/help/list`);
};

export const apiSlotHelpDetail = (params = {}) => {
  const { param = "", lang = "" } = params;
  return axios.get(
    `${API_URL}/backend/help/detail?game_id=${param}&lang=${lang}`
  );
};

export const apiRecordList = (params = {}) => {
  const { page = "1", limit = "15", editor = "", action = "" } = params;
  return axios.get(
    `${API_URL}/backend/record/list?page=${page}&limit=${limit}&editor=${editor}&action=${action}`
  );
};
