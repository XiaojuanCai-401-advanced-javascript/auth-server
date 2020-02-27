'use strict';

const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
  username: {type: String, required: true},
  // email: {type: String},
  password: {type: String, required: true},
  // role: {type: String, required: true, default: 'admin', enum: ['admin', 'user']},
});


module.exports = mongoose.model('users', userSchema);
