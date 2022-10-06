const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const searchMahasiswa = async (data) => {
    try {
        // Can't use prisma query because wildcards (%) are not supported
        // https://github.com/prisma/prisma/discussions/3159
        let result
        let keyword = `%${data.keyword}%`

        // Default: get semua data siswa
        if (!data.keyword) {
            result = await prisma.tb_mhs.findMany()
        } else {
            if (data.nip) {
                let nip = `${data.nip}`
                if (data.type === "NIM") {
                    result = await prisma.$queryRaw`
                        SELECT * FROM tb_mhs
                        WHERE nim LIKE ${keyword}
                        AND kodeWali = ${nip}
                    `
                } else {
                    result = await prisma.$queryRaw`
                        SELECT * FROM tb_mhs
                        WHERE nama LIKE ${keyword}
                        AND kodeWali = ${nip}
                    `
                }
            } else {
                if (data.type === "NIM") {
                    result = await prisma.$queryRaw`
                        SELECT * FROM tb_mhs
                        WHERE nim LIKE ${keyword}
                    `
                } else {
                    result = await prisma.$queryRaw`
                        SELECT * FROM tb_mhs
                        WHERE nama LIKE ${keyword}
                    `
                }
            }
        }
    
        return result
    } catch (err) {
        throw err
    }
}

module.exports = { searchMahasiswa }