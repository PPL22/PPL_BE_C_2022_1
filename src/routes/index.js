const express = require("express");
const { uploadImage, uploadPDF, uploadExcel, uploadDokumen, uploadExcelMhs, uploadFotoProfil } = require("../middlewares/fileUpload");
const multer = require("multer");

const { loginController } = require("../controllers/loginController");

const {
  getDataDosenController,
  getAkunMahasiswaController,
  addMahasiswaController,
  getDataAkunMahasiswaController,
  batchAddMahasiswaController,
} = require("../controllers/operatorController");

const {
  getDataRegisterMahasiswaController,
  updateDataMahasiswaController,
  entryDataIrsController,
  entryDataKhsController,
  entryDataPklController,
  entryDataSkripsiController,
  getProfileMahasiswaController,
  getDashboardMahasiswaController,
} = require("../controllers/mahasiswaController");

const {
  validasiDataIrsController,
  validasiDataKhsController,
  validasiDataPklController,
  validasiDataSkripsiController,
  rekapMahasiswaDosenController,
  daftarMahasiswaDosenController,
  searchMahasiswaDosenController,
  getDataAkademikMhsDosenController,
  getStatusValidasiController,
  getDashboardDosenController,
} = require("../controllers/dosenController");

const {
  rekapMahasiswaDepartemenController,
  daftarMahasiswaDepartemenController,
  searchMahasiswaDepartemenController,
  getDashboardDepartemenController,
  getDataAkademikMhsDepartemenController,
} = require("../controllers/departemenController");

const { getKotaController } = require("../controllers/locationController");

const verifyToken = require("../middlewares/verifyToken");
const getProfileDosenController = require("../controllers/profileDosenController");

const router = express.Router();

// Login
router.post("/login", loginController);

router.use(verifyToken);

//=======================================================
// Operator
router.get("/operator/data-dosen", getDataDosenController);
router.get("/operator/data-mahasiswa", getDataAkunMahasiswaController);
router.get("/operator/akun-mahasiswa", getAkunMahasiswaController);
router.get("/operator/profile", getProfileDosenController);

router.post("/operator/add-mahasiswa", addMahasiswaController);
router.post(
  "/operator/batch-add-mahasiswa",
  uploadExcelMhs,
  batchAddMahasiswaController
);

//=======================================================
// Mahasiswa Controller
router.get("/mahasiswa/register", getDataRegisterMahasiswaController);
router.get("/mahasiswa/profile", getProfileMahasiswaController);
router.get("/mahasiswa/kota", getKotaController);

// Dashboard
router.get("/mahasiswa/dashboard", getDashboardMahasiswaController);

router.post(
  "/mahasiswa/update-data",
  uploadFotoProfil,
  updateDataMahasiswaController
);


// Entry data
router.post(
  "/mahasiswa/entry-irs",
  uploadDokumen,
  entryDataIrsController
);
router.post(
  "/mahasiswa/entry-khs",
  uploadDokumen,
  entryDataKhsController
);
router.post(
  "/mahasiswa/entry-pkl",
  uploadDokumen,
  entryDataPklController
);
router.post(
  "/mahasiswa/entry-skripsi",
  uploadDokumen,
  entryDataSkripsiController
);

//=======================================================
// Dosen Controller
// Dashboard and profile
// TODO: refactor profile route, controller, and service
router.get("/dosen/dashboard", getDashboardDosenController);
router.get("/dosen/profile", getProfileDosenController);

// Get status validasi
router.get("/dosen/status-validasi/irs", getStatusValidasiController);
router.get("/dosen/status-validasi/khs", getStatusValidasiController);
router.get("/dosen/status-validasi/pkl", getStatusValidasiController);
router.get("/dosen/status-validasi/skripsi", getStatusValidasiController);

// Validate data mahasiswa
router.put("/dosen/validasi/irs", validasiDataIrsController);
router.put("/dosen/validasi/khs", validasiDataKhsController);
router.put("/dosen/validasi/pkl", validasiDataPklController);
router.put("/dosen/validasi/skripsi", validasiDataSkripsiController);

// Rekap
router.get("/dosen/rekap/status", rekapMahasiswaDosenController);
router.get("/dosen/rekap/pkl", rekapMahasiswaDosenController);
router.get("/dosen/rekap/skripsi", rekapMahasiswaDosenController);
router.get("/dosen/daftar-status", daftarMahasiswaDosenController);
router.get("/dosen/daftar-pkl", daftarMahasiswaDosenController);
router.get("/dosen/daftar-skripsi", daftarMahasiswaDosenController);

// Search mahasiswa
router.get("/dosen/search-mhs", searchMahasiswaDosenController);
router.get("/dosen/data-akademik-mhs/:nim", getDataAkademikMhsDosenController);

//=======================================================
// Departemen Controller
// Dashboard
router.get("/departemen/dashboard", getDashboardDepartemenController);
router.get("/departemen/profile", getProfileDosenController);

// Rekap
router.get("/departemen/rekap/status", rekapMahasiswaDepartemenController);
router.get("/departemen/rekap/pkl", rekapMahasiswaDepartemenController);
router.get("/departemen/rekap/skripsi", rekapMahasiswaDepartemenController);
router.get("/departemen/daftar-status", daftarMahasiswaDepartemenController);
router.get("/departemen/daftar-pkl", daftarMahasiswaDepartemenController);
router.get("/departemen/daftar-skripsi", daftarMahasiswaDepartemenController);

// Search mahasiswa
router.get("/departemen/search-mhs/", searchMahasiswaDepartemenController);
router.get(
  "/departemen/data-akademik-mhs/:nim",
  getDataAkademikMhsDepartemenController
);

module.exports = router;
