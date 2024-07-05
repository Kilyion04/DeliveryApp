import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DelivererDashboard from './pages/deliv/DelivererDashboard';
import DelivererProfilePage from './pages/deliv/DelivererProfilePage';
import DeliveryDetailsPage from './pages/deliv/DeliveryDetailsPage';
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
            <Route path="/cli/dashboard" element={<ProtectedRoute roles={['Client']} element={<ClientDashboard />} />} />
            <Route path="/client/restaurant/:restaurantId" element={<ProtectedRoute roles={['Client']} element={<RestaurantPage />} />} />
            <Route path="/cli/tracking" element={<ProtectedRoute roles={['Client']} element={<RestaurantTrackingPage />} />} />
            <Route path="/cli/profile" element={<ProtectedRoute roles={['Client']} element={<ClientProfilePage />} />} />
            <Route path="/deliv/dashboard" element={<ProtectedRoute roles={['Deliverer', 'Livreur']} element={<DelivererDashboard />} />} />
            <Route path="/deliv/profile" element={<ProtectedRoute roles={['Deliverer', 'Livreur']} element={<DelivererProfilePage />} />} />
            <Route path="/deliv/stats" element={<ProtectedRoute roles={['Deliverer', 'Livreur']} element={<DeliveryStatsPage />} />} />
            <Route path="/deliv/delivery/:orderId" element={<ProtectedRoute roles={['Deliverer', 'Livreur']} element={<DeliveryDetailsPage />} />} />
            <Route path="/rest/dashboard" element={<ProtectedRoute roles={['Restaurateur']} element={<RestaurateurDashboard />} />} />
            <Route path="/rest/profile" element={<ProtectedRoute roles={['Restaurateur']} element={<RestaurateurProfilePage />} />} />
            <Route path="/rest/stats" element={<ProtectedRoute roles={['Restaurateur']} element={<SalesStatsPage />} />} />
        </Routes>
    </Router>
);

export default RoutesComponent;
