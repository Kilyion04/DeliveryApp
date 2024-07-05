import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleRegister } from '../../scripts/registerScript';
import '../../style/connection/register.css';
import AddressAutocomplete from '../../components/autocompleteAdress'; // Adjust the path as necessary

const RegisterPage = () => {
  const [userAddress, setUserAddress] = useState('');
  const [restaurantAddress, setRestaurantAddress] = useState('');
  const [showRestaurantQuestion, setShowRestaurantQuestion] = useState(false);
  const [showRestaurantFields, setShowRestaurantFields] = useState(false);

  const handleRoleChange = (event) => {
    if (event.target.value === 'Restaurateur') {
      setShowRestaurantQuestion(true);
    } else {
      setShowRestaurantQuestion(false);
      setShowRestaurantFields(false);
    }
  };

  const handleRestaurantCheckboxChange = (event) => {
    setShowRestaurantFields(event.target.checked);
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form className="register-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label>Nom</label>
          <input type="text" name="username" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-group">
          <label>Téléphone</label>
          <input type="text" name="telephone" required />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" name="password" required />
        </div>
        <div className="form-group">
          <label>Adresse</label>
          <AddressAutocomplete value={userAddress} onChange={setUserAddress} />
          <input type="hidden" name="address" value={userAddress} />
        </div>
        <div className="form-group">
          <label>Rôle</label>
          <select name="role" required onChange={handleRoleChange}>
            <option value="Client">Client</option>
            <option value="Livreur">Livreur</option>
            <option value="Restaurateur">Restaurateur</option>
          </select>
        </div>
        {showRestaurantQuestion && (
          <div className="form-group">
            <label>Souhaitez-vous créer un restaurant ?</label>
            <input type="checkbox" name="createRestaurant" onChange={handleRestaurantCheckboxChange} />
          </div>
        )}
        {showRestaurantFields && (
          <div className="restaurant-fields">
            <div className="form-group">
              <label>Nom du Restaurant</label>
              <input type="text" name="restaurantName" />
            </div>
            <div className="form-group">
              <label>Description du Restaurant</label>
              <textarea name="restaurantDescription"></textarea>
            </div>
            <div className="form-group">
              <label>Téléphone du Restaurant</label>
              <input type="text" name="restaurantPhone" />
            </div>
            <div className="form-group">
              <label>Email du Restaurant</label>
              <input type="email" name="restaurantEmail" />
            </div>
            <div className="form-group">
              <label>Adresse du Restaurant</label>
              <AddressAutocomplete value={restaurantAddress} onChange={setRestaurantAddress} />
              <input type="hidden" name="restaurantAddress" value={restaurantAddress} />
            </div>
          </div>
        )}
        <button type="submit" className="register-button">Créer un compte</button>
      </form>
      <div className="links">
        <Link to="/" className="login-link">Déjà un compte ?</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
