import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createRestaurant = async (restaurantData) => {
  try {
    const response = await axios.post(`${API_URL}/api/ms_rests`, restaurantData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred while creating the restaurant');
    }
  }
};
