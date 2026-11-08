import { useEffect, useMemo, useState } from "react";
import {
  FaBolt,
  FaBoxOpen,
  FaCashRegister,
  FaClipboardList,
  FaClock,
  FaHistory,
  FaPrint,
  FaSignOutAlt,
  FaShoppingCart,
  FaTag,
  FaUsers,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "../../../store/store.ts";
import ModalForm from "../../ModalForm/ModalForm.tsx";
import { getMe, logout, type User } from "../../../services/authService.ts";
import { api } from "../../../services/api.ts";
import { logoutUser } from "../../../store/slices/userSlice.ts";
import { ContainerPage } from "../PageStyles.ts";
import HomeHeroBanner from "./HomeHeroBanner.png";

import {
  HeaderTools,
  Profile,
  ProfileAvatar,
  ProfileText,
  LogoutButton,
  HeroBanner,
  HeroContent,
  HeroEyebrow,
  HeroTitle,
  HeroDescription,
  StatsGrid,
  StatCard,
  StatTopline,
  StatLabel,
  StatValue,
  StatIcon,
  StatFootnote,
  StatusPill,
  MainGrid,
  Panel,
  PanelHeader,
  PanelHeading,
  PanelTitle,
  PanelSubtitle,
  ChartLegend,
  SalesChart,
  ChartYAxis,
  ChartPlot,
  ChartGridLine,
  ChartColumn,
  ChartBar,
  ChartLabel,
  ChartTooltip,
  ActivityPanel,
  ActivityList,
  ActivityItem,
  ActivityIcon,
  ActivityCopy,
  ActivityTitle,
  ActivityDescription,
  ActivityTime,
  ViewAllButton,
  QuickAccessSection,
  QuickAccessHeader,
  QuickAccessTitle,
  QuickAccessDescription,
  QuickAccessGrid,
  QuickAccessButton,
  QuickAccessIcon,
  QuickAccessText,
  ActivityModalContent,
  ActivityListModal,
  ActivityRow,
  EmptyState,
} from "./HomeStyles.ts";

type ActivityEntry = {
  id: string;
  actor_username: string;
  action: string;
  resource: string;
  details: string;
  created_at: string;
};

type ActivityTone = "orders" | "cash" | "promotions" | "products" | "default";

const currency = (value: number) =>
  value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });

const localDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getGreeting = (date: Date) => {
  const hour = date.getHours();
  if (hour < 12) return "¡Buen día";
  if (hour < 19) return "¡Buenas tardes";
  return "¡Buenas noches";
};

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [user, setUser] = useState<User | null>(null);
  const [showActivity, setShowActivity] = useState(false);
  const [, setSettingsLoading] = useState(true);
  const [activity, setActivity] = useState<ActivityEntry[]>([]);
  const [currentTime, setCurrentTime] = useState(() => new Date());

  const selectedDay = useSelector((state: RootState) => state.daySelected.day);
  const selectedShift = useSelector(
    (state: RootState) => state.daySelected.shift,
  );
  const orders = useSelector((state: RootState) => state.orders.orders);
  const products = useSelector((state: RootState) => state.products.products);
  const promotions = useSelector(
    (state: RootState) => state.promotion.promotions,
  );
  const cashRegisters = useSelector(
    (state: RootState) => state.cashRegister.cashRegister,
  );

  const dashboardDay = selectedDay || localDateKey(currentTime);
  const isAdmin = user?.role === "admin";
  const initial = user?.username?.charAt(0).toUpperCase() || "U";

  useEffect(() => {
    let mounted = true;

    void getMe()
      .then((currentUser) => {
        if (mounted) setUser(currentUser);
      })
      .catch((error) => {
        console.error("Error obteniendo información del usuario:", error);
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(
      () => setCurrentTime(new Date()),
      60_000,
    );
    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      if (user) setSettingsLoading(false);
      return;
    }

    let mounted = true;
    setSettingsLoading(true);

    void api
      .get("/audit/")
      .then((response) => {
        if (mounted) {
          setActivity(Array.isArray(response.data) ? response.data : []);
        }
      })
      .catch(() => {
        if (mounted) setActivity([]);
      });

    return () => {
      mounted = false;
    };
  }, [isAdmin, user]);

  const selectedCashRegister = useMemo(() => {
    return cashRegisters.find((cashRegister) => {
      const cashDate =
        cashRegister.date?.slice(0, 10) ||
        cashRegister.opened_at?.slice(0, 10) ||
        "";

      return cashDate === dashboardDay && cashRegister.shift === selectedShift;
    });
  }, [cashRegisters, dashboardDay, selectedShift]);

  const dayOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.created_at?.slice(0, 10) === dashboardDay &&
          order?.cash_register_id === selectedCashRegister?.id &&
          order.status !== false,
      ),
    [orders, dashboardDay, selectedCashRegister],
  );

  const daySales = useMemo(
    () =>
      dayOrders.reduce(
        (total, order) => total + Number(order.total_price || 0),
        0,
      ),
    [dayOrders],
  );

  const activeProducts = useMemo(
    () => products.filter((product) => product.status === true),
    [products],
  );

  const activePromotions = useMemo(
    () => promotions.filter((promotion) => promotion.status === true),
    [promotions],
  );

  const cashIsOpen = selectedCashRegister?.status_cash_register === "open";
  const cashStatusLabel = !selectedCashRegister
    ? "Sin abrir"
    : cashIsOpen
      ? "Abierta"
      : "Cerrada";

  const salesByDay = useMemo(
    () =>
      Array.from({ length: 7 }, (_, index) => {
        const date = new Date(`${dashboardDay}T12:00:00`);
        date.setDate(date.getDate() - (6 - index));
        const dateKey = localDateKey(date);
        const total = orders
          .filter(
            (order) =>
              order.created_at?.slice(0, 10) === dateKey &&
              order.status !== false,
          )
          .reduce((sum, order) => sum + Number(order.total_price || 0), 0);

        return {
          dateKey,
          label: date
            .toLocaleDateString("es-AR", { weekday: "short" })
            .replace(".", ""),
          total,
          isSelectedDay: dateKey === dashboardDay,
        };
      }),
    [orders, dashboardDay],
  );

  const maxSales = Math.max(...salesByDay.map((item) => item.total), 1);
  const chartScale = [1, 0.75, 0.5, 0.25, 0].map(
    (ratio) => Math.round((maxSales * ratio) / 1000) * 1000,
  );

  const latestOrders = useMemo(
    () =>
      [...dayOrders]
        .sort(
          (a, b) =>
            new Date(b.created_at || "").getTime() -
            new Date(a.created_at || "").getTime(),
        )
        .slice(0, 4),
    [dayOrders],
  );

  const filteredActivity = useMemo(
    () =>
      activity
        .filter(
          (entry) =>
            Boolean(entry.created_at) &&
            entry.created_at.slice(0, 10) === dashboardDay,
        )
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        ),
    [activity, dashboardDay],
  );

  const translateAudit = (value: string): string => {
    const translations: Record<string, string> = {
      create: "creó",
      created: "creó",
      update: "modificó",
      updated: "modificó",
      delete: "eliminó",
      deleted: "eliminó",
      login: "inició sesión",
      logout: "cerró sesión",
      open: "abrió",
      opened: "abrió",
      close: "cerró",
      closed: "cerró",
      cancel: "canceló",
      print: "imprimió",
      product: "producto",
      products: "productos",
      order: "comanda",
      orders: "comandas",
      cash_register: "caja",
      cash_movement: "movimiento de caja",
      user: "usuario",
      users: "usuarios",
      promotion: "promoción",
      promotions: "promociones",
      setting: "configuración",
      settings: "configuración",
    };

    return translations[value.toLowerCase()] ?? value.replaceAll("_", " ");
  };

  const translateAuditResource = (resource: string) => {
    const translations: Record<string, string> = {
      product: "producto",
      products: "productos",
      order: "comanda",
      orders: "comandas",
      cash_register: "caja",
      cash_movement: "movimiento de caja",
      user: "usuario",
      users: "usuarios",
      promotion: "promoción",
      promotions: "promociones",
      setting: "configuración",
      settings: "configuración",
    };

    return (
      translations[resource.toLowerCase()] ?? resource.replaceAll("_", " ")
    );
  };

  const getActivityTone = (resource: string): ActivityTone => {
    const normalized = resource.toLowerCase();
    if (normalized.includes("order")) return "orders";
    if (normalized.includes("cash")) return "cash";
    if (normalized.includes("promotion")) return "promotions";
    if (normalized.includes("product")) return "products";
    return "default";
  };

  const handleLogout = () => {
    logout();
    dispatch(logoutUser());
    navigate("/login", { replace: true });
  };

  const handleNewOrder = () => {
    navigate("/orders", { state: { newOrder: true } });
  };

  const activityItems =
    isAdmin && filteredActivity.length > 0
      ? filteredActivity.slice(0, 4).map((entry) => ({
          id: entry.id,
          title: `${entry.actor_username || "Usuario"} ${translateAudit(entry.action)} ${translateAuditResource(entry.resource)}`,
          description: entry.details || "Actividad registrada en el sistema.",
          time: entry.created_at,
          tone: getActivityTone(entry.resource),
        }))
      : latestOrders.map((order) => ({
          id: order.id,
          title: `Comanda #${order.order_number ?? order.id.slice(-4)} creada`,
          description: `${order.customer_name || "Mostrador"} · ${currency(Number(order.total_price || 0))}`,
          time: order.created_at || "",
          tone: "orders" as ActivityTone,
        }));

  const activityIcon = (tone: ActivityTone) => {
    if (tone === "orders") return <FaShoppingCart />;
    if (tone === "cash") return <FaCashRegister />;
    if (tone === "promotions") return <FaTag />;
    if (tone === "products") return <FaBoxOpen />;
    return <FaHistory />;
  };

  const greeting = getGreeting(currentTime);

  return (
    <ContainerPage>
      <HeroBanner $image={HomeHeroBanner}>
        <HeroContent>
          <HeroEyebrow>BOUTIQUE SABORES</HeroEyebrow>
          <HeroTitle>
            {greeting}, {user?.username || "bienvenido"}! <span>👋</span>
          </HeroTitle>
          <HeroDescription>
            Aquí tenés el resumen de hoy y los accesos principales del negocio.
          </HeroDescription>
        </HeroContent>

        <HeaderTools>
          <Profile onClick={handleLogout}>
            <ProfileAvatar>{initial}</ProfileAvatar>
            <ProfileText>
              <strong>{user?.username || "Usuario"}</strong>
              <span>{isAdmin ? "Administrador" : "Usuario"}</span>
            </ProfileText>
            <LogoutButton
              type="button"
              title="Cerrar sesión"
              aria-label="Cerrar sesión"
              className="buttonExit"
            >
              <FaSignOutAlt />
            </LogoutButton>
          </Profile>
        </HeaderTools>
      </HeroBanner>

      <StatsGrid>
        <StatCard>
          <StatTopline>
            <StatLabel>Ventas de hoy</StatLabel>
            <StatIcon>
              <FaShoppingCart />
            </StatIcon>
          </StatTopline>
          <StatValue>{currency(daySales)}</StatValue>
          <StatFootnote>Según comandas registradas</StatFootnote>
        </StatCard>

        <StatCard>
          <StatTopline>
            <StatLabel>Comandas</StatLabel>
            <StatIcon>
              <FaClipboardList />
            </StatIcon>
          </StatTopline>
          <StatValue>{dayOrders.length}</StatValue>
          <StatFootnote>Del día seleccionado</StatFootnote>
        </StatCard>

        <StatCard>
          <StatTopline>
            <StatLabel>Promociones</StatLabel>
            <StatIcon>
              <FaTag />
            </StatIcon>
          </StatTopline>
          <StatValue>{activePromotions.length} activas</StatValue>
          <StatFootnote>Promociones habilitadas</StatFootnote>
        </StatCard>

        <StatCard>
          <StatTopline>
            <StatLabel>Productos</StatLabel>
            <StatIcon>
              <FaBoxOpen />
            </StatIcon>
          </StatTopline>
          <StatValue>{activeProducts.length}</StatValue>
          <StatFootnote>Productos en catálogo</StatFootnote>
        </StatCard>

        <StatCard>
          <StatTopline>
            <StatLabel>Caja actual</StatLabel>
            <StatIcon>
              <FaCashRegister />
            </StatIcon>
          </StatTopline>
          <StatValue $compact>{cashStatusLabel}</StatValue>
          <StatusPill
            $status={
              !selectedCashRegister
                ? "warning"
                : cashIsOpen
                  ? "success"
                  : "danger"
            }
          >
            <i />
            {selectedCashRegister
              ? `${selectedShift === "morning" ? "Turno mañana" : "Turno noche"}`
              : "Sin caja para el turno"}
          </StatusPill>
        </StatCard>
      </StatsGrid>

      <MainGrid>
        <Panel>
          <PanelHeader>
            <PanelHeading>
              <PanelTitle>Ventas de la semana</PanelTitle>
              <PanelSubtitle>
                Evolución de ventas de los últimos 7 días.
              </PanelSubtitle>
            </PanelHeading>
            <ChartLegend>
              <i />
              <span>Ventas registradas</span>
            </ChartLegend>
          </PanelHeader>

          <SalesChart>
            <ChartYAxis>
              {chartScale.map((value, index) => (
                <span key={`${value}-${index}`}>
                  {value.toLocaleString("es-AR")}
                </span>
              ))}
            </ChartYAxis>
            <ChartPlot>
              {[0, 1, 2, 3, 4].map((line) => (
                <ChartGridLine key={line} />
              ))}
              {salesByDay.map((item) => (
                <ChartColumn
                  key={item.dateKey}
                  title={`${item.label}: ${currency(item.total)}`}
                  $active={item.isSelectedDay}
                >
                  {item.isSelectedDay && item.total > 0 && (
                    <ChartTooltip>{currency(item.total)}</ChartTooltip>
                  )}
                  <ChartBar
                    $height={Math.max(2, (item.total / maxSales) * 100)}
                    $active={item.isSelectedDay}
                  />
                  <ChartLabel $active={item.isSelectedDay}>
                    {item.label}
                  </ChartLabel>
                </ChartColumn>
              ))}
            </ChartPlot>
          </SalesChart>
        </Panel>

        <ActivityPanel>
          <PanelHeader>
            <PanelHeading>
              <PanelTitle>Actividad reciente</PanelTitle>
              <PanelSubtitle>Últimas acciones del sistema.</PanelSubtitle>
            </PanelHeading>
            <ViewAllButton
              type="button"
              onClick={() => {
                if (isAdmin) setShowActivity(true);
                else navigate("/orders");
              }}
            >
              Ver todo
            </ViewAllButton>
          </PanelHeader>

          <ActivityList>
            {activityItems.length > 0 ? (
              activityItems.map((item) => (
                <ActivityItem key={item.id}>
                  <ActivityIcon $tone={item.tone}>
                    {activityIcon(item.tone)}
                  </ActivityIcon>
                  <ActivityCopy>
                    <ActivityTitle>{item.title}</ActivityTitle>
                    <ActivityDescription>
                      {item.description}
                    </ActivityDescription>
                  </ActivityCopy>
                  <ActivityTime>
                    {item.time
                      ? new Date(item.time).toLocaleTimeString("es-AR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "—"}
                  </ActivityTime>
                </ActivityItem>
              ))
            ) : (
              <EmptyState>
                <FaClock />
                Todavía no hay actividad registrada para esta fecha.
              </EmptyState>
            )}
          </ActivityList>
        </ActivityPanel>
      </MainGrid>

      <QuickAccessSection>
        <QuickAccessHeader>
          <div>
            <QuickAccessTitle>
              <FaBolt /> Accesos rápidos
            </QuickAccessTitle>
            <QuickAccessDescription>
              Acciones frecuentes para administrar el negocio.
            </QuickAccessDescription>
          </div>
        </QuickAccessHeader>

        <QuickAccessGrid>
          <QuickAccessButton type="button" onClick={handleNewOrder}>
            <QuickAccessIcon>
              <FaShoppingCart />
            </QuickAccessIcon>
            <QuickAccessText>Nueva comanda</QuickAccessText>
          </QuickAccessButton>
          <QuickAccessButton
            type="button"
            onClick={() => navigate("/products")}
          >
            <QuickAccessIcon>
              <FaBoxOpen />
            </QuickAccessIcon>
            <QuickAccessText>Gestionar productos</QuickAccessText>
          </QuickAccessButton>
          <QuickAccessButton
            type="button"
            onClick={() => navigate("/promotions")}
          >
            <QuickAccessIcon>
              <FaTag />
            </QuickAccessIcon>
            <QuickAccessText>Administrar promociones</QuickAccessText>
          </QuickAccessButton>
          <QuickAccessButton
            type="button"
            onClick={() => navigate("/cashRegister")}
          >
            <QuickAccessIcon>
              <FaCashRegister />
            </QuickAccessIcon>
            <QuickAccessText>Ver caja</QuickAccessText>
          </QuickAccessButton>
          <QuickAccessButton
            type="button"
            onClick={() =>
              navigate("/settings", { state: { section: "users" } })
            }
          >
            <QuickAccessIcon>
              <FaUsers />
            </QuickAccessIcon>
            <QuickAccessText>Usuarios</QuickAccessText>
          </QuickAccessButton>
          <QuickAccessButton
            type="button"
            onClick={() =>
              navigate("/settings", { state: { section: "printing" } })
            }
          >
            <QuickAccessIcon>
              <FaPrint />
            </QuickAccessIcon>
            <QuickAccessText>Impresión</QuickAccessText>
          </QuickAccessButton>
        </QuickAccessGrid>
      </QuickAccessSection>

      {isAdmin && (
        <ModalForm
          isOpen={showActivity}
          title={`Actividad del ${dashboardDay}`}
          onClose={() => setShowActivity(false)}
          scroll="false"
        >
          <ActivityModalContent>
            <ActivityListModal>
              {filteredActivity.length > 0 ? (
                filteredActivity.map((entry) => (
                  <ActivityRow key={entry.id}>
                    <strong>{entry.actor_username || "Usuario"}</strong>
                    <span>
                      {translateAudit(entry.action)}{" "}
                      {translateAuditResource(entry.resource)}
                      {entry.details ? ` · ${entry.details}` : ""}
                    </span>
                    <time>
                      {new Date(entry.created_at).toLocaleTimeString("es-AR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </time>
                  </ActivityRow>
                ))
              ) : (
                <EmptyState>
                  No hay actividad registrada para esta fecha.
                </EmptyState>
              )}
            </ActivityListModal>
          </ActivityModalContent>
        </ModalForm>
      )}
    </ContainerPage>
  );
};

export default Home;
