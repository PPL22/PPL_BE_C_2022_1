const { PrismaClient } = require("@prisma/client");
const countSemester = require("../utils/countSemester");
const prisma = new PrismaClient();
const fs = require("fs");

// TODO: refactor get status validasi
// !!! Forgot to add who hasn't entered the data yet
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
    const fileName = `irs-${data.nim}-${data.semester}.pdf`;
    let semester = data.fileName.split("-")[2];
    semester = semester.substring(0, semester.length - 4);
    const result = await prisma.tb_irs.update({
      where: {
        nim_semester: {
          nim: data.nim,
          semester: semester,
        },
      },
      data: {
        semester: data.semester,
        status: data.status,
        jumlahSks: data.jumlahSks,
        fileIrs: fileName,
        statusValidasi: true,
      },
    });
    if (semester !== data.semester) {
      fs.renameSync(
        `public/documents` + data.fileName,
        `public/documents/irs/${fileName}`
      );
    }

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const validasiDataKhs = async (data) => {
  const fileName = `khs-${data.nim}-${data.semester}.pdf`;
  let semester = data.fileName.split("-")[2];
  semester = semester.substring(0, semester.length - 4);
  try {
    const result = await prisma.tb_khs.update({
      where: {
        nim_semester: {
          nim: data.nim,
          semester: semester,
        },
      },
      data: {
        semester: data.semester,
        status: data.status,
        jumlahSksSemester: data.jumlahSksSemester,
        ips: data.ips,
        jumlahSksKumulatif: data.jumlahSksKumulatif,
        ipk: data.ipk,
        fileKhs: fileName,
        statusValidasi: true,
      },
    });

    if (semester !== data.semester) {
      fs.renameSync(
        `public/documents` + data.fileName,
        `public/documents/khs/${fileName}`
      );
    }
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const validasiDataPkl = async (data) => {
  const fileName = `pkl-${data.nim}-${data.semester}.pdf`;
  let semester = data.fileName.split("-")[2];
  semester = semester.substring(0, semester.length - 4);
  try {
    const result = await prisma.tb_pkl.update({
      where: {
        nim_semester: {
          nim: data.nim,
          semester: semester,
        },
      },
      data: {
        semester: data.semester,
        nilai: data.nilai,
        filePkl: fileName,
        statusValidasi: true,
      },
    });
    if (semester !== data.semester) {
      fs.renameSync(
        `public/documents` + data.fileName,
        `public/documents/pkl/${fileName}`
      );
    }
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const validasiDataSkripsi = async (data) => {
  const fileName = `skripsi-${data.nim}-${data.semester}.pdf`;
  let semester = data.fileName.split("-")[2];
  semester = semester.substring(0, semester.length - 4);
  try {
    const result = await prisma.tb_skripsi.update({
      where: {
        nim_semester: {
          nim: data.nim,
          semester: semester,
        },
      },
      data: {
        semester: data.semester,
        nilai: data.nilai,
        tanggalLulusSidang: data.tanggalLulusSidang,
        lamaStudi: data.lamaStudi,
        fileSkripsi: fileName,
        statusValidasi: true,
      },
    });
    if (semester !== data.semester) {
      fs.renameSync(
        `public/documents` + data.fileName,
        `public/documents/skripsi/${fileName}`
      );
    }
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
