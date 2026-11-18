import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShieldCheck } from "@phosphor-icons/react";
import type { RootState } from "../../store/store.ts";
import CardLoading from "../CardLoading/CardLoading.tsx";
import { LoadingScreenLayout } from "../LoaginsScreen/LoadingScreenStyles.ts";

const ProtectedRoute = () => {
  const location = useLocation();
  const { isLoginUser, isCheckingSession } = useSelector(
    (state: RootState) => state.user,
  );

  if (isCheckingSession) {
    return (
      <LoadingScreenLayout>
        <CardLoading icon={<ShieldCheck />} text="Verificando tu sesión..." progress={55} />
      </LoadingScreenLayout>
    );
  }

  if (!isLoginUser) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
