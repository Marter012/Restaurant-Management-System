import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaClipboardList,
  FaCashRegister,
  FaTags,
  FaCog,
  FaGlobe,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { NavigationContainer } from "./NavigationStyles.ts";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setShowMenu((current) => !current)}
        aria-label={showMenu ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={showMenu}
      >
        {showMenu ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`navigation-links ${showMenu ? "open" : ""}`}>
        <NavLink to="/" onClick={() => setShowMenu(false)}>
          <FaHome />
          <span>Inicio</span>
        </NavLink>

        <NavLink to="/products" onClick={() => setShowMenu(false)}>
          <FaBoxOpen />
          <span>Productos</span>
        </NavLink>

        <NavLink to="/promotions" onClick={() => setShowMenu(false)}>
          <FaTags />
          <span>Promociones</span>
        </NavLink>

        <NavLink to="/orders" onClick={() => setShowMenu(false)}>
          <FaClipboardList />
          <span>Comandas</span>
        </NavLink>

        <NavLink to="/online-orders" onClick={() => setShowMenu(false)}>
          <FaGlobe />
          <span>Pedidos online</span>
        </NavLink>

        <NavLink to="/cashRegister" onClick={() => setShowMenu(false)}>
          <FaCashRegister />
          <span>Caja</span>
        </NavLink>

        <NavLink to="/settings" onClick={() => setShowMenu(false)}>
          <FaCog />
          <span>Configuración</span>
        </NavLink>

        <NavLink to="/store" onClick={() => setShowMenu(false)}>
          <FaGlobe />
          <span>Store</span>
        </NavLink>
      </div>
    </NavigationContainer>
  );
};

export default Navigation;
