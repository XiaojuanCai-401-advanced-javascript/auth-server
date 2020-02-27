'use strict';

const mongoose = require ('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');

const SECRET = process.env.SECRET || 'changeme';

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  // email: {type: String},
  password: {type: String, required: true},
  // role: {type: String, required: true, default: 'admin', enum: ['admin', 'user']},
});

userSchema.pre('save', async function() {
  if (this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 5);
  }
})

userSchema.methods.generateToken = function () {
  const tokenData = {
    id: this._id,
    username: this.username,
  }
  return jwt.sign(tokenData, SECRET);
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne({username: username});
  console.log(user);
  return user && user.comparePassword(password);
}




module.exports = mongoose.model('users', userSchema);
