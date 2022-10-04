-- CreateTable
CREATE TABLE `tb_mhs` (
    `nim` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `statusAktif` ENUM('Aktif', 'Cuti', 'Mangkir', 'DO', 'UndurDiri', 'Lulus', 'MeninggalDunia') NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `kodeKab` VARCHAR(191) NOT NULL,
    `kodeProv` VARCHAR(191) NOT NULL,
    `jalurMasuk` ENUM('SBMPTN', 'SNMPTN', 'Mandiri', 'Lainnya') NOT NULL,
    `noHP` VARCHAR(191) NOT NULL,
    `kodeWali` VARCHAR(191) NOT NULL,
    `akun` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_mhs_nim_key`(`nim`),
    UNIQUE INDEX `tb_mhs_akun_key`(`akun`),
    PRIMARY KEY (`nim`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_dosen` (
    `nip` VARCHAR(191) NOT NULL,
    `nama` VARCHAR(191) NOT NULL,
    `alamat` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `kodeKab` VARCHAR(191) NOT NULL,
    `kodeProv` VARCHAR(191) NOT NULL,
    `noHP` VARCHAR(191) NOT NULL,
    `akun` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_dosen_nip_key`(`nip`),
    UNIQUE INDEX `tb_dosen_akun_key`(`akun`),
    PRIMARY KEY (`nip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_irs` (
    `nim` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `jumlahSks` VARCHAR(191) NOT NULL,
    `fileIrs` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_irs_nim_key`(`nim`),
    PRIMARY KEY (`nim`, `semester`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_khs` (
    `nim` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `jumlahSksSemester` VARCHAR(191) NOT NULL,
    `ips` VARCHAR(191) NOT NULL,
    `jumlahSksKumulatif` VARCHAR(191) NOT NULL,
    `ipk` VARCHAR(191) NOT NULL,
    `fileKhs` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_khs_nim_key`(`nim`),
    PRIMARY KEY (`nim`, `semester`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_pkl` (
    `nim` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `filePkl` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_pkl_nim_key`(`nim`),
    PRIMARY KEY (`nim`, `semester`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tb_skripsi` (
    `nim` VARCHAR(191) NOT NULL,
    `semester` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `nilai` VARCHAR(191) NOT NULL,
    `tanggalLulusSidang` DATE NOT NULL,
    `fileSkripsi` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `tb_skripsi_nim_key`(`nim`),
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
CREATE TABLE `tb_user` (
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `status` ENUM('Aktif', 'NonAktif') NOT NULL,
    `role` ENUM('Operator', 'Departemen', 'Dosen', 'Mahasiswa') NOT NULL,

    UNIQUE INDEX `tb_user_username_key`(`username`),
    PRIMARY KEY (`username`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_kodeKab_fkey` FOREIGN KEY (`kodeKab`) REFERENCES `tb_kabupaten`(`kodeKab`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi`(`kodeProv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_kodeWali_fkey` FOREIGN KEY (`kodeWali`) REFERENCES `tb_dosen`(`nip`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_mhs` ADD CONSTRAINT `tb_mhs_akun_fkey` FOREIGN KEY (`akun`) REFERENCES `tb_user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_dosen` ADD CONSTRAINT `tb_dosen_kodeKab_fkey` FOREIGN KEY (`kodeKab`) REFERENCES `tb_kabupaten`(`kodeKab`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_dosen` ADD CONSTRAINT `tb_dosen_kodeProv_fkey` FOREIGN KEY (`kodeProv`) REFERENCES `tb_provinsi`(`kodeProv`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tb_dosen` ADD CONSTRAINT `tb_dosen_akun_fkey` FOREIGN KEY (`akun`) REFERENCES `tb_user`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
