const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const xlsx = require("xlsx");
const { getKodeWaliRandom } = require("../utils/mahasiswaUtil");

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

async function getAkunMahasiswa(data) {
  try {
    // Get total amount of data
    let maxPage = await prisma.tb_mhs.count()
    maxPage = Math.ceil(maxPage / data.qty)

    // Revalidate current page
    if (data.page < 1 || data.page > maxPage) throw new Error("Bad request. Params not valid")

    // Create sorting argument for query
    let sortFilter = {};
    const orderMhs = ["nama", "nim", "angkatan", "jalurMasuk", "statusAktif"]

    if (!data.sortBy) {
      sortFilter = [
        {
          angkatan: "asc",
        },
        {
          nim: "asc",
        },
      ]  
    } else if (orderMhs.includes(data.sortBy)) {
      sortFilter[data.sortBy] = data.order
    } else if (data.sortBy === "doswal") {
      sortFilter.fk_kodeWali = {
        "nip": data.order
      }
    } else {
      throw new Error ("Bad Request: Sort params not valid")
    }

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
      orderBy: sortFilter,
      take: data.qty,
      skip: (data.page-1) * data.qty
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

    return {
      currentPage: data.page,
      maxPage: maxPage,
      list: mahasiswa
    };
  } catch (err) {
    throw new Error(err);
  }
}

async function addMahasiswa(data) {
  try {
    // Filter duplicate mahasiswa by finding them in database
    const findMhs = await prisma.tb_mhs.findUnique({
      where: {
        nim: data.nim,
      },
    });

    if (findMhs) throw new Error("Mahasiswa already exists");

    // Check if username exists
    const findUsername = await prisma.tb_akun_mhs.findUnique({
      where: {
        username: data.username,
      },
    });

    if (findUsername)
      throw new Error(
        "Username already exists, please use a different username"
      );

    // Check dosen input
    const findDosen = await prisma.tb_dosen.findUnique({
      where: {
        nip: data.dosenWali,
      },
    });

    if (!findDosen) throw new Error("Dosen tidak ditemukan");

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
          password: data.password,
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
  try {
    // JSON.parse(JSON.stringify(d ata.dokumen))
    const generateCharacter = () => {
      return Math.random().toString(36).substring(2);
    };
    const fileName = data.dokumen.originalname;
    const docInXlsx = xlsx.readFile(`public/documents/data-mhs/${fileName}`);
    const sheetNameList = docInXlsx.SheetNames;
    console.log(data);
    const accounts = [];
    const mhsData = [];
    for (sheetName of sheetNameList) {
      const docInJson = xlsx.utils.sheet_to_json(docInXlsx.Sheets[sheetName]);
      // Check validity
      if (!docInJson[0]) {
        throw new Error(`Sheet ${sheetName} kosong`);
      }

      if (
        !docInJson[0].nim ||
        !docInJson[0].nama ||
        !docInJson[0].jalurMasuk ||
        !docInJson[0].nipWali
      ) {
        throw new Error(
          `Format data ${sheetName} kurang tepat (pastikan baris header memiliki nama dan urutan nim, nama, jalurMasuk, dan nipWali)`
        );
      }

      // TODO: give error message for each mhs data with error
      let row = 1;
      for (const mhs of docInJson) {
        row++;

        // Check if data mhs has every field filled
        if (
          !mhs.nim.toString() ||
          !mhs.nama ||
          !mhs.jalurMasuk ||
          !mhs.nipWali
        ) {
          throw new Error(
            `Data tidak lengkap pada baris ${row} sheet ${sheetName}`
          );
        } else {
          // ============== Validation ==============
          // Check nama
          const regexNama = /^[A-Za-z ,.']+$/;
          if (!regexNama.test(mhs.nama)) {
            throw new Error(
              `Nama tidak valid pada baris ${row} sheet ${sheetName}. Nama hanya boleh terdiri dari huruf besar/kecil, spasi, koma, atau tanda petik`
            );
          }

          // TODO-VALIDATE: Check NIM (?)

          // Check angkatan
          if (
            mhs.angkatan < 1950 ||
            mhs.angkatan >
              new Date().getFullYear() - (new Date().getMonth() > 6 ? 0 : 1)
          ) {
            throw new Error(
              `Angkatan tidak valid pada baris ${row} sheet ${sheetName}`
            );
          }

          // Check jalurMasuk,
          const allJalurMasuk = ["SBMPTN", "SNMPTN", "Mandiri", "Lainnya"];
          if (!allJalurMasuk.includes(mhs.jalurMasuk)) {
            throw new Error(
              `Jalur masuk tidak valid pada baris ${row} sheet ${sheetName}`
            );
          }
          // TODO: refactor this as a new utilites (?)
          // Find dosen in tb_dosen
          const findDosen = await prisma.tb_dosen.findUnique({
            where: {
              nip: mhs.nipWali,
            },
          });

          if (!findDosen) {
            throw new Error(
              `Dosen tidak ditemukan pada baris ${row} sheet ${sheetName}`
            );
          } else {
            // To prevent duplicate username, use loop to regenerate username if it exists in DB
            let username = "",
              findUsername = false;
            do {
              username = generateCharacter();
              findUsername = await prisma.tb_akun_mhs.findUnique({
                where: {
                  username: username,
                },
              });
            } while (findUsername);

            mhsData.push({
              nim: mhs.nim.toString(),
              nama: mhs.nama,
              angkatan: parseInt("20" + mhs.nim.toString().substring(6, 8)),
              statusAktif: "Aktif",
              jalurMasuk: mhs.jalurMasuk,
              kodeWali: mhs.nipWali,
            });
            accounts.push({
              username: username,
              password: generateCharacter(),
              status: "Aktif",
              pemilik: mhs.nim.toString(),
            });
          }
        }
      }
    }
    const [doneMhs, doneAkun] = await prisma.$transaction([
      prisma.tb_mhs.createMany({
        data: mhsData,
        skipDuplicates: true,
      }),

      prisma.tb_akun_mhs.createMany({
        data: accounts,
        skipDuplicates: true,
      }),
    ]);
    return `${doneMhs.count} mahasiswa dan ${doneAkun.count} akun mahasiswa berhasil ditambahkan`;
  } catch (err) {
    throw err;
  }
};

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
  batchAddMahasiswa,
  getDataAkunMahasiswa,
  getAkunMahasiswa,
};
