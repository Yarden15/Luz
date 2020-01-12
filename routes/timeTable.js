const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authorization = require('../middleware/authorization');
const { check, validationResult } = require('express-validator');

const TimeTable = require('../models/TimeTable');
const User = require('../models/User');
const Performance = require('../models/Performance');

// @route   GET api/timeTable
// @desc    Get all timeTable
// @access  Private- Admin & Managers
router.get('/', authorization, async (req, res) => {
  try {
    // Get all the timeTable events
    const timeTable = await TimeTable.find({});
    // Response- events in table
    res.json(timeTable);
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
    // Get all the attached preformances to current User by it ID gotten
    // from the authentacation mIDdleware
    const timeTable = await TimeTable.find({ user: req.user.id });
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
  '/',
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
      performance,
      user,
      course_hrs,
      ex_hrs,
      total_course,
      total_ex
    } = req.body;

    try {
      // Create new ModelSchema of performance
      const newTimeTable = new TimeTable({
        performance,
        user,
        course_hrs,
        ex_hrs,
        total_course,
        total_ex
      });
      // Promise- save performance to db
      const timeTable = await newTimeTable.save();
      // Response- performance to client
      res.json(timeTable);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
