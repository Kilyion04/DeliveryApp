import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../style/rest/dashboard.css';

const RestaurateurDashboard = () => {
  const [showMenus, setShowMenus] = useState(true);
  const [showArticles, setShowArticles] = useState(true);

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
              <li><Link to="/rest/menu/1">Menu 1</Link></li>
              <li><Link to="/rest/menu/2">Menu 2</Link></li>
              <li><Link to="/rest/menu/3">Menu 3</Link></li>
              <li><Link to="/rest/menu/4">Menu 4</Link></li>
              {/* Ajoutez plus de menus ici */}
            </ul>
          )}
          <h2 onClick={() => setShowArticles(!showArticles)} style={{ cursor: 'pointer' }}>
            Articles {showArticles ? '▲' : '▼'}
          </h2>
          {showArticles && (
            <ul className="article-list">
              <li><Link to="/rest/article/1">Article 1</Link></li>
              <li><Link to="/rest/article/2">Article 2</Link></li>
              <li><Link to="/rest/article/3">Article 3</Link></li>
              <li><Link to="/rest/article/4">Article 4</Link></li>
              {/* Ajoutez plus d'articles ici */}
            </ul>
          )}
        </div>
        <div className="right-panel">
          <div className="profile-section">
            <h2>Profil</h2>
            <p>Nom: John Doe</p>
            <p>Email: john.doe@example.com</p>
            <Link to="/rest/profile">Voir le profil</Link>
          </div>
          <div className="recent-orders">
            <h2>Dernières commandes</h2>
            <ul>
              <li>Commande 1 - En cours</li>
              <li>Commande 2 - Livrée</li>
              <li>Commande 3 - Annulée</li>
              {/* Ajoutez plus de commandes ici */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurateurDashboard;
