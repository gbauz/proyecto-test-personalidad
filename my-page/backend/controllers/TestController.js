import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';


const prisma = new PrismaClient();

const apiResponse = (isSuccess, message, data = null) => ({
  isSuccess,
  message,
  data,
});


export const postRespuestas = async (req, res) => {
  const lista = req.body;

  if (!Array.isArray(lista) || lista.length === 0) {
    return res.status(400).json(apiResponse(false, 'El cuerpo debe ser una lista de objetos'));
  }

  const usuarioTestId = lista[0]?.idUsuarioTest;
  if (!usuarioTestId) {
    return res.status(400).json(apiResponse(false, 'Falta idUsuarioTest'));
  }

  try {
    // Guardar respuestas
    await prisma.respuestasusuariotest.createMany({
      data: lista,
      skipDuplicates: false,
    });

    // Marcar test como completado
    await prisma.usuariotest.update({
      where: { id: usuarioTestId },
      data: { testCompleted: true },
    });

    // Obtener categorías
    const categorias = await prisma.categoriadepreguntas.findMany();

    // Obtener respuestas con preguntas
    const respuestasConPreguntas = await prisma.respuestasusuariotest.findMany({
      where: { idUsuarioTest: usuarioTestId },
      include: {
        pregunta: true,
      },
    });

    const resultados = [];

    for (const categoria of categorias) {
       const [letra1, letra2] = categoria.nombre.split('/');

  const respuestasDeCategoria = respuestasConPreguntas.filter(
    (r) => r.pregunta.categoriaPreguntasId === categoria.id
  );

  let total = 0;

  for (const respuesta of respuestasDeCategoria) {
    const valor = respuesta.valorLikert; // entre 1 y 5
    const direccion = respuesta.pregunta.letraAsociada; // por ejemplo: "E"

    // Normaliza a -2 ... +2
    const peso = valor - 3;

    // Si la letra favorecida es la primera (letra1), sumamos el puntaje
    // Si es la segunda, restamos
    if (direccion === letra1) {
      total += peso;
    } else {
      total -= peso;
    }
  }

  const letraElegida = total >= 0 ? letra1 : letra2;
  resultados.push(letraElegida);
    }

    const tipoMBTI = resultados.join('');

    const personalidad = await prisma.personalidades.findFirst({
      where: { nombre: tipoMBTI },
    });

    if (!personalidad) {
      return res.status(404).json(apiResponse(false, `Tipo MBTI '${tipoMBTI}' no reconocido`));
    }

    await prisma.resultadosdetest.create({
      data: {
        idUsuarioTest: usuarioTestId,
        idDicotomia: personalidad.id, // Cambia nombre si corresponde
        isActive: true,
      },
    });

    return res.json(apiResponse(true, 'Test completado correctamente', {
      tipoMBTI,
      personalidad: personalidad.nombre,
      descripcion: personalidad.descripcion,
      keywords: personalidad.keywords,
    }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(apiResponse(false, 'Error interno del servidor'));
  }
};


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


