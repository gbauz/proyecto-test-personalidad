import axios from 'axios';

export interface LoginPayload {
  email: string;
  password: string;
}


export interface UserLoginResponse {
  nombre: string;
  roleName: string;
}
export interface LoginResponse  {
  message: string;
  token: string;
  user: UserLoginResponse
}

export interface RegisterPayload {
  name: string,
  email: string,
  password: string,
  roleId?: number,
}

export interface RoleOption {
  value: number;
  label: string;
}


const API_URL = "http://localhost:3001/api";
const AUTH_URL = "auth";
const BASE_URL_AUTH = `${API_URL}/${AUTH_URL}`

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL_AUTH}/login`, data);
  return response.data;
};

export const registerUser = async (data: RegisterPayload): Promise<{ message: string }> => {
  const response = await axios.post(`${BASE_URL_AUTH}/register`, data);
  return response.data;
};

export const fetchRoles = async (): Promise<RoleOption[]> => {
  const res = await axios.get(`${BASE_URL_AUTH}/roles`);
  return res.data;
};
