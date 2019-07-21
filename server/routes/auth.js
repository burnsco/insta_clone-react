const bcrypt = require('bcrypt')

async function hashPassword(password) {
  const salt = await bcrypt.genSaltSync(12)
  const hashed = await bcrypt.hashSync(password, salt)
  return hashed
}

async function checkPassword(pass, hashedPass) {
  const match = await bcrypt.compareSync(pass, hashedPass)
  if (match) {
    // correct
  } else {
    // incorrect
  }
}

checkPassword('asdf12342', password)
