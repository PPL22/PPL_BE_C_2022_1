const express = require('express')
const app = express()
const port = 3000
app.use(express.json())


require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

app.post('/login', async (req, res) => {
    const {username, password}= req.body
    
    console.log(req.body)

    const user = await prisma.tb_user.findMany({
        where: {
            username: username
        }
    })

    if (!user) return res.status(403).json({message: "User not found"})

    if (password === user[0].password) {
        const userAccessToken = jwt.sign({username: user[0].username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'})
        const userRefreshToken = jwt.sign({username: user[0].username}, process.env.REFRESH_TOKEN_SECRET)
        return res.json({
            username: user[0].username,
            role: user[0].role,
            accessToken: userAccessToken,
            refreshToken: userRefreshToken
        })
    } else {
        return res.status(403).json({message: "Wrong password"})
    }
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

