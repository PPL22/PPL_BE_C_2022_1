const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const e = require('cors');
const jwt = require('jsonwebtoken')

const login = async (username, password) => {
    let dosen = true

    // Find akun in akun_dosen table
    let akun = await prisma.tb_akun_dosen.findFirst({
        where: {
            username: username
        },
        include: {
            fk_pemilik: true
        }
    })
    
    // Not a dosen
    if (!akun) {
        dosen = false
        akun = await prisma.tb_akun_mhs.findUnique({
            where: {
                username: username
            }, include: {
                fk_pemilik: true
            }
        })    
    }
    
    // User not found
    if (!akun) throw new Error("User not found")
    
    // Compare akun password
    try {
        if (await bcrypt.compare(password, akun.password)) { // TODO: check bcrypt compare | Done
            // Create new token
            const userAccessToken = jwt.sign({username: akun.username, role: akun.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
            const userRefreshToken = jwt.sign({username: akun.username, role: akun.role}, process.env.REFRESH_TOKEN_SECRET)
            
            // Find owner
            let owner, firstTime = false, role = "Mahasiswa"
            if (!dosen) { // Mahasiswa has no role
                owner = akun.fk_pemilik.nim
                if (!akun.fk_pemilik.email) {
                    firstTime = true
                }
            } else {
                owner = akun.fk_pemilik.nip
                jsonRole = await prisma.tb_role_akun_dosen.findMany({
                    where: {
                        username: akun.username
                    },
                    select: {
                        role: true
                    }
                })

                // Akun doesn't have any role
                if (!jsonRole) throw new Error("User doesn't have any role")
                
                // Parse JSON role as array
                role = []
                jsonRole.forEach(r => {
                    role.push(r.role)
                })
            }

            return {
                owner: owner,
                role: role,
                firstTime: firstTime,
                accessToken: userAccessToken,
                refreshToken: userRefreshToken
            }
        } else {
            throw new Error("Wrong password")
        }
    } catch (err) {
        throw err
    }   
}
module.exports = {login}