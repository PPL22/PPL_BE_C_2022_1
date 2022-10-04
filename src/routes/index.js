const express = require('express')
const {loginController} = require('../controllers/loginController')
const {getDataDosenController, generateUsernameController, addMahasiswaController} = require('../controllers/operatorController')

const router = express.Router();

// Login
router.post('/login', loginController)

// Operator
router.get('/operator/data-dosen', getDataDosenController)
router.get('/operator/generate-username', generateUsernameController)
router.post('/operator/add-mahasiswa', addMahasiswaController)

// Mahasiswa
// router.post('/mahasiswa/upload-irs', uploadIRSController)

module.exports = router
