const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const prisma = new PrismaClient();

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

async function generateUsername() {
  try {
    // Generate new username
    let genUsername, user;
    do {
      genUsername = Math.random().toString(36).substring(2);
      user = await prisma.tb_akun_mhs.findUnique({
        where: {
          username: genUsername,
        },
      });
    } while (user);

    return {
      username: genUsername,
    };
  } catch (err) {
    throw err;
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
  generateUsername,
  addMahasiswa,
  getDataAkunMahasiswa,
};
