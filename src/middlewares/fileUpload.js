const multer = require("multer");
const path = require("path");

const uploadDocument = multer({
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

const uploadImage = multer({
  limits: {
    fileSize: 4 * 1024 * 1024,
  },
});

module.exports = { uploadImage, uploadDocument };
