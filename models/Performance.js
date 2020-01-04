const mongoose = require('mongoose');

const PerformanceSchema = mongoose.Schema({
  // Array of users that participate in the performance
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  catalog_number: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    required: true
  },
  additional_time: {
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
