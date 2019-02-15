const { SECRET } = require('../config')
const jwt = require('jsonwebtoken')

const generateToken = user => {
  return jwt.sign(user, SECRET, {
    expiresIn: 600 // 单位是秒
  })
}

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization
  if (token) {
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ msg: '认证码过期，请重新登录' })
        } else {
          return res.status(401).json({ msg: '认证失败' })
        }
      } else {
        if (decoded.admin === true) {
          next()
        } else {
          return res.status(401).json({ msg: '无权访问' })
        }
      }
    })
  } else {
    return res.status(403).json({ msg: '请提供认证码' })
  }
}

module.exports = {
  generateToken,
  requireAuth
}
