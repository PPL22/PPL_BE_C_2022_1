/*
  Warnings:

  - You are about to drop the column `smt` on the `tb_irs` table. All the data in the column will be lost.
  - The primary key for the `tb_khs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Ipk` on the `tb_khs` table. All the data in the column will be lost.
  - You are about to drop the column `Ips` on the `tb_khs` table. All the data in the column will be lost.
  - The primary key for the `tb_pkl` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nama` on the `tb_pkl` table. All the data in the column will be lost.
  - The primary key for the `tb_skripsi` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `nama` on the `tb_skripsi` table. All the data in the column will be lost.
  - The primary key for the `tb_user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `tb_user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `tb_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerMhs]` on the table `tb_user` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerDosen]` on the table `tb_user` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nama` on table `tb_dosen` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `tb_dosen` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `semester` to the `tb_irs` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `tb_irs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jumlahSks` on table `tb_irs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileIrs` on table `tb_irs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `namaKab` on table `tb_kabupaten` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kodeProv` on table `tb_kabupaten` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `ipk` to the `tb_khs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ips` to the `tb_khs` table without a default value. This is not possible if the table is not empty.
  - Made the column `semester` on table `tb_khs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `tb_khs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jumlahSksSemester` on table `tb_khs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `jumlahSksKumulatif` on table `tb_khs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileKhs` on table `tb_khs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nama` on table `tb_mhs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `alamat` on table `tb_mhs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `tb_mhs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kodeKab` on table `tb_mhs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kodeProv` on table `tb_mhs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kodeWali` on table `tb_mhs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `semester` on table `tb_pkl` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `tb_pkl` required. This step will fail if there are existing NULL values in that column.
  - Made the column `filePkl` on table `tb_pkl` required. This step will fail if there are existing NULL values in that column.
  - Made the column `namaProv` on table `tb_provinsi` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `nilai` to the `tb_skripsi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalLulusSidang` to the `tb_skripsi` table without a default value. This is not possible if the table is not empty.
  - Made the column `semester` on table `tb_skripsi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `tb_skripsi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fileSkripsi` on table `tb_skripsi` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `tb_user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `password` on table `tb_user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `role` on table `tb_user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `tb_kabupaten` DROP FOREIGN KEY `tb_kabupaten_kodeKab_fkey`;

-- DropIndex
DROP INDEX `tb_mhs_kodeKab_key` ON `tb_mhs`;

-- DropIndex
DROP INDEX `tb_user_id_key` ON `tb_user`;

-- AlterTable
ALTER TABLE `tb_dosen` MODIFY `nama` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tb_irs` DROP COLUMN `smt`,
    ADD COLUMN `semester` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL,
    MODIFY `jumlahSks` INTEGER NOT NULL,
    MODIFY `fileIrs` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`nim`, `semester`);

-- AlterTable
ALTER TABLE `tb_kabupaten` MODIFY `namaKab` VARCHAR(191) NOT NULL,
    MODIFY `kodeProv` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tb_khs` DROP PRIMARY KEY,
    DROP COLUMN `Ipk`,
    DROP COLUMN `Ips`,
    ADD COLUMN `ipk` VARCHAR(191) NOT NULL,
    ADD COLUMN `ips` VARCHAR(191) NOT NULL,
    MODIFY `semester` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL,
    MODIFY `jumlahSksSemester` VARCHAR(191) NOT NULL,
    MODIFY `jumlahSksKumulatif` VARCHAR(191) NOT NULL,
    MODIFY `fileKhs` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`nim`, `semester`);

-- AlterTable
ALTER TABLE `tb_mhs` MODIFY `nama` VARCHAR(191) NOT NULL,
    MODIFY `alamat` VARCHAR(191) NOT NULL,
    MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `kodeKab` VARCHAR(191) NOT NULL,
    MODIFY `kodeProv` VARCHAR(191) NOT NULL,
    MODIFY `kodeWali` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tb_pkl` DROP PRIMARY KEY,
    DROP COLUMN `nama`,
    MODIFY `semester` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL,
    MODIFY `filePkl` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`nim`, `semester`);

-- AlterTable
ALTER TABLE `tb_provinsi` MODIFY `namaProv` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tb_skripsi` DROP PRIMARY KEY,
    DROP COLUMN `nama`,
    ADD COLUMN `nilai` VARCHAR(191) NOT NULL,
    ADD COLUMN `tanggalLulusSidang` DATETIME(3) NOT NULL,
    MODIFY `semester` VARCHAR(191) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL,
    MODIFY `fileSkripsi` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`nim`, `semester`);

-- AlterTable
ALTER TABLE `tb_user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `ownerDosen` VARCHAR(191) NULL,
    ADD COLUMN `ownerMhs` VARCHAR(191) NULL,
    MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL,
    MODIFY `role` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`username`);

-- CreateIndex
CREATE UNIQUE INDEX `tb_user_username_key` ON `tb_user`(`username`);

-- CreateIndex
CREATE UNIQUE INDEX `tb_user_ownerMhs_key` ON `tb_user`(`ownerMhs`);

-- CreateIndex
CREATE UNIQUE INDEX `tb_user_ownerDosen_key` ON `tb_user`(`ownerDosen`);

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_kodeKab_fkey` FOREIGN KEY (`kodeKab`) REFERENCES `tb_kabupaten`(`kodeKab`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi`(`kodeProv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_kodeWali_fkey` FOREIGN KEY (`kodeWali`) REFERENCES `tb_dosen`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_kabupaten` ADD CONSTRAINT `tb_kabupaten_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi`(`kodeProv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_user` ADD CONSTRAINT `tb_user_ownerMhs_fkey` FOREIGN KEY (`ownerMhs`) REFERENCES `tb_mhs`(`nim`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_user` ADD CONSTRAINT `tb_user_ownerDosen_fkey` FOREIGN KEY (`ownerDosen`) REFERENCES `tb_dosen`(`nip`) ON DELETE SET NULL ON UPDATE CASCADE;
