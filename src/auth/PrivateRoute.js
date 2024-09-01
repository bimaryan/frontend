import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
    const token = localStorage.getItem('token');
    const roleId = localStorage.getItem('role_id');

    if (!token || !allowedRoles.includes(roleId)) {
        return <Navigate to="/login" />;
    }

    return element;
};

ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
    allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
