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
const Schedule = require('../models/Schedule');

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
// @route   GET api/users/me/role
// @desc    Get current user role (manager, scheduler, lectirer)
// @access  Private
router.get(
  '/me/role',
  // Middleware- Authorization function that gives acces to relevant users (manager)
  auth,
  async (req, res) => {
    // Try catch for a Promise
    try {
      // Pull the organization of manager to know what organization field for UserSchema
      let user = await User.findById(req.user.id).select(
        'manager scheduler lecturer'
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
// @desc    Change user detailes (User own details)
// @access  Private
router.put('/me/details', auth, async (req, res) => {
  // Validations of the form will take place here
  const errors = validationResult(req);
  // According to validation send errors if there are
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Pull from the req.body the fields to update user
  const { first_name, last_name } = req.body;

  // Build user object
  const userFields = {};
  if (first_name) userFields.first_name = first_name;
  if (last_name) userFields.last_name = last_name;

  try {
    //  Find the user by id
    let user = await User.findById(req.user.id);

    // User not found in DB
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Update in the array of courses in user Model the new course
    await User.update(
      { _id: req.user.id },
      {
        $set: userFields,
      }
    );

    res.status(200).send('User detailes has been changed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   PUT api/users/details
// @desc    Change password
// @access  Private
router.put('/me/pass', auth, async (req, res) => {
  // Validations of the form will take place here
  const errors = validationResult(req);
  // According to validation send errors if there are
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { oldPassword, newPassword } = req.body;

  try {
    // Promise to find if a user+passwoord exist in db
    const user = await User.findById(req.user.id);
    // User not found in DB
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Compare oldPassword to the one in DB
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    // Given password do not match to the one in db
    if (!isMatch) {
      return res.status(400).json({ msg: 'password_not_match_msg' });
    }
    // Initialize salt (Part of bcrypt protocol to Hash)
    const salt = await bcrypt.genSalt(10);

    // Insert the User instance the Hash password
    let hashNewPass = await bcrypt.hash(newPassword, salt);

    // Update in the array of courses in user Model the new course
    await User.update(
      { _id: req.user.id },
      {
        $set: { password: hashNewPass },
      }
    );

    res.status(200).send('password_changed_msg');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
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
      check('first_name', 'Please add first name').not().isEmpty(),
      check('last_name', 'Please add last name').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 }),
    ],
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
      color,
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
        color,
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
        date: -1,
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
      ).isLength({ min: 6 }),
    ],
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
          $set: { password: hashPass },
        }
      );

      res.status(200).send('password_has_been_changed');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   PUT api/users/manage
// @desc    Update user information
// @access  Private
router.put(
  '/manage/details/:id',
  [
    Authorization,
    [
      check('password', 'Password should contain at least 6 characters')
        .if(check('password').exists())
        .isLength({ min: 6 }),
    ],
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
      color,
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
          $set: userFields,
        }
      );

      res.status(200).send('user_details_changed');
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
        msg: 'Not allowed to delete user- not the same organization',
      });
    }

    // Promise- find the TimeTables and remove it from db
    let timeTables = await TimeTable.find({ user: req.params.id });

    for (let i = 0; i < timeTables.length; i++) {
      await Schedule.updateMany({
        $pull: {
          events: { timeTableId: timeTables[i]._id },
        },
        multi: true,
      });
      await TimeTable.findByIdAndDelete(timeTables[i]._id);
    }
    // // Promise- find the userin schedule and remove it from db
    // await Schedule.find({ organization: user.organization })
    //   .populate({
    //     path: 'events.timeTableId',
    //     model: TimeTable,
    //     select: 'user',
    //   })
    //   .updateMany(
    //     {
    //       // user: timeTableId.user,
    //     },
    //     { $pull: { events: { user: req.user.id } } }
    //   );

    // Promise- find the User and remove it from db
    await User.findByIdAndRemove(req.params.id);

    // // Promise- find the TimeTables and remove it from db
    // await TimeTable.deleteMany({ user: req.params.id });

    // await Schedule.populate({
    //   path: 'events.timeTableId',
    //   model: TimeTable,
    //   populate: {
    //     path: 'user',
    //     model: User,
    //     select: '_id',
    //   },
    // }).update({}, { $pull: { _id: req.params.id } });

    // Response- msg to indicate that Performance has been removed
    res.json({ msg: 'User has been removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/manage/block_submit/:id
// @desc    Blocks the user from submitting a schedule
// @access  Private
router.put('/manage/block_submit/:id', [Authorization], async (req, res) => {
  // Validations of the form will take place here
  const errors = validationResult(req);
  // According to validation send errors if there are
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
        $set: { can_submit: false },
      }
    );

    res.status(200).send('user_details_changed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/manage/block_submit/:id
// @desc    Allows the user to submit a schedule
// @access  Private
router.put('/manage/allow_submit/:id', [Authorization], async (req, res) => {
  // Validations of the form will take place here
  const errors = validationResult(req);
  // According to validation send errors if there are
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
        $set: { can_submit: true },
      }
    );

    res.status(200).send('user_details_changed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/manage/allow_submit_all/
// @desc    Allows the all users to submit a schedule
// @access  Private
router.put('/manage/allow_submit_all', [Authorization], async (req, res) => {
  // Validations of the form will take place here
  const errors = validationResult(req);
  // According to validation send errors if there are
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Pull the organization of manager to know what organization field for UserSchema
    let manager = await User.findById(req.user.id).select('organization');
    await User.updateMany(
      { organization: manager.organization },
      {
        $set: { can_submit: true },
      }
    );

    res.status(200).send('user_details_changed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/manage/block_submit_all/
// @desc    Allows the all users to submit a schedule
// @access  Private
router.put('/manage/block_submit_all', [Authorization], async (req, res) => {
  // Validations of the form will take place here
  const errors = validationResult(req);
  // According to validation send errors if there are
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Pull the organization of manager to know what organization field for UserSchema
    let manager = await User.findById(req.user.id).select('organization');
    await User.updateMany(
      { organization: manager.organization },
      {
        $set: { can_submit: false },
      }
    );

    res.status(200).send('user_details_changed');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/me/constraints
// @desc    Change user detailes (User own details)
// @access  Private
router.put('/me/constraints', auth, async (req, res) => {
  // Validations of the form will take place here
  const errors = validationResult(req);
  // According to validation send errors if there are
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Pull from the req.body the fields to update user
  const { new_constraints } = req.body;
  try {
    //  Find the user by id
    let user = await User.findById(req.user.id);

    // User not found in DB
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Update in the array of courses in user Model the new course
    await User.update(
      { _id: req.user.id },
      {
        $set: { constraints: new_constraints, submitted_schedule: true },
      }
    );

    res.status(200).send('new_constraints_added');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/users
// @desc    Register a user
// @access  Private for Users with the role of 'Manager'
router.post(
  '/manage/performance',
  [
    // Middleware- Authorization function that gives acces to relevant users (manager)
    Authorization,
  ],
  async (req, res) => {
    // Validations f the form will take place here
    const errors = validationResult(req);
    // According to validation send errors if there are
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull from the req.body the fields to create new instance
    const {
      performanceId,
      startTime,
      endTime,
      userId,
      schedId,
      eventId,
    } = req.body;

    // Try catch for a Promise
    try {
      // Pull the organization of manager to know what organization field for UserSchema
      let manager = await User.findById(req.user.id).select('organization');

      // Check if there another user that have been created with the same email
      let user = await User.findOne({ _id: userId });

      // If there is already a user with the email that entered
      if (!user) {
        return res.status(400).json('User not found');
      }

      //  The manager not authorize to perform action on this user
      if (user.organization !== manager.organization) {
        res.status(401).json({ msg: 'Not allowed to change user detailes' });
      }

      await User.updateOne(
        { _id: userId },
        {
          $push: {
            performances: {
              performance: performanceId,
              startTime,
              endTime,
              schedId,
              eventId,
            },
          },
        }
      );

      res.send('performance_successfully_saved_for_user');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/users
// @desc    Update performance in user array
// @access  Private for Users with the role of 'Manager'
router.put(
  '/manage/performance',
  [
    // Middleware- Authorization function that gives acces to relevant users (manager)
    Authorization,
  ],
  async (req, res) => {
    // Validations f the form will take place here
    const errors = validationResult(req);
    // According to validation send errors if there are
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull from the req.body the fields to create new instance
    // Pull from the req.body the fields to create new instance
    const { startTime, endTime, userId, eventId } = req.body;
    // Try catch for a Promise
    try {
      // Pull the organization of manager to know what organization field for UserSchema
      let manager = await User.findById(req.user.id).select('organization');

      // Check if there another user that have been created with the same email
      let user = await User.findOne({ _id: userId });

      // If there is already a user with the email that entered
      if (!user) {
        return res.status(400).json('User not found');
      }

      //  The manager not authorize to perform action on this user
      if (user.organization !== manager.organization) {
        res.status(401).json({ msg: 'Not allowed to deal with user' });
      }

      await User.updateOne(
        { _id: userId, eventId },
        {
          $set: {
            performances: {
              startTime,
              endTime,
            },
          },
        }
      );

      res.send('performance_successfully_deleted_from_user');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   DELETE api/users
// @desc    Delete performance drom user array
// @access  Private for Users with the role of 'Manager'
router.delete(
  '/manage/performance',
  [
    // Middleware- Authorization function that gives acces to relevant users (manager)
    Authorization,
  ],
  async (req, res) => {
    // Validations f the form will take place here
    const errors = validationResult(req);
    // According to validation send errors if there are
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull from the req.body the fields to create new instance
    const { userId, eventId } = req.body;

    // Try catch for a Promise
    try {
      // Pull the organization of manager to know what organization field for UserSchema
      let manager = await User.findById(req.user.id).select('organization');

      // Check if there another user that have been created with the same email
      let user = await User.findOne({ _id: userId });

      // If there is already a user with the email that entered
      if (!user) {
        return res.status(400).json('User not found');
      }

      //  The manager not authorize to perform action on this user
      if (user.organization !== manager.organization) {
        res.status(401).json({ msg: 'Not allowed to deal with user' });
      }

      await User.updateOne(
        { _id: userId },
        {
          $pull: {
            performances: {
              eventId,
            },
          },
        }
      );

      res.send('performance_successfully_deleted_from_user');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;

//delete api/users/manage/performance
//userId eventId

//post api/users/manage/performance
//start end userId schedId eventId

//update api/users/manage/performance
//start end userId schedId eventId
