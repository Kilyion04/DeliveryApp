import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrders, updateOrder } from '../../scripts/deliv/getOrders'; // Assurez-vous que `updateOrder` est importé
import '../../style/deliv/dashboard.css';

const DelivererDashboard = () => {
  const user = {
    user_id: localStorage.getItem('user_id'),
    username: localStorage.getItem('username'),
    email: localStorage.getItem('email'),
    role: localStorage.getItem('role'),
    telephone: localStorage.getItem('telephone'),
    address: localStorage.getItem('address')
  };

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleAccept = async (order) => {
    try {
      await updateOrder(order._id, {
        delivery_person_name: user.username,
        delivery_person_id: user.user_id,
        delivery_status: 'Accepted'
      });
      setOrders(orders.filter(o => o._id !== order._id));
    } catch (error) {
      console.error('Error accepting order:', error);
    }
  };

  const handleReject = async (order) => {
    try {
      await updateOrder(order._id, {
        delivery_person_ids_refuse: user.user_id,
        delivery_status: 'Rejected'
      });
      setOrders(orders.filter(o => o._id !== order._id));
    } catch (error) {
      console.error('Error rejecting order:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Nom de l'App</h1>
      </header>
      <div className="dashboard-content">
        <div className="left-panel">
          <h2>Livraisons disponibles</h2>
          <ul>
            {orders.map(order => (
              <li key={order._id}>
                <Link to={`/deliv/delivery/${order._id}`}>
                  {order.restaurant_name} - {order.restaurant_address}
                </Link>
                <button onClick={() => handleAccept(order)}>Accepter</button>
                <button onClick={() => handleReject(order)}>Refuser</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-panel">
          <div className="profile-section">
            <h2>Profil</h2>
            <p>Nom: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Rôle: {user.role}</p>
            <p>Téléphone: {user.telephone}</p>
            <p>Adresse: {user.address}</p>
            <Link to="/deliv/profile">Voir le profil</Link>
          </div>
          <div className="recent-deliveries">
            <h2>Dernières livraisons</h2>
            <ul>
              <li>Livraison 1 - En cours</li>
              <li>Livraison 2 - Complétée</li>
              <li>Livraison 3 - Annulée</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelivererDashboard;
