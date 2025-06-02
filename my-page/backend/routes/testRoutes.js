import { Router } from 'express';
// import { getTestPersonality } from '../controllers/TestController.js';
import { getTestPersonality } from '../controllers/TestController.js';

const testRoutes = Router();

testRoutes.get('/get', getTestPersonality);

export default testRoutes;
