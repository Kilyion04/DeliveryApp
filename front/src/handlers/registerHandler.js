import axios from 'axios';

const API_URL = 'http://localhost:3010/api/ms_auth';

export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred while registering');
    }
  }
};