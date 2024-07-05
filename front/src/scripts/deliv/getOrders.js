import axios from 'axios';

const API_URL = 'http://localhost:3010/api/ms_orders';

export const getOrders = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

export const updateOrder = async (orderId, updateData) => {
  try {
    const response = await axios.put(`${API_URL}/${orderId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};
