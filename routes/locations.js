const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const Authorization = require('../middleware/authorization');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Location = require('../models/Location');
const TimeTable = require('../models/TimeTable');

// @route   GET api/locations/manage
// @desc    Get all Organization locations
// @access  Private- Managers
router.get('/manage', Authorization, async (req, res) => {
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
router.post('/manage', [Authorization], async (req, res) => {
  console.log(req.body);
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

// @route   DELETE api/locations/manage/:id
// @desc    Delete location from DB and all what relevent
// @access  Private- Manager only
router.delete('/manage/:id', Authorization, async (req, res) => {
  try {
    //   Find the location by id
    let location = await Location.findById(req.params.id);
    // Location not found in DB
    if (!location) return res.status(404).json({ msg: 'User not found' });

    // Pull the organization of manager to know what organization field for UserSchema
    let manager = await User.findById(req.user.id).select('organization');

    //  The manager not authorize to change the specific location requested
    if (manager.organization !== location.organization) {
      res.status(401).json({
        msg: 'Not allowed to delete location- not the same organization'
      });
    }

    // Promise- find the User and remove it from db
    await Location.findByIdAndRemove(req.params.id);

    // Promise- find the TimeTables and remove it from db
    await TimeTable.deleteMany({ location: req.params.id });

    // Response- msg to indicate that Performance has been removed
    res.json({ msg: 'User has been removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;