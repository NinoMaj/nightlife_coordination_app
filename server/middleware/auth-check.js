const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

/**
 * The Auth Checker middleware function
 */
module.exports = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using key-phrase
  return jwt.verify(token, process.env.JWT_SECRECT, (err, decoded) => {
    // the 401 code is for authorized status
    if (err) { return res.status(401).end(); }
  
  const userId = decoded.sub;

  // check if a user exists
  return User.findById(userId, (userErr, user) => {
    if (userErr || !user) {
      return res.status(401).end();
    }
    console.log('user in auth-check middleware:', user);
    return next(user);
  })
  })
}