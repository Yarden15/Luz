const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authorization = require('../middleware/authorization');
const { check, validationResult } = require('express-validator');

const TimeTable = require('../models/TimeTable');
const User = require('../models/User');
const Performance = require('../models/Performance');
const Schedule = require('../models/Schedule');

// @route   GET api/timeTable
// @desc    Get all timeTable
// @access  Private- Admin & Managers
router.get('/', authorization, async (req, res) => {
  try {
    // Pull the organization of manager for validation
    let user = await User.findById(req.user.id).select('organization');

    // Get all the timeTable events
    const timeTable = await TimeTable.find({ organization: user.organization })
      .populate({
        path: 'performance',
        model: Performance,
        select: 'serial_num title location semester year ex_hours course_hours',
      })
      .populate({
        path: 'user',
        model: User,
        select:
          'id_number first_name last_name color email constraints performances',
      });

    // Response- events in table
    res.json(timeTable);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   GET api/timeTable/:id
// @desc    Get all performances of a specific user
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // Get all the attached preformances to current User by it ID gotten
    // from the authentacation mIDdleware
    const timeTable = await TimeTable.find({ user: req.user.id });
    // Response- performances related to current user
    res.json(timeTable);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/timetables
// @desc    Add an Event that connect between User to Performance
// @access  Private Only a Manager or Admin can do it
router.post(
  '/',
  [authorization, [check('courseId', 'Course ID is required').not().isEmpty()]],
  async (req, res) => {
    // Validations f the form will take place here
    const errors = validationResult(req);
    // According to validation send errors if there are
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull from the req.body the fields to create new Event
    const { userId, courseId } = req.body;

    // Build constraint object
    const timeTableFields = {};

    try {
      // Pull the organization of manager for validation
      let man = await User.findById(req.user.id).select('organization');

      // Find user ID in DB to create the Event correctly
      let user = await User.findOne({ _id: userId });
      // User not exist
      if (!user) return res.status(404).json({ msg: 'User not found' });
      // Validate user and manager in the same organization
      if (user.organization !== man.organization)
        return res
          .status(401)
          .json({ msg: 'Cannot handle that user- not the same organization' });

      // Find performance ID in DB to create the Event correctly
      let performance = await Performance.findOne({ _id: courseId });
      // Performance not exist
      if (!performance)
        return res.status(404).json({ msg: 'Performance not found' });
      // Validate user and manager in the same organization
      if (performance.organization !== man.organization)
        return res.status(401).json({
          msg: 'Cannot handle that performance- not the same organization',
        });

      // Check for timeTable with the requested parameters (userId and courseId)
      // let timetable = await TimeTable.find({
      //   performance: courseId,
      //   user: userId,
      // });
      let timetable = await TimeTable.findOne({
        $and: [
          {
            performance: courseId,
          },
          {
            user: userId,
          },
        ],
      });

      // If there is an existing timeTamble dont create it again
      if (timetable)
        return res.status(403).json({ msg: 'timeTable already exist' });

      // Initial the timeTable fields by the _id's and relevant organization
      timeTableFields.user = user._id;
      timeTableFields.performance = performance._id;
      timeTableFields.organization = man.organization;
      timeTableFields.course_hours_remaining = performance.course_hours;
      // // Update in the array of courses in user Model the new course
      // await User.update(
      //   { _id: user._id },
      //   {
      //     $push: { performances: performance._id },
      //   }
      // );

      // Create new ModelSchema of event timeTable
      const newTimeTable = new TimeTable(timeTableFields);

      // Promise- save performance to db
      const timeTable = await newTimeTable.save();
      // Response- performance to client
      return res.json('pairing_successfully_created');
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   DELETE api/timetables/:id
// @desc    Delete timetable
// @access  Private- Manager only
router.delete('/:id', authorization, async (req, res) => {
  try {
    //   Find the timetable in DB by id
    let timetable = await TimeTable.findById(req.params.id);
    // Not found
    if (!timetable) {
      return res.status(404).json({ msg: 'TimeTable not found' });
    }
    // Pull the organization of manager to know what organization field for UserSchema
    let user = await User.findById(req.user.id).select('organization');

    //  The manager not authorize to change the specific user requested
    if (user.organization !== timetable.organization) {
      res.status(401).json({
        msg: 'Not allowed to delete performance- not the same organization',
      });
    }

    // Promise- find TimeTable
    let timeTable = await TimeTable.findOne({ _id: req.params.id });

    // Delete the Performance in the user table
    await User.updateMany({
      $pull: {
        performances: { performance: timeTable.performance },
      },
      multi: true,
    });
    // Delete the timetable in every board it appears
    await Schedule.updateMany({
      $pull: {
        events: { timeTableId: timeTable._id },
      },
      multi: true,
    });
    // Delete timetable from DB
    await TimeTable.findByIdAndDelete(req.params.id);

    // Response- msg to indicate that timetable has been removed
    res.json({ msg: 'timetable removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
