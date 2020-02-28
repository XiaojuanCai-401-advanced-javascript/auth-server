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
    timestamp: Date.now()
  }
  return jwt.sign(tokenData, SECRET);
}

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.statics.authenticateBasic = async function (username, password) {
  const user = await this.findOne({username: username});
  console.log(user)
  if (user === null || !user.comparePassword(password)) throw new Error('username or password is wrong.');
  console.log(user);
  return user;
}

userSchema.statics.authenticateBearer = async function (token) {
  const tokenData = jwt.verify(token, SECRET);
  const now = Date.now();
  console.log(now, tokenData.timestamp);
  if (now - tokenData.timestamp > 3600000) throw new Error('Token expired.'); // token expires after 1 hour
  const user = await this.findOne({username: tokenData.username});
  return user;
}


module.exports = mongoose.model('users', userSchema);
