'use strict';

// Third-party resources
const bcrypt = require ('bcrypt');
const jwt = require('jsonwebtoken');

const express = require ('express');
const User = require ('../models/users');
const user = new User();
const basicAuth = require ('../middleware/basic-auth');


// Prepare the Experss app
const router = express.Router();

// App-level middleware
router.use(express.json());

// GET to /users will list all users
router.get('/users', listAll);

// POST to /signup to sign up a user
// payload looks like uasername:stinrg, email: string, password: string
router.post('/signup', addUser)

// POST to /signin to sign in a user
// request looks like HTTP -a username:password :PROT/signin
router.post('/signin', basicAuth, signInUser);

/*
// 
router.get('/protected', basicAuth, (req, res) => {
  res.status(200).json({message: "congratulations"});
})
*/

function listAll(req, res){
  user.read()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => console.log(err.message));
}

function addUser(req, res){
  // assume that req.body has all the right peices

  const record = req.body;
  // Check whether username exists
  user.schema.find({username: record.username})
  .then(async result => {
    if (result.length > 0){
      return Promise.reject(new Error('Username already exists.'));
    } else {
      const hashedPassword = await bcrypt.hash(record.password, 5);
      record.password = hashedPassword;
      user.create(record)
        .then(result => {
          res.status(201).json(result);
        })
        .catch(err => res.status(500).json(err.message));
    }
  })
  .catch(err => res.status(403).json(err.message));
}

function signInUser(err, req, res){
  if (err) {
    res.status(500).json(err.message);
  } else {
    res.status(200).json('User signed in.');
  }
}

module.exports = router;
