const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const register = async (req, res) => {
  try {
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

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in ms_users
    const response = await axios.post(`${process.env.API_GATEWAY_URL}/ms_users`, {
      username,
      email,
      password: hashedPassword,
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
    });

    const user = response.data;

    // Generate refresh token
    const refreshToken = jwt.sign({ id: user.user_id }, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION
    });

    // Update user with refresh token
    await axios.put(`${process.env.API_GATEWAY_URL}/ms_users/${user.user_id}`, {
      refresh_token: refreshToken
    });

    res.status(201).json({ user, refreshToken });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Récupérer l'utilisateur à partir du microservice users
    const response = await axios.get(`${process.env.API_GATEWAY_URL}/ms_users`, {
      params: { email }
    });

    const user = response.data[0];
    console.log("User data: ", user);

    if (!user || !user.password) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Comparer les mots de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    // Générer un token JWT
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
