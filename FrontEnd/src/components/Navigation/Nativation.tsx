import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { House, Package, Tag, ShoppingCart, Globe, ClipboardText, CashRegister, Storefront, Gear, List, X } from "@phosphor-icons/react";

import { NavigationContainer } from "./NavigationStyles.ts";

interface TooltipState {
  label: string;
  top: number;
}

const ONLINE_NOTIFICATION_KEY = "boutique-online-order-notifications";

const Navigation = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const [onlineNotifications, setOnlineNotifications] = useState(() => {
    const stored = Number(localStorage.getItem(ONLINE_NOTIFICATION_KEY) || 0);
    return Number.isFinite(stored) ? Math.max(0, stored) : 0;
  });
  const location = useLocation();

  const navigationRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navigationRef.current &&
        !navigationRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
        setTooltip(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  useEffect(() => {
    const playAlert = () => {
      try {
        const AudioContextClass = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioContextClass) return;
        const context = new AudioContextClass();
        if (context.state === "suspended") void context.resume();
        const now = context.currentTime;
        [880, 1046, 880].forEach((frequency, index) => {
          const oscillator = context.createOscillator();
          const gain = context.createGain();
          const start = now + index * 0.19;
          oscillator.type = "sawtooth";
          oscillator.frequency.value = frequency;
          gain.gain.setValueAtTime(0.0001, start);
          gain.gain.exponentialRampToValueAtTime(0.32, start + 0.025);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.15);
          oscillator.connect(gain);
          gain.connect(context.destination);
          oscillator.start(start);
          oscillator.stop(start + 0.16);
        });
        window.setTimeout(() => void context.close(), 900);
      } catch (error) {
        console.warn("No se pudo reproducir el sonido de pedidos:", error);
      }
    };

    const handleNotification = () => {
      if (window.location.pathname !== "/orders/online-orders") {
        setOnlineNotifications((count) => {
          const next = count + 1;
          localStorage.setItem(ONLINE_NOTIFICATION_KEY, String(next));
          return next;
        });
      }
      playAlert();
    };
    window.addEventListener("online-order-notification", handleNotification);
    return () => window.removeEventListener("online-order-notification", handleNotification);
  }, []);

  useEffect(() => {
    if (location.pathname === "/orders/online-orders") {
      setOnlineNotifications(0);
      localStorage.removeItem(ONLINE_NOTIFICATION_KEY);
    }
  }, [location.pathname]);

  const handleTooltipEnter = (
    event: React.MouseEvent<HTMLAnchorElement>,
    label: string,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setTooltip({
      label,
      top: rect.top + rect.height / 2,
    });
  };

  const handleTooltipFocus = (
    event: React.FocusEvent<HTMLAnchorElement>,
    label: string,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    setTooltip({
      label,
      top: rect.top + rect.height / 2,
    });
  };

  const hideTooltip = () => {
    setTooltip(null);
  };

  const closeMenu = () => {
    setShowMenu(false);
    setTooltip(null);
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <button
        type="button"
        className="menu-toggle"
        onClick={() => setShowMenu((current) => !current)}
        aria-label={showMenu ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={showMenu}
      >
        {showMenu ? (
          <X size={23} weight="bold" />
        ) : (
          <List size={23} weight="bold" />
        )}
      </button>

      <div className={`navigation-links ${showMenu ? "open" : ""}`}>
        <NavLink
          to="/"
          end
          title="Inicio"
          onClick={closeMenu}
          onMouseEnter={(e) => handleTooltipEnter(e, "Inicio")}
          onMouseLeave={hideTooltip}
          onFocus={(e) => handleTooltipFocus(e, "Inicio")}
          onBlur={hideTooltip}
        >
          <House size={25} weight="duotone" color="#60A5FA" />
          <span>Inicio</span>
        </NavLink>

        <NavLink
          to="/products"
          end
          title="Productos"
          onClick={closeMenu}
          onMouseEnter={(e) => handleTooltipEnter(e, "Productos")}
          onMouseLeave={hideTooltip}
          onFocus={(e) => handleTooltipFocus(e, "Productos")}
          onBlur={hideTooltip}
        >
          <Package size={25} weight="duotone" color="#38BDF8" />
          <span>Productos</span>
        </NavLink>

        <NavLink
          to="/promotions"
          end
          title="Promociones"
          onClick={closeMenu}
          onMouseEnter={(e) => handleTooltipEnter(e, "Promociones")}
          onMouseLeave={hideTooltip}
          onFocus={(e) => handleTooltipFocus(e, "Promociones")}
          onBlur={hideTooltip}
        >
          <Tag size={25} weight="duotone" color="#FBBF24" />
          <span>Promociones</span>
        </NavLink>

        <NavLink
          to="/orders/new"
          end
          title="Pedidos físicos"
          onClick={closeMenu}
          onMouseEnter={(e) => handleTooltipEnter(e, "Pedidos físicos")}
          onMouseLeave={hideTooltip}
          onFocus={(e) => handleTooltipFocus(e, "Pedidos físicos")}
          onBlur={hideTooltip}
        >
          <ShoppingCart size={25} weight="duotone" color="#34D399" />
          <span>Pedidos físicos</span>
        </NavLink>

        <NavLink
          to="/orders/online-orders"
          end
          title="Pedidos online"
          onClick={closeMenu}
          onMouseEnter={(e) => handleTooltipEnter(e, "Pedidos online")}
          onMouseLeave={hideTooltip}
          onFocus={(e) => handleTooltipFocus(e, "Pedidos online")}
          onBlur={hideTooltip}
        >
          <Globe size={25} weight="duotone" color="#818CF8" />
          <span>Pedidos online</span>
          {onlineNotifications > 0 && (
            <span className="notification-badge" aria-label={`${onlineNotifications} notificaciones sin revisar`}>
              {onlineNotifications > 99 ? "99+" : onlineNotifications}
            </span>
          )}
        </NavLink>

        <NavLink
          to="/orders"
          end
          title="Comandas"
          onClick={closeMenu}
          onMouseEnter={(e) => handleTooltipEnter(e, "Comandas")}
          onMouseLeave={hideTooltip}
          onFocus={(e) => handleTooltipFocus(e, "Comandas")}
          onBlur={hideTooltip}
        >
          <ClipboardText size={25} weight="duotone" color="#C084FC" />
          <span>Comandas</span>
        </NavLink>

        <NavLink
          to="/cashRegister"
          end
          title="Caja"
          onClick={closeMenu}
          onMouseEnter={(e) => handleTooltipEnter(e, "Caja")}
          onMouseLeave={hideTooltip}
          onFocus={(e) => handleTooltipFocus(e, "Caja")}
          onBlur={hideTooltip}
        >
          <CashRegister size={25} weight="duotone" color="#4ADE80" />
          <span>Caja</span>
        </NavLink>

        <NavLink
          to="/store"
          end
          title="Tienda online"
          onClick={closeMenu}
          onMouseEnter={(e) => handleTooltipEnter(e, "Tienda online")}
          onMouseLeave={hideTooltip}
          onFocus={(e) => handleTooltipFocus(e, "Tienda online")}
          onBlur={hideTooltip}
        >
          <Storefront size={25} weight="duotone" color="#FB923C" />
          <span>Tienda online</span>
        </NavLink>

        <NavLink
          to="/settings"
          end
          title="Configuración"
          onClick={closeMenu}
          onMouseEnter={(e) => handleTooltipEnter(e, "Configuración")}
          onMouseLeave={hideTooltip}
          onFocus={(e) => handleTooltipFocus(e, "Configuración")}
          onBlur={hideTooltip}
        >
          <Gear size={25} weight="duotone" color="#94A3B8" />
          <span>Configuración</span>
        </NavLink>
      </div>

      {/* TOOLTIP INDEPENDIENTE DEL SCROLL */}

      {tooltip && (
        <div
          className="navigation-tooltip"
          style={{ top: `${tooltip.top}px` }}
          role="tooltip"
        >
          {tooltip.label}
        </div>
      )}
    </NavigationContainer>
  );
};

export default Navigation;