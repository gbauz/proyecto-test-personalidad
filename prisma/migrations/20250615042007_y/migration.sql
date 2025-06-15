/*
  Warnings:

  - You are about to alter the column `descripcion` on the `oferta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2000)` to `VarChar(191)`.
  - You are about to alter the column `descripcion` on the `personalidades` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2000)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `oferta` MODIFY `descripcion` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `personalidades` MODIFY `descripcion` VARCHAR(191) NULL;
