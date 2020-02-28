const User = require('../models/user-schema')

async function bearerAuth (req, res, next) {
  try {
    const authorization = req.headers.authorization
    if (!authorization){
      next('No authorization header')
    } else {
      const token = authorization.split(' ').pop();
      const user = await User.authenticateBearer(token);
      if (user === null) next('Wrong token.')
      req.user = user;
      next();
    }
  } catch (err) {next(err.message);}
}

module.exports = bearerAuth;