-- DropForeignKey
ALTER TABLE `tb_dosen` DROP FOREIGN KEY `tb_dosen_kodeKab_fkey`;

-- DropForeignKey
ALTER TABLE `tb_dosen` DROP FOREIGN KEY `tb_dosen_kodeProv_fkey`;

-- DropForeignKey
ALTER TABLE `tb_mhs` DROP FOREIGN KEY `tb_mhs_kodeKab_fkey`;

-- DropForeignKey
ALTER TABLE `tb_mhs` DROP FOREIGN KEY `tb_mhs_kodeProv_fkey`;

-- AlterTable
ALTER TABLE `tb_dosen` MODIFY `alamat` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `kodeKab` VARCHAR(191) NULL,
    MODIFY `kodeProv` VARCHAR(191) NULL,
    MODIFY `noHP` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `tb_mhs` MODIFY `alamat` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `kodeKab` VARCHAR(191) NULL,
    MODIFY `kodeProv` VARCHAR(191) NULL,
    MODIFY `noHP` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_kodeKab_fkey` FOREIGN KEY (`kodeKab`) REFERENCES `tb_kabupaten`(`kodeKab`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi`(`kodeProv`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_dosen` ADD CONSTRAINT `tb_dosen_kodeKab_fkey` FOREIGN KEY (`kodeKab`) REFERENCES `tb_kabupaten`(`kodeKab`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_dosen` ADD CONSTRAINT `tb_dosen_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi`(`kodeProv`) ON DELETE SET NULL ON UPDATE CASCADE;
