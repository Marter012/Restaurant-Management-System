import { useState, useRef, useEffect, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMe,
  logout,
  type User,
} from "../../services/authService.ts";

import {
  PageHeaderContainer,
  TitleContainer,
  Actions,
  ProfileContainer,
  ProfileButton,
  ProfileAvatar,
  ProfileInfo,
  ProfileArrow,
  ProfileDropdown,
  DropdownButton,
} from "./PageHeadersStyles.ts";

interface PageHeaderProps {
  title: string;
  description: string;
  children?: ReactNode;
}

const PageHeader = ({
  title,
  description,
  children,
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  // Obtener usuario autenticado
 useEffect(() => {
  let isMounted = true;

  const loadUser = async () => {
    try {
      const currentUser = await getMe();

      if (isMounted) {
        setUser(currentUser);
      }
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  loadUser();

  return () => {
    isMounted = false;
  };
}, []);
  // Cerrar desplegable al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const username = user?.username || "Usuario";

  const userRole =
    user?.role === "admin"
      ? "Administrador"
      : user?.role || "Usuario";

  // Cerrar sesión
  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login", { replace: true });
  };

  return (
    <PageHeaderContainer>
      <TitleContainer>
        <h2>{title}</h2>
        <p>{description}</p>
      </TitleContainer>

      {children && <Actions>{children}</Actions>}

      <ProfileContainer ref={profileRef}>
        <ProfileButton
          type="button"
          onClick={() => setIsOpen((previous) => !previous)}
          aria-expanded={isOpen}
          aria-label="Opciones de usuario"
        >
          <ProfileAvatar>
            {username.charAt(0).toUpperCase()}
          </ProfileAvatar>

          <ProfileInfo>
            <strong>{username}</strong>
            <span>{userRole}</span>
          </ProfileInfo>

          <ProfileArrow $isOpen={isOpen}>
            ▼
          </ProfileArrow>
        </ProfileButton>

        {isOpen && (
          <ProfileDropdown>
            <DropdownButton
              type="button"
              onClick={handleLogout}
            >
              <span>↪</span>
              Cerrar sesión
            </DropdownButton>
          </ProfileDropdown>
        )}
      </ProfileContainer>
    </PageHeaderContainer>
  );
};

export default PageHeader;