const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateDataMahasiswa = async (data) => {
  try {
    const checkUsername = await prisma.tb_akun_mhs.findUnique({
      where: {
        username: data.username,
      },
    });

    if (checkUsername) {
      throw new Error("Username sudah digunakan");
    }

    const updateAkun = await prisma.tb_akun_mhs.update({
      where: {
        username: data.oldUsername,
      },
      data: {
        username: data.username,
        password: data.password,
      },
    });

    const updateMahasiswa = await prisma.tb_mhs.update({
      where: {
        nim: data.nim,
      },
      data: {
        email: data.email,
        alamat: data.alamat,
        foto: data.foto,
      },
    });

    const result = await prisma.$transaction([updateAkun, updateMahasiswa]);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { updateDataMahasiswa };
