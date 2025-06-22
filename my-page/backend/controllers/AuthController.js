import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET_KEY = 'tu_clave_secreta';

const apiResponse = (isSuccess, message, data = null) => ({
  isSuccess,
  message,
  data,
});

export const register = async (req, res) => {
  let { email, password, name, roleId } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json(apiResponse(false, 'El usuario ya existe'));
    }

    const DEFAULT_ROLE_ID = 2;
    roleId = (!roleId || roleId === 1) ? DEFAULT_ROLE_ID : roleId;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, password: hashedPassword, name, roleId },
    });

    res.status(201).json(apiResponse(true, 'Usuario registrado exitosamente', newUser));
  } catch (error) {
    console.error(error);
    res.status(500).json(apiResponse(false, 'Error en el servidor'));
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        role: true,
        usuariotest: {
          where: {
            testCompleted: true,
            isActive: true,
          },
          orderBy: {
            createdAt: 'desc', // ✅ usa el campo correcto
          },
          take: 1,
        },
      },
    });

    if (!user) {
      return res.status(400).json(apiResponse(false, 'Credenciales incorrectas'));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(apiResponse(false, 'Credenciales incorrectas'));
    }

    if (!user.role || !user.role.name) {
      return res.status(400).json(apiResponse(false, 'El usuario no tiene un rol asignado'));
    }

    const token = jwt.sign(
      { userId: user.id, role: user.roleId },
      SECRET_KEY,
      { expiresIn: '10h' }
    );

    const testCompletado = user.usuariotest.length > 0;
    const idUsuarioTest = testCompletado ? user.usuariotest[0].id : null;

    res.json(apiResponse(true, 'Login exitoso', {
      token,
      user: {
        id: user.id,
        nombre: user.name,
        roleName: user.role.name,
        testCompleted: testCompletado,
        idUsuarioTest: idUsuarioTest,
      },
    }));
  } catch (error) {
    console.error(error);
    res.status(500).json(apiResponse(false, 'Error en el servidor'));
  }
};


export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      select: { id: true, name: true },
    });

    const formatted = roles.map(role => ({
      value: role.id,
      label: role.name,
    }));

    res.json(apiResponse(true, 'Roles obtenidos correctamente', formatted));
  } catch (error) {
    console.error(error);
    res.status(500).json(apiResponse(false, 'No se pudieron obtener los roles'));
  }
};


// ✅ Ruta: GET /api/test/verificar-pendiente/:idUsuario
export const verificarTestPendiente = async (req, res) => {
  const idUsuario = parseInt(req.params.idUsuario);

  if (!idUsuario) {
    return res.status(400).json(apiResponse(false, 'Falta el ID de usuario'));
  }

  try {
    const testPendiente = await prisma.usuariotest.findFirst({
      where: {
        idUsuario,
        isActive: true,
        testCompleted: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (testPendiente) {
      return res.json(apiResponse(true, 'Test pendiente encontrado', {
        idUsuarioTest: testPendiente.id,
      }));
    } else {
      return res.json(apiResponse(true, 'No hay test pendiente', null));
    }
  } catch (error) {
    console.error('Error al verificar test pendiente:', error);
    return res.status(500).json(apiResponse(false, 'Error interno del servidor'));
  }
};
