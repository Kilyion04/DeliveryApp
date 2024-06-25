import React from 'react';
import { Link } from 'react-router-dom';
import './register.css';

const Register = () => {
  return (
    <div className="register">
      <h1>Register</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmPassword" />
        </label>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/log">Login</Link></p>
    </div>
  );
};

export default Register;
