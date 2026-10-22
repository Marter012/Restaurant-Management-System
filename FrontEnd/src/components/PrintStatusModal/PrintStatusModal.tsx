import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";

import {
  MdCheckCircle,
  MdError,
  MdListAlt,
  MdPrint,
  MdReceiptLong,
  MdRefresh,
  MdSettings,
  MdUsb,
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
  DashboardGrid,
  StatusCard,
  StatusCardHeader,
  StatusIcon,
  StatusCardTitle,
  StatusCardValue,
  StatusCardDescription,
  StatusDot,
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  SectionIcon,
  InfoGrid,
  InfoCard,
  InfoLabel,
  InfoValue,
  PrinterSelector,
  PrinterIcon,
  PrinterSelect,
  ActionGrid,
  ActionButton,
  SecondaryButton,
  RefreshButton,
  Loading,
  ErrorMessage,
  EmptyMessage,
  QueueBadge,
  QueueBadgeLabel,
  QueueBadgeValue,
  QueueSummary,
  QueueSummaryItem,
  QueueSummaryIcon,
  StatusBanner,
  StatusBannerIcon,
  StatusBannerText,
  StatusBannerTitle,
  StatusBannerDescription,
  SelectWrapper,
  SelectLabel,
  Select,
  ResponsiveRow,
  OrderList,
  OrderItem,
  OrderIcon,
  OrderInfo,
  OrderTitle,
  OrderCustomer,
  OrderTotal,
  ModalFooter,
  ModeBar,
  ModeButton,
  ModeIntro,
  BasicSettingsGrid,
  SettingField,
  TextInput,
  CheckControl,
  SaveButton,
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
import ModalForm from "../ModalForm/ModalForm.tsx";
import { finishPrintAgentManualRefresh, resetPrintAgentConnection } from "../../services/printAgentBase.ts";

interface PrintStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubModalType = "orders" | null;

const PrintStatusModal = ({ isOpen, onClose }: PrintStatusModalProps) => {
  const [online, setOnline] = useState(false);

  const [config, setConfig] = useState<PrintConfig | null>(null);

  const [printerStatus, setPrinterStatus] = useState<PrinterStatus | null>(
    null,
  );

  const [printers, setPrinters] = useState<PrintPrinter[]>([]);

  const [selectedPrinter, setSelectedPrinter] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);

  const [subModal, setSubModal] = useState<SubModalType>(null);

  const [viewMode, setViewMode] = useState<"basic" | "advanced">("basic");
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
    if (!isOpen || isPrintServer()) {
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
  }, [isOpen, remoteAgentConnected, remotePrinterStatus]);

  /*
   * =========================================================
   * PRINT SERVER
   * =========================================================
   */

  useEffect(() => {
    if (!isOpen || !isPrintServer()) {
      return;
    }

    void loadInitialData();
  }, [isOpen]);

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

  /*
   * =========================================================
   * CERRAR SUBMODAL
   * =========================================================
   */

  const handleCloseSubModal = () => {
    setSubModal(null);
    setSelectedOrderId(null);
  };

  if (!isOpen) {
    return null;
  }

  const agentStatusText = online ? "Conectado" : "Desconectado";

  const printerConnectionText = printerConnected ? "Conectada" : "Desconectada";

  const windowsStatusText = printerOnline ? "Online" : "Offline";

  const systemReady = online && printerConnected && printerOnline;

  return (
    <>
      <ModalForm
        isOpen={isOpen && subModal !== "orders"}
        title="Centro de impresión"
        onClose={onClose}
      >
        <ModeBar role="group" aria-label="Modo de configuración">
          <ModeButton
            type="button"
            $active={viewMode === "basic"}
            onClick={() => setViewMode("basic")}
          >
            <MdSettings />
            Configuración básica
          </ModeButton>
          <ModeButton
            type="button"
            $active={viewMode === "advanced"}
            onClick={() => setViewMode("advanced")}
          >
            <MdListAlt />
            Configuración avanzada
          </ModeButton>
        </ModeBar>
        <ModeIntro>
          {viewMode === "basic"
            ? "Configurá lo esencial y comprobá rápidamente si podés imprimir."
            : "Herramientas de diagnóstico, colas, trabajos e historial del Print Agent."}
        </ModeIntro>
        {hasAvailablePrinter && printerDiscoveryMessage && (
          <ApiActionMessage>{printerDiscoveryMessage}</ApiActionMessage>
        )}
        {!hasAvailablePrinter && viewMode === "basic" && !loading ? (
          <Section>
            <SectionHeader>
              <div>
                <SectionTitle>
                  <SectionIcon>
                    <MdPrint />
                  </SectionIcon>
                  Buscar impresoras disponibles
                </SectionTitle>
                <SectionDescription>
                  Todavía no hay una impresora detectada. Consultá los
                  dispositivos antes de mostrar o editar su configuración.
                </SectionDescription>
              </div>
            </SectionHeader>
            <ActionButton
              type="button"
              onClick={() => void handleDiscoverPrinters()}
              disabled={printerDiscoveryLoading || loading}
            >
              <MdRefresh />
              {printerDiscoveryLoading || loading
                ? "Consultando impresoras..."
                : "Consultar qué impresoras hay"}
            </ActionButton>
            {printerDiscoveryMessage && (
              <ApiActionMessage>{printerDiscoveryMessage}</ApiActionMessage>
            )}
          </Section>
        ) : loading && !config && viewMode === "basic" ? (
          <Loading>
            <MdRefresh />
            <span>Conectando con el sistema de impresión...</span>
          </Loading>
        ) : viewMode === "basic" ? (
          <>
            <DashboardGrid>
              <StatusCard $active={online}>
                <StatusCardHeader>
                  <StatusIcon $active={online}>
                    {online ? <MdWifi /> : <MdWifiOff />}
                  </StatusIcon>
                  <StatusDot $active={online} />
                </StatusCardHeader>
                <StatusCardTitle>Print Agent</StatusCardTitle>
                <StatusCardValue $active={online}>
                  {agentStatusText}
                </StatusCardValue>
                <StatusCardDescription>
                  Conexión con el servicio de impresión.
                </StatusCardDescription>
              </StatusCard>

              <StatusCard $active={printerConnected && printerOnline}>
                <StatusCardHeader>
                  <StatusIcon $active={printerConnected && printerOnline}>
                    {printerConnected && printerOnline ? (
                      <MdCheckCircle />
                    ) : (
                      <MdWarning />
                    )}
                  </StatusIcon>
                  <StatusDot $active={printerConnected && printerOnline} />
                </StatusCardHeader>
                <StatusCardTitle>Impresora</StatusCardTitle>
                <StatusCardValue $active={printerConnected && printerOnline}>
                  {printerConnected && printerOnline ? "Lista" : "Revisar"}
                </StatusCardValue>
                <StatusCardDescription>
                  {printerStatusMessage}
                </StatusCardDescription>
              </StatusCard>
            </DashboardGrid>

            <Section>
              <SectionHeader>
                <div>
                  <SectionTitle>
                    <SectionIcon>
                      <MdPrint />
                    </SectionIcon>
                    Configuración esencial
                  </SectionTitle>
                  <SectionDescription>
                    Seleccioná la impresora y definí el nombre que aparecerá en
                    los tickets.
                  </SectionDescription>
                </div>
              </SectionHeader>

              {config && hasAvailablePrinter ? (
                <>
                  <BasicSettingsGrid>
                    <SettingField>
                      <InfoLabel>Impresora predeterminada</InfoLabel>
                      <PrinterSelect
                        value={selectedPrinter || config.printer_name || ""}
                        onChange={(event) => {
                          const value = event.target.value;
                          setSelectedPrinter(value);
                          setConfig((current) =>
                            current
                              ? { ...current, printer_name: value }
                              : current,
                          );
                        }}
                        disabled={
                          !isPrintServer() || loading || printers.length === 0
                        }
                      >
                        {printers.length > 0 ? (
                          printers.map((printer) => (
                            <option key={printer.name} value={printer.name}>
                              {printer.name}
                            </option>
                          ))
                        ) : (
                          <option value={config.printer_name || ""}>
                            {config.printer_name ||
                              "No hay impresoras detectadas"}
                          </option>
                        )}
                      </PrinterSelect>
                    </SettingField>

                    <SettingField>
                      <InfoLabel>Nombre del negocio en el ticket</InfoLabel>
                      <TextInput
                        value={config.business_name ?? ""}
                        onChange={(event) =>
                          setConfig((current) =>
                            current
                              ? {
                                  ...current,
                                  business_name: event.target.value,
                                }
                              : current,
                          )
                        }
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
                      onChange={(event) =>
                        setConfig((current) =>
                          current
                            ? { ...current, simulation: event.target.checked }
                            : current,
                        )
                      }
                    />
                    <span>
                      <strong>Modo simulación</strong>
                      <small>
                        Activalo solo para probar el flujo sin enviar trabajos
                        reales a la impresora.
                      </small>
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
                    <SecondaryButton
                      type="button"
                      onClick={handleTestPrinter}
                      disabled={
                        testingPrinter ||
                        diagnosticLoadingKey !== null ||
                        !isPrintServer() ||
                        !hasAvailablePrinter
                      }
                    >
                      <MdPrint />
                      {testingPrinter
                        ? "Probando..."
                        : "Imprimir página de prueba"}
                    </SecondaryButton>
                  </ResponsiveRow>
                  {!isPrintServer() && (
                    <EmptyMessage>
                      La configuración se administra en la PC que ejecuta el
                      Print Agent.
                    </EmptyMessage>
                  )}
                </>
              ) : (
                <ActionButton
                  type="button"
                  onClick={() => void handleDiscoverPrinters()}
                  disabled={printerDiscoveryLoading}
                >
                  <MdRefresh />
                  {printerDiscoveryLoading
                    ? "Buscando impresoras..."
                    : "Consultar qué impresoras hay"}
                </ActionButton>
              )}
            </Section>

            {error && (
              <ErrorMessage>
                <MdError />
                <span>
                  No se pudo completar la operación. Revisá la conexión con el
                  Print Agent.
                </span>
              </ErrorMessage>
            )}

            <ResponsiveRow>
              <RefreshButton
                type="button"
                onClick={handleFullRefresh}
                disabled={loading}
              >
                <MdRefresh />
                {loading ? "Actualizando..." : "Actualizar estado"}
              </RefreshButton>
            </ResponsiveRow>
          </>
        ) : (
          <>
            {/* ================================================= */}
            {/* ESTADO GENERAL */}
            {/* ================================================= */}

            <DashboardGrid>
              <StatusCard $active={online}>
                <StatusCardHeader>
                  <StatusIcon $active={online}>
                    {online ? <MdWifi /> : <MdWifiOff />}
                  </StatusIcon>

                  <StatusDot $active={online} />
                </StatusCardHeader>

                <StatusCardTitle>Print Agent</StatusCardTitle>

                <StatusCardValue $active={online}>
                  {agentStatusText}
                </StatusCardValue>

                <StatusCardDescription>
                  Comunicación con el programa de impresión
                </StatusCardDescription>
              </StatusCard>

              <StatusCard $active={printerConnected}>
                <StatusCardHeader>
                  <StatusIcon $active={printerConnected}>
                    <MdUsb />
                  </StatusIcon>

                  <StatusDot $active={printerConnected} />
                </StatusCardHeader>

                <StatusCardTitle>Conexión USB</StatusCardTitle>

                <StatusCardValue $active={printerConnected}>
                  {printerConnectionText}
                </StatusCardValue>

                <StatusCardDescription>
                  Conexión física de la impresora
                </StatusCardDescription>
              </StatusCard>

              <StatusCard $active={printerOnline}>
                <StatusCardHeader>
                  <StatusIcon $active={printerOnline}>
                    {printerOnline ? <MdCheckCircle /> : <MdWarning />}
                  </StatusIcon>

                  <StatusDot $active={printerOnline} />
                </StatusCardHeader>

                <StatusCardTitle>Windows</StatusCardTitle>

                <StatusCardValue $active={printerOnline}>
                  {windowsStatusText}
                </StatusCardValue>

                <StatusCardDescription>
                  Estado de la impresora en Windows
                </StatusCardDescription>
              </StatusCard>
            </DashboardGrid>

            {/* ================================================= */}
            {/* BANNER DE ESTADO */}
            {/* ================================================= */}

            <StatusBanner $success={systemReady}>
              <StatusBannerIcon $success={systemReady}>
                {systemReady ? <MdCheckCircle /> : <MdWarning />}
              </StatusBannerIcon>

              <StatusBannerText>
                <StatusBannerTitle>
                  {systemReady
                    ? "Sistema listo para imprimir"
                    : "Revisar estado de impresión"}
                </StatusBannerTitle>

                <StatusBannerDescription>
                  {printerStatusMessage}
                </StatusBannerDescription>
              </StatusBannerText>
            </StatusBanner>

            {/* ================================================= */}
            {/* IMPRESORA */}
            {/* ================================================= */}

            <Section>
              <SectionHeader>
                <div>
                  <SectionTitle>
                    <SectionIcon>
                      <MdPrint />
                    </SectionIcon>
                    Impresora
                  </SectionTitle>

                  <SectionDescription>
                    Configuración y estado de la impresora actualmente
                    seleccionada.
                  </SectionDescription>
                </div>

                <MdSettings />
              </SectionHeader>

              {config && hasAvailablePrinter ? (
                <>
                  <PrinterSelector>
                    <PrinterIcon>
                      <MdPrint />
                    </PrinterIcon>

                    <div>
                      <InfoLabel>Impresora seleccionada</InfoLabel>

                      {printers.length > 0 || printerStatus?.printer ? (
                        <PrinterSelect
                          value={
                            selectedPrinter ||
                            printerStatus?.printer ||
                            config.printer_name ||
                            ""
                          }
                          onChange={(event) =>
                            handlePrinterChange(event.target.value)
                          }
                          disabled={!isPrintServer() || loading}
                        >
                          {printers.length > 0 ? (
                            printers.map((printer) => (
                              <option key={printer.name} value={printer.name}>
                                {printer.name}
                              </option>
                            ))
                          ) : (
                            <option
                              value={
                                printerStatus?.printer ||
                                config.printer_name ||
                                ""
                              }
                            >
                              {printerStatus?.printer ||
                                config.printer_name ||
                                "Impresora seleccionada"}
                            </option>
                          )}
                        </PrinterSelect>
                      ) : (
                        <InfoValue>No hay impresora disponible</InfoValue>
                      )}
                    </div>
                  </PrinterSelector>

                  <InfoGrid>
                    <InfoCard>
                      <InfoLabel>Tipo</InfoLabel>

                      <InfoValue>
                        {config.printer_type || "No especificado"}
                      </InfoValue>
                    </InfoCard>

                    <InfoCard>
                      <InfoLabel>Conexión</InfoLabel>

                      <InfoValue
                        $success={printerConnected}
                        $error={!printerConnected}
                      >
                        {printerConnected
                          ? "USB conectada"
                          : "USB desconectada"}
                      </InfoValue>
                    </InfoCard>

                    <InfoCard>
                      <InfoLabel>Estado Windows</InfoLabel>

                      <InfoValue
                        $success={printerOnline}
                        $error={!printerOnline}
                      >
                        {printerOnline ? "Online" : "Offline"}
                      </InfoValue>
                    </InfoCard>

                    {printerStatus?.driver && (
                      <InfoCard>
                        <InfoLabel>Driver</InfoLabel>

                        <InfoValue>{printerStatus.driver}</InfoValue>
                      </InfoCard>
                    )}
                  </InfoGrid>
                </>
              ) : (
                <ActionButton
                  type="button"
                  onClick={() => void handleDiscoverPrinters()}
                  disabled={printerDiscoveryLoading}
                >
                  <MdRefresh />
                  {printerDiscoveryLoading
                    ? "Buscando impresoras..."
                    : "Consultar qué impresoras hay"}
                </ActionButton>
              )}
            </Section>

            {/* ================================================= */}
            {/* COLAS */}
            {/* ================================================= */}

            <Section>
              <SectionHeader>
                <div>
                  <SectionTitle>
                    <SectionIcon>
                      <MdListAlt />
                    </SectionIcon>
                    Colas de impresión
                  </SectionTitle>

                  <SectionDescription>
                    Estado de los trabajos pendientes de impresión.
                  </SectionDescription>
                </div>
              </SectionHeader>

              <QueueSummary>
                <QueueSummaryItem>
                  <QueueSummaryIcon>
                    <MdPrint />
                  </QueueSummaryIcon>

                  <div>
                    <QueueBadgeLabel>Windows</QueueBadgeLabel>

                    <QueueBadgeValue>{windowsQueueCount}</QueueBadgeValue>
                  </div>
                </QueueSummaryItem>

                <QueueSummaryItem>
                  <QueueSummaryIcon>
                    <MdListAlt />
                  </QueueSummaryIcon>

                  <div>
                    <QueueBadgeLabel>Programa de impresión</QueueBadgeLabel>

                    <QueueBadgeValue>{agentQueueCount}</QueueBadgeValue>
                  </div>
                </QueueSummaryItem>

                <QueueBadge $warning={windowsQueueCount > 0}>
                  {windowsQueueCount > 0 ? (
                    <>
                      <MdWarning />
                      Hay trabajos pendientes
                    </>
                  ) : (
                    <>
                      <MdCheckCircle />
                      Cola de Windows vacía
                    </>
                  )}
                </QueueBadge>
              </QueueSummary>

              <ActionGrid>
                <SecondaryButton type="button" onClick={handleOpenQueueWindows}>
                  <MdPrint />
                  Abrir cola de Windows
                </SecondaryButton>
              </ActionGrid>
            </Section>

            {/* ================================================= */}
            {/* COMANDAS */}
            {/* ================================================= */}

            <Section>
              <SectionHeader>
                <div>
                  <SectionTitle>
                    <SectionIcon>
                      <MdReceiptLong />
                    </SectionIcon>
                    Comandas
                  </SectionTitle>

                  <SectionDescription>
                    Seleccioná una caja para consultar y reimprimir sus
                    comandas.
                  </SectionDescription>
                </div>
              </SectionHeader>

              <ActionButton type="button" onClick={() => setSubModal("orders")}>
                <MdReceiptLong />
                Ver comandas por caja
              </ActionButton>
            </Section>

            {/* ================================================= */}
            {/* DIAGNÓSTICO AVANZADO */}
            {/* ================================================= */}

            <Section>
              <SectionHeader>
                <div>
                  <SectionTitle>
                    <SectionIcon>
                      <MdSettings />
                    </SectionIcon>
                    Herramientas de revisión
                  </SectionTitle>
                  <SectionDescription>
                    Elegí qué querés revisar. Los resultados se muestran con
                    nombres claros, sin necesidad de interpretar datos técnicos.
                  </SectionDescription>
                </div>
              </SectionHeader>

              <ActionGrid>
                <SecondaryButton
                  type="button"
                  onClick={() => void runDiagnostic("status")}
                  disabled={diagnosticLoadingKey !== null || testingPrinter}
                >
                  <MdWifi />
                  {diagnosticLoadingKey === "status"
                    ? "Consultando estado..."
                    : "Consultar estado del servicio"}
                </SecondaryButton>
                <SecondaryButton
                  type="button"
                  onClick={() => void runDiagnostic("queue")}
                  disabled={diagnosticLoadingKey !== null || testingPrinter}
                >
                  <MdListAlt />
                  {diagnosticLoadingKey === "queue"
                    ? "Consultando cola..."
                    : "Ver trabajos pendientes"}
                </SecondaryButton>
                <SecondaryButton
                  type="button"
                  onClick={() => void runDiagnostic("jobs")}
                  disabled={diagnosticLoadingKey !== null || testingPrinter}
                >
                  <MdPrint />
                  {diagnosticLoadingKey === "jobs"
                    ? "Buscando trabajos..."
                    : "Consultar trabajos de impresión"}
                </SecondaryButton>

                {online && (
                  <SecondaryButton
                    type="button"
                    onClick={handleTestPrinter}
                    disabled={
                      testingPrinter ||
                      diagnosticLoadingKey !== null ||
                      !isPrintServer() ||
                      !hasAvailablePrinter
                    }
                  >
                    <MdPrint />
                    {testingPrinter
                      ? "Probando impresora..."
                      : "Hacer una impresión de prueba"}
                  </SecondaryButton>
                )}

                <SecondaryButton
                  type="button"
                  onClick={handleOpenQueueWindows}
                  disabled={diagnosticLoadingKey !== null || testingPrinter}
                >
                  <MdListAlt />
                  {diagnosticLoadingKey === "openQueue"
                    ? "Abriendo cola..."
                    : "Abrir cola de impresión de Windows"}
                </SecondaryButton>
              </ActionGrid>

              <div ref={diagnosticResultRef}>
                {activeDiagnostic &&
                  diagnosticLoadingKey === activeDiagnostic && (
                    <ApiDataCard>
                      <ApiDataTitle>
                        {activeDiagnostic === "status"
                          ? "Estado del servicio"
                          : activeDiagnostic === "queue"
                            ? "Trabajos pendientes"
                            : activeDiagnostic === "jobs"
                              ? "Trabajos de impresión"
                              : "Historial de impresión"}
                      </ApiDataTitle>
                      <ApiActionMessage>
                        Consultando información...
                      </ApiActionMessage>
                    </ApiDataCard>
                  )}

                {activeDiagnostic && diagnosticLoadingKey === null && error && (
                  <ApiDataCard>
                    <ApiDataTitle>
                      No se pudo completar la consulta
                    </ApiDataTitle>
                    <ApiActionMessage>
                      Verificá que el Print Agent esté iniciado y volvé a
                      intentarlo.
                    </ApiActionMessage>
                  </ApiDataCard>
                )}

                {activeDiagnostic === "status" &&
                  diagnostics?.status !== undefined &&
                  diagnosticLoadingKey === null &&
                  !error && (
                    <ApiDataCard>
                      <ApiDataTitle>Estado del servicio</ApiDataTitle>
                      {renderReadableData(diagnostics.status)}
                    </ApiDataCard>
                  )}

                {activeDiagnostic === "queue" &&
                  diagnostics?.queue !== undefined &&
                  diagnosticLoadingKey === null &&
                  !error && (
                    <ApiDataCard>
                      <ApiDataTitle>Trabajos pendientes</ApiDataTitle>
                      {renderReadableData(diagnostics.queue)}
                    </ApiDataCard>
                  )}

                {activeDiagnostic === "jobs" &&
                  diagnostics?.jobs !== undefined &&
                  diagnosticLoadingKey === null &&
                  !error && (
                    <ApiDataCard>
                      <ApiDataTitle>
                        Trabajos de impresión ({diagnostics.jobs.length})
                      </ApiDataTitle>
                      {diagnostics.jobs.length === 0 ? (
                        <ApiActionMessage>
                          No hay trabajos de impresión para mostrar.
                        </ApiActionMessage>
                      ) : (
                        <ApiRecordList>
                          {diagnostics.jobs.map((job, index) => {
                            const jobId = getJobId(job);
                            return (
                              <ApiRecordCard key={jobId ?? index}>
                                {renderReadableData(job)}
                                {jobId !== null && (
                                  <ApiJobCancelButton
                                    type="button"
                                    onClick={() => void handleCancelJob(jobId)}
                                    disabled={
                                      diagnosticLoadingKey !== null ||
                                      testingPrinter
                                    }
                                  >
                                    Cancelar trabajo #{jobId}
                                  </ApiJobCancelButton>
                                )}
                              </ApiRecordCard>
                            );
                          })}
                        </ApiRecordList>
                      )}
                    </ApiDataCard>
                  )}

                {activeDiagnostic === "history" &&
                  diagnostics?.history !== undefined &&
                  diagnosticLoadingKey === null &&
                  !error && (
                    <ApiDataCard>
                      <ApiDataTitle>
                        Historial de impresión ({diagnostics.history.length})
                      </ApiDataTitle>
                      {diagnostics.history.length === 0 ? (
                        <ApiActionMessage>
                          Todavía no hay registros en el historial.
                        </ApiActionMessage>
                      ) : (
                        renderReadableData(diagnostics.history)
                      )}
                    </ApiDataCard>
                  )}
              </div>
            </Section>

            {/* ================================================= */}
            {/* ERROR */}
            {/* ================================================= */}

            {error && (
              <ErrorMessage>
                <MdError />

                <span>
                  No se pudo actualizar correctamente el estado del Print Agent.
                </span>
              </ErrorMessage>
            )}

            {/* ================================================= */}
            {/* FOOTER */}
            {/* ================================================= */}

            <ResponsiveRow>
              <RefreshButton
                type="button"
                onClick={handleFullRefresh}
                disabled={loading}
              >
                <MdRefresh />

                {loading ? "Actualizando..." : "Actualizar estado"}
              </RefreshButton>
            </ResponsiveRow>
          </>
        )}
      </ModalForm>

      {/* =======================================================
          SUBMODAL - COMANDAS
      ======================================================= */}

      <ModalForm
        isOpen={isOpen && subModal === "orders"}
        title="Comandas"
        onClose={handleCloseSubModal}
      >
        <Section>
          <SelectWrapper>
            <SelectLabel>Seleccionar caja</SelectLabel>

            <Select
              value={selectedCashRegisterId}
              onChange={(event) => {
                setSelectedCashRegisterId(event.target.value);

                setSelectedOrderId(null);
              }}
            >
              <option value="">Seleccionar caja...</option>

              {cashRegisters
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.opened_at).getTime() -
                    new Date(a.opened_at).getTime(),
                )
                .map((cash) => (
                  <option key={cash.id} value={cash.id}>
                    {cash.date} —{" "}
                    {cash.shift === "morning" ? "Mañana" : "Noche"} —{" "}
                    {cash.status_cash_register === "open"
                      ? "ABIERTA"
                      : "CERRADA"}
                  </option>
                ))}
            </Select>
          </SelectWrapper>
        </Section>

        {selectedCashRegisterId && (
          <div className="containerOrders">
            <QueueSummary>
              <QueueSummaryItem>
                <QueueSummaryIcon>
                  <MdReceiptLong />
                </QueueSummaryIcon>

                <div>
                  <QueueBadgeLabel>Comandas encontradas</QueueBadgeLabel>

                  <QueueBadgeValue>{cashOrders.length}</QueueBadgeValue>
                </div>
              </QueueSummaryItem>
            </QueueSummary>

            {cashOrders.length === 0 ? (
              <EmptyMessage>
                No hay comandas asociadas a esta caja.
              </EmptyMessage>
            ) : (
              <OrderList>
                {cashOrders.map((order) => {
                  const selected = selectedOrderId === order.id;

                  return (
                    <OrderItem
                      key={order.id}
                      $selected={selected}
                      onClick={() => setSelectedOrderId(order.id)}
                    >
                      <OrderIcon>
                        <MdReceiptLong />
                      </OrderIcon>

                      <OrderInfo>
                        <OrderTitle>Comanda #{order.order_number}</OrderTitle>

                        <OrderCustomer>
                          {order.customer_name || "Sin cliente"}
                        </OrderCustomer>
                      </OrderInfo>

                      <OrderTotal>
                        ${order.total_price.toLocaleString("es-AR")}
                      </OrderTotal>
                    </OrderItem>
                  );
                })}
              </OrderList>
            )}
          </div>
        )}
        {selectedCashRegisterId ? (
          <ModalFooter>
            <ActionButton
              type="button"
              disabled={selectedOrder?.id === undefined}
              onClick={handleReprintOrder}
            >
              <MdPrint />

              {printingOrderId === selectedOrder?.id
                ? "Enviando..."
                : `${selectedOrder ? `Reimprimir comanda #${selectedOrder?.order_number}` : "Seleccione una comanda"}`}
            </ActionButton>
          </ModalFooter>
        ) : (
          <></>
        )}
      </ModalForm>
    </>
  );
};

export default PrintStatusModal;
