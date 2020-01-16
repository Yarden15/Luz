const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

module.exports = async function(req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    // First according to authentication (the middleware func) and the token
    // data about user, check for the user role. Only Manager can add users
    let user = await User.findById(req.user.id).select('role');

    // The user isnt a 'Admin'
    if (user.role !== 'Admin') {
      return res.status(401).json({ msg: 'Not Authorize to add profile' });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
