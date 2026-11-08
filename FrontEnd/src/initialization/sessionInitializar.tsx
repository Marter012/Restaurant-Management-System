import { useEffect } from "react";
import { useDispatch } from "react-redux";

import type { AppDispatch } from "../store/store.ts";

import {
  loginUser,
  logoutUser,
  setSessionChecking,
} from "../store/slices/userSlice.ts";

import {
  getMe,
  logout,
} from "../services/authService.ts";

import { getAccessToken } from "../services/authStorage.ts";

interface SessionInitializerProps {
  children: React.ReactNode;
}

const SessionInitializer = ({
  children,
}: SessionInitializerProps) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      dispatch(setSessionChecking(true));

      try {
        const accessToken = getAccessToken();

        if (!accessToken) {
          dispatch(logoutUser());
          return;
        }

        const user = await getMe();

        if (!mounted) {
          return;
        }

        if (user?.id && user.status) {
          dispatch(loginUser());
        } else {
          logout();
          dispatch(logoutUser());
        }
      } catch (error) {
        console.error(
          "Error verificando la sesión:",
          error,
        );

        if (mounted) {
          logout();
          dispatch(logoutUser());
        }
      } finally {
        if (mounted) {
          dispatch(setSessionChecking(false));
        }
      }
    };

    void checkSession();

    return () => {
      mounted = false;
    };
  }, [dispatch]);

  return <>{children}</>;
};

export default SessionInitializer;