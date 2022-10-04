const { getDataDosen, generateUsername, addMahasiswa } = require('../services/operator')

async function getDataDosenController(req, res) {
    try {
        const result = await getDataDosen()
        res.json(result)
    } catch(err) {
        res.status(403).json({message: err.message})
    }
}

async function generateUsernameController(req, res) {
    try {
        const result = await generateUsername()
        res.json(result)
    } catch {
        res.status(403).json({message: err.message})
    }
}

async function addMahasiswaController(req, res) {
    const {username, namaLengkap, nim, password, status, jalurMasuk, dosenWali} = req.body
    
    // TODO: Validate data
    try {
        const result = await addMahasiswa(username, namaLengkap, nim, password, status, jalurMasuk, dosenWali)
        res.json(result)
    } catch(err) {
        res.status(403).json({message: err.message})
    }
}
module.exports = {getDataDosenController, generateUsernameController, addMahasiswaController}