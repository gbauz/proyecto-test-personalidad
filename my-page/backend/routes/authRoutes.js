
import { Router } from 'express';
import { login, register, getRoles } from '../controllers/AuthController.js';
import { UserController } from '../controllers/UserController.js';
import { OfertaController } from '../controllers/OfertaController.js';
import multer from 'multer';
import { PerfilController } from '../controllers/PerfilController.js';
import { getTestPersonality } from '../controllers/TestController.js';

const authRouter = Router();

const upload = multer({ dest: 'temp/' }); // carpeta temporal para archivos

// Rutas Auth y Usuarios
authRouter.post('/login', login);
authRouter.post('/register', register);
authRouter.get('/roles', getRoles);

authRouter.get('/consultarusuarios', UserController.getUsuariosConRoles);
authRouter.post('/consultarusuarios/update', UserController.updateUserStructured);
authRouter.post('/consultarusuarios/delete', UserController.deleteUserStructured);

authRouter.get('/test/get', getTestPersonality);



// Rutas ofertas
authRouter.post('/crearoferta', OfertaController.crearOferta);
authRouter.get('/verofertas', OfertaController.obtenerOfertasParaPostulantes);

// Rutas perfil con subida de archivos
authRouter.get('/perfil/:userId', PerfilController.getPerfilByUserId);

authRouter.post(
  '/perfil/update',
  upload.fields([
    { name: 'fotoPerfil', maxCount: 1 },
    { name: 'curriculum', maxCount: 1 },
  ]),
  PerfilController.updatePerfil
);



export default authRouter;
