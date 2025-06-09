import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';


const prisma = new PrismaClient();

const apiResponse = (isSuccess, message, data = null) => ({
  isSuccess,
  message,
  data,
});

export const verificarTest = async (req, res) => {
  try {
    const { idUsuario } = req.body;

    if (!idUsuario) {
      return res.status(400).json(apiResponse(false, "Falta el ID del usuario."));
    }

    const testExistente = await prisma.usuariotest.findFirst({
      where: { idUsuario },
    });

    if (testExistente) {
      return res.json(
        apiResponse(true, "Ya se ha llenado el test.", {
          idUsuarioTest: testExistente.id,
        })
      );
    } else {
      return res.json(apiResponse(true, "No hay test existente.", null));
    }
  } catch (err) {
    console.error("Error al verificar test:", err);
    return res
      .status(500)
      .json(apiResponse(false, "Error al buscar test."));
  }
};


export const iniciarTest = async (req, res) => {
  const { idUsuario, tipoTestId } = req.body;

  if (typeof idUsuario !== 'number' || typeof tipoTestId !== 'number') {
    return res.status(400).json(apiResponse(false, 'Datos inválidos.'));
  }

  try {
    // Verifica si ya existe CUALQUIER test creado por el usuario
    const testExistente = await prisma.usuariotest.findFirst({
      where: {
        idUsuario,
      },
    });

    if (testExistente) {
      return res
        .status(409)
        .json(apiResponse(false, 'Ya tienes un test creado. No puedes crear otro.'));
    }

    // Si no tiene ningún test, se crea uno nuevo
    const nuevoTest = await prisma.usuariotest.create({
      data: {
        idUsuario,
        tipoTestId,
        isActive: true,
        codigo: `TEST-${uuidv4()}`,
      },
    });

    return res.json(
      apiResponse(true, 'Test iniciado.', {
        idUsuarioTest: nuevoTest.id,
      })
    );
  } catch (error) {
    console.error('Error al iniciar test:', error);
    return res
      .status(500)
      .json(apiResponse(false, 'Error interno al iniciar el test.'));
  }
};

export const eliminarTestNoCompletado = async (req, res) => {
  const { idUsuario } = req.body;

  if (typeof idUsuario !== 'number') {
    return res.status(400).json(apiResponse(false, 'ID de usuario inválido.'));
  }

  try {
    // Borra los tests asociados al usuario (frontend valida si debe eliminarse o no)
    const deleted = await prisma.usuariotest.deleteMany({
      where: {
        idUsuario,
      },
    });

    return res.json(apiResponse(true, 'Test eliminado correctamente.', { count: deleted.count }));
  } catch (error) {
    console.error('Error al eliminar test:', error);
    return res.status(500).json(apiResponse(false, 'Error al eliminar el test.'));
  }
};



export const getTestPersonality = async (req, res) => {
  try {
    const test = await prisma.pregunta.findMany({
      where: {
        categoriadepreguntas: {
          tipoTestId: 1,
        },
      },
      include: {
        categoriadepreguntas: true,
      },
    });

    const data = test.map(u => ({
      id: u.id,
      pregunta: u.pregunta,
      categoriaPreguntasId: u.categoriaPreguntasId,
      categoria: u.categoriadepreguntas.nombre,
      ordenCategoria: u.categoriadepreguntas.orden,
      tipoTestId: u.categoriadepreguntas.tipoTestId,
    }));

    res.json(apiResponse(true, 'Preguntas de tipo test obtenidas correctamente', data));
  } catch (error) {
    console.error(error);
    res.status(500).json(apiResponse(false, 'Error al obtener preguntas de tipo test'));
  }
};

export const getRespuestasActivas = async (req, res) => {
  try {
    const respuestas = await prisma.respuesta.findMany({
      where: { isActive: true },
      orderBy: { puntaje: 'desc' },
    });

    res.json(apiResponse(true, 'Respuestas activas obtenidas correctamente', respuestas));
  } catch (error) {
    console.error(error);
    res.status(500).json(apiResponse(false, 'Error al obtener respuestas'));
  }
};
