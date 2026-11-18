import CardLoading from "../CardLoading/CardLoading.tsx";
import { WarningCircle, CheckCircle } from "@phosphor-icons/react";
import { RetryButton, LoadingScreenLayout } from "./LoadingScreenStyles.ts";
interface LoadingItem {
  label: string;
  completed: boolean;
}
interface LoadingScreenProps {
  items: LoadingItem[];
  error?: boolean;
  onRetry?: () => void;
}
const LoadingScreen = ({
  items,
  error = false,
  onRetry,
}: LoadingScreenProps) => (
  <LoadingScreenLayout>
    <CardLoading
      icon={error ? <WarningCircle /> : <CheckCircle />}
      text={
        error
          ? "No se pudo iniciar el sistema. Revisá la conexión."
          : (items.find((item) => !item.completed)?.label ??
            "Preparando sistema...")
      }
      progress={
        items.length
          ? (items.filter((item) => item.completed).length / items.length) * 100
          : 68
      }
    />
    {error && onRetry && (
      <RetryButton onClick={onRetry}>Reintentar</RetryButton>
    )}
  </LoadingScreenLayout>
);
export default LoadingScreen;
