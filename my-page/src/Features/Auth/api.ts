import axios from 'axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post<LoginResponse>(
    'http://localhost:3001/api/auth/login',
    data
  );
  return response.data;
};
