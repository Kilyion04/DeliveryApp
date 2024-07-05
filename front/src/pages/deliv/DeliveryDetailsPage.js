import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../scripts/deliv/getOrderbyId';
import '../../style/deliv/details.css';

const DeliveryDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  let orderItems = [];
  try {
    orderItems = JSON.parse(order.order_items);
    if (!Array.isArray(orderItems)) {
      throw new Error("order_items is not an array");
    }
  } catch (error) {
    console.error('Error parsing order items:', error);
    orderItems = [];
  }

  return (
    <div className="details-container">
      <h1>Détails de la Livraison</h1>
      <p><strong>Restaurant:</strong> {order.restaurant_name}</p>
      <p><strong>Adresse:</strong> {order.restaurant_address}</p>
      <p><strong>Date de commande:</strong> {new Date(order.order_date).toLocaleString()}</p>
      <p><strong>Statut de la commande:</strong> {order.order_status}</p>
      <h2>Articles Commandés</h2>
      <ul>
        {orderItems.map((item, index) => (
          <li key={index}>{item.name} - Quantité: {item.quantity}</li>
        ))}
      </ul>
      <h3>Total: {order.order_total_amount}€</h3>
    </div>
  );
};

export default DeliveryDetailsPage;
