const base64 = require('base-64');
const User = require('../models/user-schema');

async function basicAuth (req, res, next) {
  const authorization = req.headers.authorization
  if (!authorization){
    next(new Error('No authorization header'))
  } else {

  const basic = authorization.split(' ').pop();
  const decode = base64.decode(basic);
  const [username, password] = decode.split(':');
  console.log(username, password);

  const valid = await User.authenticateBasic(username, password);
  if (valid) {
    next();
  }
  else 
    next('username or password are wrong');
  }

}

module.exports = basicAuth;
