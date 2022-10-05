/*
  Warnings:

  - Added the required column `nilai` to the `tb_pkl` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_pkl` ADD COLUMN `nilai` VARCHAR(191) NOT NULL;
