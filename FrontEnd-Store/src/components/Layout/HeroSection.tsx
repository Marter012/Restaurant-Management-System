import { ArrowRight, CheckCircle, Clock, Leaf } from "../../utils/icons.ts";
import type { StoreConfiguration } from "../../types/store.ts";
import { Hero, HeroContent, Eyebrow, HeroTitle, HeroText, HeroDecoration, StoreStatusBadge, HeroActions, HeroLink, HeroHighlights } from "./HeroSectionStyles.ts";
export const HeroSection = ({ config, salesAvailable = false, onBrowse }: { config?: StoreConfiguration; salesAvailable?: boolean; onBrowse?: () => void }) => (
  <Hero id="inicio" $image={config?.hero_image || null}>
    <HeroDecoration aria-hidden="true" />
    <HeroContent>
      <StoreStatusBadge $open={salesAvailable}><span className="status-dot" />{salesAvailable ? "Estamos tomando pedidos" : "Consultá nuestro menú"}</StoreStatusBadge>
      <Eyebrow><Leaf /><span>{config?.tagline || "Hecho para disfrutar"}</span></Eyebrow>
      <HeroTitle>{config?.hero_title || "Algo rico está por empezar."}</HeroTitle>
      <HeroText>{config?.hero_description || "Elegí tus favoritos, personalizá tu pedido y disfrutá de algo delicioso."}</HeroText>
      <HeroActions><HeroLink as="button" type="button" onClick={onBrowse}>Ver el menú <ArrowRight /></HeroLink><HeroHighlights><span><CheckCircle /> Preparado al momento</span><span><Clock /> Fácil y rápido</span></HeroHighlights></HeroActions>
    </HeroContent>
  </Hero>
);
