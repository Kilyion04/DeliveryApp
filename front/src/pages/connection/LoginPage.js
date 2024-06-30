import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import handleLogin from '../../scripts/loginScript';
import '../../style/connection/login.css';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1>Se connecter</h1>
      <form className="login-form" onSubmit={(e) => handleLogin(e, navigate)}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-group">
          <label>Mot de passe</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit" className="login-button">Se connecter</button>
      </form>
      <div className="links">
        <Link to="/reg" className="register-link">Pas encore inscrit ?</Link>
      </div>
    </div>
  );
};

export default LoginPage;
