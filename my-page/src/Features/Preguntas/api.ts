import axios from "axios";
import { ApiResponse } from "../Auth/api";

export interface TestPersonality {
  id: number;
  pregunta: string;
  categoriaPreguntasId: number;
  categoria: string;
  ordenCategoria: number;
}

const BASE_URL_TEST = "http://localhost:3001/api";
const TEST_URL = "/test";
const VER_TEST_URL_API = `${BASE_URL_TEST}/${TEST_URL}`;


export const getTestPreguntas = async (): Promise<ApiResponse<TestPersonality[]>> => {
  const response = await axios.get(`${VER_TEST_URL_API}/get`);
  return response.data;
};

