import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { AlertType } from "../Alert/Alert.tsx";
import Alert from "../Alert/Alert.tsx";


interface AlertContextProps {
  showAlert: (
    message: string,
    type: AlertType,
    duration?: number,
  ) => void;
}

interface AlertData {
  id: number;
  message: string;
  type: AlertType;
  duration: number;
}

const AlertContext = createContext<AlertContextProps | undefined>(
  undefined,
);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({
  children,
}: AlertProviderProps) => {
  const [alert, setAlert] = useState<AlertData | null>(null);

  const alertId = useRef(0);

  const showAlert = useCallback(
    (
      message: string,
      type: AlertType,
      duration = 5000,
    ) => {
      alertId.current += 1;

      setAlert({
        id: alertId.current,
        message,
        type,
        duration,
      });
    },
    [],
  );

  const closeAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      {alert && (
        <Alert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          duration={alert.duration}
          onClose={closeAlert}
        />
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);

  if (!context) {
    throw new Error(
      "useAlert debe utilizarse dentro de AlertProvider",
    );
  }

  return context;
};