import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import {
  MdBolt,
  MdCheckCircle,
  MdError,
  MdHistory,
  MdListAlt,
  MdPrint,
  MdQueue,
  MdReceiptLong,
  MdRefresh,
  MdSearch,
  MdSettings,
  MdWarning,
  MdWifi,
  MdWifiOff,
} from "react-icons/md";

import { useSelector } from "react-redux";

import type { RootState } from "../../store/store.ts";

import {
  getHealth,
  getPrintConfigAPI,
  getPrintersAPI,
  getPrinterStatusAPI,
  getPrintQueueAPI,
  getPrintJobsAPI,
  getPrintHistoryAPI,
  getAgentStatusAPI,
  testPrintPrinterAPI,
  cancelPrintJobAPI,
  getOpenQueueWindows,
  printOrderAPI,
  updatePrintConfigAPI,
} from "../../services/printAgentService.ts";

import { buildOrderTicket } from "../Tickets/OrderTicket.ts";

import {
  PrintCenter,
  PrintCenterHeader,
  PrintCenterEyebrow,
  PrintCenterTitle,
  PrintCenterLead,
  PrintCenterStatus,
  HeaderActions,
  DashboardGrid,
  StatusCard,
  StatusCardHeader,
  StatusIcon,
  StatusCardTitle,
  StatusCardValue,
  StatusCardDescription,
  StatusDot,
  MainGrid,
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionIcon,
  BasicSettingsGrid,
  SettingField,
  InfoLabel,
  PrinterSelect,
  TextInput,
  CheckControl,
  ResponsiveRow,
  SaveButton,
  SecondaryButton,
  ActionGrid,
  RefreshButton,
  Loading,
  ErrorMessage,
  EmptyMessage,
  QueueSummary,
  QueueSummaryItem,
  QueueSummaryIcon,
  QueueBadge,
  QueueBadgeLabel,
  QueueBadgeValue,
  WorkPanel,
  WorkTabs,
  WorkTab,
  WorkPanelContent,
  SelectWrapper,
  SelectLabel,
  Select,
  OrderList,
  OrderItem,
  OrderIcon,
  OrderInfo,
  OrderTitle,
  OrderCustomer,
  OrderTotal,
  ApiDataCard,
  ApiDataTitle,
  ApiJobCancelButton,
  ApiInfoList,
  ApiInfoRow,
  ApiInfoLabel,
  ApiInfoValue,
  ApiRecordCard,
  ApiRecordList,
  ApiActionMessage,
} from "./PrintStatusModalStyles.ts";

import type {
  PrintConfig,
  PrintPrinter,
  PrinterStatus,
} from "../../interfaces/PrintAgent.ts";

import { getAxiosErrorMessage } from "../Utils/ErrorAxios.tsx";

import {
  isPrintServer,
  requestPrintFromPrintServer,
} from "../../websocket/websocketService.ts";
import {
  finishPrintAgentManualRefresh,
  resetPrintAgentConnection,
} from "../../services/printAgentBase.ts";
import { ActionButton } from "../Utils/ButtonStyles.ts";

type WorkTab = "queue" | "jobs" | "orders";

const PrintStatus = () => {
  const [online, setOnline] = useState(false);

  const [config, setConfig] = useState<PrintConfig | null>(null);

  const [printerStatus, setPrinterStatus] = useState<PrinterStatus | null>(
    null,
  );

  const [printers, setPrinters] = useState<PrintPrinter[]>([]);

  const [selectedPrinter, setSelectedPrinter] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [activeWorkTab, setActiveWorkTab] = useState<WorkTab>("queue");
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [testingPrinter, setTestingPrinter] = useState(false);
  const [diagnostics, setDiagnostics] = useState<{
    status?: unknown;
    queue?: unknown;
    jobs?: unknown[];
    history?: unknown[];
  } | null>(null);
  const [diagnosticLoadingKey, setDiagnosticLoadingKey] = useState<
    string | null
  >(null);
  const [activeDiagnostic, setActiveDiagnostic] = useState<
    "status" | "queue" | "jobs" | "history" | null
  >(null);
  const [printerDiscoveryLoading, setPrinterDiscoveryLoading] = useState(false);
  const [printerDiscoveryMessage, setPrinterDiscoveryMessage] = useState("");
  const diagnosticResultRef = useRef<HTMLDivElement | null>(null);

  const [selectedCashRegisterId, setSelectedCashRegisterId] = useState("");

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const [printingOrderId, setPrintingOrderId] = useState<string | null>(null);

  const refreshingStatusRef = useRef(false);

  const cashRegisters = useSelector(
    (state: RootState) => state.cashRegister.cashRegister,
  );

  const orders = useSelector((state: RootState) => state.orders.orders);

  const remoteAgentConnected = useSelector(
    (state: RootState) => state.printAgent.agentConnected,
  );

  const remotePrinterStatus = useSelector(
    (state: RootState) => state.printAgent.printerStatus,
  );

  const hasAvailablePrinter = isPrintServer()
    ? printers.length > 0
    : Boolean(printerStatus?.printer || remotePrinterStatus?.printer);

  useEffect(() => {
    if (activeDiagnostic && diagnosticLoadingKey === null) {
      window.setTimeout(() => {
        diagnosticResultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    }
  }, [activeDiagnostic, diagnosticLoadingKey, diagnostics, error]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(false);

      const health = await getHealth();

      if (!health) {
        setOnline(false);
        setConfig(null);
        setPrinters([]);
        setPrinterStatus(null);
        setError(true);
        return;
      }

      const [configData, printersData] = await Promise.all([
        getPrintConfigAPI(),
        getPrintersAPI(),
      ]);

      setOnline(true);
      setConfig(configData);
      setPrinters(printersData);

      try {
        const printerStatusData = await getPrinterStatusAPI();
        setPrinterStatus(printerStatusData);
      } catch (error) {
        getAxiosErrorMessage(error);
        setPrinterStatus(null);
        setError(true);
      }
    } catch (error) {
      getAxiosErrorMessage(error);
      setOnline(false);
      setConfig(null);
      setPrinters([]);
      setPrinterStatus(null);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const refreshPrinterStatus = async () => {
    if (refreshingStatusRef.current) {
      return;
    }

    try {
      refreshingStatusRef.current = true;

      const [health, printerStatusData] = await Promise.all([
        getHealth(),
        getPrinterStatusAPI(),
      ]);

      setOnline(health);
      setPrinterStatus(printerStatusData);

      setError(false);
    } catch (error) {
      getAxiosErrorMessage(error);

      setOnline(false);
      setPrinterStatus(null);

      setError(true);
    } finally {
      refreshingStatusRef.current = false;
    }
  };

  /*
   * =========================================================
   * ESTADO REMOTO
   * =========================================================
   */

  useEffect(() => {
    if (isPrintServer()) {
      return;
    }

    setOnline(remoteAgentConnected);
    setPrinterStatus(remotePrinterStatus);

    if (remotePrinterStatus) {
      setConfig({
        printer_name: remotePrinterStatus.printer,
        printer_type: remotePrinterStatus.printer_type,
        printer_ip: null,
        printer_port: 0,
        simulation: false,
        business_name: "",
      });

      setSelectedPrinter(remotePrinterStatus.printer || "");
    } else {
      setConfig(null);
    }

    setError(false);
    setLoading(false);
  }, [remoteAgentConnected, remotePrinterStatus]);

  /*
   * =========================================================
   * PRINT SERVER
   * =========================================================
   */

  useEffect(() => {
    if (!isPrintServer()) {
      return;
    }

    void loadInitialData();
  }, []);

  /*
   * =========================================================
   * DATOS DE IMPRESORA
   * =========================================================
   */

  const printerConnected = printerStatus?.connected ?? false;

  const printerOnline = printerStatus?.online ?? false;

  const printerStatusMessage =
    printerStatus?.status_message ??
    "No se pudo obtener el estado de la impresora.";

  const windowsQueueCount = printerStatus?.queue_count ?? 0;

  const agentQueueCount = printerStatus?.agent_queue_count ?? 0;

  /*
   * =========================================================
   * COMANDAS
   * =========================================================
   */

  const cashOrders = useMemo(() => {
    if (!selectedCashRegisterId) {
      return [];
    }

    return orders
      .filter((order) => order.cash_register_id === selectedCashRegisterId)
      .sort((a, b) => b.order_number - a.order_number);
  }, [orders, selectedCashRegisterId]);

  const selectedOrder = useMemo(() => {
    return orders.find((order) => order.id === selectedOrderId);
  }, [orders, selectedOrderId]);

  /*
   * =========================================================
   * REIMPRIMIR COMANDA
   * =========================================================
   */

  const handleReprintOrder = async () => {
    if (!selectedOrder) {
      return;
    }

    try {
      setPrintingOrderId(selectedOrder.id);

      setError(false);

      const ticket = buildOrderTicket(selectedOrder);

      if (isPrintServer()) {
        await printOrderAPI(ticket);

        window.setTimeout(() => {
          void refreshPrinterStatus();
        }, 500);
      } else {
        const success = await requestPrintFromPrintServer(ticket);

        if (!success) {
          throw new Error(
            "La PC con el Print Agent no pudo imprimir la comanda.",
          );
        }
      }

      setSelectedOrderId(null);
    } catch (error) {
      getAxiosErrorMessage(error);
      setError(true);
    } finally {
      setPrintingOrderId(null);
    }
  };

  /*
   * =========================================================
   * CAMBIAR IMPRESORA
   * =========================================================
   */

  const handlePrinterChange = async (printerName: string) => {
    if (!isPrintServer() || !config) {
      return;
    }

    try {
      setError(false);
      setLoading(true);

      const updatedConfig = await updatePrintConfigAPI({
        printer_name: printerName,
        simulation: config.simulation,
        business_name: config.business_name,
      });

      setSelectedPrinter(updatedConfig.printer_name);

      setConfig(updatedConfig);

      const newPrinterStatus = await getPrinterStatusAPI();

      setPrinterStatus(newPrinterStatus);
    } catch (error) {
      getAxiosErrorMessage(error);

      setError(true);

      setSelectedPrinter(config.printer_name);
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * GUARDAR CONFIGURACIÓN
   * =========================================================
   */

  const handleSaveConfig = async () => {
    if (!isPrintServer() || !config) {
      return;
    }

    try {
      setSavingConfig(true);
      setError(false);

      const updatedConfig = await updatePrintConfigAPI({
        printer_name: selectedPrinter || config.printer_name,
        simulation: config.simulation,
        business_name: config.business_name,
      });

      setConfig(updatedConfig);
      setSelectedPrinter(updatedConfig.printer_name);
    } catch (error) {
      getAxiosErrorMessage(error);
      setError(true);
    } finally {
      setSavingConfig(false);
    }
  };

  /*
   * =========================================================
   * PRUEBA DE IMPRESIÓN
   * =========================================================
   */

  const handleTestPrinter = async () => {
    try {
      setTestingPrinter(true);
      setError(false);
      await testPrintPrinterAPI();
      await refreshPrinterStatus();
    } catch (error) {
      getAxiosErrorMessage(error);
      setError(true);
    } finally {
      setTestingPrinter(false);
    }
  };

  /*
   * =========================================================
   * CONSULTAS AVANZADAS DEL PRINT AGENT
   * =========================================================
   */

  const runDiagnostic = async (
    key: "status" | "queue" | "jobs" | "history",
  ) => {
    if (diagnosticLoadingKey !== null) return;

    try {
      setActiveDiagnostic(key);
      setDiagnostics(null);
      setDiagnosticLoadingKey(key);
      setError(false);

      if (key === "status") {
        const data = await getAgentStatusAPI();
        setDiagnostics({ status: data });
      } else if (key === "queue") {
        const data = await getPrintQueueAPI();
        setDiagnostics({ queue: data });
      } else if (key === "jobs") {
        const data = await getPrintJobsAPI();
        setDiagnostics({ jobs: Array.isArray(data) ? data : [] });
      } else {
        const data = await getPrintHistoryAPI();
        setDiagnostics({ history: Array.isArray(data) ? data : [] });
      }
    } catch (error) {
      getAxiosErrorMessage(error);
      setError(true);
    } finally {
      setDiagnosticLoadingKey(null);
    }
  };

  const handleDiscoverPrinters = async () => {
    try {
      setPrinterDiscoveryLoading(true);
      setPrinterDiscoveryMessage("");
      setError(false);

      if (isPrintServer()) {
        const discoveredPrinters = await getPrintersAPI();
        setPrinters(discoveredPrinters);

        if (discoveredPrinters.length > 0) {
          const currentPrinter = discoveredPrinters.find(
            (printer) => printer.name === selectedPrinter,
          );
          const printerName =
            currentPrinter?.name ?? discoveredPrinters[0].name;
          setSelectedPrinter(printerName);

          const currentConfig = config ?? (await getPrintConfigAPI());
          const nextConfig = { ...currentConfig, printer_name: printerName };
          setConfig(nextConfig);
          setPrinterDiscoveryMessage(
            `Se detectaron ${discoveredPrinters.length} impresora(s). Ya podés configurar la impresora seleccionada.`,
          );

          try {
            setPrinterStatus(await getPrinterStatusAPI());
          } catch {
            setPrinterStatus(null);
          }
        } else {
          setPrinterDiscoveryMessage(
            "No se detectaron impresoras. Comprobá que esté conectada y que Windows la reconozca; después volvé a consultar.",
          );
        }
      } else {
        const remotePrinter = remotePrinterStatus?.printer;
        if (remotePrinter) {
          setPrinters([{ name: remotePrinter }]);
          setSelectedPrinter(remotePrinter);
          setPrinterDiscoveryMessage(
            "Se detectó la impresora remota. Ya podés consultar su estado.",
          );
        } else {
          setPrinterDiscoveryMessage(
            "No se detectó una impresora disponible en la PC conectada al Print Agent.",
          );
        }
      }
    } catch (error) {
      getAxiosErrorMessage(error);
      setPrinterDiscoveryMessage(
        "No se pudieron consultar las impresoras. Revisá la conexión con el Print Agent.",
      );
    } finally {
      setPrinterDiscoveryLoading(false);
    }
  };

  const handleCancelJob = async (jobId: number) => {
    try {
      setDiagnosticLoadingKey("cancel");
      setError(false);
      await cancelPrintJobAPI(jobId);
      setActiveDiagnostic("jobs");
      setDiagnostics({ jobs: await getPrintJobsAPI() });
    } catch (error) {
      getAxiosErrorMessage(error);
      setError(true);
    } finally {
      setDiagnosticLoadingKey(null);
    }
  };

  const getJobId = (job: unknown): number | null => {
    if (!job || typeof job !== "object") {
      return null;
    }

    const record = job as Record<string, unknown>;
    const value = record.id ?? record.job_id;

    return typeof value === "number" && Number.isFinite(value) ? value : null;
  };

  const readableLabel = (key: string) => {
    const labels: Record<string, string> = {
      status: "Estado",
      connected: "Conexión",
      online: "Disponible",
      printer: "Impresora",
      printer_name: "Impresora seleccionada",
      printer_type: "Tipo de impresora",
      status_message: "Mensaje del sistema",
      queue_count: "Trabajos en cola de Windows",
      agent_queue_count: "Trabajos pendientes en el agente",
      pending: "Pendientes",
      processing: "En proceso",
      completed: "Completados",
      failed: "Fallidos",
      id: "Número de trabajo",
      job_id: "Número de trabajo",
      ticket: "Comanda",
      order_id: "Número de comanda",
      created_at: "Fecha de creación",
      updated_at: "Última actualización",
      timestamp: "Fecha y hora",
      time: "Hora",
      message: "Detalle",
      error: "Error",
      success: "Resultado correcto",
      result: "Resultado",
      name: "Nombre",
      printer_status: "Estado de impresora",
      is_default: "Impresora predeterminada",
    };

    return (
      labels[key] ??
      key.replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase())
    );
  };

  const readableValue = (value: unknown): string => {
    if (value === null || value === undefined || value === "")
      return "Sin información";
    if (typeof value === "boolean") return value ? "Sí" : "No";
    if (typeof value === "string" || typeof value === "number")
      return String(value);
    if (Array.isArray(value))
      return `${value.length} elemento${value.length === 1 ? "" : "s"}`;
    if (typeof value === "object") return "Información adicional disponible";
    return String(value);
  };

  const renderReadableData = (data: unknown): ReactNode => {
    if (data === null || data === undefined) {
      return <ApiActionMessage>No se recibió información.</ApiActionMessage>;
    }

    if (Array.isArray(data)) {
      if (data.length === 0) {
        return (
          <ApiActionMessage>No hay registros para mostrar.</ApiActionMessage>
        );
      }
      return (
        <ApiRecordList>
          {data.map((item, index) => (
            <ApiRecordCard key={index}>
              {renderReadableData(item)}
            </ApiRecordCard>
          ))}
        </ApiRecordList>
      );
    }

    if (typeof data === "object") {
      const entries = Object.entries(data as Record<string, unknown>);
      if (entries.length === 0) {
        return (
          <ApiActionMessage>No hay detalles adicionales.</ApiActionMessage>
        );
      }
      return (
        <ApiInfoList>
          {entries.map(([key, value]) => (
            <ApiInfoRow key={key}>
              <ApiInfoLabel>{readableLabel(key)}</ApiInfoLabel>
              <ApiInfoValue
                title={
                  typeof value === "object" && value !== null
                    ? undefined
                    : readableValue(value)
                }
              >
                {typeof value === "object" && value !== null
                  ? renderReadableData(value)
                  : readableValue(value)}
              </ApiInfoValue>
            </ApiInfoRow>
          ))}
        </ApiInfoList>
      );
    }

    return <ApiInfoValue>{readableValue(data)}</ApiInfoValue>;
  };

  /*
   * =========================================================
   * ACTUALIZACIÓN MANUAL
   * =========================================================
   */

const handleFullRefresh = async () => {
  if (loading) return;

  resetPrintAgentConnection();

  try {
    await loadInitialData();
  } finally {
    finishPrintAgentManualRefresh();
  }
};

  /*
   * =========================================================
   * ABRIR COLA DE WINDOWS
   * =========================================================
   */

  const handleOpenQueueWindows = async () => {
    if (diagnosticLoadingKey !== null || testingPrinter) return;

    try {
      setDiagnosticLoadingKey("openQueue");
      await getOpenQueueWindows();
    } catch (error) {
      getAxiosErrorMessage(error);
    } finally {
      setDiagnosticLoadingKey(null);
    }
  };

  const agentStatusText = online ? "Conectado" : "Desconectado";
  const systemReady = online && printerConnected && printerOnline;
  const printerName =
    selectedPrinter || printerStatus?.printer || config?.printer_name || "Sin impresora";
  const recentJobsCount = diagnostics?.jobs?.length;
  const historyCount = diagnostics?.history?.length;

  const selectWorkTab = (tab: WorkTab) => {
    setActiveWorkTab(tab);
    if (tab === "jobs") {
      void runDiagnostic("jobs");
    }
  };

  return (
    <PrintCenter>
      <PrintCenterHeader>
        <div>
          <PrintCenterEyebrow>ADMINISTRACIÓN DEL DISPOSITIVO</PrintCenterEyebrow>
          <PrintCenterTitle>
            <MdPrint /> Centro de impresión
          </PrintCenterTitle>
          <PrintCenterLead>
            Gestioná la conexión del agente, las impresoras y los trabajos de impresión.
          </PrintCenterLead>
        </div>

        <HeaderActions>
          <PrintCenterStatus $active={systemReady}>
            <span />
            <strong>{systemReady ? "Agente conectado" : online ? "Revisar impresora" : "Agente desconectado"}</strong>
            <small>{systemReady ? "Sistema listo para imprimir" : printerStatusMessage}</small>
          </PrintCenterStatus>
          <RefreshButton type="button" onClick={handleFullRefresh} disabled={loading}>
            <MdRefresh />
            {loading ? "Actualizando..." : "Actualizar"}
          </RefreshButton>
        </HeaderActions>
      </PrintCenterHeader>

      {loading && !config && isPrintServer() ? (
        <Loading>
          <MdRefresh />
          <span>Conectando con el sistema de impresión...</span>
        </Loading>
      ) : (
        <>
          <DashboardGrid>
            <StatusCard $active={online}>
              <StatusCardHeader>
                <StatusIcon $active={online}>
                  {online ? <MdWifi /> : <MdWifiOff />}
                </StatusIcon>
                <StatusDot $active={online} />
              </StatusCardHeader>
              <StatusCardTitle>Conexión del agente</StatusCardTitle>
              <StatusCardValue $active={online}>{agentStatusText}</StatusCardValue>
              <StatusCardDescription>
                {online ? "El servicio de impresión está conectado." : "No hay comunicación con el Print Agent."}
              </StatusCardDescription>
            </StatusCard>

            <StatusCard $active={printerConnected && printerOnline}>
              <StatusCardHeader>
                <StatusIcon $active={printerConnected && printerOnline}>
                  {printerConnected && printerOnline ? <MdPrint /> : <MdWarning />}
                </StatusIcon>
                <StatusDot $active={printerConnected && printerOnline} />
              </StatusCardHeader>
              <StatusCardTitle>Impresora activa</StatusCardTitle>
              <StatusCardValue $active={printerConnected && printerOnline}>
                {printerConnected && printerOnline ? "Lista" : "Revisar"}
              </StatusCardValue>
              <StatusCardDescription title={printerName}>{printerName}</StatusCardDescription>
            </StatusCard>

            <StatusCard $active={windowsQueueCount === 0 && agentQueueCount === 0}>
              <StatusCardHeader>
                <StatusIcon $active={windowsQueueCount === 0 && agentQueueCount === 0}>
                  <MdQueue />
                </StatusIcon>
                <StatusDot $active={windowsQueueCount === 0 && agentQueueCount === 0} />
              </StatusCardHeader>
              <StatusCardTitle>Cola de impresión</StatusCardTitle>
              <StatusCardValue $active={windowsQueueCount === 0 && agentQueueCount === 0}>
                {windowsQueueCount + agentQueueCount} trabajos
              </StatusCardValue>
              <StatusCardDescription>
                Windows: {windowsQueueCount} · Agente: {agentQueueCount}
              </StatusCardDescription>
            </StatusCard>

            <StatusCard $active={Boolean(historyCount)}>
              <StatusCardHeader>
                <StatusIcon $active={Boolean(historyCount)}>
                  <MdHistory />
                </StatusIcon>
                <StatusDot $active={Boolean(historyCount)} />
              </StatusCardHeader>
              <StatusCardTitle>Actividad reciente</StatusCardTitle>
              <StatusCardValue $active={Boolean(historyCount)}>
                {typeof historyCount === "number" ? `${historyCount} registros` : "Sin consultar"}
              </StatusCardValue>
              <StatusCardDescription>
                Historial de impresión del Print Agent.
              </StatusCardDescription>
            </StatusCard>
          </DashboardGrid>

          {printerDiscoveryMessage && (
            <ApiActionMessage>{printerDiscoveryMessage}</ApiActionMessage>
          )}

          <MainGrid>
            <Section>
              <SectionHeader>
                <div>
                  <SectionTitle>
                    <SectionIcon><MdSettings /></SectionIcon>
                    Configuración de impresión
                  </SectionTitle>
                  <SectionDescription>
                    Ajustá la impresora y los datos que aparecen en los tickets.
                  </SectionDescription>
                </div>
              </SectionHeader>

              {config ? (
                <>
                  <BasicSettingsGrid>
                    <SettingField>
                      <InfoLabel>Impresora predeterminada</InfoLabel>
                      <PrinterSelect
                        value={selectedPrinter || config.printer_name || ""}
                        onChange={(event) => void handlePrinterChange(event.target.value)}
                        disabled={!isPrintServer() || loading || printers.length === 0}
                      >
                        {printers.length > 0 ? (
                          printers.map((printer) => (
                            <option key={printer.name} value={printer.name}>{printer.name}</option>
                          ))
                        ) : (
                          <option value={config.printer_name || ""}>
                            {config.printer_name || "No hay impresoras detectadas"}
                          </option>
                        )}
                      </PrinterSelect>
                    </SettingField>

                    <SettingField>
                      <InfoLabel>Nombre del negocio en el ticket</InfoLabel>
                      <TextInput
                        value={config.business_name ?? ""}
                        onChange={(event) => setConfig((current) => current ? { ...current, business_name: event.target.value } : current)}
                        placeholder="Nombre del negocio"
                        disabled={!isPrintServer()}
                      />
                    </SettingField>
                  </BasicSettingsGrid>

                  <CheckControl>
                    <input
                      type="checkbox"
                      checked={Boolean(config.simulation)}
                      disabled={!isPrintServer()}
                      onChange={(event) => setConfig((current) => current ? { ...current, simulation: event.target.checked } : current)}
                    />
                    <span>
                      <strong>Modo simulación</strong>
                      <small>Probá el proceso de impresión sin enviar trabajos reales a la impresora.</small>
                    </span>
                  </CheckControl>

                  <ResponsiveRow>
                    <SaveButton
                      type="button"
                      onClick={handleSaveConfig}
                      disabled={!isPrintServer() || !config || savingConfig}
                    >
                      <MdSettings />
                      {savingConfig ? "Guardando..." : "Guardar configuración"}
                    </SaveButton>
                    {!isPrintServer() && (
                      <EmptyMessage>La configuración se administra desde la PC que ejecuta el Print Agent.</EmptyMessage>
                    )}
                  </ResponsiveRow>
                </>
              ) : (
                <EmptyMessage>
                  No se recibió la configuración de la impresora. Buscá los dispositivos disponibles para continuar.
                </EmptyMessage>
              )}
            </Section>

            <div>
              <Section>
                <SectionHeader>
                  <div>
                    <SectionTitle>
                      <SectionIcon><MdBolt /></SectionIcon>
                      Acciones rápidas
                    </SectionTitle>
                    <SectionDescription>
                      Herramientas para probar, encontrar y administrar el agente.
                    </SectionDescription>
                  </div>
                </SectionHeader>

                <ActionGrid>
                  <ActionButton
                    type="button"
                    onClick={() => void handleTestPrinter()}
                    disabled={testingPrinter || diagnosticLoadingKey !== null || !isPrintServer() || !hasAvailablePrinter}
                  >
                    <MdPrint />
                    {testingPrinter ? "Probando..." : "Prueba de impresión"}
                  </ActionButton>
                  <SecondaryButton
                    type="button"
                    onClick={() => void handleDiscoverPrinters()}
                    disabled={printerDiscoveryLoading || loading}
                  >
                    <MdSearch />
                    {printerDiscoveryLoading ? "Buscando..." : "Buscar impresoras"}
                  </SecondaryButton>
                  <SecondaryButton
                    type="button"
                    onClick={() => {
                      setShowDiagnostics((current) => !current);
                      if (!showDiagnostics) void runDiagnostic("status");
                    }}
                    disabled={diagnosticLoadingKey !== null}
                  >
                    <MdListAlt />
                    Diagnóstico
                  </SecondaryButton>
                  <SecondaryButton
                    type="button"
                    onClick={() => void handleOpenQueueWindows()}
                    disabled={diagnosticLoadingKey !== null || testingPrinter}
                  >
                    <MdQueue />
                    Abrir cola Windows
                  </SecondaryButton>
                </ActionGrid>
              </Section>

              <WorkPanel>
                <WorkTabs role="tablist" aria-label="Información de impresión">
                  <WorkTab type="button" role="tab" aria-selected={activeWorkTab === "queue"} $active={activeWorkTab === "queue"} onClick={() => selectWorkTab("queue")}>
                    <MdQueue /> Cola de impresión
                  </WorkTab>
                  <WorkTab type="button" role="tab" aria-selected={activeWorkTab === "jobs"} $active={activeWorkTab === "jobs"} onClick={() => selectWorkTab("jobs")}>
                    <MdHistory /> Trabajos recientes
                  </WorkTab>
                  <WorkTab type="button" role="tab" aria-selected={activeWorkTab === "orders"} $active={activeWorkTab === "orders"} onClick={() => selectWorkTab("orders")}>
                    <MdReceiptLong /> Comandas
                  </WorkTab>
                </WorkTabs>

                <WorkPanelContent role="tabpanel">
                  {activeWorkTab === "queue" && (
                    <>
                      <QueueSummary>
                        <QueueSummaryItem>
                          <QueueSummaryIcon><MdPrint /></QueueSummaryIcon>
                          <div>
                            <QueueBadgeLabel>Cola de Windows</QueueBadgeLabel>
                            <QueueBadgeValue>{windowsQueueCount}</QueueBadgeValue>
                          </div>
                        </QueueSummaryItem>
                        <QueueSummaryItem>
                          <QueueSummaryIcon><MdListAlt /></QueueSummaryIcon>
                          <div>
                            <QueueBadgeLabel>Trabajos del agente</QueueBadgeLabel>
                            <QueueBadgeValue>{agentQueueCount}</QueueBadgeValue>
                          </div>
                        </QueueSummaryItem>
                        <QueueBadge $warning={windowsQueueCount + agentQueueCount > 0}>
                          {windowsQueueCount + agentQueueCount > 0 ? <MdWarning /> : <MdCheckCircle />}
                          {windowsQueueCount + agentQueueCount > 0 ? "Hay trabajos pendientes de impresión" : "No hay trabajos pendientes"}
                        </QueueBadge>
                      </QueueSummary>
                      <ResponsiveRow>
                        <SecondaryButton type="button" onClick={() => void runDiagnostic("queue")} disabled={diagnosticLoadingKey !== null}>
                          <MdRefresh />
                          {diagnosticLoadingKey === "queue" ? "Consultando cola..." : "Actualizar información de cola"}
                        </SecondaryButton>
                        <SecondaryButton type="button" onClick={() => void handleOpenQueueWindows()} disabled={diagnosticLoadingKey !== null || testingPrinter}>
                          <MdQueue />
                          Abrir cola de Windows
                        </SecondaryButton>
                      </ResponsiveRow>
                      {activeDiagnostic === "queue" && diagnostics?.queue !== undefined && diagnosticLoadingKey === null && !error && (
                        <ApiDataCard>
                          <ApiDataTitle>Detalle de la cola de impresión</ApiDataTitle>
                          {renderReadableData(diagnostics.queue)}
                        </ApiDataCard>
                      )}
                    </>
                  )}

                  {activeWorkTab === "jobs" && (
                    <>
                      <ResponsiveRow>
                        <div>
                          <SectionTitle>Trabajos del Print Agent</SectionTitle>
                          <SectionDescription>Consultá los trabajos y cancelá los que todavía estén en proceso.</SectionDescription>
                        </div>
                        <RefreshButton type="button" onClick={() => void runDiagnostic("jobs")} disabled={diagnosticLoadingKey !== null}>
                          <MdRefresh /> Consultar
                        </RefreshButton>
                      </ResponsiveRow>
                      {diagnosticLoadingKey === "jobs" ? (
                        <ApiActionMessage>Consultando los trabajos de impresión...</ApiActionMessage>
                      ) : Array.isArray(diagnostics?.jobs) ? (
                        diagnostics.jobs.length > 0 ? (
                          <ApiRecordList>
                            {diagnostics.jobs.map((job, index) => {
                              const jobId = getJobId(job);
                              return (
                                <ApiRecordCard key={jobId ?? index}>
                                  {renderReadableData(job)}
                                  {jobId !== null && (
                                    <ApiJobCancelButton type="button" onClick={() => void handleCancelJob(jobId)} disabled={diagnosticLoadingKey !== null || testingPrinter}>
                                      Cancelar trabajo #{jobId}
                                    </ApiJobCancelButton>
                                  )}
                                </ApiRecordCard>
                              );
                            })}
                          </ApiRecordList>
                        ) : (
                          <EmptyMessage>No hay trabajos de impresión para mostrar.</EmptyMessage>
                        )
                      ) : (
                        <EmptyMessage>Seleccioná “Consultar” para cargar los trabajos recientes.</EmptyMessage>
                      )}
                    </>
                  )}

                  {activeWorkTab === "orders" && (
                    <>
                      <SelectWrapper>
                        <SelectLabel>Seleccionar caja</SelectLabel>
                        <Select value={selectedCashRegisterId} onChange={(event) => { setSelectedCashRegisterId(event.target.value); setSelectedOrderId(null); }}>
                          <option value="">Seleccionar caja...</option>
                          {cashRegisters.slice().sort((a, b) => new Date(b.opened_at).getTime() - new Date(a.opened_at).getTime()).map((cash) => (
                            <option key={cash.id} value={cash.id}>
                              {cash.date} — {cash.shift === "morning" ? "Mañana" : "Noche"} — {cash.status_cash_register === "open" ? "ABIERTA" : "CERRADA"}
                            </option>
                          ))}
                        </Select>
                      </SelectWrapper>

                      {selectedCashRegisterId ? (
                        <>
                          <QueueSummary>
                            <QueueSummaryItem>
                              <QueueSummaryIcon><MdReceiptLong /></QueueSummaryIcon>
                              <div>
                                <QueueBadgeLabel>Comandas encontradas</QueueBadgeLabel>
                                <QueueBadgeValue>{cashOrders.length}</QueueBadgeValue>
                              </div>
                            </QueueSummaryItem>
                          </QueueSummary>
                          {cashOrders.length === 0 ? (
                            <EmptyMessage>No hay comandas asociadas a esta caja.</EmptyMessage>
                          ) : (
                            <OrderList>
                              {cashOrders.map((order) => (
                                <OrderItem key={order.id} $selected={selectedOrderId === order.id} onClick={() => setSelectedOrderId(order.id)}>
                                  <OrderIcon><MdReceiptLong /></OrderIcon>
                                  <OrderInfo>
                                    <OrderTitle>Comanda #{order.order_number}</OrderTitle>
                                    <OrderCustomer>{order.customer_name || "Sin cliente"}</OrderCustomer>
                                  </OrderInfo>
                                  <OrderTotal>${order.total_price.toLocaleString("es-AR")}</OrderTotal>
                                </OrderItem>
                              ))}
                            </OrderList>
                          )}
                          <ResponsiveRow>
                            <ActionButton type="button" disabled={!selectedOrder || printingOrderId !== null} onClick={() => void handleReprintOrder()}>
                              <MdPrint />
                              {printingOrderId === selectedOrder?.id ? "Enviando..." : selectedOrder ? `Reimprimir comanda #${selectedOrder.order_number}` : "Seleccioná una comanda"}
                            </ActionButton>
                          </ResponsiveRow>
                        </>
                      ) : (
                        <EmptyMessage>Elegí una caja para consultar sus comandas.</EmptyMessage>
                      )}
                    </>
                  )}
                </WorkPanelContent>
              </WorkPanel>
            </div>
          </MainGrid>

          {showDiagnostics && (
            <Section>
              <SectionHeader>
                <div>
                  <SectionTitle>
                    <SectionIcon><MdSettings /></SectionIcon>
                    Diagnóstico avanzado
                  </SectionTitle>
                  <SectionDescription>
                    Consultas técnicas del Print Agent presentadas de forma legible.
                  </SectionDescription>
                </div>
                <RefreshButton type="button" onClick={() => setShowDiagnostics(false)}>Ocultar</RefreshButton>
              </SectionHeader>

              <ActionGrid>
                <SecondaryButton type="button" onClick={() => void runDiagnostic("status")} disabled={diagnosticLoadingKey !== null}><MdWifi /> Estado del agente</SecondaryButton>
                <SecondaryButton type="button" onClick={() => void runDiagnostic("queue")} disabled={diagnosticLoadingKey !== null}><MdQueue /> Consultar cola</SecondaryButton>
                <SecondaryButton type="button" onClick={() => void runDiagnostic("jobs")} disabled={diagnosticLoadingKey !== null}><MdListAlt /> Consultar trabajos</SecondaryButton>
                <SecondaryButton type="button" onClick={() => void runDiagnostic("history")} disabled={diagnosticLoadingKey !== null}><MdHistory /> Historial</SecondaryButton>
              </ActionGrid>

              <div ref={diagnosticResultRef}>
                {diagnosticLoadingKey && (
                  <ApiDataCard>
                    <ApiDataTitle>Consultando información</ApiDataTitle>
                    <ApiActionMessage>El Print Agent está procesando la consulta...</ApiActionMessage>
                  </ApiDataCard>
                )}
                {activeDiagnostic && diagnosticLoadingKey === null && error && (
                  <ApiDataCard>
                    <ApiDataTitle>No se pudo completar la consulta</ApiDataTitle>
                    <ApiActionMessage>Verificá que el Print Agent esté iniciado y volvé a intentarlo.</ApiActionMessage>
                  </ApiDataCard>
                )}
                {activeDiagnostic === "status" && diagnostics?.status !== undefined && diagnosticLoadingKey === null && !error && (
                  <ApiDataCard><ApiDataTitle>Estado del servicio</ApiDataTitle>{renderReadableData(diagnostics.status)}</ApiDataCard>
                )}
                {activeDiagnostic === "queue" && diagnostics?.queue !== undefined && diagnosticLoadingKey === null && !error && (
                  <ApiDataCard><ApiDataTitle>Trabajos pendientes</ApiDataTitle>{renderReadableData(diagnostics.queue)}</ApiDataCard>
                )}
                {activeDiagnostic === "jobs" && Array.isArray(diagnostics?.jobs) && diagnosticLoadingKey === null && !error && (
                  <ApiDataCard>
                    <ApiDataTitle>Trabajos de impresión ({recentJobsCount ?? 0})</ApiDataTitle>
                    {diagnostics.jobs.length ? renderReadableData(diagnostics.jobs) : <ApiActionMessage>No hay trabajos de impresión para mostrar.</ApiActionMessage>}
                  </ApiDataCard>
                )}
                {activeDiagnostic === "history" && Array.isArray(diagnostics?.history) && diagnosticLoadingKey === null && !error && (
                  <ApiDataCard>
                    <ApiDataTitle>Historial de impresión ({historyCount ?? 0})</ApiDataTitle>
                    {diagnostics.history.length ? renderReadableData(diagnostics.history) : <ApiActionMessage>Todavía no hay registros en el historial.</ApiActionMessage>}
                  </ApiDataCard>
                )}
              </div>
            </Section>
          )}

          {error && (
            <ErrorMessage>
              <MdError />
              <span>No se pudo completar la operación. Revisá la conexión con el Print Agent.</span>
            </ErrorMessage>
          )}
        </>
      )}
    </PrintCenter>
  );
};

export default PrintStatus;
