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
  events: [
    {
      timeTableId: { type: mongoose.Schema.Types.ObjectId },
      startTime: { type: String },
      endTime: { type: String },
      daysOfWeek: { type: Array },
    },
  ],
  // events: {
  //   type: Array,
  //   required: true,
  // },
});

module.exports = mongoose.model('schedules', ScheduleSchema);
