import { Router } from 'express';
// import { getTestPersonality } from '../controllers/TestController.js';
import { getTestPersonality, getRespuestasActivas, iniciarTest, verificarTest, eliminarTestNoCompletado, postRespuestas, obtenerTestsCompletados } from '../controllers/TestController.js';

const testRoutes = Router();

testRoutes.get('/get', getTestPersonality);
testRoutes.get('/getRespuestasActivas', getRespuestasActivas);
testRoutes.post('/crearTest', iniciarTest);
testRoutes.post('/verificarTest', verificarTest);
testRoutes.delete('/eliminarTest', eliminarTestNoCompletado)
testRoutes.post('/llenarTest',  postRespuestas)
testRoutes.get('/completados', obtenerTestsCompletados)


export default testRoutes;
