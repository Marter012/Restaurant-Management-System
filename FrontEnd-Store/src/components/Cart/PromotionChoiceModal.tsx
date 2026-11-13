import { FaCheckCircle, FaGift, FaTag } from "react-icons/fa";
import styled from "styled-components";
import type { EligibleStorePromotion } from "../../utils/cart.ts";
import { money } from "../../utils/money.ts";

const Backdrop = styled.div`position:fixed;inset:0;z-index:110;display:grid;place-items:center;padding:18px;background:rgba(25,18,13,.62);backdrop-filter:blur(5px);`;
const Panel = styled.section`width:min(100%,480px);max-height:85dvh;overflow:auto;padding:23px;border-radius:22px;background:var(--app-surface);box-shadow:0 24px 80px #0004;color:var(--app-ink);h2{margin:0 0 7px;color:var(--app-primary);font-size:1.25rem}.intro{margin:0 0 17px;color:var(--app-muted);font-size:.86rem;line-height:1.5}.choices{display:grid;gap:10px}.choice{display:grid;grid-template-columns:36px 1fr auto;align-items:center;gap:10px;width:100%;padding:13px;border:1px solid var(--app-border);border-radius:14px;background:#fff;text-align:left;color:var(--app-ink);cursor:pointer}.choice:hover{border-color:var(--app-accent);background:var(--app-surface-strong)}.icon{display:grid;place-items:center;width:36px;height:36px;border-radius:11px;background:var(--app-canvas);color:var(--app-primary)}.name{display:block;font-weight:850;font-size:.88rem}.detail{display:block;margin-top:4px;color:var(--app-muted);font-size:.73rem}.saving{color:#168044;font-size:.8rem;font-weight:900;white-space:nowrap}.skip{width:100%;margin-top:12px;min-height:42px;border:0;border-radius:12px;background:transparent;color:var(--app-muted);font-weight:800;cursor:pointer}`;

export function PromotionChoiceModal({ promotions, onChoose, onSkip }: { promotions: EligibleStorePromotion[]; onChoose: (id: string) => void; onSkip: () => void }) {
  return <Backdrop>
    <Panel role="dialog" aria-modal="true" aria-labelledby="promotion-choice-title">
      <h2 id="promotion-choice-title"><FaGift /> ¡Tenés promociones disponibles!</h2>
      <p className="intro">Tu carrito permite aplicar más de una promoción. Elegí cuál querés usar; te mostramos cuánto ahorrás con cada opción.</p>
      <div className="choices">
        {promotions.map(promo => <button className="choice" type="button" key={promo.id} onClick={() => onChoose(promo.id)}>
          <span className="icon"><FaTag /></span>
          <span><span className="name">{promo.name}</span><span className="detail">Precio promocional: {money(promo.price)}</span></span>
          <span className="saving"><FaCheckCircle /> −{money(promo.savings)}</span>
        </button>)}
      </div>
      <button className="skip" type="button" onClick={onSkip}>Continuar sin promoción</button>
    </Panel>
  </Backdrop>;
}
