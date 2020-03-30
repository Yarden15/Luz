const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authorization = require('../middleware/authorization');
const { check, validationResult } = require('express-validator');

const Location = require('../models/Location');

// @route   GET api/locations/manage
// @desc    Get all Organization locations
// @access  Private- Managers
router.get('/manage', authorization, async (req, res) => {
  try {
    // Pull the organization of manager to know what to pull from DB
    let manager = await User.findById(req.user.id).select('organization');
    // Get all the timeTable events
    const locations = await Location.find({
      organization: manager.organization
    });

    // Response- events in table
    res.json(locations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   POST api/locations/manage
// @desc    Add location to Organization
// @access  Private Only a Manager or Admin can do it
router.post('/manage', [authorization], async (req, res) => {
  // Validations f the form will take place here
  const errors = validationResult(req);
  // According to validation send errors if there are
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Pull from the req.body the fields to create new schedule later on (instance)
  const { name } = req.body;

  try {
    // Pull the organization of manager to know what organization field for UserSchema
    let user = await User.findById(req.user.id).select('organization');

    // Create new ModelSchema of schedule
    const newLocation = new Location({
      name,
      organization: user.organization
    });
    // Promise- save location to db
    await newLocation.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
