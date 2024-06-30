import React from 'react';
import { Link } from 'react-router-dom';
import { handleRegister } from '../../scripts/registerScript';
import '../../style/connection/register.css';

const RegisterPage = () => {
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
          <label>Rôle</label>
          <select name="role" required>
            <option value="Client">Client</option>
            <option value="Livreur">Livreur</option>
            <option value="Restaurateur">Restaurateur</option>
          </select>
        </div>
        <div className="form-group">
          <label>Numéro de rue</label>
          <input type="text" name="address_num" required />
        </div>
        <div className="form-group">
          <label>Complément d'adresse</label>
          <input type="text" name="address_complement" />
        </div>
        <div className="form-group">
          <label>Rue</label>
          <input type="text" name="address_street" required />
        </div>
        <div className="form-group">
          <label>Quartier</label>
          <input type="text" name="address_neighbor" />
        </div>
        <div className="form-group">
          <label>Ville</label>
          <input type="text" name="address_city" required />
        </div>
        <div className="form-group">
          <label>Code postal</label>
          <input type="text" name="address_postal_code" required />
        </div>
        <div className="form-group">
          <label>Département</label>
          <input type="text" name="address_departement" required />
        </div>
        <div className="form-group">
          <label>Région</label>
          <input type="text" name="address_region" required />
        </div>
        <div className="form-group">
          <label>Pays</label>
          <input type="text" name="address_country" required />
        </div>
        <button type="submit" className="register-button">Créer un compte</button>
      </form>
      <div className="links">
        <Link to="/" className="login-link">Déjà un compte ?</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
