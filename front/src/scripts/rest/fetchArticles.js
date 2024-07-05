import axios from 'axios';

const fetchArticles = async () => {
    try {
        const response = await axios.get('http://localhost:3010/api/ms_articles');
        return response.data;
    } catch (error) {
        console.error('Error fetching articles:', error);
        throw error;
    }
};

const fetchArticlesbyRestaurant = async (restaurantId) => {
  try {
    const response = await axios.get(`http://localhost:3010/api/ms_articles?restaurant_id=${restaurantId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};

export { fetchArticles, fetchArticlesbyRestaurant };
