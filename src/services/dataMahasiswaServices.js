const { PrismaClient } = require("@prisma/client");
const { PrismaClientRustPanicError } = require("@prisma/client/runtime");
const countSemester = require("../utils/countSemester");
const prisma = new PrismaClient();

const searchMahasiswa = async (data) => {
  try {
    // Can't use prisma query because wildcards (%) are not supported
    // https://github.com/prisma/prisma/discussions/3159
    let result;
    let keyword = `%${data.keyword}%`;
    let filterWali = data.nip
      ? {
          kodeWali: data.nip,
        }
      : {};
    // Default: get semua data siswa
    if (!data.keyword) {
      result = await prisma.tb_mhs.findMany({
        where: {
          ...filterWali,
        },
        select: {
          nama: true,
          nim: true
        }
      });
    } else {
      result = await prisma.tb_mhs.findMany({
        where: {
          OR: [
            {
              nama: {
                contains: keyword,
              },
            },
            {
              nim: {
                contains: keyword,
              },
            },
          ],
          ...filterWali,
        },
        select: {
          nama: true,
          nim: true
        }
      });
    }
    
    return result;
  } catch (err) {
    throw err;
  }
};

// TODO: Refactor get data algorithm
const getDataAkademikMhs = async (data) => {
  try {
    const dataMhs = await prisma.tb_mhs.findUnique({
      where: {
        nim: data.nim,
      },
      select: {
        nama: true,
        nim: true,
        angkatan: true,
        fk_kodeWali: {
          select: {
            nip: true,
            nama: true,
          },
        },
      },
    });
    
    const currentSmt = countSemester(dataMhs.angkatan)
    // ============== IRS ==============
    let irs = await prisma.tb_irs.findMany({
      where: {
        nim: data.nim,
      },
      orderBy: {
        semester: 'asc'
      }
    });
    irs = irs.map((data) => ({ type: "irs", available: true, ...data }));
    
    // Insert empty irs
    let offset = 0
    for (let i = 0; i < currentSmt; i++) {
      if (parseInt(irs[i].semester)-offset !== i+1) {
        irs.push({ type: "irs", available: false, semester: (i+1).toString()})
        offset++
      }
    }
    
    // ============== KHS ==============
    let khs = await prisma.tb_khs.findMany({
      where: {
        nim: data.nim,
      },
      orderBy: {
        semester: 'asc'
      }
    });
    khs = khs.map((data) => ({ type: "khs", available: true, ...data }));
    
    // Insert empty khs
    offset = 0
    for (let i = 0; i < currentSmt; i++) {
      if (parseInt(khs[i].semester)-offset !== i+1) {
        khs.push({ type: "khs", available: false, semester: (i+1).toString()})
        offset++
      }
    }
    
    // ============== PKL ==============
    let pkl = await prisma.tb_pkl.findMany({
      where: {
        nim: data.nim,
      },
      orderBy: {
        semester: 'asc'
      }
    });
    pkl = pkl.map((data) => ({ type: "pkl", available: true, ...data }));
    
    // ============== SKRIPSI ==============
    let skripsi = await prisma.tb_skripsi.findMany({
      where: {
        nim: data.nim,
      },
      orderBy: {
        semester: 'asc'
      }
    });
    skripsi = skripsi.map((data) => ({ type: "skripsi", available: true, ...data }));
    
    // Append all queried data into one array
    let combinedData = irs.concat(khs, pkl, skripsi);
    
    // Groups the data by semesters
    // Idk what these codes mean, but it works :D
    let groupBySmt = combinedData.reduce((r, a) => {
      delete a.nim
      r[a.semester] = r[a.semester] || [];
      r[a.semester].push(a);
      return r;
    }, {});

    // // Change type as key
    // for (const smt in groupBySmt) {
    //   groupBySmt[smt] = groupBySmt[smt].reduce((obj, dokumen) => {
    //     const type = dokumen.type
    //     delete dokumen.nim
    //     delete dokumen.type
    //     return {
    //       [type]: {...dokumen}
    //     }
    //   }, {})
    // }

    return {
      nama: dataMhs.nama,
      nim: dataMhs.nim,
      angkatan: dataMhs.angkatan,
      semester: currentSmt,
      namaDoswal: dataMhs.fk_kodeWali.nama,
      nipDoswal: dataMhs.fk_kodeWali.nip,
      dataAkademik: groupBySmt,
    };
  } catch (err) {
    throw err;
  }
};
module.exports = {
  searchMahasiswa,
  getDataAkademikMhs,
};
