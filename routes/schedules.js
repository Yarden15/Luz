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


// @route   GET api/schedules/:id
// @desc    Get all schedules of a specific user
// @access  Private

// router.get('/:id', auth, async (req, res) => {
//   try {
//     // @todo - select from the id of schedules the info of its
//     // Get all the attached preformances to current User by it ID gotten
//     // from the authentacation mIDdleware
//     const schedule = await User.findById(req.user.id).select('schedules');
//     // Response- schedules related to current user
//     res.json(schedule);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

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
      const schedule = await newSchedule.save();
      // Response- schedule to client
      res.send('Schedule successfully saved');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/schedule/:id
// @desc    Update Schedule by id
// @access  Private- only manager
// router.put('/:id', authorization, async (req, res) => {
//   // Pull from the req.body the fields to create new schedule later on (instance)
//   const {
//     sched_id,
//     title,
//     events
//   } = req.body;

//   // Build constraint object
//   const scheduleFields = {};
//   if (sched_id) scheduleFields.sched_id = sched_id;
//   if (title) scheduleFields.title = title;
//   if (events) scheduleFields.events = events;

//   try {
//     // Find the schedule in db by id
//     let schedule = await schedule.findById(req.params.id);
//     // Schedule not found
//     if (!schedule)
//       return res.status(404).json({ msg: 'Schedule not found' });

//     // Promise- return an id of the schedule to change if not exist
//     // add this new schedule
//     schedule = await schedule.findByIdAndUpdate(
//       req.params.id,
//       { $set: scheduleFields },
//       { new: true }
//     );
//     // Response- the update schedule
//     res.json(schedule);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route   DELETE api/schedule/:id
// @desc    Delete schedule
// @access  Private- Manager only
// router.delete('/:id', authorization, async (req, res) => {
//   try {
//     //   Find the schedule by id
//     let schedule = await schedule.findById(req.params.id);
//     // Not found constraint
//     if (!schedule)
//       return res.status(404).json({ msg: 'schedule not found' });

//     // The user isnt a 'Admin' or 'Manager'
//     if (req.user.role !== 'Admin' || req.user.role !== 'Manager') {
//       return res
//         .status(401)
//         .json({ msg: 'Not Authorize to delete schedule' });
//     }

//     // Promise- find the schedule and remove it from db
//     await schedule.findByIdAndRemove(req.params.id);

//     // Response- msg to indicate that schedule has been removed
//     res.json({ msg: 'schedule removed' });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
