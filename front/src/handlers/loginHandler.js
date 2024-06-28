import axios from 'axios';

const API_URL = 'http://localhost:3010/ms_api/ms_auth';

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    const { accessToken, refreshToken, user } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('id_user', user.user_id);
    localStorage.setItem('username', user.username);
    localStorage.setItem('email', user.email);
    localStorage.setItem('address', user.address);
    localStorage.setItem('telephone', user.telephone);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    } else {
      throw new Error('An error occurred while logging in');
    }
  }
};
