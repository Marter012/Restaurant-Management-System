import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getAccessToken } from "../../services/authStorage.ts";

const ProtectedRoute = () => {
  const location = useLocation();

  const accessToken = getAccessToken();

  if (!accessToken) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;