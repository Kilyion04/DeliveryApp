import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ClientDashboard from './pages/client/dashboard';
import ClientProfile from './pages/client/profile';
import DelivDashboard from './pages/deliv/dashboard';
import DelivProfile from './pages/deliv/profile';
import RestDashboard from './pages/rest/dashboard';
import RestProfile from './pages/rest/profile';
import Login from './pages/connection/login';
import Register from './pages/connection/register';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/cli/dashboard" element={<ClientDashboard />} />
        <Route path="/cli/profile" element={<ClientProfile />} />
        <Route path="/del/dashboard" element={<DelivDashboard />} />
        <Route path="/del/profile" element={<DelivProfile />} />
        <Route path="/rest/dashboard" element={<RestDashboard />} />
        <Route path="/rest/profile" element={<RestProfile />} />
        <Route path="/log" element={<Login />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="*" element={<h1>Page not found</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
