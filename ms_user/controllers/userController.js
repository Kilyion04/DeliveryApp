const { User, Address, UserAddress } = require('../models');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ include: { model: Address, as: 'default_address' } });
    res.json(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { user_id: req.params.id },
      include: { model: Address, as: 'default_address' }
    });
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
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
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

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { user_id: req.params.id } });
    if (!deleted) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'User deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
