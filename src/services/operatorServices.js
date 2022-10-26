const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require('bcrypt')
const xlsx = require('xlsx')

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

async function addMahasiswa(data) {
  try {
    // Filter duplicate mahasiswa by finding them in database
    const mhs = await prisma.tb_mhs.findUnique({
      where: {
        nim: data.nim,
      },
    });

    if (mhs) throw new Error("Mahasiswa already exists");

    const [doneMhs, doneAkun] = await prisma.$transaction([
      prisma.tb_mhs.create({
        data: {
          nim: data.nim,
          nama: data.namaLengkap,
          angkatan: data.angkatan,
          statusAktif: data.status,
          jalurMasuk: data.jalurMasuk,
          kodeWali: data.dosenWali,
        },
      }),
      prisma.tb_akun_mhs.create({
        data: {
          username: data.username,
          password: bcrypt.hashSync(data.password, 10),
          status: "Aktif",
          pemilik: data.nim,
        },
      }),
    ]);

    if (!doneMhs || !doneAkun) throw new Error("Failed to create new account");

    return doneMhs;
  } catch (err) {
    throw err;
  }
}

const batchAddMahasiswa = async (data) => {
  // JSON.parse(JSON.stringify(d ata.dokumen))
  try {
    const generateCharacter = () => {
      return Math.random().toString(36).substring(2);
    };
    const fileName = data.dokumen.originalname
    const docInXlsx = xlsx.readFile(`public/documents/data-mhs/${fileName}`)
    const sheetNameList = docInXlsx.SheetNames
    sheetNameList.forEach((sheetName) => {
      const docInJson = xlsx.utils.sheet_to_json(docInXlsx.Sheets[sheetName])

      // Check validity
      if (!docInJson[0].nim || !docInJson[0].nama || !docInJson[0].statusAktif || !docInJson[0].angkatan || !docInJson[0].nipWali) {
        throw new Error("Pastikan format excel anda sesuai format (nim, nama, statusAktif, angkatan, nipWali)")
      }

      // Generate username and password

      // Input
      docInJson.forEach((mhs) => {
        console.log(mhs.nim)
      })
    })
  } catch (err) {
    throw err
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
  batchAddMahasiswa,
  getDataAkunMahasiswa,
};
