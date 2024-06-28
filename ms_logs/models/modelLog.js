const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  log_data: {
    type: Date,
    default: Date.now
  },
  log_message: {
    type: String,
    required: true
  }
});

const Log = mongoose.model('Log', LogSchema);

module.exports = Log;
