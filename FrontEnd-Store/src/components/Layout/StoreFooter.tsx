import type { StoreInfo } from "../../types/store.ts";
import { ArrowRight, WhatsappLogo, Storefront } from "../../utils/icons.ts";
import { Footer, FooterBrand, FooterContact, FooterMain, FooterBottom } from "./StoreFooterStyles.ts";

export const StoreFooter = ({ store }: { store: StoreInfo | null }) => {
  const phone = store?.phone_number?.replace(/\D/g, "");
  const whatsappUrl = phone ? `https://wa.me/${phone}` : null;

  return (
    <Footer aria-label="Información del establecimiento">
      <FooterMain>
        <FooterBrand>
          <span className="brand-mark"><Storefront weight="duotone" /></span>
          <span className="brand-copy">
            <strong>{store?.name || "Nuestro comercio"}</strong>
            <small>Gracias por elegirnos. ¡Esperamos tu próximo pedido!</small>
          </span>
        </FooterBrand>
        {whatsappUrl && (
          <FooterContact href={whatsappUrl} target="_blank" rel="noreferrer">
            <WhatsappLogo weight="fill" />
            <span>Contactar por WhatsApp</span>
            <ArrowRight weight="bold" className="arrow" />
          </FooterContact>
        )}
      </FooterMain>
      <FooterBottom>
        <span>© {new Date().getFullYear()} {store?.name || "Nuestro comercio"}. Todos los derechos reservados.</span>
        <span className="footer-note">Hecho para disfrutar cada pedido.</span>
      </FooterBottom>
    </Footer>
  );
};
