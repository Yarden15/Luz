const mongoose = require('mongoose');

const PerformanceSchema = mongoose.Schema({
  catalog_num: {
    type: Number
  },
  title: {
    type: String,
    required: true
  },
  week_hours: {
    type: Number,
    required: true
  },
  ex_hours: {
    type: Number,
    required: true
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
