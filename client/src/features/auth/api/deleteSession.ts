import { AUTH_API_URL } from "@/config";
import { axios } from "@/libs/axios";

export const deleteSession = () => {
  return axios.delete(`${AUTH_API_URL}/auth/sessions`);
};
