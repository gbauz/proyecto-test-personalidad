import express from 'express';
import { login, register,getRoles, getUsuariosConRoles, updateUserStructured, deleteUserStructured, crearOferta, obtenerOfertasParaPostulantes } from '../controllers/AuthController.js'; // recuerda la extensión .js

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/roles', getRoles); // GET /api/auth/roles
router.get('/consultarusuarios', getUsuariosConRoles); // GET /api/auth/usuarios
router.post('/consultarusuarios/update', updateUserStructured);   // mismo patrón que register
router.post('/consultarusuarios/delete', deleteUserStructured);   // mismo patrón que register
router.post('/crearoferta', crearOferta);
router.get('/verofertas', obtenerOfertasParaPostulantes);


export default router;
