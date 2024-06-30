import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../style/client/dashboard.css';

const ClientDashboard = () => {
  const [user, setUser] = useState(null);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const userData = {
      user_id: localStorage.getItem('user_id'),
      username: localStorage.getItem('username'),
      email: localStorage.getItem('email'),
      role: localStorage.getItem('role'),
      telephone: localStorage.getItem('telephone'),
      address: localStorage.getItem('address'),
      city: localStorage.getItem('city'), // Assurez-vous que 'city' est récupéré
    };
    setUser(userData);
  }, []);

  useEffect(() => {
    if (user && user.city) {
      axios.get(`http://localhost:3006/ms_rests/city/${user.city}`)
        .then(response => setRestaurants(response.data))
        .catch(error => console.error('Error fetching restaurants:', error));
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Nom de l'App</h1>
      </header>
      <div className="dashboard-content">
        <div className="left-panel">
          <h2>Restaurants aux alentours</h2>
          <ul>
            {restaurants.map((restaurant) => (
              <li key={restaurant.restaurant_id}>
                <Link to={`/client/restaurant/${restaurant.restaurant_id}`}>{restaurant.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-panel">
          <div className="profile-section">
            <h2>Profil</h2>
            <p>Nom: {user.username}</p>
            <p>Email: {user.email}</p>
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
