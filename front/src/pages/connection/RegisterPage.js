import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/connection/register.css';
import { handleRegister } from '../../scripts/registerScript';

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
          <label>Mot de passe</label>
          <input type="password" name="password" required />
        </div>
        <div className="form-group">
          <label>Rôle</label>
          <select name="role" required>
            <option value="client">Client</option>
            <option value="livreur">Livreur</option>
            <option value="restaurateur">Restaurateur</option>
          </select>
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
