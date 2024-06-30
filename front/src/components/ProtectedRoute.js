import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, roles }) => {
    const userRole = localStorage.getItem('role');
    if (!userRole || !roles.includes(userRole)) {
        return <Navigate to="/" />;
    }
    return element;
};

export default ProtectedRoute;
