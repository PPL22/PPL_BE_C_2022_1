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
        statusValidasi: true
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
        statusValidasi: true
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
        nilai: data.nilai,
        statusValidasi: true
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
        nilai: data.nilai,
        tanggalLulusSidang: data.tanggalLulusSidang,
        lamaStudi: data.lamaStudi,
        statusValidasi: true
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
