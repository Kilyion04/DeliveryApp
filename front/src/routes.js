import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DelivererDashboard from './pages/deliv/DelivererDashboard';
import DelivererProfilePage from './pages/deliv/DelivererProfilePage';
import DeliveryStatsPage from './pages/deliv/DeliveryStatsPage';
import ClientDashboard from './pages/client/ClientDashboard';
import ClientProfilePage from './pages/client/ClientProfilePage';
import RestaurantPage from './pages/client/RestaurantPage';
import RestaurantTrackingPage from './pages/rest/RestaurantTrackingPage';
import RestaurateurDashboard from './pages/rest/RestaurateurDashboard';
import RestaurateurProfilePage from './pages/rest/RestaurateurProfilePage';
import SalesStatsPage from './pages/rest/SalesStatsPage';
import LoginPage from './pages/connection/LoginPage';
import RegisterPage from './pages/connection/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';

const RoutesComponent = () => (
    <Router>
        <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/reg" element={<RegisterPage />} />
            <Route path="/cli/dashboard" element={<ProtectedRoute roles={['client']} element={<ClientDashboard />} />} />
            <Route path="/cli/restaurant/:id" element={<ProtectedRoute roles={['client']} element={<RestaurantPage />} />} />
            <Route path="/cli/tracking" element={<ProtectedRoute roles={['client']} element={<RestaurantTrackingPage />} />} />
            <Route path="/cli/profile" element={<ProtectedRoute roles={['client']} element={<ClientProfilePage />} />} />
            <Route path="/deliv/dashboard" element={<ProtectedRoute roles={['deliverer']} element={<DelivererDashboard />} />} />
            <Route path="/deliv/profile" element={<ProtectedRoute roles={['deliverer']} element={<DelivererProfilePage />} />} />
            <Route path="/deliv/stats" element={<ProtectedRoute roles={['deliverer']} element={<DeliveryStatsPage />} />} />
            <Route path="/rest/dashboard" element={<ProtectedRoute roles={['restaurateur']} element={<RestaurateurDashboard />} />} />
            <Route path="/rest/profile" element={<ProtectedRoute roles={['restaurateur']} element={<RestaurateurProfilePage />} />} />
            <Route path="/rest/stats" element={<ProtectedRoute roles={['restaurateur']} element={<SalesStatsPage />} />} />
        </Routes>
    </Router>
);

export default RoutesComponent;
