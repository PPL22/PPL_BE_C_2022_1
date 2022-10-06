const express = require("express");
const { uploadImage, uploadDocument } = require("../middlewares/fileUpload");
const multer = require("multer");

const { loginController } = require("../controllers/loginController");

const {
  getDataDosenController,
  generateUsernameController,
  addMahasiswaController,
  getDataAkunMahasiswaController,
} = require("../controllers/operatorController");

const {
  getDataRegisterMahasiswaController,
  updateDataMahasiswaController,
  entryDataIrsController,
  entryDataKhsController,
  entryDataPklController,
  entryDataSkripsiController,
  getProfileMahasiswaController,
} = require("../controllers/mahasiswaController");

const {
  validasiDataIrsController,
  validasiDataKhsController,
  validasiDataPklController,
  validasiDataSkripsiController,
  rekapMahasiswaDosenController,
  daftarMahasiswaDosenController,
} = require("../controllers/dosenController");

const {
  rekapMahasiswaDepartemenController,
  daftarMahasiswaDepartemenController,
} = require("../controllers/departemenController");

const { getKotaController } = require("../controllers/locationController");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();
const app = express();

// Login
router.post("/login", loginController);

// app.use(verifyToken);

// Operator
router.get("/operator/data-dosen", getDataDosenController);
router.get("/operator/data-mahasiswa", getDataAkunMahasiswaController);
router.get("/operator/generate-username", generateUsernameController);
router.post("/operator/add-mahasiswa", addMahasiswaController);

// Mahasiswa Controller
router.get("/mahasiswa/register/:nim", getDataRegisterMahasiswaController);
router.get("/mahasiswa/kota", getKotaController);
router.get("/mahasiswa/profile/:nim", getProfileMahasiswaController);
router.post(
  "/mahasiswa/update-data",
  uploadImage.single("foto"),
  updateDataMahasiswaController
);
router.post(
  "/mahasiswa/entry-irs",
  uploadDocument.single("dokumen"),
  entryDataIrsController
);
router.post(
  "/mahasiswa/entry-khs",
  uploadDocument.single("dokumen"),
  entryDataKhsController
);
router.post(
  "/mahasiswa/entry-pkl",
  uploadDocument.single("dokumen"),
  entryDataPklController
);
router.post(
  "/mahasiswa/entry-skripsi",
  uploadDocument.single("dokumen"),
  entryDataSkripsiController
);

// Dosen Controller
router.put("/dosen/validasi-irs/", validasiDataIrsController);
router.put("/dosen/validasi-khs", validasiDataKhsController);
router.put("/dosen/validasi-pkl", validasiDataPklController);
router.put("/dosen/validasi-skripsi", validasiDataSkripsiController);
router.get("/dosen/rekap-status/:nip", rekapMahasiswaDosenController);
router.get("/dosen/rekap-pkl/:nip", rekapMahasiswaDosenController);
router.get("/dosen/rekap-skripsi/:nip", rekapMahasiswaDosenController);
router.get("/dosen/daftar-status/:nip", daftarMahasiswaDosenController);
router.get("/dosen/daftar-pkl/:nip", daftarMahasiswaDosenController);
router.get("/dosen/daftar-skripsi/:nip", daftarMahasiswaDosenController);

// Dosen Controller
router.get("/departemen/rekap-status", rekapMahasiswaDepartemenController);
router.get("/departemen/rekap-pkl", rekapMahasiswaDepartemenController);
router.get("/departemen/rekap-skripsi", rekapMahasiswaDepartemenController);
router.get("/departemen/daftar-status", daftarMahasiswaDepartemenController);
router.get("/departemen/daftar-pkl", daftarMahasiswaDepartemenController);
router.get("/departemen/daftar-skripsi", daftarMahasiswaDepartemenController);

module.exports = router;
