import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store.ts";
import {
  setProductError,
  setProductLoading,
  setProducts,
} from "../store/slices/productSlice.ts";
import { getProductsAPI } from "../services/productService.ts";
import {
  setOrderError,
  setOrderLoading,
  setOrders,
} from "../store/slices/orderSlice.ts";
import { getOrdersAPI } from "../services/orderService.ts";
import {
  setCashRegisterError,
  setCashRegisterLoading,
  setCashRegisters,
} from "../store/slices/cashRegisterSlice.ts";
import { getCashRegistersAPI } from "../services/cashRegisterService.ts";
import {
  setCashMovements,
  setCashMovemenvtError,
  setCashMovemenvtLoading,
} from "../store/slices/cashMovementSlice.ts";
import { getCashMovementsAPI } from "../services/cashMovementService.ts";
import {
  setPromotionError,
  setPromotionLoading,
  setPromotions,
} from "../store/slices/promotionSlice.ts";
import { getPromotionsAPI } from "../services/promotionService.ts";
import LoadingScreen from "../components/LoaginsScreen/LoadingScreen.tsx";
import {
  startWebSocket,
  stopWebSocket,
} from "../websocket/websocketService.ts";
import { getHealth, getPrinterStatusAPI } from "../services/printAgentService.ts";
import { setPrintAgentStatus } from "../store/slices/printAgentSlice.ts";

interface LoadingState {
  server: boolean;
  products: boolean;
  orders: boolean;
  cashRegister: boolean;
  cashMovements: boolean;
  promotions: boolean;
}

interface AppInitializerProps {
  children: React.ReactNode;
}

const INITIAL_LOADING_STATE: LoadingState = {
  server: false,
  products: false,
  orders: false,
  cashRegister: false,
  cashMovements: false,
  promotions: false,
};

const APP_INITIALIZED_KEY = "app-initialized";

const AppInitializer = ({ children }: AppInitializerProps) => {
  const dispatch = useDispatch<AppDispatch>();

  // La pantalla completa solo se muestra durante la primera inicialización
  // de esta pestaña. Las recargas posteriores actualizan los datos en segundo plano.
  const [showInitialLoading, setShowInitialLoading] = useState(
    () => sessionStorage.getItem(APP_INITIALIZED_KEY) !== "true",
  );

  const [loading, setLoading] = useState<LoadingState>(INITIAL_LOADING_STATE);
  const [error, setError] = useState(false);

  const updateLoading = (key: keyof LoadingState, value: boolean) => {
    setLoading((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const initializeApp = async () => {
    setError(false);

    setLoading({ ...INITIAL_LOADING_STATE });

    try {
      /*
       * PRODUCTOS
       */
      const loadProducts = async () => {
        try {
          dispatch(setProductLoading(true));
          dispatch(setProductError(null));

          const data = await getProductsAPI();

          dispatch(setProducts(data));
          updateLoading("products", true);
        } catch (error) {
          console.error("Error cargando productos:", error);
          dispatch(setProductError("No se pudieron cargar los productos"));
          throw error;
        } finally {
          dispatch(setProductLoading(false));
        }
      };

      /*
       * ÓRDENES
       */
      const loadOrders = async () => {
        try {
          dispatch(setOrderLoading(true));
          dispatch(setOrderError(null));

          const data = await getOrdersAPI();

          dispatch(setOrders(data));
          updateLoading("orders", true);
        } catch (error) {
          console.error("Error cargando órdenes:", error);
          dispatch(setOrderError("No se pudieron cargar las órdenes"));
          throw error;
        } finally {
          dispatch(setOrderLoading(false));
        }
      };

      /*
       * CAJA
       */
      const loadCashRegister = async () => {
        try {
          dispatch(setCashRegisterLoading(true));
          dispatch(setCashRegisterError(null));

          const data = await getCashRegistersAPI();

          dispatch(setCashRegisters(data));
          updateLoading("cashRegister", true);
        } catch (error) {
          console.error("Error cargando caja registradora:", error);
          dispatch(
            setCashRegisterError("No se pudo cargar la caja registradora"),
          );
          throw error;
        } finally {
          dispatch(setCashRegisterLoading(false));
        }
      };

      /*
       * MOVIMIENTOS DE CAJA
       */
      const loadCashMovements = async () => {
        try {
          dispatch(setCashMovemenvtLoading(true));
          dispatch(setCashMovemenvtError(null));

          const data = await getCashMovementsAPI();

          dispatch(setCashMovements(data));
          updateLoading("cashMovements", true);
        } catch (error) {
          console.error("Error cargando movimientos de caja:", error);
          dispatch(
            setCashMovemenvtError(
              "No se pudieron cargar los movimientos de caja",
            ),
          );
          throw error;
        } finally {
          dispatch(setCashMovemenvtLoading(false));
        }
      };

      /*
       * PROMOCIONES
       */
      const loadPromotions = async () => {
        try {
          dispatch(setPromotionLoading(true));
          dispatch(setPromotionError(null));

          const data = await getPromotionsAPI();

          dispatch(setPromotions(data));
          updateLoading("promotions", true);
        } catch (error) {
          console.error("Error cargando promociones:", error);
          dispatch(setPromotionError("No se pudieron cargar las promociones"));
          throw error;
        } finally {
          dispatch(setPromotionLoading(false));
        }
      };

      const loadPrintAgent = async () => {
        try {
          const agentConnected = await getHealth();

          if (!agentConnected) {
            dispatch(
              setPrintAgentStatus({
                connected: false,
                status: null,
                timestamp: new Date().toISOString(),
              }),
            );

            return;
          }

          const printerStatus = await getPrinterStatusAPI();

          dispatch(
            setPrintAgentStatus({
              connected: true,
              status: printerStatus,
              timestamp: new Date().toISOString(),
            }),
          );
        } catch (error) {
          console.error("Error consultando el Print Agent:", error);

          dispatch(
            setPrintAgentStatus({
              connected: false,
              status: null,
              timestamp: new Date().toISOString(),
            }),
          );
        }
      };
      /*
       * Todas las APIs se ejecutan al mismo tiempo.
       */
      await Promise.all([
        loadProducts(),
        loadOrders(),
        loadCashRegister(),
        loadCashMovements(),
        loadPromotions(),
        loadPrintAgent(),
      ]);

      /*
       * Todo terminó correctamente.
       */
      updateLoading("server", true);

      /*
       * La inicialización se completó. En recargas posteriores no se mostrará
       * la pantalla completa mientras los datos se actualizan.
       */
      sessionStorage.setItem(APP_INITIALIZED_KEY, "true");
      setShowInitialLoading(false);

      /*
       * Una vez que la carga inicial terminó, abrimos una única conexión
       * WebSocket para mantener todos los clientes sincronizados.
       */
      startWebSocket(dispatch);
    } catch (error) {
      console.error("Error inicializando la aplicación:", error);
      setError(true);
    }
  };

  useEffect(() => {
    void initializeApp();

    return () => {
      stopWebSocket();
    };
    // initializeApp se ejecuta al montar el inicializador.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
   * Si hubo error, conservamos el manejo existente.
   */
  if (error) {
    return (
      <LoadingScreen
        items={[
          {
            label: "Conectando con el servidor",
            completed: false,
          },
          {
            label: "No se pudo iniciar el sistema",
            completed: false,
          },
        ]}
        error
        onRetry={initializeApp}
      />
    );
  }

  const isReady =
    loading.server &&
    loading.products &&
    loading.orders &&
    loading.cashRegister &&
    loading.cashMovements &&
    loading.promotions;

  /*
   * Solo mostramos la pantalla de carga completa durante la primera
   * inicialización de la pestaña. En una recarga posterior, los children
   * permanecen visibles mientras las APIs actualizan Redux.
   */
  if (!isReady && showInitialLoading) {
    return (
      <LoadingScreen
        items={[
          {
            label: "Conectando con el servidor",
            completed: loading.server,
          },
          {
            label: "Cargando productos",
            completed: loading.products,
          },
          {
            label: "Cargando comandas",
            completed: loading.orders,
          },
          {
            label: "Cargando caja",
            completed: loading.cashRegister,
          },
          {
            label: "Cargando movimientos",
            completed: loading.cashMovements,
          },
          {
            label: "Cargando promociones",
            completed: loading.promotions,
          },
        ]}
      />
    );
  }

  return <>{children}</>;
};

export default AppInitializer;
