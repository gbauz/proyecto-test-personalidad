import { PrismaClient } from "@prisma/client";
import path from "path";
import fs from "fs/promises";

const prisma = new PrismaClient();
const apiResponse = (isSuccess, message, data = null) => ({ isSuccess, message, data });

const UPLOAD_DIR_FOTOS = path.join(process.cwd(), "uploads", "fotos");
const UPLOAD_DIR_CV = path.join(process.cwd(), "uploads", "cv");

export class PerfilController {
  // Obtener perfil de un usuario por id
  static async getPerfilByUserId(req, res) {
    const userId = Number(req.params.userId);
    try {
      const perfil = await prisma.perfil.findUnique({
        where: { userId },
      });
      if (!perfil) {
        return res.json(apiResponse(true, "Perfil no encontrado", null));
      }
      res.json(apiResponse(true, "Perfil encontrado", perfil));
    } catch (error) {
      console.error(error);
      res.status(500).json(apiResponse(false, "Error al obtener perfil"));
    }
  }

  // Actualizar perfil con datos y archivos (foto y curriculum)
  static async updatePerfil(req, res) {
    try {
      const userId = Number(req.body.userId);
      const { cedula, sexo, pais, ciudad } = req.body;

      if (!userId) return res.status(400).json(apiResponse(false, "Falta userId"));

      // Preparar data a actualizar
      const dataToUpdate = {
        cedula,
        sexo,
        pais,
        ciudad,
      };

      // Manejar archivos subidos (fotoPerfil y curriculum)
      if (req.files) {
        // Fotos
        if (req.files.fotoPerfil) {
          const fotoFile = req.files.fotoPerfil[0];
          // Mover archivo a carpeta fotos
          const newFotoPath = path.join("uploads", "fotos", fotoFile.originalname);
          await fs.rename(fotoFile.path, newFotoPath);
          dataToUpdate.fotoPerfil = newFotoPath;
        }

        // Curriculum
        if (req.files.curriculum) {
          const cvFile = req.files.curriculum[0];
          const newCvPath = path.join("uploads", "cv", cvFile.originalname);
          await fs.rename(cvFile.path, newCvPath);
          dataToUpdate.curriculum = newCvPath;
        }
      }

      // Verificar si ya existe perfil para el usuario
      const existingPerfil = await prisma.perfil.findUnique({ where: { userId } });

      let perfil;
      if (existingPerfil) {
        perfil = await prisma.perfil.update({
          where: { userId },
          data: dataToUpdate,
        });
      } else {
        perfil = await prisma.perfil.create({
          data: {
            userId,
            ...dataToUpdate,
          },
        });
      }

      res.json(apiResponse(true, "Perfil actualizado", perfil));
    } catch (error) {
      console.error(error);
      res.status(500).json(apiResponse(false, "Error al actualizar perfil"));
    }
  }
}
