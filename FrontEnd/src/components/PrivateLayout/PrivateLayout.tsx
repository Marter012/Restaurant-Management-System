import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import AppInitializer from "../../initialization/appInitializer.tsx";

import {
  ensureValidAccessToken,
  startTokenRefresh,
  stopTokenRefresh,
} from "../../services/authRefresh.ts";

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

const PrivateLayout = () => {
  const navigate = useNavigate();

  // Si esta pestaña ya verificó una sesión, no mostramos el loader durante F5.
  const [authReady, setAuthReady] = useState(
    () => sessionStorage.getItem(AUTH_INITIALIZED_KEY) === "true",
  );

  useEffect(() => {
    let mounted = true;

    const initializeSession = async () => {
      try {
        const isValid = await ensureValidAccessToken();

        if (!mounted) {
          return;
        }

        if (!isValid) {
          sessionStorage.removeItem(AUTH_INITIALIZED_KEY);
          sessionStorage.removeItem("app-initialized");
          stopTokenRefresh();

          navigate("/login", {
            replace: true,
          });

          return;
        }

        startTokenRefresh();

        sessionStorage.setItem(AUTH_INITIALIZED_KEY, "true");
        setAuthReady(true);
      } catch {
        if (!mounted) {
          return;
        }

        sessionStorage.removeItem(AUTH_INITIALIZED_KEY);
        sessionStorage.removeItem("app-initialized");
        stopTokenRefresh();

        navigate("/login", {
          replace: true,
        });
      }
    };

    void initializeSession();

    return () => {
      mounted = false;
      stopTokenRefresh();
    };
  }, [navigate]);

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

          <SessionDescription>
            Un momento, por favor.
          </SessionDescription>
        </SessionCard>
      </SessionContainer>
    );
  }

  return (
    <AppInitializer>
      <Outlet />
    </AppInitializer>
  );
};

export default PrivateLayout;
