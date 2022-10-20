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
        foto: true,
        fk_kodeWali: {
          select: {
            nip: true,
            nama: true,
          },
        },
      },
    });
    
    if (!dataMhs) throw new Error("Mahasiswa not found")

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

    // Get available semester
    let availableSmt = []
    irs = irs.map((data) => { 
      availableSmt.push(data.semester)
      return {type: "irs", available: true, ...data} 
    });
    
    // Insert empty irs
    for (let i = 1; i <= currentSmt; i++) {
      if (!(availableSmt.find(e => e === i.toString()))) {
        irs.push({ type: "irs", available: false, semester: (i).toString()})
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
    availableSmt = []
    khs = khs.map((data) => {
      availableSmt.push(data.semester)
      return { type: "khs", available: true, ...data }
    });

    // Insert empty khs
    for (let i = 1; i <= currentSmt; i++) {
      // console.log(parseInt(khs[i].semester)-offset, i+1)
      if (!(availableSmt.find(e => e === i.toString()))) {
        khs.push({ type: "khs", available: false, semester: i.toString()})
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
    let groupBySmt = combinedData.reduce((r, a) => {
      delete a.nim
      r[a.semester] = r[a.semester] || [];
      r[a.semester].push(a);
      return r;
    }, {});

    return {
      nama: dataMhs.nama,
      nim: dataMhs.nim,
      angkatan: dataMhs.angkatan,
      semester: currentSmt,
      foto: dataMhs.foto,
      namaDoswal: dataMhs.fk_kodeWali.nama,
      nipDoswal: dataMhs.fk_kodeWali.nip,
      dataAkademik: groupBySmt,
    };
  } catch (err) {
    throw err;
  }
};

// TODO: Refactor get count status
// Count status, for dashboard
const getCountStatusDataAkademikMhs = async (data) => {
  try {
    const filterWali = data ? {kodeWali: data.nip} : {} 
    
    // Count mahasiswa and amount of irs and khs entry required
    const allMhs = await prisma.tb_mhs.groupBy({
      by: ["angkatan"],
      where: {
        ...filterWali
      },
      _count: {
        nim: true
      }
    })

    // Amount of required data calculated from semester mhs
    let countMhs = 0
    const countRequiredData = allMhs.reduce((count, mhs) => {
      const {_count, angkatan} = mhs
      countMhs += _count.nim
      return count + _count.nim * countSemester(angkatan)
    }, 0)

    let result = {}

    
    // ============== IRS ==============
    const irs = await prisma.tb_irs.groupBy({
      by: ["statusValidasi"],
      where: {
        fk_nim: filterWali
      },
      _count: {
        nim: true
      }
    }) 
    
    // Count validated and not validated
    let countIRS = 0
    result.irs = irs.reduce((res, obj) => {
      const {_count, statusValidasi} = obj 
      res[statusValidasi ? "validated" : "notValidated"] = _count.nim 
      countIRS += _count.nim
      return res    
    }, {})
    
    // No entry calculated from how many required data - how many IRS available
    if (!result.irs.validated) result.irs.validate = 0
    if (!result.irs.notValidated) result.irs.validate = 0
    result.irs.noEntry = countRequiredData - countIRS
    

    // ============== KHS ==============
    const khs = await prisma.tb_khs.groupBy({
      by: ["statusValidasi"],
      where: {
        fk_nim: filterWali
      },
      _count: {
        nim: true
      }
    }) 
    
    // Count validated and not validated
    let countKHS = 0
    result.khs = khs.reduce((res, obj) => {
      const {_count, statusValidasi} = obj 
      res[statusValidasi ? "validated" : "notValidated"] = _count.nim 
      countKHS += _count.nim
      return res    
    }, {})
    
    // No entry calculated from how many required data - how many KHS available
    if (!result.khs.validated) result.khs.validated = 0
    if (!result.khs.notValidated) result.khs.validate = 0
    result.khs.noEntry = countRequiredData - countKHS
    
  
    // ============== PKL ==============
    const pkl = await prisma.tb_pkl.groupBy({
      by: ["statusValidasi"],
      where: {
        fk_nim: filterWali
      },
      _count: {
        nim: true
      }
    }) 
    
    // Only count not validated one
    let countPKL = 0
    result.pkl = pkl.reduce((res, obj) => {
      const {_count, statusValidasi} = obj 
      if (!statusValidasi) {
        res["notValidated"] = _count.nim 
      }
      countPKL += _count.nim
      return res    
    }, {})
    
    // Lulus --> PKL mhs that has been validated
    // Tidak lulus --> PKL mhs that hasn't been validated + no entry
    result.pkl.lulus = countPKL - result.pkl.notValidated
    result.pkl.blmLulus = countMhs - result.pkl.lulus
    

    // ============== SKRIPSI ==============
    const skripsi = await prisma.tb_skripsi.groupBy({
      by: ["statusValidasi"],
      where: {
        fk_nim: filterWali
      },
      _count: {
        nim: true
      }
    }) 
    
    // Only count not validated one
    let countSkripsi = 0
    result.skripsi = skripsi.reduce((res, obj) => {
      const {_count, statusValidasi} = obj 
      if (!statusValidasi) {
        res["notValidated"] = _count.nim 
      }
      countSkripsi += _count.nim
      return res    
    }, {})
    
    // Lulus --> Skripsi mhs that has been validated
    // Tidak lulus --> Skripsi mhs that hasn't been validated + no entry
    result.skripsi.lulus = countSkripsi - result.skripsi.notValidated
    result.skripsi.blmLulus = countMhs - result.skripsi.lulus
    
    return result
  } catch (err) {
    throw err;
  }
}

module.exports = {
  searchMahasiswa,
  getDataAkademikMhs,
  getCountStatusDataAkademikMhs
};
