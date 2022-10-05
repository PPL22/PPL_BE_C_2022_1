const {
  getDataDosen,
  generateUsername,
  addMahasiswa,
} = require("../services/operatorServices");

async function getDataDosenController(req, res) {
  try {
    const result = await getDataDosen();
    return res.json(result);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
}

async function generateUsernameController(req, res) {
  try {
    const result = await generateUsername();
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
    password,
    status,
    jalurMasuk,
    dosenWali,
  } = req.body;

  try {
    const result = await addMahasiswa(
      username,
      namaLengkap,
      nim,
      password,
      status,
      jalurMasuk,
      dosenWali
    );
    return res.json(result);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
}
module.exports = {
  getDataDosenController,
  generateUsernameController,
  addMahasiswaController,
};
