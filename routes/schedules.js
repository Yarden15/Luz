const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authorization = require('../middleware/authorization');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Schedule = require('../models/Schedule');

// @route   GET api/schedules
// @desc    Get all schedules
// @access  Private- Managers
// router.get('/', authorization, async (req, res) => {
//   try {
//     // Get all the schedules in db
//     const schedules = await Schedule.find({});
//     // Response- schedules of all users
//     res.json(schedules);

//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

router.get('/', authorization, async (req, res) => {
  try {
    // Get all the timeTable events
    const schedules = await Schedule.find({})
      .populate({
        path: 'schedules',
        model: Schedule,
        select: 'events sched_id title'
      })

    // Response- events in table
    res.json(schedules);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST /schedules
// @desc    Add schedule to a user
// @access  Private Only a Manager or Admin can do it
router.post(
  '/',
  [
    authorization,
    [
      check('sched_id', 'Schedule Id is required')
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
    // Pull from the req.body the fields to create new schedule later on (instance)
    const {
      sched_id,
      title,
      events
    } = req.body;

    try {
      // Create new ModelSchema of schedule
      const newSchedule = new Schedule({
        sched_id,
        title,
        events
      });
      // Promise- save schedule to db

      // Check if there another user that have been created with the same email
      let sched = await Schedule.findOne({ sched_id: sched_id });

      // If there is already a user with the email that entered
      if (sched) {
        await Schedule.updateOne({ sched_id: sched_id }, { $set: { events: events, title: title } });
        res.send('schedule_successfully_saved');
      } else {
        await newSchedule.save();
        res.send('new_schedule_successfully_saved');
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/schedule/:id
// @desc    Delete schedule
// @access  Private- Manager only
router.delete('/:id', authorization, async (req, res) => {
  try {
    // The user isnt a 'Admin' or 'Manager'
    // if (req.user.role !== 'Admin' || req.user.role !== 'Manager') {
    //   return res.status(401).json({ msg: 'Not Authorize to delete schedule' });
    // }
    // Remove the schedule from db
    await Schedule.deleteOne({ sched_id: req.params.id });
    // Response- msg to indicate that schedule has been removed
    res.send('schedule_successfully_deleted');
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
