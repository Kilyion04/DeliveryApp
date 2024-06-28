const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  user_id: {
    type: Number,
    required: true
  },
  notification_type: {
    type: String,
    required: true
  },
  notification_message: {
    type: String,
    required: true
  },
  notification_date: {
    type: Date,
    default: Date.now
  }
});

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;
