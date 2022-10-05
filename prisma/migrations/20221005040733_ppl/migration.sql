/*
  Warnings:

  - The primary key for the `tb_role_akun_dosen` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The values [Mahasiswa] on the enum `tb_role_akun_dosen_role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `tb_role_akun_dosen` DROP PRIMARY KEY,
    MODIFY `role` ENUM('Operator', 'Departemen', 'Dosen') NOT NULL,
    ADD PRIMARY KEY (`username`, `role`);

-- AddForeignKey
ALTER TABLE `tb_role_akun_dosen` ADD CONSTRAINT `tb_role_akun_dosen_username_fkey` FOREIGN KEY (`username`) REFERENCES `tb_akun_dosen`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;
