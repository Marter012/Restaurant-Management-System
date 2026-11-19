import { Tag, Percent, ArrowRight } from "../../utils/icons.ts";
import type { StorePromotion } from "../../types/store.ts";
import { PromotionSection, PromotionGrid, PromotionCard } from "./Promotions.styles.ts";
import { money } from "../../utils/money.ts";

const GENERAL_FOOD_IMAGE = "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=85";

export const Promotions = ({ items, onSelect }: { items: StorePromotion[]; onSelect: (promotion: StorePromotion) => void }) => {
  if (!items.length) return null;
  return <PromotionSection id="promociones">
    <header><span><Tag /> OFERTAS PARA VOS</span><h2>Promociones vigentes</h2><p>Elegí una promoción y personalizá los productos que incluye.</p></header>
    <PromotionGrid>
      {items.map(promotion => <PromotionCard key={promotion.id} as="button" type="button" onClick={() => onSelect(promotion)} aria-label={`Configurar ${promotion.name}`}>
        <div className="image-wrap"><img src={promotion.image?.trim() || GENERAL_FOOD_IMAGE} alt={`Comida incluida en ${promotion.name}`} loading="lazy" onError={event => { event.currentTarget.src = GENERAL_FOOD_IMAGE; }}/><span className="promotion-mark"><Percent /> PROMO</span><span className="promotion-icon"><Tag /></span></div>
        <div className="content"><h3>{promotion.name}</h3><p>{promotion.description}</p><small>Elegí los productos incluidos en esta promoción.</small><strong>{money(promotion.price)}</strong><span className="select-promotion">Elegir promoción <ArrowRight size={16}/></span></div>
      </PromotionCard>)}
    </PromotionGrid>
  </PromotionSection>;
};
