const fs = require("fs");
const {
  getDataDosen,
  getAkunMahasiswa,
  addMahasiswa,
  batchAddMahasiswa,
  getJumlahAkunMahasiswa,
  cetakDaftarAkunMahasiswa,
  getDataAkunDosen,
  getAkunDosen,
  addDosen,
  cetakDaftarAkunDosen,
} = require("../services/operatorServices");

const getDataDosenController = async (req, res) => {
  try {
    const result = await getDataDosen();
    return res.json(result);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

const getAkunMahasiswaController = async (req, res) => {
  const path = req.path;
  let { page, qty, sortBy, order } = req.query;

  if (!page) page = 1;
  if (!qty) qty = 10;
  if (!order) order = "asc";

  // Check params
  if (isNaN(page) || isNaN(qty) || !["asc", "desc"].includes(order))
    return res.status(400).json({ message: "Bad request. Params not valid" });
  page = parseInt(page);
  qty = parseInt(qty);

  try {
    const data = { page, qty, sortBy, order };
    const result = await getAkunMahasiswa(data);
    return res.json(result);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

const getAkunDosenController = async (req, res) => {
  const path = req.path;
  let { page, qty } = req.query;

  if (!page) page = 1;
  if (!qty) qty = 10;

  // Check params
  if (isNaN(page) || isNaN(qty))
    return res.status(400).json({ message: "Bad request. Params not valid" });
  page = parseInt(page);
  qty = parseInt(qty);

  try {
    const data = { page, qty };
    const result = await getAkunDosen(data);
    return res.json(result);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

const addMahasiswaController = async (req, res) => {
  const {
    username,
    namaLengkap,
    nim,
    angkatan,
    password,
    status,
    jalurMasuk,
    dosenWali,
  } = req.body;

  if (
    !username ||
    !namaLengkap ||
    !nim ||
    !angkatan ||
    !password ||
    !status ||
    !jalurMasuk ||
    !dosenWali
  ) {
    return res
      .status(400)
      .json({ message: "Paramater tidak boleh ada yang kosong" });
  }

  // regex username hanya boleh huruf kecil, angka, dan underscore
  const regexUsername = /^[a-z0-9_]+$/;
  //check username (check duplicate sudah ada di service)
  if (!regexUsername.test(username)) {
    return res.status(400).json({
      message:
        "Username hanya boleh terdiri dari huruf kecil, angka, dan underscore",
    });
  }

  // Check nama
  const regexNama = /^[A-Za-z ,']+$/;
  if (!regexNama.test(namaLengkap)) {
    return res.status(400).json({
      message:
        "Nama hanya boleh terdiri dari huruf besar/kecil, spasi, koma, atau tanda petik",
    });
  }

  // TODO-VALIDATE: Check NIM (?)

  // Check angkatan
  if (
    angkatan < 1950 ||
    angkatan > new Date().getFullYear() - (new Date().getMonth() > 6 ? 0 : 1)
  ) {
    return res.status(400).json({
      message: "Angkatan tidak valid",
    });
  }

  // TODO-VALIDATE: check password (?)

  // Check status,
  const statusMhs = [
    "Aktif",
    "Cuti",
    "Lulus",
    "Mangkir",
    "DO",
    "UndurDiri",
    "MeninggalDunia",
  ];
  if (!statusMhs.includes(status)) {
    return res.status(400).json({
      message: "Status tidak valid",
    });
  }

  // Check jalurMasuk,
  const allJalurMasuk = ["SBMPTN", "SNMPTN", "Mandiri", "Lainnya"];
  if (!allJalurMasuk.includes(jalurMasuk)) {
    return res.status(400).json({
      message: "Jalur masuk tidak valid",
    });
  }

  // Doswal already checked in service

  try {
    const result = await addMahasiswa({
      username,
      namaLengkap,
      nim,
      angkatan,
      password,
      status,
      jalurMasuk,
      dosenWali,
    });
    return res.status(200).json({ message: "Mahasiswa berhasil ditambahkan" });
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

const addDosenController = async (req, res) => {
  const { username, namaLengkap, nip, password } = req.body;

  // regex username hanya boleh huruf kecil, angka, dan underscore
  const regexUsername = /^[a-z0-9_]+$/;
  //check username (check duplicate sudah ada di service)
  if (!regexUsername.test(username)) {
    return res.status(400).json({
      message:
        "Username hanya boleh terdiri dari huruf kecil, angka, dan underscore",
    });
  }

  // Check nama
  const regexNama = /^[A-Za-z ,'.]+$/;
  if (!regexNama.test(namaLengkap)) {
    return res.status(400).json({
      message:
        "Nama hanya boleh terdiri dari huruf besar/kecil, spasi, koma, atau tanda petik",
    });
  }

  try {
    const result = await addDosen({
      username,
      namaLengkap,
      nip,
      password,
    });
    return res.status(200).json({ message: "Dosen berhasil ditambahkan" });
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

const batchAddMahasiswaController = async (req, res) => {
  const dokumen = req.file;
  const data = { dokumen };
  try {
    const result = await batchAddMahasiswa(data);
    return res.status(200).json({ message: result });
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

const getJumlahAkunMahasiswaController = async (req, res) => {
  try {
    const result = await getJumlahAkunMahasiswa();
    return res.json(result);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

const cetakDaftarAkunMahasiswaController = async (req, res) => {
  try {
    const data = {};

    const result = await cetakDaftarAkunMahasiswa(data);
    return res.status(200).download(result, (err) => {
      if (err) {
        console.log(err);
        // res.status(400).json({
        //   message: err.message
        // })
      }
      fs.unlinkSync(result);
      // return res.status(200).json({
      //   message: "File berhasil di download"
      // })
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

const cetakDaftarAkunDosenController = async (req, res) => {
  try {
    const data = {};

    const result = await cetakDaftarAkunDosen(data);

    return res.status(200).download(result, (err) => {
      if (err) {
        console.log(err);
        // res.status(400).json({
        //   message: err.message
        // })
      }
      fs.unlinkSync(result);
      // return res.status(200).json({
      //   message: "File berhasil di download"
      // })
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

const getJumlahAkunDosenController = async (req, res) => {
  try {
    const result = await getDataAkunDosen();
    return res.json(result);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

module.exports = {
  getDataDosenController,
  getAkunMahasiswaController,
  addMahasiswaController,
  batchAddMahasiswaController,
  getJumlahAkunMahasiswaController,
  cetakDaftarAkunMahasiswaController,

  getAkunDosenController,
  addDosenController,
  getJumlahAkunDosenController,
  cetakDaftarAkunDosenController,
};
