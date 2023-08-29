import { API_URL } from "@/config";
import Axios from "axios";

export const axios = Axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage: string =
      error.response?.data?.response || error.message;
    console.log(errorMessage);
    return Promise.reject(error);
  }
);
