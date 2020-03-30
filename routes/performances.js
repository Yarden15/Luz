const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authorization = require('../middleware/authorization');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Performance = require('../models/Performance');

// @route   GET api/performances
// @desc    Get all performances
// @access  Private- Managers
router.get('/manage', authorization, async (req, res) => {
  try {
    // Pull the organization of manager to know what organization field for UserSchema
    let user = await User.findById(req.user.id).select('organization');
    // Get all the preformances in db
    const performances = await Performance.find({
      organization: user.organization
    });
    // Response- performances of all users
    res.json(performances);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   GET api/performances/:id
// @desc    Get all performances of a specific user
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // @todo - select from the id of performances the info of its
    // Get all the attached preformances to current User by it ID gotten
    // from the authentacation mIDdleware
    const performance = await User.findById(req.user.id).select('performances');
    // Response- performances related to current user
    res.json(performance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/performances
// @desc    Add performance to a user
// @access  Private Only a Manager or Admin can do it
router.post(
  '/manage',
  [
    authorization,
    [
      check('serial_num', 'Course ID is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // Validations f the form will take place here
    const errors = validationResult(req);
    // According to validation send errors if there are
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull from the req.body the fields to create new performance later on (instance)
    const {
      serial_num,
      title,
      year,
      semester,
      course_hours,
      location
    } = req.body;
    try {
      // Pull the organization of manager to know what organization field for UserSchema
      let user = await User.findById(req.user.id).select('organization');

      // Create new ModelSchema of performance
      const newPerformance = new Performance({
        serial_num,
        organization: user.organization,
        title,
        year,
        semester,
        course_hours,
        location
      });
      // Promise- save performance to db
      const performance = await newPerformance.save();
      return res.json('new_course_added');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   PUT api/Performance/:id
// @desc    Update Performance by id
// @access  Private- only manager
router.put('/:id', authorization, async (req, res) => {
  // Pull from the req.body the fields to create new performance later on (instance)
  const {
    serial_num,
    title,
    year,
    semester,
    course_hours,
    ex_hours,
    location
  } = req.body;

  // Build constraint object
  const performanceFields = {};
  if (serial_num) performanceFields.serial_num = serial_num;
  if (title) performanceFields.title = title;
  if (year) performanceFields.year = year;
  if (semester) performanceFields.semester = semester;
  if (course_hours) performanceFields.course_hours = course_hours;
  if (ex_hours) performanceFields.ex_hours = ex_hours;
  if (location) performanceFields.location = location;

  try {
    // Find the performance in db by id
    let performance = await Performance.findById(req.params.id);
    // Performance not found
    if (!performance)
      return res.status(404).json({ msg: 'Performance not found' });

    // Pull the organization of manager to know what organization field for performanceSchema
    let user = await User.findById(req.user.id).select('organization');

    //  The manager not authorize to change the specific performance requested
    if (user.organization !== performance.organization) {
      res
        .status(401)
        .json({ msg: 'Not allowed to change performance detailes' });
    }
    // Promise- return an id of the performance to change if not exist
    // add this new performance
    performance = await Performance.findByIdAndUpdate(
      req.params.id,
      { $set: performanceFields },
      { new: true }
    );
    // Response- the update performance
    res.json(performance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/performance/:id
// @desc    Delete performance
// @access  Private- Manager only
router.delete('/:id', authorization, async (req, res) => {
  try {
    //   Find the performance by id
    let performance = await Performance.findById(req.params.id);
    // Not found constraint
    if (!performance)
      return res.status(404).json({ msg: 'Performance not found' });

    // Pull the organization of manager to know what organization field for UserSchema
    let user = await User.findById(req.user.id).select('organization');

    //  The manager not authorize to change the specific user requested
    if (user.organization !== performance.organization) {
      res.status(401).json({
        msg: 'Not allowed to delete performance- not the same organization'
      });
    }

    // Promise- find the Performance and remove it from db
    await Performance.findByIdAndRemove(req.params.id);

    // Response- msg to indicate that Performance has been removed
    res.json({ msg: 'Performance removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
