import { FaCalendarAlt, FaCheckCircle, FaPercent } from "react-icons/fa";
import type { Promotion } from "../../../interfaces/Promotion";
import {
  PromotionOptions,
  PromotionItems,
  PromotionItem,
} from "./ModalPromotionStyles";

interface Props {
  promotion: Promotion;
  getProductName: (id: string) => string;
}
const normalize = (value?: string) =>
  (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export default function ModalPromotionOptions({
  promotion,
  getProductName,
}: Props) {
  return (
    <PromotionOptions>
      <div className="promotion-overview">
        <div className="promotion-overview-image">
          <img
            src={promotion.image || "/images/Products.png"}
            alt={promotion.name}
            onError={(event) => {
              event.currentTarget.src = "/images/Products.png";
            }}
          />
          <span className="promotion-image-tag">
            <FaPercent /> Promoción
          </span>
        </div>
        <div className="promotion-overview-main">
          <h2>{promotion.name}</h2>
          <strong className="promotion-overview-price">
            ${promotion.price.toLocaleString("es-AR")}
          </strong>
        </div>
        <div className="promotion-overview-status">
          <span
            className={`promotion-detail-status ${promotion.status ? "is-active" : "is-inactive"}`}
          >
            <FaCheckCircle />
            {promotion.status ? "Activa" : "Inactiva"}
          </span>
          <span className="promotion-availability">
            <FaCalendarAlt />
            {promotion.status
              ? "Disponible para ventas"
              : "No disponible para ventas"}
          </span>
        </div>
      </div>
      <div className="promotion-description-row">
        <span className="promotion-description-icon">▤</span>
        <strong>Descripción</strong>
        <span className="promotion-description-value">
          {promotion.description || "Sin descripción"}
        </span>
      </div>
      <PromotionItems>
        <div className="promotion-products-title">
          <span className="promotion-products-title-icon">▱</span>
          <h3>Productos incluidos</h3>
        </div>
        <div className="promotion-groups-list">
          {promotion.items.map((item) => {
            const isDrink = normalize(item.name).includes("bebida");
            return (
              <PromotionItem key={item.id}>
                <div className="promotion-group-meta">
                  <span className="promotion-group-icon" aria-hidden="true">
                    {isDrink ? "🥤" : "🥟"}
                  </span>
                  <div className="promotion-group-label">
                    <strong>{item.name}</strong>
                    <span>
                      {item.quantity}{" "}
                      {Number(item.quantity) === 1 ? "unidad" : "unidades"} a
                      elegir
                    </span>
                  </div>
                </div>
                <div className="promotion-detail-products">
                  {item.product_ids.map((id) => (
                    <span className="promotion-product-chip" key={id}>
                      {getProductName(id)} 
                    </span>
                  ))}
                </div>
              </PromotionItem>
            );
          })}
        </div>
      </PromotionItems>
    </PromotionOptions>
  );
}
