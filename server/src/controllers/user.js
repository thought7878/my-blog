const User = require('../models/user')
const { generateToken } = require('../utils/jwt')

module.exports.signup = async (req, res) => {
  const u = new User(req.body)
  try {
    await u.save()
    res.json({ msg: 'saved' })
  } catch (error) {
    res.status(406).json({ msg: '用户名重复' })
  }
}

module.exports.login = async (req, res) => {
  const { username, password } = req.body
  try {
    const u = await User.findOne({ username })
    if (!u.comparePassword(password)) {
      throw Error('密码错误')
    }
    res.json({ token: generateToken({ username: u.username }) })
  } catch (error) {
    res.status(406).json({ msg: '用户名密码错误' })
  }
}
