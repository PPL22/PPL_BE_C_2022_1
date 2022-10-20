const { PrismaClient } = require("@prisma/client");
const countSemester = require("../utils/countSemester");
const prisma = new PrismaClient();

// TODO: refactor get status validasi
// Get status validasi
const getStatusValidasiIRS = async (data) => {
  try {
    let result = await prisma.tb_irs.findMany({
      where: {
        fk_nim: {
          fk_kodeWali: {
            nip: data.nip,
          },
        },
      },
      include: {
        fk_nim: true,
      },
    });

    const newRes = result.map((d) => {
      const dataMhs = d.fk_nim;
      delete d["fk_nim"];
      return {
        ...d,
        nama: dataMhs.nama,
        nim: dataMhs.nim,
        angkatan: dataMhs.angkatan,
      };
    });

    return newRes;
  } catch (err) {
    throw new Error(err);
  }
};

const getStatusValidasiKHS = async (data) => {
  try {
    const result = await prisma.tb_khs.findMany({
      where: {
        fk_nim: {
          fk_kodeWali: {
            nip: data.nip,
          },
        },
      },
      include: {
        fk_nim: true,
      },
    });

    const newRes = result.map((d) => {
      const dataMhs = d.fk_nim;
      delete d["fk_nim"];
      return {
        ...d,
        nama: dataMhs.nama,
        nim: dataMhs.nim,
        angkatan: dataMhs.angkatan,
      };
    });

    return newRes;
  } catch (err) {
    throw new Error(err);
  }
};

const getStatusValidasiPKL = async (data) => {
  try {
    const result = await prisma.tb_pkl.findMany({
      where: {
        fk_nim: {
          fk_kodeWali: {
            nip: data.nip,
          },
        },
      },
      include: {
        fk_nim: true,
      },
    });

    const newRes = result.map((d) => {
      const dataMhs = d.fk_nim;
      delete d["fk_nim"];
      return {
        ...d,
        nama: dataMhs.nama,
        nim: dataMhs.nim,
        angkatan: dataMhs.angkatan,
      };
    });

    return newRes;
  } catch (err) {
    throw new Error(err);
  }
};

const getStatusValidasiSkripsi = async (data) => {
  try {
    const result = await prisma.tb_skripsi.findMany({
      where: {
        fk_nim: {
          fk_kodeWali: {
            nip: data.nip,
          },
        },
      },
      include: {
        fk_nim: true,
      },
    });

    const newRes = result.map((d) => {
      const dataMhs = d.fk_nim;
      delete d["fk_nim"];
      return {
        ...d,
        nama: dataMhs.nama,
        nim: dataMhs.nim,
        angkatan: dataMhs.angkatan,
      };
    });

    return newRes;
  } catch (err) {
    throw new Error(err);
  }
};

// Validasi data mahasiswa
const validasiDataIrs = async (data) => {
  try {
    const result = await prisma.tb_irs.update({
      where: {
        nim_semester: {
          nim: data.nim,
          semester: data.semester,
        },
      },
      data: {
        semester: data.semester,
        status: data.status,
        jumlahSks: data.jumlahSks,
        statusValidasi: true,
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
        nim_semester: {
          nim: data.nim,
          semester: data.semester,
        },
      },
      data: {
        semester: data.semester,
        status: data.status,
        jumlahSksSemester: data.jumlahSksSemester,
        ips: data.ips,
        jumlahSksKumulatif: data.jumlahSksKumulatif,
        ipk: data.ipk,
        statusValidasi: true,
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
        nim_semester: {
          nim: data.nim,
          semester: data.semester,
        },
      },
      data: {
        semester: data.semester,
        nilai: data.nilai,
        statusValidasi: true,
      },
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const validasiDataSkripsi = async (data) => {
  try {
    const result = await prisma.tb_skripsi.update({
      where: {
        nim_semester: {
          nim: data.nim,
          semester: data.semester,
        },
      },
      data: {
        semester: data.semester,
        nilai: data.nilai,
        tanggalLulusSidang: data.tanggalLulusSidang,
        lamaStudi: data.lamaStudi,
        statusValidasi: true,
      },
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  getStatusValidasiIRS,
  getStatusValidasiKHS,
  getStatusValidasiPKL,
  getStatusValidasiSkripsi,

  validasiDataIrs,
  validasiDataKhs,
  validasiDataPkl,
  validasiDataSkripsi,
};
