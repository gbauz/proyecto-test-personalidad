import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET_KEY = 'tu_clave_secreta'; 

// Función estándar de respuesta
const apiResponse = (isSuccess, message, data = null) => ({
  isSuccess,
  message,
  data,
});

export const register = async (req, res) => {
  let { email, password, name, roleId } = req.body;
  console.log("id", roleId);

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json(apiResponse(false, 'El usuario ya existe'));
    }

    const DEFAULT_ROLE_ID = 2;
    roleId = (!roleId || roleId === 0) ? DEFAULT_ROLE_ID : roleId;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        roleId,
      },
    });

    res.status(201).json(apiResponse(true, 'Usuario registrado exitosamente', newUser));
  } catch (error) {
    console.error(error);
    res.status(500).json(apiResponse(false, 'Error en el servidor'));
  }
};

export const login = async (req, res) => {
  console.log("Estoy entrando al login");
  console.log("Request Body:", req.body);

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return res.status(400).json(apiResponse(false, 'Credenciales incorrectas'));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(apiResponse(false, 'Credenciales incorrectas'));
    }

    const token = jwt.sign(
      { userId: user.id, role: user.roleId },
      SECRET_KEY,
      { expiresIn: '10h' }
    );

    res.json(apiResponse(true, 'Login exitoso', {
      token,
      user: {
        nombre: user.name,
        roleName: user.role.name,
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
      select: {
        id: true,
        name: true,
      },
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


/*mostrar tabla usuarios */
export const getUsuariosConRoles = async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany({
      include: {
        role: true,
      },
    });

    const data = usuarios.map(usuario => ({
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      role: usuario.role?.name || 'Sin rol',
    }));

    res.json(apiResponse(true, 'Usuarios obtenidos correctamente', data));
  } catch (error) {
    console.error(error);
    res.status(500).json(apiResponse(false, 'Error al obtener usuarios'));
  }
};
export const updateUserStructured = async (req, res) => {
  const { id, name, email, roleId } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json(apiResponse(false, "Usuario no encontrado"));
    }

    const resolvedRoleId = (!roleId || roleId === 0) ? user.roleId : roleId;

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        roleId: resolvedRoleId,
      },
    });

    res.json(apiResponse(true, "Usuario actualizado correctamente", updatedUser));
  } catch (error) {
    console.error(error);
    res.status(500).json(apiResponse(false, "Error al actualizar usuario"));
  }
};

export const deleteUserStructured = async (req, res) => {
  const { id } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) {
      return res.status(404).json(apiResponse(false, "Usuario no encontrado"));
    }

    await prisma.user.delete({ where: { id: Number(id) } });

    res.json(apiResponse(true, "Usuario eliminado correctamente"));
  } catch (error) {
    console.error(error);
    res.status(500).json(apiResponse(false, "Error al eliminar usuario"));
  }
};
