import axios from 'axios';

export const fetchUserData = () => {
  return {
    id: localStorage.getItem('user_id'), // Assurez-vous que 'user_id' est correct
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    address: localStorage.getItem('address'),
    telephone: localStorage.getItem('telephone'),
  };
};

export const saveUserData = async (userData) => {
  try {
    const token = localStorage.getItem('accessToken');
    const response = await axios.put(`http://localhost:3010/api/ms_users/${userData.id}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem('username', response.data.username);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('address', response.data.address);
    localStorage.setItem('telephone', response.data.telephone);
    return response.data;
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.clear();
};

export const deleteUserAccount = async (password) => {
  try {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_id'); // Assurez-vous que 'user_id' est correct
    await axios.delete(`http://localhost:3010/api/ms_users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { password },
    });
    localStorage.clear();
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};

export const changeUserPassword = async (oldPassword, newPassword) => {
  try {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('user_id'); // Assurez-vous que 'user_id' est correct
    await axios.put(
      `http://localhost:3010/api/ms_users/${userId}`,
      {
        password: newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert('Mot de passe modifié avec succès');
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
};
