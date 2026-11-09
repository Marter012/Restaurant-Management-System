import styled from "styled-components";
import { caramelButtonStyles } from "../Utils/ButtonStyles.ts";

export const PrintCenter = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: clamp(14px, 1.5vw, 22px);
  box-sizing: border-box;
  color: var(--color-primary-hover);
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  box-shadow: var(--shadow-md);
`;

export const PrintCenterHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 2px 2px 18px;
  border-bottom: 1px solid var(--color-border);

  @media (max-width: 760px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const PrintCenterEyebrow = styled.span`
  display: inline-block;
  margin-bottom: 7px;
  color: var(--color-accent);
  font-size: 0.68rem;
  font-weight: 850;
  letter-spacing: 0.11em;
  text-transform: uppercase;
`;

export const PrintCenterTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: var(--color-primary-hover);
  font-size: clamp(1.25rem, 2vw, 1.65rem);
  line-height: 1.2;
  font-weight: 850;
  letter-spacing: -0.035em;

  svg {
    flex: 0 0 auto;
    color: var(--color-primary);
    font-size: 1.45em;
  }
`;

export const PrintCenterLead = styled.p`
  max-width: 740px;
  margin: 7px 0 0;
  color: var(--color-text-secondary);
  font-size: 0.84rem;
  line-height: 1.5;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 11px;
  min-width: 0;

  @media (max-width: 760px) {
    width: 100%;
    justify-content: space-between;
  }

  @media (max-width: 480px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const PrintCenterStatus = styled.div<{ $active?: boolean }>`
  min-width: 180px;
  max-width: 290px;
  display: grid;
  grid-template-columns: 10px minmax(0, 1fr);
  column-gap: 9px;
  align-items: center;
  padding: 10px 13px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "var(--color-success-soft)" : "var(--color-border)"};
  border-radius: 13px;
  background: ${({ $active }) =>
    $active ? "var(--color-success-soft)" : "var(--color-surface-hover)"};

  > span {
    grid-row: 1 / span 2;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: ${({ $active }) =>
      $active ? "var(--color-success)" : "var(--color-accent)"};
    box-shadow: 0 0 0 4px
      ${({ $active }) =>
        $active ? "var(--color-success-soft)" : "var(--color-surface-muted)"};
  }

  strong {
    color: ${({ $active }) =>
      $active ? "var(--color-success)" : "var(--color-primary)"};
    font-size: 0.78rem;
    font-weight: 850;
  }

  small {
    grid-column: 2;
    display: block;
    overflow: hidden;
    margin-top: 2px;
    color: var(--color-text-secondary);
    font-size: 0.68rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  @media (max-width: 480px) {
    max-width: none;
  }
`;

export const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const StatusCard = styled.article<{ $active?: boolean }>`
  position: relative;
  min-width: 0;
  min-height: 135px;
  overflow: hidden;
  padding: 16px;
  border: 1px solid ${({ $active }) => ($active ? "var(--color-border-strong)" : "var(--color-border)")};
  border-radius: 16px;
  background: ${({ $active }) => ($active ? "linear-gradient(145deg, var(--color-white), var(--color-surface-hover))" : "var(--color-white)")};
  box-shadow: var(--shadow-sm);

  &::after {
    content: "";
    position: absolute;
    width: 88px;
    height: 88px;
    right: -42px;
    bottom: -48px;
    border-radius: 50%;
    background: var(--color-surface-muted);
    pointer-events: none;
  }
`;

export const StatusCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 11px;
`;

export const StatusIcon = styled.div<{ $active?: boolean }>`
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: ${({ $active }) =>
    $active ? "var(--color-success-soft)" : "var(--color-surface-muted)"};
  color: ${({ $active }) =>
    $active ? "var(--color-success)" : "var(--color-primary)"};

  svg {
    font-size: 1.28rem;
  }
`;

export const StatusDot = styled.span<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  flex: 0 0 auto;
  border-radius: 50%;
  background: ${({ $active }) =>
    $active ? "var(--color-success)" : "var(--color-accent)"};
  box-shadow: 0 0 0 4px
    ${({ $active }) =>
      $active ? "var(--color-success-soft)" : "var(--color-surface-muted)"};
`;

export const StatusCardTitle = styled.div`
  color: var(--color-text-secondary);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.045em;
  text-transform: uppercase;
`;

export const StatusCardValue = styled.div<{ $active?: boolean }>`
  overflow: hidden;
  margin-top: 4px;
  color: ${({ $active }) =>
    $active ? "var(--color-primary-hover)" : "var(--color-accent)"};
  font-size: clamp(0.95rem, 1.4vw, 1.18rem);
  font-weight: 850;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StatusCardDescription = styled.p`
  display: -webkit-box;
  overflow: hidden;
  margin: 5px 0 0;
  color: var(--color-text-secondary);
  font-size: 0.72rem;
  line-height: 1.4;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 0.82fr) minmax(0, 1.45fr);
  align-items: start;
  gap: 14px;

  > div {
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
  }

  @media (max-width: 1050px) {
    grid-template-columns: 1fr;
  }
`;

export const Section = styled.section`
  min-width: 0;
  padding: clamp(15px, 1.7vw, 20px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-white);
  box-shadow: var(--shadow-sm);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 17px;

  > div {
    min-width: 0;
  }
`;

export const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  color: var(--color-primary-hover);
  font-size: 0.98rem;
  font-weight: 850;
  letter-spacing: -0.015em;
`;

export const SectionDescription = styled.p`
  margin: 5px 0 0 38px;
  color: var(--color-text-secondary);
  font-size: 0.73rem;
  line-height: 1.45;

  @media (max-width: 560px) {
    margin-left: 0;
  }
`;

export const SectionIcon = styled.span`
  width: 29px;
  height: 29px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: var(--color-surface-muted);
  color: var(--color-primary);

  svg {
    font-size: 1rem;
  }
`;

export const BasicSettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
`;

export const SettingField = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
`;

export const InfoLabel = styled.span`
  color: var(--color-primary-hover);
  font-size: 0.76rem;
  font-weight: 750;
`;

export const PrinterSelect = styled.select`
  width: 100%;
  min-width: 0;
  min-height: 44px;
  box-sizing: border-box;
  padding: 0 38px 0 12px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  outline: none;
  background: var(--color-white);
  color: var(--color-primary-hover);
  font: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;

  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }

  &:disabled {
    opacity: 0.62;
    cursor: not-allowed;
  }
`;

export const TextInput = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 44px;
  box-sizing: border-box;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  outline: none;
  background: var(--color-white);
  color: var(--color-primary-hover);
  font: inherit;
  font-size: 0.82rem;

  &::placeholder {
    color: var(--color-text-secondary);
    opacity: 0.7;
  }

  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }

  &:disabled {
    opacity: 0.62;
    cursor: not-allowed;
  }
`;

export const CheckControl = styled.label`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  padding: 13px 12px;
  border: 1px solid var(--color-border);
  border-radius: 11px;
  background: var(--color-surface-hover);
  cursor: pointer;

  input {
    position: relative;
    width: 38px;
    height: 22px;
    flex: 0 0 auto;
    margin: 0;
    appearance: none;
    border: 0;
    border-radius: 20px;
    background: var(--color-border);
    cursor: pointer;
    transition: background 0.18s ease;

    &::before {
      content: "";
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: var(--color-white);
      box-shadow: var(--shadow-sm);
      transition: transform 0.18s ease;
    }

    &:checked {
      background: var(--color-primary);
    }

    &:checked::before {
      transform: translateX(16px);
    }

    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
    }
  }

  span {
    display: flex;
    min-width: 0;
    flex-direction: column;
    gap: 3px;
  }

  strong {
    color: var(--color-primary-hover);
    font-size: 0.78rem;
    font-weight: 800;
  }

  small {
    color: var(--color-text-secondary);
    font-size: 0.7rem;
    line-height: 1.4;
  }
`;

export const ResponsiveRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
  margin-top: 16px;

  > div {
    min-width: 0;
  }

  @media (max-width: 560px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

const buttonBase = `
  min-height: 42px;
  min-width: 0;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 13px;
  border-radius: 10px;
  font-size: 0.76rem;
  font-weight: 800;
  line-height: 1.25;
  text-align: center;
  cursor: pointer;
  transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;

  svg {
    flex: 0 0 auto;
    font-size: 1.08rem;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SaveButton = styled.button`
  ${buttonBase}
  width: 100%;
  border: 1px solid var(--color-primary);
  background: var(--color-primary);
  color: var(--color-white);
  box-shadow: var(--shadow-sm);

  &:hover:not(:disabled) {
    background: var(--color-primary-hover);
    box-shadow: var(--shadow-md);
  }

  ${caramelButtonStyles}
`;

export const ActionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 9px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

export const SecondaryButton = styled.button`
  ${buttonBase}
  width: 100%;
  min-height: 72px;
  flex-direction: column;
  padding: 12px 10px;
  border: 1px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-primary-hover);

  svg {
    font-size: 1.25rem;
    color: var(--color-primary);
  }

  &:hover:not(:disabled) {
    border-color: var(--color-border-strong);
    background: var(--color-surface-hover);
  }
`;

export const RefreshButton = styled.button`
  ${buttonBase}
  flex: 0 0 auto;
  min-height: 42px;
  border: 1px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-primary-hover);

  &:hover:not(:disabled) {
    border-color: var(--color-border-strong);
    background: var(--color-surface-hover);
  }
`;

export const Loading = styled.div`
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
  color: var(--color-primary);
  font-size: 0.85rem;
  font-weight: 750;

  svg {
    font-size: 1.8rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: 11px;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  font-size: 0.77rem;
  font-weight: 700;

  svg {
    flex: 0 0 auto;
    font-size: 1.1rem;
  }
`;

export const EmptyMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 68px;
  padding: 14px;
  border: 1px dashed var(--color-border);
  border-radius: 11px;
  background: var(--color-surface-hover);
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  line-height: 1.45;
  text-align: center;
`;

export const QueueSummary = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 9px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const QueueSummaryItem = styled.div`
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 11px;
  background: var(--color-surface-hover);
`;

export const QueueSummaryIcon = styled.div`
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: var(--color-surface-muted);
  color: var(--color-primary);

  svg { font-size: 1.15rem; }
`;

export const QueueBadgeLabel = styled.div`
  color: var(--color-text-secondary);
  font-size: 0.68rem;
  font-weight: 750;
`;

export const QueueBadgeValue = styled.div`
  margin-top: 2px;
  color: var(--color-primary-hover);
  font-size: 1.12rem;
  font-weight: 850;
`;

export const QueueBadge = styled.div<{ $warning?: boolean }>`
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 10px;
  background: ${({ $warning }) =>
    $warning ? "var(--color-surface-muted)" : "var(--color-success-soft)"};
  color: ${({ $warning }) =>
    $warning ? "var(--color-accent)" : "var(--color-success)"};
  font-size: 0.74rem;
  font-weight: 800;

  svg {
    font-size: 1.05rem;
  }
`;

export const WorkPanel = styled.section`
  min-width: 0;
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-white);
  box-shadow: var(--shadow-sm);
`;

export const WorkTabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  padding: 10px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-surface-hover);

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const WorkTab = styled.button<{ $active?: boolean }>`
  min-width: 0;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 10px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "var(--color-primary)" : "var(--color-border)"};
  border-radius: 9px;
  background: ${({ $active }) =>
    $active ? "var(--color-primary)" : "var(--color-white)"};
  color: ${({ $active }) =>
    $active ? "var(--color-white)" : "var(--color-primary-hover)"};
  font-size: 0.72rem;
  font-weight: 800;
  cursor: pointer;
  transition:
    background 0.16s ease,
    border-color 0.16s ease;

  svg {
    flex: 0 0 auto;
    font-size: 1.05rem;
  }

  &:hover:not(:disabled) {
    border-color: var(--color-primary);
  }
`;

export const WorkPanelContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  min-width: 0;
  min-height: 200px;
  padding: 16px;
`;

export const SelectWrapper = styled.label`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
`;

export const SelectLabel = styled.span`
  color: var(--color-primary-hover);
  font-size: 0.76rem;
  font-weight: 750;
`;

export const Select = styled.select`
  width: 100%;
  min-height: 43px;
  box-sizing: border-box;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  outline: none;
  background: var(--color-white);
  color: var(--color-primary-hover);
  font: inherit;
  font-size: 0.78rem;

  &:focus {
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px var(--color-primary-soft);
  }
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const OrderItem = styled.button<{ $selected?: boolean }>`
  width: 100%;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 11px 12px;
  border: 1px solid ${({ $selected }) => ($selected ? "var(--color-border-strong)" : "var(--color-border)")};
  border-radius: 11px;
  background: ${({ $selected }) => ($selected ? "var(--color-surface-hover)" : "var(--color-white)")};
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition: border-color 0.16s ease, background 0.16s ease;

  &:hover {
    border-color: var(--color-border-strong);
  }
`;

export const OrderIcon = styled.span`
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: var(--color-surface-muted);
  color: var(--color-primary);
  svg { font-size: 1.1rem; }
`;

export const OrderInfo = styled.span`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
`;

export const OrderTitle = styled.span`
  overflow: hidden;
  color: var(--color-primary-hover);
  font-size: 0.78rem;
  font-weight: 850;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const OrderCustomer = styled.span`
  overflow: hidden;
  margin-top: 3px;
  color: var(--color-text-secondary);
  font-size: 0.7rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const OrderTotal = styled.span`
  flex: 0 0 auto;
  color: var(--color-primary);
  font-size: 0.78rem;
  font-weight: 850;
`;

export const ApiDataCard = styled.div`
  min-width: 0;
  margin-top: 12px;
  padding: 14px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface-hover);
`;

export const ApiDataTitle = styled.h4`
  margin: 0 0 10px;
  color: var(--color-primary-hover);
  font-size: 0.8rem;
  font-weight: 850;
`;

export const ApiJobCancelButton = styled.button`
  align-self: flex-end;
  min-height: 34px;
  margin-top: 8px;
  padding: 7px 10px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;

  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

export const ApiInfoList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ApiInfoRow = styled.div`
  display: grid;
  grid-template-columns: minmax(125px, 0.8fr) minmax(0, 1.2fr);
  gap: 12px;
  align-items: start;
  padding: 9px 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
    gap: 4px;
  }
`;

export const ApiInfoLabel = styled.span`
  color: var(--color-text-secondary);
  font-size: 0.72rem;
  font-weight: 750;
  overflow-wrap: anywhere;
`;

export const ApiInfoValue = styled.div`
  min-width: 0;
  color: var(--color-primary-hover);
  font-size: 0.75rem;
  font-weight: 650;
  line-height: 1.45;
  overflow-wrap: anywhere;
`;

export const ApiRecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 100%;
`;

export const ApiRecordCard = styled.div`
  min-width: 0;
  padding: 11px 12px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-white);
`;

export const ApiActionMessage = styled.div`
  padding: 11px 12px;
  border-radius: 9px;
  background: var(--color-surface-hover);
  color: var(--color-text-secondary);
  font-size: 0.73rem;
  line-height: 1.45;
`;
