const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const login = async (username, password) => {
    // Find user in database
    const user = await prisma.tb_user.findUnique({
        where: {
            username: username
        }
    })
    if (!user) throw new Error("User not found")

    // Compare user password
    if (bcrypt.compare(password, user.password)) {
        // Create new token
        const userAccessToken = jwt.sign({username: user.username, role: user.role}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
        const userRefreshToken = jwt.sign({username: user.username, role: user.role}, process.env.REFRESH_TOKEN_SECRET)
        
        // Cari owner
        // let owner, firstTime = false
        // if (user.role === "Mahasiswa") {
        //     owner = await prisma.tb_mhs.findUnique({
        //         where: user.username
        //     })
        //     if (!owner.email) {
        //         firstTime = true
        //     }
        // } else {
        //     owner = await prisma.tb_dosen.findUnique({
        //         where: user.username
        //     })
        // }

        return {
            username: user.username,
            role: user.role,
            // firstTime: firstTime,
            accessToken: userAccessToken,
            refreshToken: userRefreshToken
        }
    } else {
        throw new Error("Wrong password")
    }
}
module.exports = {login}