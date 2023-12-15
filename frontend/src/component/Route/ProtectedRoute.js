import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  console.log("COMPONENT : ",isAdmin)
  if (loading) {
    // You might want to handle the loading state here, e.g., display a loader
    return <Outlet />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  // return <Route {...rest} path={path} element={<Component />} />;
  return children;
};

ProtectedRoute.defaultProps = {
  isAdmin: false,
};

export default ProtectedRoute;
