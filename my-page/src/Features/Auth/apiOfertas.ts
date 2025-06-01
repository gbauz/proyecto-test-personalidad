import axios from "axios";

export interface OfertaPayload {
  nombre: string;
  descripcion: string;
  sueldo: number;
  modalidad: string;
  creadorId: number;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
}

const API_URL = "http://localhost:3001/api";
const AUTH_URL = "auth";
const BASE_URL_AUTH = `${API_URL}/${AUTH_URL}`;

export const crearOferta = async (
  data: OfertaPayload
): Promise<ApiResponse<null>> => {
  const response = await axios.post(`${BASE_URL_AUTH}/crearoferta`, data);
  return response.data;
};

export const obtenerOfertasParaPostulante = async (
  userId: number
): Promise<ApiResponse<any[]>> => {
  const response = await axios.get(`${BASE_URL_AUTH}/verofertas`, {
    params: { userId },
  });
  return response.data;
};
