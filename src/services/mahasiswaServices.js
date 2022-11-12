const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const ResizeFile = require("../utils/resizeFile");
const path = require("path");
const fs = require("fs");
const { getDataAkademikMhs } = require("./dataMahasiswaServices");
const validateSemester = require("../utils/validateSemester");

const getDashboardMahasiswa = async (data) => {
  const result = await getDataAkademikMhs(data);

  const khs = result.dataAkademik[result.semester].filter(
    (obj) => obj.type === "khs"
  );

  return {
    ipkNow: khs[0].ipk,
    sksNow: khs[0].jumlahSksKumulatif,
    ...result,
  };
};

const getDataRegisterMahasiswa = async (data) => {
  try {
    const result = await prisma.tb_mhs.findUnique({
      where: {
        nim: data.nim,
      },
      select: {
        nama: true,
        nim: true,
        statusAktif: true,
        jalurMasuk: true,
        fk_kodeWali: {
          select: {
            nama: true,
          },
        },
        fk_pemilik_akun_mhs: {
          select: {
            username: true,
            password: true,
          },
        },
      },
    });

    return {
      nama: result.nama,
      nim: result.nim,
      statusAktif: result.statusAktif,
      jalurMasuk: result.jalurMasuk,
      namaWali: result.fk_kodeWali.nama,
      username: result.fk_pemilik_akun_mhs.username,
      password: result.fk_pemilik_akun_mhs.password,
    };
  } catch (err) {
    throw err;
  }
};

// TODO : filename foto belum dikirim diresponse
const updateDataMahasiswa = async (data) => {
  try {
    if (data.oldUsername !== data.username) {
      const checkUsername = await prisma.tb_akun_mhs.findUnique({
        where: {
          username: data.username,
        },
      });

      if (checkUsername) {
        throw new Error("Username sudah digunakan");
      }
    }

    const kodeProv = data.kodeKab.substring(0, 2);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const imagePath = path.join(__dirname, "../../public/images/foto_mhs/");
    const fileUpload = new ResizeFile(
      imagePath,
      path.extname(data.foto.originalname)
    );
    const fileName = await fileUpload.save(data.foto.buffer);

    const [updateAkun, updateMahasiswa] = await prisma.$transaction([
      prisma.tb_akun_mhs.update({
        where: {
          pemilik: data.nim,
        },
        data: {
          username: data.username,
          password: hashedPassword,
        },
      }),
      prisma.tb_mhs.update({
        where: {
          nim: data.nim,
        },
        data: {
          email: data.email,
          alamat: data.alamat,
          kodeKab: data.kodeKab,
          kodeProv: kodeProv,
          noHP: data.noHP,
          foto: fileName,
        },
      }),
    ]);

    if (!updateAkun || !updateMahasiswa) {
      throw new Error("Terjadi kesalahan, silahkan coba lagi");
    }

    return {
      foto: fileName,
      username: data.username,
    };
  } catch (err) {
    throw err;
  }
};

const entryDataIrs = async (data) => {
  try {    
    const fileName = `irs-${data.nim}-${data.semester}.pdf`;
    fs.renameSync(
      `public/documents/${data.dokumen.originalname}`,
      `public/documents/irs/${fileName}`
    );

    const exist = await prisma.tb_irs.findUnique({
      where: {
        nim_semester: {
          nim: data.nim,
          semester: data.semester
        }
      }
    })

    if (exist) {
      fs.unlink(`public/documents/irs/${fileName}`, (err) => { if (err) throw err })
      throw new Error(`IRS semester ${data.semester} telah diisi`)
    }

    // Check if semester is valid
    // let valid = false
    if (validateSemester(data.nim, data.semester)) {
      const lastIrs = await prisma.tb_irs.aggregate({
        where: {
          nim: data.nim
        }, 
        _max: {
          semester: true
        }
      })

      if (lastIrs != null) {
        if (parseInt(data.semester) != parseInt(lastIrs._max.semester) + 1) {
          fs.unlink(`public/documents/irs/${fileName}`, (err) => { if (err) throw err })
          throw new Error(`IRS harus diisi urut semester (IRS terakhir yang diisi: semester ${lastIrs._max.semester})`)
        }
      } else {
        if (parseInt(data.semester) != 1) {
          fs.unlink(`public/documents/irs/${fileName}`, (err) => { if (err) throw err })
          throw new Error(`IRS harus diisi urut semester)`)
        }
      }
    } else {
      fs.unlink(`public/documents/irs/${fileName}`, (err) => { if (err) throw err })
      throw new Error(`Semester tidak valid`)
    }

    // Input IRS
    const result = await prisma.tb_irs.create({
      data: {
        nim: data.nim,
        semester: data.semester,
        status: data.status,
        jumlahSks: data.jumlahSks,
        fileIrs: fileName,
      },
    });

    return result;
  } catch (err) {
    throw err;
  }
};

const entryDataKhs = async (data) => {
  try {
    const fileName = `khs-${data.nim}-${data.semester}.pdf`;
    fs.renameSync(
      `public/documents/${data.dokumen.originalname}`,
      `public/documents/khs/${fileName}`
    );
    
    const exist = await prisma.tb_khs.findUnique({
      where: {
        nim_semester: {
          nim: data.nim,
          semester: data.semester
        }
      }
    })

    if (exist) {
      fs.unlink(`public/documents/khs/${fileName}`, (err) => { if (err) throw err })
      throw new Error(`KHS semester ${data.semester} telah diisi`)
    }

    // Check if semester is valid
    // let valid = false
    if (validateSemester(data.nim, data.semester)) {
      // Check if KHS is valid filled
      const lastKhs = await prisma.tb_khs.aggregate({
        where: {
          nim: data.nim
        },
        _max: {
          semester: true
        }
      })

      if (lastKhs._max.semester != null) {
        if (parseInt(data.semester) != parseInt(lastKhs._max.semester) + 1) {
          fs.unlink(`public/documents/khs/${fileName}`, (err) => { if (err) throw err })
          throw new Error(`KHS harus diisi urut semester (KHS terakhir yang diisi: semester ${lastKhs._max.semester})`)
        }
      } else {
        if (parseInt(data.semester) != 1) {
          fs.unlink(`public/documents/khs/${fileName}`, (err) => { if (err) throw err })
          throw new Error(`KHS harus diisi urut semester`)
        }
      }
    } else {
      fs.unlink(`public/documents/khs/${fileName}`, (err) => { if (err) throw err })
      throw new Error(`Semester tidak valid`)
    }

    // INPUT
    const result = await prisma.tb_khs.create({
      data: {
        nim: data.nim,
        semester: data.semester,
        status: data.status,
        jumlahSksSemester: data.jumlahSksSemester,
        ips: data.ips,
        jumlahSksKumulatif: data.jumlahSksKumulatif,
        ipk: data.ipk,
        fileKhs: fileName,
      },
    });

    return result;
  } catch (err) {
    console.log(err)
    throw err;
  }
};

const entryDataPkl = async (data) => {
  try {
    const fileName = `pkl-${data.nim}-${data.semester}.pdf`;
    fs.renameSync(
      `public/documents/${data.dokumen.originalname}`,
      `public/documents/pkl/${fileName}`
    );

    // PKL can only be filled once
    const findPkl = await prisma.tb_pkl.findUnique({
      where: {
        nim_semester: {
          nim: data.nim,
        }
      }
    })

    if (findPkl) throw new Error("Data PKL telah terisi")

    const result = await prisma.tb_pkl.create({
      data: {
        nim: data.nim,
        semester: data.semester,
        status: data.status,
        nilai: data.nilai,
        filePkl: fileName,
      },
    });

    return result;
  } catch (err) {
    throw err;
  }
};

const entryDataSkripsi = async (data) => {
  try {
    const fileName = `skripsi-${data.nim}-${data.semester}.pdf`;
    fs.renameSync(
      `public/documents/${data.dokumen.originalname}`,
      `public/documents/skripsi/${fileName}`
    );

    // Skripsi can only be filled once
    const findSkripsi = await prisma.tb_skripsi.findUnique({
      where: {
        nim_semester: {
          nim: data.nim
        }
      }
    })

    if (findSkripsi) throw new Error("Data Skripsi telah terisi")

    const result = await prisma.tb_skripsi.create({
      data: {
        nim: data.nim,
        semester: data.semester,
        status: data.status,
        nilai: data.nilai,
        tanggalLulusSidang: new Date(data.tanggalLulusSidang),
        fileSkripsi: fileName,
        lamaStudi: parseInt(data.lamaStudi),
      },
    });

    return result;
  } catch (err) {
    throw err;
  }
};

const getProfileMahasiswa = async (data) => {
  try {
    const result = await prisma.tb_mhs.findUnique({
      where: {
        nim: data.nim,
      },
      select: {
        fk_kodeWali: {
          select: {
            nama: true,
            nip: true,
          },
        },
        fk_nim_khs: {
          orderBy: {
            semester: "desc",
          },
          take: 1,
          select: {
            ipk: true,
            jumlahSksKumulatif: true,
          },
        },
        fk_nim_irs: {
          orderBy: {
            semester: "desc",
          },
          take: 1,
          select: {
            semester: true,
            status: true,
          },
        },
      },
    });

    // spread operator
    const profile = {
      namaDosenWali: result.fk_kodeWali.nama,
      nipDosenWali: result.fk_kodeWali.nip,
      semester:
        result.fk_nim_irs.length > 0 ? result.fk_nim_irs[0].semester : "-",
      status: result.fk_nim_irs.length > 0 ? result.fk_nim_irs[0].status : "-",
      ipk: result.fk_nim_khs.length > 0 ? result.fk_nim_khs[0].ipk : "-",
      jumlahSksKumulatif:
        result.fk_nim_khs.length > 0
          ? result.fk_nim_khs[0].jumlahSksKumulatif
          : "-",
    };

    console.log(profile);

    return profile;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getDataRegisterMahasiswa,
  updateDataMahasiswa,

  getDashboardMahasiswa,
  entryDataIrs,
  entryDataKhs,
  entryDataPkl,
  entryDataSkripsi,
  getProfileMahasiswa,
};
