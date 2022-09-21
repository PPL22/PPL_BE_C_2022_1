/*
  Warnings:

  - You are about to drop the column `ownerDosen` on the `tb_user` table. All the data in the column will be lost.
  - You are about to drop the column `ownerMhs` on the `tb_user` table. All the data in the column will be lost.
  - You are about to alter the column `role` on the `tb_user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("tb_user_role")`.
  - A unique constraint covering the columns `[akun]` on the table `tb_dosen` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[akun]` on the table `tb_mhs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `akun` to the `tb_dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alamat` to the `tb_dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeKab` to the `tb_dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kodeProv` to the `tb_dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noHP` to the `tb_dosen` table without a default value. This is not possible if the table is not empty.
  - Added the required column `akun` to the `tb_mhs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jalurMasuk` to the `tb_mhs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `noHP` to the `tb_mhs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusAktif` to the `tb_mhs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `tb_user` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `tb_user` DROP FOREIGN KEY `tb_user_ownerDosen_fkey`;

-- DropForeignKey
ALTER TABLE `tb_user` DROP FOREIGN KEY `tb_user_ownerMhs_fkey`;

-- AlterTable
ALTER TABLE `tb_dosen` ADD COLUMN `akun` VARCHAR(191) NOT NULL,
    ADD COLUMN `alamat` VARCHAR(191) NOT NULL,
    ADD COLUMN `kodeKab` VARCHAR(191) NOT NULL,
    ADD COLUMN `kodeProv` VARCHAR(191) NOT NULL,
    ADD COLUMN `noHP` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tb_irs` MODIFY `jumlahSks` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `tb_mhs` ADD COLUMN `akun` VARCHAR(191) NOT NULL,
    ADD COLUMN `jalurMasuk` ENUM('SBMPTN', 'SNMPTN', 'Mandiri', 'Lainnya') NOT NULL,
    ADD COLUMN `noHP` VARCHAR(191) NOT NULL,
    ADD COLUMN `statusAktif` ENUM('Aktif', 'Cuti', 'Mangkir', 'DO', 'UndurDiri', 'Lulus', 'MeninggalDunia') NOT NULL;

-- AlterTable
ALTER TABLE `tb_skripsi` MODIFY `tanggalLulusSidang` DATE NOT NULL;

-- AlterTable
ALTER TABLE `tb_user` DROP COLUMN `ownerDosen`,
    DROP COLUMN `ownerMhs`,
    ADD COLUMN `status` ENUM('Aktif', 'NonAktif') NOT NULL,
    MODIFY `role` ENUM('Operator', 'Departemen', 'Dosen', 'Mahasiswa') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `tb_dosen_akun_key` ON `tb_dosen`(`akun`);

-- CreateIndex
CREATE UNIQUE INDEX `tb_mhs_akun_key` ON `tb_mhs`(`akun`);

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_akun_fkey` FOREIGN KEY (`akun`) REFERENCES `tb_user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_dosen` ADD CONSTRAINT `tb_dosen_kodeKab_fkey` FOREIGN KEY (`kodeKab`) REFERENCES `tb_kabupaten`(`kodeKab`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_dosen` ADD CONSTRAINT `tb_dosen_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi`(`kodeProv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_dosen` ADD CONSTRAINT `tb_dosen_akun_fkey` FOREIGN KEY (`akun`) REFERENCES `tb_user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
