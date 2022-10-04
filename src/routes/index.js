const express = require("express");
const mahasiswaController = require("../controllers/mahasiswaController");
const { loginController } = require("../controllers/login");

const router = express.Router();
router.post("/login", loginController);

// Mahasiswa Controller
router.post("/mahasiswa/update-data", mahasiswaController.updateDataMahasiswa);

module.exports = router;
