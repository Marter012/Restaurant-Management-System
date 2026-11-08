import styled from "styled-components";

type ActivityTone = "orders" | "cash" | "promotions" | "products" | "default";

export const DashboardHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 22px;
  padding: 4px 2px 18px;
  color: var(--app-ink);

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
  }
`;

export const HeaderLeft = styled.div`
  min-width: 0;
`;

export const HeaderEyebrow = styled.span`
  display: block;
  margin-bottom: 6px;
  color: var(--app-accent);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.13em;
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  color: var(--app-ink);
  font-family: var(--app-font-heading);
  font-size: clamp(1.65rem, 2.5vw, 2.15rem);
  font-weight: 850;
  letter-spacing: -0.045em;
  line-height: 1.12;
`;

export const HeaderSubtitle = styled.p`
  margin: 6px 0 0;
  color: var(--app-muted);
  font-size: 0.88rem;
  line-height: 1.45;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 50%;
  @media (max-width: 760px) {
    justify-content: flex-start;
  }
`;

export const HeaderTools = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  width: 50%;
  /* TABLET: reserva espacio para fecha/turno y perfil sin comprimir el banner. */
  @media (min-width: 621px) and (max-width: 1024px) {
    width: auto;
    min-width: 0;
    flex: 0 1 390px;
    gap: 8px;
  }

  @media (max-width: 750px) {
    display: flex;
    justify-content: center;
    align-items: center;
    & > :first-child {
      display: none;
    }
  }

  /* MÓVIL: el CashStatus principal ya está en el navbar.
     Se oculta únicamente esta segunda instancia dentro del banner. */
  @media (max-width: 620px) {
    width: 100%;
    min-width: 0;
    justify-content: center;
    flex-wrap: nowrap;
    margin-top: 12px;

    & > :first-child {
      display: none;
    }

    & > :last-child {
      width: min(200px, 100%) !important;
      margin-left: 0 auto;
    }
  }
`;

export const DatePill = styled.div`
  min-height: 42px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 13px;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius);
  background: var(--app-surface);
  color: var(--app-muted-dark);
  box-shadow: var(--app-shadow-xs);
  font-size: 0.76rem;
  white-space: nowrap;

  svg {
    color: var(--app-accent);
    font-size: 0.95rem;
  }

  strong {
    padding-left: 9px;
    border-left: 1px solid var(--app-border);
    color: var(--app-primary);
    font-size: 0.82rem;
    font-weight: 850;
  }

  @media (max-width: 420px) {
    flex: 1;
    justify-content: center;
    min-width: 0;
    font-size: 0.7rem;
    gap: 6px;
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  width: 200px !important;
  padding: 5px 7px 5px 6px;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius);
  background: var(--app-surface);
  box-shadow: var(--app-shadow-xs);

  &:hover {
    background: var(--app-danger-soft);
    color: var(--app-danger);
  }
  &:hover .buttonExit{
    background-color: #db3030;
    color: var(--app-surface);
  }
  cursor: pointer;
`;

export const ProfileAvatar = styled.div`
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--app-accent-soft);
  color: var(--app-primary);
  font-size: 0.84rem;
  font-weight: 850;
`;

export const ProfileText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  strong {
    max-width: 124px;
    overflow: hidden;
    color: var(--app-ink);
    font-size: 0.76rem;
    font-weight: 800;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    color: var(--app-muted);
    font-size: 0.67rem;
  }
`;

export const LogoutButton = styled.button`
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: var(--app-muted-dark);
  cursor: pointer;
  transition:
    background var(--app-transition),
    color var(--app-transition);

  
`;

export const HeroBanner = styled.section<{ $image: string }>`
  position: relative;
  isolation: isolate;
  min-height: 132px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 22px clamp(20px, 3vw, 34px);
  border: 1px solid rgba(var(--app-primary-rgb), 0.12);
  border-radius: var(--app-radius-xl);
  background-color: var(--app-primary);
  background-image:
    linear-gradient(
      90deg,
      var(--app-primary) 0%,
      rgba(var(--app-primary-rgb), 0.97) 37%,
      rgba(var(--app-primary-rgb), 0.68) 59%,
      rgba(var(--app-primary-rgb), 0.04) 100%
    ),
    url(${({ $image }) => $image});
  background-position:
    center,
    right center;
  background-repeat: no-repeat;
  background-size:
    cover,
    auto 100%;
  box-shadow: var(--app-shadow-sm);

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 176px;
    height: 176px;
    right: 33%;
    top: -78px;
    border: 2px solid rgba(var(--app-white-rgb), 0.1);
    border-radius: 50%;
    box-shadow: 0 0 0 18px rgba(var(--app-white-rgb), 0.035);
  }

  /* TABLET: permite que el texto y las herramientas compartan el banner
     sin que uno comprima o se superponga con el otro. */
  @media (min-width: 621px) and (max-width: 1024px) {
    min-height: 150px;
    gap: 14px;
    padding: 18px 20px;
  }

  /* MÓVIL: texto arriba y perfil debajo, sin superposiciones. */
  @media (max-width: 620px) {
    min-height: 150px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  max-width: min(700px, 72%);
  color: var(--app-white);

  @media (max-width: 1024px) {
    max-width: min(100%, 440px);
    flex: 1 1 340px;
  }

  @media (max-width: 620px) {
    width: 100%;
    flex: 0 0 auto;
    text-align: center;
    margin: 0 auto;
    & > :first-child,
    & > :nth-child(3) {
      display: none;
    }
  }
`;

export const HeroEyebrow = styled.span`
  display: block;
  margin-bottom: 7px;
  color: var(--app-accent-soft);
  font-size: 0.64rem;
  font-weight: 850;
  letter-spacing: 0.16em;
`;

export const HeroTitle = styled.h2`
  margin: 0;
  color: var(--app-white);
  font-family: var(--app-font-heading);
  font-size: clamp(1.3rem, 2.5vw, 1.85rem);
  font-weight: 850;
  letter-spacing: -0.04em;
  line-height: 1.18;

  span {
    display: inline-block;
    margin-left: 3px;
  }

  @media (max-width: 620px) {
    font-size: clamp(1.35rem, 5.5vw, 1.65rem);
    line-height: 1.16;
  }
`;

export const HeroDescription = styled.p`
  margin: 7px 0 0;
  color: rgba(var(--app-white-rgb), 0.86);
  font-size: 0.83rem;
  line-height: 1.45;

  @media (max-width: 620px) {
    margin-top: 8px;
    font-size: 0.82rem;
    line-height: 1.45;
    max-width: 34ch;
  }
`;

export const StatsGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 13px;
  width: 100%;

  @media (max-width: 1180px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 740px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

export const StatCard = styled.article`
  min-width: 0;
  padding: 15px 16px 14px;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-lg);
  background: var(--app-surface);
  box-shadow: var(--app-shadow-xs);
  transition:
    transform var(--app-transition),
    box-shadow var(--app-transition);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--app-shadow-sm);
  }

  @media (max-width: 620px) {
    padding: 15px;
  }
`;

export const StatTopline = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 9px;
`;

export const StatLabel = styled.span`
  min-width: 0;
  color: var(--app-muted-dark);
  font-size: 0.75rem;
  font-weight: 700;
`;

export const StatValue = styled.strong<{ $compact?: boolean }>`
  display: block;
  margin-top: 5px;
  color: var(--app-ink);
  font-family: var(--app-font-heading);
  font-size: ${({ $compact }) =>
    $compact ? "1.08rem" : "clamp(1.2rem, 1.8vw, 1.55rem)"};
  font-weight: 850;
  letter-spacing: -0.045em;
  line-height: 1.2;
  overflow-wrap: anywhere;
`;

export const StatIcon = styled.div`
  width: 39px;
  height: 39px;
  flex: 0 0 39px;
  display: grid;
  place-items: center;
  border-radius: 13px;
  background: var(--app-surface-soft);
  color: var(--app-primary);
  font-size: 1.08rem;
`;

export const StatFootnote = styled.span`
  display: block;
  margin-top: 8px;
  color: var(--app-muted);
  font-size: 0.67rem;
  line-height: 1.3;
`;

export const StatusPill = styled.span<{
  $status: "success" | "warning" | "danger";
}>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  max-width: 100%;
  margin-top: 8px;
  padding: 5px 9px;
  border-radius: 999px;
  background: ${({ $status }) =>
    $status === "success"
      ? "var(--app-success-soft)"
      : $status === "danger"
        ? "var(--app-danger-soft)"
        : "var(--app-warning-soft)"};
  color: ${({ $status }) =>
    $status === "success"
      ? "var(--app-success)"
      : $status === "danger"
        ? "var(--app-danger)"
        : "var(--app-warning)"};
  font-size: 0.66rem;
  font-weight: 800;
  overflow-wrap: anywhere;

  i {
    width: 7px;
    height: 7px;
    flex: 0 0 7px;
    border-radius: 50%;
    background: currentColor;
  }
`;

export const MainGrid = styled.section`
  display: grid;
  grid-template-columns: minmax(0, 1.22fr) minmax(330px, 0.88fr);
  gap: 15px;
  width: 100%;

  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
  }
`;

export const Panel = styled.article`
  min-width: 0;
  padding: 18px 19px 16px;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-lg);
  background: var(--app-surface);
  box-shadow: var(--app-shadow-xs);
`;

export const ActivityPanel = styled(Panel)`
  padding-bottom: 10px;
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
`;

export const PanelHeading = styled.div`
  min-width: 0;
`;

export const PanelTitle = styled.h2`
  margin: 0;
  color: var(--app-ink);
  font-family: var(--app-font-heading);
  font-size: 1rem;
  font-weight: 850;
  letter-spacing: -0.025em;
`;

export const PanelSubtitle = styled.p`
  margin: 5px 0 0;
  color: var(--app-muted);
  font-size: 0.72rem;
  line-height: 1.4;
`;

export const ChartLegend = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  border-radius: 999px;
  background: var(--app-surface-soft);
  color: var(--app-muted-dark);
  font-size: 0.64rem;
  font-weight: 700;
  white-space: nowrap;

  i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--app-primary);
  }

  @media (max-width: 520px) {
    display: none;
  }
`;

export const SalesChart = styled.div`
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr);
  gap: 10px;
  height: 224px;
  margin-top: 19px;

  @media (max-width: 520px) {
    grid-template-columns: 43px minmax(0, 1fr);
    gap: 6px;
    height: 190px;
  }

  @media (max-width: 380px) {
    grid-template-columns: 36px minmax(0, 1fr);
    gap: 4px;
    height: 175px;
  }
`;

export const ChartYAxis = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0 0 25px;
  color: var(--app-muted);
  font-size: 0.64rem;
  text-align: right;

  span {
    line-height: 1;
  }
`;

export const ChartPlot = styled.div`
  position: relative;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  gap: 9px;
  min-width: 0;
  padding: 0 4px 25px;
  border-bottom: 1px solid var(--app-border);
`;

export const ChartGridLine = styled.i`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 0;
  height: 1px;
  background: rgba(var(--app-border-rgb), 0.65);

  &:nth-child(1) {
    top: 0;
  }
  &:nth-child(2) {
    top: 25%;
  }
  &:nth-child(3) {
    top: 50%;
  }
  &:nth-child(4) {
    top: 75%;
  }
  &:nth-child(5) {
    top: 100%;
  }
`;

export const ChartColumn = styled.div<{ $active?: boolean }>`
  position: relative;
  z-index: 1;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  min-width: 0;
  gap: 7px;
`;

export const ChartBar = styled.i<{ $height: number; $active?: boolean }>`
  display: block;
  width: min(68%, 44px);
  height: ${({ $height }) => $height}%;
  min-height: 3px;
  border-radius: 8px 8px 3px 3px;
  background: ${({ $active }) =>
    $active
      ? "linear-gradient(180deg, var(--app-accent), var(--app-primary))"
      : "linear-gradient(180deg, var(--app-accent-soft), var(--app-accent))"};
  box-shadow: 0 3px 8px rgba(var(--app-shadow-rgb), 0.1);
  transition:
    height 220ms ease,
    filter var(--app-transition);
`;

export const ChartLabel = styled.span<{ $active?: boolean }>`
  position: absolute;
  bottom: 0;
  color: ${({ $active }) =>
    $active ? "var(--app-primary)" : "var(--app-muted)"};
  font-size: 0.68rem;
  font-weight: ${({ $active }) => ($active ? 850 : 600)};
  text-transform: capitalize;
`;

export const ChartTooltip = styled.span`
  position: absolute;
  bottom: calc(100% + 5px);
  z-index: 2;
  max-width: 126px;
  padding: 5px 7px;
  border-radius: 8px;
  background: var(--app-primary);
  color: var(--app-white);
  font-size: 0.62rem;
  font-weight: 800;
  text-align: center;
  white-space: nowrap;
  box-shadow: var(--app-shadow-sm);
`;

export const ActivityList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 13px;

  @media (max-width: 520px) {
    margin-top: 10px;
  }
`;

export const ActivityItem = styled.div`
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) auto;
  align-items: center;
  gap: 10px;
  min-width: 0;
  padding: 10px 0;
  border-bottom: 1px solid rgba(var(--app-border-rgb), 0.62);

  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: 520px) {
    grid-template-columns: 34px minmax(0, 1fr) auto;
    gap: 8px;
  }
`;

export const ActivityIcon = styled.div<{ $tone: ActivityTone }>`
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: ${({ $tone }) =>
    $tone === "cash"
      ? "var(--app-success-soft)"
      : $tone === "promotions"
        ? "var(--app-accent-soft)"
        : $tone === "products"
          ? "var(--app-warning-soft)"
          : "var(--app-surface-soft)"};
  color: ${({ $tone }) =>
    $tone === "cash" ? "var(--app-success)" : "var(--app-primary)"};
  font-size: 1rem;

  @media (max-width: 520px) {
    width: 34px;
    height: 34px;
  }
`;

export const ActivityCopy = styled.div`
  min-width: 0;
`;

export const ActivityTitle = styled.strong`
  display: block;
  overflow: hidden;
  color: var(--app-ink);
  font-size: 0.76rem;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActivityDescription = styled.span`
  display: block;
  overflow: hidden;
  margin-top: 3px;
  color: var(--app-muted);
  font-size: 0.68rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActivityTime = styled.time`
  color: var(--app-muted);
  font-size: 0.66rem;
  white-space: nowrap;

  @media (max-width: 380px) {
    font-size: 0.6rem;
  }
`;

export const ViewAllButton = styled.button`
  flex: 0 0 auto;
  padding: 7px 11px;
  border: 1px solid transparent;
  border-radius: 10px;
  background: var(--app-accent-soft);
  color: var(--app-primary);
  font: inherit;
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
  transition:
    background var(--app-transition),
    transform var(--app-transition);

  &:hover {
    background: var(--app-primary-soft);
    transform: translateY(-1px);
  }
`;

export const QuickAccessSection = styled.section`
  width: 100%;
  padding: 17px 18px 18px;
  border: 1px solid var(--app-border);
  border-radius: var(--app-radius-lg);
  background: var(--app-surface);
  box-shadow: var(--app-shadow-xs);
`;

export const QuickAccessHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

export const QuickAccessTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0;
  color: var(--app-ink);
  font-family: var(--app-font-heading);
  font-size: 1rem;
  font-weight: 850;

  svg {
    color: var(--app-primary);
    font-size: 1.22rem;
  }
`;

export const QuickAccessDescription = styled.p`
  margin: 5px 0 0 29px;
  color: var(--app-muted);
  font-size: 0.72rem;
`;

export const QuickAccessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 10px;
  margin-top: 13px;

  @media (max-width: 1120px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 620px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
  }

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;

export const QuickAccessButton = styled.button`
  min-width: 0;
  min-height: 62px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border: 1px solid var(--app-border);
  border-radius: 13px;
  background: var(--app-paper);
  color: var(--app-primary);
  text-align: left;
  cursor: pointer;
  transition:
    transform var(--app-transition),
    border-color var(--app-transition),
    background var(--app-transition),
    box-shadow var(--app-transition);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--app-border-strong);
    background: var(--app-surface);
    box-shadow: var(--app-shadow-sm);
  }

  &:focus-visible {
    outline: 3px solid rgba(var(--app-accent-rgb), 0.28);
    outline-offset: 2px;
  }
`;

export const QuickAccessIcon = styled.span`
  width: 38px;
  height: 38px;
  flex: 0 0 38px;
  display: grid;
  place-items: center;
  border-radius: 11px;
  background: var(--app-accent-soft);
  color: var(--app-primary);
  font-size: 1.08rem;
`;

export const QuickAccessText = styled.span`
  color: var(--app-ink);
  font-size: 0.72rem;
  font-weight: 800;
  line-height: 1.3;
`;

export const AdminPreference = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 13px 16px;
  border: 1px solid var(--app-border);
  border-left: 4px solid var(--app-accent);
  border-radius: var(--app-radius);
  background: var(--app-surface);

  @media (max-width: 560px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const AdminPreferenceCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;

  strong {
    color: var(--app-ink);
    font-size: 0.78rem;
    font-weight: 850;
  }

  span {
    color: var(--app-muted);
    font-size: 0.7rem;
    line-height: 1.45;
  }
`;

export const SettingControl = styled.button<{ $enabled: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 142px;
  padding: 8px 10px;
  border: 1px solid var(--app-border);
  border-radius: 999px;
  background: var(--app-paper);
  color: var(--app-primary);
  font: inherit;
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;

  i {
    position: relative;
    width: 34px;
    height: 19px;
    flex: 0 0 34px;
    border-radius: 999px;
    background: ${({ $enabled }) =>
      $enabled ? "var(--app-success)" : "var(--app-border-strong)"};
    transition: background var(--app-transition);
  }

  i::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ $enabled }) => ($enabled ? "18px" : "3px")};
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--app-white);
    transition: left var(--app-transition);
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

export const ActivityModalContent = styled.div`
  width: 100%;
  max-height: min(68dvh, 620px);
  overflow: auto;
  padding-right: 3px;
`;

export const ActivityListModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const ActivityRow = styled.div`
  display: grid;
  grid-template-columns: minmax(90px, 0.65fr) minmax(0, 2fr) auto;
  align-items: center;
  gap: 12px;
  padding: 13px 5px;
  border-bottom: 1px solid var(--app-border);

  strong {
    color: var(--app-ink);
    font-size: 0.77rem;
  }

  span {
    color: var(--app-muted-dark);
    font-size: 0.75rem;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  time {
    color: var(--app-muted);
    font-size: 0.68rem;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr auto;
    gap: 5px 10px;

    span {
      grid-column: 1 / -1;
      grid-row: 2;
    }
  }
`;

export const EmptyState = styled.div`
  min-height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 9px;
  padding: 18px;
  color: var(--app-muted);
  font-size: 0.76rem;
  text-align: center;

  svg {
    color: var(--app-accent);
    font-size: 1.35rem;
  }
`;
