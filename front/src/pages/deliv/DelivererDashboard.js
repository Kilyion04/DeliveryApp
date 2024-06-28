import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/deliv/dashboard.css';

const DelivererDashboard = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Nom de l'App</h1>
      </header>
      <div className="dashboard-content">
        <div className="left-panel">
          <h2>Livraisons disponibles</h2>
          <ul>
            <li><Link to="/deliverer/delivery/1">Livraison 1</Link></li>
            <li><Link to="/deliverer/delivery/2">Livraison 2</Link></li>
            <li><Link to="/deliverer/delivery/3">Livraison 3</Link></li>
            {/* Ajoutez plus de livraisons ici */}
          </ul>
        </div>
        <div className="right-panel">
          <div className="profile-section">
            <h2>Profil</h2>
            <p>Nom: John Doe</p>
            <p>Email: john.doe@example.com</p>
            <Link to="/deliverer/profile">Voir le profil</Link>
          </div>
          <div className="recent-deliveries">
            <h2>Dernières livraisons</h2>
            <ul>
              <li>Livraison 1 - En cours</li>
              <li>Livraison 2 - Complétée</li>
              <li>Livraison 3 - Annulée</li>
              {/* Ajoutez plus de livraisons ici */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelivererDashboard;
