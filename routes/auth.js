const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Promise to find if a user+passwoord exist in db
    const user = await User.findById(req.user.id).select('-password');
    // Response with user information without password
    res.json(user);
  } catch (err) {
    console.error(err.message);
    // Response of error 500
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Auth user & get token
// @access  Public
router.post(
  '/',
  [
    // Validations intialize for email & password
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password').exists()
  ],
  async (req, res) => {
    // Validations will take place here
    const errors = validationResult(req);
    // Wheter we got errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Destruct the user name(email) and password from request body
    const { email, password } = req.body;

    // Try catch for a Promise
    try {
      // Find a user in db by email
      let user = await User.findOne({ email });
      // User does not exist
      if (!user) {
        return res.status(400).json({ msg: 'Ivalid Credentials' });
      }
      // User exists in db- now we will compare given password to the one stored
      // in our db, the compare method hash the given to compare.
      const isMatch = await bcrypt.compare(password, user.password);
      // Given password do not match to the one in db
      if (!isMatch) {
        return res.status(400).json({ msg: 'Ivalid Credentials' });
      }
      // Construct payload with the id in db
      const payload = {
        user: {
          id: user.id
        }
      };
      // Token create and Validation
      // Sign the over the user id, use the "jwtSecret" in config
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 36000
        },
        (err, token) => {
          // If error accured during Token Procedure throw error
          if (err) throw err;
          // Response of the token to user who will store it localy
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      // Response error 500
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
