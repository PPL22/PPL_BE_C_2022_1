const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const validasiDataIrs = async (data) => {
  try {
    const result = await prisma.tb_irs.update({
      where: {
        nim: data.nim,
      },
      data: {
        semester: data.semester,
        status: data.status,
        jumlahSks: data.jumlahSks,
      },
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const validasiDataKhs = async (data) => {
  try {
    const result = await prisma.tb_khs.update({
      where: {
        nim: data.nim,
      },
      data: {
        semester: data.semester,
        status: data.status,
        jumlahSksSemester: data.jumlahSksSemester,
        ips: data.ips,
        jumlahSKsKumulatif: data.jumlahSKsKumulatif,
        ipk: data.ipk,
      },
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const validasiDataPkl = async (data) => {
  try {
    const result = await prisma.tb_pkl.update({
      where: {
        nim: data.nim,
      },
      data: {
        nim: data.nim,
        semester: data.semester,
        status: data.status,
        nilai: data.nilai,
        file: fileName,
      },
    });
    const { PrismaClient } = require("@prisma/client");
    const prisma = new PrismaClient();

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const validasiDataSkripsi = async (data) => {
  try {
    const result = await prisma.tb_skripsi.update({
      where: {
        nim: data.nim,
      },
      data: {
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

module.exports = {
  validasiDataIrs,
  validasiDataKhs,
  validasiDataPkl,
  validasiDataSkripsi,
};
