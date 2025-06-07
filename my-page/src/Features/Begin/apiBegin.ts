import { ApiResponse } from "../Auth/api";
import axios from 'axios';
import { VER_TEST_URL_API } from "../Preguntas/api";
 

export interface CrearTestInterface {
    idUsuario: number,
    tipoTestId: number,
}

export const crearTest = async (
  data: CrearTestInterface
): Promise<ApiResponse<null>> => {
  const response = await axios.post(`${VER_TEST_URL_API}/crearTest`, data);
  return response.data;
};
