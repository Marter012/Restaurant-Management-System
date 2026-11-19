import { ForkKnife } from "../../utils/icons.ts";
import type { StoreInfo } from "../../types/store.ts";
import { Page } from "../../styles/AppStyles.ts";
import { BrandMark } from "../StoreHeader/StoreHeader.styles.ts";
import { ClosedScreen, RetryButton } from "./ClosedStoreScreen.styles.ts";
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
          <ForkKnife />
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
