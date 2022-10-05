const express = require("express");
const { uploadImage, uploadDocument } = require("../middlewares/fileUpload");
const multer = require("multer");

const { loginController } = require("../controllers/loginController");

const {
  getDataDosenController,
  generateUsernameController,
  addMahasiswaController,
} = require("../controllers/operatorController");

const {
  updateDataMahasiswaController,
  entryDataIrsController,
  entryDataKhsController,
  entryDataPklController,
  entryDataSkripsiController,
} = require("../controllers/mahasiswaController");

const {
  rekapStatusMahasiswaController,
  validasiDataIrsController,
  validasiDataKhsController,
  validasiDataPklController,
  validasiDataSkripsiController,
  rekapMahasiswaController,
  daftarMahasiswaController,
} = require("../controllers/dosenController");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

// Login
router.post("/login", loginController);

// router.use(verifyToken);

// Operator
router.get("/operator/data-dosen", getDataDosenController);
router.get("/operator/generate-username", generateUsernameController);
router.post("/operator/add-mahasiswa", addMahasiswaController);

// Mahasiswa Controller
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
router.put("/dosen/validasi-irs", validasiDataIrsController);
router.put("/dosen/validasi-khs", validasiDataKhsController);
router.put("/dosen/validasi-pkl", validasiDataPklController);
router.put("/dosen/validasi-skripsi", validasiDataSkripsiController);
router.get("/dosen/rekap-status", rekapMahasiswaController);
router.get("/dosen/rekap-pkl", rekapMahasiswaController);
router.get("/dosen/rekap-skripsi", rekapMahasiswaController);
router.get("/dosen/daftar-status", daftarMahasiswaController);
router.get("/dosen/daftar-pkl", daftarMahasiswaController);
router.get("/dosen/daftar-skripsi", daftarMahasiswaController);

module.exports = router;
