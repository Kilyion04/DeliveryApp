import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticlesbyRestaurant } from '../../scripts/rest/fetchArticles';
import { fetchMenusbyRestaurant } from '../../scripts/rest/fetchMenus';
import placeOrder from '../../scripts/client/postClient';
import '../../style/client/restaurant.css';

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const [articles, setArticles] = useState([]);
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const articlesData = await fetchArticlesbyRestaurant(restaurantId);
        setArticles(articlesData);

        const menusData = await fetchMenusbyRestaurant(restaurantId);
        setMenus(menusData);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, [restaurantId]);

  const addToCart = (item, type) => {
    const key = `${type}-${item._id}`;
    const newCart = { ...cart };
    if (newCart[key]) {
      newCart[key].quantity += 1;
    } else {
      newCart[key] = { ...item, type, quantity: 1 };
    }
    setCart(newCart);

    updateTotalPrice(newCart);
  };

  const updateTotalPrice = (newCart) => {
    const updatedTotalPrice = Object.values(newCart).reduce((acc, item) => {
      return acc + (item.type === 'menu' ? item.menu_price : item.article_price) * item.quantity;
    }, 0);
    setTotalPrice(updatedTotalPrice);
  };

  const handleQuantityChange = (e, key) => {
    const quantity = parseInt(e.target.value);
    if (!isNaN(quantity) && quantity >= 0) {
      const newCart = { ...cart };
      if (quantity === 0) {
        delete newCart[key];
      } else {
        newCart[key].quantity = quantity;
      }
      setCart(newCart);
      updateTotalPrice(newCart);
    }
  };

  const removeFromCart = (key) => {
    const newCart = { ...cart };
    delete newCart[key];
    setCart(newCart);
    updateTotalPrice(newCart);
  };

  const clearCart = () => {
    setCart({});
    setTotalPrice(0);
  };

  const handlePlaceOrder = async () => {
    const userData = {
      user_id: localStorage.getItem('user_id'),
      user_name: localStorage.getItem('username'),
      restaurant_id: parseInt(restaurantId, 10),
      restaurant_name: 'Restaurant Name', // Replace with actual restaurant name
      restaurant_address: 'Restaurant Address', // Replace with actual restaurant address
      order_status: 'Pending',
      order_items: JSON.stringify(cart),
      order_total_amount: totalPrice,
      delivery_status: 'Not Assigned',
      delivery_address: localStorage.getItem('address'),
      delivery_person_name: '',
      delivery_person_id: 0,
      delivery_person_ids_refuse: '',
      delivery_date: null,
      qr_code: 'SomeQRCode' // You might want to generate this dynamically
    };

    try {
      await placeOrder(userData);
      alert('Order placed successfully');
      clearCart();
    } catch (error) {
      alert('Failed to place order');
    }
  };

  return (
    <div className="restaurant-page-container">
      <h1>Menus et Articles</h1>
      <div className="content-section">
        <div className="menus-section">
          <h2>Menus</h2>
          <ul>
            {menus.map((menu) => (
              <li key={menu._id}>
                <h3>{menu.menu_name}</h3>
                <p>{menu.menu_description}</p>
                <p>Prix: {menu.menu_price}€</p>
                <button onClick={() => addToCart(menu, 'menu')}>Ajouter au panier</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="articles-section">
          <h2>Articles</h2>
          <ul>
            {articles.map((article) => (
              <li key={article._id}>
                <h3>{article.article_name}</h3>
                <p>{article.article_description}</p>
                <p>Prix: {article.article_price}€</p>
                <button onClick={() => addToCart(article, 'article')}>Ajouter au panier</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="cart-section">
          <h2>Panier</h2>
          <ul>
            {Object.entries(cart).map(([key, item]) => (
              <li key={key}>
                <p>{item.type === 'menu' ? item.menu_name : item.article_name}</p>
                <p>Prix unitaire: {item.type === 'menu' ? item.menu_price : item.article_price}€</p>
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(e, key)}
                />
                <p>Prix total: {(item.type === 'menu' ? item.menu_price : item.article_price) * item.quantity}€</p>
                <button onClick={() => removeFromCart(key)}>✖</button>
              </li>
            ))}
          </ul>
          <h3>Total: {totalPrice}€</h3>
          {totalPrice > 0 && (
            <>
              <button className="clear-cart-button" onClick={clearCart}>Vider le panier</button>
              <button className="place-order-button" onClick={handlePlaceOrder}>Passer la commande</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
