import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaShieldAlt } from "react-icons/fa";

import type { AppDispatch, RootState } from "../../store/store.ts";
import AppInitializer from "../../initialization/appInitializer.tsx";
import {
  ensureValidAccessToken,
  startTokenRefresh,
  stopTokenRefresh,
} from "../../services/authRefresh.ts";
import { getMe } from "../../services/authService.ts";
import {
  setMustChangeCredentials,
  logoutUser,
  loginUser,
} from "../../store/slices/userSlice.ts";
import NavBar from "../NavBar/NavBar.tsx";
import ModalForm from "../ModalForm/ModalForm.tsx";

import {
  SessionContainer,
  SessionCard,
  SessionLogo,
  SessionTitle,
  SessionDescription,
  SpinnerContainer,
  Spinner,
} from "./PrivateLayoutStyles.ts";

const AUTH_INITIALIZED_KEY = "auth-initialized";

interface CurrentUserResponse {
  must_change_credentials?: boolean;
}

const PrivateLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const mustChangeCredentials = useSelector(
    (state: RootState) => state.user.mustChangeCredentials,
  );

  const [authReady, setAuthReady] = useState(false);
  const [showCredentialNotice, setShowCredentialNotice] = useState(false);

  useEffect(() => {
    if (!mustChangeCredentials) {
      setShowCredentialNotice(false);
    }
  }, [mustChangeCredentials]);

  useEffect(() => {
    let mounted = true;

    const initializeSession = async () => {
      try {
        const isValid = await ensureValidAccessToken();

        if (!mounted) return;

        if (!isValid) {
          dispatch(logoutUser());
          sessionStorage.removeItem(AUTH_INITIALIZED_KEY);
          sessionStorage.removeItem("app-initialized");
          stopTokenRefresh();
          navigate("/login", { replace: true });
          return;
        }

        const currentUser = (await getMe()) as CurrentUserResponse;
        if (!mounted) return;

        const pending = Boolean(currentUser.must_change_credentials);
        dispatch(loginUser());
        dispatch(setMustChangeCredentials(pending));
        setShowCredentialNotice(pending);

        startTokenRefresh();
        sessionStorage.setItem(AUTH_INITIALIZED_KEY, "true");
        setAuthReady(true);
      } catch (error) {
        console.error("Error inicializando la sesión privada:", error);
        if (!mounted) return;

        dispatch(logoutUser());
        sessionStorage.removeItem(AUTH_INITIALIZED_KEY);
        sessionStorage.removeItem("app-initialized");
        stopTokenRefresh();
        navigate("/login", { replace: true });
      }
    };

    void initializeSession();

    return () => {
      mounted = false;
      stopTokenRefresh();
    };
  }, [dispatch, navigate]);

  useEffect(() => {
    if (
      authReady &&
      mustChangeCredentials &&
      location.pathname !== "/settings"
    ) {
      navigate("/settings", {
        replace: true,
        state: { section: "users", forceCredentialUpdate: true },
      });
    }
  }, [authReady, mustChangeCredentials, location.pathname, navigate]);

  if (!authReady) {
    return (
      <SessionContainer>
        <SessionCard>
          <SessionLogo>BS</SessionLogo>
          <SessionTitle>Boutique de Sabores</SessionTitle>
          <SessionDescription>
            Estamos preparando todo para vos
          </SessionDescription>
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
          <span>Verificando tu sesión...</span>
          <SessionDescription>Un momento, por favor.</SessionDescription>
        </SessionCard>
      </SessionContainer>
    );
  }

  if (mustChangeCredentials && location.pathname !== "/settings") {
    return (
      <Navigate
        to="/settings"
        replace
        state={{ section: "users", forceCredentialUpdate: true }}
      />
    );
  }

  return (
    <AppInitializer>
      {!mustChangeCredentials && <NavBar />}
      <Outlet />
      <ModalForm
        isOpen={showCredentialNotice}
        title="Actualización de seguridad obligatoria"
        description="Antes de utilizar el sistema, necesitás actualizar las credenciales iniciales."
        icon={<FaShieldAlt />}
        onClose={() => {
          setShowCredentialNotice(false);
          navigate("/settings", {
            replace: true,
            state: { section: "users", forceCredentialUpdate: true },
          });
        }}
        closeOnOverlayClick={false}
        closeOnEscape={false}
        size="compact"
        footerActions={
          <button
            type="button"
            onClick={() => {
              setShowCredentialNotice(false);
              navigate("/settings", {
                replace: true,
                state: { section: "users", forceCredentialUpdate: true },
              });
            }}
          >
            Ir a actualizar credenciales
          </button>
        }
      >
        <p>
          La cuenta administradora inicial todavía utiliza las credenciales
          predeterminadas. Para proteger el acceso, cambiá tu email y establecé
          una contraseña nueva.
        </p>
      </ModalForm>
    </AppInitializer>
  );
};

export default PrivateLayout;
