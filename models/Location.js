const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('location', ScheduleSchema);
