/*
  Warnings:

  - You are about to drop the column `akun` on the `tb_dosen` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `tb_dosen_akun_key` ON `tb_dosen`;

-- AlterTable
ALTER TABLE `tb_dosen` DROP COLUMN `akun`;
