/*
  Warnings:

  - The primary key for the `tb_akun_dosen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role` on the `tb_akun_dosen` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `tb_akun_dosen` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `tb_akun_dosen` DROP PRIMARY KEY,
    DROP COLUMN `role`,
    ADD PRIMARY KEY (`username`);

-- CreateTable
CREATE TABLE `tb_role_akun_dosen` (
    `username` VARCHAR(191) NOT NULL,
    `role` ENUM('Operator', 'Departemen', 'Dosen', 'Mahasiswa') NOT NULL,

    PRIMARY KEY (`username`, `role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `tb_akun_dosen_username_key` ON `tb_akun_dosen`(`username`);
