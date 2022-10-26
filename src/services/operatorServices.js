const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
async function getDataDosen() {
  // Get all dosen data
  try {
    const doswalAccounts = await prisma.tb_role_akun_dosen.findMany({
      where: {
        role: "Dosen",
      },
      include: {
        fk_username: {
          include: {
            fk_pemilik: true,
          },
        },
      },
    });

    doswalAccounts.map((user) => {
      const { fk_username } = user;
      const { fk_pemilik } = fk_username;
      user.nip = fk_pemilik.nip;
      user.nama = fk_pemilik.nama;
      delete user.fk_username;
      delete user.username;
      delete user.role;
    });

    console.log(doswalAccounts);

    return doswalAccounts;
  } catch (err) {
    throw new Error(err);
  }
}

async function getAkunMahasiswa() {
  try {
    const result = await prisma.tb_mhs.findMany({
      select: {
        nim: true,
        nama: true,
        angkatan: true,
        jalurMasuk: true,
        statusAktif: true,
        fk_kodeWali: true,
        fk_pemilik_akun_mhs: true,
      },
      orderBy: {
        angkatan: "desc",
      },
    });

    const mahasiswa = result.map((mahasiswa) => {
      const namaDoswal = mahasiswa.fk_kodeWali.nama;
      let username = null;
      let password = null;
      if (mahasiswa.fk_pemilik_akun_mhs) {
        username = mahasiswa.fk_pemilik_akun_mhs.username;
        password = mahasiswa.fk_pemilik_akun_mhs.password;
      }
      delete mahasiswa.fk_kodeWali;
      delete mahasiswa.fk_pemilik_akun_mhs;
      return {
        ...mahasiswa,
        namaDoswal,
        username,
        password,
      };
    });

    return mahasiswa;
  } catch (err) {
    throw new Error(err);
  }
}

async function addMahasiswa(
  username,
  namaLengkap,
  nim,
  angkatan,
  password,
  status,
  jalurMasuk,
  dosenWali
) {
  try {
    // Filter duplicate mahasiswa by finding them in database
    const mhs = await prisma.tb_mhs.findUnique({
      where: {
        nim: nim,
      },
    });

    if (mhs) throw new Error("Mahasiswa already exists");

    const [doneMhs, doneAkun] = await prisma.$transaction([
      prisma.tb_mhs.create({
        data: {
          nim: nim,
          nama: namaLengkap,
          angkatan: angkatan,
          statusAktif: status,
          jalurMasuk: jalurMasuk,
          kodeWali: dosenWali,
        },
      }),
      prisma.tb_akun_mhs.create({
        data: {
          username: username,
          password: password,
          status: "Aktif",
          pemilik: nim,
        },
      }),
    ]);

    if (!doneMhs || !doneAkun) throw new Error("Failed to create new account");

    return doneMhs;
  } catch (err) {
    throw err;
  }
}

const getDataAkunMahasiswa = async () => {
  const jumlahMahasiswa = 773;
  const jumlahAkunMahasiswa = await prisma.tb_akun_mhs.count();
  console.log(jumlahMahasiswa);
  const result = {
    sudahMemilikiAkun: jumlahAkunMahasiswa,
    belumMemilikiAkun: jumlahMahasiswa - jumlahAkunMahasiswa,
  };

  return result;
};

module.exports = {
  getDataDosen,
  addMahasiswa,
  getDataAkunMahasiswa,
  getAkunMahasiswa,
};
