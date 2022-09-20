const express = require('express')
const app = express()
const port = 3000


require('dotenv').config()

import { PrismaClient } from '@prisma/client'
const bcrypt = require('bcrypt');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

app.post('/login', async (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })

    if (await bcrypt.compare(password, user.password)) {
        const userAccessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        const userRefreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
        res.json({
            username: user.username,
            role: user.role,
            accessToken: userAccessToken,
            refreshToken: userRefreshToken
        })
    }
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

