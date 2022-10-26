const {
  getDataDosen,
  getAkunMahasiswa,
  addMahasiswa,
  batchAddMahasiswa, 
  getDataAkunMahasiswa,
} = require("../services/operatorServices");

async function getDataDosenController(req, res) {
  try {
    const result = await getDataDosen();
    return res.json(result);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
}

async function getAkunMahasiswaController(req, res) {
  try {
    const result = await getAkunMahasiswa();
    return res.json(result);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
}

async function addMahasiswaController(req, res) {
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

  try {
    const result = await addMahasiswa({
      username,
      namaLengkap,
      nim,
      angkatan,
      password,
      status,
      jalurMasuk,
      dosenWali
    });
    return res.status(200).json({ message: "Mahasiswa berhasil ditambahkan" });
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
}

const batchAddMahasiswaController = async (req, res) => {
  const dokumen = req.file
  const data = { dokumen }
  try {
    const result = await batchAddMahasiswa(data)
    return res.status(200).json({ message: result });
  } catch (err) {
    return res.status(403).json({ message: err.message })
  } 
}

const getDataAkunMahasiswaController = async (req, res) => {
  try {
    const result = await getDataAkunMahasiswa();
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
  getDataAkunMahasiswaController,
};
