const User = require('../models/modelUser');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ where: { user_id: req.params.id } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log('Creating user with data:', req.body); // Add this line to log the data
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error('Error creating user:', err); // Add this line to log the error
    res.status(400).send(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, { where: { user_id: req.params.id } });
    if (!updated) {
      return res.status(404).send({ message: 'User not found' });
    }
    const updatedUser = await User.findOne({ where: { user_id: req.params.id } });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.softDeleteUser = async (req, res) => {
  try {
    const [updated] = await User.update({ status: 'inactive' }, { where: { user_id: req.params.id } });
    if (!updated) {
      return res.status(404).send({ message: 'User not found or already inactive' });
    }
    res.send({ message: 'User soft deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
