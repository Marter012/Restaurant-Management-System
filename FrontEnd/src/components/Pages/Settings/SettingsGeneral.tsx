import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  FaArrowDown,
  FaArrowUp,
  FaBoxes,
  FaCalendarAlt,
  FaChartBar,
  FaChartLine,
  FaCheck,
  FaChevronRight,
  FaClipboardList,
  FaClock,
  FaCog,
  FaHistory,
  FaShoppingBag,
  FaTag,
  FaTrophy,
} from "react-icons/fa";

import type { RootState } from "../../../store/store.ts";
import ModalForm from "../../ModalForm/ModalForm.tsx";
import {
  getSettingsAPI,
  updateSettingsAPI,
  getAuditAPI,
  getUnavailableIngredientsAPI,
  updateIngredientAvailabilityAPI,
} from "../../../services/settingsService.ts";
import type { AuditEntry } from "../../../services/settingsService.ts";
import { getAxiosErrorMessage } from "../../Utils/ErrorAxios.tsx";
import SettingsStoreContact from "./SettingsStoreContact.tsx";

import {
  GeneralContent,
  GeneralHeading,
  GeneralEyebrow,
  GeneralTitle,
  GeneralDescription,
  DashboardGrid,
  Panel,
  PanelHeader,
  PanelHeading,
  PanelTitle,
  PanelDescription,
  PanelIcon,
  PreferenceRow,
  PreferenceCopy,
  PreferenceLabel,
  PreferenceDescription,
  StatusBadge,
  Toggle,
  IngredientTrigger,
  IngredientCount,
  IngredientList,
  IngredientItem,
  IngredientInfo,
  IngredientStatus,
  PeriodSelect,
  MetricsHeader,
  MetricsGrid,
  MetricCard,
  MetricIcon,
  MetricLabel,
  MetricValue,
  MetricFootnote,
  LowerGrid,
  ActivityPanel,
  ActivityList,
  ActivityEntry,
  ActivityAvatar,
  ActivityInformation,
  ActivityDate,
  ActivityHeaderAction,
  ChartPanel,
  ChartLegend,
  Chart,
  ChartColumn,
  ChartValue,
  ChartBar,
  ChartLabel,
  SecondaryGrid,
  RankingList,
  RankingItem,
  RankingPosition,
  RankingInfo,
  RankingValue,
  SummaryStrip,
  SummaryItem,
  EmptyState,
  LoadingState,
  ErrorMessage,
  ModalActivityContent,
  AcceptIngredientsButton,
} from "./SettingsGeneralStyles.ts";

type Period = "week" | "month";

const money = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const translate = (value = "") => {
  const words: Record<string, string> = {
    create: "Creó",
    created: "Creó",
    update: "Modificó",
    updated: "Modificó",
    delete: "Eliminó",
    deleted: "Eliminó",
    login: "Inició sesión",
    logout: "Cerró sesión",
    open: "Abrió",
    close: "Cerró",
    product: "producto",
    products: "productos",
    order: "comanda",
    orders: "comandas",
    promotion: "promoción",
    promotions: "promociones",
    user: "usuario",
    users: "usuarios",
    cash_register: "caja",
    setting: "configuración",
    settings: "configuración",
  };

  return words[value.toLowerCase()] ?? value.replaceAll("_", " ");
};

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const SettingsGeneral = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const products = useSelector((state: RootState) => state.products.products);
  const promotions = useSelector((state: RootState) => state.promotion.promotions);

  const [period, setPeriod] = useState<Period>("week");
  const [allowOutOfStock, setAllowOutOfStock] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activity, setActivity] = useState<AuditEntry[]>([]);
  const [showActivity, setShowActivity] = useState(false);
  const [unavailableIngredients, setUnavailableIngredients] = useState<string[]>([]);
  const [draftUnavailableIngredients, setDraftUnavailableIngredients] = useState<string[]>([]);
  const [savingIngredients, setSavingIngredients] = useState(false);
  const [ingredientError, setIngredientError] = useState("");
  const [ingredientsLoading, setIngredientsLoading] = useState(true);
  const [showIngredients, setShowIngredients] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadSettings = async () => {
      try {
        const data = await getSettingsAPI();
        if (mounted) setAllowOutOfStock(Boolean(data.allow_out_of_stock));
      } catch (requestError) {
        if (mounted) {
          setError(getAxiosErrorMessage(requestError, "No se pudo cargar la configuración."));
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    const loadActivity = async () => {
      try {
        const data = await getAuditAPI();
        if (mounted) setActivity(data);
      } catch {
        if (mounted) setActivity([]);
      }
    };

    const loadUnavailableIngredients = async () => {
      try {
        const data = await getUnavailableIngredientsAPI();
        if (mounted) {
          setUnavailableIngredients(
            data
              .filter((item) => item.active)
              .map((item) => item.ingredient.trim().toLocaleLowerCase("es")),
          );
        }
      } catch (requestError) {
        if (mounted) {
          setIngredientError(
            getAxiosErrorMessage(
              requestError,
              "No se pudo cargar la disponibilidad de ingredientes.",
            ),
          );
        }
      } finally {
        if (mounted) setIngredientsLoading(false);
      }
    };

    void loadSettings();
    void loadActivity();
    void loadUnavailableIngredients();

    return () => {
      mounted = false;
    };
  }, []);

  const toggleStock = async () => {
    if (saving || loading) return;
    setSaving(true);
    setError("");

    try {
      const data = await updateSettingsAPI({
        allow_out_of_stock: !allowOutOfStock,
      });
      setAllowOutOfStock(Boolean(data.allow_out_of_stock));
    } catch (requestError) {
      setError(
        getAxiosErrorMessage(
          requestError,
          "No se pudo actualizar la configuración.",
        ),
      );
    } finally {
      setSaving(false);
    }
  };

  const ingredients = useMemo(() => {
    const allIngredients = products.flatMap((product) => {
      const productIngredients = (
        product as typeof product & { ingredients?: string[] | string | null }
      ).ingredients;
      if (Array.isArray(productIngredients)) return productIngredients;
      return String(productIngredients ?? "").split(",");
    });

    const uniqueIngredients = new Map<string, string>();
    allIngredients.forEach((ingredient) => {
      const value = ingredient.trim();
      if (value) {
        const key = value.toLocaleLowerCase("es");
        if (!uniqueIngredients.has(key)) uniqueIngredients.set(key, value);
      }
    });

    return Array.from(uniqueIngredients.values()).sort((a, b) =>
      a.localeCompare(b, "es", { sensitivity: "base" }),
    );
  }, [products]);

  const openIngredients = () => {
    setDraftUnavailableIngredients([...unavailableIngredients]);
    setIngredientError("");
    setShowIngredients(true);
  };

  const closeIngredients = () => {
    if (savingIngredients) return;
    setDraftUnavailableIngredients([...unavailableIngredients]);
    setIngredientError("");
    setShowIngredients(false);
  };

  // Los cambios del modal se mantienen en borrador hasta confirmar.
  const toggleIngredient = (ingredient: string) => {
    const normalized = ingredient.trim().toLocaleLowerCase("es");

    setDraftUnavailableIngredients((previous) =>
      previous.includes(normalized)
        ? previous.filter((item) => item !== normalized)
        : [...previous, normalized],
    );
  };

  const saveIngredients = async () => {
    if (savingIngredients || ingredientsLoading) return;

    setSavingIngredients(true);
    setIngredientError("");

    // Se parte del estado confirmado y se persiste únicamente lo que cambió.
    const confirmed = new Set(unavailableIngredients);

    try {
      for (const ingredient of ingredients) {
        const normalized = ingredient.trim().toLocaleLowerCase("es");
        const wasUnavailable = confirmed.has(normalized);
        const shouldBeUnavailable = draftUnavailableIngredients.includes(normalized);

        if (wasUnavailable === shouldBeUnavailable) continue;

        const response = await updateIngredientAvailabilityAPI(
          ingredient,
          shouldBeUnavailable,
        );

        if (response.unavailable) {
          confirmed.add(normalized);
        } else {
          confirmed.delete(normalized);
        }

        // Si una petición posterior falla, los cambios ya confirmados
        // quedan reflejados y el resto permanece en el borrador para reintentar.
        setUnavailableIngredients(Array.from(confirmed));
      }

      const nextConfirmed = Array.from(confirmed);
      setUnavailableIngredients(nextConfirmed);
      setDraftUnavailableIngredients(nextConfirmed);
      setShowIngredients(false);
    } catch (requestError) {
      setUnavailableIngredients(Array.from(confirmed));
      setIngredientError(
        getAxiosErrorMessage(
          requestError,
          "No se pudo guardar la disponibilidad de los ingredientes.",
        ),
      );
    } finally {
      setSavingIngredients(false);
    }
  };

  const rangeStart = useMemo(() => {
    const start = startOfDay(new Date());
    start.setDate(start.getDate() - (period === "week" ? 6 : 29));
    return start;
  }, [period]);

  const periodOrders = useMemo(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    return orders.filter((order) => {
      if (order.status === false || !order.created_at) return false;
      const date = new Date(order.created_at);
      return date >= rangeStart && date <= end;
    });
  }, [orders, rangeStart]);

  const totalSales = periodOrders.reduce(
    (sum, order) => sum + Number(order.total_price || 0),
    0,
  );
  const totalItems = periodOrders.reduce(
    (sum, order) =>
      sum + (order.items || []).reduce(
        (total, item) => total + Number(item.quantity || 0),
        0,
      ),
    0,
  );
  const average = periodOrders.length ? totalSales / periodOrders.length : 0;

  const weekdays = useMemo(() => {
    const labels = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    return labels.map((label, index) => {
      const total = periodOrders
        .filter((order) => new Date(order.created_at).getDay() === index)
        .reduce((sum, order) => sum + Number(order.total_price || 0), 0);
      return { label, total };
    });
  }, [periodOrders]);
  const maxSales = Math.max(1, ...weekdays.map((day) => day.total));

  const topProducts = useMemo(
    () =>
      products
        .map((product) => ({
          id: product.id,
          name: product.name,
          sold: periodOrders.reduce(
            (sum, order) =>
              sum + (order.items || [])
                .filter(
                  (item) =>
                    item.item_type === "product" && item.product_id === product.id,
                )
                .reduce((total, item) => total + Number(item.quantity || 0), 0),
            0,
          ),
        }))
        .filter((item) => item.sold > 0)
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5),
    [products, periodOrders],
  );

  const topPromotions = useMemo(
    () =>
      promotions
        .map((promotion) => ({
          id: promotion.id,
          name: promotion.name,
          sold: periodOrders.reduce(
            (sum, order) =>
              sum + (order.items || [])
                .filter(
                  (item) =>
                    item.item_type === "promotion" && item.promotion_id === promotion.id,
                )
                .reduce((total, item) => total + Number(item.quantity || 0), 0),
            0,
          ),
        }))
        .filter((item) => item.sold > 0)
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5),
    [promotions, periodOrders],
  );

  const highest = [...weekdays].sort((a, b) => b.total - a.total)[0];
  const lowest = [...weekdays]
    .filter((day) => day.total > 0)
    .sort((a, b) => a.total - b.total)[0];
  const latestActivity = useMemo(
    () =>
      [...activity]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .slice(0, 30),
    [activity],
  );
  const periodLabel = period === "week" ? "Últimos 7 días" : "Últimos 30 días";
  const unavailableCount = unavailableIngredients.length;

  return (
    <GeneralContent>
      <GeneralHeading>
        <div>
          <GeneralEyebrow>CONFIGURACIÓN DEL SISTEMA</GeneralEyebrow>
          <GeneralTitle>Vista general del sistema</GeneralTitle>
          <GeneralDescription>
            Gestioná las preferencias principales, consultá métricas y revisá la actividad reciente.
          </GeneralDescription>
        </div>
        <StatusBadge $active={!loading}>
          <span />
          {loading ? "Cargando configuración" : "Sistema operativo"}
        </StatusBadge>
      </GeneralHeading>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <SettingsStoreContact />

      <DashboardGrid>
        <Panel>
          <PanelHeader>
            <PanelIcon><FaCog /></PanelIcon>
            <PanelHeading>
              <PanelTitle>Preferencias del sistema</PanelTitle>
              <PanelDescription>Ajustá el comportamiento general de la aplicación.</PanelDescription>
            </PanelHeading>
          </PanelHeader>

          <PreferenceRow>
            <PanelIcon $soft><FaBoxes /></PanelIcon>
            <PreferenceCopy>
              <PreferenceLabel>Permitir ventas sin stock</PreferenceLabel>
              <PreferenceDescription>
                Permite realizar ventas aunque haya ingredientes sin stock disponible.
              </PreferenceDescription>
            </PreferenceCopy>
            <StatusBadge $active={allowOutOfStock}>
              <span />{allowOutOfStock ? "Activo" : "Inactivo"}
            </StatusBadge>
            <Toggle
              type="button"
              aria-label="Activar ventas sin stock"
              aria-pressed={allowOutOfStock}
              $enabled={allowOutOfStock}
              disabled={loading || saving}
              onClick={() => void toggleStock()}
            ><i /></Toggle>
          </PreferenceRow>
          {saving && <LoadingState>Guardando configuración...</LoadingState>}

          <IngredientTrigger
            type="button"
            aria-haspopup="dialog"
            aria-expanded={showIngredients}
            onClick={openIngredients}
          >
            <PanelIcon $soft><FaTag /></PanelIcon>
            <PreferenceCopy>
              <PreferenceLabel>Ingredientes no disponibles</PreferenceLabel>
              <PreferenceDescription>
                Gestioná los ingredientes que no se encuentran disponibles actualmente.
              </PreferenceDescription>
            </PreferenceCopy>
            <IngredientCount>
              {ingredientsLoading ? "Cargando" : `${unavailableCount} ${unavailableCount === 1 ? "ingrediente" : "ingredientes"}`}
            </IngredientCount>
            <FaChevronRight className="chevron" />
          </IngredientTrigger>

        </Panel>

        <Panel>
          <MetricsHeader>
            <PanelHeader>
              <PanelIcon><FaChartBar /></PanelIcon>
              <PanelHeading>
                <PanelTitle>Métricas del período</PanelTitle>
                <PanelDescription>Resumen de ventas y actividad del negocio.</PanelDescription>
              </PanelHeading>
            </PanelHeader>
            <PeriodSelect
              value={period}
              onChange={(event) => setPeriod(event.target.value as Period)}
              aria-label="Período de las métricas"
            >
              <option value="week">Última semana</option>
              <option value="month">Últimos 30 días</option>
            </PeriodSelect>
          </MetricsHeader>

          <MetricsGrid>
            <MetricCard>
              <MetricIcon><FaShoppingBag /></MetricIcon>
              <MetricLabel>Ventas</MetricLabel>
              <MetricValue>{money(totalSales)}</MetricValue>
              <MetricFootnote><FaCalendarAlt />{periodLabel}</MetricFootnote>
            </MetricCard>
            <MetricCard>
              <MetricIcon><FaClipboardList /></MetricIcon>
              <MetricLabel>Comandas</MetricLabel>
              <MetricValue>{periodOrders.length}</MetricValue>
              <MetricFootnote><FaCalendarAlt />{periodLabel}</MetricFootnote>
            </MetricCard>
            <MetricCard>
              <MetricIcon><FaBoxes /></MetricIcon>
              <MetricLabel>Productos</MetricLabel>
              <MetricValue>{products.length}</MetricValue>
              <MetricFootnote>Registrados en el sistema</MetricFootnote>
            </MetricCard>
            <MetricCard>
              <MetricIcon><FaTag /></MetricIcon>
              <MetricLabel>Promociones</MetricLabel>
              <MetricValue>{promotions.length}</MetricValue>
              <MetricFootnote>Registradas en el sistema</MetricFootnote>
            </MetricCard>
          </MetricsGrid>
        </Panel>
      </DashboardGrid>

      <LowerGrid>
        <ActivityPanel>
          <PanelHeader $compact>
            <PanelIcon><FaClock /></PanelIcon>
            <PanelHeading>
              <PanelTitle>Actividad reciente</PanelTitle>
              <PanelDescription>Últimos cambios realizados en el sistema.</PanelDescription>
            </PanelHeading>
            <ActivityHeaderAction type="button" onClick={() => setShowActivity(true)}>
              Ver todo
            </ActivityHeaderAction>
          </PanelHeader>
          {latestActivity.length > 0 ? (
            <ActivityList>
              {latestActivity.slice(0, 4).map((entry, index) => (
                <ActivityEntry key={entry.id}>
                  <ActivityAvatar $variant={index % 3}>
                    {(entry.actor_username || "U").charAt(0).toLocaleUpperCase("es")}
                  </ActivityAvatar>
                  <ActivityInformation>
                    <strong>{entry.actor_username || "Usuario"}</strong>
                    <span>
                      {translate(entry.action)} {translate(entry.resource)}
                      {entry.details ? ` · ${entry.details}` : ""}
                    </span>
                  </ActivityInformation>
                  <ActivityDate>
                    {new Date(entry.created_at).toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </ActivityDate>
                </ActivityEntry>
              ))}
            </ActivityList>
          ) : (
            <EmptyState>
              <FaHistory />
              <strong>No hay actividad registrada</strong>
              <span>Cuando se realicen acciones en el sistema, aparecerán en este historial.</span>
            </EmptyState>
          )}
        </ActivityPanel>

        <ChartPanel>
          <PanelHeader $compact>
            <PanelIcon><FaChartLine /></PanelIcon>
            <PanelHeading>
              <PanelTitle>Ventas del período</PanelTitle>
              <PanelDescription>Evolución de ventas en el período seleccionado.</PanelDescription>
            </PanelHeading>
          </PanelHeader>
          <ChartLegend>{periodLabel} · Total: {money(totalSales)}</ChartLegend>
          <Chart>
            {weekdays.map((day) => {
              const height = day.total > 0 ? Math.max(3, (day.total / maxSales) * 100) : 0;
              return (
                <ChartColumn key={day.label} title={`${day.label}: ${money(day.total)}`}>
                  <ChartValue>{day.total > 0 ? money(day.total) : ""}</ChartValue>
                  <ChartBar $height={height} $highlight={day.total === maxSales && day.total > 0} />
                  <ChartLabel>{day.label}</ChartLabel>
                </ChartColumn>
              );
            })}
          </Chart>
        </ChartPanel>
      </LowerGrid>

      <SummaryStrip>
        <SummaryItem>
          <span>Ticket promedio</span>
          <strong>{money(average)}</strong>
        </SummaryItem>
        <SummaryItem>
          <span>Unidades vendidas</span>
          <strong>{totalItems}</strong>
        </SummaryItem>
        <SummaryItem>
          <span>Día de mayor venta</span>
          <strong><FaArrowUp /> {highest?.label || "—"} · {money(highest?.total || 0)}</strong>
        </SummaryItem>
        <SummaryItem>
          <span>Día de menor venta</span>
          <strong><FaArrowDown /> {lowest?.label || "—"} · {money(lowest?.total || 0)}</strong>
        </SummaryItem>
      </SummaryStrip>

      <SecondaryGrid>
        <Panel>
          <PanelHeader>
            <PanelIcon><FaTrophy /></PanelIcon>
            <PanelHeading>
              <PanelTitle>Productos más vendidos</PanelTitle>
              <PanelDescription>Los cinco productos con mayor cantidad de ventas.</PanelDescription>
            </PanelHeading>
          </PanelHeader>
          <RankingList>
            {topProducts.length ? topProducts.map((item, index) => (
              <RankingItem key={item.id}>
                <RankingPosition>{index + 1}</RankingPosition>
                <RankingInfo><strong>{item.name}</strong><span>{item.sold} unidades vendidas</span></RankingInfo>
                <RankingValue>{item.sold} u.</RankingValue>
              </RankingItem>
            )) : (
              <EmptyState><FaShoppingBag /><strong>Sin ventas registradas</strong><span>No hay productos vendidos durante este período.</span></EmptyState>
            )}
          </RankingList>
        </Panel>
        <Panel>
          <PanelHeader>
            <PanelIcon><FaTag /></PanelIcon>
            <PanelHeading>
              <PanelTitle>Promociones más vendidas</PanelTitle>
              <PanelDescription>Las cinco promociones con mayor cantidad de ventas.</PanelDescription>
            </PanelHeading>
          </PanelHeader>
          <RankingList>
            {topPromotions.length ? topPromotions.map((item, index) => (
              <RankingItem key={item.id}>
                <RankingPosition>{index + 1}</RankingPosition>
                <RankingInfo><strong>{item.name}</strong><span>{item.sold} unidades vendidas</span></RankingInfo>
                <RankingValue>{item.sold} u.</RankingValue>
              </RankingItem>
            )) : (
              <EmptyState><FaTag /><strong>Sin promociones vendidas</strong><span>No hay promociones vendidas durante este período.</span></EmptyState>
            )}
          </RankingList>
        </Panel>
      </SecondaryGrid>

      <ModalForm
        isOpen={showIngredients}
        title="Disponibilidad de ingredientes"
        description="Activá o desactivá los ingredientes. Los cambios se aplican únicamente al presionar Aceptar."
        icon={<FaTag />}
        onClose={closeIngredients}
        footerActions={
          <AcceptIngredientsButton
            type="button"
            onClick={() => void saveIngredients()}
            disabled={savingIngredients || ingredientsLoading}
          >
            <FaCheck />
            {savingIngredients ? "Guardando..." : "Aceptar"}
          </AcceptIngredientsButton>
        }
        closeOnOverlayClick={!savingIngredients}
        closeOnEscape={!savingIngredients}
        size="default"
        scroll="active"
      >
        {ingredientError && <ErrorMessage>{ingredientError}</ErrorMessage>}

        {ingredientsLoading || savingIngredients ? (
          <LoadingState>
            {savingIngredients
              ? "Guardando disponibilidad de ingredientes..."
              : "Cargando ingredientes..."}
          </LoadingState>
        ) : ingredients.length === 0 ? (
          <EmptyState>
            <FaBoxes />
            <strong>Sin ingredientes registrados</strong>
            <span>
              Los ingredientes aparecerán cuando estén asociados a tus productos.
            </span>
          </EmptyState>
        ) : (
          <IngredientList>
            {ingredients.map((ingredient) => {
              const normalized = ingredient.trim().toLocaleLowerCase("es");
              const unavailable = draftUnavailableIngredients.includes(normalized);

              return (
                <IngredientItem key={normalized}>
                  <IngredientInfo>
                    <strong>{ingredient}</strong>
                    <IngredientStatus $available={!unavailable}>
                      <span />
                      {unavailable
                        ? "Temporalmente no disponible"
                        : "Disponible"}
                    </IngredientStatus>
                  </IngredientInfo>

                  <Toggle
                    type="button"
                    aria-label={`Cambiar disponibilidad de ${ingredient}`}
                    aria-pressed={!unavailable}
                    $enabled={!unavailable}
                    disabled={savingIngredients || ingredientsLoading}
                    onClick={() => toggleIngredient(ingredient)}
                  >
                    <i />
                  </Toggle>
                </IngredientItem>
              );
            })}
          </IngredientList>
        )}
      </ModalForm>

      <ModalForm
        isOpen={showActivity}
        title="Actividad reciente"
        onClose={() => setShowActivity(false)}
        scroll="false"
      >
        <ModalActivityContent>
          {latestActivity.length > 0 ? (
            <ActivityList>
              {latestActivity.map((entry, index) => (
                <ActivityEntry key={entry.id}>
                  <ActivityAvatar $variant={index % 3}>
                    {(entry.actor_username || "U").charAt(0).toLocaleUpperCase("es")}
                  </ActivityAvatar>
                  <ActivityInformation>
                    <strong>{entry.actor_username || "Usuario"}</strong>
                    <span>
                      {translate(entry.action)} {translate(entry.resource)}
                      {entry.details ? ` · ${entry.details}` : ""}
                    </span>
                  </ActivityInformation>
                  <ActivityDate>
                    {new Date(entry.created_at).toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </ActivityDate>
                </ActivityEntry>
              ))}
            </ActivityList>
          ) : (
            <EmptyState><FaHistory /><strong>No hay actividad registrada</strong><span>Cuando se realicen acciones en el sistema, aparecerán en este historial.</span></EmptyState>
          )}
        </ModalActivityContent>
      </ModalForm>
    </GeneralContent>
  );
};

export default SettingsGeneral;
