import {
  ArrowRight,
  CheckCircle,
  Clock,
  CreditCard,
  ForkKnife,
  ShoppingBag,
  User,
  WhatsappLogo,
} from "../../utils/icons.ts";
import type { StoreConfiguration } from "../../types/store.ts";
import {
  Hero,
  HeroBackdrop,
  HeroLayout,
  HeroMain,
  StoreStatusBadge,
  HeroEyebrow,
  HeroTitle,
  HeroDescription,
  HeroActions,
  PrimaryAction,
  WhatsAppAction,
  HeroTrustLine,
  HowToCard,
  HowToHeader,
  StepsList,
  Step,
  StepIcon,
  StepText,
  StepIndex,
  CardFootnote,
} from "./HeroSection.styles.ts";

interface HeroSectionProps {
  config?: StoreConfiguration;
  salesAvailable?: boolean;
  onBrowse?: () => void;
  whatsappPhone?: string;
}

const getWhatsAppUrl = (phone?: string, storeName?: string) => {
  const normalizedPhone = (phone || "").replace(/\D/g, "");
  if (normalizedPhone.length < 8 || normalizedPhone.length > 15) return undefined;

  const message = `¡Hola! Quisiera hacer una consulta sobre ${storeName || "el menú"}.`;
  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
};

export const HeroSection = ({
  config,
  salesAvailable = false,
  onBrowse,
  whatsappPhone,
}: HeroSectionProps) => {
  const whatsappUrl = getWhatsAppUrl(whatsappPhone, config?.store_title);

  return (
    <Hero id="inicio" $image={config?.hero_image || null}>
      <HeroBackdrop aria-hidden="true">
        <span />
        <span />
        <span />
      </HeroBackdrop>

      <HeroLayout>
        <HeroMain>
          <StoreStatusBadge $open={salesAvailable} role="status" aria-live="polite">
            <span className="status-indicator" />
            <span className="status-copy">
              <strong>{salesAvailable ? "¡Estamos tomando pedidos!" : "Por ahora estamos cerrados"}</strong>
              <small>{salesAvailable ? "Prepará tus favoritos, estamos listos para recibirte." : "Podés recorrer el menú y consultar por WhatsApp."}</small>
            </span>
            <CheckCircle weight="fill" className="status-check" />
          </StoreStatusBadge>

          <HeroEyebrow>
            <span className="eyebrow-line" />
            <span>{config?.tagline || "Un buen momento empieza con algo rico"}</span>
          </HeroEyebrow>

          <HeroTitle>{config?.hero_title || "Elegí algo rico. Nosotros nos encargamos del resto."}</HeroTitle>
          <HeroDescription>
            {config?.hero_description ||
              "Descubrí nuestros sabores, combiná tus favoritos y recibí tu pedido de la manera más simple."}
          </HeroDescription>

          <HeroActions>
            <PrimaryAction type="button" onClick={onBrowse}>
              {salesAvailable ? "Hacer tu pedido" : "Explorar el menú"}
              <ArrowRight weight="bold" />
            </PrimaryAction>

            {whatsappUrl ? (
              <WhatsAppAction href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsappLogo weight="fill" />
                <span>Hablar por WhatsApp</span>
              </WhatsAppAction>
            ) : (
              <WhatsAppAction as="span" $disabled title="El comercio todavía no configuró su WhatsApp">
                <WhatsappLogo weight="fill" />
                <span>WhatsApp no disponible</span>
              </WhatsAppAction>
            )}
          </HeroActions>

          <HeroTrustLine>
            <span><CheckCircle weight="fill" /> Fácil y rápido</span>
            <span><ShoppingBag weight="fill" /> Elegís a tu manera</span>
            <span><Clock weight="fill" /> Sin llamadas ni esperas</span>
          </HeroTrustLine>
        </HeroMain>

        <HowToCard>
          <HowToHeader>
            <span className="howto-kicker">EN SOLO 4 PASOS</span>
            <h2>¿Cómo hacer tu pedido?</h2>
            <p>Es simple. Lo hacés desde acá.</p>
          </HowToHeader>

          <StepsList>
            <Step>
              <StepIndex>01</StepIndex>
              <StepIcon $tone="orange"><ForkKnife weight="duotone" /></StepIcon>
              <StepText>
                <strong>Explorá el menú</strong>
                <span>Conocé productos y promociones.</span>
              </StepText>
            </Step>
            <Step>
              <StepIndex>02</StepIndex>
              <StepIcon $tone="yellow"><ShoppingBag weight="duotone" /></StepIcon>
              <StepText>
                <strong>Elegí tus favoritos</strong>
                <span>Personalizá y agregá al carrito.</span>
              </StepText>
            </Step>
            <Step>
              <StepIndex>03</StepIndex>
              <StepIcon $tone="pink"><User weight="duotone" /></StepIcon>
              <StepText>
                <strong>Completá tus datos</strong>
                <span>Indicá teléfono y entrega o retiro.</span>
              </StepText>
            </Step>
            <Step>
              <StepIndex>04</StepIndex>
              <StepIcon $tone="green"><CreditCard weight="duotone" /></StepIcon>
              <StepText>
                <strong>Elegí cómo pagar</strong>
                <span>Mercado Pago o coordiná con el negocio.</span>
              </StepText>
            </Step>
          </StepsList>

          <CardFootnote>
            <WhatsappLogo weight="fill" /> ¿Tenés dudas? Escribinos y te ayudamos.
          </CardFootnote>
        </HowToCard>
      </HeroLayout>
    </Hero>
  );
};
