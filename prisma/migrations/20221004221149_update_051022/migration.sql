/*
  Warnings:

  - Added the required column `angkatan` to the `tb_mhs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_mhs` ADD COLUMN `angkatan` INTEGER NOT NULL;
