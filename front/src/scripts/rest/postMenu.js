import axios from 'axios';

export const createMenu = async (menuData) => {
  try {
    const response = await axios.post('http://localhost:3010/api/ms_menus', menuData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMenu = async (menuId, updatedMenu) => {
  try {
    const response = await axios.put(`http://localhost:3010/api/ms_menus/${menuId}`, updatedMenu, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMenu = async (menuId) => {
  try {
    const response = await axios.delete(`http://localhost:3010/api/ms_menus/${menuId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
