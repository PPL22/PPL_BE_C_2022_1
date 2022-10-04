const mahasiswaServices = require("../services/mahasiswaServices");

async function updateDataMahasiswa(req, res) {
  if (!req.body) {
    res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  const { nim, oldUsername, username, email, password, alamat, kota, foto } =
    req.body;

  // regex username hanya boleh huruf kecil, angka, dan underscore
  const regexUsername = /^[a-z0-9_]+$/;
  //check username
  if (!regexUsername.test(username)) {
    res.status(400).json({
      message:
        "Username hanya boleh terdiri dari huruf kecil, angka, dan underscore",
    });
  }

  // regex email
  const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //check email
  if (!regexEmail.test(email)) {
    res.status(400).json({
      message: "Email tidak valid",
    });
  }

  if (!nim || !username || !email || !password || !alamat || !kota || !foto) {
    res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  try {
    const data = {
      nim,
      oldUsername,
      username,
      email,
      password,
      alamat,
      kota,
      foto,
    };
    console.log(data);
    const result = await mahasiswaServices.updateDataMahasiswa(data);
    res.status(200).json({
      message: "Data berhasil diubah",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    res.status(403).json({ message: err.message });
  }
}

module.exports = { updateDataMahasiswa };
