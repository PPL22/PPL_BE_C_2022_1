const {login} = require('../services/login')

async function loginController(req, res) {
    const {username, password} = req.body
    try {
        const result = await login(username, password)
        res.json(result)
    } catch(err) {
        res.status(403).json({message: err.message})
    }
}

module.exports = {loginController}