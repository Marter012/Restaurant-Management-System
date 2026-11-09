import styled from "styled-components";

type ActivityTone = "orders" | "cash" | "promotions" | "products" | "default";

export const DashboardHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 22px;
  padding: 4px 2px 18px;
  color: var(--color-text);
  font-family: var(--font-family-base);

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
  color: var(--color-accent);
  font-size: 0.68rem;
  font-weight: 800;
  letter-spacing: 0.13em;
`;

export const HeaderTitle = styled.h1`
  margin: 0;
  color: var(--color-text);
  font-family: var(--font-family-heading);
  font-size: clamp(1.65rem, 2.5vw, 2.15rem);
  font-weight: 850;
  letter-spacing: -0.045em;
  line-height: 1.12;
`;

export const HeaderSubtitle = styled.p`
  margin: 6px 0 0;
  color: var(--color-text-muted);
  font-size: 0.88rem;
  line-height: 1.45;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: auto;
  min-width: 0;
  @media (max-width: 760px) {
    justify-content: flex-start;
  }
`;

export const HeaderTools = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  width: auto;
  min-width: 0;
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
      margin-left: auto;
    }
  }
`;

export const DatePill = styled.div`
  min-height: 42px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 13px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
  font-size: 0.76rem;
  white-space: nowrap;

  svg {
    color: var(--color-accent);
    font-size: 0.95rem;
  }

  strong {
    padding-left: 9px;
    border-left: 1px solid var(--color-border);
    color: var(--color-primary);
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
  width: auto;
  min-width: 0;
  max-width: 220px;
  padding: 5px 7px 5px 6px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);

  transition:
    border-color var(--transition-normal),
    background-color var(--transition-normal),
    box-shadow var(--transition-normal);

  &:hover {
    border-color: var(--color-border-strong);
    background: var(--color-surface-muted);
    box-shadow: var(--shadow-md);
  }

  &:hover .buttonExit {
    background-color: var(--color-danger-soft);
    color: var(--color-danger);
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
  background: var(--color-primary-soft);
  color: var(--color-primary);
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
    color: var(--color-text);
    font-size: 0.76rem;
    font-weight: 800;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    color: var(--color-text-muted);
    font-size: 0.67rem;
  }
`;

export const LogoutButton = styled.button`
  display: grid;
  place-items: center;
  flex: 0 0 32px;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: var(--radius-sm);
  background: transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    background-color var(--transition-normal),
    color var(--transition-normal);

  &:hover {
    background: var(--color-danger-soft);
    color: var(--color-danger);
  }

  &:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }
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
  border: 1px solid color-mix(in srgb, var(--color-primary) 12%, transparent);
  border-radius: var(--radius-lg);
  background-color: var(--color-primary);
  background-image:
    linear-gradient(
      90deg,
      var(--color-primary) 0%,
      color-mix(in srgb, var(--color-primary) 97%, transparent) 37%,
      color-mix(in srgb, var(--color-primary) 68%, transparent) 59%,
      color-mix(in srgb, var(--color-primary) 4%, transparent) 100%
    ),
    url(${({ $image }) => $image});
  background-position:
    center,
    right center;
  background-repeat: no-repeat;
  background-size:
    cover,
    auto 100%;
  box-shadow: var(--shadow-md);

  &::after {
    content: "";
    position: absolute;
    z-index: -1;
    width: 176px;
    height: 176px;
    right: 33%;
    top: -78px;
    border: 2px solid color-mix(in srgb, var(--color-white) 10%, transparent);
    border-radius: 50%;
    box-shadow: 0 0 0 18px color-mix(in srgb, var(--color-white) 3.5%, transparent);
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
  color: var(--color-white);

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
  color: var(--color-primary-soft);
  font-size: 0.64rem;
  font-weight: 850;
  letter-spacing: 0.16em;
`;

export const HeroTitle = styled.h2`
  margin: 0;
  color: var(--color-white);
  font-family: var(--font-family-heading);
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
  color: color-mix(in srgb, var(--color-white) 86%, transparent);
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
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
  transition:
    transform var(--transition-normal),
    box-shadow var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
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
  color: var(--color-text);
  font-size: 0.75rem;
  font-weight: 700;
`;

export const StatValue = styled.strong<{ $compact?: boolean }>`
  display: block;
  margin-top: 5px;
  color: var(--color-text);
  font-family: var(--font-family-heading);
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
  background: var(--color-surface-muted);
  color: var(--color-primary);
  font-size: 1.08rem;
`;

export const StatFootnote = styled.span`
  display: block;
  margin-top: 8px;
  color: var(--color-text-muted);
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
      ? "var(--color-success-soft)"
      : $status === "danger"
        ? "var(--color-danger-soft)"
        : "var(--color-warning-soft)"};
  color: ${({ $status }) =>
    $status === "success"
      ? "var(--color-success)"
      : $status === "danger"
        ? "var(--color-danger)"
        : "var(--color-warning)"};
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
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
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
  color: var(--color-text);
  font-family: var(--font-family-heading);
  font-size: 1rem;
  font-weight: 850;
  letter-spacing: -0.025em;
`;

export const PanelSubtitle = styled.p`
  margin: 5px 0 0;
  color: var(--color-text-muted);
  font-size: 0.72rem;
  line-height: 1.4;
`;

export const ChartLegend = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 9px;
  border-radius: 999px;
  background: var(--color-surface-muted);
  color: var(--color-text);
  font-size: 0.64rem;
  font-weight: 700;
  white-space: nowrap;

  i {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-primary);
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
  color: var(--color-text-muted);
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
  border-bottom: 1px solid var(--color-border);
`;

export const ChartGridLine = styled.i`
  position: absolute;
  left: 0;
  right: 0;
  z-index: 0;
  height: 1px;
  background: color-mix(in srgb, var(--color-border) 65%, transparent);

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
      ? "linear-gradient(180deg, var(--color-accent), var(--color-primary))"
      : "linear-gradient(180deg, var(--color-primary-soft), var(--color-accent))"};
  box-shadow: 0 3px 8px color-mix(in srgb, var(--color-text) 10%, transparent);
  transition:
    height 220ms ease,
    filter var(--transition-normal);
`;

export const ChartLabel = styled.span<{ $active?: boolean }>`
  position: absolute;
  bottom: 0;
  color: ${({ $active }) =>
    $active ? "var(--color-primary)" : "var(--color-text-muted)"};
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
  background: var(--color-primary);
  color: var(--color-white);
  font-size: 0.62rem;
  font-weight: 800;
  text-align: center;
  white-space: nowrap;
  box-shadow: var(--shadow-md);
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
  border-bottom: 1px solid color-mix(in srgb, var(--color-border) 62%, transparent);

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
      ? "var(--color-success-soft)"
      : $tone === "promotions"
        ? "var(--color-primary-soft)"
        : $tone === "products"
          ? "var(--color-warning-soft)"
          : "var(--color-surface-muted)"};
  color: ${({ $tone }) =>
    $tone === "cash" ? "var(--color-success)" : "var(--color-primary)"};
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
  color: var(--color-text);
  font-size: 0.76rem;
  font-weight: 800;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActivityDescription = styled.span`
  display: block;
  overflow: hidden;
  margin-top: 3px;
  color: var(--color-text-muted);
  font-size: 0.68rem;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ActivityTime = styled.time`
  color: var(--color-text-muted);
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
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font: inherit;
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
  transition:
    background var(--transition-normal),
    transform var(--transition-normal);

  &:hover {
    background: var(--color-primary-soft);
    transform: translateY(-1px);
  }
`;

export const QuickAccessSection = styled.section`
  width: 100%;
  padding: 17px 18px 18px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  background: var(--color-surface);
  box-shadow: var(--shadow-sm);
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
  color: var(--color-text);
  font-family: var(--font-family-heading);
  font-size: 1rem;
  font-weight: 850;

  svg {
    color: var(--color-primary);
    font-size: 1.22rem;
  }
`;

export const QuickAccessDescription = styled.p`
  margin: 5px 0 0 29px;
  color: var(--color-text-muted);
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
  border: 1px solid var(--color-border);
  border-radius: 13px;
  background: var(--color-surface);
  color: var(--color-primary);
  text-align: left;
  cursor: pointer;
  transition:
    transform var(--transition-normal),
    border-color var(--transition-normal),
    background var(--transition-normal),
    box-shadow var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-border-strong);
    background: var(--color-surface);
    box-shadow: var(--shadow-md);
  }

  &:focus-visible {
    outline: 3px solid color-mix(in srgb, var(--color-accent) 28%, transparent);
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
  background: var(--color-primary-soft);
  color: var(--color-primary);
  font-size: 1.08rem;
`;

export const QuickAccessText = styled.span`
  color: var(--color-text);
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
  border: 1px solid var(--color-border);
  border-left: 4px solid var(--color-accent);
  border-radius: var(--radius-md);
  background: var(--color-surface);

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
    color: var(--color-text);
    font-size: 0.78rem;
    font-weight: 850;
  }

  span {
    color: var(--color-text-muted);
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
  border: 1px solid var(--color-border);
  border-radius: 999px;
  background: var(--color-surface);
  color: var(--color-primary);
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
      $enabled ? "var(--color-success)" : "var(--color-border-strong)"};
    transition: background var(--transition-normal);
  }

  i::after {
    content: "";
    position: absolute;
    top: 3px;
    left: ${({ $enabled }) => ($enabled ? "18px" : "3px")};
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--color-white);
    transition: left var(--transition-normal);
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
  border-bottom: 1px solid var(--color-border);

  strong {
    color: var(--color-text);
    font-size: 0.77rem;
  }

  span {
    color: var(--color-text);
    font-size: 0.75rem;
    line-height: 1.4;
    overflow-wrap: anywhere;
  }

  time {
    color: var(--color-text-muted);
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
  color: var(--color-text-muted);
  font-size: 0.76rem;
  text-align: center;

  svg {
    color: var(--color-accent);
    font-size: 1.35rem;
  }
`;
