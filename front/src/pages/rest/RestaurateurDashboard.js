import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import '../../style/rest/dashboard.css';
import { fetchArticles, fetchArticlesbyRestaurant } from '../../scripts/rest/fetchArticles';
import { fetchMenus, fetchMenusbyRestaurant } from '../../scripts/rest/fetchMenus';
import fetchWorkers from '../../scripts/rest/fetchWorkers';

import {
  handleCreateArticle,
  handleUpdateArticle,
  handleDeleteArticle,
  handleCreateMenu,
  handleUpdateMenu,
  handleDeleteMenu
} from '../../handlers/restDashboardHandlers';

const RestaurateurDashboard = () => {
  const [showMenus, setShowMenus] = useState(true);
  const [showArticles, setShowArticles] = useState(true);
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isEditArticleModalOpen, setIsEditArticleModalOpen] = useState(false);
  const [isEditMenuModalOpen, setIsEditMenuModalOpen] = useState(false);
  const [articles, setArticles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentMenu, setCurrentMenu] = useState(null);
  const [userRestaurant, setUserRestaurant] = useState(null);

  const getUserData = () => {
    try {
      return {
        user_id: localStorage.getItem('user_id'),
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role'),
        telephone: localStorage.getItem('telephone'),
        address: localStorage.getItem('address')
      };
    } catch (error) {
      console.error('Error fetching user data from localStorage', error);
      return null;
    }
  };

  const user = getUserData();

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const articlesData = await fetchArticles();
        setArticles(articlesData);
  
        const menusData = await fetchMenus();
        setMenus(menusData);
  
        const restaurantData = await fetchWorkers(user.user_id);
        if (restaurantData) {
          setUserRestaurant(restaurantData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchAndSetData();
  }, [user.user_id]);
  
  

  const openArticleModal = () => setIsArticleModalOpen(true);
  const closeArticleModal = () => setIsArticleModalOpen(false);

  const openMenuModal = () => setIsMenuModalOpen(true);
  const closeMenuModal = () => setIsMenuModalOpen(false);

  const openEditArticleModal = (article) => {
    setCurrentArticle(article);
    setIsEditArticleModalOpen(true);
  };
  const closeEditArticleModal = () => setIsEditArticleModalOpen(false);

  const openEditMenuModal = (menu) => {
    setCurrentMenu(menu);
    setIsEditMenuModalOpen(true);
  };
  const closeEditMenuModal = () => setIsEditMenuModalOpen(false);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Nom de l'App</h1>
      </header>
      <div className="dashboard-content">
        <div className="left-panel">
          <h2 onClick={() => setShowMenus(!showMenus)} style={{ cursor: 'pointer' }}>
            Menus {showMenus ? '▲' : '▼'}
          </h2>
          {showMenus && (
            <ul className="menu-list">
              {menus.map(menu => {
                const menuPrice = menu.article_list.reduce((total, articleId) => {
                  const article = articles.find(a => a._id === articleId);
                  return total + (article ? article.article_price : 0);
                }, 0) * 0.8; // Applying the 0.8 multiplier

                return (
                  <li key={menu._id}>
                    <p>Nom: {menu.menu_name}</p>
                    <p>Description: {menu.menu_description}</p>
                    <p>Prix: {menuPrice.toFixed(2)} €</p>
                    <p>Articles:</p>
                    <ul>
                      {menu.article_list.map(articleId => {
                        const article = articles.find(a => a._id === articleId);
                        return <li key={articleId}>{article?.article_name}</li>;
                      })}
                    </ul>
                    <button onClick={() => openEditMenuModal(menu)}>Modifier</button>
                    <button onClick={() => handleDeleteMenu(menu._id, setMenus, menus)}>Supprimer</button>
                  </li>
                );
              })}
            </ul>
          )}
          <button onClick={openMenuModal}>Créer un Menu</button>

          <h2 onClick={() => setShowArticles(!showArticles)} style={{ cursor: 'pointer' }}>
            Articles {showArticles ? '▲' : '▼'}
          </h2>
          {showArticles && (
            <ul className="article-list">
              {articles.map(article => (
                <li key={article._id}>
                  {article.article_name} - {article.article_price} €
                  <button onClick={() => openEditArticleModal(article)}>Modifier</button>
                  <button onClick={() => handleDeleteArticle(article._id, setArticles, articles)}>Supprimer</button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={openArticleModal}>Créer un Article</button>
        </div>
        <div className="right-panel">
          <div className="profile-section">
            <h2>Profil</h2>
            <p>Nom: {user.username}</p>
            <p>Email: {user.email}</p>
            {userRestaurant ? (
              <p>Restaurant: {userRestaurant.name}</p>
            ) : (
              <button>Rejoindre un Restaurant</button>
            )}
            <Link to="/rest/profile">Voir le profil</Link>
          </div>
          <div className="recent-orders">
            <h2>Dernières commandes</h2>
            <ul>
              <li>Commande 1 - En cours</li>
              <li>Commande 2 - Livrée</li>
              <li>Commande 3 - Annulée</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <Modal isOpen={isArticleModalOpen} onRequestClose={closeArticleModal}>
        <h2>Créer un Article</h2>
        <form onSubmit={(e) => handleCreateArticle(e, setArticles, articles, closeArticleModal, userRestaurant?.restaurant_id)}>
          <label>
            Nom:
            <input type="text" name="name" required />
          </label>
          <label>
            Description:
            <input type="text" name="description" required />
          </label>
          <label>
            Prix:
            <input type="number" name="price" step="0.01" required />
          </label>
          <label>
            Type:
            <input type="text" name="type" required />
          </label>
          <button type="submit">Créer</button>
          <button type="button" onClick={closeArticleModal}>Annuler</button>
        </form>
      </Modal>

      {/* Edit Article Modal */}
      <Modal isOpen={isEditArticleModalOpen} onRequestClose={closeEditArticleModal}>
        <h2>Modifier un Article</h2>
        <form onSubmit={(e) => handleUpdateArticle(e, currentArticle, setArticles, articles, closeEditArticleModal)}>
          <label>
            Nom:
            <input type="text" name="name" defaultValue={currentArticle?.article_name} required />
          </label>
          <label>
            Description:
            <input type="text" name="description" defaultValue={currentArticle?.article_description} required />
          </label>
          <label>
            Prix:
            <input type="number" name="price" step="0.01" defaultValue={currentArticle?.article_price} required />
          </label>
          <label>
            Type:
            <input type="text" name="type" defaultValue={currentArticle?.article_type} required />
          </label>
          <button type="submit">Modifier</button>
          <button type="button" onClick={closeEditArticleModal}>Annuler</button>
        </form>
      </Modal>

      {/* Menu Modal */}
      <Modal isOpen={isMenuModalOpen} onRequestClose={closeMenuModal}>
        <h2>Créer un Menu</h2>
        <form onSubmit={(e) => handleCreateMenu(e, setMenus, menus, closeMenuModal, userRestaurant?.restaurant_id)}>
          <label>
            Nom:
            <input type="text" name="name" required />
          </label>
          <label>
            Description:
            <input type="text" name="description" required />
          </label>
          <div>
            <label>Articles:</label>
            {articles.map(article => (
              <div key={article._id}>
                <input 
                  type="checkbox" 
                  id={article._id} 
                  value={article._id} 
                  name="articles"
                />
                <label htmlFor={article._id}>{article.article_name}</label>
              </div>
            ))}
          </div>
          <button type="submit">Créer</button>
          <button type="button" onClick={closeMenuModal}>Annuler</button>
        </form>
      </Modal>

      {/* Edit Menu Modal */}
      <Modal isOpen={isEditMenuModalOpen} onRequestClose={closeEditMenuModal}>
        <h2>Modifier un Menu</h2>
        <form onSubmit={(e) => handleUpdateMenu(e, currentMenu, setMenus, closeEditMenuModal)}>
          <label>
            Nom:
            <input type="text" name="name" defaultValue={currentMenu?.menu_name} required />
          </label>
          <label>
            Description:
            <input type="text" name="description" defaultValue={currentMenu?.menu_description} required />
          </label>
          <div>
            <label>Articles:</label>
            {articles.map(article => (
              <div key={article._id}>
                <input 
                  type="checkbox" 
                  id={article._id} 
                  value={article._id} 
                  name="articles"
                  defaultChecked={currentMenu?.article_list.includes(article._id)}
                />
                <label htmlFor={article._id}>{article.article_name}</label>
              </div>
            ))}
          </div>
          <button type="submit">Modifier</button>
          <button type="button" onClick={closeEditMenuModal}>Annuler</button>
        </form>
      </Modal>
    </div>
  );
};

export default RestaurateurDashboard;
