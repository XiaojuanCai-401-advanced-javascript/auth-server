'use strict';

const mongoose = require ('mongoose');
const userSchema = require('./user-schema');

const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');


class User {
  constructor(){
    this.schema = userSchema;
  }

  create(record){
    const newRecord = new this.schema(record);
    return newRecord.save();
  }

  read(id){
    if (id) {
      return this.schema.findById(id)
    } 
    return this.schema.find({})
  }

  update(id, record){
    return this.schema.findByIdAndUpdate(id, record,{new:true});
  }

  delete(id){
    return userSchema.findByIdAndDelete(id);
  }

  async authenticateBasic(username, password) {
    const user = this.schema.find(u => u.username === username);
    if (!user) {
      // if user does not exist
      return Promise.reject(new Error(`User ${username} deos not exist.`));
    } else {
      const valid = await bcrypt.compare(password, user.password);
      return valid? user : Promise.reject(new Error('Wrong password.'))
    }
  }
}

module.exports = User;

/*

class Users {
  constructor (db) {
    this.db = [];
    this.SECRET = 'server secret'
  }

  // Method to list all users
  list () {
    return this.db;
  }

  generateToken (record){
    const {username, email} = record;
    jwt.sign({username, email}, this.SECRET)
  }
  // Use async for save because we're using bcrypt asynchronously
  // This means that this function must return a value or a promise rejection
  async save (record) {
    const {username, email, password} = record;
    console.log(record);
    if (this.db.find(u => u.username === username)){
      // if the username has already taken, reject the promise
      return Promise.reject(new Error(`username already taken: ${username}`));
    } else {
      // otherwise, store user info into db
      const hashedPassword = await bcrypt.hash(password,5);
      this.db.push({username, email, password: hashedPassword});
      return record;
    }
  }

  async authenticateBasic(username, password) {
    const user = this.db.find(u => u.username === username);
    if (!user) {
      // if user does not exist
      return Promise.reject(new Error(`User ${username} deos not exist.`));
    } else {
      const valid = await bcrypt.compare(password, user.password);
      return valid? user : Promise.reject(new Error('Wrong password.'))
    }
  }
}

module.exports = new Users();
*/
