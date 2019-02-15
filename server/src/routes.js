const User = require('./controllers/user')
const { requireAuth } = require('./utils/jwt')
const Post = require('./controllers/post')

module.exports = app => {
  app.post('/user/signup', User.signup)
  app.post('/user/login', User.login)
  app.post('/post', requireAuth, Post.new)
  app.get('/posts', Post.all)
}
