import express from 'express';
import { login, register, getRoles } from '../controllers/AuthController.js';
import { UserController } from '../controllers/UserController.js';
import { OfertaController } from '../controllers/OfertaController.js';
import multer from 'multer';
import { PerfilController } from '../controllers/PerfilController.js';
import { getTestPersonality } from '../controllers/TestController.js';

const router = express.Router();

const upload = multer({ dest: 'temp/' }); // carpeta temporal para archivos

// Rutas Auth y Usuarios
router.post('/login', login);
router.post('/register', register);
router.get('/roles', getRoles);

router.get('/consultarusuarios', UserController.getUsuariosConRoles);
router.post('/consultarusuarios/update', UserController.updateUserStructured);
router.post('/consultarusuarios/delete', UserController.deleteUserStructured);

router.get('/verTest/get', getTestPersonality);



// Rutas ofertas
router.post('/crearoferta', OfertaController.crearOferta);
router.get('/verofertas', OfertaController.obtenerOfertasParaPostulantes);

// Rutas perfil con subida de archivos
router.get('/perfil/:userId', PerfilController.getPerfilByUserId);

router.post(
  '/perfil/update',
  upload.fields([
    { name: 'fotoPerfil', maxCount: 1 },
    { name: 'curriculum', maxCount: 1 },
  ]),
  PerfilController.updatePerfil
);



export default router;
