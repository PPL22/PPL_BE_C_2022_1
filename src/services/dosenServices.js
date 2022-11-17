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
    // Filter for search by keyword
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

    // Get total amount of data
    let maxPage = await prisma.tb_irs.count({
      where: {
        fk_nim: {
          kodeWali: data.nip,
          ...filterKeyword
        },
      },
    })
    maxPage = Math.ceil(maxPage / data.qty)

    // Revalidate current page
    if (maxPage != 0 && (data.page < 1 || data.page > maxPage)) throw new Error("Bad request. Page param not valid")

    // Create query
    const query = {
      where: {
        fk_nim: {
          kodeWali: data.nip,
          ...filterKeyword
        },
      },
      include: {
        fk_nim: true,
      },
      orderBy: {},

      take: data.qty,
      skip: (data.page-1) * data.qty
    } 
  
    // Add order
    const orderMhs = ["nama", "nim", "angkatan", "statusAktif"]
    const orderKhs = ["semester", "jumlahSks", "statusValidasi"]
  
    if (orderKhs.includes(data.sortBy)) {
      query.orderBy[data.sortBy] = data.order
    } else if (orderMhs.includes(data.sortBy)) {
      query.orderBy["fk_nim"] = {}
      query.orderBy.fk_nim[data.sortBy] = data.order
    } else {
      throw new Error("Order not valid")
    }
    
    // Get all data irs according to query
    const result = await prisma.tb_irs.findMany(query);

      
    // Reshape data
    const filledIrs = result.map((d) => {
      const dataMhs = {
        nim: d["fk_nim"].nim,
        nama: d["fk_nim"].nama,
        angkatan: d["fk_nim"].angkatan,
        statusAktif: d["fk_nim"].statusAktif
      };
      delete d["fk_nim"];

      return {
        ...d,
        ...dataMhs,
      };
    });

    return {
      currentPage: data.page,
      maxPage: maxPage,
      list: filledIrs
    };

  } catch (err) {
    throw new Error(err);
  }
};

const getStatusValidasiKHS = async (data) => {
  try {
    // NEEDS: add search feature in frontend
    // Filter for search by keyword
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

    // Get total amount of data
    let maxPage = await prisma.tb_khs.count({
      where: {
        fk_nim: {
          kodeWali: data.nip,
          ...filterKeyword
        },
      },
    })
    maxPage = Math.ceil(maxPage / data.qty)

    // Revalidate current page
    if (maxPage != 0 && (data.page < 1 || data.page > maxPage)) throw new Error("Bad request. Page param not valid")

    // Create query
    const query = {
      where: {
        fk_nim: {
          kodeWali: data.nip,
          ...filterKeyword
        },
      },
      include: {
        fk_nim: true,
      },
      orderBy: {},

      take: data.qty,
      skip: (data.page-1) * data.qty
    } 
  
    // Add order
    const orderMhs = ["nama", "nim", "angkatan", "statusAktif"]
    const orderKhs = ["semester", "jumlahSksSemester", "ips", "jumlahSksKumulatif", "ipk", "statusValidasi"]
  
    if (orderKhs.includes(data.sortBy)) {
      query.orderBy[data.sortBy] = data.order
    } else if (orderMhs.includes(data.sortBy)) {
      query.orderBy["fk_nim"] = {}
      query.orderBy.fk_nim[data.sortBy] = data.order
    } else {
      throw new Error("Order not valid")
    }
    
    // Get all data irs according to query
    const result = await prisma.tb_khs.findMany(query);

    // Reshape data
    const filledKhs = result.map((d) => {
      const dataMhs = {
        nim: d["fk_nim"].nim,
        nama: d["fk_nim"].nama,
        angkatan: d["fk_nim"].angkatan,
        statusAktif: d["fk_nim"].statusAktif
      };
      delete d["fk_nim"];

      return {
        ...d,
        ...dataMhs,
      };
    });

    return {
      currentPage: data.page,
      maxPage: maxPage,
      list: filledKhs
    };
  } catch (err) {
    throw new Error(err);
  }
};

const getStatusValidasiPKL = async (data) => {
  try {
    // NEEDS: add search feature in frontend
    // Filter for search by keyword
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

    // Get total amount of data
    let maxPage = await prisma.tb_pkl.count({
      where: {
        fk_nim: {
          kodeWali: data.nip,
          ...filterKeyword
        },
      },
    })
    maxPage = Math.ceil(maxPage / data.qty)

    // Revalidate current page
    if (maxPage != 0 && (data.page < 1 || data.page > maxPage)) throw new Error("Bad request. Page param not valid")

    // Create query
    const query = {
      where: {
        fk_nim: {
          kodeWali: data.nip,
          ...filterKeyword
        },
      },
      include: {
        fk_nim: true,
      },
      orderBy: {},

      take: data.qty,
      skip: (data.page-1) * data.qty
    } 
  
    // Add order
    const orderMhs = ["nama", "nim", "angkatan", "statusAktif"]
    const orderPkl = ["semester", "nilai", "statusValidasi"]
  
    if (orderPkl.includes(data.sortBy)) {
      query.orderBy[data.sortBy] = data.order
    } else if (orderMhs.includes(data.sortBy)) {
      query.orderBy["fk_nim"] = {}
      query.orderBy.fk_nim[data.sortBy] = data.order
    } else {
      throw new Error("Order not valid")
    }
    
    // Get all data irs according to query
    const result = await prisma.tb_pkl.findMany(query);

    // Reshape data
    const filledPkl = result.map((d) => {
      const dataMhs = {
        nim: d["fk_nim"].nim,
        nama: d["fk_nim"].nama,
        angkatan: d["fk_nim"].angkatan,
        statusAktif: d["fk_nim"].statusAktif
      };
      delete d["fk_nim"];

      return {
        ...d,
        ...dataMhs,
      };
    });

    return {
      currentPage: data.page,
      maxPage: maxPage,
      list: filledPkl
    };
  } catch (err) {
    throw new Error(err);
  }
};

const getStatusValidasiSkripsi = async (data) => {
  try {
    // NEEDS: add search feature in frontend
    // Filter for search by keyword
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

    // Get total amount of data
    let maxPage = await prisma.tb_skripsi.count({
      where: {
        fk_nim: {
          kodeWali: data.nip,
          ...filterKeyword
        },
      },
    })
    maxPage = Math.ceil(maxPage / data.qty)

    // Revalidate current page
    if (maxPage != 0 && (data.page < 1 || data.page > maxPage)) throw new Error("Bad request. Page param not valid")

    // Create query
    const query = {
      where: {
        fk_nim: {
          kodeWali: data.nip,
          ...filterKeyword
        },
      },
      include: {
        fk_nim: true,
      },
      orderBy: {},

      take: data.qty,
      skip: (data.page-1) * data.qty
    } 
  
    // Add order
    const orderMhs = ["nama", "nim", "angkatan", "statusAktif"]
    const orderSkripsi = ["semester", "nilai", "tanggalLulusSidang", "lamaStudi", "statusValidasi"]
  
    if (orderSkripsi.includes(data.sortBy)) {
      query.orderBy[data.sortBy] = data.order
    } else if (orderMhs.includes(data.sortBy)) {
      query.orderBy["fk_nim"] = {}
      query.orderBy.fk_nim[data.sortBy] = data.order
    } else {
      throw new Error("Order not valid")
    }
    
    // Get all data irs according to query
    const result = await prisma.tb_skripsi.findMany(query);

    // Reshape data
    const filledSkripsi = result.map((d) => {
      const dataMhs = {
        nim: d["fk_nim"].nim,
        nama: d["fk_nim"].nama,
        angkatan: d["fk_nim"].angkatan,
        statusAktif: d["fk_nim"].statusAktif
      };
      delete d["fk_nim"];

      return {
        ...d,
        ...dataMhs,
      };
    });

    return {
      currentPage: data.page,
      maxPage: maxPage,
      list: filledSkripsi
    };
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
