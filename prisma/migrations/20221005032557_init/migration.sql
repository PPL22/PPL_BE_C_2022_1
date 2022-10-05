/*
  Warnings:

  - Added the required column `lamaStudi` to the `tb_skripsi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tb_skripsi` ADD COLUMN `lamaStudi` INTEGER NOT NULL;
