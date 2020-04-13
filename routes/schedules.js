const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authorization = require('../middleware/authorization');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Schedule = require('../models/Schedule');
const TimeTable = require('../models/TimeTable');
const Performance = require('../models/Performance');

// @route   GET api/schedules
// @desc    Get all schedules
// @access  Private- Managers
router.get('/', authorization, async (req, res) => {
  try {
    // Pull the organization of manager to know what to pull from DB
    let user = await User.findById(req.user.id).select('organization');
    // Get all the timeTable events
    const schedules = await Schedule.find({
      organization: user.organization,
    }).populate({
      path: 'events.timeTableId',
      model: TimeTable,
      populate: [
        {
          path: 'performance',
          model: Performance,
          select: 'serial_num semester location course_hours title year',
        },
        {
          path: 'user',
          model: User,
          select: 'id_number first_name last_name color',
        },
      ],
      // populate: {
      //   path: 'user',
      //   model: User,
      //   select: 'id_number first_name last_name',
      // },
    });

    // .populate({
    //   path: 'schedules',
    //   model: Schedule,
    //   select: 'events sched_id title',
    // });

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
router.post('/', [authorization], async (req, res) => {
  // Validations f the form will take place here
  const errors = validationResult(req);
  // According to validation send errors if there are
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Pull from the req.body the fields to create new schedule later on (instance)
  const { sched_id, title, events } = req.body;

  try {
    // Pull the organization of manager to know what organization field for UserSchema
    let user = await User.findById(req.user.id).select('organization');

    // Create new ModelSchema of schedule
    const newSchedule = new Schedule({
      sched_id,
      organization: user.organization,
      title,
      events,
    });
    // Promise- save schedule to db

    // Check if there another user that have been created with the same schedule name
    let sched = await Schedule.findOne({ sched_id: sched_id });

    console.log(events);
    // If there is already a user with the email that entered
    if (sched) {
      await Schedule.updateOne(
        { sched_id: sched_id },
        { $set: { events: events, title: title } }
      );
      res.send('schedule_successfully_saved');
    } else {
      await newSchedule.save();
      res.send('new_schedule_successfully_saved');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   DELETE api/schedule/:id
// @desc    Delete schedule
// @access  Private- Manager only
router.delete('/manage/:id', authorization, async (req, res) => {
  try {
    //   Find the schedule by id
    let schedule = await Schedule.findOne({ sched_id: req.params.id });
    // Not found constraint
    if (!schedule) return res.status(404).json({ msg: 'Schedule not found' });

    // Pull the organization of manager to compare organization to schedule
    let user = await User.findById(req.user.id).select('organization');

    //  The manager not authorize to delete the specific schedule requested
    if (user.organization !== schedule.organization) {
      res.status(401).json({
        msg: 'Not allowed to delete schedule- not the same organization',
      });
    }

    // Promise- find the Performance and remove it from db
    await Schedule.findOneAndDelete({ sched_id: req.params.id });

    // Response- msg to indicate that schedule has been removed
    res.send('schedule_successfully_deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
