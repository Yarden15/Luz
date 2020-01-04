const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Authorization = require('../middleware/authorization');
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Private for Users with the role of 'Manager'
router.post(
  '/',
  [
    Authorization,
    [
      check('first_name', 'Please add first name')
        .not()
        .isEmpty(),
      check('last_name', 'Please add last name')
        .not()
        .isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    // Check for validation errors in the form
    const errors = validationResult(req);
    // According to validation send errors if there are
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull from the req.body the fields to create new user
    const {
      id_number,
      first_name,
      last_name,
      email,
      password,
      role
    } = req.body;

    try {
      // Check if there another user that have been created with the same email
      let user = await User.findOne({ email: email });

      // If there is already a user with the email that entered
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create an instance of User according to the fields in body
      user = new User({
        id_number,
        first_name,
        last_name,
        email,
        password,
        role
      });

      // Initialize salt (Part of bcrypt protocol to Hash)
      const salt = await bcrypt.genSalt(10);
      // Insert the User instance the Hash password
      user.password = await bcrypt.hash(password, salt);
      // Save user to Data Base
      await user.save();
      // Response
      res.json({ msg: 'User added to Data Base' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   GET api/users
// @desc    Get all users in Data Base
// @access  Private for Users with the role of 'Manager'
router.get('/', Authorization, async (req, res) => {
  try {
    const users = await User.find({}).sort({ date: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
