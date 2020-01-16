const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const Authorization = require('../middleware/authorization');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   POST api/users
// @desc    Register a user
// @access  Private for Users with the role of 'Manager'
router.post(
  '/',
  [
    // Middleware- Authorization function that gives acces to relevant users (manager)
    Authorization,
    // Validations intialize for all form feilds
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
    // Validations f the form will take place here
    const errors = validationResult(req);
    // According to validation send errors if there are
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull from the req.body the fields to create new user later on (instance)
    const {
      id_number,
      first_name,
      last_name,
      email,
      password,
      role
    } = req.body;

    // Try catch for a Promise
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
      // Response msg
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
router.get(
  '/',
  // Middleware- Authorization function that gives acces to relevant users (manager)
  Authorization,
  async (req, res) => {
    // Try catch for a Promise
    try {
      // Get all users in db
      const users = await User.find({}).sort({ date: -1 });
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   GET api/users/:id
// @desc    Get current User detailes
// @access  Private
router.get(
  '/',
  // Middleware- Authorization function that gives acces to relevant users (manager)
  auth,
  async (req, res) => {
    // Try catch for a Promise
    try {
      // Get all users in db
      const users = await User.find({}).sort({ date: -1 });
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   PUT api/users/:id
// @desc    Update password
// @access  Private
router.put(
  '/:id',
  [
    auth,
    [
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    // Validations of the form will take place here
    const errors = validationResult(req);
    // According to validation send errors if there are
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { password } = req.body;

    try {
      let user = await User.findById(req.params.id);

      if (!user) return res.status(404).json({ msg: 'User not found' });

      // Make sure user try to change his own password
      if (user._id.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      // Initialize salt (Part of bcrypt protocol to Hash)
      const salt = await bcrypt.genSalt(10);
      // Insert the User instance the Hash password
      let hashPass = await bcrypt.hash(password, salt);

      // Update in the array of courses in user Model the new course
      await User.update(
        { _id: req.params.id },
        {
          $set: { password: hashPass }
        }
      );

      res.status(200).send('Password has been changed');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/users/manage
// @desc    Update password
// @access  Private
router.put(
  '/manage/:id',
  [
    Authorization,
    [
      check('password', 'Password should contain at least 6 characters')
        .if(check('password').exists())
        .isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    // Validations of the form will take place here
    const errors = validationResult(req);
    // According to validation send errors if there are
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull from the req.body the fields to update user
    const {
      id_number,
      first_name,
      last_name,
      email,
      password,
      role
    } = req.body;

    // Build user object
    const userFields = {};
    if (id_number) userFields.id_number = id_number;
    if (first_name) userFields.first_name = first_name;
    if (last_name) userFields.last_name = last_name;
    if (email) userFields.email = email;
    // Password will insert later if exist
    if (role) userFields.role = role;

    try {
      let user = await User.findById(req.params.id);

      if (!user) return res.status(404).json({ msg: 'User not found' });

      // Id there is intend to change password
      if (password) {
        // Initialize salt (Part of bcrypt protocol to Hash)
        const salt = await bcrypt.genSalt(10);
        // Insert the User instance the Hash password
        let hashPass = await bcrypt.hash(password, salt);
        userFields.password = hashPass;
      }

      // Update in the array of courses in user Model the new course
      await User.update(
        { _id: req.params.id },
        {
          $set: userFields
        }
      );

      res.status(200).send('User details has been changed');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
