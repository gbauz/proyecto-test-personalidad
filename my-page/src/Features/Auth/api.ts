import axios from 'axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface RegisterPayload {
  name: string,
  email: string,
  password: string,
  roleId: number,
}

export interface RoleOption {
  value: number;
  label: string;
}


const API_URL = "http://localhost:3001/api/auth";

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

export const registerUser = async (data: RegisterPayload): Promise<{ message: string }> => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const fetchRoles = async (): Promise<RoleOption[]> => {
  const res = await axios.get(`${API_URL}/roles`);
  return res.data;
};
