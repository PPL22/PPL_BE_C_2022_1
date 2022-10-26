const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const xlsx = require('xlsx')
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

async function addMahasiswa(data) {
  try {
    // Filter duplicate mahasiswa by finding them in database
    const findMhs = await prisma.tb_mhs.findUnique({
      where: {
        nim: data.nim,
      },
    });

    if (findMhs) throw new Error("Mahasiswa already exists");
    
    const findDosen = await prisma.tb_dosen.findUnique({
      where: {
        nip: data.dosenWali
      }
    })

    if (!findDosen) throw new Error("Dosen tidak ditemukan")

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
  let countMhs = 0, addedMhs = 0
  try {
    // JSON.parse(JSON.stringify(d ata.dokumen))
    const generateCharacter = () => {
      return Math.random().toString(36).substring(2);
    };
    const fileName = data.dokumen.originalname
    const docInXlsx = xlsx.readFile(`public/documents/data-mhs/${fileName}`)
    const sheetNameList = docInXlsx.SheetNames
  
    sheetNameList.forEach(async sheetName => {

      const docInJson = xlsx.utils.sheet_to_json(docInXlsx.Sheets[sheetNameList[0]])
  
      // Check validity
      if (!docInJson[0].nim || !docInJson[0].nama || !docInJson[0].jalurMasuk || !docInJson[0].nipWali) {
        throw new Error("Pastikan format excel anda sesuai format (nim, nama, jalurMasuk, nipWali). Angkatan didapat dari NIM")
      }
      
      // Create username and password
      console.log(docInJson[0].nipWali)
  
      // TODO: kode wali error DONE + ngasih tau format data
      const accounts = []
      const mhsData = []
  
      // TODO: needs to check if foreach error checking is already correct or not
      let row = 0
      docInJson.forEach(async mhs => {
        try {
          row++
          if (!mhs.nim || !mhs.nama || !mhs.jalurMasuk || !mhs.nipWali) {
            throw new Error(`Pastikan semua data sudah terisi (data ke-${row} tidak lengkap)`)
          }
    
          // TODO: refactor this as a new utilites (?)
          // Find dosen in tb_dosen
          const findDosen = await prisma.tb_dosen.findUnique({
            where: {
              nip: mhs.nipWali
            }
          })
    
          if (!findDosen) throw new Error(`Dosen tidak ditemukan pada data ke-${row}`)
    
          mhsData.push({
            nim: mhs.nim,
            nama: mhs.nama,
            angkatan: parseInt("20"+mhs.nim.substring(6, 8)),
            statusAktif: "Aktif",
            jalurMasuk: mhs.jalurMasuk,
            kodeWali: mhs.nipWali
          })
          accounts.push({
            username: generateCharacter(),
            password: generateCharacter(),
            status: "Aktif",
            pemilik: mhs.nim
          })
        } catch (err) {
          throw err
        }
      })
  
      const [doneMhs, doneAkun] = await prisma.$transaction([
        prisma.tb_mhs.createMany({
          data: mhsData,
          skipDuplicates: true,
        }),
        
        prisma.tb_akun_mhs.createMany({
          data: accounts,
          skipDuplicates: true,
        })  
      ]);
    })
    return `${addedMhs} mahasiswa dari ${countMhs} berhasil ditambahkan`
  } catch(err) {
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
  addMahasiswa,
  batchAddMahasiswa,
  getDataAkunMahasiswa,
  getAkunMahasiswa,
};
