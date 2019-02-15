const Post = require('../models/post')

module.exports.new = async (req, res) => {
  try {
    const p = new Post(req.body)
    await p.save()
    res.json(p)
  } catch (error) {
    res.status(500).json({ msg: '保存错误' })
  }
}

module.exports.all = async (req, res) => {
  try {
    const posts = await Post.find()
    res.json(posts)
  } catch (error) {
    res.status(500).json({ msg: '服务器出错啦' })
  }
}
