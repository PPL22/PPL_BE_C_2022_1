const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getProfileDosen = async (data) => {
  const nip = data.nip;

  try {
    const result = await prisma.tb_dosen.findUnique({
      where: {
        nip: nip,
      }
    });

    return result;
  } catch (err) {
    throw err;
  }
};

module.exports = getProfileDosen