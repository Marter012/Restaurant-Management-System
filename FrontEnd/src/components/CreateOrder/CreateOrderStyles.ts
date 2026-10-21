import styled from "styled-components";
import { caramelButtonStyles } from "../Utils/ButtonStyles.ts";

/*
 * CREATE ORDER — estilos organizados por componente.
 * Los colores se leen directamente de las variables CSS globales (:root).
 * Para cambiar la paleta, modificar GlobalStyles; no hace falta editar este archivo.
 */
const focus = `outline:none;&:focus-visible{outline:3px solid var(--app-accent);outline-offset:2px;}`;

/* 1. Estructura general */
export const OrderSection = styled.section`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
  overflow: visible;
  border-radius: 14px;
  background: var(--app-muted);
  color: var(--app-white);
  > * {
    box-sizing: border-box;
    min-width: 0;
  }
  > header {
    flex: 0 0 100%;
  }
  > section:nth-of-type(1),
  > section:nth-of-type(2) {
    flex: 1 1 calc(50% - 9px);
  }
  > nav[aria-label="Opciones de la comanda"] {
    flex: 0 0 100%;
  }
  > footer {
    flex: 0 0 100%;
  }
  @media (max-width: 1000px) {
    min-height: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    > section:nth-of-type(1),
    > section:nth-of-type(2) {
      flex: 0 0 auto;
    }
  }
  @media (max-width: 520px) {
    padding: 10px;
    gap: 8px;
    border-radius: 18px;
  }
`;

export const MobileOrderSteps = styled.nav`
  box-sizing: border-box;
  display: none;
  width: 100%;
  min-width: 0;
  padding: 6px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
  border: 1px solid var(--app-border);
  border-radius: 14px;
  background: var(--app-primary);
  button {
    ${focus}box-sizing:border-box;
    min-width: 0;
    min-height: 48px;
    padding: 8px 10px;
    border: 1px solid transparent;
    border-radius: 10px;
    background: transparent;
    color: var(--app-muted);
    font: inherit;
    font-weight: 700;
    cursor: pointer;
  }
  button.active,
  button[aria-current="step"] {
    background: var(--app-white);
    color: var(--app-ink);
  }
  @media (max-width: 900px) {
    display: grid;
    flex: 0 0 auto;
  }
  @media (max-width: 390px) {
    button {
      min-height: 43px;
      padding-inline: 5px;
      font-size: 0.78rem;
    }
  }
`;
export const OrderHeader = styled.header`
  box-sizing: border-box;
  grid-area: header;
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  h3 {
    margin: 0;
    color: var(--app-white);
    font-size: clamp(1.05rem, 1.7vw, 1.35rem);
    line-height: 1.2;
    font-weight: 800;
  }
  > span {
    justify-self: end;
    color: var(--app-white);
    font-size: 0.92rem;
    font-weight: 700;
    white-space: nowrap;
  }
  @media (max-width: 900px) {
    flex: 0 0 auto;
    gap: 8px 10px;
    h3 {
      font-size: 1.05rem;
    }
  }
`;
export const CustomerInput = styled.input`
  ${focus}box-sizing:border-box;
  grid-column: 1/-1;
  width: 100%;
  min-width: 0;
  min-height: 48px;
  padding: 11px 14px;
  border: 1px solid transparent;
  border-radius: 11px;
  background: var(--app-white);
  color: var(--app-ink);
  font: inherit;
  font-size: 1rem;
  &::placeholder {
    color: #765b48;
    opacity: 1;
  }
  &:focus {
    border-color: var(--app-accent);
  }
`;

/* 2. Productos */
export const OrderSummaryColumn = styled.section`
  box-sizing: border-box;
  grid-area: products;
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: 65%;
  gap: 12px;
  overflow: hidden;
  @media (max-width: 1000px) {
    min-height: 300px;
    overflow-y: auto;
    scrollbar-width: none;
  }
`;
export const SectionTitleSectionTitle = styled.h3`
  box-sizing: border-box;
  flex: 0 0 auto;
  margin: 0;
  color: var(--app-white);
  font-size: 1.08rem;
  line-height: 1.3;
  font-weight: 800;
`;
export const OrderItems = styled.div`
  box-sizing: border-box;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  gap: 10px;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: none;
  > p {
    margin: 20px 0;
    color: var(--app-muted);
    text-align: center;
    line-height: 1.5;
  }
`;
export const OrderItem = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 38px;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  padding: 7px 10px;

  background-color: var(--app-surface-soft);
  border: 1px solid rgba(var(--app-primary-rgb), 0.1);
  border-radius: 8px;

  color: var(--app-ink);

  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease;

  &:hover {
    border-color: rgba(var(--app-primary-rgb), 0.3);
    box-shadow: 0 2px 5px rgba(var(--app-primary-rgb), 0.07);
  }

  > div:first-child {
    box-sizing: border-box;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    gap: 2px;

    min-width: 0;
  }

  h4 {
    min-width: 0;
    margin: 0;

    color: var(--app-ink);
    font-size: 0.8rem;
    font-weight: 650;
    line-height: 1.2;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    min-width: 0;

    color: var(--app-muted-dark);
    font-size: 0.68rem;
    line-height: 1.2;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    flex-shrink: 0;

    color: var(--app-primary);
    font-size: 0.76rem;
    font-weight: 700;
    line-height: 1.2;

    white-space: nowrap;
  }

  @media (max-width: 500px) {
    min-height: 36px;
    gap: 7px;
    padding: 6px 8px;

    h4 {
      font-size: 0.76rem;
    }

    small {
      font-size: 0.65rem;
    }

    span {
      font-size: 0.72rem;
    }
  }
`;
export const IngredientSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  margin-top: 5px;
  min-width: 0;
`;
export const SmallTextRemovedIngredients = styled.small`
  display: block;
  color: #ffd5c9 !important;
  overflow-wrap: anywhere;
`;
export const SmallTextAddedIngredients = styled.small`
  display: block;
  color: #d9f0d1 !important;
  overflow-wrap: anywhere;
`;
export const IngredientEditButton = styled.button`
  ${focus}box-sizing:border-box;
  min-height: 34px;
  padding: 6px 10px;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  background: transparent;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;
export const QuantityControls = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  flex-wrap: wrap;
  button {
    ${focus}min-width:34px;
    min-height: 34px;
    border: 1px solid var(--app-border);
    border-radius: 20px;
    ${caramelButtonStyles}
  }
  span,
  strong {
    font-weight: 700;
  }
`;
export const OrderExtraItems = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  max-height: 34%;
  overflow-y: auto;
`;
export const OrderExtraItem = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 10px;
  border: 1px solid var(--app-border);
  border-radius: 9px;
`;
export const OrderExtraItemInfo = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  gap: 3px;
  strong,
  span,
  small {
    overflow-wrap: anywhere;
  }
`;
export const ExtraIngredientTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  max-width: 100%;
  padding: 4px 7px;
  border-radius: 7px;
  background: rgba(255, 255, 255, 0.12);
  color: var(--app-white);
  font-size: 0.75rem;
`;
export const ExtraIngredientRemoveButton = styled.button`
  ${focus}flex:0 0 auto;
  min-width: 30px;
  min-height: 30px;
  border: 1px solid var(--app-border);
  border-radius: 7px;
  background: transparent;
  color: var(--app-white);
  cursor: pointer;
`;

/* 3. Pago */
export const OrderOptionsColumn = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-self: stretch;
  width: 100%;
  height: 65%;
  min-width: 0;
  min-height: 0;
  gap: 12px;
  overflow: visible;

  @media (max-width: 1000px) {
    max-height: 400px;
    height: 400px;
    overflow: hidden;
  }
`;

export const OrderData = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 90%;
  max-height: 100%;
  flex: 1 1 auto;
  gap: 10px;
  overflow: hidden;
`;

export const DataSection = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  gap: 12px;
  padding: 14px;
  border: 1px solid var(--app-border);
  border-radius: 13px;
  background: var(--app-primary);
  color: var(--app-white);
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: none;
`;

export const DataSectionHeading = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: var(--app-white);
  strong {
    font-size: 1rem;
    font-weight: 800;
  }
`;
export const FieldsGrid = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  position: relative;
  gap: 12px 8px;
  min-width: 0;
  width: 100%;
  height: 20%;
  min-height: 20%;
  label {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 7px;
    color: var(--app-white);
    font-size: 0.88rem;
    font-weight: 700;
    height: 100%;
    overflow: hidden;
  }

  .errorMessage{
    background-color: red;
    position: absolute;
    width: 100%;
    border-radius: 5px;
    text-align: center;
  }

  @media (max-width: 100px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }
`;

export const Select = styled.select`
  width: 100%;
  height: 100%;
  border: 1px solid transparent;
  border-radius: 9px;
  background: var(--app-white);
  color: var(--app-ink);
  font: inherit;
  font-weight: 600;
  cursor: pointer;

  font-size: 0.78rem;

  &:focus {
    border-color: var(--app-accent);
  }
`;

export const PaymentStatusSelect = styled(Select)<{
  $status: string;
}>`
  background-color: ${({ $status }) => {
    switch ($status) {
      case "pending":
        return "#dcc426";

      case "paid":
        return "#16a34a";

      default:
        return "transparent";
    }
  }};

  color: black;
  transition: background-color 0.2s ease;

  option {
    background-color: white;
    color: #222;
  }
`;

export const CombinedPayments = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 0;
  gap: 8px;
  height: 60%;
  min-height: 60%;
  overflow-y: auto;
  scrollbar-width: none;
`;
export const CombinedPaymentsHeading = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  color: var(--app-white);
  font-size: 0.84rem;

  button {
    ${caramelButtonStyles}
    padding: 5px;
  }
`;

export const CombinedPaymentRow = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(90px, 0.7fr) auto;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 8px;
  border: 1px solid var(--app-border);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.06);
  > * {
    min-width: 0;
  }
  input,
  select {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    min-height: 38px;
    padding: 7px 9px;
    border: 1px solid transparent;
    border-radius: 7px;
    background: var(--app-white);
    color: var(--app-ink);
    font: inherit;
    font-size: 12px;
  }
  button {
    ${focus}min-height:34px;
    padding: 6px 8px;
    border: 1px solid var(--app-border);
    border-radius: 7px;
    background: transparent;
    color: var(--app-white);
    font: inherit;
    font-size: 0.78rem;
    cursor: pointer;
  }
  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr) minmax(90px, 0.75fr);
    button {
      grid-column: 1/-1;
      width: 100%;
    }
  }
`;

/* 4. Opciones independientes: este panel no forma parte del panel de pago */
export const DetailsNav = styled.nav`
  box-sizing: border-box;
  display: flex;
  height: 10%;
  align-items: center;
  justify-content: space-evenly;
  gap: 8px;
  width: 100%;
  padding: 3px;
  border: 1px solid var(--app-border);
  border-radius: 13px;
  background: var(--app-primary);

  @media (max-width: 900px) {
    flex: 0 0 auto;
    gap: 8px;
    padding: 9px;
  }

  @media (max-width: 390px) {
    gap: 5px;
    padding: 6px;
  }
`;

export const OptionCard = styled.div`
  box-sizing: border-box;
  display: flex;
  width: 30%;
  height: 90%;
  border: 1px solid var(--app-border);
  border-radius: 12px;
  background: var(--app-muted);
  position: relative;

  &.is-modified {
    background-color: #198754;
    border-color: #198754;
  }

  &.is-modified > button {
    color: var(--app-white);
  }
  button {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0;
    gap: 15px;
    padding: 0;
    border: none;
    border-radius: inherit;
    background: transparent;
    color: var(--app-white);

    .containerInfo {
      display: flex;
      flex-direction: column;
    }
  }

`;

export const OptionClear = styled.span`
  ${focus}box-sizing:border-box;
  position: absolute;
  z-index: 1;
  top: -10px;
  right: -10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background-color: #e02b2b;
  font-size: 1.5rem !important;

  color: var(--app-white);
  font-size: 0.9rem;
  line-height: 1;
  cursor: pointer;
`;
export const SpanTextOptionStatus = styled.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: var(--app-white);
  font-size: 0.95rem;
  font-weight: 800;

  @media (max-width: 1000px) {
    &.checkMobile{
      display: none;
    }
  }
`;

/* 5. Totales y botones */
export const OrderFooter = styled.footer`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 10%;
  align-items: center;
  gap: 18px;
  min-width: 0;
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    flex: 0 0 auto;
    gap: 8px;
    padding: 0;
  }
`;
export const TotalSection = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 70%;
  justify-content: center;
  min-width: 0;
  border-top: 1px solid var(--app-border);
  color: var(--app-white);
  @media (max-width: 1000px) {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid var(--app-border);
    border-radius: 12px;
    background: var(--app-primary);
  }
`;
export const SubtotalRow = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  min-width: 0;
  border-bottom: 1px solid var(--app-border);
`;
export const SubtotalInfo = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-width: 0;
  color: var(--app-white);
  font-size: 0.9rem;
  gap: 20px;
  strong {
    font-weight: 800;
  }
`;
export const SpanTextDiscount = styled.span`
  color: #ffe0d7;
  font-size: 0.82rem;
  font-weight: 700;
`;
export const TotalRow = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  min-width: 0;
`;
export const TotalInfo = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: var(--app-white);
  font-size: 1rem;
  gap: 20px;

  strong {
    font-weight: 800;
  }
`;
export const PromotionsToggle = styled.button`
  ${focus}padding:6px 9px;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  background: transparent;
  color: var(--app-white);
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
`;
export const PromotionsDetails = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 8px 0 2px;
  color: var(--app-muted);
  font-size: 0.82rem;
`;
export const CreateOrderButton = styled.button`
  ${focus}box-sizing:border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  width: 30%;
  height: 100%;
  border: 0;
  border-radius: 10px;
  background: var(--app-primary-active);
  color: var(--app-white);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  transition:
    opacity 160ms ease,
    transform 160ms ease;
  &:hover:not(:disabled) {
    opacity: 0.92;
  }
  &:active:not(:disabled) {
    transform: translateY(1px);
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
  @media (max-width: 1000px) {
    min-height: 48px;
    width: 100%;
    flex: 0 0 auto;
  }
`;
export const MobileContinueButton = styled.button`
  ${focus}box-sizing:border-box;
  display: none;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 46px;
  padding: 10px 14px;
  border: 1px solid var(--app-border);
  border-radius: 10px;
  background: var(--app-accent);
  color: var(--app-ink);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
  @media (max-width: 900px) {
    display: flex;
  }
`;

/* 6. Modales y campos */
export const DetailsModalOverlay = styled.div`
  box-sizing: border-box;
  position: fixed;
  z-index: 1000;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: var(--app-overlay, rgba(53, 33, 22, 0.62));
  backdrop-filter: blur(5px);

  @media (max-width: 520px) {
    padding: 12px;
    align-items: center;
  }
`;

export const DetailsModal = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: min(100%, 750px);
  max-height: min(88dvh, 760px);
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-xl, 24px);
  background: var(--app-surface, #fffcf5);
  color: var(--app-ink);
  box-shadow: var(--app-shadow-lg, 0 24px 65px rgba(74, 40, 24, 0.16));

  @media (max-width: 520px) {
    max-height: 92dvh;
    border-radius: 18px;
  }
`;

export const DetailsModalHeader = styled.header`
  box-sizing: border-box;
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-width: 0;
  padding: 20px 24px;
  background: linear-gradient(
    110deg,
    var(--app-accent) 0%,
    var(--app-primary) 100%
  );
  color: var(--app-white);

  > div {
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 4px;
  }

  span {
    color: var(--app-navbar-text-muted, var(--app-primary-soft));
    font-size: 0.72rem;
    font-weight: 800;
    letter-spacing: 0.07em;
    line-height: 1.3;
  }

  h3,
  h4,
  strong {
    margin: 0;
    color: var(--app-white);
  }

  h3 {
    font-family: var(--app-font-heading, inherit);
    font-size: clamp(1.15rem, 2.4vw, 1.55rem);
    font-weight: 800;
    line-height: 1.25;
  }

  button {
    ${focus}
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    padding: 0;
    border: 0;
    border-radius: 10px;
    background: transparent;
    color: var(--app-white);
    font-size: 1.9rem;
    line-height: 1;
    cursor: pointer;
    transition: background var(--app-transition, 180ms ease);

    &:hover {
      background: rgba(255, 255, 255, 0.14);
    }
  }

  @media (max-width: 520px) {
    padding: 17px 18px;
    gap: 10px;

    h3 {
      font-size: 1.12rem;
    }

    span {
      font-size: 0.65rem;
    }
  }
`;

export const TimeInput = styled.input`
  ${focus}box-sizing:border-box;
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 9px 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: var(--app-white);
  color: var(--app-ink);
  font: inherit;
`;
export const StyledInputDateDisplay = styled.input`
  ${focus}box-sizing:border-box;
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 9px 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: var(--app-white);
  color: var(--app-ink);
  font: inherit;
`;

export const SmallTextDiscountHint = styled.small`
  color: var(--app-muted);
  font-size: 0.8rem;
  line-height: 1.45;
`;

export const FieldLabelExtraNameField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  color: var(--app-white);
  font-size: 0.88rem;
  font-weight: 700;
`;

export const DetailsPanel = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
  overflow-y: auto;
  padding: 22px 24px 24px;
  color: var(--app-ink);

  /* La apariencia clara se limita al modal, sin alterar las secciones de pago. */
  ${DataSection} {
    width: 100%;
    height: auto;
    gap: 14px;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: var(--app-ink);
  }

  ${FieldsGrid} {
    height: auto;
    min-height: 0;
    gap: 14px 12px;

    label {
      height: auto;
      overflow: visible;
      gap: 8px;
      color: var(--app-muted-dark);
      font-size: 0.92rem;
      font-weight: 700;
    }

    input,
    select,
    textarea {
      box-sizing: border-box;
      width: 100%;
      min-width: 0;
      min-height: 48px;
      padding: 11px 13px;
      border: 1px solid var(--app-border);
      border-radius: 11px;
      background: var(--app-paper);
      color: var(--app-ink);
      font: inherit;
      font-weight: 600;

      &:focus {
        outline: 2px solid var(--app-accent);
        outline-offset: 1px;
        border-color: var(--app-accent);
      }
    }
  }

  ${TimeInput},
  ${StyledInputDateDisplay} {
    min-height: 52px;
    padding: 11px 13px;
    border: 1px solid transparent;
    border-radius: 11px;
    background: var(--app-paper);
    color: var(--app-ink);
    font-size: 1rem;
    font-weight: 700;
  }

  ${SmallTextDiscountHint} {
    color: var(--app-muted);
    font-size: 0.86rem;
  }

  ${FieldLabelExtraNameField} {
    color: var(--app-muted-dark);
  }

  @media (max-width: 520px) {
    gap: 12px;
    padding: 18px;

    ${FieldsGrid} {
      grid-template-columns: minmax(0, 1fr);
      gap: 12px;
    }
  }
`;
export const DiscountSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

export const ExtrasSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

export const AddExtraButton = styled.button`
  ${focus}min-height:40px;
  padding: 9px 12px;
  border: 0;
  border-radius: 9px;
  background: var(--app-accent);
  color: var(--app-ink);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
`;
export const ExtraItemsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;
export const ExtraItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
  padding: 9px 10px;
  border: 1px solid var(--app-border);
  border-radius: 9px;
`;
export const DeliverySection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

export const Error = styled.div`
  box-sizing: border-box;
  padding: 9px 11px;
  border: 1px solid rgba(255, 170, 150, 0.5);
  border-radius: 8px;
  background: rgba(180, 35, 20, 0.16);
  color: #ffe0d7;
  font-size: 0.84rem;
  line-height: 1.4;
`;

/* 7. Modal de ingredientes */
export const IngredientModalOverlay = styled.div`
  box-sizing: border-box;
  position: fixed;
  z-index: 1100;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
  background: rgba(25, 18, 13, 0.66);
  backdrop-filter: blur(3px);
`;
export const IngredientModal = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: min(100%, 560px);
  max-height: min(88dvh, 760px);
  overflow-y: auto;
  padding: 20px;
  border: 1px solid var(--app-border);
  border-radius: 16px;
  background: var(--app-primary-soft);
  color: var(--app-white);
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.3);
`;
export const IngredientModalHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  h3,
  h4,
  strong {
    margin: 0;
    color: var(--app-white);
  }
  p,
  small {
    margin: 0;
    color: var(--app-muted);
    line-height: 1.45;
  }
`;
export const SpanTextIngredientModalEyebrow = styled.span`
  color: var(--app-accent);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;
export const IngredientOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 9px 10px;
    border: 1px solid var(--app-border);
    border-radius: 8px;
    color: var(--app-white);
  }
  input {
    accent-color: var(--app-accent);
  }
`;
export const IngredientModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 8px;
`;
export const IngredientCancel = styled.button`
  ${focus}min-height:40px;
  padding: 8px 13px;
  border: 1px solid var(--app-border);
  border-radius: 8px;
  background: transparent;
  color: var(--app-white);
  font: inherit;
  font-weight: 700;
  cursor: pointer;
`;
export const IngredientSave = styled.button`
  ${focus}min-height:40px;
  padding: 8px 13px;
  border: 0;
  border-radius: 8px;
  background: var(--app-accent);
  color: var(--app-ink);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
`;

/* 8. Ingredientes extra */
export const ExtraIngredientsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 0;
  margin-top: 12px;
  padding: 12px;
  border: 1px solid var(--app-border);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
`;
export const ExtraIngredientsHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
  h4 {
    margin: 0;
    color: var(--app-white);
    font-size: 0.95rem;
    font-weight: 800;
  }
  p {
    margin: 4px 0 0;
    color: var(--app-muted);
    font-size: 0.8rem;
    line-height: 1.4;
  }
`;
export const ExtraIngredientsIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--app-accent);
  color: var(--app-ink);
  font-size: 1.1rem;
`;
export const ExtraIngredientsForm = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(90px, 0.4fr) auto;
  align-items: end;
  gap: 8px;
  min-width: 0;
  label {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
    color: var(--app-white);
    font-size: 0.82rem;
    font-weight: 700;
  }
  input {
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    min-height: 40px;
    padding: 8px 9px;
    border: 1px solid transparent;
    border-radius: 8px;
    background: var(--app-white);
    color: var(--app-ink);
    font: inherit;
  }
  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr) minmax(80px, 0.45fr);
    button {
      grid-column: 1/-1;
      width: 100%;
    }
  }
`;
export const ExtraIngredientsInput = styled.input`
  ${focus}box-sizing:border-box;
  width: 100%;
  min-width: 0;
  min-height: 40px;
  padding: 8px 10px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: var(--app-white);
  color: var(--app-ink);
  font: inherit;
`;
export const ExtraIngredientsAddButton = styled.button`
  ${focus}min-height:40px;
  padding: 8px 12px;
  border: 0;
  border-radius: 8px;
  background: var(--app-accent);
  color: var(--app-ink);
  font: inherit;
  font-weight: 800;
  cursor: pointer;
`;
export const ExtraIngredientsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
export const ExtraIngredientsEmpty = styled.p`
  margin: 0;
  color: var(--app-muted);
  font-size: 0.85rem;
  line-height: 1.4;
`;
export const PromotionRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
  padding: 9px 0;
  border-bottom: 1px solid var(--app-border);
  &:last-child {
    border-bottom: 0;
  }
  > * {
    min-width: 0;
  }
`;
