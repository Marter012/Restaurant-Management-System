import styled from "styled-components";
import { InputStyles } from "../../Utils/GlobalStyles.ts";

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

export const OrderSection = styled.section`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  gap: 18px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: clamp(12px, 2vw, 24px);
  background: var(--color-text);
  box-shadow: var(--shadow-sm);
  overflow: visible;
  > * {
    min-width: 0;
    box-sizing: border-box;
  }

  @media (max-width: 760px) {
    gap: 13px;
    padding: 12px;
  }
`;

export const OrderHeader = styled.header`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  gap: 10px 16px;
  flex: 1 1 100%;
  width: 100%;
  min-width: 0;
  padding: 17px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-surface);
  .order-heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1 1 100%;
    gap: 12px;
    padding-bottom: 12px;
    margin-bottom: 2px;
    border-bottom: 1px solid var(--color-border);
  }

  .order-heading h3 {
    margin: 0;
    color: var(--color-primary);
    font-size: clamp(1.05rem, 1.6vw, 1.35rem);
    font-weight: 900;
    letter-spacing: -0.03em;
  }

  .order-heading > span {
    flex: 0 0 auto;
    padding: 7px 11px;
    border-radius: 999px;
    background: var(--color-primary-soft);
    color: var(--color-primary);
    font-size: 0.75rem;
    font-weight: 850;
    white-space: nowrap;
  }

  .customer-field {
    display: flex;
    flex: 1 1 260px;
    flex-direction: column;
    gap: 7px;
    min-width: 0;
  }

  .customer-field label {
    color: var(--color-text);
    font-size: 0.8rem;
    font-weight: 800;
  }

  @media (max-width: 560px) {
    padding: 13px;
    .order-heading {
      align-items: flex-start;
      flex-direction: column;
    }
    .order-heading > span {
      white-space: normal;
    }
    .customer-field {
      flex-basis: 100%;
    }
  }
`;

export const CustomerInput = styled.input`
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 43px;
  box-sizing: border-box;
  padding: 9px 12px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  outline: none;
  background: var(--color-white);
  color: var(--color-text);
  font: inherit;
  font-size: 0.85rem;

  &::placeholder {
    color: var(--color-text-secondary);
  }
  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }
`;

export const ObservationField = styled.div`
  display: flex;
  flex: 1 1 320px;
  flex-direction: column;
  gap: 7px;
  min-width: 0;

  label {
    color: var(--color-text);
    font-size: 0.8rem;
    font-weight: 800;
  }

  @media (max-width: 560px) {
    flex-basis: 100%;
  }
`;

export const ObservationTextarea = styled.textarea`
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 78px;
  box-sizing: border-box;
  padding: 10px 12px;
  resize: vertical;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  outline: none;
  background: var(--color-white);
  color: var(--color-text);
  font: inherit;
  font-size: 0.85rem;
  line-height: 1.45;

  &::placeholder {
    color: var(--color-text-secondary);
  }
  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }
`;

export const OrderSummaryColumn = styled.section`
  display: flex;
  flex: 1 1 55%;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  padding: 16px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-surface);

  @media (max-width: 900px) {
    flex-basis: 100%;
  }
`;

export const OrderOptionsColumn = styled.section`
  display: flex;
  flex: 1 1 34%;
  flex-direction: column;
  gap: 12px;
  min-width: 280px;
  padding: 15px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-surface);

  @media (max-width: 900px) {
    flex-basis: 100%;
    min-width: 0;
  }
`;

export const OrderItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
  min-width: 0;
  padding: 5px 12px;
  box-sizing: border-box;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-background);
  overflow: visible;

  > p {
    margin: 0;
    padding: 22px 5px;
    color: var(--color-text-secondary);
    font-size: 0.86rem;
    text-align: center;
  }

  .order-extra-items {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 10px;
    padding: 11px;
    border: 1px solid var(--color-border);
    border-radius: 9px;
    background: var(--color-surface-muted);
  }

  .order-extra-items h4 {
    margin: 0;
    color: var(--color-primary);
    font-size: 0.8rem;
  }

  .order-extra-items > div {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    color: var(--color-text);
    font-size: 0.78rem;
  }
`;

export const OrderItem = styled.article`
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
  padding: 10px 2px;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: 0;
  }

  .order-item-image {
    display: block;
    flex: 0 0 30px;
    width: 30px;
    height: 30px;
    border-radius: 9px;
    object-fit: cover;
    background: var(--color-surface-muted);
  }

  > div:first-of-type {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-width: 0;
  }

  h4 {
    margin: 0;
    color: var(--color-text);
    font-size: 0.86rem;
    font-weight: 850;
    overflow-wrap: anywhere;
  }

  small {
    display: block;
    color: var(--color-text-secondary);
    font-size: 0.7rem;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  > div:first-of-type > span {
    margin-top: 3px;
    color: var(--color-primary);
    font-size: 0.82rem;
    font-weight: 900;
  }

  @media (max-width: 480px) {
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 8px;

    .order-item-image {
      flex-basis: 44px;
      width: 44px;
      height: 44px;
    }

    > div:first-of-type {
      flex-basis: calc(100% - 56px);
    }
    > :last-child {
      margin-left: auto;
    }
  }
`;

export const QuantityControls = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 7px;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 32px;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 1px solid var(--color-accent);
    border-radius: 9px;
    background: var(--color-accent);
    color: var(--color-white);
    font-size: 1rem;
    font-weight: 900;
    cursor: pointer;
    transition: var(--transition-normal);
  }

  button:hover:not(:disabled) {
    border-color: var(--color-primary);
    background: var(--color-primary);
  }

  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  strong {
    flex: 0 0 20px;
    color: var(--color-primary);
    font-size: 0.85rem;
    font-weight: 900;
    text-align: center;
  }
`;

export const OrderData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  min-width: 0;
`;

export const DataSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  padding: 14px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-background);

  .payment-summary {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 11px;
    border-top: 1px solid var(--color-border);
  }

  .payment-summary > div {
    display: flex;
    flex: 1 1 130px;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
    padding: 10px 11px;
    border: 1px solid var(--color-border);
    border-radius: 9px;
  }

  .payment-summary > div.is-success {
    border-color: var(--color-success);
    background: var(--color-success-soft);
  }

  .payment-summary > div.is-danger {
    border-color: var(--color-danger);
    background: var(--color-danger-soft);
  }

  .payment-summary span {
    font-size: 0.74rem;
    font-weight: 800;
  }
  .payment-summary strong {
    font-size: 1rem;
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
`;

export const DataSectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--color-border);

  strong {
    color: var(--color-text);
    font-size: 0.88rem;
    font-weight: 850;
  }
`;

export const SectionTitleSectionTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  padding-bottom: 11px;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
  font-size: 0.94rem;
  font-weight: 900;

  &::before {
    content: "";
    display: block;
    flex: 0 0 4px;
    height: 19px;
    border-radius: 5px;
    background: var(--color-accent);
  }
`;

export const CustomerInputUnused = styled.input``;

export const Select = styled.select`
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 41px;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  outline: none;
  background: var(--color-white);
  color: var(--color-text);
  font: inherit;
  font-size: 0.8rem;

  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }
`;

export const PaymentStatusSelect = styled.select<{ $status?: string }>`
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 41px;
  box-sizing: border-box;
  padding: 8px 10px;
  border: 1px solid
    ${({ $status }) =>
      $status === "paid" ? "var(--color-success)" : "var(--color-pending)"};
  border-radius: 8px;
  outline: none;
  background: ${({ $status }) =>
    $status === "paid"
      ? "var(--color-success-soft)"
      : "var(--color-pending-soft)"};
  color: var(--color-text);
  font: inherit;
  font-size: 0.8rem;
`;

export const FieldsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-width: 0;

  > label {
    display: flex;
    flex: 1 1 145px;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
    color: var(--color-text-secondary);
    font-size: 0.75rem;
    font-weight: 800;
    position: relative;
  }

  label > span,
  label .errorMessage {
    color: var(--color-danger);
    font-size: 0.7rem;
    font-weight: 700;
  }
`;

export const CombinedPayments = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  padding-top: 11px;
  border-top: 1px solid var(--color-border);
`;

export const CombinedPaymentsHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  color: var(--color-text-secondary);
  font-size: 0.8rem;
  font-weight: 850;

  button {
    min-height: 32px;
    padding: 6px 10px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background: var(--color-primary-soft);
    color: var(--color-primary);
    font-size: 0.72rem;
    font-weight: 850;
    cursor: pointer;
  }
`;

export const CombinedPaymentRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  background: var(--color-surface-muted);

  > select,
  > div {
    flex: 1 1 100px;
    min-width: 0;
  }

  input {
    display: block;
    width: 100%;
    min-width: 0;
    min-height: 36px;
    box-sizing: border-box;
    padding: 7px 9px;
    border: 1px solid var(--color-border);
    border-radius: 7px;
    background: var(--color-white);
    color: var(--color-text);
    font: inherit;
    font-size: 0.77rem;
  }

  button {
    flex: 0 0 auto;
    min-height: 34px;
    padding: 6px 9px;
    border: 1px solid var(--color-danger);
    border-radius: 8px;
    background: var(--color-danger-soft);
    color: var(--color-danger);
    font-size: 0.7rem;
    font-weight: 800;
    cursor: pointer;
  }
`;

export const DetailsNav = styled.nav`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: stretch;
  gap: 10px;

  /* Comportamiento dentro de OrderSection */
  flex: 1 1 100%;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  order: 2;

  @media (max-width: 520px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 6px;
  }
`;

export const OptionCard = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 0;
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 12px;
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
    justify-content: flex-start;
    gap: 8px;
    width: 100%;
    min-width: 0;
    min-height: 62px;
    padding: 9px;
    border: 0;
    border-radius: inherit;
    background: transparent;
    color: var(--color-primary);
    font-weight: 850;
    text-align: left;
    cursor: pointer;
    position: relative;
  }

  .containerInfo {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  .containerInfo span {
    font-size: 0.8rem;
  }
  .containerInfo small {
    color: var(--color-text-light);
    font-size: 0.66rem;
    font-weight: 650;
    overflow-wrap: anywhere;
  }

  > button:not(.button-delete):hover {
    background: var(--color-primary-soft);
  }

  @media (max-width: 480px) {
    > button:not(.button-delete) {
      align-items: center;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      min-height: 66px;
      padding: 7px 4px;
      text-align: center;
    }
    .containerInfo span {
      font-size: 0.7rem;
    }
    .containerInfo small {
      font-size: 0.6rem;
    }
  }
`;

export const OptionClear = styled.button`
  position: absolute;
  z-index: 1;
  top: 4px;
  right: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  font-size: 0.95rem;
  cursor: pointer;
`;

export const SpanTextOptionStatus = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 27px;
  width: 27px;
  height: 27px;
  border-radius: 8px;
  color: var(--color-primary);
  font-size: 0.95rem;
  font-weight: 900;
  position: absolute;
  bottom: 0;
  right: 0;
  .is-modified & {
    background: var(--color-primary-soft);
    color: var(--color-accent);
  }
`;

export const OrderFooter = styled.footer`
  display: block;
  flex: 1 1 100%;
  width: 100%;
  min-width: 0;
`;

export const TotalSection = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: stretch;
  gap: 9px;
  width: 100%;
  min-width: 0;

  > * {
    min-width: 0;
  }

  @media (max-width: 480px) {
    gap: 7px;
  }
`;

export const DiscountRow = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 100%;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
  padding: 11px 13px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface-muted);

  &.is-active {
    border-color: var(--color-success);
    background: var(--color-success-soft);
  }
  &.is-inactive {
    opacity: 0.78;
  }
`;

export const DiscountInfo = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  min-width: 0;

  span {
    color: var(--color-text-secondary);
    font-size: 0.8rem;
    font-weight: 850;
  }
`;

export const DiscountAmount = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-left: auto;

  strong {
    color: var(--color-text-secondary);
    font-size: 0.95rem;
    font-weight: 900;
    white-space: nowrap;
  }

  .is-active & strong {
    color: var(--color-success);
  }
`;

export const SubtotalRow = styled.div`
  display: flex;
  flex: 1 1 180px;
  align-items: center;
  min-width: 0;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface-muted);

  @media (max-width: 420px) {
    flex-basis: 100%;
  }
`;

export const SubtotalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  color: var(--color-text-secondary);
  font-size: 0.82rem;

  strong {
    color: var(--color-text);
    font-weight: 850;
  }
`;

export const SpanTextDiscount = styled.span`
  color: var(--color-success);
  font-size: 0.75rem;
  font-weight: 850;
  text-align: right;
`;

export const TotalRow = styled.div`
  display: flex;
  flex: 1 1 220px;
  align-items: center;
  min-width: 0;
  padding: 12px 15px;
  border: 1px solid var(--color-primary-soft);
  border-radius: 10px;
  background: linear-gradient(
    110deg,
    var(--color-primary-soft),
    var(--color-accent)
  );

  @media (max-width: 420px) {
    flex-basis: 100%;
  }
`;

export const TotalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  min-width: 0;
  color: var(--color-primary);

  strong:first-child {
    font-size: 1rem;
    font-weight: 900;
  }
  strong:last-child {
    font-size: clamp(1.15rem, 2vw, 1.5rem);
    font-weight: 950;
    white-space: nowrap;
  }
`;

export const PromotionsToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 30px;
  width: 30px;
  height: 30px;
  padding: 0;
  border: 1px solid var(--color-border-strong);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-primary);
  font-size: 1rem;
  cursor: pointer;
  transition: transform var(--transition-normal);

  &[aria-expanded="true"] {
    transform: rotate(180deg);
  }
`;

export const PromotionsDetails = styled.div`
  position: absolute;
  z-index: 20;
  top: calc(100% + 6px);
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: min(350px, calc(100vw - 36px));
  max-height: 240px;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 13px;
  border: 1px solid var(--color-border-strong);
  border-radius: 11px;
  background: var(--color-surface);
  box-shadow: var(--shadow-lg);

  > h4 {
    margin: 0;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--color-border);
    color: var(--color-text);
    font-size: 0.83rem;
  }
`;

export const PromotionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: var(--color-text-secondary);
  font-size: 0.75rem;

  strong {
    color: var(--color-primary);
    white-space: nowrap;
  }
`;

export const Error = styled.p<{ $paid?: boolean }>`
  margin: 0;
  padding: 8px 10px;
  border: 1px solid
    ${({ $paid }) => ($paid ? "var(--color-success)" : "var(--color-danger)")};
  border-radius: 8px;
  background: ${({ $paid }) =>
    $paid ? "var(--color-success-soft)" : "var(--color-danger-soft)"};
  color: ${({ $paid }) =>
    $paid ? "var(--color-success)" : "var(--color-danger)"};
  font-size: 0.75rem;
  font-weight: 750;
`;

export const IngredientEditButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  min-height: 30px;
  margin-top: 5px;
  padding: 5px 9px;
  border: 1px solid var(--color-border-strong);
  border-radius: 7px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 0.7rem;
  font-weight: 850;
  cursor: pointer;
`;

export const IngredientSummary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 5px;
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

export const IngredientModalHeading = styled.header`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 14px;

  h3 {
    margin: 0;
    color: var(--color-text);
    font-size: 1.2rem;
  }
  p {
    margin: 0;
    color: var(--color-text-light);
    font-size: 0.82rem;
    line-height: 1.45;
  }
`;

export const SpanTextIngredientModalEyebrow = styled.span`
  display: inline-flex;
  align-self: flex-start;
  color: var(--color-primary-hover);
  font-size: 0.65rem;
  font-weight: 900;
  letter-spacing: 0.13em;
`;

export const IngredientOptionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;

  .ingredient-option {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 10px 11px;
    border: 1px solid var(--color-border);
    border-radius: 9px;
    background: var(--color-surface-muted);
    cursor: pointer;
  }

  .ingredient-option span {
    flex: 1 1 auto;
    min-width: 0;
    color: var(--color-text);
    font-size: 0.8rem;
    font-weight: 750;
    overflow-wrap: anywhere;
  }

  .ingredient-option small {
    flex: 0 0 auto;
    color: var(--color-success);
    font-size: 0.68rem;
    font-weight: 850;
  }

  .ingredient-option input {
    flex: 0 0 17px;
    width: 17px;
    height: 17px;
    margin: 0;
    accent-color: var(--color-primary);
  }

  .ingredient-option.is-removed {
    border-color: var(--color-danger);
    background: var(--color-danger-soft);
  }
  .ingredient-option.is-removed small {
    color: var(--color-danger);
  }

  @media (max-width: 460px) {
    .ingredient-option {
      flex-wrap: wrap;
    }
    .ingredient-option small {
      margin-left: 26px;
    }
  }
`;

export const ExtraIngredientsSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
  padding: 13px;
  border: 1px solid var(--color-border);
  border-radius: 11px;
  background: var(--color-surface);
`;

export const ExtraIngredientsHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h4 {
    margin: 0;
    color: var(--color-text);
    font-size: 0.85rem;
  }
  p {
    margin: 0;
    color: var(--color-text-light);
    font-size: 0.72rem;
    line-height: 1.4;
  }
`;

export const ExtraIngredientsForm = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  > input {
    flex: 1 1 180px;
    min-width: 0;
  }
  > button {
    flex: 0 0 auto;
  }

  @media (max-width: 400px) {
    align-items: stretch;
    flex-direction: column;
    > button {
      width: 100%;
    }
  }
`;

export const ExtraIngredientsInput = styled.input`
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 41px;
  box-sizing: border-box;
  padding: 8px 11px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  outline: none;
  background: var(--color-white);
  color: var(--color-text);
  font: inherit;
  font-size: 0.8rem;

  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }
`;

export const ExtraIngredientsAddButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 41px;
  padding: 8px 13px;
  border: 1px solid var(--color-accent);
  border-radius: 8px;
  background: var(--color-accent);
  color: var(--color-white);
  font-size: 0.76rem;
  font-weight: 850;
  cursor: pointer;

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
  max-width: 100%;
  padding: 5px 8px 5px 10px;
  border: 1px solid var(--color-border-strong);
  border-radius: 999px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 0.73rem;
  font-weight: 750;
  overflow-wrap: anywhere;
`;

export const ExtraIngredientRemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 19px;
  width: 19px;
  height: 19px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  font-size: 0.88rem;
  font-weight: 900;
  cursor: pointer;
`;

export const ExtraIngredientsEmpty = styled.p`
  margin: 0;
  color: var(--color-text-light);
  font-size: 0.73rem;
`;

export const DeliveryTimeRow = styled.section`
  display: flex;
  flex: 1 1 100%;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
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
    font-size: 0.84rem;
    font-weight: 850;
  }

  label span {
    flex: 0 0 auto;
    color: var(--color-primary);
    font-size: 1.15rem;
  }

  input {
    display: block;
    flex: 1 1 180px;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    box-sizing: border-box;
  }

  @media (max-width: 560px) {
    align-items: stretch;
    flex-direction: column;
  }
`;
