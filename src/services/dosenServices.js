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
<<<<<<< HEAD
            nip: data.nip,
          },
        },
      },
      select: {
        nim: true,
        semester: true,
        status: true,
        jumlahSks: true,
        statusValidasi: true,
        fileIrs: true,
        fk_nim: {
          select: {
            nama: true,
            angkatan: true,
          },
        },
      },
    });
=======
            nip: data.nip
          }
        }
      },
      include: {
        fk_nim: true
      }
    })
  
    const newRes = result.map((d) => {
      const dataMhs = d.fk_nim
      delete d['fk_nim']
      return {...d,
      nama: dataMhs.nama,
      nim: dataMhs.nim,
      angkatan: dataMhs.angkatan,
      semester: countSemester(dataMhs.angkatan)}
    })

    return newRes
>>>>>>> 16d35ba96d0ed096d1730cf8920755979dda1db6

    // destructuring nama
    result = result.map((item) => {
      const { nama, angkatan } = item.fk_nim;
      delete item.fk_nim;
      return { ...item, nama, angkatan };
    });

    return result;
  } catch (err) {
<<<<<<< HEAD
    throw new Error(err);
=======
    throw new Error(err)
>>>>>>> 16d35ba96d0ed096d1730cf8920755979dda1db6
  }
};

const getStatusValidasiKHS = async (data) => {
  try {
    const result = await prisma.tb_khs.findMany({
      where: {
        fk_nim: {
          fk_kodeWali: {
<<<<<<< HEAD
            nip: data.nip,
          },
        },
      },
    });
=======
            nip: data.nip
          }
        }
      },
      include: {
        fk_nim: true
      }
    })
    
    const newRes = result.map((d) => {
      const dataMhs = d.fk_nim
      delete d['fk_nim']
      return {...d,
      nama: dataMhs.nama,
      nim: dataMhs.nim,
      angkatan: dataMhs.angkatan,
      semester: countSemester(dataMhs.angkatan)}
    })
    
    return newRes
>>>>>>> 16d35ba96d0ed096d1730cf8920755979dda1db6

    return result;
  } catch (err) {
<<<<<<< HEAD
    throw new Error(err);
=======
    throw new Error(err)
>>>>>>> 16d35ba96d0ed096d1730cf8920755979dda1db6
  }
};

const getStatusValidasiPKL = async (data) => {
  try {
    const result = await prisma.tb_pkl.findMany({
      where: {
        fk_nim: {
          fk_kodeWali: {
<<<<<<< HEAD
            nip: data.nip,
          },
        },
      },
    });
=======
            nip: data.nip
          }
        }
      },
      include: {
        fk_nim: true
      }
    })
    
    const newRes = result.map((d) => {
      const dataMhs = d.fk_nim
      delete d['fk_nim']
      return {...d,
      nama: dataMhs.nama,
      nim: dataMhs.nim,
      angkatan: dataMhs.angkatan,
      semester: countSemester(dataMhs.angkatan)}
    })
    
    return newRes
>>>>>>> 16d35ba96d0ed096d1730cf8920755979dda1db6

    return result;
  } catch (err) {
<<<<<<< HEAD
    throw new Error(err);
=======
    throw new Error(err)
>>>>>>> 16d35ba96d0ed096d1730cf8920755979dda1db6
  }
};

const getStatusValidasiSkripsi = async (data) => {
  try {
    const result = await prisma.tb_skripsi.findMany({
      where: {
        fk_nim: {
          fk_kodeWali: {
<<<<<<< HEAD
            nip: data.nip,
          },
        },
      },
    });
=======
            nip: data.nip
          }
        }
      },
      include: {
        fk_nim: true
      }
    })
    
    const newRes = result.map((d) => {
      const dataMhs = d.fk_nim
      delete d['fk_nim']
      return {...d,
      nama: dataMhs.nama,
      nim: dataMhs.nim,
      angkatan: dataMhs.angkatan,
      semester: countSemester(dataMhs.angkatan)}
    })
    
    return newRes
>>>>>>> 16d35ba96d0ed096d1730cf8920755979dda1db6

    return result;
  } catch (err) {
<<<<<<< HEAD
    throw new Error(err);
=======
    throw new Error(err)
>>>>>>> 16d35ba96d0ed096d1730cf8920755979dda1db6
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
        jumlahSKsKumulatif: data.jumlahSKsKumulatif,
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
        nim: data.nim,
        semester: data.semester,
        nilai: data.nilai,
        statusValidasi: true,
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
