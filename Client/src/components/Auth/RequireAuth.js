import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }) => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  console.log(isLoggedIn, role);

  const location = useLocation();

  if (isLoggedIn && allowedRoles.includes(role)) {
    return <Outlet />;
  } else if (isLoggedIn) {
    return <Navigate to="/denied" state={{ from: location }} />;
  } else {
    return <Navigate to="/login" state={{ from: location }} />;
  }
};

export default RequireAuth;
