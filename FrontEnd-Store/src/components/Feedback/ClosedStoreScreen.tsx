import { FaUtensils } from "react-icons/fa";
import type { StoreInfo } from "../../types/store.ts";
import { Page } from "../../styles/AppStyles.ts";
import { BrandMark } from "../Layout/StoreHeaderStyles.ts";
import { ClosedScreen, RetryButton } from "./ClosedStoreScreenStyles.ts";
interface Props {
  store: StoreInfo | null;
  error?: string;
  onRetry?: () => void;
}
export const ClosedStoreScreen = ({ store, error, onRetry }: Props) => (
  <Page>
    <ClosedScreen>
      {!error && (
        <BrandMark>
          <FaUtensils />
        </BrandMark>
      )}
      <strong>{error ? "No pudimos cargar la tienda" : store?.name}</strong>
      <p>
        {error ||
          "En este momento no estamos recibiendo pedidos online. Volvé a visitarnos más tarde."}
      </p>
      {error && onRetry && (
        <RetryButton onClick={onRetry}>Reintentar</RetryButton>
      )}
    </ClosedScreen>
  </Page>
);
