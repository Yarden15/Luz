const mongoose = require('mongoose');

const TimeTableSchema = mongoose.Schema({
  performance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'performances'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  course_hrs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'courseShowTimes'
    }
  ],
  ex_hrs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'exShowTimes'
    }
  ],
  total_course: {
    type: Number,
    default: 0
  },
  total_ex: {
    type: Number,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('timeTable', TimeTableSchema);
