const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// Models import
const User = require('../models/User');
const Constraint = require('../models/Constraint');

// @route   GET api/constraints
// @desc    Get all the user constraints
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Pull from db all the constraints of a current user, by the middleware
    // <auth> we have access in req to user id and by that we find the correct constraints
    const constraints = await Constraint.find({ user: req.user.id }).sort({
      date: -1
    });
    // Response the array of constraints as json
    res.json(constraints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/constraints
// @desc    Add new constraint
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      // Validations intialize for constraint
      check('day', 'Please include day').exists(),
      check('start_time', 'Please enter start time').exists(),
      check('end_time', 'Please enter end time').exists(),
      check('total_time', 'Please enter Total time').exists()
    ]
  ],
  async (req, res) => {
    // Validations f the form will take place here
    const errors = validationResult(req);
    // According to validation send errors if there are
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull from the req.body the fields to create new constraint later on (instance)
    const { day, start_time, end_time, total_time } = req.body;

    try {
      // Create new ModelSchema of constraint
      const newConstraint = new Constraint({
        day,
        start_time,
        end_time,
        total_time,
        user: req.user.id
      });
      // Promise- save constraint to db
      const constraint = await newConstraint.save();
      // Response- constraint to client
      res.json(constraint);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/constraints/:id
// @desc    Update constraint
// @access  Private
router.put('/:id', auth, async (req, res) => {
  // Pull from the req.body the fields to create new constraint later on (instance)
  const { day, start_time, end_time, total_time } = req.body;

  // Build constraint object
  const constraintFields = {};
  if (day) constraintFields.day = day;
  if (start_time) constraintFields.start_time = start_time;
  if (end_time) constraintFields.end_time = end_time;
  if (total_time) constraintFields.total_time = total_time;

  try {
    //   Find the constraint by id
    let constraint = await Constraint.findById(req.params.id);
    // Not found constraint
    if (!constraint)
      return res.status(404).json({ msg: 'constraint not found' });

    // Make sure user owns constraint
    // Compare the user.id to the constraint field of user.id
    if (constraint.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Promise- return an id of the constraint to change if not exist
    // add this new constraint
    constraint = await Constraint.findByIdAndUpdate(
      req.params.id,
      { $set: constraintFields },
      { new: true }
    );

    // Response- the update constraint
    res.json(constraint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/constraints/:id
// @desc    Delete constraint
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    //   Find the constraint by id
    let constraint = await Constraint.findById(req.params.id);
    // Not found constraint
    if (!constraint)
      return res.status(404).json({ msg: 'Constraint not found' });

    // Make sure user owns constraint
    // Compare the user.id to the constraint field of user.id
    if (constraint.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Promise- find the constraint and remove it from db
    await Constraint.findByIdAndRemove(req.params.id);

    // Response- msg to indicate that constraint has been removed
    res.json({ msg: 'Constraint removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
