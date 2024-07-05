const User = require('../models/modelUser');
const { sequelize } = require('../config/config');
const { Op } = require('sequelize');

// Controller functions
exports.getAllUsers = async (req, res) => {
  try {
    const filters = {};

    if (req.query.email) filters.email = { [Op.like]: `%${req.query.email}%` };

    const users = await User.findAll({
      where: filters
    });

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
  const { username, email, password, role, telephone, address, refresh_token } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      role,
      telephone,
      address,
      status: true,
      refreshtoken: refresh_token
    });

    res.status(201).json({ user_id: user.user_id, user: user.dataValues });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params;
    const { username, email, telephone, address, refreshtoken } = req.body;

    const [updated] = await User.update({
      username,
      email,
      telephone,
      address,
      refreshtoken
    }, { where: { user_id: id }, transaction });

    if (!updated) {
      await transaction.rollback();
      return res.status(404).send({ message: 'User not found' });
    }

    await transaction.commit();
    const updatedUser = await User.findOne({ where: { user_id: id } });
    res.json(updatedUser);
  } catch (err) {
    await transaction.rollback();
    res.status(500).send(err);
  }
};

exports.updateUserStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const { status } = req.body;

    const [updated] = await User.update({ status }, { where: { user_id: userId } });

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.query.email } });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.softDeleteUser = async (req, res) => {
  try {
    const updated = await User.update({ status: 'inactive' }, { where: { user_id: req.params.id } });
    if (!updated[0]) {
      return res.status(404).send({ message: 'User not found' });
    }
    res.send({ message: 'User soft deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
