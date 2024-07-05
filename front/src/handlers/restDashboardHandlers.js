import { fetchMenus } from '../scripts/rest/fetchMenus';
import { createArticle, updateArticle, deleteArticle } from '../scripts/rest/postArticles';
import { createMenu, updateMenu, deleteMenu } from '../scripts/rest/postMenu';

export const handleCreateArticle = async (event, setArticles, articles, closeArticleModal, restaurantId) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const articleData = {
    article_name: formData.get('name'),
    article_description: formData.get('description'),
    article_price: parseFloat(formData.get('price')),
    article_type: formData.get('type'),
    restaurant_id: restaurantId
  };
  
  try {
    const createdArticle = await createArticle(articleData);
    closeArticleModal();
    setArticles([...articles, createdArticle]);
  } catch (error) {
    console.error('Error creating article:', error);
  }
};

export const handleUpdateArticle = async (event, currentArticle, setArticles, articles, closeEditArticleModal) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const updatedArticle = {
    ...currentArticle,
    article_name: formData.get('name'),
    article_description: formData.get('description'),
    article_price: parseFloat(formData.get('price')),
    article_type: formData.get('type')
  };

  try {
    await updateArticle(currentArticle._id, updatedArticle);
    closeEditArticleModal();
    setArticles(articles.map(article => (article._id === currentArticle._id ? updatedArticle : article)));
  } catch (error) {
    console.error('Error updating article:', error);
  }
};

export const handleDeleteArticle = async (articleId, setArticles, articles) => {
  try {
    await deleteArticle(articleId);
    setArticles(articles.filter(article => article._id !== articleId));
  } catch (error) {
    console.error('Error deleting article:', error);
  }
};

export const handleCreateMenu = async (event, setMenus, menus, closeMenuModal, restaurantId) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const menuData = {
    menu_name: formData.get('name'),
    menu_description: formData.get('description'),
    article_list: formData.getAll('articles'),
    restaurant_id: restaurantId
  };
  

  try {
    const createdMenu = await createMenu(menuData);
    closeMenuModal();
    setMenus([...menus, createdMenu]);
  } catch (error) {
    console.error('Error creating menu:', error);
  }
};

export const handleUpdateMenu = async (event, currentMenu, setMenus, closeEditMenuModal) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const updatedMenu = {
    menu_name: formData.get('name'),
    menu_description: formData.get('description'),
    article_list: formData.getAll('articles')
  };

  try {
    await updateMenu(currentMenu.id, updatedMenu);
    const updatedMenus = await fetchMenus();
    setMenus(updatedMenus);
    closeEditMenuModal();
  } catch (error) {
    console.error('Error updating menu:', error);
  }
};

export const handleDeleteMenu = async (menuId, setMenus, menus) => {
  try {
    await deleteMenu(menuId);
    setMenus(menus.filter(menu => menu.id !== menuId));
  } catch (error) {
    console.error('Error deleting menu:', error);
  }
};