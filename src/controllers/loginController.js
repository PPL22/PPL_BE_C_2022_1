const { login } = require("../services/login");

async function loginController(req, res) {
  const { username, password } = req.body;
  if (!username || !password)
    res.status(400).json({ message: "Masukan tidak boleh kosong" });

  try {
    const result = await login(username, password);
    return res.json(result);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
}

module.exports = { loginController };
