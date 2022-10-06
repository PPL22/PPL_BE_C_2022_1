const { dosen } = require("../data/dosen");

const getKodeWaliRandom = () => {
  const length = dosen.length;
  const random = Math.floor(Math.random() * length);
  return dosen[random].nip;
};

module.exports = {
  getKodeWaliRandom,
};
