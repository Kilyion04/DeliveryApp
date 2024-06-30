const User = require('../models/modelUser');
const Address = require('../models/modelAddress');
const { sequelize } = require('../config/config');
const { Op } = require('sequelize');
const axios = require('axios');

exports.getAllUsers = async (req, res) => {
  try {
    console.log("Fetching all users...");
    const filters = {};
    const addressFilters = {};

    if (req.query.username) filters.username = { [Op.like]: `%${req.query.username}%` };
    if (req.query.email) filters.email = { [Op.like]: `%${req.query.email}%` };
    if (req.query.telephone) filters.telephone = { [Op.like]: `%${req.query.telephone}%` };

    if (req.query.address_num) addressFilters.address_num = { [Op.like]: `%${req.query.address_num}%` };
    if (req.query.address_complement) addressFilters.address_complement = { [Op.like]: `%${req.query.address_complement}%` };
    if (req.query.address_street) addressFilters.address_street = { [Op.like]: `%${req.query.address_street}%` };
    if (req.query.address_neighbor) addressFilters.address_neighbor = { [Op.like]: `%${req.query.address_neighbor}%` };
    if (req.query.address_city) addressFilters.address_city = { [Op.like]: `%${req.query.address_city}%` };
    if (req.query.address_postal_code) addressFilters.address_postal_code = { [Op.like]: `%${req.query.address_postal_code}%` };
    if (req.query.address_departement) addressFilters.address_departement = { [Op.like]: `%${req.query.address_departement}%` };
    if (req.query.address_region) addressFilters.address_region = { [Op.like]: `%${req.query.address_region}%` };
    if (req.query.address_country) addressFilters.address_country = { [Op.like]: `%${req.query.address_country}%` };

    const users = await User.findAll({
      where: filters,
      include: {
        model: Address,
        where: addressFilters
      }
    });

    console.log("Users fetched successfully:", users);
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send(err);
  }
};

exports.getUserById = async (req, res) => {
  try {
    console.log(`Fetching user with ID: ${req.params.id}`);
    const user = await User.findOne({ 
      where: { user_id: req.params.id },
      include: Address
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    console.log("User fetched successfully:", user);
    res.json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).send(err);
  }
};

exports.createUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    console.log("Creating user with data:", req.body);
    const {
      username,
      email,
      password,
      role,
      telephone,
      address_num,
      address_complement,
      address_street,
      address_neighbor,
      address_city,
      address_postal_code,
      address_departement,
      address_region,
      address_country
    } = req.body;

    // Create address
    const address = await Address.create({
      address_num,
      address_complement,
      address_street,
      address_neighbor,
      address_city,
      address_postal_code,
      address_departement,
      address_region,
      address_country
    }, { transaction });

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role,
      telephone,
      address_id: address.address_id
    }, { transaction });

    console.log("User created successfully:", user);

    // Si le rôle est restaurateur, créer une association avec le microservice restaurants
    if (role === 'Restaurateur') {
      await axios.post(`${process.env.API_GATEWAY_URL}/ms_rests/restaurants`, {
        user_id: user.user_id,
        address_num,
        address_complement,
        address_street,
        address_neighbor,
        address_city,
        address_postal_code,
        address_departement,
        address_region,
        address_country
      });
    }

    await transaction.commit();
    res.status(201).json({ user, address });
  } catch (err) {
    await transaction.rollback();
    console.error("Error creating user:", err);
    res.status(500).send(err);
  }
};

exports.updateUser = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    console.log(`Updating user with ID: ${req.params.id}`);
    const { id } = req.params;
    const {
      username,
      email,
      telephone,
      address_num,
      address_complement,
      address_street,
      address_neighbor,
      address_city,
      address_postal_code,
      address_departement,
      address_region,
      address_country
    } = req.body;

    // Update user
    const [updated] = await User.update({
      username,
      email,
      telephone
    }, { where: { user_id: id }, transaction });

    if (!updated) {
      await transaction.rollback();
      return res.status(404).send({ message: 'User not found' });
    }

    // Update address
    const user = await User.findOne({ where: { user_id: id } });
    await Address.update({
      address_num,
      address_complement,
      address_street,
      address_neighbor,
      address_city,
      address_postal_code,
      address_departement,
      address_region,
      address_country
    }, { where: { address_id: user.address_id }, transaction });

    await transaction.commit();
    const updatedUser = await User.findOne({ where: { user_id: id }, include: Address });
    console.log("User updated successfully:", updatedUser);
    res.json(updatedUser);
  } catch (err) {
    await transaction.rollback();
    console.error("Error updating user:", err);
    res.status(500).send(err);
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    console.log(`Fetching user with email: ${req.query.email}`);
    const user = await User.findOne({ 
      where: { email: req.query.email },
      include: Address
    });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    console.log("User fetched successfully:", user);
    res.json(user);
  } catch (err) {
    console.error("Error fetching user by email:", err);
    res.status(500).send(err);
  }
};

exports.softDeleteUser = async (req, res) => {
  try {
    console.log(`Soft deleting user with ID: ${req.params.id}`);
    const updated = await User.update({ status: 'inactive' }, { where: { user_id: req.params.id } });
    if (!updated[0]) {
      return res.status(404).send({ message: 'User not found' });
    }
    console.log("User soft deleted successfully");
    res.send({ message: 'User soft deleted' });
  } catch (err) {
    console.error("Error soft deleting user:", err);
    res.status(500).send(err);
  }
};
