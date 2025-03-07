import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import LoadingSpinner from "./LoadingSpinner";
import PropTypes from "prop-types";

const ProtectedRoute = ({ admin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuthStore();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (admin && !isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

ProtectedRoute.PropTypes = { admin: PropTypes.bool };

export default ProtectedRoute;
