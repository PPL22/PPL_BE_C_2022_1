bcrypt = require('bcrypt')

async function hashPassword(text) {
    const result = await bcrypt.hash(text, 10);
    return result
}

async function signup(pass) {
    try {
      let hashed;
      await hashPassword(pass).then(res => hashed = res)
      return(hashed) 
    } catch (err) {
      console.error(err);
    }
}

console.log(signup('testing')) 
