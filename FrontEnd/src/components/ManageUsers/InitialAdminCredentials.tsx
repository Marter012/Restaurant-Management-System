import { useEffect, useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaLock, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

import type { AppDispatch } from "../../store/store.ts";
import { getMe } from "../../services/authService.ts";
import { updateUserAPI } from "../../services/userService.ts";
import { setMustChangeCredentials } from "../../store/slices/userSlice.ts";
import { getAxiosErrorMessage } from "../Utils/ErrorAxios.tsx";
import ModalForm from "../ModalForm/ModalForm.tsx";

import {
  InitialCredentialsCard,
  InitialCredentialsInfo,
  InitialCredentialsInfoIcon,
  InitialCredentialsInfoText,
  InitialCredentialsForm,
  InitialCredentialsGrid,
  InitialCredentialsGroup,
  InitialCredentialsLabel,
  InitialCredentialsInput,
  InitialCredentialsButton,
  InitialCredentialsError,
  InitialCredentialsSuccess,
  InitialCredentialsLoading,
} from "./ManageUserStyles.ts";

interface CurrentUser {
  id: string;
  username: string;
  email: string;
  must_change_credentials?: boolean;
}

const InitialAdminCredentials = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    void getMe()
      .then((user) => {
        if (!mounted) return;

        const profile = user as CurrentUser;

        setCurrentUser(profile);
        setEmail(profile.email ?? "");
      })
      .catch((requestError) => {
        if (mounted) {
          setError(
            getAxiosErrorMessage(
              requestError,
              "No se pudo cargar el administrador.",
            ),
          );
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!currentUser || saving) return;

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError("El email es obligatorio.");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      await updateUserAPI(currentUser.id, {
        email: normalizedEmail,
        password,
      });

      setSuccess("Las credenciales se actualizaron correctamente.");

      window.setTimeout(() => {
        dispatch(setMustChangeCredentials(false));
        navigate("/", { replace: true });
      }, 900);
    } catch (requestError) {
      setError(
        getAxiosErrorMessage(
          requestError,
          "No se pudieron actualizar las credenciales.",
        ),
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <ModalForm
      isOpen={!loading}
      title="Protegé tu cuenta administradora"
      description="Actualizá tus credenciales para habilitar el acceso al sistema."
      icon={<FaShieldAlt />}
      onClose={() => {}}
      size="small"
      closeOnOverlayClick={false}
      closeOnEscape={false}
      showCloseButton={false}
      showCancelButton={false}
    >
      {loading ? (
        <InitialCredentialsLoading>
          Cargando datos de la cuenta...
        </InitialCredentialsLoading>
      ) : (
        <InitialCredentialsCard>
          <InitialCredentialsInfo>
            <InitialCredentialsInfoIcon>
              <FaShieldAlt />
            </InitialCredentialsInfoIcon>

            <InitialCredentialsInfoText>
              <strong>Credenciales de acceso</strong>
              <span>
                Los dos datos deben actualizarse en esta misma operación.
              </span>
            </InitialCredentialsInfoText>
          </InitialCredentialsInfo>

          {error && <InitialCredentialsError>{error}</InitialCredentialsError>}

          {success && (
            <InitialCredentialsSuccess>
              <FaCheckCircle />
              <span>{success}</span>
            </InitialCredentialsSuccess>
          )}

          {currentUser && (
            <InitialCredentialsForm onSubmit={handleSubmit}>
              <InitialCredentialsGrid>
                <InitialCredentialsGroup>
                  <InitialCredentialsLabel htmlFor="initial-admin-email">
                    Nuevo email
                  </InitialCredentialsLabel>

                  <InitialCredentialsInput
                    id="initial-admin-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Ingresá tu nuevo email"
                    required
                    disabled={saving}
                  />
                </InitialCredentialsGroup>

                <InitialCredentialsGroup>
                  <InitialCredentialsLabel htmlFor="initial-admin-password">
                    Nueva contraseña
                  </InitialCredentialsLabel>

                  <InitialCredentialsInput
                    id="initial-admin-password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Mínimo 6 caracteres"
                    minLength={6}
                    required
                    disabled={saving}
                  />
                </InitialCredentialsGroup>

                <InitialCredentialsGroup $fullWidth>
                  <InitialCredentialsLabel htmlFor="initial-admin-confirm-password">
                    Confirmar contraseña
                  </InitialCredentialsLabel>

                  <InitialCredentialsInput
                    id="initial-admin-confirm-password"
                    type="password"
                    autoComplete="new-password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Repetí tu nueva contraseña"
                    required
                    disabled={saving}
                  />
                </InitialCredentialsGroup>
              </InitialCredentialsGrid>

              <InitialCredentialsButton type="submit" disabled={saving}>
                <FaLock />
                {saving
                  ? "Actualizando credenciales..."
                  : "Actualizar credenciales"}
              </InitialCredentialsButton>
            </InitialCredentialsForm>
          )}
        </InitialCredentialsCard>
      )}
    </ModalForm>
  );
};

export default InitialAdminCredentials;
