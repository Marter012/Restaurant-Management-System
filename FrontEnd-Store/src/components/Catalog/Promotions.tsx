import { FaTag, FaPercent } from "react-icons/fa";
import type { StorePromotion } from "../../types/store.ts";
import { PromotionSection, PromotionGrid, PromotionCard } from "./PromotionsStyles.ts";
import { money } from "../../utils/money.ts";

const GENERAL_FOOD_IMAGE =
  "https://images.unsplash.com/photo-1547592180-85f173990554?w=900&q=85";

export const Promotions = ({ items }: { items: StorePromotion[] }) => {
  if (!items.length) return null;

  return (
    <PromotionSection id="promociones">
      <header>
        <span><FaTag /> OFERTAS PARA VOS</span>
        <h2>Promociones vigentes</h2>
        <p>Conocé las propuestas especiales disponibles en nuestra tienda.</p>
      </header>
      <PromotionGrid>
        {items.map((promotion) => (
          <PromotionCard key={promotion.id}>
            <div className="image-wrap">
              <img
                src={promotion.image?.trim() || GENERAL_FOOD_IMAGE}
                alt={`Comida incluida en ${promotion.name}`}
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.src = GENERAL_FOOD_IMAGE;
                }}
              />
              <span className="promotion-mark"><FaPercent /> PROMO</span>
              <span className="promotion-icon" aria-hidden="true"><FaTag /></span>
            </div>
            <div className="content">
              <h3>{promotion.name}</h3>
              <p>{promotion.description}</p>
              <small>Seleccioná los productos indicados para completar esta promoción. Se aplica al armar tu carrito.</small>
              <strong>{money(promotion.price)}</strong>
            </div>
          </PromotionCard>
        ))}
      </PromotionGrid>
    </PromotionSection>
  );
};
