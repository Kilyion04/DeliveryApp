import axios from 'axios';

const API_URL = 'http://localhost:3010/api/ms_orders';

export const getOrderById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw error;
  }
};
