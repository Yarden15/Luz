const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  // Array of users that participate in the performance
  performances: [
    {
      performance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'performances',
      },
      startTime: { type: String },
      endTime: { type: String },
      eventId: { type: String },
      schedId: { type: String },
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
  constraints: {
    type: Object,
    default: {
      sunday_start: '',
      sunday_end: '',
      sunday_notes: '',
      monday_start: '',
      monday_end: '',
      monday_notes: '',
      tuesday_start: '',
      tuesday_end: '',
      tuesday_notes: '',
      wednesday_start: '',
      wednesday_end: '',
      wednesday_notes: '',
      thursday_start: '',
      thursday_end: '',
      thursday_notes: '',
      friday_start: '',
      friday_end: '',
      friday_notes: '',
      course_comments: '',
      general_comments: '',
      critical_comments: '',
    },
  },
});

module.exports = mongoose.model('user', UserSchema);
