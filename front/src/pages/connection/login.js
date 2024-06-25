import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (userType) => {
    navigate(`/${userType}/dashboard`);
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <div className="buttons">
          <button type="button" onClick={() => handleLogin('cli')}>Login as Client</button>
          <button type="button" onClick={() => handleLogin('del')}>Login as Deliv</button>
          <button type="button" onClick={() => handleLogin('rest')}>Login as Rest</button>
        </div>
      </form>
      <p>Don't have an account? <Link to="/reg">Register</Link></p>
    </div>
  );
};

export default Login;
