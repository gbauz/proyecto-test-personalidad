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
    // 1. Guardar respuestas
    await prisma.respuestasusuariotest.createMany({
      data: lista,
      skipDuplicates: false,
    });

    // 2. Marcar test como completado
    await prisma.usuariotest.update({
      where: { id: usuarioTestId },
      data: { testCompleted: true },
    });

    // 3. Obtener categorías de dicotomía
    const categorias = await prisma.categoriadepreguntas.findMany();

    // 4. Obtener respuestas del usuario con preguntas y respuestas (para puntaje)
    const respuestasConPreguntas = await prisma.respuestasusuariotest.findMany({
      where: { idUsuarioTest: usuarioTestId },
      include: {
        pregunta: true,
        respuesta: true, // incluye el puntaje
      },
    });

    const resultados = [];

    for (const categoria of categorias) {
      const [letra1, letra2] = categoria.nombre.split('/'); // ej: 'E/I'

      const respuestasDeCategoria = respuestasConPreguntas.filter(
        (r) => r.pregunta.categoriaPreguntasId === categoria.id
      );

      let total = 0;

      for (const respuesta of respuestasDeCategoria) {
        const puntaje = respuesta.respuesta.puntaje; // valor de -2 a 2

        // Puntaje positivo favorece letra1, negativo favorece letra2
        total += puntaje;
      }

      const letraElegida = total >= 0 ? letra1 : letra2;
      resultados.push(letraElegida);
    }

    // 5. Determinar tipo MBTI
    const tipoMBTI = resultados.join('');

    // 6. Buscar personalidad por tipo
    const personalidad = await prisma.personalidades.findFirst({
      where: { nombre: tipoMBTI },
    });

    if (!personalidad) {
      return res.status(404).json(apiResponse(false, `Tipo MBTI '${tipoMBTI}' no reconocido`));
    }

    // 7. Guardar resultado final
    await prisma.resultadosdetest.create({
      data: {
        idUsuarioTest: usuarioTestId,
        idDicotomia: personalidad.id,
        isActive: true,
      },
    });

    // 8. Responder con resultado
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

// export const obtenerTestsCompletados = async (req, res) => {
//   try {
//     const { idUsuario, personalidad, desde, hasta, nombre } = req.query;

//     // Construir filtro de fechas
//     const rangoFechas = {};
//     if (desde && !isNaN(Date.parse(desde))) {
//       rangoFechas.gte = new Date(desde);
//     }
//     if (hasta && !isNaN(Date.parse(hasta))) {
//       rangoFechas.lte = new Date(new Date(hasta).setHours(23, 59, 59, 999))
//     }

//     // Construir filtro de usuariotest combinando nombre y idUsuario
//     const filtroUsuarioTest = {};
//     if (idUsuario) {
//       filtroUsuarioTest.idUsuario = Number(idUsuario);
//     }
//     if (nombre) {
//       filtroUsuarioTest.user = {
//         name: {
//           contains: nombre,
//         },
//       };
//     }

//     const filtros = {
//       isActive: true,
//       ...(Object.keys(filtroUsuarioTest).length > 0 && {
//         usuariotest: filtroUsuarioTest,
//       }),
//       ...(personalidad && {
//         personalidades: {
//           nombre: {
//             contains: personalidad,
//           },
//         },
//       }),
//       ...(Object.keys(rangoFechas).length > 0 && {
//         createdAt: rangoFechas,
//       }),
//     };

//     const resultados = await prisma.resultadosdetest.findMany({
//       where: filtros,
//       include: {
//         personalidades: true,
//         usuariotest: {
//           include: {
//             user: {
//               select: {
//                 id: true,
//                 name: true,
//                 email: true,
//                 roleId: true,
//                 isActive: true,
//               },
//             },
//           },
//         },
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return res.json({
//       isSuccess: true,
//       message: "Tests obtenidos correctamente",
//       data: resultados,
//     });
//   } catch (error) {
//     console.error("Error al obtener tests completados:", error);
//     return res.status(500).json({
//       isSuccess: false,
//       message: "Error del servidor",
//     });
//   }
// };


export const obtenerTestsCompletados = async (req, res) => {
  try {
    const { idUsuario, personalidad, desde, hasta, nombre } = req.query;

    const filtros = {
      isActive: true,
      ...(idUsuario && {
        usuariotest: {
          idUsuario: Number(idUsuario),
        },
      }),
      ...(personalidad && {
        personalidades: {
          nombre: {
            contains: personalidad,
          },
        },
      }),
      ...(desde || hasta
        ? {
            createdAt: {
              ...(desde ? { gte: new Date(desde) } : {}),
              ...(hasta
                ? {
                    lte: new Date(
                      new Date(hasta).setHours(23, 59, 59, 999)
                    ),
                  }
                : {}),
            },
          }
        : {}),
      ...(nombre && {
        usuariotest: {
          user: {
            name: {
              contains: nombre,
            },
          },
        },
      }),
    };

    const resultados = await prisma.resultadosdetest.findMany({
      where: filtros,
      include: {
        personalidades: true,
        usuariotest: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                roleId: true,
                isActive: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return res.json({
      isSuccess: true,
      message: 'Tests obtenidos correctamente',
      data: resultados,
    });
  } catch (error) {
    console.error('Error al obtener tests completados:', error);
    return res.status(500).json({
      isSuccess: false,
      message: 'Error del servidor',
    });
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


