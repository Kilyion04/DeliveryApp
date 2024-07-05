import axios from 'axios';

const placeOrder = async (orderData) => {
  try {
    const response = await axios.post('http://localhost:3010/api/ms_orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Failed to place order:', error);
    throw error;
  }
};

export default placeOrder;
