'use strict';

const base64 = require('base-64');
const users = require('../models/users');

function basicAuth (req, res, next) {
  const authorization = req.headers.authorization;
  // If we don't have an authorization header
  if (!authorization){
    next('Invalid Login');
    return;
  }

  const basic = authorization.split(' ').pop();
  const decode = base64.decode(basic);
  const [username, password] = decode.split(':');
  
  users.authenticateBasic(username, password)
    .then (() => {
      console.log(`${username} logged in.`);
      next();
    })
    .catch (err => next(err.message));
}

module.exports = basicAuth;