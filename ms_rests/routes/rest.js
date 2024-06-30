// routes/restaurant.js
const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/restaurantController');

router.post('/', RestaurantController.createRestaurant);
router.get('/user/:user_id', RestaurantController.getRestaurantsByUser);

module.exports = router;
