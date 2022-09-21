/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `post` DROP FOREIGN KEY `Post_authorId_fkey`;

-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- DropTable
DROP TABLE `post`;

-- DropTable
DROP TABLE `profile`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `tb_mhs` (
    `nim` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NULL,
    `alamat` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `kodeKab` VARCHAR(191) NULL,
    `kodeProv` VARCHAR(191) NULL,
    `kodeWali` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_mhs_nim_key`(`nim`),
    UNIQUE INDEX `tb_mhs_kodeKab_key`(`kodeKab`),
    PRIMARY KEY (`nim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_dosen` (
    `nip` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_dosen_nip_key`(`nip`),
    PRIMARY KEY (`nip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_irs` (
    `nim` VARCHAR(191) NOT NULL,
    `smt` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `jumlahSks` INTEGER NULL,
    `fileIrs` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_irs_nim_key`(`nim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_khs` (
    `nim` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `jumlahSksSemester` VARCHAR(191) NULL,
    `Ips` VARCHAR(191) NULL,
    `jumlahSksKumulatif` VARCHAR(191) NULL,
    `Ipk` VARCHAR(191) NULL,
    `fileKhs` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_khs_nim_key`(`nim`),
    PRIMARY KEY (`nim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_pkl` (
    `nim` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NULL,
    `semester` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `filePkl` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_pkl_nim_key`(`nim`),
    PRIMARY KEY (`nim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_skripsi` (
    `nim` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NULL,
    `semester` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `fileSkripsi` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_skripsi_nim_key`(`nim`),
    PRIMARY KEY (`nim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_provinsi` (
    `kodeProv` VARCHAR(191) NOT NULL,
    `namaProv` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_provinsi_kodeProv_key`(`kodeProv`),
    PRIMARY KEY (`kodeProv`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_kabupaten` (
    `kodeKab` VARCHAR(191) NOT NULL,
    `namaKab` VARCHAR(191) NULL,
    `kodeProv` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_kabupaten_kodeKab_key`(`kodeKab`),
    PRIMARY KEY (`kodeKab`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_user` (
    `id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `role` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_user_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_irs` ADD CONSTRAINT `tb_irs_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tb_mhs`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_khs` ADD CONSTRAINT `tb_khs_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tb_mhs`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_pkl` ADD CONSTRAINT `tb_pkl_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tb_mhs`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_skripsi` ADD CONSTRAINT `tb_skripsi_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tb_mhs`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_kabupaten` ADD CONSTRAINT `tb_kabupaten_kodeKab_fkey` FOREIGN KEY (`kodeKab`) REFERENCES `tb_mhs`(`kodeKab`) ON DELETE RESTRICT ON UPDATE CASCADE;
