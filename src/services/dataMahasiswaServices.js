const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const searchMahasiswa = async (data) => {
    try {
        // Can't use prisma query because wildcards (%) are not supported
        // https://github.com/prisma/prisma/discussions/3159
        // TODO: ganti jadi "contains"
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

const getDataAkademikMhs = async (data) => {
    try {
        const irs = await prisma.tb_irs.findMany({
            where: {
                nim: data.nim
            }
        })
    
        const khs = await prisma.tb_khs.findMany({
            where: {
                nim: data.nim
            }
        })
        
        const pkl = await prisma.tb_pkl.findMany({
            where: {
                nim: data.nim
            }
        })
        
        const skripsi = await prisma.tb_skripsi.findMany({
            where: {
                nim: data.nim
            }
        })

        // Append all queried data into one array
        const combinedData = irs.concat(khs, pkl, skripsi)
        
        // Groups the data by semesters
        // Idk what these codes mean, but it works :D
        const groupBySmt = combinedData.reduce((r, a) => {
            r[a.semester] = r[a.semester] || []
            r[a.semester].push(a)
            return r
        }, Object.create(null)) 

        return groupBySmt
    } catch (err) {
        throw err
    }
}
module.exports = { searchMahasiswa, getDataAkademikMhs }