import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import {
  LoginContainer,
  LoginCard,
  LoginLogo,
  LoginTitle,
  LoginSubtitle,
  LoginForm,
  LoginLabel,
  LoginInput,
  LoginButton,
  LoginError,
} from "./LoginStyles.ts";

import { getAxiosErrorMessage } from "../../Utils/ErrorAxios.tsx";
import { login } from "../../../services/authService.ts";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../store/store.ts";
import { loginUser } from "../../../store/slices/userSlice.ts";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await login(username, password);

      if (response) {
        dispatch(loginUser());
      }

      navigate("/", { replace: true });
    } catch (error) {
      setError(getAxiosErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <LoginCard>
        <LoginLogo>BS</LoginLogo>

        <LoginTitle>Boutique de Sabores</LoginTitle>

        <LoginSubtitle>Acceso exclusivo para administradores</LoginSubtitle>

        <LoginForm onSubmit={handleSubmit}>
          <LoginLabel htmlFor="username">Usuario</LoginLabel>

          <LoginInput
            id="username"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
              setError("");
            }}
            placeholder="Ingresá tu usuario"
            autoComplete="username"
            autoFocus
          />

          <LoginLabel htmlFor="password">Contraseña</LoginLabel>

          <div className="passwordShow">
            <LoginInput
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              placeholder="Ingresá tu contraseña"
              autoComplete="current-password"
            />
            {showPassword ? (
              <IoEyeSharp onClick={() => setShowPassword(false)} />
            ) : (
              <FaEyeSlash onClick={() => setShowPassword(true)} />
            )}
          </div>

          {error && <LoginError>{error}</LoginError>}

          <LoginButton type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </LoginButton>
        </LoginForm>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
