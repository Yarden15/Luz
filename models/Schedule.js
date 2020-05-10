const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
  sched_id: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  events: [
    {
      timeTableId: { type: mongoose.Schema.Types.ObjectId },
      startTime: { type: String },
      endTime: { type: String },
      eventId: { type: String },
      daysOfWeek: { type: Array }
    },
  ],
  // events: {
  //   type: Array,
  //   required: true,
  // },
});

module.exports = mongoose.model('schedules', ScheduleSchema);
