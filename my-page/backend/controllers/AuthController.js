import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const SECRET_KEY = 'tu_clave_secreta'; // ¡Luego pásalo a process.env.SECRET_KEY!

export const register = async (req, res) => {
  let { email, password, name, roleId } = req.body;
  console.log("id",roleId)
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    const DEFAULT_ROLE_ID = 4;

    roleId = (roleId === undefined || roleId === null || roleId === 0) ? DEFAULT_ROLE_ID : roleId;
 
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        roleId
      }
    });

    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export const login = async (req, res) => {
  console.log("Estoy entrando al login");
  console.log("Request Body:", req.body);

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email },
                 include: {role: true}                                        
    });
    if (!user) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales incorrectas' });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.roleId },
      SECRET_KEY,
      { expiresIn: '10h' }
    );

    res.json({ message: 'Login exitoso',
               token,
              user: {
                nombre: user.name,
                roleName: user.role.name,
              }
              });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};


export const getRoles = async (req, res) => {
  try {
    const roles = await prisma.role.findMany({
      select: {
        id: true,
        name: true
      }
    });

    const formatted = roles.map(role => ({
      value: role.id,
      label: role.name
    }));

    res.json(formatted);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudieron obtener los roles' });
  }
};
