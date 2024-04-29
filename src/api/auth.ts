import { IUser } from "@/types/user";
import axios from "axios";

export const signupUser = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) => {
  const response = await axios.post("http://localhost:8000/auth/signup", {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("http://localhost:8000/auth/login", {
    email: email,
    password: password,
  });
  return response.data;
};

export const fetchUser = async () => {
  const response = await axios.get("http://localhost:8000/auth/get");
  return response.data as IUser;
};
