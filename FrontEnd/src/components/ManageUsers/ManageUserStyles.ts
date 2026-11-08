import styled, { css } from "styled-components";

/* =========================================================
   PÁGINA Y DISTRIBUCIÓN PRINCIPAL
   ========================================================= */

export const ManageUserPage = styled.div`
  width: 100%;
  min-width: 0;
  color: var(--app-ink);
  overflow: visible;

  &, & * {
    box-sizing: border-box;
  }
`;

export const MainLayout = styled.main`
  display: grid;
  grid-template-columns: minmax(280px, 0.78fr) minmax(0, 1.45fr);
  align-items: stretch;
  gap: 18px;
  width: 100%;
  min-width: 0;
  overflow: visible;

  @media (max-width: 1100px) {
    grid-template-columns: minmax(250px, 0.72fr) minmax(0, 1.28fr);
    gap: 14px;
  }

  @media (max-width: 1000px) {
    display: block;
  }
`;

const panelSurface = css`
  min-width: 0;
  border: 1px solid var(--app-border-strong);
  border-radius: 17px;
  background: var(--app-white);
  box-shadow: 0 4px 16px rgba(var(--app-shadow-rgb), 0.07);
`;

export const UsersPanel = styled.section<{ $mobileVisible?: boolean }>`
  ${panelSurface};
  display: flex;
  flex-direction: column;
  height: min(820px, calc(100dvh - 190px));
  min-height: 480px;
  max-height: none;
  padding: 17px;
  overflow: hidden;

  @media (max-width: 1000px) {
    display: ${({ $mobileVisible }) => ($mobileVisible ? "flex" : "none")};
    height: auto;
    min-height: 0;
    max-height: none;
    width: 100%;
    padding: 15px;
    overflow: visible;
  }

  @media (max-width: 600px) {
    padding: 12px;
    border-radius: 14px;
  }
`;

export const UsersPanelHeader = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
  margin-bottom: 17px;

  > div:first-child {
    min-width: 0;
  }

  @media (max-width: 430px) {
    align-items: center;
    gap: 8px;
    margin-bottom: 13px;
  }
`;

export const UsersPanelActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 0 0 auto;
  min-width: 0;
`;

export const CreateUserButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 40px;
  padding: 9px 13px;
  border: 1px solid var(--app-primary);
  border-radius: 10px;
  background: var(--app-primary);
  color: var(--app-white);
  font: inherit;
  font-size: 0.77rem;
  font-weight: 800;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background var(--app-transition),
    border-color var(--app-transition),
    transform var(--app-transition);

  svg {
    flex: 0 0 auto;
    font-size: 0.88rem;
  }

  &:hover {
    border-color: var(--app-primary-active);
    background: var(--app-primary-active);
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid var(--app-accent-soft);
    outline-offset: 3px;
  }

  @media (max-width: 430px) {
    width: 40px;
    min-width: 40px;
    min-height: 40px;
    padding: 0;

    span {
      display: none;
    }
  }
`;

export const UsersPanelTitle = styled.h2`
  margin: 0;
  color: var(--app-ink);
  font-family: var(--app-font-heading);
  font-size: clamp(1.02rem, 1.5vw, 1.2rem);
  font-weight: 900;
  letter-spacing: -0.035em;
  line-height: 1.25;
`;

export const UsersPanelSubtitle = styled.p`
  max-width: 420px;
  margin: 5px 0 0;
  color: var(--app-muted);
  font-size: 0.76rem;
  line-height: 1.45;
`;

export const Filters = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
  min-width: 0;
  margin-bottom: 13px;
  padding: 4px;
  border: 1px solid var(--app-border-strong);
  border-radius: 11px;
  background: var(--app-surface);

  @media (max-width: 380px) {
    gap: 4px;
    padding: 3px;
  }
`;

export const FilterButton = styled.button<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 0;
  min-height: 35px;
  padding: 7px 8px;
  border: 1px solid
    ${({ $active }) => ($active ? "var(--app-border-strong)" : "transparent")};
  border-radius: 8px;
  background: ${({ $active }) =>
    $active ? "var(--app-white)" : "transparent"};
  color: ${({ $active }) =>
    $active ? "var(--app-primary)" : "var(--app-muted)"};
  font: inherit;
  font-size: 0.72rem;
  font-weight: 800;
  white-space: nowrap;
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active ? "0 4px 16px rgba(var(--app-shadow-rgb), 0.07)" : "none"};
  transition:
    background var(--app-transition),
    color var(--app-transition),
    border-color var(--app-transition);

  span {
    display: inline-grid;
    place-items: center;
    min-width: 19px;
    height: 19px;
    padding: 0 5px;
    border-radius: 20px;
    background: ${({ $active }) =>
      $active ? "var(--app-accent-soft)" : "var(--app-border-strong)"};
    color: ${({ $active }) =>
      $active ? "var(--app-primary)" : "var(--app-primary)"};
    font-size: 0.63rem;
    font-weight: 900;
  }

  &:hover {
    color: var(--app-primary);
    background: var(--app-white);
  }

  &:focus-visible {
    outline: 2px solid var(--app-accent);
    outline-offset: 2px;
  }

  @media (max-width: 430px) {
    gap: 4px;
    padding: 7px 4px;
    font-size: 0.67rem;
  }

  @media (max-width: 340px) {
    flex-direction: column;
    gap: 3px;
    min-height: 43px;
  }
`;

export const UsersList = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
  min-height: 0;
  padding: 2px 3px 2px 0;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--app-accent) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: var(--app-accent);
  }

  @media (max-width: 1000px) {
    max-height: 430px;
    flex: initial;
  }

  @media (max-width: 600px) {
    max-height: 55dvh;
    gap: 7px;
  }
`;

export const UserRow = styled.button<{ $selected: boolean }>`
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr) 18px;
  align-items: center;
  gap: 11px;
  width: 100%;
  min-width: 0;
  padding: 11px;
  border: 2px solid
    ${({ $selected }) =>
      $selected ? "var(--app-accent)" : "var(--app-border-strong)"};
  border-radius: 14px;
  background: ${({ $selected }) =>
    $selected ? "var(--app-primary)" : "var(--app-surface)"};
  color: ${({ $selected }) =>
    $selected ? "var(--app-white)" : "var(--app-ink)"};
  box-shadow: ${({ $selected }) =>
    $selected
      ? "0 8px 22px rgba(var(--app-shadow-rgb), 0.20), inset 4px 0 0 var(--app-accent)"
      : "0 2px 8px rgba(74, 40, 24, 0.045)"};
  text-align: left;
  cursor: pointer;
  transition:
    border-color var(--app-transition),
    background var(--app-transition),
    transform var(--app-transition);

  > svg:last-child {
    justify-self: end;
    color: ${({ $selected }) =>
      $selected ? "var(--app-white)" : "var(--app-muted)"};
    font-size: 0.78rem;
    transition:
      color var(--app-transition),
      transform var(--app-transition);
  }

  &:hover {
    border-color: var(--app-accent);
    background: ${({ $selected }) =>
      $selected ? "var(--app-primary)" : "var(--app-surface)"};

    > svg:last-child {
      color: ${({ $selected }) =>
        $selected ? "var(--app-white)" : "var(--app-primary)"};
      transform: translateX(2px);
    }
  }

  ${({ $selected }) =>
    $selected &&
    css`
      > div:first-child {
        border-color: rgba(255, 255, 255, 0.24);
        background: rgba(255, 255, 255, 0.16);
        color: var(--app-white);
      }

      > div:nth-child(2) > strong {
        color: var(--app-white);
      }

      > div:nth-child(2) > span {
        color: rgba(255, 255, 255, 0.78);
      }

      > div:nth-child(2) > div > span:first-child {
        background: rgba(255, 255, 255, 0.18);
        color: var(--app-white);
      }

      > div:nth-child(2) > div > span:last-child {
        background: #DDF7EA;
        color: #16794C;
      }
    `}

  &:focus-visible {
    outline: 3px solid var(--app-accent-soft);
    outline-offset: 2px;
  }

  @media (max-width: 600px) {
    grid-template-columns: 40px minmax(0, 1fr) 16px;
    gap: 9px;
    padding: 10px;
  }

  @media (max-width: 360px) {
    grid-template-columns: 36px minmax(0, 1fr) 14px;
    gap: 8px;
    padding: 9px;
  }
`;

export const UserAvatar = styled.div<{ $active: boolean }>`
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "#DDF7EA" : "#FFF1D6"};
  border-radius: 12px;
  background: ${({ $active }) =>
    $active ? "#DDF7EA" : "#FFF1D6"};
  color: ${({ $active }) =>
    $active ? "#16794C" : "#9A5B00"};
  font-size: 1rem;

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 360px) {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }
`;

export const UserMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const UserName = styled.strong`
  overflow: hidden;
  color: var(--app-ink);
  font-size: 0.82rem;
  font-weight: 850;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserEmail = styled.span`
  overflow: hidden;
  color: var(--app-muted);
  font-size: 0.7rem;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const UserMeta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
  min-width: 0;
  margin-top: 2px;
`;

export const UserRole = styled.span`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  max-width: 100%;
  padding: 4px 7px;
  border-radius: 20px;
  background: var(--app-accent-soft);
  color: var(--app-primary);
  font-size: 0.62rem;
  font-weight: 850;
  line-height: 1.2;
`;

export const UserStatus = styled.span<{ $active: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  width: fit-content;
  padding: 4px 7px;
  border-radius: 20px;
  background: ${({ $active }) =>
    $active ? "#DDF7EA" : "#FFF1D6"};
  color: ${({ $active }) =>
    $active ? "#16794C" : "#9A5B00"};
  font-size: 0.62rem;
  font-weight: 850;
  line-height: 1.2;

  &::before {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: currentColor;
    content: "";
  }
`;

export const SelectedIndicator = styled.span`
  display: grid;
  place-items: center;
  justify-self: end;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--app-primary);
  color: var(--app-white);
  font-size: 0.65rem;
`;

export const EmptyState = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 9px;
  min-width: 0;
  min-height: 150px;
  padding: 22px 16px;
  border: 1px dashed var(--app-border-strong);
  border-radius: 13px;
  background: var(--app-surface);
  color: var(--app-muted);
  text-align: center;

  > div {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    border-radius: 14px;
    background: var(--app-accent-soft);
    color: var(--app-primary);
    font-size: 1.2rem;
  }

  > svg {
    color: var(--app-muted);
    font-size: 1.2rem;
  }

  strong {
    color: var(--app-ink);
    font-size: 0.88rem;
    font-weight: 850;
  }

  span {
    max-width: 310px;
    color: var(--app-muted);
    font-size: 0.74rem;
    line-height: 1.5;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-height: 39px;
    margin-top: 4px;
    padding: 8px 13px;
    border: 1px solid var(--app-primary);
    border-radius: 9px;
    background: var(--app-primary);
    color: var(--app-white);
    font: inherit;
    font-size: 0.74rem;
    font-weight: 800;
    cursor: pointer;
  }
`;

/* =========================================================
   EDITOR DE USUARIO
   ========================================================= */

export const EditorPanel = styled.section<{
  $mobileVisible?: boolean;
  $empty?: boolean;
}>`
  ${panelSurface};
  display: flex;
  flex-direction: column;
  min-width: 0;
  height: min(820px, calc(100dvh - 190px));
  min-height: 480px;
  max-height: none;
  padding: 18px;
  overflow-x: hidden;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: var(--app-accent) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: var(--app-accent);
  }

  ${({ $empty }) =>
    $empty &&
    css`
      align-items: center;
      justify-content: center;
    `}

  @media (max-width: 1000px) {
    display: ${({ $mobileVisible }) => ($mobileVisible ? "flex" : "none")};
    width: 100%;
    height: auto;
    min-height: 0;
    max-height: none;
    margin-top: 0;
    padding: 16px;
    overflow: visible;
  }

  @media (max-width: 600px) {
    padding: 12px;
    border-radius: 14px;
  }
`;

export const EditorPanelHeading = styled.header`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  min-width: 0;
  margin-bottom: 15px;

  > div {
    min-width: 0;
  }

  > span {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    min-height: 27px;
    padding: 5px 9px;
    border-radius: 30px;
    background: var(--app-accent-soft);
    color: var(--app-primary);
    font-size: 0.66rem;
    font-weight: 850;
    white-space: nowrap;
  }

  > span[data-active="true"] {
    background: #DDF7EA;
    color: #16794C;
  }

  > span[data-active="false"] {
    background: #FFF1D6;
    color: #9A5B00;
  }

  @media (max-width: 420px) {
    margin-bottom: 12px;
  }
`;

export const EditorPanelTitle = styled.h2`
  margin: 0;
  color: var(--app-ink);
  font-family: var(--app-font-heading);
  font-size: clamp(1.08rem, 1.8vw, 1.35rem);
  font-weight: 900;
  letter-spacing: -0.035em;
  line-height: 1.2;
`;

export const EditorPanelSubtitle = styled.p`
  margin: 5px 0 0;
  color: var(--app-muted);
  font-size: 0.75rem;
  line-height: 1.45;
`;

export const EditorHeader = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  margin-bottom: 16px;
  padding: 13px;
  border: 1px solid var(--app-border-strong);
  border-radius: 13px;
  background: var(--app-surface);

  @media (max-width: 600px) {
    margin-bottom: 13px;
    padding: 10px;
  }
`;

export const EditorUser = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

export const EditorAvatar = styled.div<{ $active: boolean }>`
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 48px;
  height: 48px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "#DDF7EA" : "#FFF1D6"};
  border-radius: 14px;
  background: ${({ $active }) =>
    $active ? "#DDF7EA" : "#FFF1D6"};
  color: ${({ $active }) =>
    $active ? "#16794C" : "#9A5B00"};
  font-size: 1.2rem;

  @media (max-width: 420px) {
    width: 43px;
    height: 43px;
    border-radius: 12px;
  }
`;

export const EditorUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const EditorUserName = styled.strong`
  overflow: hidden;
  color: var(--app-ink);
  font-size: 0.9rem;
  font-weight: 900;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const EditorUserRole = styled.span`
  color: var(--app-muted);
  font-size: 0.72rem;
  line-height: 1.35;
`;

export const ContainerSectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
  width: 100%;
`;

export const Section = styled.section`
  min-width: 0;
  padding: 15px;
  border: 1px solid var(--app-border-strong);
  border-radius: 14px;
  background: var(--app-surface);

  @media (max-width: 600px) {
    padding: 12px;
    border-radius: 12px;
  }

  @media (max-width: 360px) {
    padding: 10px;
  }
`;

export const SectionHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  margin-bottom: 14px;

  > div:last-child {
    min-width: 0;
  }

  @media (max-width: 420px) {
    gap: 8px;
    margin-bottom: 11px;
  }
`;

export const SectionIcon = styled.div<{ $security?: boolean }>`
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: ${({ $security }) =>
    $security ? "var(--app-accent-soft)" : "var(--app-accent-soft)"};
  color: var(--app-primary);
  font-size: 0.95rem;

  @media (max-width: 420px) {
    width: 34px;
    height: 34px;
    border-radius: 9px;
  }
`;

export const SectionTitle = styled.h3`
  margin: 0;
  color: var(--app-ink);
  font-size: 0.86rem;
  font-weight: 900;
  letter-spacing: -0.015em;
  line-height: 1.3;
`;

export const SectionDescription = styled.p`
  margin: 3px 0 0;
  color: var(--app-muted);
  font-size: 0.71rem;
  line-height: 1.45;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 13px;

  > :last-child:nth-child(odd) {
    grid-column: 1 / -1;
  }

  @media (max-width: 650px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 11px;

    > :last-child:nth-child(odd) {
      grid-column: auto;
    }
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  min-width: 0;

  > div {
    position: relative;
    min-width: 0;
  }
`;

export const Label = styled.label`
  display: block;
  color: var(--app-ink);
  font-size: 0.73rem;
  font-weight: 850;
  line-height: 1.3;
`;

const fieldStyles = css`
  display: block;
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 10px 12px;
  border: 1px solid var(--app-border-strong);
  border-radius: 9px;
  outline: none;
  background: var(--app-white);
  color: var(--app-ink);
  font: inherit;
  font-size: 0.78rem;
  line-height: 1.35;
  transition:
    border-color var(--app-transition),
    box-shadow var(--app-transition),
    background var(--app-transition);

  &::placeholder {
    color: var(--app-muted);
    opacity: 0.8;
  }

  &:hover {
    border-color: var(--app-accent);
  }

  &:focus {
    border-color: var(--app-accent);
    box-shadow: 0 0 0 3px var(--app-accent-soft);
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

export const Input = styled.input`
  ${fieldStyles};
`;

export const Select = styled.select`
  ${fieldStyles};
  padding-right: 32px;
  cursor: pointer;
`;

/* =========================================================
   SEGURIDAD Y RECUPERACIÓN DE CONTRASEÑA
   ========================================================= */

export const SecurityCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 0;
  padding: 14px;
  border: 1px solid var(--app-border-strong);
  border-radius: 12px;
  background: var(--app-white);

  @media (max-width: 420px) {
    gap: 12px;
    padding: 10px;
  }
`;

export const SecurityHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-width: 0;
`;

export const SecurityIcon = styled.div`
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  background: var(--app-accent-soft);
  color: var(--app-primary);
  font-size: 0.95rem;
`;

export const SecurityText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const SecurityTitle = styled.strong`
  color: var(--app-ink);
  font-size: 0.79rem;
  font-weight: 900;
  line-height: 1.35;
`;

export const SecurityDescription = styled.p`
  margin: 0;
  color: var(--app-muted);
  font-size: 0.7rem;
  line-height: 1.5;
  overflow-wrap: anywhere;

  strong {
    color: var(--app-ink);
    font-weight: 800;
  }
`;

export const SecuritySteps = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  min-width: 0;
`;

export const SecurityStep = styled.div<{
  $active: boolean;
  $completed: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-width: 0;
  min-height: 39px;
  padding: 7px 8px;
  border: 1px solid
    ${({ $active, $completed }) =>
      $active || $completed
        ? "var(--app-accent)"
        : "var(--app-border-strong)"};
  border-radius: 9px;
  background: ${({ $active, $completed }) =>
    $completed
      ? "#DDF7EA"
      : $active
        ? "var(--app-accent-soft)"
        : "var(--app-surface)"};
  color: ${({ $active, $completed }) =>
    $completed
      ? "#16794C"
      : $active
        ? "var(--app-primary)"
        : "var(--app-muted)"};
`;

export const SecurityStepNumber = styled.span`
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 21px;
  height: 21px;
  border-radius: 50%;
  background: currentColor;
  color: var(--app-white);
  font-size: 0.63rem;
  font-weight: 900;
`;

export const SecurityStepText = styled.span`
  min-width: 0;
  overflow: hidden;
  font-size: 0.67rem;
  font-weight: 850;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 390px) {
    font-size: 0.61rem;
  }

  @media (max-width: 340px) {
    display: none;
  }
`;

export const SendCodeButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  min-width: 0;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid var(--app-primary);
  border-radius: 10px;
  background: var(--app-primary);
  color: var(--app-white);
  font: inherit;
  font-size: 0.74rem;
  font-weight: 850;
  text-align: left;
  cursor: pointer;
  transition:
    background var(--app-transition),
    transform var(--app-transition),
    opacity var(--app-transition);

  > svg {
    flex: 0 0 auto;
    font-size: 0.83rem;
  }

  span {
    flex: 1;
    min-width: 0;
  }

  &:hover:not(:disabled) {
    background: var(--app-primary-active);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

export const CodeArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  padding: 12px;
  border: 1px solid var(--app-border-strong);
  border-radius: 10px;
  background: var(--app-surface);

  @media (max-width: 380px) {
    padding: 9px;
  }
`;

export const CodeHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  min-width: 0;

  > div:first-child {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  strong {
    color: var(--app-ink);
    font-size: 0.75rem;
    font-weight: 850;
  }

  span {
    color: var(--app-muted);
    font-size: 0.68rem;
    line-height: 1.4;
  }

  @media (max-width: 360px) {
    flex-direction: column;
  }
`;

export const CodeStatus = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex: 0 0 auto;
  padding: 5px 8px;
  border-radius: 20px;
  background: #DDF7EA;
  color: #16794C;
  font-size: 0.64rem;
  font-weight: 850;
  white-space: nowrap;

  svg {
    font-size: 0.7rem;
  }
`;

export const CodeInputs = styled.div`
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 8px;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;

  @media (max-width: 420px) {
    gap: 6px;
  }

  @media (max-width: 340px) {
    gap: 4px;
  }
`;

export const CodeInput = styled.input`
  ${fieldStyles};
  width: 100%;
  min-width: 0;
  min-height: 47px;
  padding: 5px 2px;
  border-radius: 9px;
  font-size: 1.05rem;
  font-weight: 900;
  text-align: center;

  @media (max-width: 380px) {
    min-height: 43px;
    font-size: 0.95rem;
  }
`;

export const VerifyCodeButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  min-height: 42px;
  padding: 9px 12px;
  border: 1px solid var(--app-primary);
  border-radius: 9px;
  background: var(--app-primary);
  color: var(--app-white);
  font: inherit;
  font-size: 0.74rem;
  font-weight: 850;
  cursor: pointer;
  transition:
    background var(--app-transition),
    opacity var(--app-transition),
    transform var(--app-transition);

  &:hover:not(:disabled) {
    background: var(--app-primary-active);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  svg {
    flex: 0 0 auto;
    font-size: 0.85rem;
  }
`;

export const ResendButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  align-self: center;
  min-height: 34px;
  padding: 6px 10px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--app-primary);
  font: inherit;
  font-size: 0.7rem;
  font-weight: 850;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: var(--app-accent-soft);
  }

  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }
`;

export const SecuritySuccess = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  min-width: 0;
  padding: 11px;
  border: 1px solid #DDF7EA;
  border-radius: 10px;
  background: #DDF7EA;
  color: #16794C;

  > svg {
    flex: 0 0 auto;
    margin-top: 1px;
    font-size: 1rem;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  strong {
    font-size: 0.75rem;
    font-weight: 900;
  }

  span {
    font-size: 0.68rem;
    line-height: 1.45;
  }
`;

export const PasswordArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

export const PasswordInput = styled.input`
  ${fieldStyles};
  padding-right: 43px;
`;

export const PasswordState = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  min-width: 0;
  padding: 10px;
  border: 1px solid var(--app-border-strong);
  border-radius: 9px;
  background: var(--app-surface);
`;

export const PasswordStateIcon = styled.div`
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 9px;
  background: var(--app-accent-soft);
  color: var(--app-primary);
  font-size: 0.8rem;
`;

export const PasswordStateText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;

  strong {
    color: var(--app-ink);
    font-size: 0.71rem;
    font-weight: 850;
  }

  span {
    color: var(--app-muted);
    font-size: 0.66rem;
    line-height: 1.4;
  }
`;

/* =========================================================
   ESTADO DE CUENTA
   ========================================================= */

export const StatusCard = styled.button<{ $active: boolean }>`
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) 18px;
  align-items: center;
  gap: 11px;
  width: 100%;
  min-width: 0;
  padding: 12px;
  border: 1px solid
    ${({ $active }) =>
      $active ? "#DDF7EA" : "#FFF1D6"};
  border-radius: 11px;
  background: ${({ $active }) =>
    $active ? "#DDF7EA" : "#FFF1D6"};
  color: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color var(--app-transition),
    filter var(--app-transition),
    transform var(--app-transition);

  &:hover {
    filter: brightness(0.98);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 3px solid var(--app-accent-soft);
    outline-offset: 2px;
  }

  @media (max-width: 420px) {
    grid-template-columns: 36px minmax(0, 1fr) 15px;
    gap: 8px;
    padding: 10px;
  }
`;

export const StatusIcon = styled.div<{ $active: boolean }>`
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: var(--app-white);
  color: ${({ $active }) =>
    $active ? "#16794C" : "#9A5B00"};
  font-size: 1rem;

  @media (max-width: 420px) {
    width: 36px;
    height: 36px;
    border-radius: 9px;
  }
`;

export const StatusContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
`;

export const StatusTitle = styled.strong`
  color: var(--app-ink);
  font-size: 0.77rem;
  font-weight: 900;
  line-height: 1.3;
`;

export const StatusDescription = styled.span`
  color: var(--app-muted);
  font-size: 0.68rem;
  line-height: 1.45;
  overflow-wrap: anywhere;
`;

export const StatusArrow = styled.span`
  display: grid;
  place-items: center;
  justify-self: end;
  color: var(--app-muted);
  font-size: 0.75rem;
`;

/* =========================================================
   ACCIONES DEL EDITOR Y ESTADOS GENERALES
   ========================================================= */

export const EditorFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  min-width: 0;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--app-border-strong);

  @media (max-width: 520px) {
    position: static;
    z-index: auto;
    margin: 14px 0 0;
    padding: 12px 0 0;
    background: transparent;
  }

  @media (max-width: 360px) {
    gap: 7px;
  }
`;

const actionButton = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-width: 0;
  min-height: 42px;
  padding: 9px 15px;
  border: 1px solid transparent;
  border-radius: 9px;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 850;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background var(--app-transition),
    border-color var(--app-transition),
    color var(--app-transition),
    opacity var(--app-transition),
    transform var(--app-transition);

  svg {
    flex: 0 0 auto;
    font-size: 0.85rem;
  }

  &:disabled {
    opacity: 0.55;
    cursor: wait;
  }

  &:focus-visible {
    outline: 3px solid var(--app-accent-soft);
    outline-offset: 2px;
  }

  @media (max-width: 520px) {
    flex: 1 1 0;
    padding: 9px 10px;
    font-size: 0.71rem;
  }

  @media (max-width: 350px) {
    gap: 5px;
    padding: 8px 7px;
    font-size: 0.66rem;
  }
`;

export const CancelButton = styled.button`
  ${actionButton};
  border-color: var(--app-border-strong);
  background: var(--app-white);
  color: var(--app-primary);

  &:hover:not(:disabled) {
    border-color: var(--app-accent);
    background: var(--app-surface);
    color: var(--app-ink);
  }
`;

export const SaveButton = styled.button`
  ${actionButton};
  border-color: var(--app-primary);
  background: var(--app-primary);
  color: var(--app-white);

  &:hover:not(:disabled) {
    border-color: var(--app-primary-active);
    background: var(--app-primary-active);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const LoadingState = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  margin: 10px 0;
  padding: 12px;
  border: 1px solid var(--app-border-strong);
  border-radius: 10px;
  background: var(--app-surface);
  color: var(--app-muted);
  font-size: 0.75rem;
  line-height: 1.45;
`;

export const ErrorMessage = styled.div`
  width: 100%;
  min-width: 0;
  margin-bottom: 13px;
  padding: 11px 13px;
  border: 1px solid var(--app-border-strong);
  border-radius: 10px;
  background: #FFF1D6;
  color: var(--app-ink);
  font-size: 0.76rem;
  line-height: 1.5;
  overflow-wrap: anywhere;
`;

export const SuccessMessage = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  width: 100%;
  min-width: 0;
  margin-bottom: 13px;
  padding: 11px 13px;
  border: 1px solid #DDF7EA;
  border-radius: 10px;
  background: #DDF7EA;
  color: #16794C;
  font-size: 0.76rem;
  font-weight: 750;
  line-height: 1.5;

  svg {
    flex: 0 0 auto;
    margin-top: 2px;
    font-size: 0.9rem;
  }

  span {
    min-width: 0;
    overflow-wrap: anywhere;
  }
`;

/* =========================================================
   RESPONSIVE: TABLET Y MÓVIL
   ========================================================= */

/* =========================================================
   ACTUALIZACIÓN OBLIGATORIA DE CREDENCIALES
   ========================================================= */

export const InitialCredentialsPage = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  width: 100%;
  min-height: calc(100dvh - 100px);
  padding: 30px 20px;
  color: var(--app-ink);
  background-color: red !important;
  @media (max-width: 600px) {
    justify-content: flex-start;
    gap: 20px;
    padding: 24px 14px;
  }
`;

export const InitialCredentialsHeading = styled.header`
  width: 100%;
  max-width: 720px;

  @media (max-width: 600px) {
    max-width: 100%;
  }
`;

export const InitialCredentialsEyebrow = styled.span`
  display: block;
  margin-bottom: 7px;
  color: var(--app-accent);
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

export const InitialCredentialsTitle = styled.h1`
  margin: 0;
  color: var(--app-ink);
  font-family: var(--app-font-heading);
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 900;
  letter-spacing: -0.045em;
  line-height: 1.15;
`;

export const InitialCredentialsSubtitle = styled.p`
  margin: 7px 0 0;
  color: var(--app-muted);
  font-size: 0.88rem;
  line-height: 1.5;
`;

export const InitialCredentialsCard = styled.section`
  width: 100%;
  max-width: 720px;
  height: 95%;
  padding: 25px;
  border: 1px solid var(--app-border-strong);
  border-radius: 19px;
  background: var(--app-white);
  box-shadow: 0 12px 30px rgba(var(--app-shadow-rgb), 0.09);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 600px) {
    padding: 19px 15px;
    border-radius: 15px;
  }
`;

export const InitialCredentialsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  margin-bottom: 20px;
  padding: 11px 13px;
  border: 1px solid var(--app-border-strong);
  border-radius: 11px;
  background: var(--app-surface);
`;

export const InitialCredentialsInfoIcon = styled.div`
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  width: 37px;
  height: 37px;
  border-radius: 10px;
  background: var(--app-accent-soft);
  color: var(--app-primary);
  font-size: 0.9rem;
`;

export const InitialCredentialsInfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;

  strong {
    color: var(--app-ink);
    font-size: 0.78rem;
    font-weight: 900;
  }

  span {
    color: var(--app-muted);
    font-size: 0.7rem;
    line-height: 1.4;
  }
`;

export const InitialCredentialsForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
  height: fit-content;
  
`;

export const InitialCredentialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 15px;

  @media (max-width: 560px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 13px;
  }
`;

export const InitialCredentialsGroup = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      grid-column: 1 / -1;
    `}
`;

export const InitialCredentialsLabel = styled.label`
  color: var(--app-ink);
  font-size: 0.74rem;
  font-weight: 850;
`;

export const InitialCredentialsInput = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 43px;
  padding: 10px 12px;
  border: 1px solid var(--app-border-strong);
  border-radius: 9px;
  outline: none;
  background: var(--app-surface);
  color: var(--app-ink);
  font: inherit;
  font-size: 0.78rem;
  transition:
    border-color var(--app-transition),
    background var(--app-transition),
    box-shadow var(--app-transition);

  &::placeholder {
    color: var(--app-muted);
    opacity: 0.75;
  }

  &:hover:not(:disabled) {
    border-color: var(--app-accent);
  }

  &:focus {
    border-color: var(--app-accent);
    background: var(--app-white);
    box-shadow: 0 0 0 3px var(--app-accent-soft);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const InitialCredentialsButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  gap: 8px;
  min-height: 43px;
  padding: 10px 17px;
  border: 1px solid var(--app-primary);
  border-radius: 9px;
  background: var(--app-primary);
  color: var(--app-white);
  font: inherit;
  font-size: 0.76rem;
  font-weight: 850;
  cursor: pointer;
  transition:
    background var(--app-transition),
    transform var(--app-transition),
    opacity var(--app-transition);

  svg {
    font-size: 0.85rem;
  }

  &:hover:not(:disabled) {
    border-color: var(--app-primary-active);
    background: var(--app-primary-active);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  @media (max-width: 560px) {
    width: 100%;
  }
`;

export const InitialCredentialsLoading = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 180px;
  margin: 0;
  color: var(--app-muted);
  font-size: 0.85rem;
  font-weight: 700;
`;

export const InitialCredentialsError = styled.div`
  margin-bottom: 16px;
  padding: 10px 12px;
  border: 1px solid var(--app-border-strong);
  border-radius: 9px;
  background: var(--app-accent-soft);
  color: var(--app-ink);
  font-size: 0.75rem;
  line-height: 1.5;
`;

export const InitialCredentialsSuccess = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin-bottom: 16px;
  padding: 10px 12px;
  border: 1px solid #DDF7EA;
  border-radius: 9px;
  background: #DDF7EA;
  color: #16794C;
  font-size: 0.75rem;
  font-weight: 750;
  line-height: 1.5;

  svg {
    flex: 0 0 auto;
  }
`;