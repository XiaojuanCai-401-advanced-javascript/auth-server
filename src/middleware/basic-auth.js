const base64 = require('base-64');
const User = require('../models/user-schema');

async function basicAuth (req, res, next) {
  try {
    const authorization = req.headers.authorization
    if (!authorization){
      next(new Error('No authorization header'))
    } else {

    const basic = authorization.split(' ').pop();
    const decode = base64.decode(basic);
    const [username, password] = decode.split(':');

    const user = await User.authenticateBasic(username, password);
    req.token = user.generateToken()
    next();
    } 
  } catch (err) {next(err.message);}
}

module.exports = basicAuth;
