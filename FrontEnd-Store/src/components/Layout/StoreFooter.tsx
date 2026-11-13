import type { StoreInfo } from "../../types/store.ts";
import { Footer } from "./StoreFooterStyles.ts";
export const StoreFooter = ({ store }: { store: StoreInfo | null }) => (
  <Footer>
    <strong>{store?.name || "Boutique de Sabores"}</strong>
    <span>Productos seleccionados, promociones y pedidos online.</span>
    {store?.phone_number && (
      <a
        href={`https://wa.me/${store.phone_number.replace(/\D/g, "")}`}
        target="_blank"
        rel="noreferrer"
      >
        Contactanos por WhatsApp
      </a>
    )}
    <small>© {new Date().getFullYear()} · Todos los derechos reservados</small>
  </Footer>
);
