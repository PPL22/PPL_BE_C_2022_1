const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// <R> JOIN WITH KOTA / KABUPATEN TABLE
const getProfileDosen = async (data) => {
  const nip = data.nip;

  try {
    const result = await prisma.tb_dosen.findUnique({
      where: {
        nip: nip,
      },
      include: {
        fk_kodeKab: true,
        fk_kodeProv: true
      }
    });

    delete result.nip;
    delete result.nama;

    const namaKab = result.fk_kodeKab.namaKab 
    const namaProv = result.fk_kodeProv.namaProv 

    delete result.fk_kodeKab
    delete result.fk_kodeProv

    return {
      ...result,
      namaKab: namaKab,       
      namaProv: namaProv
    };
  } catch (err) {
    throw err;
  }
};

module.exports = getProfileDosen;
