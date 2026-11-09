import styled from "styled-components";

export const HistoryContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(350px, 0.92fr) minmax(0, 1.18fr);
  gap: 14px;
  width: 100%;
  min-width: 0;
  color: var(--color-text);
  @media (max-width: 1180px) {
    grid-template-columns: 1fr;
  }
`;
export const HistoryExplorer = styled.section`
  min-width: 0;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: var(--color-white);
  box-shadow: 0 8px 24px var(--color-border);
`;
export const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--color-border);
  @media (max-width: 720px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;
export const HeaderTitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;
export const HeaderIcon = styled.div`
  width: 46px;
  height: 46px;
  flex: 0 0 46px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  svg {
    font-size: 1.55rem;
  }
`;
export const HeaderTitle = styled.h3`
  margin: 0;
  color: var(--color-primary-hover);
  font-size: 1.12rem;
  font-weight: 850;
  letter-spacing: -0.025em;
`;
export const HeaderDescription = styled.p`
  margin: 4px 0 0;
  color: var(--color-text-secondary);
  font-size: 0.77rem;
  line-height: 1.45;
`;
export const MonthSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 5px;
  border: 1px solid var(--color-border);
  border-radius: 13px;
  background: var(--color-surface-hover);
`;
export const MonthButton = styled.button`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 9px;
  background: var(--color-white);
  color: var(--color-primary);
  cursor: pointer;
  &:hover {
    background: var(--color-background);
  }
  svg {
    font-size: 1.25rem;
  }
`;
export const MonthTitle = styled.strong`
  min-width: 128px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  color: var(--color-primary-hover);
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: capitalize;
  svg {
    color: var(--color-accent);
    font-size: 1rem;
  }
`;
export const HistoryStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 9px;
  margin: 16px 0;
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
export const HistoryStatCard = styled.div`
  min-width: 0;
  min-height: 84px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: linear-gradient(
    145deg,
    var(--color-white),
    var(--color-surface-hover)
  );
`;
export const HistoryStatIcon = styled.div<{
  $tone?: "primary" | "accent" | "soft";
}>`
  width: 37px;
  height: 37px;
  flex: 0 0 37px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: ${(p) =>
    p.$tone === "accent"
      ? "var(--color-primary-soft)"
      : p.$tone === "soft"
        ? "var(--color-background)"
        : "var(--color-primary-soft)"};
  color: ${(p) =>
    p.$tone === "accent" ? "var(--color-accent)" : "var(--color-primary)"};
  svg {
    font-size: 1.2rem;
  }
`;
export const HistoryStatLabel = styled.span`
  display: block;
  color: var(--color-text-secondary);
  font-size: 0.67rem;
  font-weight: 700;
`;
export const HistoryStatValue = styled.strong`
  display: block;
  margin-top: 4px;
  color: var(--color-primary-hover);
  font-size: clamp(0.9rem, 1.3vw, 1.08rem);
  font-weight: 850;
  overflow-wrap: anywhere;
`;
export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;
`;
export const HistoryListHeader = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(78px, 0.8fr) minmax(
      65px,
      0.65fr
    ) 34px;
  gap: 8px;
  padding: 8px 11px;
  color: var(--color-text-secondary);
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  span:nth-child(2),
  span:nth-child(3) {
    text-align: right;
  }
  @media (max-width: 580px) {
    grid-template-columns: minmax(0, 1fr) minmax(72px, auto) 14px;
    span:nth-child(3),
    span:last-child {
      display: none;
    }
  }
`;
export const HistoryRow = styled.div<{ $selected?: boolean }>`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 36px;
  align-items: center;
  gap: 5px;
  padding: 5px;
  border: 1px solid
    ${(p) =>
      p.$selected
        ? "var(--color-primary-soft)"
        : "var(--color-border)"};
  border-radius: 13px;
  background: ${(p) =>
    p.$selected ? "var(--color-primary-soft)" : "var(--color-white)"};
  &:hover {
    border-color: var(--color-primary-soft);
  }
`;
export const HistoryRowMain = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.3fr) minmax(78px, 0.8fr) minmax(
      65px,
      0.65fr
    ) 16px;
  align-items: center;
  gap: 8px;
  min-width: 0;
  padding: 7px 5px;
  border-radius: 8px;
  cursor: pointer;
  &:focus-visible {
    outline: 3px solid var(--color-primary-soft);
  }
  @media (max-width: 580px) {
    grid-template-columns: minmax(0, 1fr) minmax(72px, auto) 14px;
  }
`;
export const RowDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  > span {
    width: 31px;
    height: 31px;
    display: grid;
    place-items: center;
    border-radius: 9px;
    background: var(--color-surface-hover);
    color: var(--color-primary);
  }
  strong {
    display: block;
    color: var(--color-primary-hover);
    font-size: 0.76rem;
  }
`;
export const RowShift = styled.span<{ $night?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-top: 3px;
  padding: 3px 7px;
  border-radius: 20px;
  background: ${(p) =>
    p.$night
      ? "var(--color-primary-soft)"
      : "var(--color-primary-soft)"};
  color: ${(p) => (p.$night ? "var(--color-primary)" : "var(--color-accent)")};
  font-size: 0.64rem;
  font-weight: 800;
  svg {
    font-size: 0.78rem;
  }
`;
export const RowSales = styled.strong`
  color: var(--color-primary-hover);
  font-size: 0.77rem;
  font-weight: 850;
  text-align: right;
  white-space: nowrap;
`;
export const RowStatus = styled.span<{ $closed?: boolean }>`
  justify-self: end;
  padding: 5px 8px;
  border-radius: 20px;
  background: ${(p) =>
    p.$closed ? "var(--color-border)" : "var(--color-primary-soft)"};
  color: ${(p) => (p.$closed ? "var(--color-success)" : "var(--color-accent)")};
  font-size: 0.64rem;
  font-weight: 800;
  @media (max-width: 580px) {
    display: none;
  }
`;
export const RowArrow = styled.span`
  display: grid;
  place-items: center;
  color: var(--color-text-secondary);
  svg {
    font-size: 0.78rem;
  }
  @media (max-width: 580px) {
    grid-column: 3;
  }
`;
export const PrintAction = styled.button`
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  background: var(--color-white);
  color: var(--color-primary);
  cursor: pointer;
  &:hover:not(:disabled) {
    background: var(--color-background);
  }
  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }
  svg {
    font-size: 1.05rem;
  }
`;
export const EmptyMessage = styled.div`
  min-height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 7px;
  padding: 20px;
  border: 1px dashed var(--color-border);
  border-radius: 14px;
  color: var(--color-text-secondary);
  text-align: center;
  > svg {
    color: var(--color-accent);
    font-size: 1.5rem;
  }
  strong {
    color: var(--color-primary-hover);
    font-size: 0.85rem;
  }
  span {
    font-size: 0.75rem;
  }
`;
export const DetailPanel = styled.section`
  min-width: 0;
  max-height: 100%;
  overflow: auto;
  padding: 20px;
  border: 1px solid var(--color-border);
  border-radius: 20px;
  background: var(--color-white);
  box-shadow: 0 8px 24px var(--color-border);
  scrollbar-width: thin;
  @media (max-width: 1180px) {
    max-height: none;
  }
  @media (max-width: 600px) {
    padding: 15px;
  }
`;
export const DetailEmptyState = styled.div`
  min-height: 490px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 32px;
  text-align: center;
`;
export const DetailEmptyIcon = styled.div`
  width: 66px;
  height: 66px;
  display: grid;
  place-items: center;
  border-radius: 20px;
  background: var(--color-background);
  color: var(--color-primary);
  svg {
    font-size: 2rem;
  }
`;
export const DetailEmptyTitle = styled.h3`
  margin: 18px 0 6px;
  color: var(--color-primary-hover);
  font-size: 1.05rem;
`;
export const DetailEmptyDescription = styled.p`
  max-width: 330px;
  margin: 0;
  color: var(--color-text-secondary);
  font-size: 0.8rem;
  line-height: 1.55;
`;
export const DetailHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 17px;
  border-bottom: 1px solid var(--color-border);
  @media (max-width: 650px) {
    flex-direction: column;
  }
`;
export const DetailHeaderTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  color: var(--color-primary-hover);
  font-size: 1.04rem;
  font-weight: 850;
`;
export const DetailHeaderIcon = styled.span`
  display: inline-grid;
  place-items: center;
  color: var(--color-primary);
  svg {
    font-size: 1.45rem;
  }
`;
export const DetailHeaderDescription = styled.p`
  margin: 5px 0 0 33px;
  color: var(--color-text-secondary);
  font-size: 0.74rem;
`;
export const DetailHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
  @media (max-width: 650px) {
    width: 100%;
    flex-wrap: wrap;
  }
`;
export const DetailCloseButton = styled.button`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-white);
  color: var(--color-text-secondary);
  cursor: pointer;
  &:hover {
    background: var(--color-surface-hover);
    color: var(--color-primary);
  }
`;
export const PrintDetailButton = styled.button`
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 0 12px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-white);
  color: var(--color-primary);
  font-size: 0.73rem;
  font-weight: 800;
  cursor: pointer;
  &:hover:not(:disabled) {
    background: var(--color-background);
  }
  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }
`;
export const EditCashButton = styled.button`
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 12px;
  border: 0;
  border-radius: 10px;
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 0.73rem;
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.18s,
    opacity 0.18s;
  &:hover {
    transform: translateY(-1px);
    opacity: 0.92;
  }
  svg {
    font-size: 1rem;
  }
`;
export const CashIdentityCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
  padding: 13px 15px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: linear-gradient(
    120deg,
    var(--color-white),
    var(--color-surface-hover)
  );
`;
export const CashIdentityMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;
export const CashIdentityDate = styled.strong`
  color: var(--color-primary-hover);
  font-size: 0.85rem;
  font-weight: 850;
`;
export const CashIdentityMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-secondary);
  font-size: 0.72rem;
  font-weight: 650;
`;
export const ShiftBadge = styled.span<{ $night?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 9px;
  border-radius: 30px;
  background: ${(p) =>
    p.$night
      ? "var(--color-primary-soft)"
      : "var(--color-primary-soft)"};
  color: ${(p) => (p.$night ? "var(--color-primary)" : "var(--color-accent)")};
  font-size: 0.7rem;
  font-weight: 800;
`;
export const SummaryStatus = styled.span<{ $closed?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 11px;
  border-radius: 11px;
  background: ${(p) =>
    p.$closed
      ? "var(--color-primary-soft)"
      : "var(--color-primary-soft)"};
  color: ${(p) => (p.$closed ? "var(--color-primary)" : "var(--color-accent)")};
  font-size: 0.72rem;
  font-weight: 850;
`;
export const SummarySection = styled.section`
  min-width: 0;
  margin-top: 13px;
  padding: 14px;
  border: 1px solid var(--color-border);
  border-radius: 14px;
  background: var(--color-white);
`;
export const SummarySectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 11px;
`;
export const SummarySectionTitle = styled.h4`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: var(--color-primary-hover);
  font-size: 0.82rem;
  font-weight: 850;
  svg {
    color: var(--color-accent);
    font-size: 1.1rem;
  }
`;
export const SectionTag = styled.span`
  padding: 5px 8px;
  border-radius: 8px;
  background: var(--color-surface-hover);
  color: var(--color-primary);
  font-size: 0.67rem;
  font-weight: 800;
`;
export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  @media (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 380px) {
    grid-template-columns: 1fr;
  }
`;
export const SummaryCard = styled.div`
  min-width: 0;
  padding: 11px 10px;
  border: 1px solid var(--color-border);
  border-radius: 11px;
  background: var(--color-surface-hover);
`;
export const SummaryCardLabel = styled.span`
  display: block;
  color: var(--color-text-secondary);
  font-size: 0.65rem;
  font-weight: 700;
  line-height: 1.35;
`;
export const SummaryCardValue = styled.strong`
  display: block;
  margin-top: 5px;
  color: var(--color-primary-hover);
  font-size: clamp(0.78rem, 1.1vw, 0.94rem);
  font-weight: 850;
  overflow-wrap: anywhere;
`;
export const DetailColumns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 12px;
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;
export const DetailGrid = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;
export const DetailItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 9px 0;
  border-bottom: 1px solid var(--color-border);
  &:last-child {
    border: 0;
  }
`;
export const DetailItemLabel = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--color-text);
  font-size: 0.73rem;
  font-weight: 650;
`;
export const DetailItemValue = styled.strong`
  color: var(--color-primary-hover);
  font-size: 0.75rem;
  font-weight: 850;
`;
export const DetailItemIcon = styled.span`
  width: 25px;
  height: 25px;
  flex: 0 0 25px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: var(--color-surface-hover);
  color: var(--color-primary);
  font-size: 0.9rem;
`;
export const CashCalculation = styled.div`
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  background: var(--color-surface-hover);
`;
export const CalculationTitle = styled.strong`
  display: block;
  margin-bottom: 7px;
  color: var(--color-primary-hover);
  font-size: 0.74rem;
  font-weight: 850;
`;
export const CalculationRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text-secondary);
  font-size: 0.72rem;
  strong {
    color: var(--color-text);
    font-size: 0.73rem;
  }
`;
export const CalculationResult = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin: 7px 0;
  padding: 10px 11px;
  border-radius: 9px;
  background: var(--color-primary-soft);
  color: var(--color-primary-hover);
  font-size: 0.75rem;
  font-weight: 850;
`;
export const DifferenceBox = styled.div<{
  $tone: "positive" | "negative" | "neutral";
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  padding: 12px;
  border: 1px solid var(--color-primary-soft);
  border-radius: 11px;
  background: ${(p) =>
    p.$tone === "negative"
      ? "var(--color-danger-soft)"
      : "var(--color-primary-soft)"};
  color: ${(p) =>
    p.$tone === "negative" ? "var(--color-danger)" : "var(--color-primary)"};
`;
export const DifferenceLabel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  strong {
    font-size: 0.78rem;
  }
  span {
    font-size: 0.68rem;
  }
`;
export const DifferenceValue = styled.strong`
  font-size: 1.05rem;
  font-weight: 900;
`;
export const TurnInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
`;
export const TurnInfoCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 11px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-surface-hover);
  span {
    color: var(--color-text-secondary);
    font-size: 0.7rem;
    font-weight: 700;
  }
  strong {
    color: var(--color-primary-hover);
    font-size: 0.72rem;
  }
`;

export const EditModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1500;
  display: grid;
  place-items: center;
  padding: 18px;
  background: var(--modal-overlay);
  backdrop-filter: blur(5px);
`;
export const EditModal = styled.div`
  width: min(620px, 100%);
  max-height: min(90dvh, 850px);
  overflow: auto;
  padding: 22px;
  border: 1px solid var(--color-primary-soft);
  border-radius: 20px;
  background: var(--color-white);
  box-shadow: 0 24px 80px var(--shadow-lg);
`;
export const EditModalHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--color-border);
  p {
    margin: 5px 0 0;
    color: var(--color-text-secondary);
    font-size: 0.76rem;
  }
`;
export const EditModalTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  color: var(--color-primary-hover);
  font-size: 1.1rem;
  font-weight: 850;
  svg {
    color: var(--color-accent);
  }
`;
export const EditModalClose = styled.button`
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid var(--color-border);
  border-radius: 9px;
  background: var(--color-surface-hover);
  color: var(--color-primary);
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;
export const EditNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding: 10px 12px;
  border-radius: 10px;
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 0.74rem;
  font-weight: 700;
  svg {
    font-size: 1rem;
  }
`;
export const EditForm = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 13px;
  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;
export const EditField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
  label {
    color: var(--color-primary-hover);
    font-size: 0.73rem;
    font-weight: 800;
  }
  input,
  select {
    width: 100%;
    min-height: 42px;
    box-sizing: border-box;
    padding: 0 11px;
    border: 1px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-white);
    color: var(--color-text);
    font-size: inherit;
    font-size: 0.8rem;
    outline: none;
    &:focus {
      border-color: var(--color-accent);
      box-shadow: 0 0 0 3px var(--color-primary-soft);
    }
    &:disabled {
      opacity: 0.55;
      background: var(--color-surface-hover);
    }
  }
`;
export const EditError = styled.div`
  grid-column: 1/-1;
  padding: 10px 12px;
  border: 1px solid var(--color-danger-soft);
  border-radius: 9px;
  background: var(--color-danger-soft);
  color: var(--color-danger);
  font-size: 0.75rem;
  font-weight: 700;
`;
export const EditActions = styled.div`
  grid-column: 1/-1;
  display: flex;
  justify-content: flex-end;
  gap: 9px;
  margin-top: 5px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border);
`;
export const EditCancelButton = styled.button`
  min-height: 40px;
  padding: 0 15px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: var(--color-white);
  color: var(--color-text-secondary);
  font-weight: 800;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;
export const EditSaveButton = styled.button`
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0 16px;
  border: 0;
  border-radius: 10px;
  background: var(--color-primary);
  color: var(--color-white);
  font-weight: 850;
  cursor: pointer;
  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }
  svg {
    font-size: 1rem;
  }
`;
