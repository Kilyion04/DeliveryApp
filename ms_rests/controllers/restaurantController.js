const Restaurant = require('../models/modelRestaurant');
const Address = require('../models/modelAddress');
const { sequelize } = require('../config/config');

exports.createRestaurant = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const {
      user_id,
      name,
      description,
      phone,
      email,
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

    // Create restaurant
    const restaurant = await Restaurant.create({
      user_id,
      name,
      description,
      phone,
      email,
      address_id: address.address_id
    }, { transaction });

    await transaction.commit();
    res.status(201).json({ restaurant, address });
  } catch (err) {
    await transaction.rollback();
    res.status(500).send(err);
  }
};

exports.getRestaurantsByUser = async (req, res) => {
  try {
    const userId = req.params.user_id;
    const restaurants = await Restaurant.findAll({
      where: { user_id: userId },
      include: Address
    });
    if (!restaurants.length) {
      return res.status(404).send({ message: 'No restaurants found for this user' });
    }
    res.json(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
};
