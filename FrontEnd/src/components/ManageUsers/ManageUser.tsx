import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import {
  FaCheck,
  FaCheckCircle,
  FaChevronRight,
  FaChevronLeft,
  FaEnvelope,
  FaLock,
  FaPaperPlane,
  FaShieldAlt,
  FaTimes,
  FaUser,
  FaUserEdit,
  FaUserSlash,
  FaPlus,
} from "react-icons/fa";

import { RiUserAddFill } from "react-icons/ri";

import {
  getUsersAPI,
  updateUserAPI,
  type SystemUser,
} from "../../services/userService.ts";

import {
  ForgotPassword,
  VerifyCode,
  ResetPassword,
  GetResetStatus,
  type ResetStatus,
} from "../../services/authService.ts";

import { getAxiosErrorMessage } from "../Utils/ErrorAxios.tsx";

import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

import {
  ModalContainer,
  ModalHeader,
  ModalHeaderInfo,
  ModalTitle,
  ModalSubtitle,
  CloseButton,
  ModalContent,
  Filters,
  FilterButton,
  MainLayout,
  UsersPanel,
  UsersPanelHeader,
  UsersPanelActions,
  CreateUserButton,
  UsersPanelTitle,
  UsersPanelSubtitle,
  UsersList,
  UserRow,
  UserAvatar,
  UserMain,
  UserName,
  UserEmail,
  UserMeta,
  UserRole,
  UserStatus,
  SelectedIndicator,
  EmptyState,
  EditorPanel,
  EditorHeader,
  EditorUser,
  EditorAvatar,
  EditorUserInfo,
  EditorUserName,
  EditorUserRole,
  Section,
  SectionHeader,
  SectionIcon,
  SectionTitle,
  SectionDescription,
  FormGrid,
  FormGroup,
  Label,
  Input,
  Select,
  SecurityCard,
  SecurityHeader,
  SecurityIcon,
  SecurityText,
  SecurityTitle,
  SecurityDescription,
  SecuritySteps,
  SecurityStep,
  SecurityStepNumber,
  SecurityStepText,
  SendCodeButton,
  CodeArea,
  CodeHeader,
  CodeStatus,
  CodeInputs,
  CodeInput,
  VerifyCodeButton,
  ResendButton,
  SecuritySuccess,
  PasswordArea,
  PasswordInput,
  PasswordState,
  PasswordStateIcon,
  PasswordStateText,
  StatusCard,
  StatusIcon,
  StatusContent,
  StatusTitle,
  StatusDescription,
  StatusArrow,
  EditorFooter,
  CancelButton,
  SaveButton,
  LoadingState,
  ErrorMessage,
  SuccessMessage,
  ContainerSectionInfo,
} from "./ManageUserStyles.ts";
import UserForm from "../Forms/UserForm/UserForm.tsx";
import { Portal } from "../Portal/Portal.tsx";

interface ManageUserProps {
  isOpen: boolean;
  onClose: () => void;
}

type StatusFilter = "all" | "active" | "inactive";

type SecurityStep =
  | "idle"
  | "sending"
  | "code-sent"
  | "verifying"
  | "verified"
  | "changing";

const SELECTED_USER_STORAGE_KEY = "boutique-selected-user";

const ManageUser = ({ isOpen, onClose }: ManageUserProps) => {
  const [isMobile, setIsMobile] = useState(false);

  const [users, setUsers] = useState<SystemUser[]>([]);

  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [selectedUser, setSelectedUser] = useState<SystemUser | null>(null);

  const [isCreatingUser, setIsCreatingUser] = useState(false);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(true);

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [securityStep, setSecurityStep] = useState<SecurityStep>("idle");

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingResetStatus, setLoadingResetStatus] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);

  const codeInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const editorPanelRef = useRef<HTMLElement>(null);

  const scrollToUserEditor = (_editor: "create" | "edit") => {
    // El editor ahora tiene su propio scroll, independiente del listado.
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        editorPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  };

  const scrollModalToTop = () => {
    window.requestAnimationFrame(() => {
      editorPanelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    });
  };

  /*
   * ---------------------------------------------------------
   * RESTAURAR USUARIO SELECCIONADO
   * ---------------------------------------------------------
   */

  const saveSelectedUser = (user: SystemUser) => {
    localStorage.setItem(
      SELECTED_USER_STORAGE_KEY,
      JSON.stringify({
        id: user.id,
        email: user.email,
      }),
    );
  };

  const clearSelectedUserStorage = () => {
    localStorage.removeItem(SELECTED_USER_STORAGE_KEY);
  };

  /*
   * ---------------------------------------------------------
   * RESET SECURITY
   * ---------------------------------------------------------
   */

  const resetSecurity = () => {
    setCode("");
    setPassword("");
    setSecurityStep("idle");
    setShowPassword(false);
  };

  const applyResetStatus = (resetStatus: ResetStatus) => {
    switch (resetStatus) {
      case "pending":
        setCode("");
        setPassword("");
        setSecurityStep("code-sent");

        setError(null);

        setSuccess(
          "Hay un código de recuperación pendiente. Ingresá el código recibido por email.",
        );

        break;

      case "verified":
        setCode("");
        setPassword("");
        setSecurityStep("idle");
        setShowPassword(false);

        setError(null);

        setSuccess(
          "La verificación anterior quedó abierta, pero por seguridad necesitás solicitar un nuevo código.",
        );

        break;

      case "completed":
        setSecurityStep("idle");

        setCode("");
        setPassword("");
        setShowPassword(false);

        setError(null);

        setSuccess("El proceso de recuperación ya fue completado.");

        break;

      case "expired":
        setSecurityStep("idle");

        setCode("");
        setPassword("");
        setShowPassword(false);

        setError("El código de recuperación expiró. Solicitá uno nuevo.");

        break;

      case "none":
      default:
        setSecurityStep("idle");

        setCode("");
        setPassword("");
        setShowPassword(false);

        break;
    }
  };

  /*
   * ---------------------------------------------------------
   * CONSULTAR ESTADO DE RECUPERACIÓN
   * ---------------------------------------------------------
   */

  const loadResetStatus = async (userEmail: string) => {
    if (!userEmail.trim()) {
      return;
    }

    try {
      setLoadingResetStatus(true);

      const resetStatus = await GetResetStatus(userEmail.trim());

      applyResetStatus(resetStatus);
    } catch (error) {
      console.error("Error consultando estado de recuperación:", error);

      setError(
        getAxiosErrorMessage(error) ||
          "No se pudo consultar el estado de recuperación.",
      );

      setSecurityStep("idle");
    } finally {
      setLoadingResetStatus(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * CARGAR USUARIOS
   * ---------------------------------------------------------
   */

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getUsersAPI();

      setUsers(data);

      /*
       * Intentamos restaurar el usuario seleccionado
       * antes de recargar la página.
       */

      const storedUser = localStorage.getItem(SELECTED_USER_STORAGE_KEY);

      if (storedUser) {
        try {
          const parsed = JSON.parse(storedUser) as {
            id?: string;
            email?: string;
          };

          const restoredUser = data.find((user) => user.id === parsed.id);

          if (restoredUser) {
            setSelectedUser(restoredUser);

            setUsername(restoredUser.username);

            setRole(restoredUser.role);

            setEmail(restoredUser.email);

            setStatus(restoredUser.status);

            await loadResetStatus(restoredUser.email);
          } else {
            clearSelectedUserStorage();
          }
        } catch (error) {
          console.error("Error restaurando usuario seleccionado:", error);

          clearSelectedUserStorage();
        }
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);

      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * MODAL
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    void loadUsers();
  }, [isOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1000px)");

    const updateIsMobile = () => {
      setIsMobile(mediaQuery.matches);
    };

    updateIsMobile();

    mediaQuery.addEventListener("change", updateIsMobile);

    return () => {
      mediaQuery.removeEventListener("change", updateIsMobile);
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * FILTROS
   * ---------------------------------------------------------
   */

  const filteredUsers = useMemo(() => {
    if (statusFilter === "active") {
      return users.filter((user) => user.status);
    }

    if (statusFilter === "inactive") {
      return users.filter((user) => !user.status);
    }

    return users;
  }, [users, statusFilter]);

  /*
   * ---------------------------------------------------------
   * CREAR USUARIO
   * ---------------------------------------------------------
   */

  const handleCreateUser = () => {
    setSelectedUser(null);

    clearSelectedUserStorage();

    setUsername("");
    setRole("employee");
    setEmail("");
    setStatus(true);

    resetSecurity();

    setError(null);
    setSuccess(null);

    setIsCreatingUser(true);

    scrollToUserEditor("create");
  };

  /*
   * ---------------------------------------------------------
   * USUARIO CREADO
   * ---------------------------------------------------------
   */

  const handleUserCreated = (newUser: SystemUser) => {
    setUsers((currentUsers) => [...currentUsers, newUser]);

    setSelectedUser(newUser);

    setUsername(newUser.username);

    setRole(newUser.role);

    setEmail(newUser.email);

    setStatus(newUser.status);

    saveSelectedUser(newUser);

    setIsCreatingUser(false);

    setSuccess("El usuario fue creado correctamente.");

    scrollModalToTop();

    window.setTimeout(() => {
      setSuccess(null);
    }, 3500);
  };

  /*
   * ---------------------------------------------------------
   * SELECCIONAR USUARIO
   * ---------------------------------------------------------
   */

  const handleSelectUser = async (user: SystemUser) => {
    setIsCreatingUser(false);

    setSelectedUser(user);

    setUsername(user.username);
    setRole(user.role);
    setEmail(user.email);
    setStatus(user.status);

    resetSecurity();

    setError(null);
    setSuccess(null);

    saveSelectedUser(user);

    // Desplaza inmediatamente; no depende de que la consulta de seguridad termine.
    scrollToUserEditor("edit");
    await loadResetStatus(user.email);
  };

  /*
   * ---------------------------------------------------------
   * CANCELAR
   * ---------------------------------------------------------
   */

  const handleCancelEdit = () => {
    setSelectedUser(null);

    setIsCreatingUser(false);

    setUsername("");
    setRole("");
    setEmail("");
    setStatus(true);

    resetSecurity();

    setError(null);
    setSuccess(null);

    clearSelectedUserStorage();
  };

  const handleClose = () => {
    handleCancelEdit();
    onClose();
  };

  const handleSave = async () => {
    if (!selectedUser) {
      return;
    }

    if (!username.trim()) {
      setError("El username es obligatorio.");

      return;
    }

    if (!email.trim()) {
      setError("El email es obligatorio.");

      return;
    }

    if (!role.trim()) {
      setError("El rol es obligatorio.");

      return;
    }

    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const updatedUser = await updateUserAPI(selectedUser.id, {
        username: username.trim(),

        role: role.trim(),

        email: email.trim(),

        status,
      });

      scrollModalToTop();

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user,
        ),
      );

      setSelectedUser(updatedUser);

      setUsername(updatedUser.username);

      setRole(updatedUser.role);

      setEmail(updatedUser.email);

      setStatus(updatedUser.status);

      saveSelectedUser(updatedUser);

      setSuccess("Los datos del usuario fueron actualizados correctamente.");

      window.setTimeout(() => {
        setSuccess(null);
      }, 3500);
    } catch (error) {
      console.error("Error actualizando usuario:", error);

      setError(
        getAxiosErrorMessage(error) || "No se pudo actualizar el usuario.",
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * ENVIAR CÓDIGO
   * ---------------------------------------------------------
   */

  const handleSendCode = async () => {
    if (!email.trim()) {
      setError("El usuario debe tener un email válido.");

      return;
    }

    try {
      setSecurityStep("sending");

      setError(null);
      setSuccess(null);

      setCode("");
      setPassword("");
      setShowPassword(false);

      await ForgotPassword(email.trim());

      setSecurityStep("code-sent");

      setSuccess("Código enviado. Revisá el email asociado a esta cuenta.");

      window.setTimeout(() => {
        codeInputRefs.current[0]?.focus();
      }, 100);
    } catch (error) {
      console.error("Error enviando código:", error);

      setSecurityStep("idle");

      setError(
        getAxiosErrorMessage(error) ||
          "No se pudo enviar el código de verificación.",
      );
    }
  };

  /*
   * ---------------------------------------------------------
   * VERIFICAR CÓDIGO
   * ---------------------------------------------------------
   */

  const handleVerifyCode = async () => {
    if (!email.trim()) {
      setError("El email del usuario es obligatorio.");

      return;
    }

    if (!/^\d{6}$/.test(code)) {
      setError("Ingresá el código completo de 6 dígitos.");

      return;
    }

    try {
      setSecurityStep("verifying");

      setError(null);
      setSuccess(null);

      await VerifyCode(email.trim(), code);

      setSecurityStep("verified");

      setSuccess(
        "Código verificado correctamente. Ya podés establecer una nueva contraseña.",
      );
    } catch (error) {
      console.error("Error verificando código:", error);

      setSecurityStep("code-sent");

      setError(
        getAxiosErrorMessage(error) || "El código no es válido o ya expiró.",
      );
    }
  };

  /*
   * ---------------------------------------------------------
   * INPUT DEL CÓDIGO
   * ---------------------------------------------------------
   */

  const handleCodeChange = (index: number, value: string) => {
    const digits = value.replace(/\D/g, "");

    if (!digits) {
      const codeArray = code.padEnd(6, " ").split("");

      codeArray[index] = " ";

      setCode(codeArray.join("").replace(/\s/g, ""));

      return;
    }

    const digit = digits[digits.length - 1];

    const codeArray = code.padEnd(6, " ").split("");

    codeArray[index] = digit;

    const newCode = codeArray.join("").replace(/\s/g, "");

    setCode(newCode);

    setError(null);

    if (index < 5) {
      codeInputRefs.current[index + 1]?.focus();
    }
  };

  const handleCodeKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !code[index] && index > 0) {
      codeInputRefs.current[index - 1]?.focus();
    }
  };

  /*
   * ---------------------------------------------------------
   * CAMBIAR CONTRASEÑA
   * ---------------------------------------------------------
   */

  const handleChangePassword = async () => {
    if (securityStep !== "verified") {
      setError("Primero verificá el código de seguridad.");

      return;
    }

    if (!/^\d{6}$/.test(code)) {
      setSecurityStep("idle");

      setPassword("");

      setError(
        "El código de verificación ya no está disponible. Solicitá un nuevo código.",
      );

      return;
    }

    if (password.length < 6) {
      setError("La nueva contraseña debe tener al menos 6 caracteres.");

      return;
    }

    try {
      setSecurityStep("changing");

      setError(null);
      setSuccess(null);

      await ResetPassword(email.trim(), code, password);

      scrollModalToTop();

      setPassword("");
      setCode("");

      setSecurityStep("idle");

      setSuccess("La contraseña fue actualizada correctamente.");
    } catch (error) {
      console.error("Error cambiando contraseña:", error);

      if (/^\d{6}$/.test(code)) {
        setSecurityStep("verified");
      } else {
        setSecurityStep("idle");

        setCode("");
        setPassword("");
      }

      setError(
        getAxiosErrorMessage(error) || "No se pudo cambiar la contraseña.",
      );
    }
  };

  /*
   * ---------------------------------------------------------
   * ESTADOS VISUALES
   * ---------------------------------------------------------
   */

  const isSending = securityStep === "sending";

  const isVerifying = securityStep === "verifying";

  const isChanging = securityStep === "changing";

  const codeSent = securityStep === "code-sent" || securityStep === "verifying";

  const codeVerified =
    securityStep === "verified" || securityStep === "changing";

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */

  if (!isOpen) {
    return null;
  }

  return (
    <Portal
      isOpen={isOpen}
      onClose={handleClose}
      ariaLabel="Administración de usuarios"
    >
      <ModalContainer onMouseDown={(event) => event.stopPropagation()}>
        <ModalHeader>
          <ModalHeaderInfo>
            <ModalTitle>Gestión de usuarios</ModalTitle>

            <ModalSubtitle>
              Administrá cuentas, permisos y seguridad del sistema.
            </ModalSubtitle>
          </ModalHeaderInfo>

          <CloseButton type="button" onClick={handleClose} aria-label="Cerrar">
            <FaTimes />
          </CloseButton>
        </ModalHeader>

        <ModalContent>
          {loading ? (
            <LoadingState>Cargando usuarios...</LoadingState>
          ) : (
            <>
              {error && <ErrorMessage>{error}</ErrorMessage>}

              {success && (
                <SuccessMessage>
                  <FaCheckCircle />

                  <span>{success}</span>
                </SuccessMessage>
              )}

              <MainLayout>
                <UsersPanel $mobileVisible={!selectedUser && !isCreatingUser}>
                  <UsersPanelHeader>
                    <div>
                      <UsersPanelTitle>Usuarios</UsersPanelTitle>

                      <UsersPanelSubtitle>
                        Seleccioná una cuenta para administrarla
                      </UsersPanelSubtitle>
                    </div>

                    <UsersPanelActions>
                      <CreateUserButton
                        type="button"
                        onClick={handleCreateUser}
                        aria-label="Crear usuario"
                        title="Crear usuario"
                      >
                        <RiUserAddFill />
                        <span>Crear usuario</span>
                      </CreateUserButton>
                    </UsersPanelActions>
                  </UsersPanelHeader>

                  <Filters>
                    <FilterButton
                      className="show"
                      type="button"
                      $active={statusFilter === "all"}
                      onClick={() => setStatusFilter("all")}
                    >
                      Todos
                      <span>{users.length}</span>
                    </FilterButton>

                    <FilterButton
                      type="button"
                      $active={statusFilter === "active"}
                      onClick={() => setStatusFilter("active")}
                    >
                      Activos
                      <span>{users.filter((user) => user.status).length}</span>
                    </FilterButton>

                    <FilterButton
                      type="button"
                      $active={statusFilter === "inactive"}
                      onClick={() => setStatusFilter("inactive")}
                    >
                      Inactivos
                      <span>{users.filter((user) => !user.status).length}</span>
                    </FilterButton>
                  </Filters>

                  <UsersList>
                    {filteredUsers.length === 0 ? (
                      <EmptyState>No hay usuarios para mostrar.</EmptyState>
                    ) : (
                      filteredUsers.map((user) => (
                        <UserRow
                          key={user.id}
                          $selected={selectedUser?.id === user.id}
                          type="button"
                          onClick={() => void handleSelectUser(user)}
                        >
                          <UserAvatar $active={user.status}>
                            {user.status ? <FaUser /> : <FaUserSlash />}
                          </UserAvatar>

                          <UserMain>
                            <UserName>{user.username}</UserName>

                            <UserEmail>{user.email}</UserEmail>

                            <UserMeta>
                              <UserRole>
                                {user.role === "admin"
                                  ? "Administrador"
                                  : "Empleado"}
                              </UserRole>

                              <UserStatus $active={user.status}>
                                {user.status ? "Activo" : "Inactivo"}
                              </UserStatus>
                            </UserMeta>
                          </UserMain>

                          {selectedUser?.id === user.id ? (
                            <SelectedIndicator>
                              <FaCheck />
                            </SelectedIndicator>
                          ) : (
                            <FaChevronRight />
                          )}
                        </UserRow>
                      ))
                    )}
                  </UsersList>
                </UsersPanel>

                {isCreatingUser ? (
                  /*
                   * -------------------------------------------------
                   * NUEVO USUARIO
                   * -------------------------------------------------
                   */

                  <EditorPanel
                    ref={editorPanelRef}
                    $mobileVisible={isCreatingUser}
                    data-user-editor={isCreatingUser ? "create" : undefined}
                  >
                    <EditorHeader>
                      <EditorUser>
                        <EditorAvatar $active>
                          <RiUserAddFill />
                        </EditorAvatar>

                        <EditorUserInfo>
                          <EditorUserName>Nuevo usuario</EditorUserName>

                          <EditorUserRole>
                            Crear una nueva cuenta
                          </EditorUserRole>
                        </EditorUserInfo>
                      </EditorUser>
                    </EditorHeader>
                    <ContainerSectionInfo>
                      <Section>
                        <SectionHeader>
                          <SectionIcon>
                            <FaUser />
                          </SectionIcon>

                          <div>
                            <SectionTitle>Crear usuario</SectionTitle>

                            <SectionDescription>
                              Completá los datos para crear una nueva cuenta del
                              sistema.
                            </SectionDescription>
                          </div>
                        </SectionHeader>

                        <UserForm
                          onSuccess={handleUserCreated}
                          onCancel={handleCancelEdit}
                        />
                      </Section>
                    </ContainerSectionInfo>

                    <EditorFooter>
                      <CancelButton type="button" onClick={handleCancelEdit}>
                        {isMobile ? <FaChevronLeft /> : ""}

                        {isMobile ? "Volver" : "Cancelar"}
                      </CancelButton>

                      <SaveButton type="submit" form="create-user-form">
                        <FaCheckCircle />
                        Crear usuario
                      </SaveButton>
                    </EditorFooter>
                  </EditorPanel>
                ) : selectedUser ? (
                  /*
                   * -------------------------------------------------
                   * EDITAR USUARIO
                   * -------------------------------------------------
                   */

                  <EditorPanel
                    ref={editorPanelRef}
                    $mobileVisible={Boolean(selectedUser)}
                    data-user-editor="edit"
                  >
                    <EditorHeader>
                      <EditorUser>
                        <EditorAvatar $active={status}>
                          {status ? <FaUserEdit /> : <FaUserSlash />}
                        </EditorAvatar>

                        <EditorUserInfo>
                          <EditorUserName>{username}</EditorUserName>

                          <EditorUserRole>
                            {role === "admin" ? "Administrador" : "Empleado"}
                          </EditorUserRole>
                        </EditorUserInfo>
                      </EditorUser>
                    </EditorHeader>

                    <ContainerSectionInfo>
                      <Section>
                        <SectionHeader>
                          <SectionIcon>
                            <FaUser />
                          </SectionIcon>

                          <div>
                            <SectionTitle>Información</SectionTitle>

                            <SectionDescription>
                              Datos principales de la cuenta.
                            </SectionDescription>
                          </div>
                        </SectionHeader>

                        <FormGrid>
                          <FormGroup>
                            <Label>Nombre</Label>

                            <Input
                              value={username}
                              onChange={(event) =>
                                setUsername(event.target.value)
                              }
                              placeholder="Username"
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Email</Label>

                            <Input
                              type="email"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                              placeholder="Email"
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Rol</Label>

                            <Select
                              value={role}
                              onChange={(event) => setRole(event.target.value)}
                            >
                              <option value="admin">Administrador</option>

                              <option value="employee">Empleado</option>
                            </Select>
                          </FormGroup>
                        </FormGrid>
                      </Section>

                      <Section>
                        <SectionHeader>
                          <SectionIcon $security>
                            <FaShieldAlt />
                          </SectionIcon>

                          <div>
                            <SectionTitle>Seguridad</SectionTitle>

                            <SectionDescription>
                              Cambiá la contraseña mediante una verificación por
                              email.
                            </SectionDescription>
                          </div>
                        </SectionHeader>

                        <SecurityCard>
                          <SecurityHeader>
                            <SecurityIcon>
                              <FaLock />
                            </SecurityIcon>

                            <SecurityText>
                              <SecurityTitle>
                                Verificación de identidad
                              </SecurityTitle>

                              <SecurityDescription>
                                Enviaremos un código de 6 dígitos a
                                <strong> {email}</strong>
                              </SecurityDescription>
                            </SecurityText>
                          </SecurityHeader>

                          {loadingResetStatus ? (
                            <LoadingState>
                              Consultando estado de recuperación...
                            </LoadingState>
                          ) : (
                            <>
                              <SecuritySteps>
                                <SecurityStep
                                  $active={!codeSent && !codeVerified}
                                  $completed={codeSent || codeVerified}
                                >
                                  <SecurityStepNumber>
                                    {codeSent || codeVerified ? (
                                      <FaCheck />
                                    ) : (
                                      "1"
                                    )}
                                  </SecurityStepNumber>

                                  <SecurityStepText>Solicitar</SecurityStepText>
                                </SecurityStep>

                                <SecurityStep
                                  $active={codeSent && !codeVerified}
                                  $completed={codeVerified}
                                >
                                  <SecurityStepNumber>
                                    {codeVerified ? <FaCheck /> : "2"}
                                  </SecurityStepNumber>

                                  <SecurityStepText>Verificar</SecurityStepText>
                                </SecurityStep>

                                <SecurityStep
                                  $active={codeVerified}
                                  $completed={false}
                                >
                                  <SecurityStepNumber>3</SecurityStepNumber>

                                  <SecurityStepText>
                                    Contraseña
                                  </SecurityStepText>
                                </SecurityStep>
                              </SecuritySteps>

                              {!codeSent && !codeVerified && (
                                <SendCodeButton
                                  type="button"
                                  onClick={() => void handleSendCode()}
                                  disabled={isSending}
                                >
                                  <FaPaperPlane />

                                  <span>
                                    {isSending
                                      ? "Enviando código..."
                                      : "Enviar código de verificación"}
                                  </span>

                                  {!isSending && <FaChevronRight />}
                                </SendCodeButton>
                              )}

                              {codeSent && !codeVerified && (
                                <CodeArea>
                                  <CodeHeader>
                                    <div>
                                      <strong>Código de verificación</strong>

                                      <span>
                                        Ingresá el código recibido por email.
                                      </span>
                                    </div>

                                    <CodeStatus>
                                      <FaEnvelope />
                                      Enviado
                                    </CodeStatus>
                                  </CodeHeader>

                                  <CodeInputs>
                                    {Array.from(
                                      {
                                        length: 6,
                                      },
                                      (_, index) => (
                                        <CodeInput
                                          key={index}
                                          ref={(element) => {
                                            codeInputRefs.current[index] =
                                              element;
                                          }}
                                          value={code[index] || ""}
                                          maxLength={1}
                                          inputMode="numeric"
                                          autoComplete="one-time-code"
                                          onChange={(event) =>
                                            handleCodeChange(
                                              index,
                                              event.target.value,
                                            )
                                          }
                                          onKeyDown={(event) =>
                                            handleCodeKeyDown(index, event)
                                          }
                                        />
                                      ),
                                    )}
                                  </CodeInputs>

                                  <VerifyCodeButton
                                    type="button"
                                    onClick={() => void handleVerifyCode()}
                                    disabled={isVerifying || code.length !== 6}
                                  >
                                    <FaCheckCircle />

                                    {isVerifying
                                      ? "Verificando..."
                                      : "Verificar código"}
                                  </VerifyCodeButton>

                                  <ResendButton
                                    type="button"
                                    onClick={() => void handleSendCode()}
                                    disabled={isSending}
                                  >
                                    <FaPaperPlane />
                                    Reenviar código
                                  </ResendButton>
                                </CodeArea>
                              )}

                              {codeVerified && (
                                <>
                                  <SecuritySuccess>
                                    <FaCheckCircle />

                                    <div>
                                      <strong>Identidad verificada</strong>

                                      <span>
                                        El código fue validado correctamente.
                                      </span>
                                    </div>
                                  </SecuritySuccess>

                                  <PasswordArea>
                                    <FormGroup>
                                      <Label>Nueva contraseña</Label>
                                      <div>
                                        <PasswordInput
                                          type={
                                            showPassword ? "text" : "password"
                                          }
                                          value={password}
                                          onChange={(event) =>
                                            setPassword(event.target.value)
                                          }
                                          placeholder="Ingresá la nueva contraseña"
                                        />

                                        {showPassword ? (
                                          <IoEyeSharp
                                            onClick={() =>
                                              setShowPassword(false)
                                            }
                                          />
                                        ) : (
                                          <FaEyeSlash
                                            onClick={() =>
                                              setShowPassword(true)
                                            }
                                          />
                                        )}
                                      </div>
                                    </FormGroup>

                                    <PasswordState>
                                      <PasswordStateIcon>
                                        <FaLock />
                                      </PasswordStateIcon>

                                      <PasswordStateText>
                                        <strong>Contraseña nueva</strong>

                                        <span>
                                          Debe tener al menos 6 caracteres.
                                        </span>
                                      </PasswordStateText>
                                    </PasswordState>

                                    <VerifyCodeButton
                                      type="button"
                                      onClick={() =>
                                        void handleChangePassword()
                                      }
                                      disabled={
                                        isChanging || password.length < 6
                                      }
                                    >
                                      <FaCheckCircle />

                                      {isChanging
                                        ? "Actualizando..."
                                        : "Cambiar contraseña"}
                                    </VerifyCodeButton>
                                  </PasswordArea>
                                </>
                              )}
                            </>
                          )}
                        </SecurityCard>
                      </Section>

                      <Section>
                        <SectionHeader>
                          <SectionIcon>
                            {status ? <FaCheckCircle /> : <FaUserSlash />}
                          </SectionIcon>

                          <div>
                            <SectionTitle>Estado de cuenta</SectionTitle>

                            <SectionDescription>
                              Controlá el acceso de este usuario al sistema.
                            </SectionDescription>
                          </div>
                        </SectionHeader>

                        <StatusCard
                          type="button"
                          $active={status}
                          onClick={() => setStatus((current) => !current)}
                        >
                          <StatusIcon $active={status}>
                            {status ? <FaCheckCircle /> : <FaUserSlash />}
                          </StatusIcon>

                          <StatusContent>
                            <StatusTitle>
                              {status ? "Usuario activo" : "Usuario inactivo"}
                            </StatusTitle>

                            <StatusDescription>
                              {status
                                ? "Puede iniciar sesión y utilizar el sistema."
                                : "No puede iniciar sesión en el sistema."}
                            </StatusDescription>
                          </StatusContent>

                          <StatusArrow>
                            <FaChevronRight />
                          </StatusArrow>
                        </StatusCard>
                      </Section>
                    </ContainerSectionInfo>

                    <EditorFooter>
                      <CancelButton
                        type="button"
                        onClick={handleCancelEdit}
                        disabled={saving}
                      >
                        {isMobile ? <FaChevronLeft /> : ""}

                        {isMobile ? "Volver" : "Cancelar"}
                      </CancelButton>

                      <SaveButton
                        type="button"
                        onClick={() => void handleSave()}
                        disabled={saving}
                      >
                        <FaCheckCircle />

                        {saving ? "Guardando..." : "Guardar cambios"}
                      </SaveButton>
                    </EditorFooter>
                  </EditorPanel>
                ) : (
                  /*
                   * -------------------------------------------------
                   * SIN USUARIO SELECCIONADO
                   * -------------------------------------------------
                   */

                  <EditorPanel
                    ref={editorPanelRef}
                    $empty
                    $mobileVisible={false}
                  >
                    <EmptyState>
                      <div>
                        <FaUserEdit />
                      </div>

                      <strong>Seleccioná un usuario</strong>

                      <span>
                        Elegí una cuenta de la lista para comenzar a editar sus
                        datos.
                      </span>

                      <button type="button" onClick={handleCreateUser}>
                        <FaPlus />
                        Crear nuevo usuario
                      </button>
                    </EmptyState>
                  </EditorPanel>
                )}
              </MainLayout>
            </>
          )}
        </ModalContent>
      </ModalContainer>
    </Portal>
  );
};

export default ManageUser;
