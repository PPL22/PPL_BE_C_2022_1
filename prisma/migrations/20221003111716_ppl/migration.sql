/*
  Warnings:

  - You are about to drop the column `akun` on the `tb_mhs` table. All the data in the column will be lost.
  - You are about to drop the `tb_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tb_dosen` DROP FOREIGN KEY `tb_dosen_akun_fkey`;

-- DropForeignKey
ALTER TABLE `tb_mhs` DROP FOREIGN KEY `tb_mhs_akun_fkey`;

-- AlterTable
ALTER TABLE `tb_mhs` DROP COLUMN `akun`;

-- DropTable
DROP TABLE `tb_user`;

-- CreateTable
CREATE TABLE `tb_akun_mhs` (
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` ENUM('Aktif', 'NonAktif') NOT NULL,
    `role` ENUM('Operator', 'Departemen', 'Dosen', 'Mahasiswa') NOT NULL,
    `pemilik` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_akun_mhs_username_key`(`username`),
    UNIQUE INDEX `tb_akun_mhs_pemilik_key`(`pemilik`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_akun_dosen` (
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` ENUM('Aktif', 'NonAktif') NOT NULL,
    `role` ENUM('Operator', 'Departemen', 'Dosen', 'Mahasiswa') NOT NULL,
    `pemilik` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_akun_dosen_pemilik_key`(`pemilik`),
    PRIMARY KEY (`username`, `role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_akun_mhs` ADD CONSTRAINT `tb_akun_mhs_pemilik_fkey` FOREIGN KEY (`pemilik`) REFERENCES `tb_mhs`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_akun_dosen` ADD CONSTRAINT `tb_akun_dosen_pemilik_fkey` FOREIGN KEY (`pemilik`) REFERENCES `tb_dosen`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;
