const {
  updateDataMahasiswa,
  entryDataIrs,
  entryDataKhs,
  entryDataPkl,
  entryDataSkripsi,
  getProfileMahasiswa,
} = require("../services/mahasiswaServices");
const path = require("path");

const updateDataMahasiswaController = async (req, res) => {
  const { nim, oldUsername, username, email, password, alamat, kodeKab, noHP } =
    req.body;
  const foto = req.file;

  // check null input
  if (
    !nim ||
    !username ||
    !oldUsername ||
    !email ||
    !password ||
    !alamat ||
    !kodeKab ||
    !foto ||
    !noHP
  ) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  if (
    path.extname(foto.originalname) !== ".png" &&
    path.extname(foto.originalname) !== ".jpg" &&
    path.extname(foto.originalname) !== ".jpeg"
  ) {
    return res.status(400).json({
      message: "Format foto harus png,jpg,jpeg",
    });
  }

  // regex username hanya boleh huruf kecil, angka, dan underscore
  const regexUsername = /^[a-z0-9_]+$/;
  //check username
  if (!regexUsername.test(username)) {
    return res.status(400).json({
      message:
        "Username hanya boleh terdiri dari huruf kecil, angka, dan underscore",
    });
  }

  // regex email must include undip.ac.id
  const regexEmail = /undip.ac.id$/;
  //check email
  if (!regexEmail.test(email)) {
    return res.status(400).json({
      message: "Email harus menggunakan email undip",
    });
  }

  try {
    const data = {
      nim,
      username,
      oldUsername,
      email,
      password,
      alamat,
      kodeKab,
      foto,
      noHP,
    };

    const result = await updateDataMahasiswa(data);
    return res.status(200).json({
      message: "Data berhasil diubah",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: err.message });
  }
};

const entryDataIrsController = async (req, res) => {
  const { nim, semester, status, jumlahSks } = req.body;
  const dokumen = req.file;

  // check null input
  if (!nim || !semester || !status || !jumlahSks || !dokumen) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  if (path.extname(dokumen.originalname) !== ".pdf") {
    return res.status(400).json({
      message: "Format dokumen harus pdf",
    });
  }

  try {
    const data = {
      nim,
      semester,
      status,
      jumlahSks,
      dokumen,
    };

    const result = await entryDataIrs(data);
    return res.status(200).json({
      message: "Entry data IRS berhasil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: err.message });
  }
};

const entryDataKhsController = async (req, res) => {
  const {
    nim,
    semester,
    status,
    jumlahSksSemester,
    ips,
    jumlahSKsKumulatif,
    ipk,
  } = req.body;
  const dokumen = req.file;

  // check null input
  if (
    !nim ||
    !semester ||
    !status ||
    !jumlahSksSemester ||
    !ips ||
    !jumlahSKsKumulatif ||
    !ipk ||
    !dokumen
  ) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  if (path.extname(dokumen.originalname) !== ".pdf") {
    return res.status(400).json({
      message: "Format dokumen harus pdf",
    });
  }

  try {
    const data = {
      nim,
      semester,
      status,
      jumlahSksSemester,
      ips,
      jumlahSKsKumulatif,
      ipk,
      dokumen,
    };

    const result = await entryDataKhs(data);
    return res.status(200).json({
      message: "Entry data KHS berhasil ",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: err.message });
  }
};

const entryDataPklController = async (req, res) => {
  const { nim, semester, status, nilai, tanggalLulusSidang } = req.body;
  const dokumen = req.file;

  // check null input
  if (
    !nim ||
    !semester ||
    !status ||
    !nilai ||
    !tanggalLulusSidang ||
    !dokumen
  ) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  if (path.extname(dokumen.originalname) !== ".pdf") {
    return res.status(400).json({
      message: "Format dokumen harus pdf",
    });
  }

  try {
    const data = {
      nim,
      semester,
      status,
      nilai,
      tanggalLulusSidang,
      dokumen,
    };

    const result = await entryDataPkl(data);
    return res.status(200).json({
      message: "Entry data progress PKL berhasil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: err.message });
  }
};

const entryDataSkripsiController = async (req, res) => {
  const { nim, semester, status, nilai } = req.body;
  const dokumen = req.file;

  // check null input
  if (!nim || !semester || !status || !nilai || !dokumen) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  if (path.extname(dokumen.originalname) !== ".pdf") {
    return res.status(400).json({
      message: "Format dokumen harus pdf",
    });
  }

  try {
    const data = {
      nim,
      semester,
      status,
      nilai,
      dokumen,
    };

    const result = await entryDataSkripsi(data);
    return res.status(200).json({
      message: "Entry data progress PKL berhasil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: err.message });
  }
};

module.exports = {
  updateDataMahasiswaController,
  entryDataIrsController,
  entryDataKhsController,
  entryDataPklController,
  entryDataSkripsiController,
};
