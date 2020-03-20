const mongoose = require('mongoose');

const ConstraintSchema = mongoose.Schema({
  // User that created the constraint
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  organization: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  start_time: {
    type: Number,
    required: true
  },
  end_time: {
    type: Number,
    required: true
  },
  total_time: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('constraint', ConstraintSchema);
