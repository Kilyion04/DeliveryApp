import axios from 'axios';

const API_URL = 'http://localhost:3010/ms_api/ms_rests';

export const getRestaurants = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('An error occurred while fetching restaurants');
    }
  }
};
