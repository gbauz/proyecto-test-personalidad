import { Router } from 'express';
// import { getTestPersonality } from '../controllers/TestController.js';
import { getTestPersonality, getRespuestasActivas, iniciarTest, verificarTest } from '../controllers/TestController.js';

const testRoutes = Router();

testRoutes.get('/get', getTestPersonality);
testRoutes.get('/getRespuestasActivas', getRespuestasActivas);
testRoutes.post('/crearTest', iniciarTest);
testRoutes.post('/verificarTest', verificarTest);

export default testRoutes;
