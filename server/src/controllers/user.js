const User = require('../models/user')

module.exports.signup = async (req, res) => {
  const u = new User(req.body)
  try {
    await u.save()
    res.json({ msg: 'saved' })
  } catch (error) {
    res.status(406).json({ msg: '用户名重复' })
  }
}
