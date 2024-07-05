import axios from 'axios';

const fetchWorkers = async (userId) => {
  try {
    const workerResponse = await axios.get(`http://localhost:3010/api/ms_storage/workers/user/${userId}`);
    const { restaurant_id } = workerResponse.data;

    const restaurantResponse = await axios.get(`http://localhost:3010/api/ms_rests/${restaurant_id}`);
    return restaurantResponse.data;
  } catch (error) {
    console.error('Error fetching user restaurant:', error);
    return null;
  }
};

export default fetchWorkers;
