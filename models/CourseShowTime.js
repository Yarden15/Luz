const mongoose = require('mongoose');

const CourseShowTimeSchema = mongoose.Schema({
  id_table_event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'timeTables'
  },
  day: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('courseShowTime', CourseShowTimeSchema);
