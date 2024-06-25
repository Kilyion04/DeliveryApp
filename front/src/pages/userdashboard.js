import React from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';

const Dashboard = ({ userType }) => {
  return (
    <div className="dashboard">
      <h1>{userType} Dashboard</h1>
      <nav>
        <ul>
          <li><Link to={`/${userType}/profile`}>Profile</Link></li>
          {/* Ajoutez d'autres liens de navigation si nécessaire */}
        </ul>
      </nav>
    </div>
  );
};

export default Dashboard;
