-- CreateTable
CREATE TABLE `tb_mhs` (
    `nim` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `statusAktif` ENUM('Aktif', 'Cuti', 'Lulus', 'Mangkir', 'DO', 'UndurDiri', 'MeninggalDunia') NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `kodeKab` VARCHAR(191) NULL,
    `kodeProv` VARCHAR(191) NULL,
    `jalurMasuk` ENUM('SBMPTN', 'SNMPTN', 'Mandiri', 'Lainnya') NOT NULL,
    `angkatan` INTEGER NOT NULL,
    `noHP` VARCHAR(191) NULL,
    `kodeWali` VARCHAR(191) NOT NULL,
    `foto` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_mhs_nim_key`(`nim`),
    PRIMARY KEY (`nim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_dosen` (
    `nip` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `kodeKab` VARCHAR(191) NULL,
    `kodeProv` VARCHAR(191) NULL,
    `noHP` VARCHAR(191) NULL,
    `foto` VARCHAR(191) NULL,

    UNIQUE INDEX `tb_dosen_nip_key`(`nip`),
    PRIMARY KEY (`nip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_irs` (
    `nim` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `status` ENUM('Aktif', 'Cuti') NOT NULL,
    `jumlahSks` VARCHAR(191) NULL,
    `fileIrs` VARCHAR(191) NULL,
    `statusValidasi` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`nim`, `semester`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_khs` (
    `nim` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `status` ENUM('Aktif', 'Cuti') NOT NULL,
    `jumlahSksSemester` VARCHAR(191) NULL,
    `ips` VARCHAR(191) NULL,
    `jumlahSksKumulatif` VARCHAR(191) NULL,
    `ipk` VARCHAR(191) NULL,
    `fileKhs` VARCHAR(191) NULL,
    `statusValidasi` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`nim`, `semester`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_pkl` (
    `nim` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `nilai` VARCHAR(191) NOT NULL,
    `filePkl` VARCHAR(191) NOT NULL,
    `statusValidasi` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`nim`, `semester`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_skripsi` (
    `nim` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `nilai` VARCHAR(191) NOT NULL,
    `tanggalLulusSidang` DATE NOT NULL,
    `lamaStudi` INTEGER NOT NULL,
    `fileSkripsi` VARCHAR(191) NOT NULL,
    `statusValidasi` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`nim`, `semester`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_provinsi` (
    `kodeProv` VARCHAR(191) NOT NULL,
    `namaProv` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_provinsi_kodeProv_key`(`kodeProv`),
    PRIMARY KEY (`kodeProv`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_kabupaten` (
    `kodeKab` VARCHAR(191) NOT NULL,
    `namaKab` VARCHAR(191) NOT NULL,
    `kodeProv` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_kabupaten_kodeKab_key`(`kodeKab`),
    PRIMARY KEY (`kodeKab`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_akun_mhs` (
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` ENUM('Aktif', 'NonAktif') NOT NULL,
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
    `pemilik` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_akun_dosen_username_key`(`username`),
    UNIQUE INDEX `tb_akun_dosen_pemilik_key`(`pemilik`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_role_akun_dosen` (
    `username` VARCHAR(191) NOT NULL,
    `role` ENUM('Operator', 'Departemen', 'Dosen') NOT NULL,

    PRIMARY KEY (`username`, `role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_kodeKab_fkey` FOREIGN KEY (`kodeKab`) REFERENCES `tb_kabupaten`(`kodeKab`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi`(`kodeProv`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_kodeWali_fkey` FOREIGN KEY (`kodeWali`) REFERENCES `tb_dosen`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_dosen` ADD CONSTRAINT `tb_dosen_kodeKab_fkey` FOREIGN KEY (`kodeKab`) REFERENCES `tb_kabupaten`(`kodeKab`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_dosen` ADD CONSTRAINT `tb_dosen_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi`(`kodeProv`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_irs` ADD CONSTRAINT `tb_irs_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tb_mhs`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_khs` ADD CONSTRAINT `tb_khs_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tb_mhs`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_pkl` ADD CONSTRAINT `tb_pkl_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tb_mhs`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_skripsi` ADD CONSTRAINT `tb_skripsi_nim_fkey` FOREIGN KEY (`nim`) REFERENCES `tb_mhs`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_kabupaten` ADD CONSTRAINT `tb_kabupaten_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi`(`kodeProv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_akun_mhs` ADD CONSTRAINT `tb_akun_mhs_pemilik_fkey` FOREIGN KEY (`pemilik`) REFERENCES `tb_mhs`(`nim`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_akun_dosen` ADD CONSTRAINT `tb_akun_dosen_pemilik_fkey` FOREIGN KEY (`pemilik`) REFERENCES `tb_dosen`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_role_akun_dosen` ADD CONSTRAINT `tb_role_akun_dosen_username_fkey` FOREIGN KEY (`username`) REFERENCES `tb_akun_dosen`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
