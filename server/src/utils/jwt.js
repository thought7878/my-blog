const { SECRET } = require('../config')
const jwt = require('jsonwebtoken')

const generateToken = user => {
  return jwt.sign(user, SECRET, {
    expiresIn: 600 // 单位是秒
  })
}

module.exports = {
  generateToken
}
