const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const API_GATEWAY_URL = process.env.API_GATEWAY_URL;

const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });

  try {
    const userResponse = await axios.post(`${API_GATEWAY_URL}/ms_users`, { username, email, password: hashedPassword, role, refreshToken });
    res.status(201).json({ message: 'User created successfully', user: userResponse.data });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error: error.response ? error.response.data : error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userResponse = await axios.get(`${API_GATEWAY_URL}/ms_users/email/${email}`);
    const user = userResponse.data;

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const accessToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION });

    await axios.put(`${API_GATEWAY_URL}/ms_users/${user.user_id}/refresh_token`, { refreshToken });

    res.status(200).json({ accessToken, refreshToken, user });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.response ? error.response.data : error.message });
  }
};

module.exports = {
  register,
  login,
};
