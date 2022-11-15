const {
  searchMahasiswa,
  getDataAkademikMhs,
  getCountStatusDataAkademikMhs,
} = require("../services/dataMahasiswaServices");
const {
  validasiDataIrs,
  validasiDataKhs,
  validasiDataPkl,
  validasiDataSkripsi,
  getStatusValidasiIRS,
  getStatusValidasiKHS,
  getStatusValidasiPKL,
  getStatusValidasiSkripsi,
} = require("../services/dosenServices");

const {
  rekapStatusMahasiswa,
  daftarStatusMahasiswa,
  rekapPklMahasiswa,
  daftarPklMahasiswa,
  rekapSkripsiMahasiswa,
  daftarSkripsiMahasiswa,
} = require("../services/rekapServices");
const validateSemester = require("../utils/validateSemester");

// Dashboard
const getDashboardDosenController = async (req, res) => {
  const nip = req.id;

  // !! Udah ada checking di JWT (?)
  // if (!nip) {
  //   return res.status(400).json({
  //     message: "ID kosong",
  //   });
  // }

  try {
    const data = { nip };
    const result = await getCountStatusDataAkademikMhs(data);

    return res.status(200).json({
      message: "Data dashboard berhasil diretrieve",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// Get status validasi
const getStatusValidasiController = async (req, res) => {
  const nip = req.id;
  let {page, qty, keyword, sortBy, order} = req.query
  const path = req.path;

  // Insert default value
  if (!page) page = 1;
  if (!qty) qty = 10;
  if (!sortBy) sortBy = "statusValidasi"
  if (!order) order = "asc" 

  // Check params
  if (isNaN(page) || isNaN(qty) || !["asc", "desc"].includes(order)) return res.status(400).json({message: "Bad request. Params not valid"})
  page = parseInt(page);
  qty = parseInt(qty)

  // !! Udah ada checking di JWT (?)
  // if (!nip) {
  //   return res.status(400).json({
  //     message: "ID kosong",
  //   });
  // }

  try {
    const data = { nip, page, qty, keyword, sortBy, order };
    let result = null;
    switch (path) {
      case "/dosen/status-validasi/irs":
        result = await getStatusValidasiIRS(data);
        break;
      case "/dosen/status-validasi/khs":
        result = await getStatusValidasiKHS(data);
        break;
      case "/dosen/status-validasi/pkl":
        result = await getStatusValidasiPKL(data);
        break;
      case "/dosen/status-validasi/skripsi":
        result = await getStatusValidasiSkripsi(data);
        break;
    }

    if (!result)
      return res.status(400).json({
        message: "Failed to retrieve list status validasi",
      });

    return res.status(200).json({
      data: result,
      message: "Daftar status validasi berhasil diambil",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};

// Validasi data
const validasiDataIrsController = async (req, res) => {
  const { nim, semester, status, jumlahSks, fileName } = req.body;
  const nip = req.id;

  // check null input
  if (!nim || !semester || !status || !jumlahSks || !fileName) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  // Check semester
  if (!validateSemester(nim, semester)) {
    return res.status(400).json({
      message: "Semester tidak valid",
    });
  }

  // Check status
  const statusIRS = ["Aktif", "Cuti"];
  if (!statusIRS.includes(status)) {
    return res.status(400).json({
      message: "Status IRS tidak valid",
    });
  }

  // Check jumlah sks
  if (jumlahSks < 0 || jumlahSks > 24) {
    return res.status(400).json({
      message: "Jumlah SKS tidak valid",
    });
  }

  try {
    const data = {
      nip,
      nim,
      semester,
      status,
      jumlahSks,
      fileName,
    };

    const result = await validasiDataIrs(data);
    return res.status(200).json({
      message: "validasi data IRS berhasil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};

const validasiDataKhsController = async (req, res) => {
  const {
    nim,
    semester,
    status,
    jumlahSksSemester,
    ips,
    jumlahSksKumulatif,
    ipk,
    fileName,
  } = req.body;
  const nip = req.id;

  // check null input
  if (
    !nim ||
    !semester ||
    !status ||
    !jumlahSksSemester ||
    !ips ||
    !jumlahSksKumulatif ||
    !ipk ||
    !fileName
  ) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  // TODO-VALIDATE: Recheck validate semester in KHS (validasi dosen)
  // Check semester
  if (!validateSemester(nim, semester)) {
    return res.status(400).json({
      message: "Semester tidak valid",
    });
  }

  // Check jumlah sks
  if (jumlahSksSemester < 0 || jumlahSksSemester > 24) {
    return res.status(400).json({
      message: "Jumlah SKS tidak valid",
    });
  }

  // Check IPS
  if (parseFloat(ips) < 0 || parseFloat(ips) > 4) {
    return res.status(400).json({
      message: "IPS tidak valid",
    });
  }

  // TODO-VALIDATE: validasi jumlah sks kumulatif

  // Check IPK
  if (parseFloat(ipk) < 0 || parseFloat(ipk) > 4) {
    return res.status(400).json({
      message: "IPK tidak valid",
    });
  }

  try {
    const data = {
      nip,
      nim,
      semester,
      status,
      jumlahSksSemester,
      ips,
      jumlahSksKumulatif,
      ipk,
      fileName,
    };

    const result = await validasiDataKhs(data);
    return res.status(200).json({
      message: "validasi data KHS berhasil ",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};

const validasiDataPklController = async (req, res) => {
  const { nim, semester, nilai, fileName } = req.body;
  const nip = req.id;

  // check null input
  if (!nim || !semester || !nilai || !fileName) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  // Check semester
  if (!validateSemester(nim, semester)) {
    return res.status(400).json({
      message: "Semester tidak valid",
    });
  }

  // TODO-VALIDATE: validasi nilai PKL

  try {
    const data = {
      nip,
      nim,
      semester,
      nilai,
      fileName,
    };

    const result = await validasiDataPkl(data);
    return res.status(200).json({
      message: "validasi data progress PKL berhasil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};

const validasiDataSkripsiController = async (req, res) => {
  const { nim, semester, nilai, tanggalLulusSidang, lamaStudi, fileName } =
    req.body;

  const nip = req.id;

  // check null input
  if (
    !nim ||
    !semester ||
    !nilai ||
    !tanggalLulusSidang ||
    !lamaStudi ||
    !fileName
  ) {
    return res.status(400).json({
      message: "Data tidak boleh kosong",
    });
  }

  // Check semester
  if (!validateSemester(nim, semester)) {
    return res.status(400).json({
      message: "Semester tidak valid",
    });
  }

  // TODO-VALIDATE: Check nilai skripsi, lama studi, dan tanggalLulusSidang

  try {
    const data = {
      nip,
      nim,
      semester,
      nilai,
      tanggalLulusSidang,
      lamaStudi,
      fileName,
    };

    const result = await validasiDataSkripsi(data);
    return res.status(200).json({
      message: "validasi data progress Skripsi berhasil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};

const rekapMahasiswaDosenController = async (req, res) => {
  const nip = req.id;
  const path = req.path;

  // !! Udah ada checking di JWT (?)
  // // check null input
  // if (!nip) {
  //   return res.status(400).json({
  //     message: "NIP tidak boleh kosong",
  //   });
  // }

  try {
    let result;
    if (path === `/dosen/rekap/pkl`) {
      result = await rekapPklMahasiswa({
        nip,
      });
    } else if (path === `/dosen/rekap/skripsi`) {
      result = await rekapSkripsiMahasiswa({
        nip,
      });
    } else if (path === `/dosen/rekap/status`) {
      result = await rekapStatusMahasiswa({
        nip,
      });
    } else {
      return res.status(404).json({
        message: "path tidak ditemukan",
      });
    }
    return res.status(200).json({
      message: "rekap mahasiswa berhasil diambil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};

const daftarMahasiswaDosenController = async (req, res) => {
  const nip = req.id;
  const path = req.path;
  let {page, qty} = req.query;
  
  if (!page) page = 1;
  if (!qty) qty = 10;
  
  // Check params
  if (isNaN(page) || isNaN(qty)) return res.status(400).json({message: "Bad request. Params not valid"})
  page = parseInt(page);
  qty = parseInt(qty)

  // !! Udah ada checking di JWT (?)
  // // check null input
  // if (!nip) {
  //   return res.status(400).json({
  //     message: "NIP tidak boleh kosong",
  //   });
  // }

  try {
    const data = {nip, page, qty}
    let result;
    if (path === `/dosen/daftar-pkl`) {
      result = await daftarPklMahasiswa(data);
    } else if (path === `/dosen/daftar-skripsi`) {
      result = await daftarSkripsiMahasiswa(data);
    } else if (path === `/dosen/daftar-status`) {
      result = await daftarStatusMahasiswa(data);
    } else {
      return res.status(404).json({
        message: "path tidak ditemukan",
      });
    }
    return res.status(200).json({
      message: "rekap status mahasiswa berhasil diambil",
      data: result,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(400).json({
      message: err.message,
    });
  }
};

const searchMahasiswaDosenController = async (req, res) => {
  // Check if keyword is nim / nama
  const { keyword } = req.query;
  const nip = req.id;

  if (!nip) {
    return res.status(400).json({
      message: "NIP tidak boleh kosong",
    });
  }

  try {
    const result = await searchMahasiswa({
      nip,
      keyword,
    });

    return res.status(200).json({
      message: "search berhasil",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

// <R> Harus cek nip?
const getDataAkademikMhsDosenController = async (req, res) => {
  const { nim } = req.params;
  const nip = req.id;
  try {
    const result = await getDataAkademikMhs({
      nim,
      nip,
    });
    if (result.nipDoswal != nip) {
      return res.status(403).json({
        message: "bukan dosen wali, data mahasiswa tidak dapat diambil",
      });
    }

    return res.status(200).json({
      message: "data mahasiswa berhasil diambil",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  getDashboardDosenController,
  getStatusValidasiController,

  validasiDataIrsController,
  validasiDataKhsController,
  validasiDataPklController,
  validasiDataSkripsiController,

  rekapMahasiswaDosenController,
  daftarMahasiswaDosenController,

  searchMahasiswaDosenController,
  getDataAkademikMhsDosenController,
};
