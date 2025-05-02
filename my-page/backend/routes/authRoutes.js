import express from 'express';
import { login, register,getRoles } from '../controllers/AuthController.js'; // recuerda la extensión .js

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/roles', getRoles); // GET /api/auth/roles


export default router;
