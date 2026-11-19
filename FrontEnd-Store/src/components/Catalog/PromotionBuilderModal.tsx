import { useMemo, useState } from "react";
import { Minus, Plus, Tag, X } from "../../utils/icons.ts";
import type { StoreProduct, StorePromotion } from "../../types/store.ts";
import { money } from "../../utils/money.ts";
import { PromoBackdrop, PromoDialog, PromoFooter, PromoGroup, PromoGroups, PromoHeader, PromoProductRow } from "./PromotionBuilderModalStyles.ts";

type GroupSelection = Record<number, Record<string, number>>;
type Props = {
  promotion: StorePromotion;
  products: StoreProduct[];
  salesAvailable: boolean;
  onClose: () => void;
  onConfirm: (selection: GroupSelection) => void;
};

export function PromotionBuilderModal({ promotion, products, salesAvailable, onClose, onConfirm }: Props) {
  const groups = promotion.items || [];
  const [selection, setSelection] = useState<GroupSelection>(() => {
    const initial: GroupSelection = {};
    groups.forEach((group, index) => {
      const eligible = products.filter(product => group.product_ids.includes(product.id) && product.available);
      if (eligible.length === 1) initial[index] = { [eligible[0].id]: group.quantity };
      else initial[index] = {};
    });
    return initial;
  });

  const groupTotals = groups.map((_, index) => Object.values(selection[index] || {}).reduce((sum, quantity) => sum + quantity, 0));
  const complete = groups.length > 0 && groups.every((group, index) => groupTotals[index] === group.quantity);
  const selectedCount = groupTotals.reduce((sum, quantity) => sum + quantity, 0);
  const eligibleByGroup = useMemo(() => groups.map(group => products.filter(product => group.product_ids.includes(product.id) && product.available)), [groups, products]);

  const changeQuantity = (groupIndex: number, productId: string, delta: number) => {
    setSelection(previous => {
      const group = groups[groupIndex];
      const current = previous[groupIndex] || {};
      const total = Object.values(current).reduce((sum, quantity) => sum + quantity, 0);
      const nextValue = Math.max(0, Math.min(group.quantity, (current[productId] || 0) + delta));
      if (delta > 0 && total >= group.quantity) return previous;
      return { ...previous, [groupIndex]: { ...current, [productId]: nextValue } };
    });
  };

  return <PromoBackdrop onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <PromoDialog role="dialog" aria-modal="true" aria-labelledby="promotion-builder-title">
      <PromoHeader>
        <div><span className="eyebrow"><Tag size={13} /> ARMÁ TU PROMOCIÓN</span><h2 id="promotion-builder-title">{promotion.name}</h2><p>{promotion.description || "Elegí los productos que querés incluir."}</p></div>
        <button type="button" onClick={onClose} aria-label="Cerrar"><X size={19}/></button>
      </PromoHeader>
      <PromoGroups>
        {groups.map((group, groupIndex) => {
          const selectedTotal = groupTotals[groupIndex] || 0;
          const eligible = eligibleByGroup[groupIndex] || [];
          return <PromoGroup key={`${group.name}-${groupIndex}`}>
            <div className="group-head"><h3>{group.name}</h3><span className="required">{selectedTotal}/{group.quantity} unidades</span></div>
            {!eligible.length ? <p>No hay productos disponibles para este grupo de la promoción.</p> : <div className="choices">
              {eligible.map(product => {
                const quantity = selection[groupIndex]?.[product.id] || 0;
                return <PromoProductRow key={product.id}>
                  <div className="product"><strong>{product.name}</strong><small>{product.category} · {money(product.final_price)}</small></div>
                  <div className="quantity"><button type="button" aria-label={`Quitar ${product.name}`} disabled={quantity === 0} onClick={() => changeQuantity(groupIndex, product.id, -1)}><Minus size={13}/></button><output>{quantity}</output><button type="button" aria-label={`Agregar ${product.name}`} disabled={selectedTotal >= group.quantity} onClick={() => changeQuantity(groupIndex, product.id, 1)}><Plus size={13}/></button></div>
                </PromoProductRow>;
              })}
            </div>}
          </PromoGroup>;
        })}
      </PromoGroups>
      <PromoFooter>
        <div className="price"><span>{selectedCount} productos seleccionados</span><strong>{money(promotion.price)}</strong></div>
        <div className="actions"><button type="button" onClick={onClose}>Cancelar</button><button className="primary" type="button" disabled={!complete || !salesAvailable} onClick={() => onConfirm(selection)}>{!salesAvailable ? "Compras pausadas" : complete ? "Agregar promoción" : "Completá la selección"}</button></div>
      </PromoFooter>
    </PromoDialog>
  </PromoBackdrop>;
}
