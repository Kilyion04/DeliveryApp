import axios from 'axios';

const fetchMenus = async () => {
    try {
        const response = await axios.get('http://localhost:3010/api/ms_menus');
        return response.data;
    } catch (error) {
        console.error('Error fetching menus:', error);
        throw error;
    }
};

const fetchMenusbyRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(`http://localhost:3010/api/ms_menus?restaurant_id=${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching menus:', error);
    return [];
  }
};

export { fetchMenus, fetchMenusbyRestaurant };
