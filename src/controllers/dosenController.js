const { searchMahasiswa } = require('../services/dataMahasiswaServices');
const {
  validasiDataIrs,
  validasiDataKhs,
  validasiDataPkl,
  validasiDataSkripsi,
} = require('../services/dosenServices');

const {
  rekapStatusMahasiswa,
  daftarStatusMahasiswa,
  rekapPklMahasiswa,
  daftarPklMahasiswa,
  rekapSkripsiMahasiswa,
  daftarSkripsiMahasiswa,
} = require('../services/rekapServices')

const validasiDataIrsController = async (req, res) => {
  const { nim, semester, status, jumlahSks } = req.body;

  // check null input
  if (!nim || !semester || !status || !jumlahSks) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  try {
    const data = {
      nim,
      semester,
      status,
      jumlahSks,
    };

    const result = await validasiDataIrs(data);
    return res.status(200).json({
      message: "validasi data IRS berhasil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: err.message });
  }
};

const validasiDataKhsController = async (req, res) => {
  const {
    nim,
    semester,
    status,
    jumlahSksSemester,
    ips,
    jumlahSKsKumulatif,
    ipk,
  } = req.body;

  // check null input
  if (
    !nim ||
    !semester ||
    !status ||
    !jumlahSksSemester ||
    !ips ||
    !jumlahSKsKumulatif ||
    !ipk
  ) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
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
    };

    const result = await validasiDataKhs(data);
    return res.status(200).json({
      message: "validasi data KHS berhasil ",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: err.message });
  }
};

const validasiDataPklController = async (req, res) => {
  const { nim, semester, status, nilai, tanggalLulusSidang } = req.body;

  // check null input
  if (!nim || !semester || !status || !nilai || !tanggalLulusSidang) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  try {
    const data = {
      nim,
      semester,
      status,
      nilai,
      tanggalLulusSidang,
    };

    const result = await validasiDataPkl(data);
    return res.status(200).json({
      message: "validasi data progress PKL berhasil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: err.message });
  }
};

const validasiDataSkripsiController = async (req, res) => {
  const { nim, semester, status, nilai } = req.body;

  // check null input
  if (!nim || !semester || !status || !nilai) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }
  try {
    const data = {
      nim,
      semester,
      status,
      nilai,
    };

    const result = await validasiDataSkripsi(data);
    return res.status(200).json({
      message: "validasi data progress PKL berhasil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: err.message });
  }
};

const rekapMahasiswaDosenController = async (req, res) => {
  const { nip } = req.params;
  const path = req.path;

  // check null input
  if (!nip) {
    return res.status(400).json({
      message: "NIP tidak boleh kosong",
    });
  }

  try {
    let result;
    if (path === `/dosen/rekap-pkl/${nip}`) {
      result = await rekapPklMahasiswa({ nip });
    } else if (path === `/dosen/rekap-skripsi/${nip}`) {
      result = await rekapSkripsiMahasiswa({ nip });
    } else if (path === `/dosen/rekap-status/${nip}`) {
      result = await rekapStatusMahasiswa({ nip });
    } else {
      return res.status(404).json({ message: "path tidak ditemukan" });
    }
    return res.status(200).json({
      message: "rekap mahasiswa berhasil diambil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: err.message });
  }
};

const daftarMahasiswaDosenController = async (req, res) => {
  const { nip } = req.params;
  const path = req.path;

  // check null input
  if (!nip) {
    return res.status(400).json({
      message: "NIP tidak boleh kosong",
    });
  }

  try {
    let result;
    if (path === `/dosen/daftar-pkl/${nip}`) {
      result = await daftarPklMahasiswa({ nip });
    } else if (path === `/dosen/daftar-skripsi/${nip}`) {
      result = await daftarSkripsiMahasiswa({ nip });
    } else if (path === `/dosen/daftar-status/${nip}`) {
      result = await daftarStatusMahasiswa({ nip });
    } else {
      return res.status(404).json({ message: "path tidak ditemukan" });
    }
    return res.status(200).json({
      message: "rekap status mahasiswa berhasil diambil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({ message: err.message });
  }
};

const searchMahasiswaDosenController = async (req, res) => {
  // Check if keyword is nim / nama
  const { nip, keyword } = req.query
  let type = "Nama"

  if (!nip) {
    return res.status(400).json({
      message: "NIP tidak boleh kosong",
    });
  }

  if (!isNaN(keyword)) {
    type = "NIM"
  }

  try {
    const result = await searchMahasiswa({ nip, keyword, type })
  
    return res.status(200).json({
      message: "search berhasil", 
      data: result
    })
  } catch (err) {
    return res.status(400).json({message: err.message})
  }
}

module.exports = {
  validasiDataIrsController,
  validasiDataKhsController,
  validasiDataPklController,
  validasiDataSkripsiController,
  rekapMahasiswaDosenController,
  daftarMahasiswaDosenController,
  searchMahasiswaDosenController
};
