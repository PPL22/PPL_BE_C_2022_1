const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const ResizeFile = require("../utils/resizeFile");
const path = require("path");
const fs = require("fs");

const updateDataMahasiswa = async (data) => {
  try {
    if (data.oldUsername !== data.username) {
      const checkUsername = await prisma.tb_akun_mhs.findUnique({
        where: {
          username: data.username,
        },
      });

      if (checkUsername) {
        throw new Error("Username sudah digunakan");
      }
    }

    const kodeProv = data.kodeKab.substring(0, 2);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const imagePath = path.join(__dirname, "../../public/images/foto_mhs/");
    const fileUpload = new ResizeFile(
      imagePath,
      path.extname(data.foto.originalname)
    );
    const fileName = await fileUpload.save(data.foto.buffer);

    const [updateAkun, updateMahasiswa] = await prisma.$transaction([
      prisma.tb_akun_mhs.update({
        where: {
          pemilik: data.nim,
        },
        data: {
          username: data.username,
          password: hashedPassword,
        },
      }),
      prisma.tb_mhs.update({
        where: {
          nim: data.nim,
        },
        data: {
          email: data.email,
          alamat: data.alamat,
          kodeKab: data.kodeKab,
          kodeProv: kodeProv,
          noHP: data.noHP,
          foto: fileName,
        },
      }),
    ]);

    if (!updateAkun || !updateMahasiswa) {
      throw new Error("Terjadi kesalahan, silahkan coba lagi");
    }

    return updateMahasiswa;
  } catch (error) {
    throw new Error(error);
  }
};

const entryDataIrs = async (data) => {
  console.log(data);
  try {
    const fileName = `irs-${data.nim}-${data.semester}.pdf`;
    fs.renameSync(
      `public/documents/${data.dokumen.originalname}`,
      `public/documents/irs/${fileName}`
    );

    const result = await prisma.tb_irs.create({
      data: {
        nim: data.nim,
        semester: data.semester,
        status: data.status,
        jumlahSks: data.jumlahSks,
        fileIrs: fileName,
      },
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const entryDataKhs = async (data) => {
  try {
    const fileName = `khs-${data.nim}-${data.semester}.pdf`;
    fs.renameSync(
      `public/documents/${data.dokumen.originalname}`,
      `public/documents/khs/${fileName}`
    );

    const result = await prisma.tb_khs.create({
      data: {
        nim: data.nim,
        semester: data.semester,
        status: data.status,
        jumlahSksSemester: data.jumlahSksSemester,
        ips: data.ips,
        jumlahSKsKumulatif: data.jumlahSKsKumulatif,
        ipk: data.ipk,
        fileKhs: fileName,
      },
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const entryDataPkl = async (data) => {
  try {
    const fileName = `pkl-${data.nim}-${data.semester}.pdf`;
    fs.renameSync(
      `public/documents/${data.dokumen.originalname}`,
      `public/documents/pkl/${fileName}`
    );

    const result = await prisma.tb_pkl.create({
      data: {
        nim: data.nim,
        semester: data.semester,
        status: data.status,
        nilai: data.nilai,
        file: fileName,
      },
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const entryDataSkripsi = async (data) => {
  try {
    const fileName = `skripsi-${data.nim}-${data.semester}.pdf`;
    fs.renameSync(
      `public/documents/${data.dokumen.originalname}`,
      `public/documents/skripsi/${fileName}`
    );

    const result = await prisma.tb_skripsi.create({
      data: {
        nim: data.nim,
        semester: data.semester,
        status: data.status,
        nilai: data.nilai,
        tanggalLulusSidang: data.tanggalLulusSidang,
        fileSkripsi: fileName,
      },
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const getProfileMahasiswa = async ({ data }) => {
  try {
    const result = await prisma.tb_mhs.findUnique({
      where: {
        nim: data.nim,
      },
      select: {
        fk_nim_khs: true,
        fk_nim_irs: {
          select: {
            semester: true,
            status: true,
          },
        },
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  updateDataMahasiswa,
  entryDataIrs,
  entryDataKhs,
  entryDataPkl,
  entryDataSkripsi,
  getProfileMahasiswa,
};
