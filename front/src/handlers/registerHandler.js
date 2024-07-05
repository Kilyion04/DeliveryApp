import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/ms_auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || 'An error occurred while registering');
    } else {
      throw new Error('An error occurred while registering');
    }
  }
};