const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// !!! JOIN WITH KOTA / KABUPATEN TABLE
const getProfileDosen = async (data) => {
  const nip = data.nip;

  try {
    const result = await prisma.tb_dosen.findUnique({
      where: {
        nip: nip,
      },
    });
    delete result.nip;
    delete result.nama;
    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = getProfileDosen;
