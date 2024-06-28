const Log = require('../models/modelLog');

exports.getAllLogs = async (req, res) => {
  try {
    const logs = await Log.find();
    res.json(logs);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getLogById = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id);
    if (!log) {
      return res.status(404).send({ message: 'Log not found' });
    }
    res.json(log);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createLog = async (req, res) => {
  try {
    const log = new Log(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateLog = async (req, res) => {
  try {
    const log = await Log.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!log) {
      return res.status(404).send({ message: 'Log not found' });
    }
    res.json(log);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteLog = async (req, res) => {
  try {
    const log = await Log.findByIdAndDelete(req.params.id);
    if (!log) {
      return res.status(404).send({ message: 'Log not found' });
    }
    res.send({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
