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
    const restaurant = await Restaurant.findOne({ where: { restaurant_id: req.params.id } });
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
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const [updated] = await Restaurant.update(req.body, { where: { restaurant_id: req.params.id } });
    if (!updated) {
      return res.status(404).send({ message: 'Restaurant not found' });
    }
    const updatedRestaurant = await Restaurant.findOne({ where: { restaurant_id: req.params.id } });
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.softDeleteRestaurant = async (req, res) => {
  try {
    const [updated] = await Restaurant.update({ description: 'inactive' }, { where: { restaurant_id: req.params.id } });
    if (!updated) {
      return res.status(404).send({ message: 'Restaurant not found or already inactive' });
    }
    res.send({ message: 'Restaurant soft deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
