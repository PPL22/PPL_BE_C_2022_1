const { PrismaClient } = require("@prisma/client");
const e = require("express");
const prisma = new PrismaClient();

const rekapStatusMahasiswa = async (data) => {
  try {
    let result;
    if (data) {
      result = await prisma.tb_mhs.groupBy({
        by: ["angkatan", "statusAktif"],
        where: {
          kodeWali: data.nip,
        },
        _count: {
          nim: true,
        },
      });
    } else {
      result = await prisma.tb_mhs.groupBy({
        by: ["angkatan", "statusAktif"],
        _count: {
          nim: true,
        },
      });
    }

    const filterByAngkatan = result.reduce((acc, cur) => {
      const { angkatan, statusAktif, _count } = cur;
      const { nim } = _count;

      if (acc[angkatan]) {
        acc[angkatan][statusAktif] = nim;
      } else {
        acc[angkatan] = {
          Aktif: 0,
          Cuti: 0,
          Mangkir: 0,
          DO: 0,
          UndurDiri: 0,
          Lulus: 0,
          MeninggalDunia: 0,
        };
        acc[angkatan][statusAktif] = nim;
      }

      return acc;
    }, {});

    const rekapStatus = Object.keys(filterByAngkatan).map((item) => {
      return {
        angkatan: item,
        aktif: filterByAngkatan[item].Aktif,
        cuti: filterByAngkatan[item].Cuti,
        mangkir: filterByAngkatan[item].Mangkir,
        dropout: filterByAngkatan[item].DO,
        undurDiri: filterByAngkatan[item].UndurDiri,
        lulus: filterByAngkatan[item].Lulus,
        meninggalDunia: filterByAngkatan[item].MeninggalDunia,
      };
    });

    return rekapStatus;
  } catch (error) {
    throw new Error(error);
  }
};

const daftarStatusMahasiswa = async (data) => {
  try {
    let result;
    if (data) {
      result = await prisma.tb_mhs.findMany({
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
    } else {
      result = await prisma.tb_mhs.findMany({
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
    }

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

    result.sort((a, b) => {
      if (a.ipk === 0) return 1;
      if (b.ipk === 0) return -1;
      return 0;
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
        fk_nim_pkl: true,
        angkatan: true,
      },
    });

    let pkl = result;
    if (data) {
      pkl = result.filter((item) => item.kodeWali === data.nip);
    }

    const filterByAngkatan = pkl.reduce((acc, cur) => {
      const { angkatan, fk_nim_pkl } = cur;
      const pkl = fk_nim_pkl;
      if (acc[angkatan]) {
        if (pkl.length > 0 && pkl[0].statusValidasi === true) {
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

    const rekapPkl = Object.keys(filterByAngkatan).map((item) => {
      return {
        angkatan: item,
        lulus: filterByAngkatan[item].lulus,
        belum: filterByAngkatan[item].belum,
      };
    });

    return rekapPkl;
  } catch (error) {
    throw new Error(error);
  }
};

const daftarPklMahasiswa = async (data) => {
  try {
    let result;
    if (data) {
      result = await prisma.tb_mhs.findMany({
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
              semester: true,
              statusValidasi: true,
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
    } else {
      result = await prisma.tb_mhs.findMany({
        select: {
          nim: true,
          nama: true,
          angkatan: true,
          fk_nim_pkl: {
            select: {
              nilai: true,
              semester: true,
              statusValidasi: true,
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
    }

    // change status pkl
    result.map((item) => {
      const { fk_nim_pkl } = item;
      if (fk_nim_pkl.length > 0 && fk_nim_pkl[0].statusValidasi === true) {
        item.nilai = fk_nim_pkl[0].nilai;
        item.semester = fk_nim_pkl[0].semester;
      } else {
        item.nilai = "-";
        item.semester = "-";
      }
      delete item.fk_nim_pkl;
    });

    // sort result by statusValidasi
    result.sort((a, b) => {
      if (a.nilai === "-") return 1;
      if (b.nilai === "-") return -1;
      return 0;
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
        fk_nim_skripsi: true,
        angkatan: true,
      },
    });
    let skripsi = result;
    if (data) {
      skripsi = result.filter((item) => item.kodeWali === data.nip);
    }

    const filterByAngkatan = skripsi.reduce((acc, cur) => {
      const { angkatan, fk_nim_skripsi } = cur;
      const skripsi = fk_nim_skripsi;
      if (acc[angkatan]) {
        if (skripsi.length > 0 && skripsi[0].statusValidasi === true) {
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

    const rekapSkripsi = Object.keys(filterByAngkatan).map((item) => {
      return {
        angkatan: item,
        lulus: filterByAngkatan[item].lulus,
        belum: filterByAngkatan[item].belum,
      };
    });

    return rekapSkripsi;
  } catch (error) {
    throw new Error(error);
  }
};

const daftarSkripsiMahasiswa = async (data) => {
  try {
    let result;

    if (data) {
      result = await prisma.tb_mhs.findMany({
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
              statusValidasi: true,
              tanggalLulusSidang: true,
              lamaStudi: true,
              semester: true,
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
    } else {
      result = await prisma.tb_mhs.findMany({
        select: {
          nim: true,
          nama: true,
          angkatan: true,
          fk_nim_skripsi: {
            select: {
              nilai: true,
              statusValidasi: true,
              tanggalLulusSidang: true,
              lamaStudi: true,
              semester: true,
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
    }

    // change status skripsi
    result.map((item) => {
      const { fk_nim_skripsi } = item;
      if (
        fk_nim_skripsi.length > 0 &&
        fk_nim_skripsi[0].statusValidasi === true
      ) {
        item.nilai = fk_nim_skripsi[0].nilai;
        item.tanggalLulusSidang = fk_nim_skripsi[0].tanggalLulusSidang;
        item.lamaStudi = fk_nim_skripsi[0].lamaStudi;
        item.semester = fk_nim_skripsi[0].semester;
      } else {
        item.nilai = "-";
        item.tanggalLulusSidang = "-";
        item.lamaStudi = "-";
        item.semester = "-";
      }
      delete item.fk_nim_skripsi;
    });

    result.sort((a, b) => {
      if (a.nilai === "-") return 1;
      if (b.nilai === "-") return -1;
      return 0;
    });
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  rekapStatusMahasiswa,
  daftarStatusMahasiswa,
  rekapPklMahasiswa,
  daftarPklMahasiswa,
  rekapSkripsiMahasiswa,
  daftarSkripsiMahasiswa,
};
