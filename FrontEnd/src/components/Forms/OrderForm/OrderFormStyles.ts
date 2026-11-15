import styled, { css } from "styled-components";
import { InputStyles } from "../../Utils/GlobalStyles.ts";

const field = css`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 9px 12px;
  border: 1px solid var(--color-border) !important;
  border-radius: var(--radius-sm) !important;
  color: var(--color-text);
  font-size: 0.86rem;

  &:focus {
    border-color: var(--color-accent) !important;
  }
`;

const softCard = css`
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
`;

export const OrderSection = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas:
    "customer"
    "items"
    "options"
    "delivery"
    "payment"
    "totals";
  align-content: start;
  gap: clamp(14px, 1.5vw, 20px);
  width: 100%;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  padding: clamp(14px, 1.6vw, 24px);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: var(--color-background);
  box-shadow: var(--shadow-sm);

  > * {
    min-width: 0;
  }

  /* El formulario crece con su contenido: no se crea un scroll interno. */
  overflow: visible;
`;

export const OrderHeader = styled.header`
  grid-area: customer;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "heading heading"
    "customer-label observations"
    "customer-input observations";
  align-items: stretch;
  column-gap: clamp(12px, 1.5vw, 20px);
  row-gap: 7px;
  min-width: 0;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);

  .order-heading {
    grid-area: heading;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 3px;
  }

  h3 {
    margin: 0;
    color: var(--color-primary);
    font-size: clamp(1.15rem, 1.45vw, 1.4rem);
    font-weight: 900;
    letter-spacing: -0.03em;
  }

  .order-heading > span {
    flex: 0 0 auto;
    padding: 7px 12px;
    border-radius: 999px;
    background: var(--color-primary-soft);
    color: var(--color-primary);
    font-size: 0.78rem;
    font-weight: 900;
    white-space: nowrap;
  }

  > label {
    grid-area: customer-label;
    align-self: end;
    color: var(--color-text);
    font-size: 0.84rem;
    font-weight: 800;
  }

  > input {
    grid-area: customer-input;
    height: 100%;
    min-height: 78px;
  }

  > ${"div"} {
    grid-area: observations;
    min-width: 0;
  }

  @media (max-width: 640px) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "heading"
      "customer-label"
      "customer-input"
      "observations";

    > input {
      min-height: 46px;
    }
  }
`;

export const OrderSummaryColumn = styled.div`
  grid-area: items;
  display: grid;
  gap: 9px;
  min-width: 0;
`;

export const OrderOptionsColumn = styled.div`
  grid-area: payment;
  display: grid;
  gap: 10px;
  min-width: 0;
`;

export const OrderItems = styled.div`
  display: grid;
  gap: 0;
  width: 100%;
  min-width: 0;
  min-height: 72px;
  max-height: none;
  overflow: visible;
  padding: 5px 14px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-surface);

  > p {
    margin: 0;
    padding: 20px 4px;
    color: var(--color-text-secondary);
    font-size: 0.9rem;
    text-align: center;
  }
`;

export const OrderItem = styled.div`
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 9px;
  min-width: 0;
  padding: 8px 2px;
  border-bottom: 1px solid var(--color-border);
  &:last-child {
    border-bottom: 0;
  }
  .order-item-image {
    width: 54px;
    height: 54px;
    border-radius: 10px;
    object-fit: cover;
    background: var(--color-surface-muted);
  }
  > div:first-of-type {
    min-width: 0;
  }
  h4 {
    margin: 0;
    color: var(--color-text);
    font-size: 0.88rem;
    font-weight: 900;
  }
  small {
    display: block;
    margin-top: 2px;
    color: var(--color-text-secondary);
    font-size: 0.72rem;
  }
  > div > span {
    display: block;
    margin-top: 4px;
    color: var(--color-primary);
    font-size: 0.83rem;
    font-weight: 900;
  }
  @media (max-width: 520px) {
    grid-template-columns: 43px minmax(0, 1fr) auto;
    .order-item-image {
      width: 42px;
      height: 42px;
    }
  }
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: auto;

  button {
    display: grid;
    place-items: center;
    flex: 0 0 38px;
    width: 38px;
    height: 38px;
    padding: 0;
    border: 1px solid var(--color-accent);
    border-radius: 11px;
    background: var(--color-accent);
    color: var(--color-white);
    font-size: 1.1rem;
    font-weight: 900;
    cursor: pointer;
    transition: var(--transition-normal);

    &:hover:not(:disabled) {
      background: var(--color-primary);
      border-color: var(--color-primary);
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }

  strong {
    flex: 0 0 26px;
    color: var(--color-primary);
    font-size: 0.9rem;
    font-weight: 900;
    text-align: center;
  }
`;

export const OrderData = styled.div`
  display: grid;
  gap: 12px;
  min-width: 0;
  width: 100%;
`;

export const DataSection = styled.section`
  display: grid;
  gap: 13px;
  padding: clamp(14px, 1.5vw, 19px);
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-surface);

  .payment-summary {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
    padding-top: 11px;
    border-top: 1px solid var(--color-border);
  }

  .payment-summary > div {
    display: grid;
    gap: 5px;
    padding: 12px 14px;
    border: 1px solid var(--color-border);
    border-radius: 11px;
    transition: background var(--transition-normal);
  }

  .payment-summary > div.is-success {
    background: var(--color-success-soft);
    border-color: var(--color-success);
  }

  .payment-summary > div.is-danger {
    background: var(--color-danger-soft);
    border-color: var(--color-danger);
  }

  .payment-summary span {
    font-size: 0.78rem;
    font-weight: 800;
  }

  .payment-summary strong {
    font-size: 1.12rem;
    font-weight: 900;
  }

  .payment-summary > div.is-success span,
  .payment-summary > div.is-success strong {
    color: var(--color-success);
  }

  .payment-summary > div.is-danger span,
  .payment-summary > div.is-danger strong {
    color: var(--color-danger);
  }

  @media (max-width: 420px) {
    .payment-summary {
      gap: 6px;
    }
    .payment-summary > div {
      padding: 10px 8px;
    }
  }
`;

export const DataSectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  strong {
    color: var(--color-text);
    font-size: 0.88rem;
    font-weight: 850;
  }
`;

export const SectionTitleSectionTitle = styled.h4`
  margin: 0;
  color: var(--color-text);
  font-size: 0.92rem;
  font-weight: 850;
`;

export const CustomerInput = styled.input`
  ${field}
`;
export const Select = styled.select`
  ${field}
`;

export const StyledInputDateDisplay = styled.input`
  ${field}
`;

export const PaymentStatusSelect = styled.select<{ $status?: string }>`
  ${field}
  border-color: ${({ $status }) =>
    $status === "paid"
      ? "var(--color-success)"
      : "var(--color-pending)"} !important;
  background: ${({ $status }) =>
    $status === "paid"
      ? "var(--color-success-soft)"
      : "var(--color-pending-soft)"} !important;
`;

export const FieldsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 11px;
  min-width: 0;
  label {
    display: grid;
    gap: 6px;
    min-width: 0;
    color: var(--color-text-secondary);
    font-size: 0.76rem;
    font-weight: 800;
    position: relative;
  }
  label > span,
  label .errorMessage {
    width: 100%;
    height: 20px;
    color: var(--color-danger);
    font-size: 0.7rem;
    font-weight: 700;
    background-color: var(--color-danger-soft);
    border-radius: 10px;
    text-align: center;
    position: absolute;
  }
  @media (max-width: 520px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const CombinedPayments = styled.div`
  display: grid;
  gap: 8px;
  padding-top: 11px;
  border-top: 1px solid var(--color-border);
`;

export const CombinedPaymentsHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: var(--color-text-secondary);
  font-size: 0.8rem;
  font-weight: 850;
  button {
    min-height: 31px;
    padding: 5px 10px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-primary-soft);
    color: var(--color-primary);
    font-size: 0.73rem;
    font-weight: 850;
  }
  button:hover {
    background: var(--color-primary-soft);
  }
`;

export const CombinedPaymentRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(90px, 0.75fr) auto;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  background: var(--color-surface-muted);
  label {
    display: grid;
    gap: 4px;
    color: var(--color-text-light);
    font-size: 0.68rem;
    font-weight: 800;
  }
  input,
  select {
    ${field};
    min-height: 36px;
    padding: 7px 9px;
    font-size: 0.78rem;
  }
  button {
    min-height: 34px;
    padding: 6px 9px;
    border: 1px solid var(--color-danger);
    border-radius: 8px;
    background: var(--color-danger-soft);
    color: var(--color-danger);
    font-size: 0.72rem;
    font-weight: 800;
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr 1fr;
    button {
      grid-column: 1 / -1;
    }
  }
`;

export const DetailsNav = styled.nav`
  display: flex !important;

  @media (max-width: 520px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
  }
`;

export const OptionCard = styled.div`
  position: relative;
  min-width: 0;
  width: 100%;
  display: flex;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-surface-muted);
  transition:
    border-color var(--transition-normal),
    background var(--transition-normal);
  &.is-modified {
    border-color: var(--color-accent);
    background: var(--color-primary-soft);
  }
  > button:not(.button-delete) {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    min-height: 62px;
    padding: 8px 6px;
    border: 0;
    border-radius: inherit;
    background: transparent;
    color: var(--color-primary);
    font-weight: 850;
    text-align: left;
    cursor: pointer;
    .containerInfo {
      display: grid;
      gap: 2px;
      min-width: 0;
    }
    .containerInfo span {
      font-size: 0.82rem;
    }
    .containerInfo small {
      color: var(--color-text-light);
      font-size: 0.67rem;
      font-weight: 650;
    }
    &:hover {
      background: var(--color-primary-soft);
    }
  }
  @media (max-width: 520px) {
    > button:not(.button-delete) {
      justify-content: center;
      gap: 5px;
      min-height: 58px;
      padding: 7px 3px;
    }

    .containerInfo span {
      font-size: 0.72rem;
    }

    .containerInfo small {
      font-size: 0.61rem;
    }
  }
`;

export const OptionClear = styled.button`
  position: absolute;
  z-index: 1;
  top: 4px;
  right: 4px;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  font-size: 1rem;
`;

export const SpanTextOptionStatus = styled.span`
  display: grid;
  place-items: center;
  flex: 0 0 27px;
  width: 27px;
  height: 27px;
  border-radius: 9px;
  background: var(--color-background);
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 900;
`;

export const OrderFooter = styled.footer`
  display: contents;
`;

export const TotalSection = styled.div`
  grid-area: totals;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-template-areas:
    "discount discount"
    "subtotal total"
    "promotions promotions";
  align-items: stretch;
  gap: 10px;
  min-width: 0;

  > * {
    min-width: 0;
  }

  @media (max-width: 560px) {
    /* Subtotal y total siguen juntos para conservar la lectura comparativa. */
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 7px;
  }
`;

export const DiscountRow = styled.div`
  grid-area: discount;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
  padding: 12px 15px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface-muted);

  &.is-active {
    border-color: var(--color-success);
    background: var(--color-success-soft);
  }

  &.is-inactive {
    opacity: 0.72;
  }
`;

export const DiscountInfo = styled.div`
  min-width: 0;
  span {
    color: var(--color-text-secondary);
    font-size: 0.84rem;
    font-weight: 850;
  }
`;

export const DiscountAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 9px;
  margin-left: auto;

  strong {
    color: var(--color-text-secondary);
    font-size: 1rem;
    font-weight: 900;
    white-space: nowrap;
  }

  .is-active & strong {
    color: var(--color-success);
  }
`;

export const SubtotalRow = styled.div`
  grid-area: subtotal;
  display: grid;
  align-content: center;
  gap: 7px;
  min-width: 0;
  padding: 13px 15px;
  border: 1px solid var(--color-border);
  border-radius: 13px;
  background: var(--color-surface-muted);
`;

export const SubtotalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--color-text-secondary);
  font-size: 0.84rem;
  strong {
    color: var(--color-text);
    font-weight: 850;
  }
`;

export const SpanTextDiscount = styled.span`
  color: var(--color-success);
  font-size: 0.78rem;
  font-weight: 850;
  text-align: right;
`;

export const TotalRow = styled.div`
  grid-area: total;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 9px;
  min-width: 0;
  padding: 13px 15px;
  border: 1px solid var(--color-primary-soft);
  border-radius: 13px;
  background: linear-gradient(
    110deg,
    var(--color-primary-soft),
    var(--color-accent)
  );
`;

export const TotalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  min-width: 0;
  color: var(--color-primary);

  strong:first-child {
    font-size: 1.08rem;
    font-weight: 900;
  }

  strong:last-child {
    font-size: clamp(1.2rem, 1.8vw, 1.55rem);
    font-weight: 950;
    white-space: nowrap;
  }
`;

export const PromotionsToggle = styled.button`
  display: grid;
  place-items: center;
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid var(--color-border-strong);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-primary);
  font-size: 1rem;
  font-weight: 900;
  cursor: pointer;
  transition: transform var(--transition-normal);

  &[aria-expanded="true"] {
    background: var(--color-primary-soft);
  }
`;

export const PromotionsDetails = styled.div`
  position: absolute;
  z-index: 20;
  top: calc(100% + 6px);
  right: 0;
  width: min(350px, 100%);
  max-height: 240px;
  overflow-y: auto;
  display: grid;
  gap: 9px;
  padding: 14px;
  border: 1px solid var(--color-border-strong);
  border-radius: 12px;
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);

  > h4 {
    margin: 0;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
    font-size: 0.85rem;
  }
`;

export const PromotionRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--color-text-secondary);
  font-size: 0.76rem;
  strong {
    color: var(--color-primary);
    white-space: nowrap;
  }
`;

export const StickyError = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  padding: 8px 0;
  background: var(--color-background);

  > p {
    margin: 0;
  }
`;

export const Error = styled.p<{ $paid?: boolean }>`
  margin: 0;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 750;

  && {
    border: 1px solid
      ${({ $paid }) => ($paid ? "var(--color-success)" : "var(--color-danger)")} !important;

    background: ${({ $paid }) =>
      $paid
        ? "var(--color-success-soft)"
        : "var(--color-danger-soft)"} !important;

    color: ${({ $paid }) =>
      $paid ? "var(--color-success)" : "var(--color-danger)"} !important;
  }
`;

export const DetailsModalOverlay = styled.div`
  position: fixed;
  z-index: 1600;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 20px;
  background: var(--modal-overlay);
  backdrop-filter: blur(7px);
`;

export const DetailsModal = styled.div`
  width: min(100%, 520px);
  max-height: calc(100dvh - 40px);
  overflow-y: auto;
  padding: 22px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-background);
  box-shadow: var(--shadow-lg);
`;

export const DetailsModalHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
  > div {
    display: grid;
    gap: 5px;
  }
  span {
    color: var(--color-primary-hover);
    font-size: 0.66rem;
    font-weight: 900;
    letter-spacing: 0.13em;
  }
  h3 {
    margin: 0;
    color: var(--color-text);
    font-size: 1.35rem;
  }
  button {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    background: var(--color-surface);
    color: var(--color-primary);
    font-size: 1.3rem;
  }
`;

export const DetailsPanel = styled.div`
  display: grid;
  gap: 12px;
  ${InputStyles}
`;

export const AddExtraButton = styled.button`
  min-height: 39px;
  padding: 8px 13px;
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-sm);
  background: var(--color-accent);
  color: var(--color-white);
  font-size: 0.8rem;
  font-weight: 850;
  &:hover {
    background: var(--color-primary-hover);
  }
`;

export const ExtraItemsList = styled.div`
  display: grid;
  gap: 7px;
`;

export const ExtraItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 11px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  background: var(--color-surface-muted);
  color: var(--color-text);
  font-size: 0.8rem;
  strong {
    color: var(--color-primary);
  }
`;

export const FieldLabelExtraNameField = styled.label`
  display: grid;
  gap: 6px;
  color: var(--color-text-secondary);
  font-size: 0.76rem;
  font-weight: 800;
  input {
    ${field};
  }
`;

export const SmallTextDiscountHint = styled.small`
  color: var(--color-text-light);
  font-size: 0.72rem;
  line-height: 1.45;
`;

export const IngredientModalOverlay = styled.div`
  position: fixed;
  z-index: 1700;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  padding: 18px;
  background: var(--modal-overlay);
  backdrop-filter: blur(7px);
`;

export const IngredientModal = styled.div`
  width: min(100%, 540px);
  max-height: calc(100dvh - 36px);
  overflow-y: auto;
  padding: clamp(18px, 3vw, 26px);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  background: var(--color-background);
  box-shadow: var(--shadow-lg);
`;

export const IngredientModalHeading = styled.header`
  display: grid;
  gap: 7px;
  margin-bottom: 18px;
  h3 {
    margin: 0;
    color: var(--color-text);
    font-size: 1.25rem;
  }
  p {
    margin: 0;
    color: var(--color-text-light);
    font-size: 0.83rem;
    line-height: 1.5;
  }
`;

export const SpanTextIngredientModalEyebrow = styled.span`
  color: var(--color-primary-hover);
  font-size: 0.66rem;
  font-weight: 900;
  letter-spacing: 0.14em;
`;

export const IngredientOptionsList = styled.div`
  display: grid;
  gap: 8px;
  .ingredient-option {
    display: grid;
    grid-template-columns: 20px minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    padding: 11px 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
    background: var(--color-surface-muted);
    cursor: pointer;
    span {
      color: var(--color-text);
      font-size: 0.83rem;
      font-weight: 750;
    }
    small {
      color: var(--color-success);
      font-size: 0.7rem;
      font-weight: 850;
    }
    input {
      width: 17px;
      height: 17px;
      margin: 0;
      accent-color: var(--color-primary);
    }
    &.is-removed {
      border-color: var(--color-danger);
      background: var(--color-danger-soft);
    }
    &.is-removed small {
      color: var(--color-danger);
    }
  }
`;

export const ExtraIngredientsSection = styled.section`
  display: grid;
  gap: 10px;
  margin-top: 17px;
  padding: 13px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
`;

export const ExtraIngredientsHeader = styled.header`
  h4 {
    margin: 0 0 3px;
    color: var(--color-text);
    font-size: 0.86rem;
  }
  p {
    margin: 0;
    color: var(--color-text-light);
    font-size: 0.73rem;
    line-height: 1.45;
  }
`;

export const ExtraIngredientsForm = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
  align-items: center;
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const ExtraIngredientsInput = styled.input`
  ${field}
`;

export const ExtraIngredientsAddButton = styled.button`
  min-height: 42px;
  padding: 8px 13px;
  border: 1px solid var(--color-accent);
  border-radius: var(--radius-sm);
  background: var(--color-accent);
  color: var(--color-white);
  font-size: 0.78rem;
  font-weight: 850;
  &:hover:not(:disabled) {
    background: var(--color-primary-hover);
  }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const ExtraIngredientsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
`;

export const ExtraIngredientTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 5px 8px 5px 10px;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 0.74rem;
  font-weight: 750;
`;

export const ExtraIngredientRemoveButton = styled.button`
  display: grid;
  place-items: center;
  width: 19px;
  height: 19px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  font-size: 0.9rem;
  font-weight: 900;
`;

export const ExtraIngredientsEmpty = styled.p`
  margin: 0;
  color: var(--color-text-light);
  font-size: 0.74rem;
`;

export const IngredientModalActions = styled.footer`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 19px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border);
  button {
    min-height: 40px;
    padding: 9px 13px;
    border: 1px solid var(--color-primary);
    border-radius: var(--radius-sm);
    background: var(--color-primary);
    color: var(--color-white);
    font-size: 0.78rem;
    font-weight: 850;
  }
  @media (max-width: 460px) {
    flex-direction: column-reverse;
    button {
      width: 100%;
    }
  }
`;

export const IngredientCancel = styled.button`
  && {
    border-color: var(--color-border);
    background: var(--color-surface);
    color: var(--color-text-secondary);
  }
`;

export const IngredientSave = styled.button``;
export const IngredientEditButton = styled.button`
  min-height: 31px;
  margin-top: 5px;
  padding: 5px 9px;
  border: 1px solid var(--color-border-strong);
  border-radius: 8px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 0.7rem;
  font-weight: 850;
`;

export const IngredientSummary = styled.div`
  display: grid;
  gap: 4px;
  margin-top: 6px;
  color: var(--color-text-light);
  font-size: 0.72rem;
  line-height: 1.45;
`;

export const SmallTextAddedIngredients = styled.small`
  color: var(--color-success);
  font-weight: 750;
`;

export const SmallTextRemovedIngredients = styled.small`
  color: var(--color-danger);
  font-weight: 750;
`;

export const PromotionsDetailsRow = styled.div`
  ${softCard}
`;

export const DeliveryTimeRow = styled.div`
  grid-area: delivery;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(180px, 0.55fr);
  align-items: center;
  gap: 14px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 13px 15px;
  border: 1px solid var(--color-border);
  border-radius: 13px;
  background: var(--color-surface);

  > * {
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
  }

  label {
    display: flex;
    align-items: center;
    gap: 9px;
    color: var(--color-text);
    font-size: 0.88rem;
    font-weight: 850;
  }

  label span {
    flex-shrink: 0;
    color: var(--color-primary);
    font-size: 1.2rem;
  }

  input {
    appearance: none;
    -webkit-appearance: none;
    display: block;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
    justify-self: stretch;
  }

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
/* ============================================================
   COMENTARIOS U OBSERVACIONES DE LA COMANDA
============================================================ */

export const ObservationField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 100%;
  min-width: 0;
  height: 100%;

  label {
    color: var(--color-text);
    font-size: 0.84rem;
    font-weight: 800;
  }

  textarea {
    flex: 1;
    min-height: 78px;
  }

  input {
    ${field}
  }
`;

export const ObservationTextarea = styled.textarea`
  width: 100%;
  min-height: 78px;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  resize: vertical;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-white);
  color: var(--color-text);
  font-size: 0.88rem;
  line-height: 1.5;
  outline: none;

  &::placeholder {
    color: var(--color-text-secondary);
  }

  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }
`;
