const mongoose = require('mongoose');

const PerformTimeSchema = mongoose.Schema({
  id_timeTable: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'timeTables'
  },
  is_course: {
    type: Boolean,
    required: true
  },
  daysOfWeek: {
    type: String,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('performTime', PerformTimeSchema);
