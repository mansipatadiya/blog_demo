import axios from "axios";

const API_URL = "http://127.0.0.1:8000/";

export const apiConfig = () => {
  const accessToken = "";
  const appConfigData = {
    method: "PUT,DELETE,POST,GET,OPTION",
    headers: {
      accept: "application/json",
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  };
  if (accessToken)
    appConfigData.headers.Authorization = `Bearer ${accessToken}`;

  return appConfigData;
};

export const getApi = (url, options = {}) => {
  return axios.get(`${API_URL}${url}`, { ...apiConfig(), ...options });
};

export const postApi = (url, apiData) => {
  return axios.post(`${API_URL}${url}`, apiData, apiConfig());
};
