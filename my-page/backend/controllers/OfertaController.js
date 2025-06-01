import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const apiResponse = (isSuccess, message, data = null) => ({ isSuccess, message, data });

export class OfertaController {
  static async crearOferta(req, res) {
    const { nombre, descripcion, sueldo, modalidad, creadorId } = req.body;

    if (!creadorId) {
      return res.status(400).json(apiResponse(false, 'Falta el ID del creador'));
    }

    try {
      // Puedes descomentar para validar rol:
      // const creador = await prisma.user.findUnique({ where: { id: creadorId } });
      // const RH_ROLE_ID = 2;
      // if (!creador || creador.roleId !== RH_ROLE_ID) {
      //   return res.status(403).json(apiResponse(false, 'Solo Recursos Humanos puede crear ofertas'));
      // }

      const nuevaOferta = await prisma.oferta.create({
        data: {
          nombre,
          descripcion,
          sueldo: parseFloat(sueldo),
          modalidad,
          creadorId,
          creadoEn: new Date().toISOString(),
        },
      });

      res.status(201).json(apiResponse(true, 'Oferta creada exitosamente', nuevaOferta));
    } catch (error) {
      console.error(error);
      res.status(500).json(apiResponse(false, 'Error al crear la oferta'));
    }
  }

  static async obtenerOfertasParaPostulantes(req, res) {
    const { userId } = req.query;

    try {
      // Validación opcional
      // const user = await prisma.user.findUnique({ where: { id: Number(userId) } });
      // if (!user || user.roleId !== 1) {
      //   return res.status(403).json(apiResponse(false, 'Solo postulantes pueden ver ofertas'));
      // }

      const ofertas = await prisma.oferta.findMany({
        include: { creador: { select: { name: true } } },
        orderBy: { creadoEn: 'desc' },
      });

      res.json(apiResponse(true, 'Ofertas para postulantes obtenidas', ofertas));
    } catch (error) {
      console.error(error);
      res.status(500).json(apiResponse(false, 'Error al obtener ofertas'));
    }
  }
}
