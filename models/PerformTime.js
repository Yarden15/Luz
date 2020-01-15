const mongoose = require('mongoose');

const PerformTimeSchema = mongoose.Schema({
  id_table_event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'timeTables'
  },
  is_course: {
    type: Boolean,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  start_time: {
    type: String,
    required: true
  },
  end_time: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('performTime', PerformTimeSchema);
