import { ApiResponse } from "../Auth/api";
import axios from 'axios';
import { VER_TEST_URL_API } from "../Preguntas/api";
 

export interface CrearTestInterface {
    idUsuario: number,
    tipoTestId: number,
}

export interface VerificarTestInterface {
  idUsuario: number,
}

export interface ResponseDataVerificarTestInterface {
  idUsuarioTest: number,
}


interface EliminarTestResponse {
  count: number;
}

export const crearTest = async (
  data: CrearTestInterface
): Promise<ApiResponse<VerificarTestInterface>> => {
  const response = await axios.post(`${VER_TEST_URL_API}/crearTest`, data);
  return response.data;
};

export const verificarTest = async (
  data: VerificarTestInterface
): Promise<ApiResponse<ResponseDataVerificarTestInterface>> => {
  const response = await axios.post(`${VER_TEST_URL_API}/verificarTest`, data);
  return response.data;
};



export const eliminarTest = async (
  data: VerificarTestInterface
): Promise<ApiResponse<EliminarTestResponse>> => {
  const response = await axios.delete(`${VER_TEST_URL_API}/eliminarTest`, {data} );
  return response.data;
};
