-- AlterTable
ALTER TABLE `postulacion` ADD COLUMN `estadoAprobacion` ENUM('ACEPTADA', 'RECHAZADA', 'PENDIENTE') NOT NULL DEFAULT 'PENDIENTE';
