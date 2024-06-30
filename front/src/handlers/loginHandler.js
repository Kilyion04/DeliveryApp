import axios from 'axios';

const API_URL = 'http://localhost:3010/api/ms_auth';

export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData);
        const { user, accessToken } = response.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user_id', user.user_id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('email', user.email);
        localStorage.setItem('role', user.role);
        localStorage.setItem('telephone', user.telephone);
        localStorage.setItem('address', user.address);

        return response.data.user;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('An error occurred while logging in');
        }
    }
};
