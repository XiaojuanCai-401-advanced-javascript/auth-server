'use strict';

// Third-party resources
const express = require ('express');
const authRouter = express.Router();
authRouter.use(express.json());

const User = require('../models/user-schema');
const errorHandler = require('../middleware/error-handler');
const basicAuth = require('../middleware/basic-auth');
const bearerAuth = require('../middleware/bearer-auth.js');

authRouter.use(errorHandler);

// proof of life 
authRouter.get('/', (req, res) => {
  res.status(200).send('it lives.');
})

// sign up a user

authRouter.post('/signup', (req,res,next) => {
  const user = new User(req.body);
  user.save()
    .then (result => res.status(201).json({token:user.generateToken()}))
    .catch(err => res.status(403).json('user exists.'));
})

// sign in

authRouter.post('/signin', bearerAuth, (req, res, next) => {
  res.status(200).json(`${req.user.username} signed in with token.`)
})

authRouter.post('/request_token', basicAuth, (req, res, next) => {
    res.status(200).json({token: req.token});
})

authRouter.get('/users', async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
});

module.exports = authRouter;
