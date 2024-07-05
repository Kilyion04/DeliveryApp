const Restaurant = require('../models/modelRestaurant');

exports.getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll();
    res.json(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).send({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createRestaurant = async (req, res) => {
  try {
    const { name, description, phone, email, address } = req.body;

    const newRestaurant = await Restaurant.create({
      name,
      description,
      phone,
      email,
      address
    });

    res.status(201).json({ restaurant_id: newRestaurant.restaurant_id, restaurant: newRestaurant.dataValues });
  } catch (err) {
    console.error('Error creating restaurant:', err);
    res.status(400).json({ error: 'Failed to create restaurant', details: err.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).send({ message: 'Restaurant not found' });
    }

    const updatedRestaurant = await restaurant.update(req.body);
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByPk(req.params.id);
    if (!restaurant) {
      return res.status(404).send({ message: 'Restaurant not found' });
    }

    await restaurant.destroy();
    res.send({ message: 'Restaurant deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
