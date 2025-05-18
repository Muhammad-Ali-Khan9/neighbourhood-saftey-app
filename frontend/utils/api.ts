import axios from "axios";
import { User } from "./types";

const api = axios.create({
  baseURL: "http://10.0.2.2:3000",
});

export const register = async (email: string, password: string, role: string, firstName: string, lastName: string, phoneNumer: string): Promise<User> => {
  const response = await api.post<User>("/users/register", {
    email: email,
    password: password,
    role: role,
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumer,
  });
  return response.data;
};

export const login = async (email: string, password: string, role: string): Promise<User> => {
  const response = await api.post<User>("/users/login", {
    email: email,
    password: password,
    role: role,
  });
  return response.data;
};

export default api;
