/*
  Warnings:

  - You are about to drop the column `testCompleted` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `testCompleted`;

-- AlterTable
ALTER TABLE `usuariotest` ADD COLUMN `testCompleted` BOOLEAN NOT NULL DEFAULT false;
