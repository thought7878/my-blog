const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false }
  },
  { timestamps: true }
)

UserSchema.pre('save', function(next) {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(this.password, salt)
  this.password = hash
  next()
})

UserSchema.methods = {
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password)
  }
}

module.exports = mongoose.model('User', UserSchema)
