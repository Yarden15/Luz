const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
// Midleware
const Authorization = require('../middleware/authorization');
const auth = require('../middleware/auth');
// Models
const User = require('../models/User');
const TimeTable = require('../models/TimeTable');

// @route   GET api/users/details
// @desc    Get current User detailes
// @access  Private
router.get(
  '/me',
  // Middleware- Authorization function that gives acces to relevant users (manager)
  auth,
  async (req, res) => {
    // Try catch for a Promise
    try {
      // Pull the organization of manager to know what organization field for UserSchema
      let user = await User.findById(req.user.id).select(
        '-password -performances -color'
      );

      // User no exist- offcourse it in case of direct req to backend
      if (!user) return res.status(404).json({ msg: 'User not found' });

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   PUT api/users/details
// @desc    Change password
// @access  Private
router.put(
  '/me',
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
      // Promise to find if a user+passwoord exist in db
      const user = await User.findById(req.user.id).select('-password');
      // User not found in DB
      if (!user) return res.status(404).json({ msg: 'User not found' });

      // Initialize salt (Part of bcrypt protocol to Hash)
      const salt = await bcrypt.genSalt(10);
      // Insert the User instance the Hash password
      let hashPass = await bcrypt.hash(password, salt);

      // Update in the array of courses in user Model the new course
      await User.update(
        { _id: req.user.id },
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
// @route   POST api/users
// @desc    Register a user
// @access  Private for Users with the role of 'Manager'
router.post(
  '/manage',
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
      manager,
      scheduler,
      lecturer,
      color
    } = req.body;

    // Try catch for a Promise
    try {
      // Pull the organization of manager to know what organization field for UserSchema
      let man = await User.findById(req.user.id).select('organization');

      // Check if there another user that have been created with the same email
      let user = await User.findOne({ email: email });

      // If there is already a user with the email that entered
      if (user) {
        return res.status(400).json('user_already_exists');
      }

      // Create an instance of User according to the fields in body
      user = new User({
        id_number,
        organization: man.organization,
        first_name,
        last_name,
        email,
        password,
        manager,
        scheduler,
        lecturer,
        color
      });

      // Initialize salt (Part of bcrypt protocol to Hash)
      const salt = await bcrypt.genSalt(10);
      // Insert the User instance the Hash password
      user.password = await bcrypt.hash(password, salt);
      // Save user to Data Base
      await user.save();
      // Response msg
      return res.json('new_user_added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   GET api/users/manage
// @desc    Get all users in Data Base
// @access  Private for Users with the role of 'Manager'
router.get(
  '/manage',
  // Middleware- Authorization function that gives acces to relevant users (manager)
  Authorization,
  async (req, res) => {
    // Try catch for a Promise
    try {
      // Pull the organization of manager to know what organization field for UserSchema
      let man = await User.findById(req.user.id).select('organization');

      // Get all users in db
      const users = await User.find({ organization: man.organization }).sort({
        date: -1
      });
      res.json(users);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/users/details
// @desc    Initial or Update password
// @access  Private
router.put(
  '/manage/pass/:id',
  [
    Authorization,
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
      //   Find the user by id
      let user = await User.findById(req.params.id);
      // User not found in DB
      if (!user) return res.status(404).json({ msg: 'User not found' });

      // Pull the organization of manager to know what organization field for UserSchema
      let manager = await User.findById(req.user.id).select('organization');

      //  The manager not authorize to change the specific user requested
      if (user.organization !== manager.organization) {
        res.status(401).json({ msg: 'Not allowed to change user detailes' });
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
// @desc    Update user information (Only password for now)
// @access  Private
router.put(
  '/manage/details/:id',
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
      manager,
      scheduler,
      lecturer,
      color
    } = req.body;

    // Build user object
    const userFields = {};
    if (id_number) userFields.id_number = id_number;
    if (first_name) userFields.first_name = first_name;
    if (last_name) userFields.last_name = last_name;
    if (manager) userFields.manager = manager;
    if (scheduler) userFields.scheduler = scheduler;
    if (lecturer) userFields.lecturer = lecturer;
    if (color) userFields.color = color;

    try {
      //  Find the user by id
      let user = await User.findById(req.params.id);

      // User not found in DB
      if (!user) return res.status(404).json({ msg: 'User not found' });

      // Pull the organization of manager to know what organization field for UserSchema
      let manager = await User.findById(req.user.id).select('organization');

      //  The manager not authorize to change the specific user requested
      if (user.organization !== manager.organization) {
        res.status(401).json({ msg: 'Not allowed to change user detailes' });
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
// @route   DELETE api/users/manage/:id
// @desc    Delete user from DB and all what relevent
// @access  Private- Manager only
router.delete('/manage/:id', Authorization, async (req, res) => {
  try {
    //   Find the user by id
    let user = await User.findById(req.params.id);
    // User not found in DB
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Pull the organization of manager to know what organization field for UserSchema
    let manager = await User.findById(req.user.id).select('organization');

    //  The manager not authorize to change the specific user requested
    if (manager.organization !== user.organization) {
      res.status(401).json({
        msg: 'Not allowed to delete user- not the same organization'
      });
    }

    // Promise- find the User and remove it from db
    await User.findByIdAndRemove(req.params.id);

    // Promise- find the TimeTables and remove it from db
    await TimeTable.deleteMany({ user: req.params.id });

    // Response- msg to indicate that Performance has been removed
    res.json({ msg: 'User has been removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
