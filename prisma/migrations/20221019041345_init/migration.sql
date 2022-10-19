/*
  Warnings:

  - You are about to alter the column `status` on the `tb_irs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("tb_irs_status")`.
  - You are about to alter the column `status` on the `tb_khs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("tb_khs_status")`.
  - You are about to drop the column `status` on the `tb_pkl` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `tb_skripsi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tb_irs` ADD COLUMN `statusValidasi` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `status` ENUM('Aktif', 'Cuti') NOT NULL,
    MODIFY `jumlahSks` VARCHAR(191) NULL,
    MODIFY `fileIrs` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tb_khs` ADD COLUMN `statusValidasi` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `status` ENUM('Aktif', 'Cuti') NOT NULL,
    MODIFY `jumlahSksSemester` VARCHAR(191) NULL,
    MODIFY `ips` VARCHAR(191) NULL,
    MODIFY `jumlahSksKumulatif` VARCHAR(191) NULL,
    MODIFY `ipk` VARCHAR(191) NULL,
    MODIFY `fileKhs` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tb_mhs` MODIFY `statusAktif` ENUM('Aktif', 'Cuti', 'Lulus', 'Mangkir', 'DO', 'UndurDiri', 'MeninggalDunia') NOT NULL;

-- AlterTable
ALTER TABLE `tb_pkl` DROP COLUMN `status`,
    ADD COLUMN `statusValidasi` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `tb_skripsi` DROP COLUMN `status`,
    ADD COLUMN `statusValidasi` BOOLEAN NOT NULL DEFAULT false;
