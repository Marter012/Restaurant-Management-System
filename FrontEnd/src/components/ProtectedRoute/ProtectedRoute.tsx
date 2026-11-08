import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import type { RootState } from "../../store/store.ts";

import {
  ProtectedLoading,
  ProtectedSpinner,
  ProtectedLoadingText,
} from "./ProtectedRouteStyles.ts";

const ProtectedRoute = () => {
  const location = useLocation();

  const { isLoginUser, isCheckingSession } = useSelector(
    (state: RootState) => state.user,
  );

  // Esperar a que termine la comprobación de sesión.
  if (isCheckingSession) {
    return (
      <ProtectedLoading>
        <ProtectedSpinner />
        <ProtectedLoadingText>
          Verificando tu sesión...
        </ProtectedLoadingText>
      </ProtectedLoading>
    );
  }

  // Si no existe una sesión válida, enviar al login.
  if (!isLoginUser) {
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