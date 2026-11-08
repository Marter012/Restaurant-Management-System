import styled from "styled-components";

/* =========================================================
   CONTENEDOR GENERAL
========================================================= */

export const ProductOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 22px;

  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 4px 0 12px;

  color: var(--app-ink);

  @media (max-width: 600px) {
    gap: 16px;
  }
`;

/* =========================================================
   BLOQUE PRINCIPAL
   Escritorio: imagen + información en dos columnas.
   Hasta 900px: imagen + nombre/etiquetas arriba;
   métricas debajo ocupando todo el ancho.
========================================================= */

export const ProductMain = styled.section`
  display: grid;
  grid-template-columns: minmax(260px, 0.9fr) minmax(0, 1.1fr);
  align-items: stretch;
  gap: 24px;

  width: 100%;
  min-width: 0;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    grid-template-areas:
      "image title"
      "image badges"
      "image description"
      "metrics metrics";
    align-items: center;
    gap: 12px 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1.18fr);
    gap: 10px;
  }
`;

/* =========================================================
   IMAGEN
========================================================= */

export const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-width: 0;
  height: 300px;
  overflow: hidden;
  box-sizing: border-box;

  border: 1px solid var(--app-border);
  border-radius: 19px;
  background: var(--app-canvas);

  @media (max-width: 900px) {
    grid-area: image;
    height: clamp(150px, 24vw, 220px);
    max-width: 100%;
  }

  @media (max-width: 480px) {
    height: clamp(118px, 34vw, 160px);
    border-radius: 14px;
  }
`;

export const ProductImage = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;

  transition: transform 250ms ease;

  ${ProductImageWrapper}:hover & {
    transform: scale(1.025);
  }
`;

export const ProductImagePlaceholder = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  color: var(--app-accent);
  font-size: 42px;
`;

export const ProductImageOverlay = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;

  display: grid;
  place-items: center;

  width: 38px;
  height: 38px;
  border: 1px solid rgba(var(--app-shadow-rgb), 0.12);
  border-radius: 11px;

  background: rgba(74, 40, 24, 0.88);
  color: white;
  font-size: 17px;
  pointer-events: none;

  @media (max-width: 480px) {
    right: 7px;
    bottom: 7px;
    width: 31px;
    height: 31px;
    border-radius: 9px;
    font-size: 14px;
  }
`;

/* =========================================================
   IDENTIDAD DEL PRODUCTO
   display: contents permite ubicar métricas debajo de
   imagen/identidad sin modificar el JSX ni duplicar datos.
========================================================= */

export const ProductInformation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 13px;
  min-width: 0;

  @media (max-width: 900px) {
    display: contents;
  }
`;

export const ProductTitle = styled.h2`
  margin: 0;
  min-width: 0;

  color: var(--app-primary);
  font-size: clamp(25px, 3vw, 36px);
  font-weight: 850;
  line-height: 1.15;
  letter-spacing: -0.6px;
  overflow-wrap: anywhere;

  @media (max-width: 900px) {
    grid-area: title;
    align-self: end;
    margin: 0;
    font-size: clamp(20px, 3vw, 29px);
  }

  @media (max-width: 480px) {
    font-size: clamp(17px, 4.8vw, 22px);
    line-height: 1.16;
  }
`;

export const ProductBadges = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  min-width: 0;

  @media (max-width: 900px) {
    grid-area: badges;
    align-self: start;
    margin: 0;
  }

  @media (max-width: 480px) {
    gap: 6px;
  }
`;

interface BadgeProps {
  variant: "category" | "active" | "inactive";
}

export const ProductBadge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  min-width: 0;
  max-width: 100%;
  min-height: 33px;
  box-sizing: border-box;
  padding: 7px 11px;
  border-radius: 30px;

  font-size: 0.79rem;
  font-weight: 750;
  line-height: 1.2;

  svg {
    flex: 0 0 auto;
    font-size: 13px;
  }

  span {
    min-width: 0;
    overflow-wrap: anywhere;
  }

  ${({ variant }) =>
    variant === "category" &&
    `
      background: #f0dcc3;
      color: #70401b;
    `}

  ${({ variant }) =>
    variant === "active" &&
    `
      background: #dcebd9;
      color: #16733a;
    `}

  ${({ variant }) =>
    variant === "inactive" &&
    `
      background: #f5dada;
      color: #a51e18;
    `}

  @media (max-width: 480px) {
    min-height: 29px;
    padding: 6px 8px;
    gap: 5px;
    font-size: 0.68rem;
  }
`;

export const ProductDescriptionText = styled.p`
  margin: 0;
  color: var(--app-muted-dark);
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-wrap: anywhere;

  @media (max-width: 900px) {
    grid-area: description;
    margin: 0;
  }
`;

/* =========================================================
   MÉTRICAS
========================================================= */

export const ProductMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;

  width: 100%;
  min-width: 0;
  margin-top: auto;

  @media (max-width: 900px) {
    grid-area: metrics;
    margin-top: 0;
  }

  @media (max-width: 480px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 8px;
  }
`;

export const ProductMetric = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;

  min-width: 0;
  min-height: 78px;
  box-sizing: border-box;
  padding: 12px;

  border: 1px solid var(--app-border);
  border-radius: 14px;
  background: var(--app-surface);

  @media (max-width: 600px) {
    min-height: 65px;
    padding: 10px;
  }
`;

export const MetricIcon = styled.div`
  display: grid;
  place-items: center;
  flex: 0 0 38px;

  width: 38px;
  height: 38px;
  border-radius: 11px;

  background: var(--app-primary-soft);
  color: var(--app-accent);
  font-size: 18px;

  @media (max-width: 480px) {
    flex-basis: 34px;
    width: 34px;
    height: 34px;
    font-size: 16px;
  }
`;

export const MetricInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 1 auto;
  min-width: 0;
`;

export const MetricLabel = styled.span`
  color: var(--app-muted-dark);
  font-size: 0.74rem;
  font-weight: 600;
  line-height: 1.3;
  overflow-wrap: anywhere;
`;

interface MetricValueProps {
  $danger?: boolean;
  $success?: boolean;
}

export const MetricValue = styled.span<MetricValueProps>`
  min-width: 0;
  color: var(--app-primary);
  font-size: 1rem;
  font-weight: 850;
  line-height: 1.3;
  overflow-wrap: anywhere;
  word-break: normal;

  ${({ $danger }) => $danger && "color: #a51e18;"}
  ${({ $success }) => $success && "color: #16733a;"}

  @media (max-width: 480px) {
    font-size: 0.94rem;
  }
`;

/* =========================================================
   DETALLES: INGREDIENTES, GUARNICIONES Y DESCRIPCIÓN
========================================================= */

export const ProductDetailsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: stretch;
  gap: 14px;

  width: 100%;
  min-width: 0;

  @media (max-width: 650px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 11px;
  }
`;

export const ProductDetailCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;

  min-width: 0;
  min-height: 116px;
  box-sizing: border-box;
  padding: 16px;

  border: 1px solid var(--app-border);
  border-radius: 16px;
  background: var(--app-white);

  @media (max-width: 600px) {
    min-height: auto;
    padding: 13px;
    gap: 10px;
  }
`;

export const ProductDetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  color: var(--app-accent);

  svg {
    flex: 0 0 auto;
    font-size: 20px;
  }

  h3 {
    min-width: 0;
    margin: 0;
    color: var(--app-primary);
    font-size: 0.98rem;
    font-weight: 800;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }

  @media (max-width: 480px) {
    gap: 8px;

    svg {
      font-size: 18px;
    }

    h3 {
      font-size: 0.9rem;
    }
  }
`;

export const ProductDetailContent = styled.div`
  display: flex;
  align-items: flex-start;

  min-width: 0;
  min-height: 42px;
  box-sizing: border-box;
  padding: 11px;

  border-radius: 11px;
  background: var(--app-surface);
  color: var(--app-ink);

  font-size: 0.85rem;
  line-height: 1.5;
  overflow-wrap: anywhere;

  @media (max-width: 480px) {
    min-height: 36px;
    padding: 9px;
    font-size: 0.8rem;
  }
`;

export const ProductChipList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 7px;

  width: 100%;
  min-width: 0;
`;

export const ProductChip = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  max-width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 7px 10px;

  border: 1px solid var(--app-border);
  border-radius: 30px;
  background: var(--app-primary-soft);
  color: var(--app-primary);

  font-size: 0.77rem;
  font-weight: 700;
  line-height: 1.35;
  overflow-wrap: anywhere;

  @media (max-width: 480px) {
    padding: 6px 9px;
    font-size: 0.73rem;
  }
`;

export const ProductDescriptionCard = styled(ProductDetailCard)`
  grid-column: 1 / -1;

  @media (max-width: 650px) {
    grid-column: auto;
  }
`;

/* =========================================================
   ACCIONES Y MODAL DE ELIMINACIÓN
   Se conservan estos exports para compatibilidad con otros
   componentes del módulo.
========================================================= */

export const ProductActions = styled.footer`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  width: 100%;
  min-width: 0;
  margin-top: 4px;
  padding-top: 18px;
  border-top: 1px solid var(--app-border);

  @media (max-width: 750px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 9px;
  }
`;

export const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;

  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 13px 5px;
  text-align: center;

  @media (max-width: 380px) {
    gap: 12px;
    padding: 10px 2px;
  }
`;

interface DeleteIconProps {
  $danger: boolean;
}

export const DeleteIcon = styled.div<DeleteIconProps>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 66px;
  height: 66px;
  flex: 0 0 66px;
  border-radius: 50%;

  background: ${({ $danger }) =>
    $danger ? "#f8e1db" : "#dcebd9"};
  color: ${({ $danger }) =>
    $danger ? "#a51e18" : "#16733a"};

  font-size: 29px;

  @media (max-width: 380px) {
    width: 56px;
    height: 56px;
    flex-basis: 56px;
    font-size: 24px;
  }
`;

export const DeleteTitle = styled.h3`
  margin: 0;
  color: var(--app-primary);
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.3;
  overflow-wrap: anywhere;

  @media (max-width: 380px) {
    font-size: 1.08rem;
  }
`;

export const DeleteDescription = styled.p`
  max-width: 520px;
  margin: 0;
  color: var(--app-ink);
  font-size: 0.9rem;
  line-height: 1.5;
  overflow-wrap: anywhere;

  @media (max-width: 380px) {
    font-size: 0.82rem;
  }
`;

export const DeleteProductName = styled.strong`
  display: block;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px 16px;
  border-radius: 11px;

  background: var(--app-surface);
  color: var(--app-primary);
  font-size: 0.92rem;
  overflow-wrap: anywhere;
`;



export const DeleteActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  width: 100%;
  gap: 10px;
  margin-top: 8px;

  @media (max-width: 480px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const DeleteButton = styled.button<DeleteIconProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 0;
  min-height: 44px;
  box-sizing: border-box;
  padding: 10px 20px;

  border: none;
  border-radius: 11px;
  background: ${({ $danger }) =>
    $danger ? "#a51e18" : "#16733a"};
  color: white;

  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 9px 10px;
    font-size: 0.8rem;
  }
`;

export const DeleteCancelButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 0;
  min-height: 44px;
  box-sizing: border-box;
  padding: 10px 20px;

  border: 1px solid var(--app-border);
  border-radius: 11px;
  background: transparent;
  color: var(--app-primary);

  font-family: inherit;
  font-size: 0.86rem;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: var(--app-surface-soft);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 9px 10px;
    font-size: 0.8rem;
  }
`;
