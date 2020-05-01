const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  // Array of users that participate in the performance
  performances: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'performances',
    },
  ],
  constraints: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'constraints',
    },
  ],
  organization: {
    type: String,
    required: true,
  },
  id_number: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  manager: {
    type: Boolean,
    default: false,
  },
  scheduler: {
    type: Boolean,
    default: false,
  },
  lecturer: {
    type: Boolean,
    default: false,
  },
  can_submit: {
    type: Boolean,
    default: true,
  },
  submitted_schedule: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('user', UserSchema);
