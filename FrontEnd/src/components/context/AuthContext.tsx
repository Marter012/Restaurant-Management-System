import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import {
  login as loginService,
  getMe,
} from "../../services/authService";

import {
  setAccessToken,
} from "../../components/Auth/token.ts";

import type {
  User,
} from "../../services/authService";

interface AuthContextType {
  accessToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps) => {
  const [accessToken, setAccessTokenState] =
    useState<string | null>(null);

  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(false);

  const login = async (
    username: string,
    password: string
  ): Promise<void> => {
    setLoading(true);

    try {
      const data = await loginService(
        username,
        password
      );

      // Access token solamente en memoria
      setAccessTokenState(data.access_token);
      setAccessToken(data.access_token);

      // Refresh token solamente durante la sesión/pestaña
      sessionStorage.setItem(
        "refresh_token",
        data.refresh_token
      );

      // Obtener información del usuario autenticado
      const currentUser = await getMe();

      setUser(currentUser);
    } catch (error) {
      // Si el login falla, limpiamos cualquier token
      setAccessTokenState(null);
      setAccessToken(null);
      setUser(null);

      sessionStorage.removeItem("refresh_token");

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = (): void => {
    setAccessTokenState(null);
    setAccessToken(null);
    setUser(null);

    sessionStorage.removeItem("refresh_token");
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        isAuthenticated: !!accessToken,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth debe utilizarse dentro de AuthProvider"
    );
  }

  return context;
};