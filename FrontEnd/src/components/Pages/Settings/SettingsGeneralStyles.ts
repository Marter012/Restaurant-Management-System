import styled from "styled-components";

export const GeneralContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 0;
  color: var(--app-ink);
  container-type: inline-size;

  &,
  & * {
    box-sizing: border-box;
  }
  > * {
    min-width: 0;
    max-width: 100%;
  }
`;

export const GeneralHeading = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  padding: 2px 0 8px;

  @media (max-width: 700px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  @media (max-width: 420px) {
    padding-bottom: 4px;
  }
`;

export const GeneralEyebrow = styled.span`
  display: block;
  margin-bottom: 7px;
  color: var(--app-accent);
  font-size: 0.76rem;
  font-weight: 850;
  letter-spacing: 0.1em;
`;

export const GeneralTitle = styled.h2`
  margin: 0;
  color: var(--app-ink);
  font-family: var(--app-font-heading);
  font-size: clamp(1.55rem, 2.7vw, 2.1rem);
  font-weight: 850;
  letter-spacing: -0.04em;
  line-height: 1.15;
`;

export const GeneralDescription = styled.p`
  max-width: 720px;
  margin: 7px 0 0;
  color: var(--app-muted);
  font-size: 0.91rem;
  line-height: 1.55;
`;

export const DashboardGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(290px, 0.82fr) minmax(0, 1.38fr);
  align-items: start;
  gap: 15px;
  min-width: 0;

  @media (max-width: 1050px) {
    grid-template-columns: minmax(0, 1fr);
  }

  @media (max-width: 600px) {
    gap: 11px;
  }

  /* El ancho útil de la página es menor que el viewport por el sidebar. */
  @container (max-width: 1250px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const Panel = styled.section`
  min-width: 0;
  padding: 17px;
  border: 1px solid var(--app-border);
  border-radius: 17px;
  background: var(--app-surface);
  box-shadow: var(--app-shadow-xs);
  container-type: inline-size;
  overflow: hidden;

  @media (max-width: 520px) {
    padding: 13px;
    border-radius: 14px;
  }

  @container (max-width: 430px) {
    padding: 12px;
  }
`;

export const PanelHeader = styled.div<{ $compact?: boolean }>`
  display: flex;
  align-items: center;
  gap: 11px;
  min-width: 0;
  margin-bottom: ${({ $compact }) => ($compact ? "14px" : "17px")};
`;

export const PanelHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  flex: 1;
`;

export const PanelTitle = styled.h3`
  margin: 0;
  color: var(--app-ink);
  font-size: 0.98rem;
  font-weight: 850;
  letter-spacing: -0.02em;
`;

export const PanelDescription = styled.p`
  margin: 0;
  color: var(--app-muted);
  font-size: 0.77rem;
  line-height: 1.45;
`;

export const PanelIcon = styled.div<{ $soft?: boolean }>`
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 43px;
  height: 43px;
  border-radius: 13px;
  background: ${({ $soft }) =>
    $soft ? "var(--app-accent-soft)" : "var(--app-primary-soft)"};
  color: var(--app-primary);
  font-size: 1.12rem;
`;

export const PreferenceRow = styled.div`
  display: grid;
  grid-template-columns: 43px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 11px;
  padding: 15px 12px;
  border: 1px solid var(--app-border);
  border-radius: 14px;
  background: var(--app-paper);

  @container (max-width: 600px) {
    grid-template-columns: 40px minmax(0, 1fr) 48px;
    column-gap: 10px;
    row-gap: 9px;
    padding: 13px 11px;

    > :nth-child(1) {
      grid-column: 1;
      grid-row: 1 / 3;
      align-self: start;
      margin-top: 2px;
    }

    > :nth-child(2) {
      grid-column: 2 / 4;
      grid-row: 1;
      min-width: 0;
    }

    > :nth-child(3) {
      grid-column: 2;
      grid-row: 2;
      justify-self: start;
      align-self: center;
    }

    > :nth-child(4) {
      grid-column: 3;
      grid-row: 2;
      justify-self: end;
      align-self: center;
    }
  }

  @container (max-width: 360px) {
    grid-template-columns: 36px minmax(0, 1fr) 48px;
    gap: 8px;
    padding: 11px 9px;
  }
`;

export const PreferenceCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;

  > * {
    max-width: 100%;
    overflow-wrap: break-word;
  }
`;

export const PreferenceLabel = styled.strong`
  color: var(--app-ink);
  font-size: 0.9rem;
  font-weight: 850;
  line-height: 1.3;
  overflow-wrap: break-word;
`;

export const PreferenceDescription = styled.span`
  color: var(--app-muted);
  font-size: 0.78rem;
  line-height: 1.5;
  overflow-wrap: break-word;
  @media (max-width: 500px) {
    display: none;
  }
`;

export const StatusBadge = styled.div<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 30px;
  background: ${({ $active }) =>
    $active ? "var(--app-success-soft)" : "var(--app-warning-soft)"};
  color: ${({ $active }) =>
    $active ? "var(--app-success)" : "var(--app-warning)"};
  font-size: 0.69rem;
  font-weight: 800;
  white-space: nowrap;

  span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: currentColor;
  }
`;

export const Toggle = styled.button<{ $enabled: boolean }>`
  position: relative;
  display: block;
  appearance: none;
  /* Tamaño fijo en cualquier resolución */
  box-sizing: border-box;
  flex: 0 0 48px;
  width: 48px;
  min-width: 48px !important;
  max-width: 48px !important;
  height: 27px;
  min-height: 27px !important;
  max-height: 27px !important;

  padding: 0;
  border: 0;
  border-radius: 30px;

  background: ${({ $enabled }) =>
    $enabled ? "var(--app-accent)" : "var(--app-border-strong)"};

  cursor: pointer;
  transition: background 250ms ease;

  i {
    position: absolute;
    top: 3px;
    left: ${({ $enabled }) => ($enabled ? "24px" : "3px")};

    width: 21px;
    height: 21px;
    min-width: 21px;
    min-height: 21px;

    border-radius: 50%;
    background: var(--app-white);
    box-shadow: var(--app-shadow-xs);

    transition: left 250ms ease;
  }

  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }

  &:focus-visible {
    outline: 3px solid var(--app-accent-soft);
    outline-offset: 3px;
  }
`;

export const IngredientTrigger = styled.button`
  display: grid;
  grid-template-columns: 43px minmax(0, 1fr) auto 16px;
  align-items: center;
  gap: 11px;
  width: 100%;
  margin-top: 9px;
  padding: 14px 12px;
  border: 1px solid var(--app-border);
  border-radius: 14px;
  background: var(--app-paper);
  text-align: left;
  cursor: pointer;
  transition:
    border-color var(--app-transition),
    background var(--app-transition);

  &:hover {
    border-color: var(--app-accent);
    background: var(--app-surface-soft);
  }
  .chevron {
    color: var(--app-primary);
    transition: transform var(--app-transition);
  }
  &[aria-expanded="true"] .chevron {
    transform: rotate(90deg);
  }

  @media (max-width: 520px) {
    grid-template-columns: 36px minmax(0, 1fr) auto 16px;
    gap: 8px;
    padding: 12px 9px;
  }

  @container (max-width: 600px) {
    grid-template-columns: 36px minmax(0, 1fr) 16px;
    gap: 8px;
    padding: 11px 9px;

    > :nth-child(3) {
      grid-column: 2;
      grid-row: 2;
      justify-self: start;
    }

    > :nth-child(4) {
      grid-column: 3;
      grid-row: 1;
      justify-self: end;
    }
  }

  @container (max-width: 390px) {
    grid-template-columns: 32px minmax(0, 1fr) 14px;
    gap: 7px;
    padding: 10px 8px;
  }
`;

export const IngredientCount = styled.span`
  padding: 6px 9px;
  border-radius: 30px;
  background: var(--app-accent-soft);
  color: var(--app-primary);
  font-size: 0.68rem;
  font-weight: 850;
  white-space: nowrap;
`;

export const IngredientList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 11px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
  @container (max-width: 430px) {
    grid-template-columns: 1fr;
  }
`;

export const IngredientItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;
  padding: 10px 11px;
  border: 1px solid var(--app-border);
  border-radius: 11px;
  background: var(--app-surface-soft);
  overflow-wrap: anywhere;

  @container (max-width: 430px) {
    gap: 8px;
    padding: 9px;
  }
`;

export const IngredientInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;

  strong {
    overflow: hidden;
    color: var(--app-ink);
    font-size: 0.78rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const IngredientStatus = styled.span<{ $available: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ $available }) =>
    $available ? "var(--app-success)" : "var(--app-warning)"};
  font-size: 0.67rem;
  font-weight: 750;

  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

export const MetricsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;

  ${PanelHeader} {
    margin: 0;
  }
  @media (max-width: 580px) {
    align-items: stretch;
    flex-direction: column;
  }
  @container (max-width: 430px) {
    align-items: stretch;
    flex-direction: column;
    gap: 10px;
  }
`;

export const PeriodSelect = styled.select`
  min-width: 145px;
  height: 39px;
  padding: 0 11px;
  border: 1px solid var(--app-border);
  border-radius: 10px;
  background: var(--app-surface);
  color: var(--app-ink);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 750;
  cursor: pointer;
  &:focus {
    outline: 2px solid var(--app-accent-soft);
    border-color: var(--app-accent);
  }
  @media (max-width: 580px) {
    width: 100%;
    min-width: 0;
  }
  @container (max-width: 430px) {
    width: 100%;
    min-width: 0;
  }
`;

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: stretch;
  gap: 10px;

  @media (max-width: 1250px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 520px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  @media (max-width: 320px) {
    grid-template-columns: 1fr;
  }

  @container (max-width: 500px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  @container (max-width: 285px) {
    grid-template-columns: 1fr;
  }
`;

export const MetricCard = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-width: 0;
  min-height: 154px;
  padding: 15px 10px;
  border: 1px solid var(--app-border);
  border-radius: 14px;
  background: var(--app-paper);
  text-align: center;

  > * {
    min-width: 0;
    max-width: 100%;
  }

  @container (max-width: 430px) {
    min-height: 145px;
    padding: 12px 8px;
    gap: 8px;
  }
`;

export const MetricIcon = styled.div`
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 36px;
  height: 36px;
  border-radius: 11px;
  background: var(--app-accent-soft);
  color: var(--app-primary);
  font-size: 1rem;
`;

export const MetricLabel = styled.span`
  color: var(--app-muted-dark);
  font-size: 0.78rem;
  font-weight: 800;
  line-height: 1.3;
  text-align: center;
  overflow-wrap: break-word;
`;

export const MetricValue = styled.strong`
  display: block;
  max-width: 100%;
  color: var(--app-ink);
  font-size: clamp(1.15rem, 2vw, 1.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.15;
  text-align: center;
  white-space: nowrap;
`;

export const MetricFootnote = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  width: 100%;
  min-height: 20px;
  color: var(--app-muted);
  font-size: 0.67rem;
  font-weight: 700;
  line-height: 1.35;
  text-align: center;

  svg {
    flex: 0 0 auto;
    font-size: 0.68rem;
  }
`;

export const LowerGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: 15px;
  align-items: stretch;
  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
  }
  @media (max-width: 600px) {
    gap: 11px;
  }
  @container (max-width: 850px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const ActivityPanel = styled(Panel)`
  min-width: 0;
`;

export const ActivityHeaderAction = styled.button`
  flex: 0 0 auto;
  padding: 7px 11px;
  border: 0;
  border-radius: 30px;
  background: var(--app-accent-soft);
  color: var(--app-primary);
  font: inherit;
  font-size: 0.7rem;
  font-weight: 850;
  cursor: pointer;
  &:hover {
    background: var(--app-primary-soft);
  }
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const ActivityEntry = styled.div`
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid var(--app-border);

  &:first-child {
    border-top: 0;
    padding-top: 0;
  }
  @media (max-width: 550px) {
    grid-template-columns: 34px minmax(0, 1fr);
    gap: 8px;
  }

  @container (max-width: 430px) {
    grid-template-columns: 32px minmax(0, 1fr);
    gap: 7px;
  }
`;

export const ActivityAvatar = styled.div<{ $variant?: number }>`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $variant }) =>
    $variant === 1
      ? "var(--app-danger-soft)"
      : $variant === 2
        ? "var(--app-info-soft)"
        : "var(--app-accent-soft)"};
  color: ${({ $variant }) =>
    $variant === 1
      ? "var(--app-danger)"
      : $variant === 2
        ? "var(--app-info)"
        : "var(--app-primary)"};
  font-size: 0.9rem;
  font-weight: 850;
`;

export const ActivityInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  strong {
    color: var(--app-ink);
    font-size: 0.76rem;
    font-weight: 850;
  }
  span {
    overflow: hidden;
    color: var(--app-muted-dark);
    font-size: 0.73rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const ActivityDate = styled.time`
  color: var(--app-muted-dark);
  font-size: 0.7rem;
  white-space: nowrap;
  @media (max-width: 550px) {
    grid-column: 2;
  }
  @container (max-width: 430px) {
    grid-column: 2;
    white-space: normal;
  }
`;

export const ChartPanel = styled(Panel)`
  min-width: 0;
`;

export const ChartLegend = styled.div`
  margin: -5px 0 8px 2px;
  color: var(--app-muted);
  font-size: 0.68rem;
  font-weight: 700;
`;

export const Chart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  gap: 9px;
  height: 215px;
  min-width: 0;
  padding: 12px 3px 0;
  border-bottom: 1px solid var(--app-border);
  background: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent 27px,
    var(--app-border) 28px,
    transparent 29px
  );

  @media (max-width: 520px) {
    gap: 5px;
    height: 190px;
  }
  @container (max-width: 430px) {
    gap: 4px;
    height: 180px;
  }
`;

export const ChartColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  min-width: 0;
  height: 100%;
  flex-direction: column;
  gap: 7px;
`;

export const ChartValue = styled.span`
  min-height: 14px;
  max-width: 100%;
  overflow: hidden;
  color: var(--app-muted-dark);
  font-size: 0.58rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ChartBar = styled.i<{ $height: number; $highlight: boolean }>`
  display: block;
  width: min(68%, 35px);
  height: ${({ $height }) => $height}%;
  min-height: ${({ $height }) => ($height > 0 ? "3px" : "0")};
  border-radius: 6px 6px 2px 2px;
  background: ${({ $highlight }) =>
    $highlight
      ? "linear-gradient(180deg, var(--app-accent), var(--app-primary))"
      : "var(--app-primary-soft)"};
  transition: height var(--app-transition);
`;

export const ChartLabel = styled.span`
  color: var(--app-muted-dark);
  font-size: 0.68rem;
  font-weight: 750;
  display: block;
  max-width: 100%;
  text-align: center;
  overflow-wrap: anywhere;
  line-height: 1.25;
`;

export const SummaryStrip = styled.section`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: stretch;
  gap: 12px;
  padding: 16px;
  border: 1px solid var(--app-border);
  border-radius: 14px;
  background: var(--app-surface-soft);

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 10px;
  }

  @media (max-width: 340px) {
    grid-template-columns: 1fr;
  }

  @container (max-width: 500px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 10px;
  }

  @container (max-width: 285px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 0;
  padding: 3px 5px;
  text-align: center;

  span {
    color: var(--app-muted);
    font-size: 0.7rem;
    font-weight: 750;
    line-height: 1.35;
  }

  strong {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;
    max-width: 100%;
    color: var(--app-ink);
    font-size: 0.84rem;
    font-weight: 850;
    line-height: 1.35;
    overflow-wrap: anywhere;
    text-align: center;
  }

  svg {
    flex: 0 0 auto;
    color: var(--app-accent);
    font-size: 0.75rem;
  }
`;

export const SecondaryGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;
  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
  }
  @container (max-width: 650px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

export const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const RankingItem = styled.div`
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  min-width: 0;
  padding: 10px 0;
  border-top: 1px solid var(--app-border);
  &:first-child {
    border-top: 0;
  }

  @media (max-width: 480px) {
    grid-template-columns: 26px minmax(0, 1fr);
    gap: 8px;
  }

  @container (max-width: 430px) {
    grid-template-columns: 26px minmax(0, 1fr);
    gap: 8px;
  }
`;

export const RankingPosition = styled.b`
  display: grid;
  place-items: center;
  width: 27px;
  height: 27px;
  border-radius: 9px;
  background: var(--app-accent-soft);
  color: var(--app-primary);
  font-size: 0.73rem;
`;

export const RankingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
  strong {
    overflow: hidden;
    color: var(--app-ink);
    font-size: 0.77rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span {
    color: var(--app-muted);
    font-size: 0.68rem;
    overflow-wrap: anywhere;
  }
`;

export const RankingValue = styled.strong`
  color: var(--app-primary);
  font-size: 0.74rem;
  white-space: nowrap;

  @media (max-width: 480px) {
    grid-column: 2;
    justify-self: start;
  }
  @container (max-width: 430px) {
    grid-column: 2;
    justify-self: start;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  min-height: 125px;
  padding: 18px;
  text-align: center;
  border: 1px dashed var(--app-border);
  border-radius: 12px;
  background: var(--app-surface-soft);
  svg {
    color: var(--app-muted);
    font-size: 21px;
  }
  strong {
    color: var(--app-ink);
    font-size: 0.8rem;
  }
  span {
    max-width: 290px;
    color: var(--app-muted);
    font-size: 0.71rem;
    line-height: 1.45;
  }
`;

export const LoadingState = styled.p`
  margin: 9px 0 0;
  color: var(--app-muted);
  font-size: 0.73rem;
  line-height: 1.45;
`;

export const ErrorMessage = styled.div`
  padding: 11px 13px;
  border: 1px solid var(--app-border);
  border-radius: 10px;
  background: var(--app-warning-soft);
  color: var(--app-ink);
  font-size: 0.78rem;
  line-height: 1.45;
`;

export const ModalActivityContent = styled.div`
  width: 100%;
  max-height: 65vh;
  overflow-y: auto;
  padding-right: 5px;
  min-width: 0;
  overscroll-behavior: contain;

  @media (max-width: 520px) {
    max-height: 60dvh;
    padding-right: 2px;
  }
`;

export const AcceptIngredientsButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 44px;
  padding: 9px 18px;
  border: 1px solid var(--app-primary);
  border-radius: 10px;
  background: var(--app-primary);
  color: var(--app-white);
  font: inherit;
  font-size: 0.84rem;
  font-weight: 800;
  cursor: pointer;
  transition:
    background var(--app-transition),
    transform var(--app-transition),
    opacity var(--app-transition);

  &:hover:not(:disabled) {
    background: var(--app-primary-hover);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  &:focus-visible {
    outline: 3px solid var(--app-accent-soft);
    outline-offset: 3px;
  }

  @media (max-width: 520px) {
    width: 100%;
    min-height: 42px;
    padding: 9px 12px;
  }

  svg {
    font-size: 0.9rem;
  }
`;
