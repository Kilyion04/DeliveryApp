import { createMenu, updateMenu, deleteMenu } from './postMenu';
import { fetchMenus } from '../../src/scripts/rest/fetchMenus';

export const handleCreateMenu = async (event, menus, setMenus, closeMenuModal) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const menuData = {
    menu_name: formData.get('name'),
    menu_description: formData.get('description'),
    article_list: formData.getAll('articles'),
    restaurant_id: 1
  };

  try {
    await createMenu(menuData);
    closeMenuModal();
    setMenus([...menus, menuData]); // Ajoute le menu à la liste actuelle
  } catch (error) {
    console.error('Error creating menu:', error);
  }
};

export const handleUpdateMenu = async (event, currentMenu, menus, setMenus, closeEditMenuModal) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const updatedMenu = {
    menu_name: formData.get('name'),
    menu_description: formData.get('description'),
    article_list: formData.getAll('articles')
  };

  try {
    await updateMenu(currentMenu._id, updatedMenu);
    closeEditMenuModal();
    setMenus(menus.map(menu => (menu._id === currentMenu._id ? updatedMenu : menu)));
  } catch (error) {
    console.error('Error updating menu:', error);
  }
};

export const handleDeleteMenu = async (menuId, menus, setMenus) => {
  try {
    await deleteMenu(menuId);
    setMenus(menus.filter(menu => menu._id !== menuId));
  } catch (error) {
    console.error('Error deleting menu:', error);
  }
};
