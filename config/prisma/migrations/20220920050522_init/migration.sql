/*
  Warnings:

  - Made the column `kodeKab` on table `tb_mhs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kodeProv` on table `tb_mhs` required. This step will fail if there are existing NULL values in that column.
  - Made the column `kodeWali` on table `tb_mhs` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `tb_kabupaten` DROP FOREIGN KEY `tb_kabupaten_kodeKab_fkey`;

-- AlterTable
ALTER TABLE `tb_mhs` MODIFY `kodeKab` VARCHAR(191) NOT NULL,
    MODIFY `kodeProv` VARCHAR(191) NOT NULL,
    MODIFY `kodeWali` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_kodeKab_fkey` FOREIGN KEY (`kodeKab`) REFERENCES `tb_kabupaten`(`kodeKab`) ON DELETE RESTRICT ON UPDATE CASCADE;
