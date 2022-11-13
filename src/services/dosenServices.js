const { PrismaClient, Prisma } = require("@prisma/client");
const countSemester = require("../utils/countSemester");
const prisma = new PrismaClient();
const fs = require("fs");

// TODO: refactor get status validasi
// !!! Forgot to add who hasn't entered the data yet
// Get status validasi
const getStatusValidasiIRS = async (data) => {
  try {
    // NEEDS: add search feature in frontend
    const filterKeyword = (data.keyword ? 
      {OR: [
          {
            nama: {
              contains: data.keyword,
            },
          },
          {
            nim: {
              contains: data.keyword,
            },
          },
        ],
      } : {} 
    )

    // NEEDS
    // let order = {}
    // switch (data.order) {
    //   case "nama":
    //     order = {fk_nim: {nama: "asc"}}
    //     break;
    //   case "angkatan":
    //     order = {fk_nim: {angkatan: "asc"}}
    //     break;
    //   case "semester":
    //     order = {semester: "asc"}
    //     break;
    //   case "sksSemester":
    //     order = {jumlahSks: "asc"}
    //     break;
    //   case "status":
    //     order = {status: "asc"}
    //     break;
    //   default:
    //     order = {nim: "asc"}
    //     break;
    // }

    let result = await prisma.tb_irs.findMany({
      where: {
        fk_nim: {
          kodeWali: data.nip,
          ...filterKeyword
        },
      },
      include: {
        fk_nim: true,
      },
      // take: data.qty,
      // skip: data.qty * (data.page-1)
      // orderBy: {
      //   // ...order
      // }
    });
    
    const allMhs = await prisma.tb_mhs.findMany({
      where: {
        kodeWali: data.nip
      }
    })

    
    allMhs.forEach(mhs => {
      filledRecord[mhs.nim] = {
        filled: [],
        data: {
          nim: mhs.nim,
          nama: mhs.nama,
          angkatan: mhs.angkatan
        }
      }
    })
    
    // Reshape data
    let filledRecord = {}
    const filledIrs = result.map((d) => {
      const dataMhs = {
        nim: d["fk_nim"].nim,
        nama: d["fk_nim"].nama,
        angkatan: d["fk_nim"].angkatan
      };
      delete d["fk_nim"];

      // Record every filled irs in an array of object
      filledRecord[dataMhs.nim].filled.push(d["semester"])
      
      return {
        ...d,
        ...dataMhs,
      };
    });

    // Fill empty IRS data with "Belum Entry"
    // NEEDS: handling belum entry
    const noIrs = Object.keys(filledRecord).reduce((r, nim) => {
      const mhs = filledRecord[nim]
      const currentSmt = countSemester(mhs.data.angkatan)
      let emptySmt = []

      for (let i = 1; i <= currentSmt; i++) {
        if (!mhs.filled.includes(i.toString())) {
          emptySmt.push(i.toString())
        }
      }

      emptySmt.forEach(smt => {
        r.push({
          nim: nim,
          semester: smt,
          status: '',
          jumlahSks: '',
          fileIrs: '',
          nama: mhs.data.nama,
          angkatan: mhs.data.angkatan
        })
      })
      return r
    }, [])

    return [...filledIrs, ...noIrs];
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
    
    // Reshape data
    const newRes = result.map((d) => {
      const dataMhs = d.fk_nim;
      delete d["fk_nim"];
      return {
        ...d,
        nama: dataMhs.nama,
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
    
    // Reshape data
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
    
    // Reshape data
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
    let oldSemester = data.fileName.split("-")[2]; // For renaming purpose
    oldSemester = oldSemester.substring(0, oldSemester.length - 4);

    console.log(data)

    // Check if file exists
    if (!fs.existsSync(`public/documents` + data.fileName)) throw new Error("File doesn't exist, not valid")

    // Basic checking
    if (isNaN(oldSemester)) throw new Error ("Filename not valid")

    // Check dosen wali
    const checkDoswal = await prisma.tb_mhs.findFirst({
      where: {
        nim: data.nim,
        kodeWali: data.nip,
      },
    });

    if (!checkDoswal) throw new Error("Bukan dosen wali, data mahasiswa tidak dapat diakses");

    // Check semester (WARNING: akan error bila file yang dikirim bukan file yang valid)
    if (data.semester != oldSemester) {
      const checkSemester = await prisma.tb_irs.findUnique({
        where: {
          nim_semester: {
            nim: data.nim,
            semester: data.semester
          }
        }
      })

      console.log(checkSemester)
      if (checkSemester) throw new Error("Semester sudah terisi")
    }

    // Rename document if semester is different
    if (oldSemester !== data.semester) {
      fs.renameSync(
        `public/documents` + data.fileName,
        `public/documents/irs/${fileName}`
      );
    }

    // Check semester (WARNING: akan error bila file yang dikirim bukan file yang valid)
    if (data.semester != oldSemester) {
      const checkSemester = await prisma.tb_irs.findUnique({
        where: {
          nim_semester: {
            nim: data.nim,
            semester: data.semester
          }
        }
      })

      if (checkSemester) throw new Error("Semester sudah terisi")
    }

    // Rename document if semester is different
    if (oldSemester !== data.semester) {
      fs.renameSync(
        `public/documents` + data.fileName,
        `public/documents/irs/${fileName}`
      );
    }

    // Update
    const result = await prisma.tb_irs.update({
      where: {
        nim_semester: {
          nim: data.nim,
          semester: oldSemester,
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

    return result;
  } catch (err) {
    throw err;
  }
};

const validasiDataKhs = async (data) => {
  try {
    const fileName = `khs-${data.nim}-${data.semester}.pdf`;
    let oldSemester = data.fileName.split("-")[2]; // For renaming purpose
    oldSemester = oldSemester.substring(0, oldSemester.length - 4);

    // Check if file exists
    if (!fs.existsSync(`public/documents` + data.fileName)) throw new Error("File doesn't exist, not valid")

    // Basic checking
    if (isNaN(oldSemester)) throw new Error ("Filename not valid")

    // Check dosen wali
    const checkDoswal = await prisma.tb_mhs.findFirst({
      where: {
        nim: data.nim,
        kodeWali: data.nip,
      },
    });

    if (!checkDoswal) throw new Error("Bukan dosen wali, data mahasiswa tidak dapat diakses")
    
    // Check semester
    if (data.semester != oldSemester) {
      const checkSemester = await prisma.tb_khs.findUnique({
        where: {
          nim_semester: {
            nim: data.nim,
            semester: data.semester
          }
        }
      })

      if (checkSemester) throw new Error("Semester sudah terisi")
    }

    // Update
    const result = await prisma.tb_khs.update({
      where: {
        nim_semester: {
          nim: data.nim,
          semester: oldSemester,
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

    // Rename document if semester is different
    if (oldSemester !== data.semester) {
      fs.renameSync(
        `public/documents` + data.fileName,
        `public/documents/irs/${fileName}`
      );
    }

    return result;
  } catch (err) {
    throw err;
  }
};

const validasiDataPkl = async (data) => {
  try {
    const fileName = `pkl-${data.nim}-${data.semester}.pdf`;
    let oldSemester = data.fileName.split("-")[2]; // For renaming purpose
    oldSemester = oldSemester.substring(0, oldSemester.length - 4);

    // Check if file exists
    if (!fs.existsSync(`public/documents` + data.fileName)) throw new Error("File doesn't exist, not valid")

    // Basic checking
    if (isNaN(oldSemester)) throw new Error ("Filename not valid")

    // Check dosen wali
    const checkDoswal = await prisma.tb_mhs.findFirst({
      where: {
        nim: data.nim,
        kodeWali: data.nip,
      },
    });

    if (!checkDoswal)
      throw new Error("Bukan dosen wali, data mahasiswa tidak dapat diakses");

    // Update
    const result = await prisma.tb_pkl.update({
      where: {
        nim_semester: {
          nim: data.nim,
          semester: data.semester,
        },
      },
      data: {
        semester: oldSemester,
        nilai: data.nilai,
        filePkl: fileName,
        statusValidasi: true,
      },
    });

    // Rename document if semester is different
    if (oldSemester !== data.semester) {
      fs.renameSync(
        `public/documents` + data.fileName,
        `public/documents/pkl/${fileName}`
      );
    }
    return result;
  } catch (err) {
    throw err;
  }
};

const validasiDataSkripsi = async (data) => {
  try {
    const fileName = `skripsi-${data.nim}-${data.semester}.pdf`;
    let oldSemester = data.fileName.split("-")[2]; // For renaming purpose
    oldSemester = oldSemester.substring(0, oldSemester.length - 4);

    // Check if file exists
    if (!fs.existsSync(`public/documents` + data.fileName)) throw new Error("File doesn't exist, not valid")

    // Basic checking
    if (isNaN(oldSemester)) throw new Error ("Filename not valid")

    // Check dosen wali
    const checkDoswal = await prisma.tb_mhs.findFirst({
      where: {
        nim: data.nim,
        kodeWali: data.nip,
      },
    });

    if (!checkDoswal)
      throw new Error("Bukan dosen wali, data mahasiswa tidak dapat diakses");

    // Update
    const result = await prisma.tb_skripsi.update({
      where: {
        nim_semester: {
          nim: data.nim,
          semester: oldSemester,
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

    // Rename document if semester is different
    if (oldSemester !== data.semester) {
      fs.renameSync(
        `public/documents` + data.fileName,
        `public/documents/skripsi/${fileName}`
      );
    }
    return result;
  } catch (err) {
    throw err;
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
