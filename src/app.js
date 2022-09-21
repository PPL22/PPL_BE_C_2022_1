require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.port || 5000
const router = require('./routes/index')

app.use(express.json())
app.use('/', router)

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})

