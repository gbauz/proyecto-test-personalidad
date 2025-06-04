import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const apiResponse = (isSuccess, message, data = null) => ({
  isSuccess,
  message,
  data,
});

export const iniciarTest = async (req, res) => {
  const { idUsuario, tipoTestId } = req.body;

  if (!idUsuario || !tipoTestId) {
    return res.status(400).json({ isSuccess: false, message: 'Datos incompletos.' });
  }

  try {
    const nuevoTest = await prisma.usuariotest.create({
      data: {
        idUsuario,
        tipoTestId,
        isActive: true,
        codigo: `TEST-${Date.now()}` // o un UUID
      }
    });

    res.json({
      isSuccess: true,
      message: 'Test iniciado.',
      data: { idUsuarioTest: nuevoTest.id }
    });
  } catch (error) {
    console.error('Error al iniciar test:', error);
    res.status(500).json({ isSuccess: false, message: 'Error al iniciar el test.' });
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
