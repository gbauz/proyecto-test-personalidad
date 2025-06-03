import axios from "axios";
import { ApiResponse } from "../Auth/api";

export interface TestPersonality {
  id: number;
  pregunta: string;
  categoriaPreguntasId: number;
  categoria: string;
  ordenCategoria: number;
}

export interface RespuestasTestPersonality {
  id: number;
  nombre: string;
  puntaje: number;
  isActive: boolean;
}


export interface crearTest {
  idUsuario: number,
  tipoTestId: number,
}


export interface idUsuarioTestInterface {
  idUsuario: number,
}

const BASE_URL_TEST = "http://localhost:3001/api";
const TEST_URL = "/test";
const VER_TEST_URL_API = `${BASE_URL_TEST}/${TEST_URL}`;


export const getTestPreguntas = async (): Promise<ApiResponse<TestPersonality[]>> => {
  const response = await axios.get(`${VER_TEST_URL_API}/get`);
  return response.data;
};



export const getTestRespuestas = async (): Promise<ApiResponse<RespuestasTestPersonality[]>> => {
  const response = await axios.get(`${VER_TEST_URL_API}/getRespuestasActivas`);
  return response.data;
}

export const postUsuarioTest = async (data: crearTest): Promise<ApiResponse<idUsuarioTestInterface>> => {
  const response = await axios.post(`${VER_TEST_URL_API}/crearTest`);
  return response.data;
};

