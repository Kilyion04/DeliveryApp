import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/connection/LoginPage';
import RegisterPage from './pages/connection/RegisterPage';
import ClientDashboard from './pages/client/ClientDashboard';
import RestaurantPage from './pages/client/RestaurantPage';
import DeliveryTrackingPage from './pages/client/DeliveryTrackingPage';
import ClientProfilePage from './pages/client/ClientProfilePage';
import DelivererDashboard from './pages/deliv/DelivererDashboard';
import DelivererProfilePage from './pages/deliv/DelivererProfilePage';
import DeliveryStatsPage from './pages/deliv/DeliveryStatsPage';
import RestaurateurDashboard from './pages/rest/RestaurateurDashboard';
import RestaurateurProfilePage from './pages/rest/RestaurateurProfilePage';
import SalesStatsPage from './pages/rest/SalesStatsPage';

const RoutesComponent = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<LoginPage />} />
      <Route path="/reg" element={<RegisterPage />} />
      <Route path="/cli/dashboard" element={<ClientDashboard />} />
      <Route path="/cli/restaurant/:id" element={<RestaurantPage />} />
      <Route path="/cli/tracking" element={<DeliveryTrackingPage />} />
      <Route path="/cli/profile" element={<ClientProfilePage />} />
      <Route path="/deliv/dashboard" element={<DelivererDashboard />} />
      <Route path="/deliv/profile" element={<DelivererProfilePage />} />
      <Route path="/deliv/stats" element={<DeliveryStatsPage />} />
      <Route path="/rest/dashboard" element={<RestaurateurDashboard />} />
      <Route path="/rest/profile" element={<RestaurateurProfilePage />} />
      <Route path="/rest/stats" element={<SalesStatsPage />} />
    </Routes>
  </Router>
);

export default RoutesComponent;
