const multer = require("multer");
const path = require("path");

const uploadPDF = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/documents/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) == ".pdf") {
      return cb(null, true);
    } else {
      return cb("Format dokumen harus PDF");
    }
  },
});

const uploadExcel = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/documents/data-mhs/");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) == ".csv" || path.extname(file.originalname) == ".xlsx") {
      return cb(null, true);
    } else {
      return cb("Format dokumen harus CSV / XLSX");
    }
  },
});

const uploadImage = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

module.exports = { uploadImage, uploadPDF, uploadExcel };
