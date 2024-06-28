import React from 'react';
import { Link } from 'react-router-dom';
import '../../style/connection/login.css';
import { handleLogin } from '../../scripts/loginScript';

const LoginPage = () => {
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-group">
          <label>Password</label>
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
