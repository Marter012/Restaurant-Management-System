import { FaArrowRight, FaCheckCircle, FaClock, FaLeaf } from "react-icons/fa";
import type { StoreConfiguration } from "../../types/store.ts";
import { Hero, HeroContent, Eyebrow, HeroTitle, HeroText, HeroDecoration, StoreStatusBadge, HeroActions, HeroLink, HeroHighlights } from "./HeroSectionStyles.ts";
export const HeroSection = ({ config, salesAvailable = false }: { config?: StoreConfiguration; salesAvailable?: boolean }) => (
  <Hero id="inicio" $image={config?.hero_image || null}>
    <HeroDecoration aria-hidden="true" />
    <HeroContent>
      <StoreStatusBadge $open={salesAvailable}><span className="status-dot" />{salesAvailable ? "Estamos tomando pedidos" : "Consultá nuestro menú"}</StoreStatusBadge>
      <Eyebrow><FaLeaf /><span>{config?.tagline || "Hecho para disfrutar"}</span></Eyebrow>
      <HeroTitle>{config?.hero_title || "Algo rico está por empezar."}</HeroTitle>
      <HeroText>{config?.hero_description || "Elegí tus favoritos, personalizá tu pedido y disfrutá de algo delicioso."}</HeroText>
      <HeroActions><HeroLink href="#catalogo">Ver el menú <FaArrowRight /></HeroLink><HeroHighlights><span><FaCheckCircle /> Preparado al momento</span><span><FaClock /> Fácil y rápido</span></HeroHighlights></HeroActions>
    </HeroContent>
  </Hero>
);
