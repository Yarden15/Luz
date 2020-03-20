const mongoose = require('mongoose');

const TimeTableSchema = mongoose.Schema({
  performance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'performances'
  },
  organization: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  perform_time: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'performTimes'
    }
  ],
  group_name: {
    type: String
  },
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
