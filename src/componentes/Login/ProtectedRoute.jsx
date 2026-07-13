import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

const ProtectedRoute =({ children,rolesPermitidos }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <p className="auth-status">Verificando sesion...</p>;
    }

    if (!user || (rolesPermitidos && !rolesPermitidos.includes(user.rol))) {
        return <Navigate to="/login"/>;
    }

    return children;
}

export default ProtectedRoute;
