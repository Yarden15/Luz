const mongoose = require('mongoose');

const PerformanceSchema = mongoose.Schema({
  serial_num: {
    type: Number,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  semester: {
    type: String,
    required: true
  },
  course_hours: {
    type: String,
    required: true
  },
  ex_hours: {
    type: Number,
    default: '0'
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('performance', PerformanceSchema);
