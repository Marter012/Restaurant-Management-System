import styled, { css } from "styled-components";
import { InputStyles } from "../../Utils/GlobalStyles.ts";

const field = css`
  box-sizing: border-box;
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 9px 12px;
  border: 1px solid var(--app-border) !important;
  border-radius: var(--app-radius-sm) !important;
  color: var(--app-ink);
  font-size: 0.86rem;

  &:focus {
    border-color: var(--app-accent) !important;
  }
`;

const softCard = css`
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius);
  background: var(--app-surface);
`;

export const OrderSection = styled.section`
  display: grid;
  height: 100%;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: "customer" "options" "delivery" "items" "totals" "payment" "submit";
  align-content: start;
  gap: 12px;
  min-width: 0;
  padding: clamp(16px, 1.45vw, 20px);
  border: 1px solid var(--app-border);
  border-radius: 22px;
  background: var(--app-paper);
  box-shadow: var(--app-shadow-sm);
  > * {
    min-width: 0;
  }
  overflow-x: hidden;
  overflow-y: auto;
`;

export const OrderHeader = styled.header`
  grid-area: customer;
  display: grid;
  gap: 8px;
  padding-bottom: 13px;
  border-bottom: 1px solid var(--app-border);
  .order-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 2px;
  }
  h3 {
    margin: 0;
    color: var(--app-primary);
    font-family: var(--app-font-heading);
    font-size: clamp(1.15rem, 1.45vw, 1.4rem);
    font-weight: 900;
    letter-spacing: -0.03em;
  }
  .order-heading > span {
    flex: 0 0 auto;
    padding: 8px 12px;
    border-radius: 999px;
    background: var(--app-accent-soft);
    color: var(--app-primary);
    font-size: 0.78rem;
    font-weight: 900;
    white-space: nowrap;
  }
  > label {
    color: var(--app-ink);
    font-size: 0.84rem;
    font-weight: 800;
  }
  @media (max-width: 500px) {
    .order-heading {
      align-items: flex-start;
      flex-direction: column;
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
  max-height: 260px;
  min-height: 72px;
  overflow-y: auto;
  padding: 4px 10px;
  border: 1px solid var(--app-border);
  border-radius: 14px;
  background: var(--app-surface);
  > p {
    margin: 0;
    padding: 17px 2px;
    color: var(--app-muted-dark);
    font-size: 0.88rem;
  }
`;

export const OrderItem = styled.div`
  display: grid;
  grid-template-columns: 56px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 9px;
  min-width: 0;
  padding: 8px 2px;
  border-bottom: 1px solid var(--app-border);
  &:last-child {
    border-bottom: 0;
  }
  .order-item-image {
    width: 54px;
    height: 54px;
    border-radius: 10px;
    object-fit: cover;
    background: var(--app-surface-soft);
  }
  > div:first-of-type {
    min-width: 0;
  }
  h4 {
    margin: 0;
    color: var(--app-ink);
    font-size: 0.88rem;
    font-weight: 900;
  }
  small {
    display: block;
    margin-top: 2px;
    color: var(--app-muted-dark);
    font-size: 0.72rem;
  }
  > div > span {
    display: block;
    margin-top: 4px;
    color: var(--app-primary);
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
    border: 1px solid var(--app-accent);
    border-radius: 11px;
    background: var(--app-accent);
    color: var(--app-white);
    font-size: 1.1rem;
    font-weight: 900;
    cursor: pointer;
    transition: var(--app-transition);

    &:hover:not(:disabled) {
      background: var(--app-primary);
      border-color: var(--app-primary);
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }

  strong {
    flex: 0 0 26px;
    color: var(--app-primary);
    font-size: 0.9rem;
    font-weight: 900;
    text-align: center;
  }
`;

export const OrderData = styled.div`
  display: grid;
  gap: 12px;
  min-width: 0;
`;

export const DataSection = styled.section`
  display: grid;
  gap: 11px;
  padding: 13px;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius);
  background: var(--app-surface);
`;

export const DataSectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  strong {
    color: var(--app-ink);
    font-size: 0.88rem;
    font-weight: 850;
  }
`;

export const SectionTitleSectionTitle = styled.h4`
  margin: 0;
  color: var(--app-ink);
  font-family: var(--app-font-heading);
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
      ? "var(--app-success)"
      : "var(--app-warning)"} !important;
  background: ${({ $status }) =>
    $status === "paid"
      ? "var(--app-success-soft)"
      : "var(--app-warning-soft)"} !important;
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
    color: var(--app-muted-dark);
    font-size: 0.76rem;
    font-weight: 800;
    position: relative;
  }
  label > span,
  label .errorMessage {
    width: 100%;
    height: 20px;
    color: black;
    font-size: 0.7rem;
    font-weight: 700;
    background-color: red !important;
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
  border-top: 1px solid var(--app-border);
`;

export const CombinedPaymentsHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  color: var(--app-muted-dark);
  font-size: 0.8rem;
  font-weight: 850;
  button {
    min-height: 31px;
    padding: 5px 10px;
    border: 1px solid var(--app-border);
    border-radius: 8px;
    background: var(--app-accent-soft);
    color: var(--app-primary);
    font-size: 0.73rem;
    font-weight: 850;
  }
  button:hover {
    background: var(--app-primary-soft);
  }
`;

export const CombinedPaymentRow = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(90px, 0.75fr) auto;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--app-border);
  border-radius: 9px;
  background: var(--app-surface-soft);
  label {
    display: grid;
    gap: 4px;
    color: var(--app-muted);
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
    border: 1px solid var(--app-danger);
    border-radius: 8px;
    background: var(--app-danger-soft);
    color: var(--app-danger);
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
  grid-area: options;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
`;

export const OptionCard = styled.div`
  position: relative;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--app-border);
  border-radius: 14px;
  background: var(--app-surface-soft);
  transition:
    border-color var(--app-transition),
    background var(--app-transition);
  &.is-modified {
    border-color: var(--app-accent);
    background: var(--app-accent-soft);
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
    color: var(--app-primary);
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
      color: var(--app-muted);
      font-size: 0.67rem;
      font-weight: 650;
    }
    &:hover {
      background: var(--app-primary-soft);
    }
  }
  @media (max-width: 500px) {
    > button:not(.button-delete) {
      flex-direction: column;
      gap: 4px;
      min-height: 68px;
    }
    .containerInfo {
      text-align: center;
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
  background: var(--app-danger-soft);
  color: var(--app-danger);
  font-size: 1rem;
`;

export const SpanTextOptionStatus = styled.span`
  display: grid;
  place-items: center;
  flex: 0 0 27px;
  width: 27px;
  height: 27px;
  border-radius: 9px;
  background: var(--app-paper);
  color: var(--app-primary);
  font-size: 1rem;
  font-weight: 900;
`;

export const OrderFooter = styled.footer`
  display: contents;
`;

export const TotalSection = styled.div`
  grid-area: totals;
  display: grid;
  gap: 7px;
`;

export const SubtotalRow = styled.div`
  display: grid;
  gap: 5px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--app-surface-soft);
`;

export const SubtotalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: var(--app-muted-dark);
  font-size: 0.84rem;
  strong {
    color: var(--app-ink);
    font-weight: 850;
  }
`;

export const SpanTextDiscount = styled.span`
  color: var(--app-success);
  font-size: 0.78rem;
  font-weight: 850;
  text-align: right;
`;

export const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 9px;
  padding: 11px 13px;
  border: 1px solid var(--app-accent-soft);
  border-radius: var(--app-radius);
  background: linear-gradient(
    110deg,
    var(--app-accent-soft),
    var(--app-accent)
  );
`;

export const TotalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  color: var(--app-primary);
  strong:first-child {
    font-family: var(--app-font-heading);
    font-size: 1.15rem;
    font-weight: 900;
  }
  strong:last-child {
    font-family: var(--app-font-heading);
    font-size: 1.3rem;
    font-weight: 900;
  }
`;

export const PromotionsToggle = styled.button`
  justify-self: start;
  padding: 4px 8px;
  border: 1px solid rgba(var(--app-primary-rgb), 0.2);
  border-radius: 7px;
  background: rgba(var(--app-white-rgb), 0.55);
  color: var(--app-primary);
  font-size: 0.7rem;
  font-weight: 850;
`;

export const PromotionsDetails = styled.div`
  display: grid;
  gap: 6px;
  padding: 10px 12px;
  border: 1px dashed var(--app-border-strong);
  border-radius: 10px;
  background: var(--app-surface);
`;

export const PromotionRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  color: var(--app-muted-dark);
  font-size: 0.76rem;
  strong {
    color: var(--app-primary);
    white-space: nowrap;
  }
`;

export const StickyError = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  padding: 8px 0;
  background: var(--app-paper);

  > p {
    margin: 0;
  }
`;

export const Error = styled.p<{ $paid?: boolean }>`
  margin: 0;
  padding: 10px 12px;
  border-radius: var(--app-radius-sm);
  font-size: 0.8rem;
  font-weight: 750;

  && {
    border: 1px solid
      ${({ $paid }) =>
        $paid ? "var(--app-success)" : "var(--app-danger)"} !important;

    background: ${({ $paid }) =>
      $paid ? "var(--app-success-soft)" : "var(--app-danger-soft)"} !important;

    color: ${({ $paid }) =>
      $paid ? "var(--app-success)" : "var(--app-danger)"} !important;
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
  background: var(--app-overlay);
  backdrop-filter: blur(7px);
`;

export const DetailsModal = styled.div`
  width: min(100%, 520px);
  max-height: calc(100dvh - 40px);
  overflow-y: auto;
  padding: 22px;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-xl);
  background: var(--app-paper);
  box-shadow: var(--app-shadow-lg);
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
    color: var(--app-accent-hover);
    font-size: 0.66rem;
    font-weight: 900;
    letter-spacing: 0.13em;
  }
  h3 {
    margin: 0;
    color: var(--app-ink);
    font-family: var(--app-font-heading);
    font-size: 1.35rem;
  }
  button {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border: 1px solid var(--app-border);
    border-radius: 50%;
    background: var(--app-surface);
    color: var(--app-primary);
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
  border: 1px solid var(--app-accent);
  border-radius: var(--app-radius-sm);
  background: var(--app-accent);
  color: var(--app-white);
  font-size: 0.8rem;
  font-weight: 850;
  &:hover {
    background: var(--app-accent-hover);
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
  border: 1px solid var(--app-border);
  border-radius: 9px;
  background: var(--app-surface-soft);
  color: var(--app-ink);
  font-size: 0.8rem;
  strong {
    color: var(--app-primary);
  }
`;

export const FieldLabelExtraNameField = styled.label`
  display: grid;
  gap: 6px;
  color: var(--app-muted-dark);
  font-size: 0.76rem;
  font-weight: 800;
  input {
    ${field};
  }
`;

export const SmallTextDiscountHint = styled.small`
  color: var(--app-muted);
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
  background: var(--app-overlay);
  backdrop-filter: blur(7px);
`;

export const IngredientModal = styled.div`
  width: min(100%, 540px);
  max-height: calc(100dvh - 36px);
  overflow-y: auto;
  padding: clamp(18px, 3vw, 26px);
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-xl);
  background: var(--app-paper);
  box-shadow: var(--app-shadow-lg);
`;

export const IngredientModalHeading = styled.header`
  display: grid;
  gap: 7px;
  margin-bottom: 18px;
  h3 {
    margin: 0;
    color: var(--app-ink);
    font-family: var(--app-font-heading);
    font-size: 1.25rem;
  }
  p {
    margin: 0;
    color: var(--app-muted);
    font-size: 0.83rem;
    line-height: 1.5;
  }
`;

export const SpanTextIngredientModalEyebrow = styled.span`
  color: var(--app-accent-hover);
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
    border: 1px solid var(--app-border);
    border-radius: var(--app-radius-sm);
    background: var(--app-surface-soft);
    cursor: pointer;
    span {
      color: var(--app-ink);
      font-size: 0.83rem;
      font-weight: 750;
    }
    small {
      color: var(--app-success);
      font-size: 0.7rem;
      font-weight: 850;
    }
    input {
      width: 17px;
      height: 17px;
      margin: 0;
      accent-color: var(--app-primary);
    }
    &.is-removed {
      border-color: var(--app-danger);
      background: var(--app-danger-soft);
    }
    &.is-removed small {
      color: var(--app-danger);
    }
  }
`;

export const ExtraIngredientsSection = styled.section`
  display: grid;
  gap: 10px;
  margin-top: 17px;
  padding: 13px;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius);
  background: var(--app-surface);
`;

export const ExtraIngredientsHeader = styled.header`
  h4 {
    margin: 0 0 3px;
    color: var(--app-ink);
    font-size: 0.86rem;
  }
  p {
    margin: 0;
    color: var(--app-muted);
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
  border: 1px solid var(--app-accent);
  border-radius: var(--app-radius-sm);
  background: var(--app-accent);
  color: var(--app-white);
  font-size: 0.78rem;
  font-weight: 850;
  &:hover:not(:disabled) {
    background: var(--app-accent-hover);
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
  border: 1px solid var(--app-border-strong);
  border-radius: 999px;
  background: var(--app-accent-soft);
  color: var(--app-primary);
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
  background: var(--app-danger-soft);
  color: var(--app-danger);
  font-size: 0.9rem;
  font-weight: 900;
`;

export const ExtraIngredientsEmpty = styled.p`
  margin: 0;
  color: var(--app-muted);
  font-size: 0.74rem;
`;

export const IngredientModalActions = styled.footer`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 19px;
  padding-top: 14px;
  border-top: 1px solid var(--app-border);
  button {
    min-height: 40px;
    padding: 9px 13px;
    border: 1px solid var(--app-primary);
    border-radius: var(--app-radius-sm);
    background: var(--app-primary);
    color: var(--app-white);
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
    border-color: var(--app-border);
    background: var(--app-surface);
    color: var(--app-muted-dark);
  }
`;

export const IngredientSave = styled.button``;
export const IngredientEditButton = styled.button`
  min-height: 31px;
  margin-top: 5px;
  padding: 5px 9px;
  border: 1px solid var(--app-border-strong);
  border-radius: 8px;
  background: var(--app-accent-soft);
  color: var(--app-primary);
  font-size: 0.7rem;
  font-weight: 850;
`;

export const IngredientSummary = styled.div`
  display: grid;
  gap: 4px;
  margin-top: 6px;
  color: var(--app-muted);
  font-size: 0.72rem;
  line-height: 1.45;
`;

export const SmallTextAddedIngredients = styled.small`
  color: var(--app-success);
  font-weight: 750;
`;

export const SmallTextRemovedIngredients = styled.small`
  color: var(--app-danger);
  font-weight: 750;
`;

export const PromotionsDetailsRow = styled.div`
  ${softCard}
`;

export const DeliveryTimeRow = styled.div`
  grid-area: delivery;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.8fr);
  align-items: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;

  > * {
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
  }

  label {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--app-ink);
    font-size: 0.83rem;
    font-weight: 800;
  }

  label span {
    flex-shrink: 0;
    color: var(--app-primary);
    font-size: 1.15rem;
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

  @media (max-width: 460px) {
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

  label {
    color: var(--app-primary);
    font-size: 0.85rem;
    font-weight: 700;
  }
  input{
    ${field}
  }
`;

export const ObservationTextarea = styled.textarea`
  width: 100%;
  min-height: 78px;
  box-sizing: border-box;
  padding: 10px 12px;
  resize: vertical;
  border: 1px solid var(--app-accent);
  border-radius: 9px;
  background: var(--app-white);
  color: var(--app-primary);
  font: inherit;
  font-size: 0.88rem;
  line-height: 1.5;
  outline: none;

  &::placeholder {
    color: var(--app-muted-dark);
  }

  &:focus {
    border-color: var(--app-primary);
    box-shadow: 0 0 0 3px rgba(var(--app-shadow-rgb), 0.1);
  }
`;
