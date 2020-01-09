const mongoose = require('mongoose');

const PerformanceSchema = mongoose.Schema({
  // Array of users that participate in the performance
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
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
