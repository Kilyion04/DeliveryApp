const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { username, email, password, role, telephone, address, createRestaurant, restaurantName, restaurantDescription, restaurantPhone, restaurantEmail, restaurantAddress } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const refreshToken = jwt.sign(
      { email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create user
    const userResponse = await axios.post(`${process.env.API_GATEWAY_URL}/ms_users`, {
      username,
      email,
      password: hashedPassword,
      role,
      telephone,
      address,
      refresh_token: refreshToken
    });

    const userId = userResponse.data.user_id;
    console.log(`User created with ID: ${userId}`);

    if (!userId) {
      console.error('Failed to create user, user ID is undefined');
      return res.status(500).json({ error: 'Failed to create user' });
    }

    if (createRestaurant) {
      // Create restaurant
      const restaurantResponse = await axios.post(`${process.env.API_GATEWAY_URL}/ms_rests`, {
        name: restaurantName,
        description: restaurantDescription,
        phone: restaurantPhone,
        email: restaurantEmail,
        address: restaurantAddress
      });

      const restaurantId = restaurantResponse.data.restaurant_id;
      console.log(`Restaurant created with ID: ${restaurantId}`);

      if (!restaurantId) {
        console.error('Failed to create restaurant, restaurant ID is undefined');
        return res.status(500).json({ error: 'Failed to create restaurant' });
      }

      // Create worker (user-restaurant relationship)
      const workerResponse = await axios.post(`${process.env.API_GATEWAY_URL}/ms_storage/workers`, {
        user_id: userId,
        restaurant_id: restaurantId
      });

      console.log(`Worker created: User ID: ${userId}, Restaurant ID: ${restaurantId}`);

      res.status(201).json({ user_id: userId, restaurant_id: restaurantId, worker_id: workerResponse.data.worker_id });
    } else {
      res.status(201).json({ user_id: userId });
    }
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await axios.get(`${process.env.API_GATEWAY_URL}/ms_users`, {
      params: { email }
    });

    const user = response.data[0];

    if (!user || !user.password) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    if (!user.status) {
      return res.status(403).json({ error: 'User account is inactive' });
    }

    const accessToken = jwt.sign(
      { user_id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ accessToken, user });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ error: 'An error occurred during login', details: error.message });
  }
};

module.exports = { register, login };
