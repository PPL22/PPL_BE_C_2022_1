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

const rekapStatusMahasiswa = async (data) => {
  try {
    const result = await prisma.tb_mhs.groupBy({
      by: ["angkatan", "statusAktif"],
      where: {
        kodeWali: data.nip,
      },
      _count: {
        nim: true,
      },
    });

    const filterByAngkatan = result.reduce((acc, cur) => {
      const { angkatan, statusAktif, _count } = cur;
      const { nim } = _count;

      if (acc[angkatan]) {
        acc[angkatan][statusAktif] = nim;
      } else {
        acc[angkatan] = {
          [statusAktif]: nim,
        };
      }

      return acc;
    }, {});

    return filterByAngkatan;
  } catch (error) {
    throw new Error(error);
  }
};

const daftarStatusMahasiswa = async (data) => {
  try {
    const result = await prisma.tb_mhs.findMany({
      where: {
        kodeWali: data.nip,
      },
      select: {
        nim: true,
        nama: true,
        angkatan: true,
        statusAktif: true,
        fk_nim_khs: {
          orderBy: {
            semester: "desc",
          },
          take: 1,
          select: {
            jumlahSksKumulatif: true,
            ipk: true,
          },
        },
      },
      orderBy: [
        {
          angkatan: "asc",
        },
        {
          nim: "asc",
        },
      ],
    });

    // spread fk_nim_khs
    result.map((item) => {
      const { fk_nim_khs } = item;
      const khs = fk_nim_khs;
      if (khs.length > 0) {
        const { jumlahSksKumulatif, ipk } = khs[0];
        item.jumlahSksKumulatif = jumlahSksKumulatif;
        item.ipk = ipk;
      } else {
        item.jumlahSksKumulatif = 0;
        item.ipk = 0;
      }
      delete item.fk_nim_khs;
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const rekapPklMahasiswa = async (data) => {
  try {
    const result = await prisma.tb_mhs.findMany({
      select: {
        nim: true,
        kodeWali: true,
        fk_nim_pkl: {
          select: {
            status: true,
          },
        },
        angkatan: true,
      },
    });

    const filterByKodeWali = result.filter(
      (item) => item.kodeWali === data.nip
    );

    const filterByAngkatan = filterByKodeWali.reduce((acc, cur) => {
      const { angkatan, fk_nim_pkl } = cur;
      console.log(angkatan);
      const pkl = fk_nim_pkl.filter((item) => item.status === "Lulus");
      console.log(pkl);
      if (acc[angkatan]) {
        if (pkl.length > 0) {
          acc[angkatan].lulus += 1;
        } else {
          acc[angkatan].belum += 1;
        }
      } else {
        if (pkl.length > 0) {
          acc[angkatan] = {
            lulus: 1,
            belum: 0,
          };
        } else {
          acc[angkatan] = {
            lulus: 0,
            belum: 1,
          };
        }
      }

      return acc;
    }, {});

    return filterByAngkatan;
  } catch (error) {
    throw new Error(error);
  }
};

const daftarPklMahasiswa = async (data) => {
  try {
    const result = await prisma.tb_mhs.findMany({
      where: {
        kodeWali: data.nip,
      },
      select: {
        nim: true,
        nama: true,
        angkatan: true,
        fk_nim_pkl: {
          select: {
            nilai: true,
            status: true,
          },
        },
      },
      orderBy: [
        {
          angkatan: "asc",
        },
        {
          nim: "asc",
        },
      ],
    });

    // change status pkl
    result.map((item) => {
      const { fk_nim_pkl } = item;
      const pkl = fk_nim_pkl.filter((item) => item.status === "Lulus");
      if (pkl.length > 0) {
        item.status = "Lulus";
        item.nilai = pkl[0].nilai;
      } else {
        item.status = "Belum";
        item.nilai = "-";
      }
    });

    //remove fk_nim_pkl
    result.map((item) => {
      delete item.fk_nim_pkl;
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const rekapSkripsiMahasiswa = async (data) => {
  try {
    const result = await prisma.tb_mhs.findMany({
      select: {
        nim: true,
        kodeWali: true,
        fk_nim_skripsi: {
          select: {
            status: true,
          },
        },
        angkatan: true,
      },
    });

    const filterByKodeWali = result.filter(
      (item) => item.kodeWali === data.nip
    );

    const filterByAngkatan = filterByKodeWali.reduce((acc, cur) => {
      const { angkatan, fk_nim_skripsi } = cur;
      const skripsi = fk_nim_skripsi.filter((item) => item.status === "Lulus");
      if (acc[angkatan]) {
        if (skripsi.length > 0) {
          acc[angkatan].lulus += 1;
        } else {
          acc[angkatan].belum += 1;
        }
      } else {
        if (skripsi.length > 0) {
          acc[angkatan] = {
            lulus: 1,
            belum: 0,
          };
        } else {
          acc[angkatan] = {
            lulus: 0,
            belum: 1,
          };
        }
      }

      return acc;
    }, {});

    return filterByAngkatan;
  } catch (error) {
    throw new Error(error);
  }
};

const daftarSkripsiMahasiswa = async (data) => {
  try {
    const result = await prisma.tb_mhs.findMany({
      where: {
        kodeWali: data.nip,
      },
      select: {
        nim: true,
        nama: true,
        angkatan: true,
        fk_nim_skripsi: {
          select: {
            nilai: true,
            status: true,
            tanggalLulusSidang: true,
            lamaStudi: true,
          },
        },
      },
      orderBy: [
        {
          angkatan: "asc",
        },
        {
          nim: "asc",
        },
      ],
    });

    // change status skripsi
    result.map((item) => {
      const { fk_nim_skripsi } = item;
      const skripsi = fk_nim_skripsi.filter((item) => item.status === "Lulus");
      if (skripsi.length > 0) {
        item.status = "Lulus";
        item.nilai = skripsi[0].nilai;
        item.tanggalLulusSidang = skripsi[0].tanggalLulusSidang;
        item.lamaStudi = skripsi[0].lamaStudi;
      } else {
        item.status = "Belum";
        item.nilai = "-";
        item.tanggalLulusSidang = "-";
        item.lamaStudi = "-";
      }
    });

    //remove fk_nim_skripsi
    result.map((item) => {
      delete item.fk_nim_skripsi;
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
  rekapStatusMahasiswa,
  daftarStatusMahasiswa,
  rekapPklMahasiswa,
  daftarPklMahasiswa,
  rekapSkripsiMahasiswa,
  daftarSkripsiMahasiswa,
};
