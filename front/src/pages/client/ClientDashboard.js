import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/client/dashboard.css';

const ClientDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Nom de l'App</h1>
      </header>
      <div className="dashboard-content">
        <div className="left-panel">
          <h2>Restaurants aux alentours</h2>
          <ul>
            <li><Link to="/client/restaurant/1">Restaurant 1</Link></li>
            <li><Link to="/client/restaurant/2">Restaurant 2</Link></li>
            <li><Link to="/client/restaurant/3">Restaurant 3</Link></li>
            {/* Ajoutez plus de restaurants ici */}
          </ul>
        </div>
        <div className="right-panel">
          <div className="profile-section">
            <h2>Profil</h2>
            <p>Nom: John Doe</p>
            <p>Email: john.doe@example.com</p>
            <Link to="/cli/profile">Voir le profil</Link>
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

export default ClientDashboard;
