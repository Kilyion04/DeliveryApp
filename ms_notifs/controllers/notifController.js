const Notification = require('../models/modelNotif');

exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).send({ message: 'Notification not found' });
    }
    res.json(notification);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!notification) {
      return res.status(404).send({ message: 'Notification not found' });
    }
    res.json(notification);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).send({ message: 'Notification not found' });
    }
    res.send({ message: 'Notification deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
