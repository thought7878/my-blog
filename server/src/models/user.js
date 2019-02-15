const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
)

UserSchema.pre('save', function(next) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})

module.exports = mongoose.model('User', UserSchema)
